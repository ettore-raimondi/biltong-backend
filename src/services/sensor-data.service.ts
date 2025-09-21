import { PrismaClient } from "@prisma/client";

let sensorDataInterval: NodeJS.Timeout | null = null;

async function seedSensorDataForActiveBatches({
  prisma,
}: {
  prisma: PrismaClient;
}) {
  try {
    const activeBatches = await prisma.biltong_batches.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        meat_pieces: true,
      },
    });

    if (!activeBatches) {
      console.log("No active batches found. Skipping sensor data seeding.");
      return;
    }

    for (const batch of activeBatches) {
      console.log("seeding data for batch", batch.name, batch.id);

      const sensorData = {
        temperature: Math.random() * (24 - 18) + 18, // Random temp between 18-24
        humidity: Math.random() * (65 - 55) + 55, // Random humidity between 55-65
        airFlow: Math.random().toFixed(4), // Random airflow between 0-1
      };

      const latestBatch = await prisma.batch_data.findFirst({
        where: {
          batch_id: batch.id,
        },
        include: {
          weight_measurements: true, // Each batch can only have a maximum of 9 weight measurements
        },
        orderBy: {
          time_stamp: "desc",
        },
      });

      // Get current weights for meat pieces (simulate weight loss)
      const meatWeights = batch.meat_pieces.map((piece) => {
        const weight =
          latestBatch?.weight_measurements.find(
            (wm) => wm.meat_piece_id === piece.id
          )?.weight ?? piece.initial_weight;
        return {
          pieceId: piece.id,
          weight: weight * (0.97 + Math.random() * 0.02), // Simulate 1-3% weight loss
        };
      });

      // Create batch_data entry with the weight measurements
      await prisma.batch_data.create({
        data: {
          temperature: sensorData.temperature,
          humidity: sensorData.humidity,
          air_flow: parseFloat(sensorData.airFlow),
          batch_id: batch.id,
          weight_measurements: {
            create: meatWeights.map((weight) => ({
              weight: weight.weight,
              meat_piece_id: weight.pieceId,
            })),
          },
        },
      });

      console.log(`✅ Sensor data recorded for batch "${batch.name}"`);
    }
  } catch (error) {
    console.error("⚠️ Error seeding sensor data:", error);
  }
}

export function startSeedingSensorDataCronJob({
  prisma,
  intervalValueInSeconds = 600, // Default to 10 minutes
}: {
  prisma: PrismaClient;
  intervalValueInSeconds?: number;
}) {
  // Stop any existing interval
  if (sensorDataInterval) {
    clearInterval(sensorDataInterval);
  }

  console.log(
    `🚀 Starting sensor data collection every ${intervalValueInSeconds} minutes`
  );

  // Start immediately
  seedSensorDataForActiveBatches({ prisma });

  // Then repeat every intervalInMinutes
  sensorDataInterval = setInterval(async () => {
    console.log(`⏰ Running sensor data collection task...`);
    await seedSensorDataForActiveBatches({ prisma });
  }, intervalValueInSeconds * 1000); // Convert seconds to milliseconds
}

export function stopSeedingSensorDataCronJob() {
  if (sensorDataInterval) {
    clearInterval(sensorDataInterval);
    sensorDataInterval = null;
    console.log("🛑 Stopped sensor data collection");
  }
}

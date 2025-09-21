import { buildApp } from "./app";
import { startSeedingSensorDataCronJob } from "./services/sensor-data.service";

const PORT = process.env.PORT || 3000;

const start = async () => {
  const app = await buildApp();
  try {
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`🚀 Server listening on port ${PORT}`);

    // Start seeding any active batches
    startSeedingSensorDataCronJob({
      prisma: app.prisma,
      intervalValueInSeconds: 5, // For testing, set to 5 seconds. Change as needed.
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

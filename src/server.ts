import { buildApp } from "./app";

const PORT = process.env.PORT || 3000;

const start = async () => {
  const app = buildApp();
  try {
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`🚀 Server listening on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

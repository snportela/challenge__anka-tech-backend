import Fastify from "fastify";
import clientRoutes from "./modules/clients/client.route";
import { assetRoutes } from "./modules/assets/asset.route";
import fastifyCors from "@fastify/cors";

const app = Fastify();

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

const PORT: number = parseInt(<string>process.env.PORT, 10) || 5000;

app.get("/", async () => {
  return { status: "OK" };
});

async function main() {
  app.register(clientRoutes, { prefix: "api/clients" });
  app.register(assetRoutes, { prefix: "api/assets" });

  try {
    app.listen({ port: PORT, host: "0.0.0.0" });
    console.log("Server ready at port " + PORT);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();

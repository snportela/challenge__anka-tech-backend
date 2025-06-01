import Fastify from "fastify";
import clientRoutes from "./modules/clients/client.route";

const app = Fastify();

const PORT: number = parseInt(<string>process.env.PORT, 10) || 3000;

app.get("/", async () => {
  return { status: "OK" };
});

async function main() {

  app.register(clientRoutes, { prefix: "api/clients" });

  try {
    app.listen({ port: PORT, host: "0.0.0.0" });
    console.log("Server ready at port 3000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();

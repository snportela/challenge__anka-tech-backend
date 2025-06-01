import { FastifyInstance } from "fastify";
import {
  deleteClientHandler,
  getClientsHandler,
  registerClientHandler,
  retrieveClientHandler,
  updateClientHandler,
} from "./client.controller";

async function clientRoutes(app: FastifyInstance) {
  app.post("/", registerClientHandler);
  app.get("/", getClientsHandler);
  app.get("/:id", retrieveClientHandler);
  app.put("/:id", updateClientHandler);
  app.delete("/:id", deleteClientHandler);
}

export default clientRoutes;

import { FastifyInstance } from "fastify";
import { registerClientHandler } from "./client.controller";
import { $ref } from "./client.schema";

async function clientRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createClientSchema"),
        response: {
          201: $ref("createClientResponseSchema"),
        },
      },
    },
    registerClientHandler
  );
}

export default clientRoutes;

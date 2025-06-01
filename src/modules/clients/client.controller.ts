import { FastifyReply, FastifyRequest } from "fastify";
import { createClient } from "./client.service";
import { CreateClientInput } from "./client.schema";

export async function registerClientHandler(
  req: FastifyRequest<{
    Body: CreateClientInput;
  }>,
  res: FastifyReply
) {
  const body = req.body;

  try {
    const client = await createClient(body);

    return res.code(201).send(client);
  } catch (error) {
    console.log(error);
    return res.code(500).send(error);
  }
}

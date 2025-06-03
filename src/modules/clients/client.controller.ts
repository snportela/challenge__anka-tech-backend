import { FastifyReply, FastifyRequest } from "fastify";
import {
  createClient,
  deleteClientById,
  findClientById,
  findClients,
  searchClientByName,
  updateClientById,
} from "./client.service";
import {
  CreateClientInput,
  clientParamsSchema,
  searchQuerySchema,
} from "./client.schema";

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
    return res.code(500).send(error);
  }
}

export async function getClientsHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const query = searchQuerySchema.parse(req.query);

  try {
    let clients;

    if (query) {
      clients = await searchClientByName(query);
    } else {
      clients = await findClients();
    }

    return res.code(200).send(clients);
  } catch (error) {
    return res.code(500).send(error);
  }
}

export async function retrieveClientHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { id } = clientParamsSchema.parse(req.params);
  try {
    const client = await findClientById(id);

    if (!client) return res.code(404).send({ error: "Cliente não encontrado" });

    return res.code(200).send(client);
  } catch (error) {
    res.code(500).send(error);
  }
}

export async function updateClientHandler(
  req: FastifyRequest<{
    Body: CreateClientInput;
  }>,
  res: FastifyReply
) {
  const body = req.body;
  const { id } = clientParamsSchema.parse(req.params);

  try {
    const newClient = await updateClientById(id, body);
    return res.code(201).send(newClient);
  } catch (error) {}
}

export async function deleteClientHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { id } = clientParamsSchema.parse(req.params);

  try {
    await deleteClientById(id);
    return res.code(200).send({ message: "Deleted Client with ID: " + id });
  } catch (error) {
    return res.code(500).send(error);
  }
}

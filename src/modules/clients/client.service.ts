import prisma from "../../utils/prisma";
import { CreateClientInput, SearchQuerySchema } from "./client.schema";

export async function createClient(data: CreateClientInput) {
  return await prisma.client.create({
    data,
  });
}

export async function findClients() {
  return prisma.client.findMany();
}

export async function findClientById(id: number) {
  return await prisma.client.findUnique({
    where: { id },
  });
}

export async function updateClientById(id: number, data: CreateClientInput) {
  return await prisma.client.update({
    where: { id },
    data,
  });
}

export async function deleteClientById(id: number) {
  return await prisma.client.delete({
    where: { id },
  });
}

export async function searchClientByName(query: SearchQuerySchema) {
  const whereClause = query.name ? { name: { contains: query.name } } : {};

  return prisma.client.findMany({
    where: whereClause,
  });
}


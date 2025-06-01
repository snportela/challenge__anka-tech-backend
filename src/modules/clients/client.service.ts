import prisma from "../../utils/prisma";
import { CreateClientInput } from "./client.schema";

export async function createClient(input: CreateClientInput) {
  const { name, email, active } = input;

  const client = await prisma.client.create({
    data: input,
  });

  return client;
}

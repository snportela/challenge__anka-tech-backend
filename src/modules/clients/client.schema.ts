import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createClientSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  active: z.boolean().optional().default(true),
});

const createClientResponseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;

export const { schemas: clientsSchemas, $ref } = buildJsonSchemas({
  createClientSchema,
  createClientResponseSchema,
});

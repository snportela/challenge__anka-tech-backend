import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  active: z.boolean().optional().default(true),
});

export const clientParamsSchema = z.object({
  id: z.coerce.number().int(),
});

export const searchQuerySchema = z.object({
  name: z
    .string()
    .min(1, "O termo de busca deve ter pelo menos 1 caractere")
    .optional(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type SearchQuerySchema = z.infer<typeof searchQuerySchema>;

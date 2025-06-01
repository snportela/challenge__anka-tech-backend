import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().min(3, "Nome deve ter 3+ caracteres"),
  value: z.number().positive("Valor deve ser positivo"),
  clientId: z.number().int().positive("ID do cliente inválido"),
});

export const assetParamsSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

export const assetQuerySchema = z.object({
  clientId: z.coerce.number().int().positive().optional(),
});

export type CreateAssetInput = z.infer<typeof createAssetSchema>;

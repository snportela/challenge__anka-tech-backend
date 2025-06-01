import { FastifyReply, FastifyRequest } from "fastify";
import {
  assetParamsSchema,
  assetQuerySchema,
  CreateAssetInput,
} from "./asset.schema";
import {
  createAsset,
  deleteAssetById,
  findAssetById,
  findAssets,
  updateAssetBydId,
} from "./asset.service";

export async function registerAssetHandler(
  req: FastifyRequest<{ Body: CreateAssetInput }>,
  res: FastifyReply
) {
  const body = req.body;

  try {
    const asset = await createAsset(body);
    return res.code(201).send(asset);
  } catch (error) {
    return res.code(500).send(error);
  }
}

export async function getAssetsHandler(req: FastifyRequest, res: FastifyReply) {
  const query = assetQuerySchema.parse(req.query);

  try {
    const assets = await findAssets(query);
    return res.code(200).send(assets);
  } catch (error) {
    return res.code(500).send(error);
  }
}

export async function retrieveAssetHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { id } = assetParamsSchema.parse(req.params);

  try {
    const asset = await findAssetById(id);

    if (!asset) return res.code(404).send({ error: "Ativo não encontrado" });

    return res.code(200).send(asset);
  } catch (error) {
    res.code(500).send(error);
  }
}

export async function updateAssetHandler(
  req: FastifyRequest<{ Body: CreateAssetInput }>,
  res: FastifyReply
) {
  const body = req.body;
  const { id } = assetParamsSchema.parse(req.params);

  try {
    const asset = await findAssetById(id);
    if (!asset) return res.code(404).send({ error: "Ativo não encontrado" });

    const newAsset = await updateAssetBydId(id, body);
    return res.code(201).send(newAsset);
  } catch (error) {
    res.code(500).send(error);
  }
}

export async function deleteAssetHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  const { id } = assetParamsSchema.parse(req.params);

  try {
    const asset = await findAssetById(id);
    if (!asset) return res.code(404).send({ error: "Ativo não encontrado" });

    await deleteAssetById(id);
    return res.code(200).send({ message: "Ativo com ID: " + id + " apagado." });
  } catch (error) {
    return res.code(500).send(error);
  }
}

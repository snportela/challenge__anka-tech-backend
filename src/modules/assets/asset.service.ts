import prisma from "../../utils/prisma";
import { CreateAssetInput } from "./asset.schema";

export async function createAsset(data: CreateAssetInput) {
  return await prisma.asset.create({
    data,
  });
}

export async function findAssets(query: { clientId?: number; name?: string }) {
  const assets = await prisma.asset.findMany({
    where: query.clientId ? { clientId: query.clientId } : {},
    include: { client: true },
  });

  if (query.name) {
    return assets.filter((asset) =>
      asset.name.toLowerCase().includes(query.name!.toLowerCase())
    );
  }

  return assets;
}

export async function findAssetById(id: number) {
  return await prisma.asset.findUnique({
    where: { id },
  });
}

export async function updateAssetBydId(id: number, data: CreateAssetInput) {
  return await prisma.asset.update({
    where: { id },
    data,
  });
}

export async function deleteAssetById(id: number) {
  return await prisma.asset.delete({
    where: { id },
  });
}

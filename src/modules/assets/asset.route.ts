import { FastifyInstance } from "fastify";
import {
  deleteAssetHandler,
  getAssetsHandler,
  registerAssetHandler,
  retrieveAssetHandler,
  updateAssetHandler,
} from "./asset.controller";

export async function assetRoutes(app: FastifyInstance) {
  app.post("/", registerAssetHandler);
  app.get("/", getAssetsHandler);
  app.get("/:id", retrieveAssetHandler);
  app.put("/:id", updateAssetHandler);
  app.delete("/:id", deleteAssetHandler);
}

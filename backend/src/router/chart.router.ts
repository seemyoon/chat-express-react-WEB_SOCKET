import { Router } from "express";

import { chartController } from "../controllers/chart.controller";

const router = Router();

router.post("/createChat", chartController.createChat);
router.put("/updateChat", chartController.updateChat);
router.get("/getChats", chartController.getChats);
router.post("/searchChats", chartController.searchChats);
router.post("/removeChat", chartController.removeChat);
router.get("/:chatId", chartController.getChat);

export const chartRouter = router;

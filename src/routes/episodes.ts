import { Router } from "express";
import GogoanimeApi from "../services/GogoanimeApi";

const api = GogoanimeApi.getInstance();
const router = Router();

router.get("/:seriesId", async (req, res) => {
  const { seriesId } = req.params;

  try {
    const episodes = await api.episodes(seriesId);

    return res.json(episodes);
  } catch (e) {
    res.status(404).json({
      error: 404,
      msg: e.message,
    });
  }
});

export default router;

import { Router } from "express";
import GogoanimeApi from "../services/GogoanimeApi";

const api = GogoanimeApi.getInstance();

const router = Router({ strict: true });

router.get(["/:seriesId", "/:seriesId/:episodeId"], async (req, res) => {
  const { seriesId, episodeId } = req.params;

  try {
    const episode = await api.series(seriesId, episodeId);

    return res.json(episode);
  } catch (e) {
    res.status(404).json({
      error: 404,
      msg: e.message,
    });
  }
});

export default router;

import { Router, Request } from "express";
import url from "url";
import GogoanimeApi from "../services/GogoanimeApi";

const api = GogoanimeApi.getInstance();
const router = Router();

const fullUrl = (req: Request): string => {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.baseUrl,
  });
};

router.get(["/", "/:page"], async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const next = `${fullUrl(req)}/${page + 1}`;

  try {
    const releases = await api.releases(page);

    res.json({
      page,
      next,
      data: releases,
    });
  } catch (e) {
    res.status(404).json({
      error: 404,
      msg: e.message,
    });
  }
});

export default router;

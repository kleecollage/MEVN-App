import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validatorManager.js";

const router = Router();

// GET       /api/v1/links  ------> all links
router.get('/', requireToken, getLinks)

// POST      /api/v1/links -------> create link
router.post('/', requireToken, bodyLinkValidator, createLink)

// GET       /api/v1/links/:id ---> single link
router.get('/:id', requireToken, paramsLinkValidator, getLink)

// DELETE    /api/v1/links/:id  --> delete link
router.delete("/:id", requireToken, paramsLinkValidator, removeLink)

// PATCH/PUT /api/v1/links/:id  --> update link

export default router;
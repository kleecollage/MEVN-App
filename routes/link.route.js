import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validatorManager.js";
import { redirectLink } from "../controllers/redirect.controller.js";

const router = Router();

// GET       /api/v1/links  ------> all links
router.get('/', requireToken, getLinks)

// GET       /api/v1/links/:id ---> single link
// router.get('/:id', requireToken, paramsLinkValidator, getLink) // traditional GET used for CRUD's
router.get('/:nanoLink', redirectLink)

// POST      /api/v1/links -------> create link
router.post('/', requireToken, bodyLinkValidator, createLink)

// DELETE    /api/v1/links/:id  --> delete link
router.delete("/:id", requireToken, paramsLinkValidator, removeLink)

// PATCH/PUT /api/v1/links/:id  --> update link
router.patch("/:id", requireToken, paramsLinkValidator, bodyLinkValidator, updateLink)

export default router;
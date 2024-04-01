import express from "express";
import { registerUser, userLogin } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/",registerUser);
router.post("/login",userLogin);

export default router;
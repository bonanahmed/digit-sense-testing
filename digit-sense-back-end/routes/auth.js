import express from "express";
const router = express.Router();
import { createUser, login } from "./../controller/auth.js";

//Register
router.post("/register", async (req, res) => {
  createUser(req, res);
});

//Login
router.post("/login", async (req, res) => {
  login(req, res);
});

export default router;

import express from "express";
import verifyToken from "./../middleware/verifyToken.js";
import {
  deleteUser,
  getUserDetail,
  getUserList,
  updatePassword,
  updateUser,
  createUser,
} from "../controller/user.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  createUser(req, res);
});

router.get("/list", async (req, res) => {
  getUserList(req, res);
});

router.get("/get/:id", verifyToken, async (req, res) => {
  getUserDetail(req, res);
});
router.put("/update/:id", verifyToken, async (req, res) => {
  updateUser(req, res);
});
router.put("/update/password/:id", verifyToken, async (req, res) => {
  updatePassword(req, res);
});
router.delete("/delete/:id", verifyToken, async (req, res) => {
  deleteUser(req, res);
});

export default router;

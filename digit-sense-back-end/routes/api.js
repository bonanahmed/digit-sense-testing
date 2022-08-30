import express from "express";
import checkLoginStatus from "./../controller/api.js";
import verifyToken from "./../middleware/verifyToken.js";
const router = express.Router();

//Check Login
router.get("/", verifyToken, async (req, res) => {
  checkLoginStatus(req, res);
});

export default router;

import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access Denied");

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "Invalid Token",
    });
  }
}

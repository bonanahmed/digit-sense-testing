import Account from "../model/Account.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { genSalt, hash, compare } = bcrypt;

export const createUser = async (req, res) => {
  try {
    //Validate First
    const usernameExist = await Account.findOne({
      username: req.body.username,
    });
    if (usernameExist)
      return res.status(400).send({
        status: "error",
        message: "Username already exist",
      });

    //Hash The Password
    const salt = await genSalt(10);
    const hashPassword = await hash(req.body.password, salt);

    const account = new Account({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      username: req.body.username,
      password: hashPassword,
      role: req.body.role,
      profile: req.body.profile,
      createdBy:
        req.body.createdBy !== null ||
        req.body.createdBy !== undefined ||
        req.body.createdBy !== ""
          ? req.body.createdBy
          : `${req.body.firstName} ${req.body.middleName} ${req.body.lastName}`,
    });

    const savedAccount = await account.save();
    res.status(200).send({
      status: "success",
      message: "User has been created",
      data: savedAccount,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  const account = await Account.findOne({ username: req.body.username });
  if (!account)
    return res.status(400).send({
      status: "error",
      message: "Username or password is wrong",
    });
  //Password is correct
  const validPass = await compare(req.body.password, account.password);
  if (!validPass)
    return res.status(400).send({
      status: "error",
      message: "Username or password is wrong",
    });
  const token = jwt.sign(
    {
      _id: account._id,
      role: account.role,
      fullName: `${account.fullName}`,
    },
    process.env.TOKEN_SECRET
  );
  try {
    res.status(200).send({
      status: "success",
      message: "Login Success",
      data: {
        token: token,
        role: account.role,
      },
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

import Account from "../model/Account.js";
import bcryptjs from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    //Validate First
    // console.log(req.body);
    const usernameExist = await Account.findOne({
      username: req.body.username,
    });
    if (usernameExist)
      return res.status(400).send({
        status: "error",
        message: "Username already exist",
      });

    //Hash The Password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const account = new Account({
      fullName: req.body.fullName,
      email: req.body.email,
      username: req.body.username,
      password: hashPassword,
      age: req.body.age,
      address: req.body.address,
      profilePicture: req.body.profilePicture,
      role: req.body.role,
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
    console.log(error);
    res.status(400).send(error);
  }
};

export const getUserList = async (req, res) => {
  const { search, page, perpage } = req.query;
  try {
    let query = {
      role: "user",
    };
    if (search)
      query = {
        ...query,
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      };
    let options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perpage, 10) || 1,
      // sort: {
      //   lastCheckIn: -1,
      // },
    };
    const account = await Account.paginate(query, options);
    if (!account)
      return res.status(404).send({
        status: "error",
        message: "User Data not found",
      });
    let data = account.docs;
    res.status(200).json({
      status: "success",
      message: "Get List Account Success",
      data: data,
      total: account.total,
      limit: account.limit,
      page: account.page,
      pages: account.pages,
    });
  } catch (error) {
    console.log("Accessing /api/user/list error =>", error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan",
      data: error,
    });
  }
};

export const getUserDetail = async (req, res) => {
  let id = req.params.id;
  try {
    const account = await Account.findOne({ _id: id });
    if (!account)
      return res.status(404).send({
        status: "error",
        message: "Account Data not found",
      });
    let data = account;
    res.status(200).json({
      status: "success",
      message: "Get Account Detail Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan",
      data: error,
    });
  }
};

export const updateUser = async (req, res) => {
  let id = req.params.id;
  try {
    let account = req.body;
    account.updatedDate = Date.now();
    const updatedDataAsset = await Account.findByIdAndUpdate(id, account);
    let data = updatedDataAsset;
    res.status(200).json({
      status: "success",
      message: "Berhasil update data",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan",
      data: error,
    });
  }
};

export const updatePassword = async (req, res) => {
  let id = req.params.id;
  try {
    //Hash The Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let password = {
      password: hashPassword,
    };
    const updatedDataPassword = await Account.findByIdAndUpdate(id, password);
    let data = updatedDataPassword;
    res.status(200).json({
      status: "success",
      message: "Berhasil update data",
      data: data,
    });
  } catch (error) {
    console.log(`Accessing /api/user/update error with id ${id} =>`, error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan",
      data: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    const deletedDataAccount = await Account.findByIdAndRemove(id);
    let data = deletedDataAccount;
    console.log(`Accessing /api/user/delete with id ${id} success`);
    res.status(200).json({
      status: "success",
      message: "Berhasil hapus data",
      data: data,
    });
  } catch (error) {
    console.log(`Accessing /api/user/delete error with id ${id} =>`, error);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan",
      data: error,
    });
  }
};

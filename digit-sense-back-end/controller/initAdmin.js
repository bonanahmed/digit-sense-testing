import Account from "./../model/Account.js";
import bcrypt from "bcryptjs";

export const initAdmin = async () => {
  const usernameExist = await Account.findOne({ username: "superadmin" });
  if (usernameExist) {
    console.log("Admin Already Exist");
  } else {
    //Hash The Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(
      `${process.env.ADMIN_PASSWORD}`,
      salt
    );

    const account = new Account({
      firstName: "Super Admin",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "superadmin@digit-sense.com",
      username: "superadmin",
      password: hashPassword,
      role: "superadmin",
      createdBy: "superadmin",
    });

    const savedAccount = await account.save();
    console.log("Super Admin Has Been Created", savedAccount);
  }
};

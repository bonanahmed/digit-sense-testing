const checkLoginStatus = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "You are logged in",
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan",
      data: error,
    });
  }
};

export default checkLoginStatus;

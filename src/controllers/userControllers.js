const initModel = require("../models/init-models");
const sequelize = require("../models/index");
const model = initModel(sequelize);
const authController = require("./authControllers");

// Lay Danh Sach Loai Nguoi Dung
const getUserType = async (req, res) => {
  try {
    const result = await model.loai_nguoi_dung.findAll();
    const data = {
      statusCode: 200,
      message: "Xử lý thành công!",
      content: result,
    };
    res.send(data);
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Xử lý thất bại!",
    });
    console.log(err);
  }
};

// Lay Danh Sach Nguoi Dung
const getAllUser = async (req, res) => {
  try {
    const result = await model.nguoi_dung.findAll();
    const data = {
      statusCode: 200,
      message: "Xử lý thành công!",
      content: result,
    };
    res.send(data);
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Xử lý thất bại!",
    });
    console.log(err);
  }
};

// Lay Danh Sach Nguoi Dung Phan Trang
const getUserPagination = async (req, res) => {
  try {
    const { soTrang, soPhanTuTrenTrang } = req.body;
    const limit = parseInt(soPhanTuTrenTrang);
    const page = parseInt(soTrang);
    const offset = (page - 1) * limit;
    const result = await model.nguoi_dung.findAndCountAll({
      offset,
      limit,
    });
    const data = {
      statusCode: 200,
      message: "Xử lý thành công!",
      content: {
        total: result.count,
        data: result.rows,
      },
    };
    res.send(data);
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Xử lý thất bại!",
    });
    console.log(err);
  }
};

// admin Them Nguoi Dung
const createUser = async (req, res) => {
  try {
    const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;
    const checkTaiKhoan = await model.nguoi_dung.findOne({
      where: {
        taiKhoan,
      },
    });
    const checkEmail = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkTaiKhoan) {
      res.send({
        statusCode: 400,
        message: "Tài khoản đã tồn tại!",
      });
    } else {
      if (checkEmail) {
        res.send({
          statusCode: 400,
          message: "Email đã tồn tại!",
        });
      } else {
        const userModel = {
          taiKhoan,
          matKhau: authController.hashPassword(matKhau),
          email,
          soDt,
          hoTen,
        };
        const result = await model.nguoi_dung.create(userModel);
        const data = {
          statusCode: 200,
          message: "Tạo người dùng thành công!",
          content: {
            taiKhoan: result.taiKhoan,
            matKhau: result.matKhau,
            email: result.email,
            soDt: result.soDt,
            maNhom: result.maNhom,
            hoTen: result.hoTen,
          },
        };
        res.send(data);
      }
    }
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Tạo người dùng thất bại, lỗi server!",
    });
    console.log(err);
  }
};

// admin Cap Nhat Thong Tin Nguoi Dung
const updateUser = async (req, res) => {
  try {
    const { maNguoiDung } = req.params;
    const { taiKhoan, matKhau, email, soDt, hoTen, maLoaiNguoiDung, maNhom } =
      req.body;
    const checkAccount = await model.nguoi_dung.findOne({
      where: {
        maNguoiDung,
      },
    });
    if (!checkAccount) {
      res.send({
        statusCode: 400,
        message: "Tài khoản không tồn tại!",
      });
    } else {
      const userModel = {
        taiKhoan,
        matKhau: authController.hashPassword(matKhau),
        email,
        soDt,
        hoTen,
        maLoaiNguoiDung,
        maNhom,
      };
      const result = await model.nguoi_dung.update(userModel, {
        where: {
          maNguoiDung,
        },
      });
      const data = {
        statusCode: 200,
        message: "Cập nhật thành công!",
        content: {
          taiKhoan,
          matKhau,
          email,
          soDt,
          maNhom,
          maLoaiNguoiDung,
          hoTen,
        },
      };
      res.send(data);
    }
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Cập nhật thất bại, lỗi server!",
    });
    console.log(err);
  }
};

// admin Xoa Nguoi Dung
const deleteUser = async (req, res) => {
  try {
    const { taiKhoan } = req.params;
    const checkAccount = await model.nguoi_dung.findOne({
      where: {
        taiKhoan,
      },
    });
    if (!checkAccount) {
      res.send({
        statusCode: 400,
        message: "Tài khoản không tồn tại!",
      });
    } else {
      await model.nguoi_dung.destroy({
        where: {
          taiKhoan,
        },
      });
      const data = {
        statusCode: 200,
        message: "Xóa người dùng thành công!",
        content: "Đã xóa thành công!",
      };
      res.send(data);
    }
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Xóa thất bại, lỗi server!",
    });
    console.log(err);
  }
};

// Dang Ky
const signUp = async (req, res) => {
  try {
    const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;
    const checkTaiKhoan = await model.nguoi_dung.findOne({
      where: {
        taiKhoan,
      },
    });
    const checkEmail = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkTaiKhoan) {
      res.send({
        statusCode: 400,
        message: "Tài khoản đã tồn tại!",
      });
    } else {
      if (checkEmail) {
        res.send({
          statusCode: 400,
          message: "Email đã tồn tại!",
        });
      } else {
        const userModel = {
          taiKhoan,
          matKhau: authController.hashPassword(matKhau),
          email,
          soDt,
          hoTen,
        };
        const result = await model.nguoi_dung.create(userModel);
        const data = {
          statusCode: 200,
          message: "Đăng ký thành công!",
          content: {
            taiKhoan: result.taiKhoan,
            matKhau: result.matKhau,
            email: result.email,
            soDt: result.soDt,
            maNhom: result.maNhom,
            hoTen: result.hoTen,
          },
        };
        res.send(data);
      }
    }
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Đăng ký thất bại, lỗi server!",
    });
    console.log(err);
  }
};

// Dang Nhap
const signIn = async (req, res) => {
  try {
    const { taiKhoan, matKhau } = req.body;
    const checkTaiKhoan = await model.nguoi_dung.findOne({
      where: {
        taiKhoan,
      },
    });
    if (!checkTaiKhoan) {
      res.send({
        statusCode: 400,
        message: "Tài khoản không tồn tại!",
      });
    } else {
      const checkMatKhau = authController.comparePassword(
        matKhau,
        checkTaiKhoan.matKhau
      );
      if (checkMatKhau) {
        const token = authController.generateToken(checkTaiKhoan);
        const data = {
          taiKhoan: checkTaiKhoan.taiKhoan,
          hoTen: checkTaiKhoan.hoTen,
          email: checkTaiKhoan.email,
          soDt: checkTaiKhoan.soDt,
          maNhom: checkTaiKhoan.maNhom,
          maLoaiNguoiDung: checkTaiKhoan.maLoaiNguoiDung,
          accessToken: token,
        };
        res.send({
          statusCode: 200,
          message: "Đăng nhập thành công!",
          content: data,
        });
      } else {
        res.send({
          statusCode: 400,
          message: "Mật khẩu không đúng",
        });
      }
    }
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Đăng nhập thất bại, lỗi server!",
    });
    console.log(err);
  }
};

// Tim Kiem Nguoi Dung
const searchUser = async (req, res) => {
  try {
    const { tuKhoa } = req.body;
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM nguoi_dung WHERE taiKhoan LIKE '%${tuKhoa}%' OR hoTen LIKE '%${tuKhoa}%'`,
      { tupleFormat: "array" }
    );
    if (results.length === 0) {
      res.send({
        statusCode: 400,
        message: "Không tìm thấy kết quả nào!",
      });
    } else {
      res.send({
        statusCode: 200,
        message: "Tìm kiếm thành công!",
        content: results,
      });
    }
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Tìm kiếm thất bại, lỗi server!",
    });
    console.log(err);
  }
};

// Tim Kiem Nguoi Dung Phan Trang
const searchUserPagination = async (req, res) => {
  try {
    const { tuKhoa, soTrang, soPhanTuTrenTrang } = req.body;
    const page = parseInt(soTrang);
    const limit = parseInt(soPhanTuTrenTrang);
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM nguoi_dung WHERE taiKhoan LIKE '%${tuKhoa}%' OR hoTen LIKE '%${tuKhoa}%' LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`,
      { tupleFormat: "array" }
    );
    if (results.length === 0) {
      res.send({
        statusCode: 400,
        message: "Không tìm thấy kết quả nào!",
      });
    } else {
      res.send({
        statusCode: 200,
        message: "Tìm kiếm thành công!",
        content: results,
      });
    }
  } catch (err) {
    res.send({
      statusCode: 500,
      message: "Tìm kiếm thất bại, lỗi server!",
    });
    console.log(err);
  }
};

// Lay thong tin nguoi dung

module.exports = {
  createUser,
  signUp,
  signIn,
  getUserType,
  getAllUser,
  getUserPagination,
  updateUser,
  deleteUser,
  searchUser,
  searchUserPagination,
};

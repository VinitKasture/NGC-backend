// Pacages
const bcrypt = require("bcrypt");
// Models
const Admin = require("../Models/Admin");
const Course = require("../Models/Course");
const Client = require("../Models/Client");

// Middlewares
const { createToken } = require("../middleware/jwt");

const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new Error("Email is not registered!");
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        throw new Error("Password is incorrect!");
      } else {
        const token = createToken(
          {
            _id: admin._id,
            email: admin.email,
            role: admin.role,
          },
          "30d"
        );
        res.status(200).json({
          token,
          message: "Login Successfull!",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });

    if (user) {
      throw new Error("Email is already registered!");
    }
    console.log(email, password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(200).json({
      newAdmin,
      message: "Signup Successfull!",
    });
  } catch (error) {
    next(error);
  }
};

const createAdmission = async (req, res, next) => {
  try {
    const { name, feesPaid, phoneNumber, address, courseId } = req.body;

    const newClient = await new Client({
      name,
      feesPaid: [{ amount: feesPaid, date: new Date() }],
      phoneNumber,
      address,
      courseId,
    }).save();

    res.status(200).json({ newClient });
  } catch (error) {
    next(error);
  }
};

const addCourse = async (req, res, next) => {
  try {
    const { name, fees, monthlyInstallment } = req.body;

    const newCourse = new Course({ name, fees, monthlyInstallment });

    await newCourse.save();

    res.status(200).json({ newCourse: newCourse });
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    next(error);
  }
};

const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
    ]);
    res.status(200).json({ clients });
  } catch (error) {
    next(error);
  }
};

const addInstallment = async (req, res, next) => {
  try {
    const { amount, clientId, date } = req.body;

    const client = await Client.findByIdAndUpdate(
      { _id: clientId },
      {
        $push: {
          feesPaid: {
            $each: [{ amount, date }],
            $position: 0,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Installment Paid!" });
  } catch (error) {
    next(error);
  }
};

const getClientsCountByCourses = async (req, res, next) => {
  try {
    const enrolledStudents = await Course.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "_id",
          foreignField: "courseId",
          as: "clients",
        },
      },
      {
        $project: {
          _id: 0,
          courseName: "$name",
          clients: "$clients.name",
          feesPaid: "$clients.feesPaid",
        },
      },
    ]);

    res.status(200).json({ enrolledStudents });
  } catch (error) {
    next(error);
  }
};

const getPopularCourses = async (req, res, next) => {
  try {
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "_id",
          foreignField: "courseId",
          as: "clients",
        },
      },
      {
        $match: {
          "clients.status": false,
        },
      },
      {
        $group: {
          _id: "$name",
          clients: { $push: "$clients.name" },
        },
      },
    ]);

    res.status(200).json({ courses });
  } catch (error) {
    next(error);
  }
};

const updateCourseStatus = async (req, res, next) => {
  try {
    const { clientId, status } = req.body;

    const client = await Client.findByIdAndUpdate(
      { _id: clientId },
      { status: status }
    );

    res.status(200).json({ client, message: "Course status updated!" });
  } catch (error) {
    next(error);
  }
};

const getRevenueDetails = async (req, res, next) => {
  try {
    const revenueDetails = await Client.distinct("feesPaid");

    res.status(200).json({ revenueDetails, message: "Course status updated!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signup,
  addCourse,
  createAdmission,
  getAllCourses,
  getAllClients,
  addInstallment,
  getClientsCountByCourses,
  getPopularCourses,
  updateCourseStatus,
  getRevenueDetails,
};

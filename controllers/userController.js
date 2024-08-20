const express = require("express");
const multer = require("multer");
const userModel = require("../model/userSchema");
const mongoose = require("mongoose");
const upload = require("../middleware/fileUpload");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BASE_URL = "http://localhost:6010/";
const upload_URL = BASE_URL + "my-uploads/";

class userController {
  // const adduser = async (req, res) => {
  //   try {
  //     upload.single("profilePhoto")(req, res, async (err) => {
  //       if (err) {
  //         console.error("Error uploading file:", err);
  //         return res.status(400).json({ message: "Error uploading file" });
  //       }

  //       const { email, password, userName, firstName, lastName, roleId, active } =
  //         req.body;

  //       // Validate required fields
  //       if (!password || !userName || !firstName || !lastName) {
  //         console.error("Missing required fields");
  //         return res.status(400).json({ message: "Missing required fields" });
  //       }

  //       // Validate roleId
  //       if (!mongoose.Types.ObjectId.isValid(roleId)) {
  //         console.error("Invalid roleId");
  //         return res.status(400).json({ message: "Invalid roleId" });
  //       }

  //       // Hash password using bcrypt
  //       const salt = await bcrypt.genSalt(10);
  //       const hashedPassword = await bcrypt.hash(password, salt);

  //       try {
  //         const user = new userModel({
  //           password: hashedPassword,
  //           email,
  //           userName,
  //           firstName,
  //           lastName,
  //           profilePhoto: `${upload_URL}${req.file.filename}`,
  //           roleId,
  //           active: active || 1, // set default value for active field
  //         });

  //         await user.save();
  //         res.status(201).json(user);
  //       } catch (err) {
  //         console.error("Error creating user:", err);
  //         res.status(500).json({ message: "Error creating user" });
  //       }
  //     });
  //   } catch (err) {
  //     console.error("Error in adduser function:", err);
  //     res.status(500).json({ message: "Error creating user" });
  //   }
  // };

  //here is the optional for photo upload ------------

  // here this is the code for only register field to add for signup---
  //required field like only username,firstname,lastname,password

  static addUser = async (req, res) => {
    try {
      upload.single("profilePhoto")(req, res, async (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(400).json({ message: "Error uploading file" });
        }

        const {
          email,
          password,
          userName,
          firstName,
          lastName,
          roleId,
          active,
        } = req.body;

        // Initialize user object
        const user = {};

        // Validate and set required fields
        if (!userName) {
          console.error("Missing required field: userName");
          return res
            .status(400)
            .json({ message: "Missing required field: userName" });
        }
        user.userName = userName;

        if (!firstName) {
          console.error("Missing required field: firstName");
          return res
            .status(400)
            .json({ message: "Missing required field: firstName" });
        }
        user.firstName = firstName;

        if (!lastName) {
          console.error("Missing required field: lastName");
          return res
            .status(400)
            .json({ message: "Missing required field: lastName" });
        }
        user.lastName = lastName;

        if (!password) {
          console.error("Missing required field: password");
          return res
            .status(400)
            .json({ message: "Missing required field: password" });
        }

        // Hash password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;

        // Set optional fields
        if (email) {
          user.email = email;
        }
        if (roleId) {
          if (!mongoose.Types.ObjectId.isValid(roleId)) {
            console.error("Invalid roleId");
            return res.status(400).json({ message: "Invalid roleId" });
          }
          user.roleId = roleId;
        }
        if (active !== undefined) {
          user.active = active;
        }

        // Set profile photo if uploaded
        if (req.file) {
          user.profilePhoto = `${upload_URL}${req.file.filename}`;
        }

        try {
          const newUser = new userModel(user);
          await newUser.save();
          res.status(201).json(newUser);
        } catch (err) {
          console.error("Error creating user:", err);
          res.status(500).json({ message: "Error creating user" });
        }
      });
    } catch (err) {
      console.error("Error in adduser function:", err);
      res.status(500).json({ message: "Error creating user" });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const user = await userModel.findOne({ email }).lean();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      let genToken = jwt.sign(
        { email: user.email, role: user.roleId },
        "secret",
        { expiresIn: "1h", algorithm: "HS256" }
      );

      // Login successful, return user data
      res.status(200).json({
        name: user.firstName,
        email: user.email,
        token: genToken,
        message: "Login successful",
      });
    } catch (err) {
      console.error("Error in login function:", err.message);
      res.status(500).json({ error: "Error logging in" });
    }
  };

  static getUser = async (req, res) => {
    try {
      const user = await userModel.find().exec();
      res.json(user);
    } catch (error) {
    
      res
        .status(500)
        .json({ message: "Error fetching roles", error: error.message });
    }
  };

  // Get a user by ID
  static getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const role = await userModel.findById(id, req.body);
      if (!role) {
        res.status(404).json({ message: "Role not found" });
      } else {
        res.status(200).json({ message: "updated sucessfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching role", error: error.message });
    }
  };
  /// update a user by Id
  // const updateUser = async (req, res) => {
  //   try {
  //     upload.single("profilePhoto")(req, res, async (err) => {
  //       if (err) {
  //         console.error("Error uploading file:", err);
  //         return res.status(400).json({ message: "Error uploading file" });
  //       }

  //       const {
  //         email,
  //         password,
  //         currentPassword,
  //         userName,
  //         firstName,
  //         lastName,
  //       } = req.body;

  //       // Validate required fields
  //       if (!email) {
  //         console.error("Email is required");
  //         return res.status(400).json({ message: "Email is required" });
  //       }

  //       if (password && !currentPassword) {
  //         console.error("Current password is required to update password");
  //         return res
  //           .status(400)
  //           .json({ message: "Current password is required to update password" });
  //       }

  //       // Find the user by email
  //       const user = await userModel.findOne({ email });
  //       if (!user) {
  //         console.error("User not found");
  //         return res.status(404).json({ message: "User not found" });
  //       }

  //       // Verify current password if password update is requested
  //       if (password) {
  //         const isValid = await bcrypt.compare(currentPassword, user.password);
  //         if (!isValid) {
  //           console.error("Invalid current password");
  //           return res.status(401).json({ message: "Invalid current password" });
  //         }

  //         // Hash new password using bcrypt
  //         const salt = await bcrypt.genSalt(10);
  //         const hashedPassword = await bcrypt.hash(password, salt);
  //         user.password = hashedPassword;
  //       }

  //       // Update email if changed
  //       if (req.body.email && req.body.email !== user.email) {
  //         user.email = req.body.email;
  //       }

  //       //update username if changed
  //       if (req.body.userName) {
  //         user.userName = req.body.userName;
  //       }
  //       //update username if changed
  //       if (req.body.firstName) {
  //         user.firstName = req.body.firstName;
  //       }

  //       //update username if changed
  //       if (req.body.lastName) {
  //         user.lastName = req.body.lastName;
  //       }
  //       // Update profile photo if uploaded
  //       if (req.file) {
  //         user.profilePhoto = `${upload_URL}${req.file.filename}`;
  //       }

  //       try {
  //         await user.save();
  //         res.status(200).json({ message: "User updated successfully" });
  //       } catch (err) {
  //         console.error("Error updating user:", err);
  //         res.status(500).json({ message: "Error updating user" });
  //       }
  //     });
  //   } catch (err) {
  //     console.error("Error in updateUser function:", err);
  //     res.status(500).json({ message: "Error updating user" });
  //   }
  // };

  static updateUser = async (req, res) => {
    try {
      upload.single("profilePhoto")(req, res, async (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(400).json({ message: "Error uploading file" });
        }

        const {
          email,
          password,
          currentPassword,
          userName,
          firstName,
          lastName,
        } = req.body;

        const userId = req.params.id;

        // Validate required fields
        if (!userId) {
          console.error("User ID is required");
          return res.status(400).json({ message: "User ID is required" });
        }

        if (password && !currentPassword) {
          console.error("Current password is required to update password");
          return res.status(400).json({
            message: "Current password is required to update password",
          });
        }

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
          console.error("User not found");
          return res.status(404).json({ message: "User not found" });
        }

        // Verify current password if password update is requested
        if (password) {
          const isValid = await bcrypt.compare(currentPassword, user.password);
          if (!isValid) {
            console.error("Invalid current password");
            return res
              .status(401)
              .json({ message: "Invalid current password" });
          }

          // Hash new password using bcrypt
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          user.password = hashedPassword;
        }

        // Update email if changed
        if (req.body.email && req.body.email !== user.email) {
          user.email = req.body.email;
        }

        //update username if changed
        if (req.body.userName) {
          user.userName = req.body.userName;
        }
        //update username if changed
        if (req.body.firstName) {
          user.firstName = req.body.firstName;
        }

        //update username if changed
        if (req.body.lastName) {
          user.lastName = req.body.lastName;
        }
        // Update profile photo if uploaded
        if (req.file) {
          user.profilePhoto = `${upload_URL}${req.file.filename}`;
        }

        try {
          await user.save();
          res.status(200).json({ message: "User updated successfully" });
        } catch (err) {
          console.error("Error updating user:", err);
          res.status(500).json({ message: "Error updating user" });
        }
      });
    } catch (err) {
      console.error("Error in updateUserById function:", err);
      res.status(500).json({ message: "Error updating user" });
    }
  };

  //delete user
  static deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const user = await userModel.deleteOne({ _id: userId });
      if (user.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  };
}
module.exports = userController;
// module.exports = {
//   adduser,
//   login,
//   getuser,
//   getuserById,
//   updateUser,
//   deleteUser,
// };

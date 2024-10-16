import { registerUserValidator, loginUserValidator, updateProfileValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
   try {
      //validate user input
      const { error, value } = registerUserValidator.validate(req.body);

      if (error) {
         return res.status(422).json(error);
      }
      //check if user does not exist
      const user = await UserModel.findOne({ email: value.email });
      if (user) {
         return res.status(409).json('User already exists!');
      }
      //hash password
      const hasdedPassword = bcrypt.hashSync(value.password, 10);
      //save user into database
      await UserModel.create({
         ...value,
         password: hasdedPassword
      })
      //send user confirmation email
      //respond to request
      res.json('User registered!');
   } catch (error) {
      next(error);
   }
}

export const loginUser = async (req, res, next) => {
   try {
      //validate user input
      const { error, value } = loginUserValidator.validate(req.body);
      if (error) {
         return res.status(422).json(error);
      }
      //find one user with identifier
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
         return res.status(404).json('User does not exist!');
      }
      //compare their passwords
      const correctPassword = bcrypt.compareSync(value.password, user.password);
      if (!correctPassword) {
         return res.status(401).json('Invalid credentials!');
      }
      //sign a token for the user
      const token = jwt.sign
         ({ id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
         );
      //respond to request
      res.json({
         message: 'User logged in!',
         accessToken: token
      })
   } catch (error) {
      next(error);
   }
}

export const getProfile = async (req, res, next) => {
   try {
      console.log(req.auth);
      //find authenticated user from database
      const user = await UserModel
         .findById(req.auth.id)
         .select({ password: false });
      //respond to request
      res.json(user);
   } catch (error) {
      next(error);
   }
}

export const logoutUser = (req, res, next) => {
   res.json('user logged out')
}

export const updateProfile = (req, res, next) => {
   try {
      //Validate user input
      const { error, value } = updateProfileValidator.validate(req.body);
      res.json('profile has been updated')
   } catch (error) {
      next(error);
   }
}
import { Router } from "express";
import { registerUser, loginUser, logoutUser, updateProfile, getProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";

//create router
const userRouter = Router();


//define routes
userRouter.post('/users/registerUser', registerUser);

userRouter.post('/users/loginUser', loginUser);

userRouter.get('/users/me', getProfile);

userRouter.post('/users/logoutUser', logoutUser);

userRouter.post('/users/me', userAvatarUpload.single('avatar'), updateProfile);

//export router
export default userRouter
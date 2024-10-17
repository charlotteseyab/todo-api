//import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms:["HS256"]
})


// export const isAuthenticated = (req, res, next) => {
//     try {
//   // get authorization from headers
// const authorization = req.headers.authorization;
//   //extract token from authorization header
// const token = authorization.split(' ')[1];
//  //verify and decode token
// const decoded = jwt.verify(
//     token,
//     process.env.JWT_PRIVATE_KEY
// );
//   //attach user to request
// req.user = {id: decoded.id}
//   //hand over request to the next middleware/controller
// next();
//     } catch (error) {
//         next(error);
//     }
// }
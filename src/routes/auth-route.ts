
import { Router } from "express";
import { authController } from "../controller/auth-controller";




const authRouter = Router();


authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;
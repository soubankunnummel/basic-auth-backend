import { Router } from "express";
import { profileController } from "../controller/profile-controller";
import { protectRoute } from "../middleware/protect-route";


const userRouter = Router();

userRouter.get('/profile',protectRoute, profileController.getProfile);


export default userRouter;


import { Request, Response } from "express";
import User from "../model/user-model";

export default class ProfileController {

    async getProfile(req: Request | any, res: Response | any) {
        try {
            console.log(req.user);       
           
            const user = await User.findOne({ email: req.user.email });
            return res.status(200).json({ user });
        } catch (error:any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export const profileController = new ProfileController();
import { Request, Response } from "express";
import User from "../model/user-model";
import jwt from "jsonwebtoken";
import userSchema from "../validator/user-validate";


export default class AuthController {


    async register(req: Request | any, res: Response | any) {

        try {
            const { username, name, email, password } = req.body;
            console.log(`fomr client ${req.body}`);

            const {error, value}  = userSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const isExist = await User.findOne({ email :value.email });
            if (isExist) {
                return res.status(400).json({ error: "email already exist" });
            }

            console.log(req.body);
            const user = await User.create({ 
                username,
                name,
                email,
                password,
            });
            return res.status(201).json(user);
        } catch (error : any) {
            return res.status(400).json({ error: error.message });
        }
    }



    async login(req: Request | any, res: Response | any) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                return res.status(404).json({ error: "user not found" });
            }

            const passwordCheck = await user.comparePassword(password);
            console.log(passwordCheck)

            if (!passwordCheck) {
                return res.status(401).json({ error: "password is incorrect" });
            }

         

           if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }

            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            if(token){
                
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            }
            return res.status(200).json({ token :token, message: "login success" });
        } catch (error:any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async logout(req: Request | any, res: Response | any) {
        res.clearCookie("token");
        return res.status(200).json({ message: "logout success" });
    }
}

export const authController = new AuthController();
import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface User extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    registrationDate: Date;
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    const user = this as User;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const User = model<User>("User", userSchema);
export default User;
import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>({
    dataHash: {
        type: String,
        required: true,
        unique: true
    },
    publicKey: {
        type: String,
        required: true,
        unique: true
    }
});

export const User = model<IUser>('User', userSchema);
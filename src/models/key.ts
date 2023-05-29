import { model, Schema } from "mongoose";
import { IKey } from "../interfaces/key";

const keySchema = new Schema<IKey>({
    publicKey: {
        type: String,
        required: true,
        unique: true
    },
    creationTime: {
        type: Date,
        required: true
    },
    expirationTime: {
        type: Date,
        required: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    }
});

export const Key = model('Key', keySchema);
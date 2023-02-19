import { model, Schema } from "mongoose";
import { IRefreshRequest } from "../interfaces/refreshRequest";

const refreshRequestSchema = new Schema<IRefreshRequest>({
    uid: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    }
});

export const RefreshRequest = model<IRefreshRequest>('RefreshRequest', refreshRequestSchema);
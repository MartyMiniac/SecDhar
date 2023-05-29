import { Router } from "express";
import { resolve } from "path";

const filePtr = (fname: string) => {
    const VIEWSPATH = __dirname+'/../../views/';
    return resolve(VIEWSPATH+fname);
}
export const router:Router = Router();

router.get('/', (req, res) => {
    return res.sendFile(filePtr('index.html'))
})
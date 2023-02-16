import { Router, Request, Response } from "express";

import { registerBodyValidator } from "../helpers/bodyValidators";
import { AadharVerifier, checkAlreadyRegistered, generatePublicPrivateKeyPair, genrateExiprationDate, returnPublicKey, signData, updateRegistrationInfo } from "../controllers/user";

export const router: Router = Router();

/**
 * Send Aadhar Info to Register the person
 * verify the info using the aadhar apis provided by the gov of india
 * hash the data
 * check for any already registered info using hash
 * if already registered then invalidate the registeration request <end>
 * after verification generate public key private key pair and set an expiration date
 * sign the public key, creation date and expiration date with my gov private key
 * Hash the info and store it corresponding to the public key, creation date and expiration date
 * send the public key private key pair along with digital signature, creation date and expiration date to the person
 */
router.post('/register', async (req: Request, res: Response) => {
    if(!registerBodyValidator(req.body)) {
        return res.status(400).json({
            success: false,
            message: 'Requested Information name, dob, gender, address and aadharNo Not found'
        })
    }
    else {
        if(await AadharVerifier(req.body) && !(await checkAlreadyRegistered(req.body))) {
            const keyPair = await generatePublicPrivateKeyPair();
            const timePair = genrateExiprationDate(3);
            const data = {
                keypair: keyPair,
                time: timePair,
                sign: signData({keypair: keyPair, time: timePair})
            }

            updateRegistrationInfo(data)
            .then(() => {
                return res.json(data)
            })

            // return res.json(await generatePublicPrivateKeyPair());
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'Aadhar data verification failed or already registered'
            })
        }
    }
})

router.get('/getPublicKey', (req: Request, res: Response) => {
    return res.json({
        publicKey: returnPublicKey()
    })
})
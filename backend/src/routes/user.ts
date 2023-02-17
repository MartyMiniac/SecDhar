import { Router, Request, Response } from "express";

import { registerBodyValidator } from "../helpers/bodyValidators";
import { AadharVerifier, checkAlreadyRegistered, generatePublicPrivateKeyPair, generateExiprationDate, returnPublicKey, signData, updateRegistrationInfo, hashInfo } from "../controllers/user";

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
        try {
            if(await AadharVerifier(req.body) && !(await checkAlreadyRegistered(req.body))) {
                const keyPair: any = await generatePublicPrivateKeyPair();
                // considering 3 days of key retention period is pretty generous (btw open for suggessions)
                const timePair = generateExiprationDate(3);
                const data = {
                    keypair: keyPair,
                    time: timePair,
                    sign: signData({publicKey: keyPair.publicKey, time: timePair}),
                    dataHash: hashInfo(req.body)
                }
                // console.log(JSON.stringify({publicKey: keyPair.publicKey, time: timePair}))
    
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
        catch {
            return res.status(500).json({
                success: false,
                message: 'Internal Error'
            })
        }
    }
})

router.get('/getPublicKey', (req: Request, res: Response) => {
    return res.json({
        publicKey: returnPublicKey()
    })
})
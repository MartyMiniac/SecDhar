import { Router, Request, Response } from "express";

import { registerBodyValidator, requestRefreshValidator, issueRefreshValidator } from "../helpers/bodyValidators";
import { AadharVerifier, checkAlreadyRegistered, generatePublicPrivateKeyPair, generateExiprationDate, returnPublicKey, signData, updateRegistrationInfo, hashInfo, requestRefresh, issueRefresh } from "../controllers/user";
import { IJsonSuccess, IJsonFailure } from "../interfaces/jsonResponse";
import { IIssueRefreshRequest, IRegisterRequest, IRequestRefreshRequest } from "../interfaces/jsonRequestData";
import { IIssueRequestData, IRegisterData, IRequestRefreshData } from "../interfaces/jsonResponseData";
import { IRequestRefresh } from "../interfaces/requestRefresh";
import { IKeyPair } from "../interfaces/keyPair";

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
router.post('/register', async (req: IRegisterRequest, res: Response) => {
    if(!registerBodyValidator(req.body)) {
        const response: IJsonFailure = {
            success: false,
            message: 'Requested Information name, dob, gender, address and aadharNo Not found',
            errorCode: 101
        };
        return res.status(400).json(response);
    }
    else {
        try {
            if(await AadharVerifier(req.body) && !(await checkAlreadyRegistered(req.body))) {
                const keyPair: IKeyPair = await generatePublicPrivateKeyPair();
                // considering 3 days of key retention period is pretty generous (btw open for suggessions)
                const timePair = generateExiprationDate(3);
                // console.log(JSON.stringify({publicKey: keyPair.publicKey, time: timePair}))
                const response: IJsonSuccess<IRegisterData> = {
                    success: true,
                    data: {
                        keyPair: keyPair,
                        timePair: timePair,
                        sign: await signData({publicKey: keyPair.publicKey, timePair: timePair}),
                        // sign: '1',
                        dataHash: hashInfo(req.body)
                    }
                };
                updateRegistrationInfo(response.data)
                .then(() => {
                    return res.json(response)
                })
    
                // return res.json(await generatePublicPrivateKeyPair());
            }
            else {
                const response: IJsonFailure = {
                    success: false,
                    message: 'Aadhar data verification failed or already registered',
                    errorCode: 102
                };
                return res.status(401).json(response);
            }
        }
        catch(err) {
            const response: IJsonFailure = {
                success: false,
                message: 'Internal Error',
                errorCode: 103
            };
            console.log(err)
            return res.status(500).json(response);
        }
    }
})

router.get('/getPublicKey', (req: Request, res: Response) => {
    return res.json({
        publicKey: returnPublicKey()
    })
})

router.post('/requestRefresh', (req: IRequestRefreshRequest, res: Response) => {
    if(!requestRefreshValidator(req.body)) {
        const response: IJsonFailure = {
            success: false,
            message: 'Requested Information dataHash not found',
            errorCode: 301
        };
        return res.status(400).json(response);
    }
    else {
        requestRefresh(req.body.dataHash)
        .then((data: IRequestRefresh) => {
            if(data.success===true) {
                const response: IJsonSuccess<IRequestRefreshData> = {
                    success: true,
                    data: {
                        requestID: data.requestID,
                        encryptedSecret: data.encryptedSecret
                    }
                };
                return res.json(response);
            }
            else {
                const response: IJsonFailure = {
                    success: false,
                    message: 'Requesting Profile not found',
                    errorCode: 302
                };
                return res.status(404).json(response);
            }
        })
    }
})

router.post('/issueRefresh', (req: IIssueRefreshRequest, res: Response) => {
    if(!issueRefreshValidator(req.body)) {
        const response: IJsonFailure = {
            success: false,
            message: 'Requested Information dataHash, decString and requestID not found',
            errorCode: 401
        };
        return res.status(400).json(response);
    }
    else {
        issueRefresh(req.body)
        .then((data: IJsonFailure | IJsonSuccess<IIssueRequestData>) => {
            if(data.success===true) {
                return res.json(data);
            }
            else {
                return res.status(401).json(data);
            }
        })
    }
})
import { webcrypto } from "node:crypto";

export interface IKeyPair {
    privateKey: webcrypto.JsonWebKey,
    publicKey: webcrypto.JsonWebKey
}
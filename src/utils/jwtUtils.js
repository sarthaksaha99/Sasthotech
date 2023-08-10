import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';


const publicKey = fs.readFileSync(path.resolve('secretKeys/tokenECPublic.pem'), 'utf8');
const privateKey = fs.readFileSync(path.resolve('secretKeys/tokenECPrivate.pem'), 'utf8');


// Make a token
export const signToken = (payload) => {
    // Return Promise
    return new Promise((resolve, reject) => {
        // Sign the payload with json web token
        jwt.sign(payload, privateKey, { algorithm: 'RS256' }, (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
}

// Verify Token
export const verifyToken = (token) => {
    // Return Promise
    return new Promise((resolve, reject) => {
        // Verify json web token
        jwt.verify(token, publicKey, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payload);
            }
        });
    });
}
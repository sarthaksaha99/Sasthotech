import createHTTPError from 'http-errors';
import {verifyToken} from '../../utils/jwtUtils.js';


const checkAuth = (types) => {
    return async (req, res, next) => {
        try {
            const {token} = req.signedCookies;
            
            if(!token) throw createHTTPError(401, 'Token is required');

            const {userId, role, diagnosticId, division} = await verifyToken(token);

            req.user = { userId, role, diagnosticId, division };

            if(!types || !types.length) return next();

            let i;
            for(i = 0; i < types.length; i++) 
                if(types[i] === role) break;
        
            if(i === types.length) throw createHTTPError(403, 'You are not authorized');

            return next();
        }
        catch(error) {
            next(error);
        }
    }
}


export default checkAuth;
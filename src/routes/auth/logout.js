import express from "express"
import { verifyToken } from "../../utils/jwtUtils.js";

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const {token} = req.signedCookies;

        // Verify the refresh Token
        await verifyToken(token); // Though we don't need to do this

        // Clear the cookie
        res.clearCookie('token', {
            // path: `api/v1/`
        });


        res.json({
            message: 'Logout successfully'
        });

    }
    catch(error) {
        next(error);
    }
});



export default router
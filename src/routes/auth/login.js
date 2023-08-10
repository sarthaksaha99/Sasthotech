import express from "express"
import createError from "http-errors";
import bcrypt from "bcrypt";
import { signToken } from "../../utils/jwtUtils.js";
import prisma from "../../db/prisma.js";

// Validator
import { requestValidator } from "../../middleware/requestValidator.js";
import { UserSignIn } from "../../validators/user.js";

const router = express.Router();

router.post("/", requestValidator({body: UserSignIn}), async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Check if user already exists
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			}
		});

		if (!user) throw createError(401, "Invalid Login");

		// Check Password
		const check = await bcrypt.compare(password, user.password);

		if (!check) throw createError(401, "Invalid Login");

		// Find devision if there exists
		let division = null;
		if(user.diagnosticId) {
			const diagnostic = await prisma.diagnostic.findUnique({where: {id: user.diagnosticId}});
			division = diagnostic.division;
		}

		// Create Refresh Token
		const token = await signToken({ 
			userId: user.id, 
			role: user.role, 
			diagnosticId: user.diagnosticId,
			division
		});

		// Set cookie to response
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production" ? true : false,
			sameSite: process.env.NODE_ENV === "production" ? "None" : undefined,
			// path: `api/v1`,
			signed: true
		});

		// Delete user credentials
		delete user.password;
		delete user.createdAt;
		delete user.updatedAt;

		res.json({
			message: "Login successfully",
			data: user
		});
	} catch (error) {
		next(error);
	}
});

export default router;

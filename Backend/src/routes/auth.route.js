import { Router } from "express"
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { registerController, loginController, googleCallback } from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", validateRegisterUser, registerController)

router.post("/login", validateLoginUser, loginController)

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
)

export default router
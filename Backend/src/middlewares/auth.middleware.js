import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export const authenticateSeller = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (user.role !== "seller") {
            return res.status(403).json(
                {
                    message: "Request Forbidden, You are not seller"
                }
            )
        }

        req.user = user
        next()
    }
    catch (error) {
        console.log("Error during seller authentication:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
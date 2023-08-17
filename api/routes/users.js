import express from "express"
import {
    updateUser,
    getUser,
    getUsers,
    deleteUser,
} from "../controllers/user.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router()

// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("Hello user, You are logged In")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, You are logged In, you can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello admin,You are logged In, you can delete all accounts")
// })

router.put("/:id", verifyUser ,updateUser)

router.get("/:id", verifyUser , getUser)

router.get("/", verifyAdmin ,getUsers)

router.delete("/:id", verifyUser, deleteUser)

export default router

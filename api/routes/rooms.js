import express from "express"
import {
    createRoom,
    updateRoom,
    getRoom,
    getRooms,
    deleteRoom,
    updateRoomAvailability,
} from "../controllers/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"


const router = express.Router()

router.post("/:hotelId", verifyAdmin, createRoom)

router.put("/:id", verifyAdmin, updateRoom)


router.put("/availability/:id", updateRoomAvailability)

router.get("/:id", getRoom)

router.get("/", getRooms)

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)

export default router

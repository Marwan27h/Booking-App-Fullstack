import express from "express"
import {
    createHotel,
    deleteHotel,
    getHotels,
    getHotel,
    updateHotel,
    countByCity,
    countByType,
    getHotelRooms,
} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/", verifyAdmin, createHotel)

router.put("/:id", verifyAdmin, updateHotel)

router.get("/find/:id", getHotel)

router.delete("/:id", verifyAdmin, deleteHotel)

router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)

export default router

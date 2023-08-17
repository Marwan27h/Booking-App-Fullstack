import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useState, useContext } from "react"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading } = useFetch(`/hotels/room/${hotelId}`)
    const { dates } = useContext(SearchContext)

    const getDateInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start).getTime()

        let list = []

        while (start <= end) {
            // Update 'date' to 'start' here
            list.push(new Date(date).getTime())
            start.setDate(start.getDate() + 1) // Increment 'start' instead of 'date'
        }
        return list
    }

    const allDates = getDateInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        )
        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        )
    }
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDates,
                    })
                    return res.data
                })
            )
            setOpen(false)
            navigate("/")
        } catch (err) {}
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:</span>

                {loading
                    ? "loading"
                    : data.map((item) => (
                          <div className="rItem" key={item._id}>
                              <div className="rItemInfo">
                                  <div className="rTitle">{item.title}</div>
                                  <div className="rDesc">{item.desc}</div>
                                  <div className="rMax">
                                      Max people: <b>{item.maxPeople}</b>
                                  </div>
                                  <div className="rPrice">{item.price}</div>
                              </div>
                              <div className="rSelectRooms">
                                  {item.roomNumbers.map((roomNumber) => (
                                      <div
                                          className="room"
                                          key={roomNumber._id}
                                      >
                                          <label>{roomNumber.number}</label>
                                          <input
                                              type="checkbox" // Use "text" instead of "select"
                                              value={roomNumber._id}
                                              onChange={handleSelect} // Make sure you have defined handleSelect function
                                              disabled={
                                                  !isAvailable(roomNumber)
                                              }
                                          />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
                <button onClick={handleClick} className="rBtn">
                    Reserve Now!
                </button>
            </div>
        </div>
    )
}

export default Reserve

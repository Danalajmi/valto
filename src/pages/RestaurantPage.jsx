import { useLocation, useParams } from "react-router-dom"
import { Phone, Clock } from "lucide-react"
import { useContext, useEffect } from "react"
import UserContext from "../context/userContext"
import { useState } from "react"
import { getARestaurant, getResItems, reserveItem } from "../services/rest"
import { DollarSign, FileText } from "lucide-react"
import "../assets/style/restaurant.css"

const RestaurantPage = () => {
  const location = useLocation()
  const [restaurant, setRestaurant] = useState({})
  const { user } = useContext(UserContext)
  const { restaurantId } = useParams()

  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        let restInfo = await getARestaurant(restaurantId)
        setRestaurant(restInfo)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchRestaurant()
    const fetchItems = async () => {
      try {
        let list = await getResItems(restaurantId)
        setItems(list)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    fetchItems()
  }, [])
  const handleReserve = async (e) => {
    try {
      let item_id = e.target.id
      let response = await reserveItem(item_id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return (
    <div>
      <div className="restaurant-profile">
        <h1 className="restName">{restaurant.name}</h1>

        <div className="restaurant-info">
          <div className="info-row">
            <Clock size={18} />
            <span>
              {restaurant?.opening_time} - {restaurant?.closing_time}
            </span>
          </div>

          <div className="info-row">
            <Phone size={18} />
            <span>{restaurant?.phone_number}</span>
          </div>
        </div>
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <div className="item-card" key={item._id}>
            <h2 className="item-name">{item.name}</h2>

            <div className="item-detail">
              <DollarSign size={18} />
              <span>{item.price}BD</span>
            </div>

            <div className="item-detail description">
              <FileText size={18} />
              <p>{item.description}</p>
            </div>
            {user.role === "Buyer" ? (
              <div className="reserve-btn-container">
                <button
                  id={item._id}
                  className="reserve-btn"
                  onClick={handleReserve}
                >
                  Reserve
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantPage

import { useContext, useState, useEffect } from "react"
import userContext from "../context/userContext"
import { getAllResturants } from "../services/rest"
import Restaurant from "../components/Restaurant"
import "../assets/style/dash.css"
const dashboard = () => {
  const { user } = useContext(userContext)
  const [restaurantList, setRestaurantList] = useState([])
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        let list = await getAllResturants()
        setRestaurantList(list)
      } catch (error) {
        console.log(error)
      }
    }
    fetchRestaurants()
  }, [])
  if (user?.role == "Restaurant Owner") {
    return (
      <div>
      <h1>Hello Restaurant</h1>
      </div>
    )
  } else if (user?.role == "Buyer") {
    return (
      <div className="restaurant-grid">
  {restaurantList?.map((rest) => (
    <div className="restaurant-card-wrapper" key={rest._id}>
      <Restaurant Restaurant={rest} />
    </div>
  ))}
</div>
    )
  }
}

export default dashboard

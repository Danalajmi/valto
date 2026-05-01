import { useContext, useState, useEffect } from "react"
import userContext from "../context/userContext"
import { Link } from "react-router-dom"

import { Phone, Clock } from "lucide-react";
const Restaurant = ({ Restaurant }) => {
  const { user } = useContext(userContext)

  return (

<Link to={`/restaurant/${Restaurant._id}`} className="restaurant-link" state={{ restaurant: Restaurant }}>
  <div className="restaurant-card">
    <h2 className="restaurant-name">{Restaurant.name}</h2>

    <div className="restaurant-details">
      <div className="detail-item">
        <Clock size={18} />
        <span>{Restaurant.opening_time} - {Restaurant.closing_time}</span>
      </div>

      <div className="detail-item">
        <Phone size={18} />
        <span>{Restaurant.phone_number}</span>
      </div>
    </div>
  </div>
</Link>
  )
}

export default Restaurant

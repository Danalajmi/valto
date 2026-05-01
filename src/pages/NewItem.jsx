import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { createItem } from "../services/rest"
import userContext from "../context/userContext"

import "../assets/style/newItem.css"

const NewItem = () => {
  const Navigate = useNavigate()
  const { user } = useContext(userContext)

  const initValues = {
    name: "",
    price: "",
    description: "",
    expiry_time: ""
  }

  const [itemValues, setValues] = useState([initValues])

  const handleChange = (event) => {
    setValues({...itemValues, [event.target.name]: event.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    let item = await createItem(itemValues)
    Navigate(`/restaurant/${item.restaurant_id}`)
  }
  return (
<div className="item-form-container">
  <form className="item-form" onSubmit={handleSubmit}>

    <label htmlFor="name">Item Name</label>
    <input
      type="text"
      name="name"
      id="name"
      value={itemValues.name}
      onChange={handleChange}
      required
    />

    <label htmlFor="price">Price</label>
    <input
      type="number"
      name="price"
      id="price"
      value={itemValues.price}
      onChange={handleChange}
      required
    />

    <label htmlFor="description">Description</label>
    <textarea
      name="description"
      id="description"
      value={itemValues.description}
      onChange={handleChange}
      rows="4"
    ></textarea>

<label htmlFor="expiry_time">Expiry Time</label>
<input
  type="datetime-local"
  name="expiry_time"
  id="expiry_time"
  value={
    itemValues.expiry_time
      ? new Date(itemValues.expiry_time).toISOString().slice(0, 16)
      : ""
  }
  onChange={(e) =>
    setValues({
      ...itemValues,
      expiry_time: e.target.value,
    })
  }
  required
/>

    <button type="submit">Add</button>

  </form>
</div>
  );
}

export default NewItem;

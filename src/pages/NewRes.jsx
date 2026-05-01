import { useContext, useState, useEffect } from "react"
import userContext from "../context/userContext"
import { createRestaurant } from "../services/rest"
import { useNavigate } from "react-router-dom"

const NewRes = () => {
  const Navigate = useNavigate()
  const { user } = useContext(userContext)

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone_number: "",
    email: "",
    opening_time: "",
    closing_time: "",
    latitude: "",
    longitude: "",
    owner: user?.id
  })

  const [errors, setErrors] = useState({})
  const [loadingLocation, setLoadingLocation] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }

    setLoadingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        setFormData((prev) => ({
          ...prev,
          location: `${latitude}, ${longitude}`,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }))

        setLoadingLocation(false)
      },
      () => {
        alert("Unable to retrieve your location.")
        setLoadingLocation(false)
      }
    )
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.phone_number)
      newErrors.phone_number = "Phone number is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.opening_time)
      newErrors.opening_time = "Opening time is required"
    if (!formData.closing_time)
      newErrors.closing_time = "Closing time is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validate()) {

      await createRestaurant(formData)
    Navigate("/dashboard")

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Restaurant Form</h2>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          {loadingLocation ? "Getting location..." : "Use Current Location"}
        </button>

        <input type="hidden" name="latitude" value={formData.latitude} />
        <input type="hidden" name="longitude" value={formData.longitude} />

        <div>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Opening Time</label>
          <input
            type="time"
            name="opening_time"
            value={formData.opening_time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.opening_time && (
            <p className="text-red-500 text-sm mt-1">{errors.opening_time}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Closing Time</label>
          <input
            type="time"
            name="closing_time"
            value={formData.closing_time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.closing_time && (
            <p className="text-red-500 text-sm mt-1">{errors.closing_time}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
export default NewRes;

import Client from "./api"

export const createRestaurant = async (data) => {
  try {
    let res = await Client.post("/restaurant/new", data)
    return res.data
  } catch (error) {
    throw error
  }
}


export const getAllResturants = async () => {
  try {
    let res = await Client.get("/restaurant/all")
    return res.data
  } catch (error) {

  }
}

export const getARestaurant = async(restaurantId) => {
  try {
    let res = await Client.get(`/restaurant/${restaurantId}`)
    return res.data
  } catch (error) {

  }
}

export const getResItems = async(id) => {
  try {
    let res = await Client.get(`/restaurant/${id}/items`)
    return res.data
  } catch (error) {

  }
}

export const createItem = async(data) =>{
  try {
    let res = await Client.post("/restaurant/newItem", data)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const reserveItem = async(data) => {
  try {
    
    let res = await Client.post("restaurant/reserveItem" ,{item_id: data})

    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

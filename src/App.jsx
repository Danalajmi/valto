import { useContext, useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/login"
import Dashboard from "./pages/dashboard"
import UserContext from "./context/userContext"
import Nav from "./components/Nav"

import "./App.css"
import NewRes from "./pages/NewRes"
import NewItem from "./pages/NewItem"
import RestaurantPage from "./pages/RestaurantPage"

const App = () => {
  const { user, saveUser, checkToken } = useContext(UserContext)

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route
            path="/auth/register"
            element={<Register setUser={saveUser} />}
          ></Route>
          <Route
            path="/auth/login"
            element={<Login setUser={saveUser} />}
          ></Route>
          <Route
            path="/auth/login"
            element={<Login setUser={saveUser} />}
          ></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/newItem" element={<NewItem />}></Route>
          <Route path="/addRestaurant" element={<NewRes />}></Route>
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantPage />}
          ></Route>
        </Routes>
      </main>
    </>
  )
}

export default App

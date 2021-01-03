import React, { useState, useEffect, createContext } from "react"

import UserKit from "./data/UserKit"

export const UserContext = createContext()
// the User component wraps  all other components and
// passes the UserContext to them. The userContext is
// both user personal information and the users customer-list

const User = ({ children }) => {
  const userKit = new UserKit()
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [customerList, setCustomerList] = useState(null)
  const [listUpdate, triggerListUpdate] = useState(true)

  useEffect(() => {
    if (userKit.getSessionToken()) {
      userKit
        .getCustomers()
        .then((res) => res.json())
        .then((data) => {
          setCustomerList(data.results)
        })
    }
  }, [listUpdate])

  useEffect(() => {
    if (userKit.getSessionToken()) {
      userKit
        .getCurrentUser()
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setCurrentUser(data)
          }
        })
    }
  }, [loggedIn])

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        customerList,
        setCustomerList,
        listUpdate,
        triggerListUpdate,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default User

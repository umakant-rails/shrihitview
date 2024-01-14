import React, { useState, useMemo, useEffect } from "react";
import {RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthContext } from "./services/AuthContext";
//https://jpuri.github.io/react-draft-wysiwyg/#/

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const providerValue = useMemo(()=> ({currentUser, setCurrentUser}), [currentUser, setCurrentUser] )

  useEffect(()=> {
    const token = localStorage.getItem("token");
    const currentUserObj = localStorage.getItem("currentUser");
    if(token){
      setCurrentUser(JSON.parse(currentUserObj));
    }
  }, []);


  return (
    <AuthContext.Provider value={providerValue} >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
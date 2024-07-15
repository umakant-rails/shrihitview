import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../services/AuthContext';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../slices/authSlice';

const Logout = () => {
  const {setCurrentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect ( () => {
    dispatch(userLogout()).then(data => {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      dispatch({
        type: "message.showNotice",
        payload: 'Successfully logged out.',
      });
      navigate("/", { replace: true });
    });
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("currentUser");
  //   setCurrentUser(null);
  //   dispatch({
  //     type: "message.showNotice",
  //     payload: 'Successfully logged out.',
  //   });
  //   navigate("/", { replace: true });
  // };

  // setTimeout(() => {
  //   handleLogout();
  // }, 100);

  return <h2>You are Successfully Logout.</h2>;
};

export default Logout;

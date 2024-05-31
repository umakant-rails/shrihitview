import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../services/AuthContext';
import { useDispatch } from 'react-redux';
import { SET_MESSAGE } from '../../utils/types';

const Logout = () => {
  const {setCurrentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    dispatch({
      type: "message.showNotice",
      payload: 'Successfully logged out.',
    });
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 100);

  return <h2>You are Successfully Logout.</h2>;
};

export default Logout;

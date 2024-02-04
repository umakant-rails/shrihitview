import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../services/AuthContext';
import { useDispatch } from 'react-redux';
import { SET_MESSAGE } from '../../utils/types';

const UnAuthenticate = () => {
  const {setCurrentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: 'Unauthrized, Your session has been expired.',
    });
    navigate("/users/login", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 10);

  return <h2>Unauthrized, Your session has been expired.</h2>;
};

export default UnAuthenticate;
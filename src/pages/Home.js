import React from 'react';
import { Link } from 'react-router-dom';
import ApplicationLayout from '../layouts/ApplicationLayout';
const Home = () => {
    return (
      <div>
        This is Home Page
        <br/>
        <Link to="/aboutus"> About us </Link>
        <br/>
        <Link to="/aboutus1"> About us1 </Link>
      </div>
    );

};

export default Home;
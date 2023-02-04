import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ({userLogout, cart}) => {
  const userName = sessionStorage.getItem('candyStar')
  return (
    <div className="nav-outline">
      <div className="navRow">
        <div>
          <img src="/images/wLogo.png" alt="wLogo" className="wLogo" />
        </div>
        <div className="dropdown1">
          <Link to="/">
            <button className="dropbtn1">
              FIND YOUR SWEETS
            </button>
          </Link>
        </div>
        <div className="dropdown2">
          <button className="dropbtn2">STORE LOCATION</button>
          <div className="dropdown-content2">
            <span>New York</span>
            <span>Chicago</span>
            <span>Miami</span>
            <span>Los Angeles</span>
          </div>
        </div>
        {/* {props.user.isAdmin ? (
          <div className="dropdown3">
            <button className="dropbtn3" onClick={routeChange7}>
              DASHBOARD
            </button>
            <div className="dropdown-content3">
              <Link to="/newproduct">
                <span>Add Product</span>
              </Link>
              <Link to="/users">
                <span>Edit User</span>
              </Link>
            </div>
          </div>
        ) : ( */}
          <div className="dropdown3">
            <button className="dropbtn3">ABOUT US</button>
            <div className="dropdown-content3">
              <span>History</span>
              <span>Events</span>
              <span>Inspiration</span>
            </div>
          </div>
        {/* )} */}

        <div className="dropdown4">
          {userName ? (
            <button className="dropbtn4" onClick={userLogout} >
              LOGOUT
            </button>
          ) : (
            <Link to="/login">
              <button className="dropbtn4">
                SIGN UP | LOGIN
              </button>
            </Link>
          )}
        </div>
        <Link to={cart.id ? "/cart" : "/login"}>
          <div className="dropdown5">
            <button className="dropbtn5">
              SHOPPING BAG
            </button>
            <div className="bag">
              <span>{cart.items.reduce((count, item) => {return count + item.quantity}, 0)}</span>
              <img src="/images/shoppingBag.png" alt="shoppingBag" id="bag" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar

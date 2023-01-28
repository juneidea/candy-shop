import React from 'react';

const Navbar = ({isLoggedIn}) => {

  return (
    <div className="nav-outline">
      <div className="navRow">
        <div>
          <img src="/images/wLogo.png" alt="wLogo" className="wLogo" />
        </div>
        <div className="dropdown1">
          <button className="dropbtn1">
            FIND YOUR SWEETS
          </button>
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
          {isLoggedIn ? (
            <button className="dropbtn4">
              LOGOUT
            </button>
          ) : (
            <button className="dropbtn4">
              SIGN UP | LOGIN
            </button>
          )}
        </div>
        <div className="dropdown5">
          <button className="dropbtn5">
            SHOPPING BAG
          </button>
          <div className="bag">
            {/* <span>{props.cart[0] && candyCount(props.cart)}</span> */}
            <img src="/images/shoppingBag.png" alt="shoppingBag" id="bag" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar

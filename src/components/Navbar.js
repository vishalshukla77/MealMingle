import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../screens/Modal';
import Cart from '../screens/Cart';
import { useCart } from '../components/ContextReducer'; // Assuming useCart is exported correctly

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");
  const [cartView, setCartView] = useState(false);
  const cartItems = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link active" to="/myorderData">My Orders</Link>
              </li>
            )}
          </ul>
          {!isLoggedIn ? (
            <div className="d-flex">
              <Link className="btn btn-outline-light mx-1" to="/login">Login</Link>
              <Link className="btn btn-outline-light mx-1" to="/createuser">SignUp</Link>
            </div>
          ) : (
            <div>
              <div className="btn btn-outline-light text-white mx-2" onClick={() => setCartView(true)}>
                My Cart <Badge pill bg="danger">{cartItems.length}</Badge>
              </div>
              {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
              <div className="btn btn-outline-light text-white mx-2" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

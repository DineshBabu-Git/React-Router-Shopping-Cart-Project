import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="w-full bg-purple-800 shadow fixed">
      <div className="max-w-7xl h-20 mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">RR Shopping Cart</Link>
        <div className="flex items-center gap-6 font-bold">
          <NavLink to="/" className="text-white hover:text-yellow-300">Products</NavLink>
          <NavLink to="/cart" className="relative text-white hover:text-yellow-300 mr-5">
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-6 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

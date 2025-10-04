import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    subtotal,
    discount,
    total,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty...</h2>
        <Link to="/" className="text-indigo-600 underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5 mt-15">Cart Items</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex gap-4 items-center">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-600">${item.price.toFixed(2)} each</div>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded">
                  -
                </button>
                <div className="px-3 py-1 border rounded">{item.quantity}</div>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded">
                  +
                </button>

                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-600 underline cursor-pointer">
                  Remove
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg border border-gray-300  max-w-md ml-auto">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mt-1">
          <span>Discount (10%)</span>
          <span>- ${discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mt-3 font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">Checkout</button>
          <button onClick={() => clearCart()} className="bg-gray-200 px-4 py-2 rounded cursor-pointer">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

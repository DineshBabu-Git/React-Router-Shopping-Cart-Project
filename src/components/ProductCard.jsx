import React from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { id, title, price, image, description } = product;
  const { addToCart, removeFromCart, isInCart } = useCart();
  const truncated = description.length > 120 ? description.slice(0, 120) + "..." : description;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4 flex flex-col">
      <img src={image} alt={title} className="h-48 object-contain mb-4" />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm my-2">{truncated}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-xl font-bold">${price.toFixed(2)}</div>

        {isInCart(id) ? (
          <button
            onClick={() => removeFromCart(id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer">
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="bg-purple-800 hover:bg-gray-700 text-white px-3 py-1 rounded cursor-pointer">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

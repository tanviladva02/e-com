import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye, Star, Tag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || product.stock <= 0) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product._id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const getStockStatus = () => {
    if (product.stock === 0)
      return { text: "Out of Stock", color: "badge-danger" };
    if (product.stock <= 5)
      return { text: "Low Stock", color: "badge-warning" };
    return { text: "In Stock", color: "badge-success" };
  };

  const stockStatus = getStockStatus();

  return (
    <div
      className="card card-hover group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="badge badge-primary flex items-center space-x-1">
            <Star className="h-3 w-3" />
            <span>Featured</span>
          </span>
        </div>
      )}

      {/* Stock Status */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`badge ${stockStatus.color}`}>{stockStatus.text}</span>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Overlay Actions */}
        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center space-x-4 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to={`/products/${product._id}`}
            className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 transform hover:scale-110"
            title="View Details"
          >
            <Eye className="h-5 w-5 text-gray-700" />
          </Link>

          {isAuthenticated && product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-12 h-12 bg-blue-600/90 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
              title="Add to Cart"
            >
              {isAddingToCart ? (
                <div className="loading-spinner w-5 h-5 border-2 border-white/30 border-t-white"></div>
              ) : (
                <ShoppingCart className="h-5 w-5 text-white" />
              )}
            </button>
          )}

          <button
            onClick={handleWishlist}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${
              isWishlisted
                ? "bg-red-500/90 hover:bg-red-500"
                : "bg-white/90 hover:bg-white"
            }`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted ? "text-white fill-white" : "text-gray-700"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500 font-medium">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              {product.stock} available
            </span>
          </div>

          {/* Quick Add to Cart - Mobile */}
          {isAuthenticated && product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="md:hidden w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
              title="Add to Cart"
            >
              {isAddingToCart ? (
                <div className="loading-spinner w-4 h-4 border-2 border-white/30 border-t-white"></div>
              ) : (
                <ShoppingCart className="h-4 w-4 text-white" />
              )}
            </button>
          )}
        </div>

        {/* Stock Warning */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              ⚠️ Only {product.stock} left in stock!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

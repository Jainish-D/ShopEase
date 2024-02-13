import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import CheckoutCountBadge from "./checkoutCountBadge";

export default function Navbar() {
  return (
    <div className="container hidden lg:block py-4">
      <div className="flex justify-between items-center pt-8">
        <Link to="/"> 
          <h1 className="text-4xl font-bold text-blue-600">ShopEase</h1> 
        </Link>
        <Link to="/products" className="text-blue-500 hover:underline">Products</Link> {/* Add this line for the products catalogue link */}
        <div className="relative w-full max-w-[500px]">
          <input
            className="bg-[#f2f3f5] border-none outline-none px-6 py-3 rounded-[30px] w-full"
            type="text"
            placeholder="Search for a product..."
          />
          <BsSearch 
            className="absolute top-0 right-0 mt-4 mr-5 text-gray-o500" 
            size={20} 
          />
        </div>

        <div className="flex gap-4">
          <Link to="/login" className="flex gap-4">
            <div className="icon__wrapper">
              <FaRegUser className="text-blue-600 text-2xl" />
              <span className="text-blue-600 text-2xl">Login</span>
            </div> 
          </Link>

          <div className="icon__wrapper__style2 relative">
            <FaShoppingCart className="text-blue-600 text-2xl" />
            <CheckoutCountBadge size="w-[25px] h-[25px]" />
          </div>  
        </div>
      </div>
    </div>
  );
}

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShoppingBag } from "react-icons/fa";
import heroImage1 from "../assets/hero__1.webp";
import heroImage2 from "../assets/hero__2.png";
import heroImage3 from "../assets/hero__3.webp";

const Hero = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
  };

  return (
    <div className="container mx-auto pt-8 ">
      <div className="container relative rounded-lg mx-auto pt-8 bg-blue-200 p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative">
            {/* Slider */}
            <Slider {...sliderSettings}>
              <div>
                <img
                  src={heroImage1}
                  alt="Hero Image 1"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src={heroImage2}
                  alt="Hero Image 2"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src={heroImage3}
                  alt="Hero Image 3"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-lg"
                />
              </div>
            </Slider>
          </div>
          {/* Two Images on the Right Side */}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <img
                src={heroImage1}
                alt="Image 1"
                className="w-full h-[290px] object-cover rounded-lg"
              />
                {/* Shop Now Button */}
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg flex items-center transition duration-300 hover:bg-blue-400">
                        <FaShoppingBag className="mr-2" /> {/* Shopping Bag Icon */}
                        <span className="text-lg lg:text-xl font-bold">Shop Now</span>
                    </button>
                </div>
            </div>
            <div className="relative">
              <img
                src={heroImage2}
                alt="Image 2"
                className="w-full h-[290px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Container with 3 Sections Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Section 1 */}
        <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold mb-2">
            Free Delivery to Mainland UK
          </h2>
          <p className="text-gray-600">
            Enjoy free delivery on all orders over £45 within Mainland UK. No
            coupon code necessary! Conditions Apply*
          </p>
        </div>
        {/* Section 2 */}
        <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold mb-2">
            UK's #1 Online Indian Supermarket
          </h2>
          <p className="text-gray-600">
            You'll find a wide variety of authentic Indian groceries, spices,
            and household items. With a vast selection of products from all over
            South East Asia, you're sure to find everything you need at home.
          </p>
        </div>
        {/* Section 3 */}
        <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold mb-2">
            Quality and Service Guaranteed
          </h2>
          <p className="text-gray-600">
            We pride ourselves on offering you the highest quality products and
            exceptional customer service. We will work hard to make sure you are
            satisfied with your purchase and our service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

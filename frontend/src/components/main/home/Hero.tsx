import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="pt-2 sm:pt-4">
      <div className="container">
        <div className="grid grid-cols-1 gap-1.5 md:grid-cols-3 md:items-start md:gap-3">
          <div className="h-40 sm:h-72 md:col-span-2 md:h-[300px] lg:h-[400px]">
            <Link to="#">
              <img
                src="https://www.bmw-me.com/content/dam/bmw/marketMIDEAST/common/local-content/X%20Range%20Campaign/Xrange-home.jpg"
                alt="banner"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="flex gap-2 md:flex-col">
            <img
              src="https://socar.my/blog/wp-content/uploads/2020/12/Phase-2_Blog.jpg"
              alt="car-detailing"
              className="w-[49.5%] object-cover md:h-[146px] md:w-full lg:h-[196px]"
            />
            <img
              src="https://www.karrentacar.com.tr/dosya/2561/haber/23-2-special-car-rental-campaign-for-website-and-mobile-application_986.webp"
              alt=".car-sale"
              className="w-[49.3%] object-cover md:h-[146px] md:w-full lg:h-[195.5px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

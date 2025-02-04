export default function AboutUs() {
  window.scroll(0, 0);

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div>
            <div className="w-max border-b-2 border-primary">
              <h2 className="text-4xl text-neutral font-semibold uppercase">
                CarShop
              </h2>
            </div>
            <p className="mt-2 text-neutral-content">
              Your Ultimate Destination for Premium Cars, Trusted Service, and
              Unbeatable Deals!
            </p>

            <div className="mt-4 text-[15px] text-neutral-content">
              <p>
                Looking for the perfect car that blends luxury, performance, and
                reliability? You’re in the right place! We bring you a carefully
                curated selection of premium cars, ensuring that you drive away
                in the vehicle of your dreams. Whether you desire a sleek sedan,
                a powerful SUV, or a high-performance sports car, we have
                something for every taste and preference.
              </p>
              <p>
                Our commitment goes beyond just selling cars—we offer a seamless
                car-buying experience with expert guidance, transparent pricing,
                and top-notch customer support. With a reputation built on trust
                and excellence, we guarantee quality-checked vehicles,
                hassle-free financing options, and exclusive deals you won’t
                find anywhere else.
              </p>
              <p>
                At our dealership, your satisfaction is our priority. We take
                pride in delivering vehicles that meet the highest industry
                standards while ensuring you get the best value for your money.
                Whether you're upgrading your ride, purchasing your first car,
                or adding to your collection, we make the process smooth and
                enjoyable.
              </p>
              <p>
                Drive with confidence, style, and peace of mind. Visit us today
                and discover why we are the ultimate choice for car enthusiasts.
                Your dream ride is just a step away! 🚗💨
              </p>
            </div>
          </div>
          <div>
            <img
              src="/images/about.jpg"
              alt="about"
              className="rounded"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

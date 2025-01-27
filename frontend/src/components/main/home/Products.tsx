import { useGetAllCarsQuery } from "@/redux/features/carApi";
import ProductCard from "../ProductCard/ProductCard";
import { ICar } from "@/interface/carInterface";

export default function Products() {
  const { data, error, isLoading } = useGetAllCarsQuery({});
  const cars: ICar[] = data?.data;

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>Something went wrong...</p>;
  } else if (!isLoading && cars?.length > 0) {
    content = cars?.map((car) => <ProductCard key={car?._id} car={car} />);
  }

  return (
    <section className="pb-10">
      <div className="container">
        <div className="text-center">
          <h1 className="text-xl font-medium uppercase text-neutral md:text-2xl md:font-semibold">
            Ready for Order
          </h1>

          <p className="mt-2 text-sm text-neutral-content">
            Discover the Best Deals on Your Favorite Cars
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {content}
        </div>
      </div>
    </section>
  );
}

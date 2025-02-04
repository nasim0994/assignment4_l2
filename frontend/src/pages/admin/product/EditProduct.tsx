import { BiArrowBack } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useEditCarByIdMutation,
  useGetCarByIdQuery,
} from "@/redux/features/carApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TResponse } from "@/interface/globalInterface";

type CarCategory =
  | "Sedan"
  | "SUV"
  | "Truck"
  | "Coupe"
  | "Convertible"
  | "Hatchback";
const categories: CarCategory[] = [
  "Sedan",
  "SUV",
  "Truck",
  "Coupe",
  "Convertible",
  "Hatchback",
];

export default function EditProduct() {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const { data } = useGetCarByIdQuery(id);
  const car = data?.data;

  useEffect(() => {
    if (car) setCategory(car?.category);
  }, [car]);

  const [editCarById, { isLoading }] = useEditCarByIdMutation();

  const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name");
    const image = formData.get("image");
    const brand = formData.get("brand");
    const model = formData.get("model");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const year = formData.get("year");
    const description = formData.get("description");

    const data = {
      name,
      category,
      image,
      brand,
      model,
      price: Number(price),
      stock: Number(stock),
      year: Number(year),
      description,
    };

    const res = (await editCarById({ id, data })) as TResponse;

    if (res?.error) {
      toast.error(res?.error?.data?.message);
    } else {
      toast.success("Car update successfully");
      form.reset();
      navigate("/admin/car/all");
    }
  };

  return (
    <section>
      <div className="bg-base-100 p-3 rounded shadow flex justify-between items-center">
        <h2 className="text-[17px] font-medium text-neutral">Edit Car</h2>

        <Link to="/admin/car/all">
          <Button className="flex items-center gap-1">
            <BiArrowBack /> Back
          </Button>
        </Link>
      </div>

      <form
        onSubmit={handleAddCar}
        className="mt-1 form_group bg-base-100 p-3 rounded shadow"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label>Name</label>
            <input type="text" name="name" required defaultValue={car?.name} />
          </div>
          <div>
            <label>Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                -- Choose a category --
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              required
              defaultValue={car?.image}
            />
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              required
              defaultValue={car?.brand}
            />
          </div>
          <div>
            <label>Model</label>
            <input
              type="text"
              name="model"
              required
              defaultValue={car?.model}
            />
          </div>
          <div className="sm:col-span-2 grid grid-cols-3 gap-3">
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                required
                defaultValue={car?.price}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                required
                defaultValue={car?.stock}
              />
            </div>
            <div>
              <label>Year</label>
              <input
                type="number"
                name="year"
                required
                defaultValue={car?.year}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label>Description</label>
            <textarea
              name="description"
              rows={10}
              required
              defaultValue={car?.description}
            ></textarea>
          </div>
        </div>

        <div className="mt-3">
          <Button disabled={isLoading}>
            {isLoading ? "Loading..." : "Edit Car"}
          </Button>
        </div>
      </form>
    </section>
  );
}

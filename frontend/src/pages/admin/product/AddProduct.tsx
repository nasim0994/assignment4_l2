import { BiArrowBack } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAddCarMutation } from "@/redux/features/carApi";
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

export default function AddProduct() {
  const navigate = useNavigate();
  const [addCar, { isLoading }] = useAddCarMutation();

  const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const target = new FormData(form);

    const name = target.get("name");
    const category = target.get("category");
    const image = target.get("image");
    const brand = target.get("brand");
    const model = target.get("model");
    const price = target.get("price");
    const stock = target.get("stock");
    const year = target.get("year");
    const description = target.get("description");

    if (!(image instanceof Blob)) {
      toast.error("Please upload an image.");
      return;
    }

    const data = {
      name,
      category,
      brand,
      model,
      price: Number(price),
      stock: Number(stock),
      year: Number(year),
      description,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image);

    const res = (await addCar(formData)) as TResponse;

    if (res?.error) {
      toast.error(res?.error?.data?.message || "An error occurred");
      console.log(res);
    } else {
      toast.success("Car added successfully");
      form.reset();
      navigate("/admin/car/all");
    }
  };

  return (
    <section>
      <div className="bg-base-100 p-3 rounded shadow flex justify-between items-center">
        <h2 className="text-[17px] font-medium text-neutral">Add Car</h2>

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
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Category</label>
            <select name="category" required>
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
            <label>Image</label>
            <input type="file" name="image" required />
          </div>
          <div>
            <label>Brand</label>
            <input type="text" name="brand" required />
          </div>
          <div>
            <label>Model</label>
            <input type="text" name="model" required />
          </div>
          <div className="sm:col-span-2 grid grid-cols-3 gap-3">
            <div>
              <label>Price</label>
              <input type="number" name="price" required />
            </div>
            <div>
              <label>Stock</label>
              <input type="number" name="stock" required />
            </div>
            <div>
              <label>Year</label>
              <input type="number" name="year" required />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label>Description</label>
            <textarea name="description" rows={10} required></textarea>
          </div>
        </div>

        <div className="mt-3">
          <Button disabled={isLoading}>
            {isLoading ? "Loading..." : "Add Car"}
          </Button>
        </div>
      </form>
    </section>
  );
}

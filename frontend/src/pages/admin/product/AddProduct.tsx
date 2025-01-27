import { BiArrowBack } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type CarCategory =
  | "Sedan"
  | "SUV"
  | "Truck"
  | "Coupe"
  | "Convertible"
  | "Hatchback";

export default function AddProduct() {
  const categories: CarCategory[] = [
    "Sedan",
    "SUV",
    "Truck",
    "Coupe",
    "Convertible",
    "Hatchback",
  ];

  const handleAddCar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    console.log(data);
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
            <label>Image URL</label>
            <input type="text" name="image" required />
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
          <Button>Add Car</Button>
        </div>
      </form>
    </section>
  );
}

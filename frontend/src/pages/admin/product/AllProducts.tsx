import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Pagination from "@/components/Pagination/Pagination";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICar } from "@/interface/carInterface";
import {
  useDeleteCarByIdMutation,
  useGetAllCarsQuery,
} from "@/redux/features/carApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TResponse } from "@/interface/globalInterface";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isFetching } = useGetAllCarsQuery({
    page: currentPage,
    limit,
  });
  const cars: ICar[] = data?.data;

  const [deleteCarById] = useDeleteCarByIdMutation();
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      const res = (await deleteCarById(id)) as TResponse;

      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success("Car delete successfully");
      }
    }
  };

  let content = null;
  if (isLoading || isFetching) content = <TableSkeleton />;
  if (!isLoading && cars?.length > 0)
    content = (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SL</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars?.map((car, i) => (
            <TableRow key={car?._id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={car?.image}
                    alt="car"
                    className="w-12 h-12 rounded-full border object-cover"
                  />
                  <h2>{car?.name}</h2>
                </div>
              </TableCell>
              <TableCell>{car?.price}</TableCell>
              <TableCell>{car?.category}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2 text-lg text-neutral/90">
                  <Link
                    to={`/admin/car/edit/${car?._id}`}
                    className="hover:text-blue-500 duration-200"
                  >
                    <BiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(car?._id)}
                    className="hover:text-red-500 duration-200"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

  return (
    <section>
      <div className="bg-base-100 p-3 rounded shadow flex justify-between items-center">
        <h2 className="text-[17px] font-medium text-neutral">All Cars</h2>

        <Link to="/admin/car/add">
          <Button>Add Car</Button>
        </Link>
      </div>
      <div className="mt-1 bg-base-100 p-3 rounded shadow">{content}</div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}

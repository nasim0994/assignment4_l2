import "@/assets/css/pagination.css";
import React, { useEffect, useState } from "react";
import { MdNavigateNext, MdArrowBackIos } from "react-icons/md";

interface IPaginationProps {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  pages,
  currentPage,
  setCurrentPage,
}: IPaginationProps) {
  const numberOfPages: number[] = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(number | string)[]>(
    []
  );

  useEffect(() => {
    let tempNumberOfPages: (number | string)[] = [...arrOfCurrButtons];
    const dots = "...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dots, numberOfPages.length];
    } else if (currentPage === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dots, numberOfPages.length];
    } else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentPage - 2, currentPage);
      const sliced2 = numberOfPages.slice(currentPage, currentPage + 1);
      tempNumberOfPages = [
        1,
        dots,
        ...sliced1,
        ...sliced2,
        dots,
        numberOfPages.length,
      ];
    } else if (currentPage > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dots, ...sliced];
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pages]);

  return (
    <div className="pagination-container sm:flex">
      <button
        className={`prevBtn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => setCurrentPage((prev) => (prev <= 1 ? prev : prev - 1))}
        disabled={currentPage === 1}
      >
        <MdArrowBackIos className="text-sm" />
      </button>

      {arrOfCurrButtons?.map((item, index) => (
        <button
          key={index}
          className={`${
            typeof item === "number" && currentPage === item ? "active" : ""
          }`}
          onClick={() =>
            typeof item === "number" ? setCurrentPage(item) : undefined
          }
          disabled={item === "..."}
        >
          {item}
        </button>
      ))}

      <button
        className={`nextBtn ${
          currentPage === numberOfPages.length ? "disabled" : ""
        }`}
        onClick={() =>
          setCurrentPage((prev) =>
            prev >= numberOfPages.length ? prev : prev + 1
          )
        }
        disabled={currentPage === numberOfPages.length}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
}

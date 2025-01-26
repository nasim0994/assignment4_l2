import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ setSearch, setMobileMenu }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/shops?search=${searchText}`);

      if (setSearch) {
        setSearch(false);
      }
    } else {
      navigate(`/shops`);
    }

    if (setMobileMenu) {
      setMobileMenu(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative mx-auto flex w-[80%]">
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search Product..."
        className="searchInput w-full rounded-full border py-2 pl-4 pr-12 text-[15px] text-neutral outline-none placeholder:text-sm"
      />
      <button className="searchIcon absolute right-4 top-2.5 text-lg text-gray-400">
        <BsSearch />
      </button>
    </form>
  );
}

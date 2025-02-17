import { MdSearch } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

export default function LeftNavigation() {
  return (
    <>
      <div className="flex items-center justify-between backdrop-blur-7xl bg-white/50 rounded-xl ">
        <input
          type="search"
          className="p-3 pl-5 flex-grow rounded bg-transparent"
          placeholder="Search..."
        />
        <button className=" flex justify-end p-3">
          <MdSearch className="text-xl"></MdSearch>
        </button>
      </div>
      <div className="flex backdrop-blur-7xl h-96 bg-white/50 rounded-xl p-5">
        Share something with the community.
      </div>
    </>
  );
}

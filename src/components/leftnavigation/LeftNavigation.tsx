import { MdSearch } from 'react-icons/md';

export default function LeftNavigation() {
  return (
    <div className="flex flex-col gap-5 w-full h-full rounded-3xl px-4 ">
      <div className='bg-background/75 shadow-lg shadow-[#00000022] p-4 rounded-2xl'>
        <h1 className="text-center text-xl font-bold">Active friends</h1>
        <div className="flex items-center justify-between backdrop-blur-7xl rounded-xl mt-2 ">
          <input type="search" className="p-3 pl-5 bg-background flex-grow rounded-xl  w-full" placeholder="Search..." />
          <button className=" flex justify-end p-3">
            <MdSearch className="text-xl"></MdSearch>
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-backdropSecondary"></div>
            <div className="flex flex-col">
              <h1 className="font-bold">John Pork</h1>
              <p className="text-xs">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-backdropSecondary"></div>
            <div className="flex flex-col">
              <h1 className="font-bold">John Pork</h1>
              <p className="text-xs">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-backdropSecondary"></div>
            <div className="flex flex-col">
              <h1 className="font-bold">John Pork</h1>
              <p className="text-xs">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-backdropSecondary"></div>
            <div className="flex flex-col">
              <h1 className="font-bold">John Pork</h1>
              <p className="text-xs">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-backdropSecondary"></div>
            <div className="flex flex-col">
              <h1 className="font-bold">John Pork</h1>
              <p className="text-xs">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

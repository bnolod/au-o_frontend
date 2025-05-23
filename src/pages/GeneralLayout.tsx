import { Outlet } from "react-router";
import Header from "../components/Header";
import LeftNavigation from "../components/leftnavigation/LeftNavigation";
import MessageBoard from "../components/messages/MessageBoard";

export default function GeneralLayout() {
  return (
    <div className="animatedbg min-h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-col md:flex-row h-full items-center md:items-start justify-evenly pt-24 gap-">
        <div className="w-3/12 md:h-[90vh] min-h-max hidden md:flex left-3 flex-col items-center sticky top-24">
          <LeftNavigation />
        </div>
        <div className="w-11/12 md:w-5/12 flex flex-col">
          <Outlet />
        </div>
        <div className={" md:w-3/12 hidden md:flex md:h-[90vh] sticky top-24  w-11/12 right-3 items-start "}> 
          <MessageBoard msgOnClick/>
        </div>
      </main>
    </div>
  );
}

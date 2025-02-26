import { Outlet } from "react-router";
import CommentBoard from "../components/commentboard/CommentBoard";
import Header from "../components/Header";
import LeftNavigation from "../components/leftnavigation/LeftNavigation";

export default function GeneralLayout() {
  return (
    <div className="bg-backgroundGradient bg-fixed min-h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-col md:flex-row h-full items-center md:items-start justify-center pt-20">
        <div className="w-3/12 hidden md:flex md:fixed left-3 flex-col gap-5">
          <LeftNavigation />
        </div>
        <div className="w-11/12 md:w-5/12 flex flex-col">
          <Outlet />
        </div>
        <div className={" md:w-3/12 hidden md:flex md:fixed w-11/12 right-3 items-start "}> 
          <CommentBoard></CommentBoard>
        </div>
      </main>
    </div>
  );
}

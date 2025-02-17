import Header from "../components/Header";
import LeftNavigation from "../components/leftnavigation/LeftNavigation";

export default function GeneralLayout() {
  return (
    <div className="bg-backgroundGradient bg-fixed min-h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-col md:flex-row h-full items-center md:items-start justify-center pt-20">
        <LeftNavigation/>
        <div className="w-11/12 md:w-5/12 flex flex-col"></div>
        <div className={"md:w-3/12 w-11/12 right-4 items-start "}></div>
      </main>
    </div>
  );
}

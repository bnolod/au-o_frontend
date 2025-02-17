import Header from "../components/Header";
import { useAuthentication } from "../contexts/AuthenticationContext";


export default function ProfilePage() {
  const {user} = useAuthentication();

  return (
    <div className="bg-backgroundGradient bg-fixed min-h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-col md:flex-row h-full items-center md:items-start justify-center pt-20">
        <div className=" md:w-3/12 fixed left-0 bg-cyan-50">Bal oldali aside</div>
        <div className="w-11/12 md:w-5/12 flex flex-col">
        </div>
      </main>
    </div>
  );
}

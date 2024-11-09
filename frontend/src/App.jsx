import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const App = () => {
  return (
    <div className="bg-second font-ubuntu flex min-h-screen flex-col text-white">
      <Header />
      <main className="font-ubuntu container mx-auto min-h-screen flex-grow py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

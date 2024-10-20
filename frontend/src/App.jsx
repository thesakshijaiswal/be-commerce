import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const App = () => {
  return (
    <div className="flex font-bold min-h-screen bg-[#023047] text-white flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;

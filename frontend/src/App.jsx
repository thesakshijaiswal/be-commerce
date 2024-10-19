import { Outlet } from "react-router-dom";
import { Footer } from "./components";

const App = () => {
  return (
    <div className="flex font-bold min-h-screen bg-[#023047] text-white">
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

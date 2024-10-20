<<<<<<< HEAD
import Header from "./components/Header";
import "./index.css";

const App = () => {
  return (
    <Header />
=======
import { Outlet } from "react-router-dom";
import { Footer } from "./components";

const App = () => {
  return (
    <div className="flex font-bold min-h-screen bg-[#023047] text-white">
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </div>
>>>>>>> 613803bcdba64646c1ef5a568dcfa47e2b41850c
  );
};

export default App;

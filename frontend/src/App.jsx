import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-primary/5 font-ubuntu text-white">
      <Header />
      <main className="min-h-screen">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
};

export default App;

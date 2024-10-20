import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const App = () => {
  return (
    <div className="flex min-h-screen bg-second text-white flex-col font-ubuntu">
      <Header />
      <main className="flex-grow min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

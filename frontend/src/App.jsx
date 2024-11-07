import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const App = () => {
  return (
    <div className="flex min-h-screen bg-second text-white flex-col font-ubuntu">
      <Header />
      <main className="container py-3 flex-grow min-h-screen mx-auto font-ubuntu">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

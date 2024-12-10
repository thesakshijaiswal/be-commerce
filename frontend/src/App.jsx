import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-primary/5 font-ubuntu text-white">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-primary/5 font-ubuntu text-white">
      <Header />
      <main className="min-h-screen">
        <Outlet />
        <Toaster
          containerStyle={{
            position: "relative",
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;

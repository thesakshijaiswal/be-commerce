import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const tabs = [
  { name: "USERS", path: "users" },
  { name: "PRODUCTS", path: "products" },
  { name: "ORDERS", path: "orders" },
];

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabRefs = useRef({});
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });

  const currentTab =
    tabs.find((tab) => location.pathname.includes(tab.path))?.name || "USERS";

  useEffect(() => {
    const el = tabRefs.current[currentTab];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  }, [location.pathname]);

  return (
    <div className="mx-auto p-3 sm:p-6">
      <div className="relative flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            ref={(el) => (tabRefs.current[tab.name] = el)}
            onClick={() => navigate(`/admin/${tab.path}`)}
            className={`border-b-2 select-none px-4 py-2 font-medium transition-all duration-300 ${
              currentTab === tab.name
                ? "border-transparent text-primary"
                : "border-transparent text-secondary hover:text-primary/90"
            }`}
          >
            {tab.name}
          </button>
        ))}

        <motion.div
          className="absolute bottom-0 h-0.5 rounded-full bg-blue-600"
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            bounce: 0.3,
          }}
          style={{
            left: underlineProps.left,
            width: underlineProps.width,
            position: "absolute",
          }}
        />
      </div>

      <div className="mt-6 rounded-lg bg-white p-3 shadow-md sm:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardPage;

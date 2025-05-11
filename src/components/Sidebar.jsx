import { NavLink } from "react-router-dom";
import { FiZap, FiLink, FiCpu, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const navItems = [
    { to: "/functions", label: "Functions", icon: <FiZap /> },
    { to: "/triggers", label: "Triggers", icon: <FiLink /> },
    { to: "/envs", label: "Environments", icon: <FiCpu /> },
  ];

  return (
    <div className="w-64 mr-4">
        <div className="text-center text-2xl font-bold mt-6 mb-6">F9s Dashboard</div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-400 ${
                  isActive ? "bg-gray-300" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
  );
}
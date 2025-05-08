import { NavLink } from "react-router-dom";
import { FiZap, FiLink, FiCpu } from "react-icons/fi";

export default function Sidebar() {
  const navItems = [
    { to: "/functions", label: "Functions", icon: <FiZap /> },
    { to: "/triggers", label: "Triggers", icon: <FiLink /> },
    { to: "/envs", label: "Environments", icon: <FiCpu /> },
  ];

  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-4 space-y-6">
      <div className="text-2xl font-bold mb-6">F9s Dashboard</div>
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
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

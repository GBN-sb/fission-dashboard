import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiZap, FiLink, FiCpu, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/functions", label: "Functions", icon: <FiZap /> },
    { to: "/triggers", label: "Triggers", icon: <FiLink /> },
    { to: "/envs", label: "Environments", icon: <FiCpu /> },
  ];

  return (
    <div className="relative">
      <button
        className="absolute top-4 left-4 z-50 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-4 space-y-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:w-60`}
      >
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

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
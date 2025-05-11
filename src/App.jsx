import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import FunctionsPage from "./pages/FunctionsPage";
import TriggersPage from "./pages/TriggersPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full">
        <div className="w-64 bg-white border-r">
          <Sidebar />
        </div>
        <div className="flex-1 bg-gray-100 p-6 overflow-auto w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/functions" replace />} />
            <Route path="/functions" element={<FunctionsPage />} />
            <Route path="/triggers" element={<TriggersPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

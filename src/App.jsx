import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import FunctionsPage from "./pages/FunctionsPage";
import TriggersPage from "./pages/TriggersPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen overflow-auto">
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

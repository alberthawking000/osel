import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProcessScheduler from "./pages/ProcessScheduler";
import MemoryManager from "./pages/MemoryManager";
import SystemCalls from "./pages/SystemCalls";
import GdtIdt from "./pages/GdtIdt";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="process-scheduler" element={<ProcessScheduler />} />
            <Route path="memory-manager" element={<MemoryManager />} />
            <Route path="system-calls" element={<SystemCalls />} />
            <Route path="gdt-idt" element={<GdtIdt />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

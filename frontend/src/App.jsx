import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TasksPage from "./pages/TasksPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

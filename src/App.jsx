import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminLayout from "./components/layout/AdminLayout"

import DashboardPage from "./pages/DashboardPage"
import LoginPages from "./pages/LoginPages"
import StudentsPage from "./pages/StudentsPage"
import TeachersPage from "./pages/TeachersPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPages />}></Route>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={< DashboardPage />} />
          <Route path="teachers" element={< TeachersPage />} />
          <Route path="students" element={< StudentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

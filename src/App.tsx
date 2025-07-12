import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import GeneratePdfPage from "./pages/GeneratePdfPage";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPasswordPage from './pages/ForgotPasswordPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Wrap protected routes with PrivateRoute if you want */}
        <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
        <Route path="/generate" element={<PrivateRoute><GeneratePdfPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
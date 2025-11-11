import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Header } from "./components/ui/header";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
  );
}

export default App;

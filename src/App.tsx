import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ForgotPassword from "./pages/Login/ForgotPassword";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

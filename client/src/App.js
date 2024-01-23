import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Section from "./components/Section";
import Header from "./components/Header";
import Theme from "./components/Theme";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <Header/>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        {user && <Route path="/sections/:section" exact element={<Section />} />}
        {user && <Route path="/sections/:section/:theme" exact element={<Theme />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset/> } />
      </Routes>
    </>
  );
}

export default App;

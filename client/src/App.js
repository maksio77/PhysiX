import { Route, Routes, Navigate } from "react-router-dom";
import Main from './pages/Main'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
//import Section from "./components/Section";
import Header from "./components/Header";
import Theme from "./pages/Theme";
import Page404 from "./pages/404";
import ErorrBoundary from "./components/ErorrBoundary";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <ErorrBoundary>
        {user && <Header />}
        <Routes>
          {user && <Route path="/" exact element={<Main />} />}
          {/* {user && <Route path="/sections/:section" exact element={<Section />} />} */}
          {user && (
            <Route path="/sections/:section/:theme" exact element={<Theme />} />
          )}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ErorrBoundary>
    </>
  );
}

export default App;

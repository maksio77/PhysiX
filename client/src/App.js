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
import Footer from "./components/Footer";
import TestThemes from "./pages/TestThemes";
import Testing from "./pages/Testing";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <ErorrBoundary>
        {user && <Header />}
        <Routes>
          {user && <Route path="/" exact element={<Main />} />}
          {user && <Route path="/sections/:section/:theme/:page" exact element={<Theme />} />}
          {user && <Route path="/tests" exact element={<TestThemes />} />}
          {user && <Route path="/tests/:theme" exact element={<Testing />} />}
          {/* {user && <Route path="/sections/:section" exact element={<Section />} />} */}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:id/:token" element={<PasswordReset />}/>
          <Route path="*" element={<Page404 />} />
        </Routes>
        {user && <Footer/>}
      </ErorrBoundary>
    </>
  );
}

export default App;

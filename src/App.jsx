// App.jsx
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import MainLayout from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

export const Contex = createContext();

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setUser(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("loggedIn", "true");
    setUser(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    setUser(false);
  };

  const handleSignup = () => {
    sessionStorage.setItem("loggedIn", "true");
    setUser(true);
  };
   useEffect(() => {
    console.log("app:", user);
  }, [user]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout onLogout={handleLogout} />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/singleProduct/:id", element: <SingleProduct /> },
      ],
    },
    {
      path: "/login",
      element: <Login onLogin={handleLogin} />,
    },
    {
      path: "/signup",
      element: <Signup onSignup={handleSignup} />,
    },
  ]);

  return (
    <Contex.Provider value={{ user, setUser }}>
      <RouterProvider router={routes} />
    </Contex.Provider>
  );
}

export default App;
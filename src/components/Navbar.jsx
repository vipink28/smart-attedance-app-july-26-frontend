import React, { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { Link, NavLink, useNavigate } from "react-router";
import CustomNavLink from "./CustomNavLink";
import AuthContext from "../context/AuthContext";

const Navbar = ({ routes }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="bg-mauve-950">
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/">Smart Attendance</Link>
          <div className="flex items-center">
            {routes.map((route) => (
              <CustomNavLink key={route.url} to={route.url} icon={route.icon}>
                {route.linkText}
              </CustomNavLink>
            ))}

            <div className="relative">
              <button onClick={handleDropdown} className="cursor-pointer">
                {user ? user.name : "Guest"}
              </button>
              {showDropdown && (
                <div className="absolute right-0 bg-mauve-950 w-3xs top-10 flex flex-col items-end">
                  <Link
                    className="px-3 py-5 w-full text-right border-b border-b-mauve-800"
                    to="/help"
                  >
                    Help
                  </Link>
                  <button
                    className="px-3 py-4 w-full text-right border-b border-b-mauve-800"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

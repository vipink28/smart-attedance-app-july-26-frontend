import React from "react";
import { NavLink } from "react-router";
import { DynamicIcon } from "lucide-react/dynamic";

const CustomNavLink = ({ to, children, icon }) => {
  return (
    <>
      <NavLink
        end
        className={({ isActive }) =>
          `py-3 px-4 flex items-center gap-3 ${isActive ? "text-mauve-300" : "text-white"}`
        }
        to={to}
      >
        <DynamicIcon name={icon} />
        {children}
      </NavLink>
    </>
  );
};

export default CustomNavLink;

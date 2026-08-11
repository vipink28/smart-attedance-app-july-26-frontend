import { User } from "lucide-react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Container from "../components/Container";

const AdminLayout = () => {
  const adminRoutes = [
    { url: "/admin", linkText: "Dashboard", icon: "gauge" },
    { url: "/admin/users", linkText: "Users", icon: "user" },
    { url: "/admin/teacher", linkText: "Teacher", icon: "gauge" },
    { url: "/admin/student", linkText: "Student", icon: "gauge" },
    { url: "/admin/class", linkText: "Class", icon: "gauge" },
  ];
  return (
    <>
      <Navbar routes={adminRoutes} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;

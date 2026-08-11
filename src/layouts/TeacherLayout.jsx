import { Outlet } from "react-router";
import Container from "../components/Container";
import Navbar from "../components/Navbar";

const TeacherLayout = () => {
  const teacherRoutes = [
    { url: "/teacher", linkText: "Dashboard", icon: "gauge" },
    { url: "/teacher/students", linkText: "Students", icon: "gauge" },
    { url: "/teacher/classes", linkText: "Classes", icon: "gauge" },
  ];
  return (
    <>
      <Navbar routes={teacherRoutes} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default TeacherLayout;

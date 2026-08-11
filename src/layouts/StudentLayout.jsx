import { Outlet } from "react-router";
import Container from "../components/Container";
import Navbar from "../components/Navbar";

const StudentLayout = () => {
  const studentRoutes = [
    { url: "/student", linkText: "Dashboard", icon: "gauge" },
    { url: "/student/mark", linkText: "Mark Attendance", icon: "gauge" },
    { url: "/student/my-attendance", linkText: "My Attendance", icon: "gauge" },
  ];
  return (
    <>
      <Navbar routes={studentRoutes} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default StudentLayout;

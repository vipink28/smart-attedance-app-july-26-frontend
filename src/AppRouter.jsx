import React from "react";
import { Route, Routes } from "react-router";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";
import Teacher from "./pages/admin/Teacher";
import Student from "./pages/admin/Student";
import Class from "./pages/admin/Class";
import Students from "./pages/teacher/Students";
import Classes from "./pages/teacher/Classes";
import MyAttendance from "./pages/student/MyAttendance";
import MarkAttendance from "./pages/student/MarkAttendance";
import ProtectedRoute from "./auth/ProtectedRoute";
import Users from "./pages/admin/Users";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />}></Route>
        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/admin/teacher" element={<Teacher />}></Route>
        <Route path="/admin/student" element={<Student />}></Route>
        <Route path="/admin/class" element={<Class />}></Route>
      </Route>
      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />}></Route>
        <Route path="/teacher/students" element={<Students />}></Route>
        <Route path="/teacher/classes" element={<Classes />}></Route>
      </Route>
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />}></Route>
        <Route path="/student/mark" element={<MarkAttendance />}></Route>
        <Route path="/student/my-attendance" element={<MyAttendance />}></Route>
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default AppRouter;

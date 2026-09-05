import { useEffect, useState } from "react";
import api from "../../api/config";

const StudentDashboard = () => {
  const [timeTable, setTimeTable] = useState(null);
  const fetchTimeTable = async () => {
    try {
      const res = await api.get("/student/timetable");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTimeTable();
  }, []);

  return <div></div>;
};

export default StudentDashboard;

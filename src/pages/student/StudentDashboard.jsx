import { useEffect, useState } from "react";
import api from "../../api/config";
import Button from "../../components/form/Button";

const StudentDashboard = () => {
  const [timeTable, setTimeTable] = useState(null);
  const fetchTimeTable = async () => {
    try {
      const res = await api.get("/student/timetable");
      setTimeTable(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTimeTable();
  }, []);

  return (
    <div className="py-4">
      {timeTable ? (
        <>
          <h2>{timeTable.today}</h2>
          {timeTable.classes.length > 0 ? (
            timeTable.classes.map((item) => (
              <div
                key={item.classId}
                className="flex items-center mb-4 rounded-md p-2 bg-mauve-600"
              >
                <div className="w-3/12">{item.name}</div>
                <div className="w-3/12">{item.code}</div>
                <div className="w-3/12">{item.teacher.name}</div>
                <div className="w-1/12">
                  {item.liveSessionId === null ? (
                    <span className="w-3 h-3 block rounded-full border-2 border-emerald-800"></span>
                  ) : (
                    <span className="w-3 h-3 block rounded-full animate-ping border-2 border-red-800"></span>
                  )}
                </div>
                <div className="w-2/12">
                  <Button>Mark Attendance</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No classes for today</p>
          )}
        </>
      ) : (
        <p>No classes to today</p>
      )}
    </div>
  );
};

export default StudentDashboard;

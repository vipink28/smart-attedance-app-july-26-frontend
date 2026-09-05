import React, { useEffect, useState } from "react";
import api from "../../api/config";
import { Link } from "react-router";

const Classes = () => {
  const [classesList, setClassesList] = useState(null);
  const fetchClasses = async () => {
    try {
      const response = await api.get("/teacher/classes");
      setClassesList(response.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="py-5">
      <h2>My Classes</h2>
      <div className="py-5 grid grid-cols-4 gap-5">
        {classesList &&
          classesList.map(({ name, code, students, _id }) => (
            <div key={_id} className="bg-mauve-700 border border-mauve-500 p-5">
              <h2>Class: {name}</h2>
              <p>Code: {code}</p>
              <p>Total Students: {students.length}</p>
              <Link
                to={`/teacher/class/${_id}`}
                className="bg-mauve-900 px-4 py-2 rounded-md mt-4 inline-block"
              >
                View
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Classes;

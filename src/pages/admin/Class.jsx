import React, { useEffect, useReducer, useState } from "react";
import Button from "../../components/form/Button";
import Popup from "../../components/layout/Popup";
import ClassForm from "../../components/form/ClassForm";
import api from "../../api/config";

const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT":
      return { contentType: "edit", data: action.payload };
    case "DELETE":
      return { contentType: "delete", data: action.payload };
    default:
      return state;
  }
};

const Class = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClassPopup, setIsClassPopup] = useState(false);
  const [classes, setClasses] = useState([]);
  const [state, dispatch] = useReducer(reducer, null);

  const fetchClasses = async () => {
    try {
      const response = await api.get("/admin/classes");
      setClasses(response.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <>
      <div className="flex flex-end">
        <Button primary={true} onClick={() => setShowPopup(true)}>
          Add Class
        </Button>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-mauve-700 shadow-md rounded-lg p-4"
            >
              <h3 className="text-lg font-bold">{classItem.name}</h3>
              <p className="text-mauve-200">{classItem.code}</p>
              {classItem.schedule.map((sched) => (
                <div key={sched.day} className="flex">
                  <div>Day: {sched.day}</div>
                  <div>Day: {sched.startTime}</div>
                  <div>Day: {sched.endTime}</div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setIsClassPopup(true);
                  dispatch({ type: "EDIT", payload: classItem });
                }}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup onClose={setShowPopup}>
          <ClassForm fetchClasses={fetchClasses} />
        </Popup>
      )}

      {isClassPopup && (
        <Popup onClose={setIsClassPopup} fetchClasses={fetchClasses}>
          <ClassForm
            fetchClasses={fetchClasses}
            data={state.data}
            isUpdate={true}
          />
        </Popup>
      )}
    </>
  );
};

export default Class;

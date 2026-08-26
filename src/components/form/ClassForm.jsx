import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import api from "../../api/config";
import { showToast } from "../../helper/toast-utility";

const days = [
  { value: "Mon", text: "Monday" },
  { value: "Tue", text: "Tuesday" },
  { value: "Wed", text: "Wednesday" },
  { value: "Thu", text: "Thursday" },
  { value: "Fri", text: "Friday" },
  { value: "Sat", text: "Saturday" },
  { value: "Sun", text: "Sunday" },
];

const ClassForm = ({ data, isUpdate, fetchClasses }) => {
  const init = { name: "", code: "", location: { lat: "", lng: "" } };
  const [formData, setFormData] = useState(init);
  const [studentList, setStudentList] = useState(null);
  const [teacherList, setTeacherList] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleInput = (e) => {
    const { value, name } = e.target;
    if (name === "lat" || name === "lng") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const dayInit = { day: "Mon", startTime: "09:00", endTime: "10:30" };
  const [schedule, setSchedule] = useState([dayInit]);

  const addNewScheduleItem = (e) => {
    e.preventDefault();
    if (schedule.length < 7) {
      setSchedule((prev) => [...prev, dayInit]);
    }
  };

  const handleSchedule = (i, name, value) => {
    const arr = [...schedule];
    arr[i] = { ...arr[i], [name]: value };
    setSchedule(arr);
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    let requestBody = { ...formData, schedule };

    try {
      const response = await api.post("/admin/classes", requestBody);
      fetchClasses();
    } catch (error) {}
  };

  const handleUpdateClass = async (e) => {
    e.preventDefault();
    let requestBody = { ...formData, schedule };

    try {
      const response = await api.patch("/admin/classes", requestBody);
      fetchClasses();
    } catch (error) {}
  };

  const fetchStudents = async (role = "student", isActive = true) => {
    try {
      const response = await api.get(
        `/admin/users?role=${role}&isActive=${isActive}`,
      );
      setStudentList(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeachers = async (role = "teacher", isActive = true) => {
    try {
      const response = await api.get(
        `/admin/users?role=${role}&isActive=${isActive}`,
      );
      setTeacherList(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  // add Students to class
  const addStudentToClass = async (id, studentId) => {
    try {
      await api.patch(`/admin/classes/${id}/students/add`, {
        studentId,
      });
      showToast("success", "Student added to class!");
    } catch (error) {
      console.log(error);
      showToast("failed", error.message);
    }
  };

  // assign Teacher to class
  const assignTeacherToClass = async (id, teacherId) => {
    try {
      await api.patch(`/admin/classes/${id}/assign-teacher`, {
        teacherId,
      });
      showToast("success", "Teacher assigned to class!");
    } catch (error) {
      console.log(error);
      showToast("failed", error.message);
    }
  };

  useEffect(() => {
    if (isUpdate && data) {
      fetchStudents();
      fetchTeachers();
      setFormData(data);
      setSchedule(data.schedule || [dayInit]);
    }
  }, [isUpdate, data]);

  return (
    <div>
      <h2>Add Class</h2>
      <form>
        <FormInput
          name="name"
          label="Class Name"
          onChange={handleInput}
          value={formData.name}
        />
        <FormInput
          name="code"
          label="Class Code"
          onChange={handleInput}
          value={formData.code}
        />
        <FormInput
          name="lat"
          label="Latitude"
          onChange={handleInput}
          value={formData.location.lat}
        />
        <FormInput
          name="lng"
          label="Longitude"
          onChange={handleInput}
          value={formData.location.lng}
        />

        <div className="flex flex-col">
          <div className="max-h-28 overflow-auto">
            {schedule.map((sched, i) => (
              <div key={i} className="flex gap-3 items-center">
                <select
                  value={sched.day}
                  className="bg-mauve-800 text-white"
                  onChange={(e) => handleSchedule(i, "day", e.target.value)}
                >
                  {days.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.text}
                    </option>
                  ))}
                </select>
                <div className="ms-auto flex gap-3 items-center">
                  <FormInput
                    type="time"
                    name="startTime"
                    value={sched.startTime}
                    onChange={(e) =>
                      handleSchedule(i, "startTime", e.target.value)
                    }
                  />
                  <FormInput
                    type="time"
                    name="endTime"
                    value={sched.endTime}
                    onChange={(e) =>
                      handleSchedule(i, "endTime", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <Button onClick={addNewScheduleItem}>Add Schedule</Button>
          {/* Select Student to add */}
          <div className="py-5">
            {studentList && (
              <select
                className="bg-mauve-700"
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                {studentList.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            )}
            <Button
              type="button"
              onClick={() => addStudentToClass(data._id, selectedStudent)}
            >
              Add Student
            </Button>
          </div>

          {/* Select teacher to Add   */}
          <div className="py-5">
            {teacherList && (
              <select
                className="bg-mauve-700"
                onChange={(e) => assignTeacherToClass(data._id, e.target.value)}
              >
                {teacherList.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {isUpdate ? (
          <Button onClick={handleUpdateClass}>Update Class</Button>
        ) : (
          <Button onClick={handleAddClass}>Submit</Button>
        )}
      </form>
    </div>
  );
};

export default ClassForm;

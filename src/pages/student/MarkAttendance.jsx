import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { showToast } from "../../helper/toast-utility";
import api from "../../api/config";

const MarkAttendance = () => {
  const { token } = useParams();
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  const getGeoLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          return {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          showToast(
            "error",
            `Error Code: ${error.code}, Message: ${error.message}`,
          );
        },
      );
    } else {
      showToast("error", "Geolocation is not supported by this browser.");
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const { lat, lng } = getGeoLocation();
      const requestBody = { token, lat, lng };
      const res = await api.post(`/attendance/scan`, requestBody);
      setAttendanceStatus(res.data);
    } catch (error) {
      showToast("error", "something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      handleMarkAttendance();
    }
  }, [token]);

  return (
    <div>
      {attendanceStatus ? (
        <p>{attendanceStatus.message}</p>
      ) : (
        <p>Please open your camera and scan the code provided by Teacher</p>
      )}
    </div>
  );
};

export default MarkAttendance;

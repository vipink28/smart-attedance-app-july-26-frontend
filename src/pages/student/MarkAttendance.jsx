import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { showToast } from "../../helper/toast-utility";
import api from "../../api/config";

const MarkAttendance = () => {
  const { token } = useParams();
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  const getGeoLocation = () => {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(
            new Error(`Error Code: ${error.code}, Message: ${error.message}`),
          );
        },
      );
    });
  };

  const handleMarkAttendance = async () => {
    try {
      const { lat, lng } = await getGeoLocation();
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

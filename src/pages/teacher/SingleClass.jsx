import { useParams } from "react-router";
import api from "../../api/config";
import { useEffect, useState } from "react";
import Button from "../../components/form/Button";
import { showToast } from "../../helper/toast-utility";
import { useMyLocation } from "../../helper/useMyLocation";

const SingleClass = () => {
  const { classid, type } = useParams();
  const [classData, setClassData] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);
  const fetchClassById = async (id) => {
    try {
      const res = await api.get(`/teacher/classes/${id}`);
      setClassData(res.data.class);
    } catch (error) {
      console.log(error);
    }
  };

  //generate QR Session
  const genereteQRCode = async (id) => {
    const location = await useMyLocation();
    const requestBody = {
      classId: id,
      useMyCurrentLocation: true,
      lat: location.latitude,
      lng: location.longitude,
    };
    try {
      const res = await api.post("/attendance/sessions", requestBody);
      setSessionDetails(res.data);
    } catch (error) {
      showToast("failed", "Error generating QR Code");
    }
  };

  const closeSession = async (id) => {
    try {
      await api.patch(`/attendance/sessions/${id}/close`);
      showToast("success", "Session closed successfully");
      setSessionDetails(null);
    } catch (error) {
      showToast("failed", "Failed to close session");
    }
  };

  useEffect(() => {
    fetchClassById(classid);
  }, []);

  return (
    <div className="bg-mauve-800 p-8 rounded-md mt-10">
      {classData && (
        <div className="mb-8">
          <h2 className="mb-4">{classData.name}</h2>
          <Button onClick={() => genereteQRCode(classData._id)}>
            Generate QR
          </Button>
        </div>
      )}

      {sessionDetails ? (
        <div className="p-6 bg-mauve-700">
          <p>Session Date: {sessionDetails.session.sessionDate}</p>
          <p>Session Expiry: {sessionDetails.session.expiresAt}</p>
          <img src={sessionDetails.qr.dataUrl} alt="qr" />
          <Button onClick={() => closeSession(sessionDetails.session._id)}>
            Close Session
          </Button>
        </div>
      ) : (
        <p>No active sessions</p>
      )}
    </div>
  );
};

export default SingleClass;

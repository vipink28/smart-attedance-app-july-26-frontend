import { useState } from "react";
import Button from "../../components/form/Button";
import Popup from "../../components/layout/Popup";
import UserForm from "../../components/form/UserForm";

const Users = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="py-10">
      <div className="flex justify-end">
        <Button onClick={() => setShowPopup(true)}>Add User</Button>
      </div>
      <div className="py-5">
        <h1>Users List</h1>
      </div>
      {showPopup && (
        <Popup onClose={setShowPopup}>
          <UserForm />
        </Popup>
      )}
    </div>
  );
};

export default Users;

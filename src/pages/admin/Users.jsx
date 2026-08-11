import { useEffect, useState } from "react";
import Button from "../../components/form/Button";
import Popup from "../../components/layout/Popup";
import UserForm from "../../components/form/UserForm";
import api from "../../api/config";
import { Eye, PenSquare, Trash } from "lucide-react";

const Users = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [usersList, setUsersList] = useState(null);

  const fetchUsers = async (role = "teacher", isActive = true) => {
    try {
      const response = await api.get(
        `/admin/users?role=${role}&isActive=${isActive}`,
      );
      setUsersList(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="py-10">
      <div className="flex justify-end">
        <Button onClick={() => setShowPopup(true)}>Add User</Button>
      </div>
      <div className="py-5">
        <h1>Users List</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => fetchUsers("teacher")}>Teachers</Button>
          <Button onClick={() => fetchUsers("student")}>Students</Button>
        </div>
        <div className="py-4">
          <h2 className="mb-4">Teacher</h2>
          <div>
            {usersList ? (
              usersList.map((user, index) => (
                <div
                  key={user._id}
                  className="flex items-center bg-mauve-700 mb-2 rounded-md"
                >
                  <div className="w-1/12 p-2">{index + 1}</div>
                  <div className="w-3/12 p-2">{user.name}</div>
                  <div className="w-3/12 p-2">{user.email}</div>
                  <div className="w-2/12 p-2">
                    {user.isActive ? "Active" : "Inactive"}
                  </div>
                  <div className="w-3/12 p-2">
                    <button className="px-2">
                      <Eye />
                    </button>
                    <button className="px-2">
                      <PenSquare />
                    </button>
                    <button className="px-2">
                      <Trash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No User</p>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup onClose={setShowPopup}>
          <UserForm onClose={setShowPopup} />
        </Popup>
      )}
    </div>
  );
};

export default Users;

import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import api from "../../api/config";
import { showToast } from "../../helper/toast-utility";

const UserForm = ({ onClose, isUpdate, data, fetchUsers }) => {
  const init = { name: "", email: "", password: "", role: "" };
  const [formData, setFormData] = useState(init);
  const handleInputs = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/users", formData);
      showToast("success", "User added successfully!");
      setFormData(init);
      fetchUsers(response.data.user.role);
      onClose(false);
    } catch (error) {
      showToast("error", "Failed to add user!");
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/admin/users/${data._id}`, formData);
      showToast("success", "User added successfully!");
      fetchUsers(response.data.user.role);
      onClose(false);
    } catch (error) {
      showToast("error", "Failed to add user!");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setFormData(data);
    }
  }, [isUpdate]);

  return (
    <>
      <h2 className="text-xl font-semibold">
        {isUpdate ? "Update" : "Add"} User
      </h2>
      <div className="py-4">
        <form>
          <FormInput
            label="Name"
            name="name"
            onChange={handleInputs}
            value={formData.name}
          />
          {!isUpdate && (
            <>
              <FormInput
                label="Email"
                name="email"
                onChange={handleInputs}
                value={formData.email}
              />
              <FormInput
                label="Password"
                name="password"
                onChange={handleInputs}
                value={formData.password}
              />
              <div className="mb-4">
                <select
                  defaultValue={formData.role}
                  name="role"
                  onChange={handleInputs}
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </>
          )}
          {isUpdate ? (
            <Button primary={true} onClick={updateUser}>
              Update User
            </Button>
          ) : (
            <Button primary={true} onClick={addUser}>
              Add User
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default UserForm;

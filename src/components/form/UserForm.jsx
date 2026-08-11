import React, { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
import api from "../../api/config";
import { showToast } from "../../helper/toast-utility";

const UserForm = ({ onClose }) => {
  const [formData, setFormData] = useState(null);
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
      onClose(false);
    } catch (error) {
      showToast("error", "Failed to add user!");
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold">Add User</h2>
      <div className="py-4">
        <form>
          <FormInput label="Name" name="name" onChange={handleInputs} />
          <FormInput label="Email" name="email" onChange={handleInputs} />
          <FormInput label="Password" name="password" onChange={handleInputs} />
          <div className="mb-4">
            <select name="role" onChange={handleInputs}>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          <Button primary={true} onClick={addUser}>
            Add User
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserForm;

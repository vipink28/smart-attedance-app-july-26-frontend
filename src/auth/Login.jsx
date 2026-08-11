import React, { useContext, useState } from "react";
import FormInput from "../components/form/FormInput";
import Button from "../components/form/Button";
import api from "../api/config";
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let userData = await login(formData);
      if (userData.role === "admin") {
        navigate("/admin");
      } else if (userData.role === "teacher") {
        navigate("/teacher");
      } else if (userData.role === "student") {
        navigate("/student");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-mauve-400 bg-mauve-700 p-5 rounded-2xl">
      <form>
        <div className="py-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            onChange={handleInput}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            onChange={handleInput}
          />
        </div>

        <Button onClick={handleLogin}>Login</Button>
      </form>
    </div>
  );
};

export default Login;

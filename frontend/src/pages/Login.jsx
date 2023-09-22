import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";

function Login() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/auth/login", formData);
    console.log(res.data);
    if (res.data.error) {
      setError(true);
    } else {
      signIn({
        token: res.data.token,
        expiresIn: 86400,
        tokenType: "Bearer",
        authState: { userID: res.data.userID, username: res.data.username },
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-0">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Cambia Nome Qui
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-red-500">
            Username o password errati
          </p>
        )}
        <p className="mt-4 text-center">
          Non hai un account?{" "}
          <Link to="/signup" className="text-blue-500">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import AddPlace from "./pages/AddPlace";
import PlaceDetails from "./pages/PlaceDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="aggiungi-posto"
          element={
            <RequireAuth loginPath="/login">
              <AddPlace />
            </RequireAuth>
          }
        />
        <Route path="/:id" element={<PlaceDetails />} />
      </Routes>
    </>
  );
}

export default App;

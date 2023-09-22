import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";

function Header() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const username = authUser() ? authUser().username : null;

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <header className="bg-[url('/public/nuvole1.jpg')] text-white p-2 md:p-4 flex justify-between items-center ">
      <Link
        to={"/"}
        className="  text-4xl font-semibold hover:text-sky-400 hover:animate-pulse hover:border-double hover:border-b-4 border-indigo-600 hover:border-white"
      >
        flexOffices
      </Link>
      <img className="w-20 hover:animate-spin" src="/public/logo.png" alt="" />
      <div className="flex items-center space-x-4">
        {username ? (
          <>
            <Link
              to="/aggiungi-posto"
              className=" text-withe hover:animate-bounce hover:text-teal-400 px-4 py-2 rounded-full  items-center "
            >
              <img className="w-12" src="/public/post.png" alt="" />
            </Link>
            <button
              onClick={handleLogout}
              className=" hover:text-white hover:animate-bounce px-4 py-2 rounded"
            >
              <img className="w-14" src="/public/exit.png" alt="" />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-white text-blue-500 hover:bg-blue-600 hover:text-white"
            >
              Accedi
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded bg-white text-blue-500 hover:bg-blue-600 hover:text-white"
            >
              Registrati
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

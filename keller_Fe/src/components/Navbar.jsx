// Navbar.jsx
import React from "react";
import { useAuth } from "../helper/AuthContext"; // AuthContext'i import et
import Logo from "../assets/logo.png";
import NewAdButton from "./buttons/NewAdButton";
import RegisterButton from "./buttons/RegisterButton";
import LoginButton from "./buttons/LoginButton";
import MessageIcon from "./icons/MessageIcon";
import FavoriteIcon from "./icons/FavoriteIcon";
import AvatarMenu from "./AvatarMenu";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const { isAuthenticated } = useAuth(); // Doğrulama durumunu almak için AuthContext'i kullan

  return (
    <nav className="bg-white border-b z-50">
      <div className="flex flex-wrap items-center justify-between py-3 mx-5 md:px-8">
        <div className="flex-none lg:flex-initial">
          <a href="/">
            <img src={Logo} width={120} height={50} alt="Logo" />
          </a>
        </div>

        <div>
          <NewAdButton />
        </div>

        <form className="flex items-center space-x-2 border rounded-md p-2 bg-gray-100 flex-grow flex-shrink max-w-[350px] order-3 md:order-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto bg-gray-100"
            type="text"
            placeholder="Suchen Sie, was immer Sie brauchen"
            style={{
              paddingRight: "2rem",
              width: "23rem",
            }}
          />
        </form>

        <div>
          <DropdownMenu />
        </div>
        <div>
          <MessageIcon count={5} />
        </div>

        <div>
          <FavoriteIcon count={3} />
        </div>

        {/* Register ve Login butonlarını yalnızca kullanıcının oturum açmadığı durumda göster */}
        {!isAuthenticated && (
          <>
            <div>
              <RegisterButton />
            </div>
            <div>
              <LoginButton />
            </div>
          </>
        )}

        {/* AvatarMenu'yu yalnızca kullanıcı oturum açtıysa göster */}
        {isAuthenticated && (
          <div>
            <AvatarMenu />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

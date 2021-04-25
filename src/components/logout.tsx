import React from "react";
import { useCookies, Cookies } from "react-cookie";
import useUserStore, { DEFAULT_USER_DATA } from "../stores/user/index";

const COOKIE_HASH = import.meta.env.VITE_COOKIE_HASH as string;

const Logout: React.FC = () => {
  const { setUser } = useUserStore();
  const [_, __, removeCookie] = useCookies([COOKIE_HASH]);

  const logout = () => {
    removeCookie(COOKIE_HASH);
    setUser(DEFAULT_USER_DATA);
    localStorage.removeItem("refresh_token");
    location.pathname = "";
  };
  return (
    <div>
      <button
        className="p-4 bg-green-500 hover:bg-green-600 rounded-lg mt-6 text-white"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

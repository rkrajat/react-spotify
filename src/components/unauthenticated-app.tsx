import React, { useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { IUserData } from "../stores/user/interface";
import useUserStore, { DEFAULT_USER_DATA } from "../stores/user/index";
import authorizeAppURL from "../auth/config";

const COOKIE_HASH = import.meta.env.VITE_COOKIE_HASH as string;

const UnAuthenticatedApp: React.FC = () => {
  const [cookies, setCookie] = useCookies([COOKIE_HASH]);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    try {
      const userData = getLoginData();
      if (userData?.accessToken) {
        if (!userData.inSession) {
          setCookie(COOKIE_HASH, userData.accessToken, {
            path: "/",
          });
          localStorage.setItem(
            "refresh_token",
            JSON.stringify(userData?.refresh_token ?? "")
          );
        }
        setUser(userData);
        window.location.hash = "";
      }
    } catch (e) {
      console.error("User not authenticated");
    }
  }, []);

  const getLoginData = useCallback((): IUserData => {
    const cookieAccessToken =
      cookies[import.meta.env.VITE_COOKIE_HASH as string];
    if (cookieAccessToken) {
      return {
        ...user,
        accessToken: cookieAccessToken,
        inSession: true,
      };
    } else {
      const params = new URLSearchParams(location.hash.substring(1));
      const accessToken = params.get("access_token");
      if (accessToken) {
        return {
          accessToken: accessToken,
          tokenType: params.get("token_type"),
          expiresIn: Number(params.get("expires_in")),
          state: params.get("state") ?? "",
          refresh_token: params.get("refresh_token"),
        };
      }
      return DEFAULT_USER_DATA;
    }
  }, []);

  return (
    <a
      className="p-4 bg-green-500 hover:bg-green-600 rounded-lg mt-6 text-white"
      href={authorizeAppURL()}
    >
      Login Spotify
    </a>
  );
};
export default UnAuthenticatedApp;

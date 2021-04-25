import React from "react";
import Logout from "./logout";

const AuthenticatedApp: React.FC = () => {
  return (
    <div>
      <p>Authenticated</p>
      <Logout />
    </div>
  );
};
export default AuthenticatedApp;

import React, { Suspense } from "react";
import "./App.css";
import useUserStore from "./stores/user/index";

const AuthenticatedApp = React.lazy(
  () => import("./components/authenticated-app")
);
const UnauthenticatedApp = React.lazy(
  () => import("./components/unauthenticated-app")
);

function App() {
  const user = useUserStore((state) => state.user);
  console.log("=== user data ===", user);

  return (
    <div className="grid place-items-center ">
      <h1>Vite React Typescript Tailwind starter</h1>
      <Suspense fallback={<p>Loading ....</p>}>
        {Boolean(user?.accessToken) ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp />
        )}
      </Suspense>
    </div>
  );
}

export default App;

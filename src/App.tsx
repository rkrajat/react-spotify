import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <div className="grid place-items-center ">
      <h1>Vite React Typescript Tailwind starter</h1>
      <p>Counter: {count}</p>
      <button
        className="p-4 bg-blue-400 hover:bg-blue-500 rounded-lg mt-6"
        onClick={() => setCount((count) => count + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export default App;

import { useEffect } from "react";
import Mushrooms from "./components/Mushrooms";
import Cifar from "./components/Cifar";
import Flowers from "./components/Flowers";

function App() {
  useEffect(() => {
    if (document) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";

      document.head.appendChild(stylesheet);
    }
  }, []);

  return (
    <div className="flex items-center justify-center space-x-8 h-screen w-screen">
      <Mushrooms />
      <Cifar />
      <Flowers />
    </div>
  );
}

export default App;
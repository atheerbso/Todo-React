import { Link } from "react-router-dom";
//for context API
import { createContext, useState } from "react";
import { IconProvider } from "./ContextAPI/IconContext";
import { Icon } from "./ContextAPI/Icon";
export const LoginContext = createContext({
  pressedShow: false,
  setLoggedIn: (pressedShow: false) => {},
});
export default function Header() {
  const [pressedShow, setIcon] = useState<boolean>(false);
  return (
    <div className="bg-gray-200 h-20 w-full flex  p-1  gap-5 text-center   items-center text-2xl font-light">
      <div className="flex flex-grow">
        <IconProvider>
          <Icon />
        </IconProvider>
      </div>

      <div className="">
        <Link to="./LogIn">LogIn</Link>
      </div>
      <div className="">
        <Link to="./SignUp">SignUp</Link>
      </div>
      <div className="">
        <Link to="./About">About</Link>
      </div>
    </div>
  );
}

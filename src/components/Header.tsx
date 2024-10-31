import { Link } from "react-router-dom";

//# for Contexttheme button
// import Button from "./ContextTheme/Button";
import "../styles.css";
//for zustand
import { ZustandCom } from "./Zustand/ZustandCom";

// export const LoginContext = createContext({
//   pressedShow: false,
//   setLoggedIn: (pressedShow: false) => {},
// });
export default function Header() {
  return (
    <div className="bg-gray-200 h-20 w-full flex  p-1  gap-5 text-center   items-center text-2xl font-light">
      <div className="flex flex-grow">
        {/* <Button /> */}
        <ZustandCom />
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

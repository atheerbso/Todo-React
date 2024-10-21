import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-gray-200 h-20 w-full flex  ">
      <button>
        <Link to="./LogIn">
          <LogIn></LogIn>
        </Link>
      </button>

      <button>
        <Link to="./SignUp">
          <SignUp></SignUp>
        </Link>
      </button>
    </div>
  );
}

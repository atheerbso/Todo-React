import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-gray-200 h-20 w-full flex mx-auto  p-1  gap-5 text-center  justify-center items-center text-2xl font-light">
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

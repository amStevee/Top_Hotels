import { useState } from "react";
import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai";
import { MdNightsStay } from "react-icons/md";
import { HiOutlineSun } from "react-icons/hi";

import { Link } from "react-router-dom";

export default function Navbar({ setDarkMode, darkMode }) {
  const [toggle, setToggel] = useState(false);
  return (
    <nav className="bg-navbar p-5 flex justify-between flex-col lg:flex-row text-white">
      <div className="flex justify-between">
        <h3 className="text-2xl">Home</h3>
        <button
          className="rounded hover:text-#666 text-xl"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <MdNightsStay /> : <HiOutlineSun />}
        </button>

        <button
          className="rounded hover:text-#666 text-xl"
          onClick={() => setToggel(!toggle)}
        >
          {!toggle ? <AiOutlineMenu /> : <AiFillCloseCircle />}
        </button>
      </div>

      {toggle && (
        <ul className="flex flex-col justify-center items-center gap-3 mt-3">
          <li>
            <Link to="#">Support</Link>
          </li>
          <li>
            <Link to="#">Sign in</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

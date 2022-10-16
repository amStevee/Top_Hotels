import { useState } from "react";
import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai";
import { MdNightsStay } from "react-icons/md";
import { HiOutlineSun } from "react-icons/hi";

import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Navbar({ setDarkMode, darkMode }) {
  const [toggle, setToggel] = useState(false);
  const [scroll, setScroll] = useState(false);
  const windowWidth = window.innerWidth;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  });

  return (
    <div>
      {windowWidth < 411 ? (
        <nav
          className={
            scroll
              ? "fixed top-0 left-0 right-0 bg-navbar p-5 flex justify-between lg:flex-row text-white z-10"
              : "bg-navbar p-5 flex justify-between flex-col lg:flex-row text-white"
          }
        >
          <div className="flex justify-between">
            <h3 className="text-2xl">Home</h3>
            <button
              className="rounded hover:text-#666 text-xl"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <MdNightsStay /> : <HiOutlineSun />}
            </button>

            {windowWidth < 411 && (
              <button
                className="rounded hover:text-#666 text-xl"
                onClick={() => setToggel(!toggle)}
              >
                {!toggle ? <AiOutlineMenu /> : <AiFillCloseCircle />}
              </button>
            )}
          </div>

          {toggle && (
            <ul className="flex flex-col justify-center items-center gap-3 mt-3 text-5xl">
              <li>
                <Link to="#">Support</Link>
              </li>
              <li>
                <Link to="#">Sign in</Link>
              </li>
            </ul>
          )}
        </nav>
      ) : (
        <nav
          className={
            scroll
              ? "fixed top-0 left-0 right-0 bg-navbar p-5 flex justify-between lg:flex-row text-white"
              : "bg-navbar p-5 flex justify-between lg:flex-row text-white"
          }
        >
          <img src="./asset/desktop_logo.png" alt="logo" />

          <button
            className="rounded hover:text-#666 text-xl"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <MdNightsStay /> : <HiOutlineSun />}
          </button>

          <ul className="flex justify-center items-center gap-3 mt-3">
            <li>
              <Link to="#">Support</Link>
            </li>
            <li>
              <Link to="#">Sign in</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

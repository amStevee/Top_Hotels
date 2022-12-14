import React from "react";
import { useState } from "react";
import { AiOutlineMenu, AiFillCloseCircle } from "react-icons/ai";
import { MdNightsStay } from "react-icons/md";
import { HiOutlineSun } from "react-icons/hi";

import { Link } from "react-router-dom";
import { useEffect } from "react";

// {
//   windowWidth < 415 ? (
//     <nav
//       className={
//         scroll
//           ? "absolute top-0 left-0 right-0 bg-navbar p-5 flex justify-between lg:flex-row text-white z-50 dark:bg-navdark"
//           : "bg-navbar p-5 flex justify-between flex-col lg:flex-row text-white z-50 dark:bg-navdark"
//       }
//     >
//       <div className="flex justify-between">
//         <div className="w-24 m-0 p-0">
//           {logo.map((lg, i) => (
//             <div key={i}>
//               <Link to="/">
//                 <img src={lg} alt="logo" className="object-contain" />
//               </Link>
//             </div>
//           ))}
//         </div>
//         <button
//           className="rounded hover:text-#666 text-xl"
//           onClick={() => setDarkMode(!darkMode)}
//         >
//           {darkMode ? <MdNightsStay /> : <HiOutlineSun />}
//         </button>

//         {windowWidth < 415 && (
//           <button
//             className="rounded hover:text-#666 text-3xl"
//             onClick={() => setToggel(!toggle)}
//           >
//             {!toggle ? <AiOutlineMenu /> : <AiFillCloseCircle />}
//           </button>
//         )}
//       </div>

//       {toggle && (
//         <ul className="flex flex-col justify-center items-center gap-3 mt-3">
//           <li>
//             <Link to="https://twitter.com/am_stevenanongo">Support</Link>
//           </li>
//           <li>
//             <Link to="#">Sign in</Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   ) : (
//     <nav
//       className={
//         scroll
//           ? "fixed top-0 left-0 right-0 bg-navbar p-5 px-12 flex justify-between lg:flex-row text-white dark:bg-navdark"
//           : "bg-navbar p-5 px-12 flex justify-between lg:flex-row text-white dark:bg-navdark"
//       }
//     >
//       <div className="w-24 m-0 p-0">
//         {logo.map((lg, i) => (
//           <div key={i}>
//             <Link to="/">
//               <img src={lg} alt="logo" className="object-contain" />
//             </Link>
//           </div>
//         ))}
//       </div>

//       <button
//         className="rounded hover:text-#666 text-xl"
//         onClick={() => setDarkMode(!darkMode)}
//       >
//         {darkMode ? <MdNightsStay /> : <HiOutlineSun />}
//       </button>

//       <ul className="flex justify-center items-center gap-5 mt-3 text-2xl font-Livvic">
//         <li>
//           <Link to="#">Support</Link>
//         </li>
//         <li className="bg-white dark:bg-offwhite text-center  rounded-full p-2 pt-1 pb-1 text-xl text-gray-500 hover:bg-transparent hover:text-white">
//           <Link to="#">Sign in</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default function Navbar({ setDarkMode, darkMode }) {
  const [toggle, setToggel] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const windowWidth = window.innerWidth;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 30);
    });
  }, []);

  const logo = ["./assets/mobile_logo.png"];

  return (
    <div className="z-50">
      <nav
        className={
          scroll
            ? "absolute top-0 left-0 right-0 bg-navbar p-5 flex justify-between flex-col md:flex-col lg:flex-row text-white z-50 dark:bg-navdark"
            : "bg-navbar p-5 flex justify-between flex-col md:flex-col lg:flex-row text-white z-50 dark:bg-navdark"
        }
      >
        <div className="flex justify-between w-full">
          <div className="w-24 m-0 p-0">
            {logo.map((lg, i) => (
              <div key={i}>
                <Link to="/">
                  <img src={lg} alt="logo" className="object-contain" />
                </Link>
              </div>
            ))}
          </div>
          <button
            className="rounded hover:text-#666 text-xl"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <MdNightsStay /> : <HiOutlineSun />}
          </button>

          {windowWidth < 824 && (
            <button
              className="rounded hover:text-#666 text-3xl"
              onClick={() => setToggel(!toggle)}
            >
              {!toggle ? <AiOutlineMenu /> : <AiFillCloseCircle />}
            </button>
          )}
          {windowWidth > 824 && (
            <ul className="flex justify-center items-center gap-5 mt-3 text-2xl font-Livvic">
              {" "}
              <li>
                <Link to="#">Support</Link>{" "}
              </li>{" "}
              <li className="bg-white dark:bg-offwhite text-center  rounded-full p-2 pt-1 pb-1 text-xl text-gray-500 hover:bg-transparent hover:text-white">
                <Link to="#">Sign in</Link>{" "}
              </li>{" "}
            </ul>
          )}
        </div>

        {toggle && (
          <ul className="flex flex-col justify-center items-center gap-3 mt-3">
            <li>
              <Link to="https://twitter.com/am_stevenanongo">Support</Link>
            </li>
            <li>
              <Link to="#">Sign in</Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

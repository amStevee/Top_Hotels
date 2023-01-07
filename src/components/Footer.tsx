import React from "react";
import { Link } from "react-router-dom";
import { BsTwitter, BsInstagram, BsGithub } from "react-icons/bs";

export default function Footer() {
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };
  return (
    <footer className="flex justify-center items-center flex-col p-3 text-white w-full bg-navbar dark:bg-navdark">
      <button
        className="absolute bottom-5 right-2 rounded-full text-black p-3 bg-white"
        onClick={scrollToTop}
      >
        Top
      </button>
      <ul className="flex flex-col justify-center items-center gap-3 mt-3">
        <li>
          <h1>Support me by following my socials</h1>
        </li>
        <li>
          <Link
            to="https://twitter.com/am_stevenanongo"
            className="flex text-center gap-2 items-center justify-center"
          >
            Twitter <BsTwitter />
          </Link>
        </li>
        <li>
          <Link
            to="https://instagram.com/am_stevee"
            className="flex text-center gap-2 items-center justify-center"
          >
            Instagram <BsInstagram />
          </Link>
        </li>
        <li>
          <Link
            to="https://github.com/amStevee"
            className="flex text-center gap-2 items-center justify-center"
          >
            Github <BsGithub />
          </Link>
        </li>
      </ul>
      <p>
        &copy; <span>{new Date().getFullYear()}</span>, Steven Anongo&trade;
      </p>
    </footer>
  );
}

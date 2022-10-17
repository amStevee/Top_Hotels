import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center flex-col p-3 text-white w-full bg-navbar">
      <ul className="flex flex-col justify-center items-center gap-3 mt-3">
        <li>
          <h1>Support me by following me on my socials</h1>
        </li>
        <li>
          <Link to="https://twitter.com/am_stevenanongo">Twitter</Link>
        </li>
        <li>
          <Link to="https://instagram.com/am_stevee">Instagram</Link>
        </li>
        <li>
          <Link to="https://github.com/amStevee">Github</Link>
        </li>
      </ul>
      <p>&copy; 2022, Steven Anongo&trade;</p>
    </footer>
  );
}

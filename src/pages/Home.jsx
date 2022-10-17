import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useContext, useState } from "react";
import {
  AiFillCalendar,
  AiFillEnvironment,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { SearchContex } from "../context/searchContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { DarkthemeContex } from "../context/Darkmodecontext";

export default function Home() {
  const [toggleDate, setToggleDate] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const { dispatch } = useContext(SearchContex);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };
  const { darkMode, setDarkMode } = useContext(DarkthemeContex);
  // const windowWidth = window.innerWidth;
  // const windowHeight = window.innerHeight;

  return (
    <div className={darkMode ? "dark" : ""}>
      <header
        className={
          "bg-mobile_bg bg-cover bg-no-repeat bg-center lg:bg-desktop_bg lg:h-screen"
        }
      >
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />

        <section className="px-5 py-10 flex flex-col gap-3 lg:gap-11 lg:px-16">
          <div>
            <h1 className="text-4xl font-black text-white lg:text-6xl lg:w-2/4">
              LOOKING FOR A <br /> HOTEL TO STAY?
            </h1>
            <p className="text-offwhite lg:text-3xl lg:w-2/4">
              Input the location and we'll give you <br />
              <span className="bg-header_cap bg-opacity-75">
                The Best Hotel
              </span>{" "}
              results accorrding to <br /> your taste.
            </p>
          </div>

          <form className="dark:bg-offwhite px-5 py-10 flex gap-5 justify-center align-middle flex-col lg:flex-row lg:bg-white rounded-full lg:p-1 lg:justify-between">
            <div className="flex p-1 bg-white rounded-full h-10 lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiFillEnvironment />
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Search Location.."
                className="w-screen rounded-full border-none lg:w-fit lg:bg-transparent"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="flex p-1 bg-white rounded-full h-10 relative lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiFillCalendar />
              </label>
              <span
                onClick={() => setToggleDate(!toggleDate)}
                className="text-gray-400 cursor-pointer relative"
              >
                {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )} `}
              </span>
              {toggleDate === true && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="absolute inset-x-0 bottom-12 bg-white w-fit h-fit"
                  minDate={new Date()}
                />
              )}
            </div>

            <div className="flex p-1 bg-white rounded-full h-10 relative lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiOutlineUserAdd />
              </label>
              <span
                onClick={() => setToggleOptions(!toggleOptions)}
                className="text-gray-400 cursor-pointer"
              >{`${options.adult} adults  ${options.children} children  ${options.room} room`}</span>
              {toggleOptions && (
                <div className="absolute bottom-14 p-3 flex flex-col justify-center bg-white">
                  <div className="w-52 flex justify-between m-3">
                    <span className="optionText">Adult</span>
                    <div className="flex gap-3">
                      <button
                        disabled={options.adult <= 1}
                        className="h-8 text-blue-900 border-blue-900 bg-white"
                        type="button"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button
                        className="w-7 h-7 border-blue-900 bg-white"
                        type="button"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="optionItem w-52 flex justify-between m-3">
                    <span className="optionText">Children</span>
                    <div className="optionCount flex align-item-middle gap-3">
                      <button
                        disabled={options.children <= 0}
                        className="h-8 text-blue-900 border-blue-900 bg-white"
                        type="button"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button
                        className="w-7 h-7 border-blue-900 bg-white"
                        type="button"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="optionItem w-52 flex justify-between m-3">
                    <span className="optionText">Room</span>
                    <div className="optionCount flex align-item-middle gap-3">
                      <button
                        disabled={options.room <= 1}
                        className="h-8 text-blue-900 border-blue-900 bg-white"
                        type="button"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button
                        className="w-7 h-7 border-blue-900 bg-white"
                        type="button"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              className="bg-navbar text-white w-36 m-auto p-2 lg:self-end lg:m-1 lg:rounded-full"
              onClick={handleSearch}
            >
              Submit
            </button>
          </form>
        </section>
      </header>
    </div>
  );
}

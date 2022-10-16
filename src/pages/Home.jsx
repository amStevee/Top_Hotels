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

  return (
    <div className={darkMode ? "dark" : ""}>
      <header className="bg-mobile_bg bg-cover bg-no-repeat bg-center h-screen md:h-full">
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />

        <section className="px-5 py-10">
          <h1 className="text-4xl font-black text-white">
            LOOKING FOR A <br /> HOTEL TO STAY?
          </h1>
          <p className="text-white">
            Search for The Best Hotel <br /> and get results accorrding to{" "}
            <br /> your taste
          </p>

          <form className="px-5 py-10 flex gap-5 justify-center align-middle flex-col">
            <div className="flex p-1 bg-white rounded-full h-10">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiFillEnvironment />
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Search Location.."
                className="w-screen rounded-full border-none"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="flex p-1 bg-white rounded-full h-10 relative">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiFillCalendar />
              </label>
              <span
                onClick={() => setToggleDate(!toggleDate)}
                className="text-gray-400"
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
                  className="absolute inset-x-0 top-11 bg-white w-min h-fit"
                  minDate={new Date()}
                />
              )}
            </div>

            <div className="flex p-1 bg-white rounded-full h-10 relative">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiOutlineUserAdd />
              </label>
              <span
                onClick={() => setToggleOptions(!toggleOptions)}
                className="text-gray-400"
              >{`${options.adult} adults  ${options.children} children  ${options.room} room`}</span>
              {toggleOptions && (
                <div className="absolute top-14 p-3 flex flex-col justify-center inset-x-0 bg-white">
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
              className="bg-navbar text-white w-36 m-auto p-2"
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

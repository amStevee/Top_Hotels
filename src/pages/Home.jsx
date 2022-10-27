import React, { useEffect } from "react";
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
import Navbar from "../components/Navbar.tsx";
import { DarkthemeContex } from "../context/Darkmodecontext.tsx";
import { useSearchLocation } from "../hooks/useApiquery";

export default function Home() {
  const navigate = useNavigate();
  const [toggleDate, setToggleDate] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [destination, setDestination] = useState("lagos");
  const [cityId, setCityId] = useState("");
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

  const search_options = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/locations/search",
    params: { query: destination, locale: "en_US" },
    headers: {
      "X-RapidAPI-Key": "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
  };
  const res = useSearchLocation(search_options);
  useEffect(() => {
    // const city_location = res.data;
    const city_location =
      res.data?.data?.suggestions[1]?.entities[0]?.destinationId;
    setCityId(city_location);
  }, [res]);

  const { dispatch } = useContext(SearchContex);
  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, date, options, cityId },
    });
    navigate("/hotels", {
      state: { destination, date, options, cityId },
    });
  };
  const { darkMode, setDarkMode } = useContext(DarkthemeContex);

  return (
    <div className={darkMode ? "dark" : ""}>
      <header className="bg-mobile_bg bg-cover bg-no-repeat bg-center h-screen lg:bg-desktop_bg lg:h-screen">
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />

        <section className="px-5 py-10 flex flex-col gap-3 md:gap-6 lg:gap-11 lg:px-16">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-black text-white lg:text-6xl md:text-4xl ">
              LOOKING FOR A <br /> HOTEL TO STAY?
            </h1>
            <p className="text-offwhite font-Livvic lg:text-3xl md:text-xl ">
              Input the location and we'll give you <br />
              <span className="bg-header_cap bg-opacity-75">
                The Best Hotel results accorrding to
              </span>{" "}
              <br /> your taste.
            </p>
          </div>

          <form className="lg:dark:bg-black md:dark:bg-black h-auto bg-opacity-95 px-5 md:px-1 py-10 flex gap-5  md:gap-3 md:py-1 md:justify-between justify-center align-middle flex-col md:flex-row md:bg-white lg:flex-row lg:bg-offwhite rounded-full lg:p-1 lg:justify-between md:w-auto">
            <div className="flex p-1 bg-offwhite md:bg-inherit rounded-full h-10 lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1 text-xl">
                <AiFillEnvironment />
              </label>
              <input
                type="text"
                required
                name="location"
                id="location"
                placeholder="Search Location.."
                className="w-screen rounded-full border-none bg-offwhite md:bg-inherit lg:w-fit lg:bg-transparent md:w-auto md:text-sm placeholder:text-xl dark:text-white"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="flex p-1 bg-offwhite md:bg-inherit rounded-full h-10 relative lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1 text-xl">
                <AiFillCalendar />
              </label>
              <span
                onClick={() => setToggleDate(!toggleDate)}
                className="text-gray-400 cursor-pointer relative md:text-xs md:pt-1 lg:text-lg"
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

            <div className="flex p-1 bg-offwhite md:bg-inherit rounded-full h-10 relative lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1 text-xl">
                <AiOutlineUserAdd />
              </label>
              <span
                onClick={() => setToggleOptions(!toggleOptions)}
                className="text-gray-400 cursor-pointer md:text-xs md:pt-1 lg:text-lg"
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
              className="bg-navbar text-white w-36 m-auto p-2 lg:self-end  lg:rounded-full md:rounded-full md:self-end md:m-0"
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

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
// import { useEffect } from "react";
// import axios from "axio";

export default function Home() {
  const navigate = useNavigate();
  const [toggleDate, setToggleDate] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
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

  console.log(date[0].startDate);

  // useEffect(() => {
  //   async function getData(params) {
  //     const options = {
  //       method: "GET",
  //       url: "https://hotels4.p.rapidapi.com/locations/v2/search",
  //       params: { query: `${destination}`, locale: "en_US", currency: "USD" },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
  //         "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
  //       },
  //     };
  //     const checkurl = "https://hotels4.p.rapidapi.com/properties/list";
  //     try {
  //       //returns hotels in the area with id
  //       const hotels = await fetch(options.url, options.params, options.headers);
  //       const data = hotels.json()
  //       //pass in check-in date etc..
  //       const checkOptions = await fetch(
  //         checkurl,
  //         {
  //           destinationId: hotels.id,
  //           pageNumber: "1",
  //           pageSize: "25",
  //           checkIn: "2022-04-03",
  //           checkOut: "2022-04-07",
  //           adults1: "1",
  //           sortOrder: "PRICE",
  //           locale: "en_US",
  //           currency: "USD",
  //         },
  //         {
  //           "X-RapidAPI-Key":
  //             "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
  //           "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
  //         }
  //       );

  //       console.log(hotels);
  //     } catch (error) {}
  //   }
  //   getData();
  // }, [destination]);

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
      <header className="bg-mobile_bg bg-cover bg-no-repeat bg-center h-screen lg:bg-desktop_bg lg:h-screen">
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />

        <section className="px-5 py-10 flex flex-col gap-3 md:gap-6 lg:gap-11 lg:px-16">
          <div>
            <h1 className="text-4xl font-black text-white lg:text-6xl md:text-4xl ">
              LOOKING FOR A <br /> HOTEL TO STAY?
            </h1>
            <p className="text-offwhite lg:text-3xl md:text-xl ">
              Input the location and we'll give you <br />
              <span className="bg-header_cap bg-opacity-75">
                The Best Hotel
              </span>{" "}
              results accorrding to <br /> your taste.
            </p>
          </div>

          <form className="dark:bg-offwhite px-5 py-10 flex gap-5  md:gap-3 md:py-1 md:justify-between justify-center align-middle flex-col md:flex-row md:bg-white lg:flex-row lg:bg-white rounded-full lg:p-1 lg:justify-between md:w-auto">
            <div className="flex p-1 bg-white rounded-full h-10 lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiFillEnvironment />
              </label>
              <input
                type="text"
                required
                name="location"
                id="location"
                placeholder="Search Location.."
                className="w-screen rounded-full border-none lg:w-fit lg:bg-transparent md:w-auto md:text-sm"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="flex p-1 bg-white rounded-full h-10 relative lg:bg-transparent">
              <label htmlFor="location" className="text-icon px-2 py-1">
                <AiFillCalendar />
              </label>
              <span
                onClick={() => setToggleDate(!toggleDate)}
                className="text-gray-400 cursor-pointer relative md:text-xs md:pt-1 lg:text-sm"
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
                className="text-gray-400 cursor-pointer md:text-xs md:pt-1 lg:text-sm"
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
              className="bg-navbar text-white w-36 m-auto p-2 lg:self-end lg:m-1 lg:rounded-full md:rounded-full md:self-end md:m-0"
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

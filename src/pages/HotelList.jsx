import { DateRange } from "react-date-range";
import { format } from "date-fns";
import Navbar from "../components/Navbar.tsx";
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DarkthemeContex } from "../context/Darkmodecontext";
import Footer from "../components/Footer.tsx";

export default function HotelList() {
  const location = useLocation();
  const { darkMode, setDarkMode } = useContext(DarkthemeContex);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);
  const [toggleDate, setToggleDate] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  // //the api may require you to setup the date formart differently ensure to check before proceeding
  // const check_in = `${format(date[0].startDate, "dd/MM/yyyy")} `;
  // const check_out = `${format(date[0].endDate, "dd/MM/yyyy")} `;
  // console.log(check_out, check_in);
  console.log(rating, currency, price);
  const windowWidth = window.innerWidth;
  const refetchLocationList = (e) => {
    e.preventDefault();
  };

  const photo = [
    "./assets/spacejoy-XpbtQfr9Skg-unsplash.jpg",
    "./assets/spacejoy-XpbtQfr9Skg-unsplash.jpg",
    "./assets/desktop_background.png",
    "./assets/mobile_background.png",
  ];

  const filter_optionPrice = [
    "All",
    "600_000+",
    "400_000+",
    "200_000+",
    "50_000+",
    "30_000+",
  ];
  const filter_optionRating = ["All", "5.0", "4.0", "3.0", "2.0", "1.0"];
  const filter_optionCurrency = ["All", "NGA", "USD", "EUP", "JYP", "DTX"];

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  }, []);

  return (
    <div
      className={
        darkMode
          ? "relative dark transition-all ease-in-out delay-150 bg-dark_bg text-white duration-300"
          : ""
      }
    >
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      {windowWidth < 813 ? (
        <div className="flex justify-between p-1 m-3 flex-col gap-2">
          <form
            onSubmit={refetchLocationList}
            className="flex gap-2 rounded-full p-2 shadow-md bg-white dark:text-black dark:bg-offwhite"
          >
            <button type="submit">
              <AiOutlineSearch />
            </button>{" "}
            <input
              type="text"
              name="search"
              placeholder={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-4/5 dark:bg-offwhite"
            />
          </form>

          <div className="flex flex-col text-sm justify-center items-center gap-1">
            <h6 className="text-navbar dark:text-icon">Filter by:</h6>
            <form className="flex gap-3 justify-center items-center">
              <div>
                <label htmlFor="rating">Rating: </label>
                <select
                  name="rating"
                  id="rating"
                  onChange={(e) => setRating(e.target.value)}
                  className="bg-gray-50 rounded dark:text-gray-700 dark:bg-dark_secondary_white"
                >
                  {filter_optionRating.map((rating, i) => (
                    <option value={rating} className="" key={i}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price">Price: </label>
                <select
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 rounded dark:text-gray-700 dark:bg-dark_secondary_white"
                >
                  {filter_optionPrice.map((price, i) => (
                    <option value={price} className="" key={i}>
                      {price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price">Currency: </label>
                <select
                  name="currency"
                  id="currency"
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-gray-50 rounded dark:text-gray-700 dark:bg-dark_secondary_white"
                >
                  {filter_optionCurrency.map((currency, i) => (
                    <option value={currency} className="" key={i}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>

          <div className="bg-mobile_ads bg-cover bg-no-repeat bg-center h-12 dark:bg-mobile_ads_dark"></div>

          <div className="shadow-xl dark:shadow-xl m-2 h-40 flex dark:bg-offwhite dark:text-black">
            <div className="flex overflow-auto snap-mandatory snap-x w-36">
              {photo.map((pht, i) => (
                <div key={i} className="shrink-0">
                  <img src={pht} alt="hotel" className="w-full h-full" />
                </div>
              ))}
            </div>
            <div className="p-2">
              <h1 className="text-icon text-lg font-roboto_black">
                GRAND IBRO HOTEL
              </h1>
              <span className="text-xs mb-2 text-gray-500">wuse zone 5</span>
              <p className="mb-1 text-gray-500 font-Livvic_light text-sm">
                Rated: 3 out of 100
              </p>
              <p className="font-Livvic text-xs">
                Address: <br /> Ring Road 4, Aviation Village
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between p-2 m-3">
          <section className="w-72 flex flex-col gap-4">
            <form
              onSubmit={refetchLocationList}
              className="flex gap-2 rounded-full p-2 shadow-md bg-white dark:text-black dark:bg-offwhite"
            >
              <button type="submit">
                <AiOutlineSearch />
              </button>{" "}
              <input
                type="text"
                name="search"
                placeholder="search location.."
                onChange={(e) => setDestination(e.target.value)}
                className="w-4/5 dark:bg-offwhite"
              />
            </form>

            <form
              className={
                scroll
                  ? "sticky top-28 px-5 py-10 dark:bg-gradient-to-br dark:from-navdark dark:to-navbar flex flex-col gap-5 justify-center align-middle bg-gradient-to-br from-list_grad_1 to-list_grad_2"
                  : "sticky top-40 px-5 py-10 dark:bg-gradient-to-br dark:from-navdark dark:to-navbar flex flex-col gap-5 justify-center align-middle bg-gradient-to-br from-list_grad_1 to-list_grad_2"
              }
            >
              <h1 className="text-white text-xl">Search result:</h1>
              <div className="flex flex-col p-1  ">
                <label htmlFor="location" className="text-icon px-2 py-1">
                  Destination:
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder={destination}
                  className="rounded-full border-none bg-white h-10 dark:bg-offwhite placeholder:p-2"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="flex p-1 flex-col relative ">
                <label htmlFor="location" className="text-icon px-2 py-1">
                  Check-in Date:
                </label>
                <span
                  onClick={() => setToggleDate(!toggleDate)}
                  className="text-gray-400 cursor-pointer text-sm rounded-full p-2 shadow-md bg-white dark:bg-offwhite"
                >
                  {`${format(
                    location.state.date[0].startDate,
                    "dd/MM/yyyy"
                  )} to ${format(
                    location.state.date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {toggleDate && (
                  <DateRange
                    onChange={(item) => setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                    className="absolute inset-x-0 bottom-12 bg-white w-fit h-fit cursor-not-allowed"
                  />
                )}
              </div>

              <div className="flex flex-col p-1 relative ">
                <label htmlFor="location" className="text-icon px-2 py-1">
                  Travellers:
                </label>
                <span
                  onClick={() => setToggleOptions(!toggleOptions)}
                  className="text-gray-400 text-sm cursor-pointer rounded-full p-2 shadow-md bg-white dark:bg-offwhite"
                >{`${location.state.options.adult} adults  ${location.state.options.children} children  ${location.state.options.room} room`}</span>
                {toggleOptions && (
                  <div className="absolute bottom-12 w-fit h-fit p-3 flex flex-col justify-center inset-x-0 bg-white">
                    <div className="w-52 flex justify-between m-3">
                      <span className="optionText">Adult</span>
                      <div className="flex gap-3">
                        <button
                          disabled={location.state.options.adult <= 1}
                          className="h-8 text-blue-900 border-blue-900 bg-white"
                          type="button"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {location.state.options.adult}
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
                          disabled={location.state.options.children <= 0}
                          className="h-8 text-blue-900 border-blue-900 bg-white"
                          type="button"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {location.state.options.children}
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
                          disabled={location.state.options.room <= 1}
                          className="h-8 text-blue-900 border-blue-900 bg-white"
                          type="button"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {location.state.options.room}
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
                className="bg-list_btn text-black p-2"
                onClick={refetchLocationList}
              >
                Submit
              </button>
            </form>
          </section>

          <section className="flex flex-col flex-auto gap-4">
            <div className=" shadow-sm flex flex-col text-sm items-center gap-1">
              <h6 className="text-navbar dark:text-icon">Filter by:</h6>
              <form className="flex gap-4">
                <div>
                  <label htmlFor="rating">Rating: </label>
                  <select
                    name="rating"
                    id="rating"
                    onChange={(e) => setRating(e.target.value)}
                    className="bg-gray-50 rounded dark:text-gray-700 dark:bg-dark_secondary_white"
                  >
                    {filter_optionRating.map((rating, i) => (
                      <option value={rating} className="" key={i}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="price">Price: </label>
                  <select
                    name="price"
                    id="price"
                    className="bg-gray-50 rounded dark:text-gray-700 dark:bg-dark_secondary_white"
                    onChange={(e) => setPrice(e.target.value)}
                  >
                    {filter_optionPrice.map((price, i) => (
                      <option value={price} className="" key={i}>
                        {price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="price">Currency: </label>
                  <select
                    name="currency"
                    id="currency"
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-gray-50 rounded dark:text-gray-700 dark:bg-dark_secondary_white"
                  >
                    {filter_optionCurrency.map((currency, i) => (
                      <option value={currency} className="" key={i}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              <h6>452 results</h6>
            </div>

            <div className="flex justify-center items-center">
              <div className="shadow-xl dark:shadow-xl w-full m-2 h-64 flex dark:bg-offwhite dark:text-black">
                <div className="flex overflow-auto snap-mandatory snap-x w-64 ">
                  {photo.map((pht, i) => (
                    <div key={i} className="shrink-0">
                      <img src={pht} alt="hotel" className="w-full h-full" />
                    </div>
                  ))}
                </div>
                <div className="p-2">
                  <h1 className="text-icon text-lg font-roboto_black">
                    GRAND IBRO HOTEL
                  </h1>
                  <span className="text-xs mb-2 text-gray-500">
                    wuse zone 5
                  </span>
                  <p className="mb-1 text-gray-500 font-Livvic_light">
                    Rated: 3 out of 100
                  </p>
                  <p className="font-Livvic">
                    Address: <br /> Ring Road 4, Aviation Village
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="-z-0 bg-desktop_ads bg-cover bg-no-repeat bg-center w-36 sticky top-36 h-96"></div>
        </div>
      )}
      <Footer />
    </div>
  );
}

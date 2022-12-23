import React from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
// import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DarkthemeContex } from "../context/Darkmodecontext.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Loading from "../reusableComponents/Loading.tsx";
// import { useProperties, useSearchLocation } from "../hooks/useApiquery";
import Card from "../reusableComponents/Cardmobile";

import DesktopCard from "../reusableComponents/DesktopCard";
import axios from "axios";

export default function HotelList() {
  const location = useLocation();
  const { darkMode, setDarkMode } = useContext(DarkthemeContex);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [toggleDate, setToggleDate] = useState(false);
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("100");
  const [currency, setCurrency] = useState("USD");
  const [Pagenumber, setPagenumber] = useState(1);
  const [date, setDate] = useState(location.state.date);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [scroll, setScroll] = useState(false);
  // const [searchId, setSearchId] = useState([]);
  const [data, setData] = useState([]);

  //CALCULATES HOW MANY DAYS
  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDay = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDay;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  }, []);
  // //the api may require you to setup the date formart differently ensure to check before proceeding
  // const check_in = `${format(date[0].startDate, "yyyy-MM-dd")} `;
  // const check_out = `${format(date[0].endDate, "yyyy-MM-dd")} `;

  const search_options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/locations/search",
    params: {
      query: destination,
      limit: "30",
      offset: "0",
      units: "km",
      location_id: Pagenumber,
      currency: currency,
      sort: "relevance",
      lang: "en_US",
    },
    headers: {
      "X-RapidAPI-Key": "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
  };

  const getData = async () => {
    try {
      await axios.request(search_options).then(async (location_id) => {
        const locationId = location_id?.data.data[0].result_object.location_id;
        const properties_options = {
          method: "GET",
          url: "https://travel-advisor.p.rapidapi.com/hotels/list",
          params: {
            location_id: locationId,
            aduIdlts: options.adult,
            rooms: options.room,
            nights: days,
            offset: "0",
            // pricesmax: price,
            currency: currency,
            order: "asc",
            limit: "30",
            sort: "recommended",
            lang: "en_US",
          },
          headers: {
            "X-RapidAPI-Key":
              "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        };
        const res = await axios.request(properties_options);

        setData(res[0]);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  // conIdst search = useSearchLocation(search_options);
  // const location_id = search.data?.data.data[0].result_object.location_id;
  // console.log(search.data?.data.data[0].result_object.location_id);

  // const properties_options = {
  //   method: "GET",
  //   url: "https://travel-advisor.p.rapidapi.com/hotels/list",
  //   params: {
  //     location_id: searchId,
  //     aduIdlts: options.adult,
  //     rooms: options.room,
  //     nights: days,
  //     offset: "0",
  //     pricesmax: price,
  //     currency: currency,
  //     order: "asc",
  //     limit: "30",
  //     sort: "recommended",
  //     lang: "en_US",
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
  //     "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  //   },
  // };
  // const { data, isError, isLoading, success, error, refetch } =
  //   useProperties(properties_options);
  // console.log(data?.data);

  // if (isError) {
  //   console.log(error);
  // }

  const windowWidth = window.innerWidth;
  const refetchLocationList = (e) => {
    e.preventDefault();
  };

  const filter_optionPrice = ["1000", "700", "600", "400", "300", "120"];
  const filter_optionRating = ["recommended", "popularity", "price"];
  const filter_optionCurrency = ["USD", "NGN", "EUR", "GBP"];

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const pagination = [1, 2, 3, 4, 5];

  return (
    <div
      className={
        darkMode
          ? "relative dark transition-all ease-in-out delay-150 bg-dark_bg text-white duration-300 h-screen"
          : " h-screen"
      }
    >
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className="flex flex-col md:lg:flex md:lg:flex-row justify-between p-2 m-3">
        <section className="w-72 lg:flex flex-col gap-4 hidden">
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
                )} to ${format(location.state.date[0].endDate, "dd/MM/yyyy")}`}
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

        {windowWidth < 815 && (
          <div className="bg-mobile_ads bg-no-repeat bg-contain bg-center h-12 dark:bg-mobile_ads_dark"></div>
        )}

        <section className="flex flex-col flex-auto gap-4">
          <div className=" shadow-sm flex flex-col text-sm items-center gap-1">
            <h6 className="text-navbar dark:text-icon">Filter by:</h6>
            <form className="flex gap-4">
              <div>
                <label htmlFor="rating">Sort: </label>
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
            {/* <h6>2821 results</h6> */}
          </div>
          {data === undefined ? (
            <Loading />
          ) : (
            <>
              {data?.map((item, i) => {
                if (windowWidth < 813) {
                  return (
                    <Card
                      pagination={pagination}
                      setPagenumber={setPagenumber}
                      toggleDate={toggleDate}
                      filter_optionCurrency={filter_optionCurrency}
                      setCurrency={setCurrency}
                      filter_optionPrice={filter_optionPrice}
                      setPrice={setPrice}
                      setRating={setRating}
                      filter_optionRating={filter_optionRating}
                      destination={destination}
                      setDestination={setDestination}
                      scroll={scroll}
                      refetchLocationList={refetchLocationList}
                      handleOption={handleOption}
                      key={i}
                      item={item}
                    />
                  );
                } else {
                  return (
                    <DesktopCard
                      pagination={pagination}
                      setPagenumber={setPagenumber}
                      toggleDate={toggleDate}
                      filter_optionCurrency={filter_optionCurrency}
                      setCurrency={setCurrency}
                      filter_optionPrice={filter_optionPrice}
                      setPrice={setPrice}
                      setRating={setRating}
                      filter_optionRating={filter_optionRating}
                      destination={destination}
                      setDestination={setDestination}
                      refetchLocationList={refetchLocationList}
                      handleOption={handleOption}
                      scroll={scroll}
                      key={i}
                      item={item}
                    />
                  );
                }
              })}
            </>
          )}
          <div className="pagination flex gap-3 justify-center items-center">
            {pagination.map((pagenum, i) => (
              <div key={i} className="bg-black text-white p-2 cursor-pointer">
                <h4 onClick={(e) => setPagenumber(pagenum)}>{pagenum}</h4>
              </div>
            ))}
          </div>
        </section>

        {windowWidth > 815 && (
          <div className="bg-desktop_ads bg-no-repeat bg-contain bg-center w-64 m-0"></div>
        )}
      </div>
      <Footer />
    </div>
  );
}

//SEARCH FOR PLACESE AND GET HOTELS IN THE AREA
const axios = require("axios");

const options = {
  method: "GET",
  url: "https://hotels4.p.rapidapi.com/locations/v2/search",
  params: { query: "abuja", locale: "en_US", currency: "USD" },
  headers: {
    "X-RapidAPI-Key": "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
    "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

// SENDS BACK THE CITY NAME, COUNTRY, LATLONG AND CURRENCY VALUE

const optionsS = {
  method: "GET",
  url: "https://hotels4.p.rapidapi.com/locations/v3/search",
  params: {
    q: "abuja",
    locale: "en_US",
    langid: "1033",
    siteid: "300000001",
  },
  headers: {
    "X-RapidAPI-Key": "8b548f0d36mshb24846c09cc0cfcp1edf30jsn199b6fc034a8",
    "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
  },
};

axios
  .request(optionsS)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

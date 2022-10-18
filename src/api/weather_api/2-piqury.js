const axios = require("axios");

const options = {
  method: "GET",
  url: "https://hotels4.p.rapidapi.com/properties/list",
  params: {
    destinationId: "1506246",
    pageNumber: "1",
    pageSize: "25",
    checkIn: "<REQUIRED>",
    checkOut: "<REQUIRED>",
    adults1: "1",
    sortOrder: "PRICE",
    locale: "en_US",
    currency: "USD",
  },
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

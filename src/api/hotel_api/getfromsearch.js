const axios = require("axios");

// destinationId comes from the search route

const options = {
  method: "GET",
  url: "https://hotels4.p.rapidapi.com/properties/list",
  params: {
    destinationId: "1506246",
    pageNumber: "1",
    pageSize: "25",
    checkIn: "2022-04-03",
    checkOut: "2022-04-07",
    adults1: "1",
    sortOrder: "PRICE",
    locale: "en_US",
    currency: "USD",
  },
  headers: {
    "X-RapidAPI-Key": `${process.env.API_KEY}`,
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

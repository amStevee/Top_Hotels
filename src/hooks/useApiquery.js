import { useQuery } from "react-query";
import axios from "axios";

const getSearchLocation = (search_options) => {
  return axios.request(search_options);
};

const getProperties = (properties_options) => {
  return axios.request(properties_options);
};
export const useProperties = (properties_options) => {
  return useQuery(["properties"], () => getProperties(properties_options));
};

const getPhotos = (photo_options) => {
  return axios.request(photo_options);
};

export const useSearchLocation = (search_options) => {
  return useQuery(["hotel_count"], () => getSearchLocation(search_options));
};

export const usePhotos = (photo_options) => {
  return useQuery(["photos"], getPhotos);
};

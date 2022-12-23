import { useQuery } from "react-query";
import axios from "axios";

const getSearchLocation = async (search_options) => {
  return await axios.request(search_options);
};

const getProperties = async (properties_options) => {
  const res = await axios.request(properties_options);
  return res;
};

const getPhotos = async (photo_options) => {
  return await axios.request(photo_options);
};

export const useProperties = (properties_options) => {
  return useQuery(["properties"], () => getProperties(properties_options));
};

export const useSearchLocation = (search_options) => {
  return useQuery(["hotel_count"], () => getSearchLocation(search_options));
};

export const usePhotos = (photo_options) => {
  return useQuery(["photos"], getPhotos);
};

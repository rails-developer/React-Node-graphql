import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const GetPersons = async (params) => {
  const { page, searchByName } = params;
  let baseUrl = process.env.SWAPI_URL;

  if (page) {
    baseUrl = process.env.SWAPI_URL + "/?page=" + page;
  }
  if (searchByName) {
    baseUrl = process.env.SWAPI_URL + "/?search=" + searchByName;
  }
  return await axios.get(baseUrl).then((res) => res.data);
};

import axios from "axios";

const GetPersons = async (params) => {
  let baseUrl = "https://swapi.dev/api/people";
  if (params?.page) {
    baseUrl = "https://swapi.dev/api/people/?page=" + params?.page;
  }
  if (params?.searchByName) {
    baseUrl = "https://swapi.dev/api/people/?search=" + params?.searchByName;
  }
  return await axios.get(baseUrl).then((data) => data.data);
};

const Query = {
  body: async (root, params, context) => await GetPersons(params),
};

module.exports = { Query };

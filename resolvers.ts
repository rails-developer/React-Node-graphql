import axios from "axios";

const GetPersons = async (pageNumber) => {
  let baseUrl = "https://swapi.dev/api/people";
  if (pageNumber) {
    baseUrl = "https://swapi.dev/api/people/?page=" + pageNumber;
  }
  return await axios.get(baseUrl).then((data) => data.data);
};

const Query = {
  body: async (root, { page }, context) => await GetPersons(page),
};

module.exports = { Query };

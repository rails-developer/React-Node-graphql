import { GetPersons } from "./controller/swapiPerson";

export const Query = {
  body: async (root, params, context) => await GetPersons(params),
};

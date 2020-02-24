import useSWR from "swr";
import { fmFetch } from "fmw-utils";

/*
Custom Hooks are your friend. 
SWR makes it trivial to right hooks that keep the data up to date.
you'll likely need one for each find you do.
*/

/**
 * performs a find on the sample data
 * @param {string} primaryKeyQuery
 */
export const useFindRecords = primaryKeyQuery => {
  //async function for SWR
  const fetcher = async primaryKeyQuery => {
    const req = {
      layouts: "AddonSampleData",
      query: [{ PrimaryKey: primaryKeyQuery }]
    };

    const result = await fmFetch("AddonNameFind", req);
    if (result.messages[0].code !== "0") {
      throw new Error(
        `Error: ${result.messages[0].code}. ${result.messages[0].message}`
      );
    }
    const dataArray = result.response.data;
    return dataArray;
  };

  //ask swr to take it from here.
  return useSWR(primaryKeyQuery, fetcher, {});
};

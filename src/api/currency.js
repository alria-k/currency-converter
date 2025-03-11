import axios from "axios";

const CURRENCY_API_KEY = "d1def1d5418e6c4ba04dab87";
const CURRENCY_DATA_URL = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/`;
const COUNTRIES_DATA_URL =
  "https://gist.githubusercontent.com/ibrahimhajjaj/a0e39e7330aebf0feb49912f1bf9062f/raw/d160e7d3b0e11ea3912e97a1b3b25b359746c86a/currencies-with-flags.json";

async function getCountryCodes() {
  const res = await axios.get(CURRENCY_DATA_URL + "codes");
  return res.data;
}

async function getCountries() {
  const res = await axios.get(COUNTRIES_DATA_URL);
  return res.data;
}

export function getConversionRate(mainCountry, convertedCountries) {
  const [res] = convertedCountries.map(async function (country) {
    return await axios
      .get(
        CURRENCY_DATA_URL + `pair/${mainCountry.currency}/${country.currency}`
      )
      .then(({ data }) => data);
  });
  return res;
}

export async function getFlags() {
  try {
    const [val1, val2] = await Promise.all([getCountryCodes(), getCountries()]);
    const result = val1.supported_codes
      .map((data1) => {
        const country = val2.find((data2) => data2.code === data1[0]);
        if (country) {
          return {
            code: data1[0],
            flag: `https://flagcdn.com/w160/${country.countryCode.toLowerCase()}.png`,
          };
        }
        return null;
      })
      .filter(Boolean);

    return result;
  } catch (error) {
    console.error("Ошибка загрузки флагов:", error);
    return [];
  }
}

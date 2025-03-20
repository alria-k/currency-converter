import axios from "axios";

const CURRENCY_API_KEY = "086c7c583b33fa2054130738";
const CURRENCY_DATA_URL = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/`;

async function getCountryCodes() {
  const res = await Promise.resolve(axios.get(CURRENCY_DATA_URL + "codes"));
  return res.data.supported_codes;
}

export async function getRandomCountry(countries) {
  const value = await getCountryCodes();
  let randomCountryFound = false;
  while (randomCountryFound != true) {
    let randomCountryIndex = Math.floor(Math.random() * value.length);
    if (!countries.includes((data) => data.country_id == randomCountryIndex)) {
      randomCountryFound = true;
      return {
        index: countries.length,
        country_id: randomCountryIndex,
        currency: value[randomCountryIndex][0],
        flag: `https://flagcdn.com/w160/${value[randomCountryIndex][0]
          .substring(0, value[randomCountryIndex][0].length - 1)
          .toLowerCase()}.png`,
      };
    }
  }
}

export async function getConversionRate(mainCountry, convertedCountries) {
  const promises = convertedCountries.map((country) =>
    axios
      .get(
        CURRENCY_DATA_URL + `pair/${mainCountry.currency}/${country.currency}`
      )
      .then(({ data }) => data)
  );
  const res = await Promise.all(promises);
  return res;
}

export async function getFlags() {
  const value = await getCountryCodes();
  return value.map((data, countryIndex) => ({
    code: data[0],
    country_id: countryIndex,
    flag: `https://flagcdn.com/w160/${data[0]
      .substring(0, data[0].length - 1)
      .toLowerCase()}.png`,
  }));
}

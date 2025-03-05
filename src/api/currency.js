import axios from "axios";

const CURRENCY_API_KEY = "d1def1d5418e6c4ba04dab87";
const CURRENCY_DATA_URL = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/`;
const COUNTRIES_DATA_URL =
  "https://gist.githubusercontent.com/portapipe/a28cd7a9f8aa3409af9171480efcc090/raw/297c47670ce73d5a04c3306e38eb18e91edb709d/countries.json";

async function getCountryCodes() {
  const res = await axios.get(CURRENCY_DATA_URL + "codes");
  return res.data;
}

async function getCountries() {
  const res = await axios.get(COUNTRIES_DATA_URL);
  return res.data;
}

export async function getFlags() {
  try {
    const [val1, val2] = await Promise.all([getCountryCodes(), getCountries()]);

    const result = val1.supported_codes
      .map((data1) => {
        const country = val2.find((data2) => data2.currency.code === data1[0]);
        if (country) {
          return {
            code: data1[0],
            flag: `data:image/png;base64,${country.flag}`,
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

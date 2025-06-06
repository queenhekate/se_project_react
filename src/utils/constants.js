export const coordinates = {
  latitude: 32.7915474,
  longitude: -117.2502973,
};

export const APIkey = "c8f3832ad336e9326ddd13338eda164d";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr1000.jumpingcrab.com"
    : "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export const weatherOptions = [
  {
    day: true,
    main: "Clear",
    url: new URL("../images/Day/Clear.png", import.meta.url).href,
  },

  {
    day: true,
    main: "Cloudy",
    url: new URL("../images/Day/Cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    main: "Fog",
    url: new URL("../images/Day/Fog.png", import.meta.url).href,
  },

  {
    day: true,
    main: "Mist",
    url: new URL("../images/Day/Fog.png", import.meta.url).href,
  },

  {
    day: true,
    main: "Rain",
    url: new URL("../images/Day/Rain.png", import.meta.url).href,
  },

  {
    day: true,
    main: "Snow",
    url: new URL("../images/Day/Snow.png", import.meta.url).href,
  },

  {
    day: true,
    main: "Storm",
    url: new URL("../images/Day/Storm.png", import.meta.url).href,
  },

  {
    day: false,
    main: "Clear",
    url: new URL("../images/Night/Clear.png", import.meta.url).href,
  },

  {
    day: false,
    main: "Cloudy",
    url: new URL("../images/Night/Cloudy.png", import.meta.url).href,
  },

  {
    day: false,
    description: "Fog",
    url: new URL("../images/Night/Fog.png", import.meta.url).href,
  },

    {
    day: false,
    main: "Mist",
    url: new URL("../images/Night/Fog.png", import.meta.url).href,
  },

  {
    day: false,
    main: "Rain",
    url: new URL("../images/Night/Rain.png", import.meta.url).href,
  },

  {
    day: false,
    main: "Snow",
    url: new URL("../images/Night/Snow.png", import.meta.url).href,
  },

  {
    day: false,
    main: "Storm",
    url: new URL("../images/Night/Storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    url: new URL("../images/Day/Default.png", import.meta.url).href,
  },
  night: {
    day: false,
    url: new URL("../images/Night/Default.png", import.meta.url).href,
  },
};

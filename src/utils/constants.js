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
    description: "clear",
    url: new URL("../images/Day/Clear.png", import.meta.url).href,
  },

  {
    day: true,
    description: "cloudy",
    url: new URL("../images/Day/Cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    description: "fog",
    url: new URL("../images/Day/Fog.png", import.meta.url).href,
  },

  {
    day: true,
    description: "mist",
    url: new URL("../images/Day/Fog.png", import.meta.url).href,
  },

  {
    day: true,
    description: "rain",
    url: new URL("../images/Day/Rain.png", import.meta.url).href,
  },

  {
    day: true,
    description: "snow",
    url: new URL("../images/Day/Snow.png", import.meta.url).href,
  },

  {
    day: true,
    description: "storm",
    url: new URL("../images/Day/Storm.png", import.meta.url).href,
  },

  {
    day: false,
    description: "clear",
    url: new URL("../images/Night/Clear.png", import.meta.url).href,
  },

  {
    day: false,
    description: "cloudy",
    url: new URL("../images/Night/Cloudy.png", import.meta.url).href,
  },

  {
    day: false,
    description: "fog",
    url: new URL("../images/Night/Fog.png", import.meta.url).href,
  },

    {
    day: false,
    description: "mist",
    url: new URL("../images/Night/Fog.png", import.meta.url).href,
  },

  {
    day: false,
    description: "rain",
    url: new URL("../images/Night/Rain.png", import.meta.url).href,
  },

  {
    day: false,
    description: "snow",
    url: new URL("../images/Night/Snow.png", import.meta.url).href,
  },

  {
    day: false,
    description: "storm",
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

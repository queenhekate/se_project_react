export const coordinates = {
  latitude: 32.7915474,
  longitude: -117.2502973,
};

export const APIkey = "c8f3832ad336e9326ddd13338eda164d";

export const baseUrl = "http://localhost:3001";

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
    condition: "clear",
    url: new URL("../images/Day/Clear.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "cloudy",
    url: new URL("../images/Day/Cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "fog",
    url: new URL("../images/Day/Fog.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../images/Day/Rain.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "snow",
    url: new URL("../images/Day/Snow.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "storm",
    url: new URL("../images/Day/Storm.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../images/Night/Clear.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "cloudy",
    url: new URL("../images/Night/Cloudy.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "fog",
    url: new URL("../images/Night/Fog.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "rain",
    url: new URL("../images/Night/Rain.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "snow",
    url: new URL("../images/Night/Snow.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "storm",
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

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

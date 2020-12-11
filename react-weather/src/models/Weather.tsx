import { intWeather } from "./intWeather";
import { Main } from "./Main";

export interface Weather{
    name: string,
    id: number,
    main: Main,
    visibility: number,
    weather: intWeather[];
  }
import { FIFTEEN_MINUTES_IN_MS } from "./constants"

export const getActualTimeInSeconds = () => {
  return (new Date().getTime() + FIFTEEN_MINUTES_IN_MS * 1000) / 1000
}
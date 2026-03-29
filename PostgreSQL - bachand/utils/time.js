import { zonedTimeToUtc } from "date-fns-tz";

export function buildPublishUtc(date, time, timezone) {
  try {
    return zonedTimeToUtc(`${date} ${time}`, timezone).toISOString();
  } catch {
    return null;
  }
}
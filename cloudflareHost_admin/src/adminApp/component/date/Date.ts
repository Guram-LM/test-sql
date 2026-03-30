import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TBILISI_TZ = "Asia/Tbilisi";


export const formatTbilisiDate = (
  date: string | Date,
  format = "DD.MM.YYYY HH:mm"
) => {
  return dayjs.utc(date).tz(TBILISI_TZ).format(format);
};

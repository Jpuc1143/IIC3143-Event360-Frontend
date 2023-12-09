export default function changeDateFormat(ISODate: string) {
  const date = new Date(ISODate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(2);
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const res = `${day}/${month}/${year} - ${hour}:${minutes}`;
  return res;
}

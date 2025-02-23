export function DefaultSuratJalanNumber(data) {
  const totalData = data?.totalCount || 0;
  const date = new Date();
  const currentYear = date.getFullYear();

  if (totalData < 1) {
    return `001/DO-DRX/${currentYear}`;
  } else {
    const newDocNumber = (totalData + 1).toString().padStart(3, '0');
    return `${newDocNumber}/DO-DRX/${currentYear}`;
  }
}

export function DefaultSuratTugasNumber(data) {
  const totalData = data?.totalCount || 0;
  const date = new Date();
  const currentYear = date.getFullYear();

  if (totalData < 1) {
    return `001/DC-DRX/${currentYear}`;
  } else {
    const newDocNumber = (totalData + 1).toString().padStart(3, '0');
    return `${newDocNumber}/DC-DRX/${currentYear}`;
  }
}

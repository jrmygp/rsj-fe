export function DefaultQuotationNumber(data) {
  const totalData = data?.length || 0;
  const date = new Date();
  const currentYear = date.getFullYear();

  if (totalData < 1) {
    return `001/QUO-RDX/${currentYear}`;
  } else {
    const newQuoNumber = (totalData + 1).toString().padStart(3, '0');
    return `${newQuoNumber}/QUO-RDX/${currentYear}`;
  }
}

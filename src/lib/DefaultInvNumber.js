export function DefaultInvNumber(data, customerCode, invoiceType) {
  const type =
    invoiceType === 'import' ? 'IMP' : invoiceType === 'export' ? 'EXP' : 'DD';

  const totalData = data?.totalCount || 0;
  const date = new Date();
  const currentYear = date.getFullYear();

  if (totalData < 1) {
    return `001/${customerCode}/${type}-INV/${currentYear}`;
  } else {
    const newQuoNumber = (totalData + 1).toString().padStart(3, '0');
    return `${newQuoNumber}/${customerCode}/${type}-INV/${currentYear}`;
  }
}

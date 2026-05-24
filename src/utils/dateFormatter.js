export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'ไม่ทราบเวลา';
  
  // Fix for Safari/iOS parsing "YYYY-MM-DD HH:mm:ss" 
  const safeDateStr = dateString.replace(' ', 'T');
  const date = new Date(safeDateStr);

  if (isNaN(date)) {
    return 'ไม่ทราบเวลา';
  }

  return date.toLocaleString('th-TH', options);
};

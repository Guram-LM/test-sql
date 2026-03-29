export function formatFullDate(eventDate: string, lang: string) {
    const monthsKa = [
      'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
      'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
    ];
  
    const monthsEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const date = new Date(eventDate);
  
    const day = date.getDate();
    const month = date.getMonth(); 
    const year = date.getFullYear();
  
    const isKa = lang?.startsWith('ka');
  
    const monthName = isKa ? monthsKa[month] : monthsEn[month];
  
    return `${day} ${monthName} ${year}`;
  }
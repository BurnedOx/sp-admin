/**
 * 
 * @param {string | Date} adate 
 * @returns {string}
 */
export const getFormatedDate = (adate) => {
    const d = new Date(adate);
    const date = d.toLocaleDateString('en-Us', { month: 'long', day: 'numeric', year: 'numeric' });
    const time = d.toLocaleTimeString('en-Us', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
}
export const separateMoneyValue = (val:string| number)=>String(val).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

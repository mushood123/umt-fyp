// @ts-nocheck

export const getCurrentDate = () => {
   let today = new Date();
   const dd = String(today.getDate()).padStart(2, '0');
   const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
   const yyyy = today.getFullYear();

   today = `${dd}-${mm}-${yyyy}`;

   return today;
};

export const getCurrentTimestampReadable = () => {
   const currentDate = new Date();
   return currentDate.toLocaleString(); // This gives a readable format based on the user's locale
};

export const timeSlots = [
   '8:00 AM - 10:00 AM',
   '10:00 AM - 12:00 PM',
   '12:00 PM - 2:00 PM',
   '2:00 PM - 4:00 PM',
   '6:00 PM - 8:00 PM',
];

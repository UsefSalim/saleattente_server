// /// use for parse the date
// const timeElapsed = Date.now();
// const today = new Date(timeElapsed);
// console.log(today);
// const x = today.toLocaleDateString();
// const y = '1/04/2021';

// const a = x.split('/');
// const b = y.split('/');

// const date1 = new Date(a[2], a[1], a[0]);
// const date2 = new Date(b[2], b[1], b[0]);
const compare_dates = function (date1, date2) {
  if (date1 > date2) return 'Date1 > Date2';
  if (date1 < date2) return 'Date2 > Date1';
  return 'Date1 = Date2';
};
// console.log(compare_dates(date1, date2));

// // if (date1 < date2) console.log('Date1 < Date2');

const date = (date) => {
  const newDate = new Date(date);
  const dateSansMin = newDate.toLocaleDateString();
  const spliteDate = dateSansMin.split('/');
  const finalDate = new Date(spliteDate[2], spliteDate[1], spliteDate[0]);
  return finalDate;
};

const date2 = date(Date.now());
const date1 = date(new Date(new Date().valueOf() + 1000 * 3600 * 24));
console.log(compare_dates(date1, date2));

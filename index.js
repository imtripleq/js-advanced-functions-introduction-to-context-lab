// Your code here

function createEmployeeRecord([firName, famName, ti, payRate]) {
  return {
    firstName: firName,
    familyName: famName,
    title: ti,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

const runTest = createEmployeeRecord(["Dennis", "Khor", "Mr", 1]);
console.log(runTest.firstName);

function createEmployeeRecords(array1) {
  return array1.map((a) => {
    return createEmployeeRecord(a);
  });
}

function createTimeInEvent(em, datestamp) {
  const [date, hour] = datestamp.split(" ");

  em.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return em;
}

function createTimeOutEvent(em, datestamp) {
  const [date, hour] = datestamp.split(" ");

  em.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return em;
}

function hoursWorkedOnDate(a, b) {
  const inTime = a.timeInEvents.find((e) => {
    return e.date === b;
  });
  const outTime = a.timeOutEvents.find((e) => {
    return e.date === b;
  });

  return (outTime.hour - inTime.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const rawWage = hoursWorkedOnDate(employee, date) * employee.payPerHour;
  return parseFloat(rawWage.toString());
}

function allWagesFor(employee) {
  const eligibleDates = employee.timeInEvents.map((e) => {
    return e.date;
  });

  const payable = eligibleDates.reduce((memo, d) => {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((rec) => {
    return rec.firstName === firstName;
  });
}

function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce((memo, rec) => {
    return memo + allWagesFor(rec);
  }, 0);
}

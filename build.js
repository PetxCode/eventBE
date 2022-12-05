// const input = [
//   {
//     scenario: "scenario-483d742c-4492-4a4f-95fa-7ccceac8bb18",
//     data: [{ date: "2018-05-21", price: 14.173041264216105 }],
//   },
//   {
//     scenario: "scenario-483d742c-4492-4a4f-95fa-7ccceac8bb18",
//     data: [{ date: "2018-05-22", price: 42.94691197077433 }],
//   },
//   {
//     scenario: "scenario-c705069f-fa53-4ff3-9f07-3fcbf9dc8d15",
//     data: [{ date: "2018-05-22", price: 42.94691197077433 }],
//   },
//   {
//     scenario: "scenario-c705069f-fa53-4ff3-9f07-3fcbf9dc8d15",
//     data: [{ date: "2018-05-22", price: 42.94691197077433 }],
//   },
//   {
//     scenario: "scenario-d58bb001-d7ed-4744-8f6c-8377519c7a99",
//     data: [{ date: "2018-05-22", price: 42.94691197077433 }],
//   },
//   {
//     scenario: "scenario-d58bb001-d7ed-4744-8f6c-8377519c7a99",
//     data: [{ date: "2018-05-22", price: 42.94691197077433 }],
//   },
// ];

// console.log(
//   Object.values(
//     input.reduce((a, { scenario, data }) => {
//       if (!a[scenario]) a[scenario] = { scenario, data: [] };
//       a[scenario].data.push(data[0]);
//       return a;
//     }, {})
//   )
// );

outJSON = [
  {
    team: "TeamA",
    name: "Ahmed",
    field3: "val3",
  },
  {
    team: "TeamB",
    name: "Ahmed",
    field3: "val43",
  },
  {
    team: "TeamA",
    name: "Ahmed",
    field3: "val55",
  },
];

let data = [
  {
    _id: "638e0bbdcabacd9c66026ed8",
    date: "Monday, December 5th 2022, 3:18:21",
    hubName: "Idowu",
    totalExpense: 6500,
    totalSales: 80000,
    submittedBy: "Blessed Uzorma",
    note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
    dated: "Monday, December 5th 2022",
    detail: [
      {
        item: "ffeer",
        cost: 3500,
        status: "expense",
        id: 1,
      },
      {
        item: "Fuel",
        cost: 3000,
        status: "expense",
        id: 2,
      },
      {
        item: "rent",
        cost: 50000,
        status: "sales",
        id: 3,
      },
      {
        item: "car ride",
        cost: 30000,
        status: "sales",
        id: 4,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 73500,
    createdAt: "2022-12-05T15:18:21.196Z",
    updatedAt: "2022-12-05T15:18:21.196Z",
    __v: 0,
  },
  {
    _id: "638e0b65cabacd9c66026eb2",
    date: "Monday, December 5th 2022, 3:16:53",
    hubName: "Idowu",
    totalExpense: 43000,
    totalSales: 94555,
    submittedBy: "Blessed Uzorma",
    note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
    dated: "Monday, December 5th 2022",
    detail: [
      {
        item: "Fuel",
        cost: 3000,
        status: "expense",
        id: 1,
      },
      {
        item: "rent",
        cost: 50000,
        status: "sales",
        id: 2,
      },
      {
        item: "car",
        cost: 44555,
        status: "sales",
        id: 3,
      },
      {
        item: "Pay",
        cost: 40000,
        status: "expense",
        id: 4,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 51555,
    createdAt: "2022-12-05T15:16:53.085Z",
    updatedAt: "2022-12-05T15:16:53.085Z",
    __v: 0,
  },
];

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

let newData = [
  {
    _id: "638e0e67cabacd9c66026f41",
    date: "Monday, December 5th 2022, 3:29:43",
    hubName: "Idowu",
    totalExpense: 7000,
    totalSales: 101000,
    submittedBy: "Blessed Uzorma",
    note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
    dated: "Monday, December 5th 2022",
    detail: [
      {
        item: "stater",
        cost: 4000,
        status: "expense",
        id: 1,
      },
      {
        item: "gamer",
        cost: 3000,
        status: "expense",
        id: 2,
      },
      {
        item: "shirt",
        cost: 25000,
        status: "sales",
        id: 3,
      },
      {
        item: "starting",
        cost: 26000,
        status: "sales",
        id: 4,
      },
      {
        item: "star",
        cost: 50000,
        status: "sales",
        id: 5,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 94000,
    createdAt: "2022-12-05T15:29:43.448Z",
    updatedAt: "2022-12-05T15:29:43.448Z",
    __v: 0,
  },
  {
    _id: "638e0bbdcabacd9c66026ed8",
    date: "Monday, December 5th 2022, 3:18:21",
    hubName: "Idowu",
    totalExpense: 6500,
    totalSales: 80000,
    submittedBy: "Blessed Uzorma",
    note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
    dated: "Monday, December 5th 2022",
    detail: [
      {
        item: "ffeer",
        cost: 3500,
        status: "expense",
        id: 1,
      },
      {
        item: "Fuel",
        cost: 3000,
        status: "expense",
        id: 2,
      },
      {
        item: "rent",
        cost: 50000,
        status: "sales",
        id: 3,
      },
      {
        item: "car ride",
        cost: 30000,
        status: "sales",
        id: 4,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 73500,
    createdAt: "2022-12-05T15:18:21.196Z",
    updatedAt: "2022-12-05T15:18:21.196Z",
    __v: 0,
  },
  {
    _id: "638e0b65cabacd9c66026eb2",
    date: "Monday, December 5th 2022, 3:16:53",
    hubName: "Idowu",
    totalExpense: 43000,
    totalSales: 94555,
    submittedBy: "Blessed Uzorma",
    note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
    dated: "Monday, December 5th 2022",
    detail: [
      {
        item: "Fuel",
        cost: 3000,
        status: "expense",
        id: 1,
      },
      {
        item: "rent",
        cost: 50000,
        status: "sales",
        id: 2,
      },
      {
        item: "car",
        cost: 44555,
        status: "sales",
        id: 3,
      },
      {
        item: "Pay",
        cost: 40000,
        status: "expense",
        id: 4,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 51555,
    createdAt: "2022-12-05T15:16:53.085Z",
    updatedAt: "2022-12-05T15:16:53.085Z",
    __v: 0,
  },
];
var groubedByTeam = groupBy(newData, "dated");

let myData = {
  "Monday, December 5th 2022": [
    {
      _id: "638e0e67cabacd9c66026f41",
      date: "Monday, December 5th 2022, 3:29:43",
      hubName: "Idowu",
      totalExpense: 7000,
      totalSales: 101000,
      submittedBy: "Blessed Uzorma",
      note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
      dated: "Monday, December 5th 2022",
      detail: [Array],
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
      profit: 94000,
      createdAt: "2022-12-05T15:29:43.448Z",
      updatedAt: "2022-12-05T15:29:43.448Z",
      __v: 0,
    },
    {
      _id: "638e0bbdcabacd9c66026ed8",
      date: "Monday, December 5th 2022, 3:18:21",
      hubName: "Idowu",
      totalExpense: 6500,
      totalSales: 80000,
      submittedBy: "Blessed Uzorma",
      note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
      dated: "Monday, December 5th 2022",
      detail: [Array],
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
      profit: 73500,
      createdAt: "2022-12-05T15:18:21.196Z",
      updatedAt: "2022-12-05T15:18:21.196Z",
      __v: 0,
    },
    {
      _id: "638e0b65cabacd9c66026eb2",
      date: "Monday, December 5th 2022, 3:16:53",
      hubName: "Idowu",
      totalExpense: 43000,
      totalSales: 94555,
      submittedBy: "Blessed Uzorma",
      note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
      dated: "Monday, December 5th 2022",
      detail: [Array],
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
      profit: 51555,
      createdAt: "2022-12-05T15:16:53.085Z",
      updatedAt: "2022-12-05T15:16:53.085Z",
      __v: 0,
    },
  ],
};

console.log("start...");
console.log("");
console.log("");
console.log("");

let res = Object.values(groubedByTeam).map((el) => {
  return el.map((props) => {
    return props;
  });
});

console.log(
  res.flat().map((el) => {
    return el.profit;
  })
);

console.log(Object.values(groubedByTeam).flat());

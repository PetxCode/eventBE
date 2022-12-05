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
    _id: "638ce987fd56799d648aa082",
    date: "Sunday, December 4th 2022, 6:40:07",
    hubName: "Idowu",
    totalExpense: 3344,
    totalSales: 44000,
    submittedBy: "Blessed Uzorma",
    note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
    detail: [
      {
        item: "Fuel",
        cost: 3344,
        status: "expense",
        id: 1,
      },
      {
        item: "op",
        cost: 44000,
        status: "sales",
        id: 2,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 40656,
    createdAt: "2022-12-04T18:40:07.176Z",
    updatedAt: "2022-12-04T18:40:07.176Z",
    __v: 0,
  },
  {
    _id: "638c4d51b7919c9e5400b881",
    date: "Sunday, December 4th 2022, 7:33:37",
    hubName: "Origie",
    totalExpense: 27966,
    totalSales: 103300,
    submittedBy: "Blessed Uzorma",
    note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
    detail: [
      {
        item: "Feul",
        cost: 300,
        status: "sales",
        id: 1,
      },
      {
        item: "Feul for Gen",
        cost: 3000,
        status: "expense",
        id: 2,
      },
      {
        item: "pay",
        cost: 2333,
        status: "expense",
        id: 3,
      },
      {
        item: "Salary",
        cost: 22333,
        status: "expense",
        id: 4,
      },
      {
        item: "million deal",
        cost: 100000,
        status: "sales",
        id: 5,
      },
      {
        item: "Pay",
        cost: 300,
        status: "expense",
        id: 6,
      },
      {
        item: "ffeer",
        cost: 3000,
        status: "sales",
        id: 7,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 75334,
    createdAt: "2022-12-04T07:33:37.047Z",
    updatedAt: "2022-12-04T07:33:37.047Z",
    __v: 0,
  },
  {
    _id: "638c439ed3518fe91988c098",
    date: "Sunday, December 4th 2022, 7:52:14",
    hubName: "Wilmer",
    totalExpense: 11600,
    totalSales: 25500,
    submittedBy: "Tunde",
    note: "This is the sales report for the day!",
    detail: [
      {
        item: "food",
        cost: 67,
      },
      {
        item: "food2",
        cost: 617,
      },
      {
        item: "food3",
        cost: 670,
      },
    ],
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1669583798/ovcauchgqiiffatq5727.jpg",
    profit: 13900,
    createdAt: "2022-12-04T06:52:14.593Z",
    updatedAt: "2022-12-04T06:52:14.593Z",
    __v: 0,
  },
  {
    detail: [],
    _id: "638a7c45b225eb17db0fa2b8",
    date: "Friday, December 2nd 2022, 11:29:25",
    hubName: "Wilmer",
    totalExpense: 11600,
    totalSales: 25500,
    submittedBy: "Tunde",
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1669583798/ovcauchgqiiffatq5727.jpg",
    profit: 13900,
    createdAt: "2022-12-02T22:29:25.390Z",
    updatedAt: "2022-12-02T22:29:25.390Z",
    __v: 0,
  },
  {
    detail: [],
    _id: "638a7c18b225eb17db0fa2b0",
    date: "Friday, December 2nd 2022, 11:28:40",
    hubName: "Wilmer",
    totalExpense: 1600,
    totalSales: 2800,
    submittedBy: "Tunde",
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1669583798/ovcauchgqiiffatq5727.jpg",
    profit: 1200,
    createdAt: "2022-12-02T22:28:40.044Z",
    updatedAt: "2022-12-02T22:28:40.044Z",
    __v: 0,
  },
];

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var groubedByTeam = groupBy(data, "date");
console.log(groubedByTeam);

let newData = {
  "Sunday, December 4th 2022, 6:40:07": [
    {
      _id: "638ce987fd56799d648aa082",
      date: "Sunday, December 4th 2022, 6:40:07",
      hubName: "Idowu",
      totalExpense: 3344,
      totalSales: 44000,
      submittedBy: "Blessed Uzorma",
      note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
      detail: [Array],
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
      profit: 40656,
      createdAt: "2022-12-04T18:40:07.176Z",
      updatedAt: "2022-12-04T18:40:07.176Z",
      __v: 0,
    },
  ],
  "Sunday, December 4th 2022, 7:33:37": [
    {
      _id: "638c4d51b7919c9e5400b881",
      date: "Sunday, December 4th 2022, 7:33:37",
      hubName: "Origie",
      totalExpense: 27966,
      totalSales: 103300,
      submittedBy: "Blessed Uzorma",
      note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
      detail: [Array],
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
      profit: 75334,
      createdAt: "2022-12-04T07:33:37.047Z",
      updatedAt: "2022-12-04T07:33:37.047Z",
      __v: 0,
    },
  ],
  "Sunday, December 4th 2022, 7:52:14": [
    {
      _id: "638c439ed3518fe91988c098",
      date: "Sunday, December 4th 2022, 7:52:14",
      hubName: "Wilmer",
      totalExpense: 11600,
      totalSales: 25500,
      submittedBy: "Tunde",
      note: "This is the sales report for the day!",
      detail: [Array],
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1669583798/ovcauchgqiiffatq5727.jpg",
      profit: 13900,
      createdAt: "2022-12-04T06:52:14.593Z",
      updatedAt: "2022-12-04T06:52:14.593Z",
      __v: 0,
    },
  ],
  "Friday, December 2nd 2022, 11:29:25": [
    {
      detail: [],
      _id: "638a7c45b225eb17db0fa2b8",
      date: "Friday, December 2nd 2022, 11:29:25",
      hubName: "Wilmer",
      totalExpense: 11600,
      totalSales: 25500,
      submittedBy: "Tunde",
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1669583798/ovcauchgqiiffatq5727.jpg",
      profit: 13900,
      createdAt: "2022-12-02T22:29:25.390Z",
      updatedAt: "2022-12-02T22:29:25.390Z",
      __v: 0,
    },
  ],
  "Friday, December 2nd 2022, 11:28:40": [
    {
      detail: [],
      _id: "638a7c18b225eb17db0fa2b0",
      date: "Friday, December 2nd 2022, 11:28:40",
      hubName: "Wilmer",
      totalExpense: 1600,
      totalSales: 2800,
      submittedBy: "Tunde",
      image:
        "https://res.cloudinary.com/ditsu2meo/image/upload/v1669583798/ovcauchgqiiffatq5727.jpg",
      profit: 1200,
      createdAt: "2022-12-02T22:28:40.044Z",
      updatedAt: "2022-12-02T22:28:40.044Z",
      __v: 0,
    },
  ],
};

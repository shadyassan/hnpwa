export const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Domain',
    dataIndex: 'domain',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    sorter: {
      compare: (a, b) => a.time - b.time,
      multiple: 1,
    },
  },
];

import moment from 'moment';

export const timeAgo = (time, config = { unix: true }) => {
  const { unix } = config;
  if (unix) {
    return moment.unix(time).fromNow();
  }
  return moment(time).fromNow();
};

export const calendar = (time, config = { noTime: true }) => {
  const { noTime } = config;
  if (noTime) {
    return moment(time).calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY',
    });
  }
  return moment(time).calendar();
};

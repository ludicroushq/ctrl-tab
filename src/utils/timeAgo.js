import moment from 'moment';

export default (time, config = { unix: true }) => {
  const { unix } = config;
  if (unix) {
    return moment.unix(time).fromNow();
  }
  return moment(time).fromNow();
};

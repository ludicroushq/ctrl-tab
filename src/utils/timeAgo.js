import moment from 'moment';

export default time => moment.unix(time).fromNow();

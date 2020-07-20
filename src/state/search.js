// @flow
import Moment from 'moment';
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment);

const search = (criteria: any, arrayToFilter: []) => {
  let results;

  Object.entries(criteria).forEach(([key, value]) => {
    results = arrayToFilter.filter((item: any) => {
      if (value === 'any') {
        return item;
      }
      if (item[key] !== null) {
        if (value.startDate !== undefined) {
          return Moment
            .range(value.startDate, value.endDate)
            .contains(moment(item[key]));
        }
        if (typeof item[key] === 'object') {
          return item[key].id === value;
        }
        return item[key].toLowerCase().includes(String(value).toLowerCase());
      }
      return item;
    });
  });
  return results;
};

export default search;

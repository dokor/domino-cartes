// @flow

import React from 'react';
import { DateRangePicker } from 'react-dates';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';

type Props = {
  input: Object,
}

type State = {
  focusedInput: string,
}

class DateRangePickerRender extends React.Component<void, Props, State> {
  state = { focusedInput: null };
  props: Props;

  render() {
    return (
      <div>
        <DateRangePicker
          startDate={typeof this.props.input.value.startDate === 'string' ? moment(this.props.input.value.startDate) : this.props.input.value.startDate}
          endDate={typeof this.props.input.value.endDate === 'string' ? moment(this.props.input.value.endDate) : this.props.input.value.endDate}
          onDatesChange={this.props.input.onChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
          startDatePlaceholderText={I18n.t('date.DATE_START')}
          endDatePlaceholderText={I18n.t('date.DATE_END')}
          displayFormat={I18n.t('date.DATE_FORMAT')}
          isOutsideRange={() => false}
          showClearDates
        />
      </div>
    );
  }
}

export default DateRangePickerRender;

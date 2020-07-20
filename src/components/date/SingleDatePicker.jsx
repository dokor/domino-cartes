// @flow

import React from 'react';
import DateTimePicker from 'react-datetime';
import moment from 'moment';

moment.locale('fr');

type Props = {
  input: Object,
  required: boolean,
  dateFormat: string,
  meta: Object,
  onlyDate: boolean,
  showError: boolean,
}

type State = {
  focusedInput: string,
}

// eslint-disable-next-line react/prefer-stateless-function
class SingleDatePickerRender extends React.Component<void, Props, State> {
  props: Props;

  render() {
    let className = 'form-control ';
    if (this.props.meta.visited && this.props.meta.valid) {
      className += 'valid';
    } else if (this.props.meta.visited && !this.props.meta.valid) {
      className += 'invalid';
    }
    return (
      <div>
        <DateTimePicker
          value={moment(this.props.input.value)} // momentPropTypes.momentObj or null
          onChange={this.props.input.onChange}
          onFocus={this.props.input.onFocus}
          onBlur={this.props.input.onBlur}
          dateFormat={this.props.dateFormat === 'timepicker' ? false : (this.props.dateFormat ? this.props.dateFormat : 'DD MMMM YYYY')}
          inputProps={{ required: this.props.required, className }}
          timeFormat={(this.props.dateFormat === 'timepicker') ? true : (!this.props.onlyDate)}
          defaultValue=""
        />
        {((this.props.meta.visited && this.props.meta.error) || (this.props.showError)) &&
        <span className="text-error">{this.props.meta.error}</span>}
      </div>
    );
  }
}

export default SingleDatePickerRender;

// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleConfirmationWithModal } from '../../state/notifications/notificationService';

type Props = {
  isConfirmationNotification: boolean,
  dispatch: Function,
};

function ConfirmationModal({ isConfirmationNotification, dispatch }: Props) {
  return (
    <div
      id="confirmationModal"
      className={isConfirmationNotification ? '' : 'hidden'}
      onClick={() => dispatch(toggleConfirmationWithModal(false))}
      role="Alertdialog"
    />

  );
}

export default withRouter(connect(state => ({
  isConfirmationNotification: state.customNotification.isConfirmationNotification,
}))(ConfirmationModal));

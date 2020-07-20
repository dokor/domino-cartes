// @flow

import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';

import coreozLogo from '../../../img/app-logo.png';
import { unwrap } from '../../../network/handleError';
import { store } from '../../../network/reduce';
import { logout } from '../../../services/sessionService';
import { currentSessionService } from '../../../services/sessionServiceInstance';

type Props = {
  dispatch: Function,
  toggleAsideNav: Function,
}

type State = {
  userName: string,
}

class Header extends React.Component<Props, State> {
  state = {
    userName: currentSessionService().currentUser().fullName,
  };

  render() {
    return (
      <header>
        <div id="aside-nav-toggle">
          <button
            type="button"
            className="btn"
            onClick={this.props.toggleAsideNav}
          >
            <i className="fa fa-bars" />
          </button>
        </div>
        <div id="site-logo">
          <img src={coreozLogo} alt="" />
          <span className="site-name">Coreoz</span>
        </div>
        <div id="header-nav">
          <ul className="nav nav-pills">
            <UncontrolledDropdown className="nav-item dropdown" inNavbar>
              <DropdownToggle
                nav
                caret
              >
                <span>{this.state.userName}</span>
                <b className="caret" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <DropdownItem
                  className="dropdown-item"
                  onClick={() => {
                    logout();
                  }}
                >
                  <Translate value="header.LOGOUT" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </div>
      </header>
    );
  }
}

export default withRouter(connect()(Header));

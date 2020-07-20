// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownMenu, DropdownToggle, Nav, Dropdown, NavItem } from 'reactstrap';
import { Translate } from 'react-redux-i18n';

import {
  HISTORY_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  LOG_API_PAGE_ROUTE,
  SCHEDULED_PAGE_ROUTE,
  LOGS_PAGE_ROUTE,
  ROLES_PAGE_ROUTE,
  USER_PAGE_ROUTE,
} from '../../const';
import hasPermission from '../../services/permissionService';

type Props = {
  isActive: Boolean,
};

type State = {
  dropdownUsersOpen: Boolean,
  dropdownSystemsOpen: Boolean
};

class AsideNav extends React.Component<Props, State> {
  state = {
    dropdownUsersOpen: false,
    dropdownSystemsOpen: false,
  };

  render() {
    return (
      <Nav
        className={this.props.isActive ? 'aside-nav-active' : 'aside-nav'}
        id="aside-nav"
        vertical
      >
        <NavItem>
          <NavLink to={HOME_PAGE_ROUTE} className="nav-link">
            <i className="fal fa-home icon" />
            <Translate value="aside.nav.HOME" />
          </NavLink>
        </NavItem>
        {(hasPermission('MANAGE_USERS') || hasPermission('MANAGE_ROLES')) && (
          <Dropdown
            isOpen={this.state.dropdownUsersOpen}
            inNavbar
            toggle={() =>
              this.setState({
                dropdownUsersOpen: !this.state.dropdownUsersOpen,
              })
            }
            className={this.state.dropdownUsersOpen ? 'open' : ''}
          >
            <DropdownToggle role="button" nav caret>
              <i className="fal fa-users icon" />
              <Translate value="aside.nav.USERS" />
            </DropdownToggle>
            <DropdownMenu>
              {hasPermission('MANAGE_USERS') && (
                <NavLink className="dropdown-item" to={USER_PAGE_ROUTE}>
                  <Translate value="aside.nav.USERS" />
                </NavLink>
              )}
              {hasPermission('MANAGE_ROLES') && (
                <NavLink className="dropdown-item" to={ROLES_PAGE_ROUTE}>
                  <Translate value="aside.nav.ROLES" />
                </NavLink>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
        {(hasPermission('MANAGE_SYSTEM') || hasPermission('MANAGE_API_LOGS')) && (
          <Dropdown
            isOpen={this.state.dropdownSystemsOpen}
            inNavbar
            toggle={() =>
              this.setState({
                dropdownSystemsOpen: !this.state.dropdownSystemsOpen,
              })
            }
            className={this.state.dropdownSystemsOpen ? 'open' : ''}
          >
            <DropdownToggle role="button" nav caret>
              <i className="fal fa-cogs icon" />
              <Translate value="aside.nav.SYSTEM" />
            </DropdownToggle>
            <DropdownMenu>
              <NavLink className="dropdown-item" to={SCHEDULED_PAGE_ROUTE}>
                <Translate value="aside.nav.SCHEDULED" />
              </NavLink>
              <NavLink className="dropdown-item" to={LOGS_PAGE_ROUTE}>
                <Translate value="aside.nav.LOGS" />
              </NavLink>
              <NavLink className="dropdown-item" to={LOG_API_PAGE_ROUTE}>
                <Translate value="aside.nav.LOG" />
              </NavLink>
            </DropdownMenu>
          </Dropdown>
        )}
        <NavItem>
          <NavLink to={HISTORY_PAGE_ROUTE} className="nav-link">
            <i className="fal fa-hourglass-start icon" />
            <Translate value="aside.nav.HISTORY" />
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default AsideNav;

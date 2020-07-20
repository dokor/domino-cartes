"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_NOTIFICATION = exports.POSITIONS = exports.BOTTOM_RIGHT_POSITION = exports.BOTTOM_LEFT_POSITION = exports.BOTTOM_CENTER = exports.BOTTOM = exports.TOP_RIGHT_POSITION = exports.TOP_LEFT_POSITION = exports.TOP_CENTER = exports.TOP = exports.STATUS = exports.ERROR_STATUS = exports.WARNING_STATUS = exports.SUCCESS_STATUS = exports.INFO_STATUS = exports.DEFAULT_STATUS = void 0;
var DEFAULT_STATUS = 'default';
exports.DEFAULT_STATUS = DEFAULT_STATUS;
var INFO_STATUS = 'info';
exports.INFO_STATUS = INFO_STATUS;
var SUCCESS_STATUS = 'success';
exports.SUCCESS_STATUS = SUCCESS_STATUS;
var WARNING_STATUS = 'warning';
exports.WARNING_STATUS = WARNING_STATUS;
var ERROR_STATUS = 'error';
exports.ERROR_STATUS = ERROR_STATUS;
var STATUS = {
  "default": DEFAULT_STATUS,
  info: INFO_STATUS,
  success: SUCCESS_STATUS,
  warning: WARNING_STATUS,
  error: ERROR_STATUS
};
exports.STATUS = STATUS;
var TOP = 't';
exports.TOP = TOP;
var TOP_CENTER = 'tc';
exports.TOP_CENTER = TOP_CENTER;
var TOP_LEFT_POSITION = 'tl';
exports.TOP_LEFT_POSITION = TOP_LEFT_POSITION;
var TOP_RIGHT_POSITION = 'tr';
exports.TOP_RIGHT_POSITION = TOP_RIGHT_POSITION;
var BOTTOM = 'b';
exports.BOTTOM = BOTTOM;
var BOTTOM_CENTER = 'bc';
exports.BOTTOM_CENTER = BOTTOM_CENTER;
var BOTTOM_LEFT_POSITION = 'bl';
exports.BOTTOM_LEFT_POSITION = BOTTOM_LEFT_POSITION;
var BOTTOM_RIGHT_POSITION = 'br';
exports.BOTTOM_RIGHT_POSITION = BOTTOM_RIGHT_POSITION;
var POSITIONS = {
  top: TOP,
  topCenter: TOP_CENTER,
  topLeft: TOP_LEFT_POSITION,
  topRight: TOP_RIGHT_POSITION,
  bottom: BOTTOM,
  bottomCenter: BOTTOM_CENTER,
  bottomLeft: BOTTOM_LEFT_POSITION,
  bottomRight: BOTTOM_RIGHT_POSITION
}; // default value for notifications

exports.POSITIONS = POSITIONS;
var DEFAULT_NOTIFICATION = {
  status: DEFAULT_STATUS,
  position: TOP_RIGHT_POSITION,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false,
  closeButton: false
};
exports.DEFAULT_NOTIFICATION = DEFAULT_NOTIFICATION;
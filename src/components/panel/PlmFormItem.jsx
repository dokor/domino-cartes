// @flow

import React from 'react';
import { Col, Row } from 'reactstrap';

type Props = {
  label: string,
  children?: any,
  className?: string,
}

function PlmFormItem({ label, children, className = '' }: Props) {
  return (
    <Row className="form-group">
      <Col sm="3" className="control-label">{label}</Col>
      <Col sm="9" className={className}>
        {children}
      </Col>
    </Row>
  );
}

export default PlmFormItem;

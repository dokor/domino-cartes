// @flow

import * as React from 'react';

type Props = {
  title: string,
  children: React.Node,
  className: string,
};

PlmPanel.defaultProps = {
  className: '',
};

function PlmPanel({ title, children, className }: Props) {
  return (
    <div className={`panel panel-default ${className}`}>
      {title !== undefined && (
        <div className="panel-header">
          <span className="panel-title">{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export default PlmPanel;

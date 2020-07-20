// @flow

import React from 'react';

type Props = {
  label: string,
  permissions: string[],
  displayDetails: Function,
  style: any,
}

function RoleRow({ label, permissions, style, displayDetails }: Props) {
  return (
    <tr style={style} onClick={displayDetails}>
      <td>{label}</td>
      <td>{permissions.sort().join(', ')}</td>
    </tr>
  );
}

export default RoleRow;

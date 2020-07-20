// @flow

import React from 'react';
import ReactTable from 'react-table';
import { I18n } from 'react-redux-i18n';

type Props = {
  data: Array,
  pageSize: number,
}

function PlmReactTable(props: Props) {
  const pageSizeValue = props.pageSize || 10;
  return (
    <ReactTable
      key={props.data.length}
      defaultPageSize={Math.min(props.data.length, pageSizeValue) || pageSizeValue}
      showPaginationBottom={props.data.length > pageSizeValue}
      sortable={true}
      resizable={false}
      noDataText={I18n.t('reactTable.EMPTY.RESULT')}
      previousText={I18n.t('reactTable.PREVIOUS')}
      nextText={I18n.t('reactTable.NEXT')}
      ofText={I18n.t('reactTable.OF')}
      rowsText={I18n.t('reactTable.ROWS')}
      {...props}
    />
  );
}

export default PlmReactTable;

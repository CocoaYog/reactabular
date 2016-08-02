import React from 'react';
import {
  mergePropPair, resolveHeaderRows
} from 'reactabular-utils';
import { tableTypes, tableDefaults, tableContextTypes } from './types';

const componentDefaults = tableDefaults.components;

export default class Provider extends React.Component {
  getChildContext() {
    const { columns, components } = this.props;
    const bodyColumns = [];

    // Merge column props with header/body specific ones so that can be avoided later
    const headerRows = resolveHeaderRows(columns).map(
      row => row.map(column => (
        column.header ? {
          props: mergePropPair(column.props, column.header.props),
          header: column.header,
          children: column.children || [], // TODO: test for this case
          column
        } : {}
      )
    ));

    columns.forEach(column => {
      const cell = column.cell || {};

      bodyColumns.push({
        props: mergePropPair(column.props, cell.props),
        cell,
        children: column.children || [], // TODO: test for this case
        column
      });
    });

    return {
      headerRows,
      bodyColumns,
      components: {
        table: components.table || componentDefaults.table,
        header: { ...componentDefaults.header, ...components.header },
        body: { ...componentDefaults.body, ...components.body }
      }
    };
  }
  render() {
    const {
      columns, // eslint-disable-line no-unused-vars
      components,
      children,
      ...props
    } = this.props;

    return React.createElement(
      components.table || tableDefaults.components.table,
      props,
      children
    );
  }
}
Provider.propTypes = {
  ...tableTypes,
  children: React.PropTypes.any
};
Provider.defaultProps = {
  ...tableDefaults
};
Provider.childContextTypes = tableContextTypes;

import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';


class Table extends React.PureComponent {

    render() {
        return (
            <BootstrapTable keyField="id" data={this.props.data} columns={this.props.columns} selectRow={this.props.selectRow}/>
        );
    }
}

Table.defaultProps = {
    data: [],
    columns: [],
    selectRow: {},
};

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    selectRow: PropTypes.object
};

export default Table;

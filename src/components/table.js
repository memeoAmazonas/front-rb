import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


class Table extends React.PureComponent {

    render() {
        const options = {
            sizePerPage: 5,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true,
        };
        const content = this.props.selectRow ?
            (
                <BootstrapTable classes="table table-striped"
                    keyField="id"
                    data={this.props.data}
                    columns={this.props.columns}
                    selectRow={this.props.selectRow}
                    pagination={paginationFactory(options)}
                />
            )
            :
            (
                <BootstrapTable
                    keyField="id"
                    data={this.props.data}
                    columns={this.props.columns}
                    pagination={paginationFactory(options)}
                />
            )
        return (
            content
        );
    }
}

Table.defaultProps = {
    data: [],
    columns: [],
    selectRow: null,
};

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    selectRow: PropTypes.object
};

export default Table;

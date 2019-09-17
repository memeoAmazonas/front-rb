import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {headerTable} from '../constants';
import {deleteUser, getUser } from '../actions/user';

import Table from '../components/table';
import AddUser from '../components/addUser';
import MainContainer from '../components/mainContainer';
import ModalContainer from '../components/modalContainer';

import '../css/views/home.css';

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            actually: {},
        };
        this.getData = this.getData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.props.getUser();
    }

    delete() {
        this.props.deleteUser(this.state.actually.id, () => {
            this.getData();
            this.setState({show: false})
        });
    }

    handleClose() {
        this.setState({show: false})

    }

    handleShow(row) {
        this.setState({show: true})
        this.setState({actually: row});
    }


    render() {
        var vm = this;
        const selectRow = this.props.isAdmin === 1 ? {
            mode: 'radio',
            clickToSelect: true,
            onSelect: function (row) {
                vm.handleShow(row);
            },
        } : null;
        console.log(selectRow);
        const content = (
            <div className="home">
                <div style={{display: this.props.isAdmin === 1 ? 'block' : 'none'}}>
                <AddUser/>
                <ModalContainer show={this.state.show} handleClose={this.handleClose}
                                username={this.state.actually.name} deleteUser={this.delete}/>
                </div>
                <Table columns={headerTable} data={this.props.data} selectRow={selectRow}/>
            </div>
        );
        return (
            <MainContainer children={content}/>
        );
    }
}

Home.defaultProps = {
    getUser: null,
    deleteUser: null,
    data: [],
    isAdmin: 0,
};

Home.propTypes = {
    getUser: PropTypes.func,
    deleteUser: PropTypes.func,
    data: PropTypes.array,
    isAdmin: PropTypes.number,
};

const mapStateToProps = state => (
    {
        data: state.user.data,
        isAdmin: state.user.isAdmin
    }
);
const mapDispatchToProps = { getUser, deleteUser};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

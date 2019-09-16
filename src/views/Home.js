import React from 'react';
import request from 'superagent';

import Table from '../components/Table';
import MainContainer from '../components/MainContainer';
import {headerTable, urlBackend } from '../constants';
import { Modal, Button} from "react-bootstrap";
import '../css/views/Home.css';

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false
        };
        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.selectRow = this.selectRow.bind(this);
    }
    componentDidMount() {
        this.getData();
    }

    getData() {
        request
            .get(urlBackend + 'all')
            .set('Access-Control-Allow-Origin', '*')
            .accept('application/json')
            .then(response => {
                 this.setData(response.body);
            })
            .catch(err => {
                alert('A ocurrido un error consultando los datos')
            });
    }
    setData(data) {
        let response=[];
        for (let i = 0;  i< data.length; i++){
            let roles = data[i].roles.map(item=> item.name);
            let val='|';
            roles.map(it=> val +=it +" | ");
            let user = {
                id: data[i].id,
                name: data[i].name,
                roles: val
            };
            response.push(user);
        }
        this.setState({data:response})
    }
    delete(id){
        const result = this.state.data.map(it=> it.id !== id);
        this.setState({data: result });
    }
    handleClose(){
        this.setState({ show: false})
    }
    handleShow(row){
        this.setState({ show: true})
        console.log(row);
    }
    selectRow(){
        //const selectRow;
        return {
            mode: 'radio',
            clickToSelect: true,
            onSelect: function (row) {
                this.handleShow(row);
                console.log(row, 'row');
            },
        };
    }
    render() {
        const content = (
            <div className="home">
                <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Table columns={headerTable} data={this.state.data} selectRow={this.selectRow}/>
            </div>
        );
        return (
            <MainContainer children={content}/>
        );
    }
}
export default Home;

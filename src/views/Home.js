import React from 'react';
import request from 'superagent';

import Table from '../components/Table';
import MainContainer from '../components/MainContainer';
import {headerTable, urlBackend} from '../constants';
import {Modal, Button, Form } from "react-bootstrap";
import '../css/views/Home.css';

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            actually: {}
        };
        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.delete = this.delete.bind(this);
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
        let response = [];
        for (let i = 0; i < data.length; i++) {
            let roles = data[i].roles.map(item => item.name);
            let val = '|';
            roles.map(it => val += it + " | ");
            let user = {
                id: data[i].id,
                name: data[i].name,
                roles: val
            };
            response.push(user);
        }
        this.setState({data: response})
    }

    delete() {
        var vm = this;
        request
            .delete(urlBackend + 'delete/' + this.state.actually.id)
            .set('Access-Control-Allow-Origin', '*')
            .accept('application/json')
            .then(response => {
               if (response.body){
                   this.setState({
                       show: false
                   });
                   vm.getData();
               }
            })
            .catch(err => {
                console.log('A ocurrido un error eliminando')
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
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: function (row) {
                vm.handleShow(row);
            },
        };
        const content = (
            <div className="home">
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Esta seguro que desea eliminar el usuario <strong>{this.state.actually.name}</strong> ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.delete}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Usuario" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Table columns={headerTable} data={this.state.data} selectRow={selectRow}/>
            </div>
        );
        return (
            <MainContainer children={content}/>
        );
    }
}

export default Home;

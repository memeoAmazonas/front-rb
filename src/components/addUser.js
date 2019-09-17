import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import '../css/components/addUser.css';
import { addUser, getUser } from "../actions/user";

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            admin: false,
            standard: false,
            password: '',
            isVisible: false,
        };
        this.isVisible = this.isVisible.bind(this);
        this.add = this.add.bind(this);
    }

    isVisible() {
        this.setState({
            name: '',
            admin: false,
            standard: false,
            password: '',
            isVisible: !this.state.isVisible
        })
    }

    add() {
        let roles = [];
        if (this.state.admin) {
            roles.push({
                name: "admin"
            });
        }
        if (this.state.standard) {
            roles.push({
                name: "standard"
            });
        }
        if (roles.length === 0) {
            roles.push({
                name: "standard"
            });
        }
        let result = {
            name: this.state.name,
            password: this.state.password,
            roles
        }
        this.props.addUser(result, ()=> {
            this.isVisible();
            this.props.getUser()
        });
    }

    render() {
        return (
            <div className="add-user">
                <button type="submit" onClick={this.isVisible} className="btn-add-user">Add user</button>
                <div style={{display: this.state.isVisible ? 'flex' : 'none'}} className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <input
                                    className="input-add-user"
                                    type="text"
                                    placeholder="Name"
                                    value={!this.state.isVisible ? "" : this.state.name }
                                    onChange={(e) => {
                                        this.setState({name: e.target.value})
                                    }}
                                />
                                <input
                                    className="input-add-user"
                                    type="password"
                                    placeholder="Password"
                                    value={!this.state.isVisible ? "" : this.state.password }
                                    onChange={(e) => {
                                        this.setState({password: e.target.value})
                                    }}/>
                            </div>
                            <div className="col-sm" style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                paddingLeft: "10%"
                            }}>
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={this.state.admin ? true : false}
                                        onChange={() => (this.setState({admin: !this.state.admin}))}
                                    />Admin
                                </label>
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={this.state.standard ? true : false}
                                        onChange={() => (this.setState({standard: !this.state.standard}))}
                                    />Standard
                                </label>
                            </div>
                            <div className="col-sm" style={{display: "flex", alignItems: "center"}}>
                                <button type="submit" onClick={this.add} className="btn-add-user" disabled={this.state.name === '' || this.state.password === ''}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
AddUser.defaultProps = {
    addUser: null,
    getUser: null,
};
AddUser.propTypes = {
    addUser: PropTypes.func,
    getUser: PropTypes.func,
}

const mapStateToProps = state => ({});
const mapDispatchToProps = { addUser, getUser };
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

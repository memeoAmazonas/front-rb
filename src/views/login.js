import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { login } from '../actions/user';
import MainContainer from '../components/mainContainer';
import '../css/views/login.css';

class Login  extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        this.props.login(this.state.username, this.state.password);

    }
    render() {
        const content = (
            <div className="login">
            <form className="form-login">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={(e)=>this.setState({username:e.target.value})} className="form-control" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e)=>this.setState({password: e.target.value})}  className="form-control" placeholder="Password" />
                </div>
                <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
        );
        return (
            <MainContainer children={content} />
        )
    }
}

Login.defaultProps = {
    login: null,
};
Login.propTypes = {
    login: PropTypes.func,
}

const mapStateToProps = state => ({});
const mapDispatchToProps = { login };
export default connect(mapStateToProps, mapDispatchToProps)(Login);

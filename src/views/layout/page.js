import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import Home from '../home';
import Login from '../login';

class Page extends React.PureComponent {
    render() {

        return (
            <div>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (this.props.isAdmin !== 0 ? <Redirect to ="/home" /> : <Login/>)}
                        />
                        <Route
                            exact
                            path="/home"
                            component={() => (this.props.isAdmin !== 0 ? <Home/> : <Redirect to="/" /> )}
                        />
                    </Switch>
                </Router>

            </div>
        );
    }

}

Page.defaultProps = {
    isAdmin: 0,
};
Page.propTypes = {
    isAdmin: PropTypes.number,
};

const mapStateToProps = state => ({
    isAdmin: state.user.isAdmin
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Page);


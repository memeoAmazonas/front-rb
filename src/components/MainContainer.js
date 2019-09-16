import React from 'react';
import PropTypes from 'prop-types';

import '../css/components/MainContainer.css';

class MainContainer extends React.PureComponent {
    render() {
        return (
            <div className="main-container">
                {this.props.children}
            </div>
        );
    }
}

MainContainer.defaultProps = {
    children: null,
};

MainContainer.propTypes = {
    children: PropTypes.element,
};

export default MainContainer;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// Import custom components
import LoginPage from '../../components/Auth/LoginPage';

class LoginPageContainer extends Component {

    render() {
        return (
            <LoginPage
                {...this.props}
            />
        );
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => {
    return {
        goToDashboard: () => dispatch(push({ pathname: '/dashboard' })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPageContainer);

import React, { Component } from 'react';

import AppHeader from '../../Layout/Header/';
import { getLocalStorage, setLocalStorage } from '../../../utils/storageUtil';

class StaticLayout extends Component {

    state = {
        countryCode: getLocalStorage('countryCode'),
    };

    changeCountryFrom = (value) => {
        this.setState({
            countryCode: value,
        });
        setLocalStorage('countryCode', value);
    };

    render() {
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                countryCode: this.state.countryCode,
            });
        });

        return (
            <section className="body-wrapper">
                <section className="body-main">
                    <AppHeader/>
                    {children}
                </section>
            </section>
        );
    }
}

export default StaticLayout;

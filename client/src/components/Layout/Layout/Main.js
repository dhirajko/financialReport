import React, { Component } from 'react';

import AppHeader from '../../Layout/Header';
import { getLocalStorage } from '../../../utils/storageUtil';

class MainLayout extends Component {

  state = {
    countryCode: getLocalStorage('countryCode'),
  };

  render() {

    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        countrycode: this.state.countryCode,
      });
    });

    return (
      <section className="body-wrapper">
        <section className="body-main">
          <AppHeader changeCountryFrom={this.changeCountryFrom}/>
          {children}
        </section>
      </section>

    );
  }
}


export default MainLayout;

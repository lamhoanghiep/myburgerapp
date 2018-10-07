import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurderBuilder';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;

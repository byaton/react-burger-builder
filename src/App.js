import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import { Switch, Route, Redirect } from 'react-router-dom';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
      <Switch>
        <Route path="/orders" exact component={Orders} />
        <Route path="/checkout/contact-data" exact component={ContactData} />
        <Route path="/checkout" exact component={CheckOut} />
        <Route path="/logout" exact component={logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>  
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

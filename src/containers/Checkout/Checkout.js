import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
// import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import * as actions from '../../store/actions/index';


class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 2,
    //         bacon: 1,
    //         cheese: 1,
    //         meat: 1
    //     },
    //     totalPrice: 0
    // }

    componentWillMount() {
        // this.props.onInitPurchase();
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        
        // for (let entry of query.entries()) {
        //     if (entry[0] === 'price') {
        //         price = entry[1]
        //     } else {
        //         ingredients[entry[0]] = +entry[1];
        //     }
        // }
        // this.setState({ingredients: ingredients, totalPrice: price});
    }


    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    CheckoutContinuedHandler = () => {
        this.props.history.push('checkout/contact-data');

        // const queryParams = [];
        // for(let ingrdnt in this.props.ingrd) {
        //     queryParams.push(encodeURIComponent(ingrdnt) +
        //                      '=' +
        //                      encodeURIComponent(this.state.ingredients[ingrdnt]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        
        // this.props.history.replace('checkout/contact-data');
        // this.props.history.push({
        //     path: 'checkout/contact-data',
        //     search: '?' + queryParams.join('&')
        // })
    }

    puchaseCompompletedHandler = () => {
        this.props.history.push('/');
    }

    render() {
        let summary = <Redirect to="/" />;
        if (!!this.props.ingrd) {
            summary = (
                <div>
                    <CheckoutSummary ingredients={this.props.ingrd}
                                    CheckoutCancelled={this.CheckoutCancelledHandler}
                                    CheckoutContinued={this.CheckoutContinuedHandler} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingrd: state.burgerBuilder.ingredients
    }
};


export default connect(mapStateToProps)(Checkout) ;
import React from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     bacon: 0.7,
//     cheese: 0.4,
//     meat: 1.3
// }

class BurgerBuilder extends React.Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        // loading: false,
        // error: false
    }

    // {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // }

    updatePurchaseState = () => {
        const ingredients = {...this.props.ingrd};
        const sum = Object.keys(ingredients)
                          .map(igKey => ingredients[igKey])
                          .reduce((sum, curVal) => {
                              return sum + curVal;
                            }, 0);
        // this.setState({purchasable: sum > 0})
        return sum > 0;
    }


    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state};
        updatedIngredients.ingredients[type] = updatedCount;

        // const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        // updatedIngredients.totalPrice = updatedTotalPrice;
        // console.log(updatedTotalPrice);
        this.setState(updatedIngredients);
        this.updatePurchaseState();
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredients = {...this.state};
            updatedIngredients.ingredients[type] = updatedCount;

            // const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            // updatedIngredients.totalPrice = updatedTotalPrice;
            // console.log(updatedTotalPrice);
            this.setState(updatedIngredients);
            this.updatePurchaseState();
        }
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) 
        //                      + '=' 
        //                      + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    componentDidMount() {  
        this.props.onInitIngredients();      
    }

    render() {
        const disabledInfo = {...this.props.ingrd};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>This can not be loaded</p> : <Spinner />;
        if (!!this.props.ingrd) {
            burger = <Aux>
                        <Burger ingredients={this.props.ingrd}/>
                        <BuildControls 
                            ingredientAdded = {this.props.onIngredientsAdded} 
                            ingredientRemoved = {this.props.onIngredientsRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState()}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated}/>
                     </Aux>;

            orderSummary = <OrderSummary ingredients={this.props.ingrd}
                                         purchaseCancelled={this.purchaseCancelHandler}
                                         purchaseContinued={this.purchaseContinueHandler}
                                         totalPrice={this.props.price}/>;            
        }        

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrd: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingNane) => dispatch(actionCreator.addIngredients(ingNane)),
        onIngredientsRemoved: (ingNane) => dispatch(actionCreator.removeIngredients(ingNane)),
        onInitIngredients: () => dispatch(actionCreator.initIngredients()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

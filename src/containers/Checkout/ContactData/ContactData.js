import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your EMail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {}
            }
        },
        formIsValid: false,
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0
    }   
    
    

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading: true});
        const formData = {};
        for (let feId in this.state.orderForm) {
            formData[feId] = this.state.orderForm[feId].value;
        }
        
        const order = {
            ingredients: this.props.ingrd,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };
        
        // axios.post('/orders.json', order)
        //      .then(res => {
        //         this.setState({loading: false});
        //         this.props.history.push('/')
        //      }).catch(err => this.setState({loading: false}));

        this.props.onOrderBurger(order, this.props.token);
        this.props.onInitPurchase();

    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputId]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,
                                                      updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;

        let formIsValid = true;
        for (inputId in updatedOrderForm) {
            if (!!updatedOrderForm[inputId].valid) {
                formIsValid = updatedOrderForm[inputId].valid && formIsValid;
            }
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(fe => (
                    <Input key={fe.id}
                           elementType = {fe.config.elementType}
                           elementConfig = {fe.config.elementConfig}
                           value = {fe.config.value}
                           invalid = {!fe.config.valid}
                           shouldValidate = {fe.config.validation}
                           touched = {fe.config.touched}
                           changed={(event) => this.inputChangedHandler(event, fe.id)}/>
                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        let redirect = null;
        if (this.props.purchased) {
            redirect = <Redirect to="/"/>
        }
        return (
            <Aux>
                {redirect}
                <div className={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    {form}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrd: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
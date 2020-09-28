import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder(this.props.idToken, this.props.userId);
    }

    render() {
        let orderComponent = <Spinner />
        if (!this.props.loading) {
            orderComponent = this.props.orders.map(order => 
                <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            )
        }
        return (
            <div>
                {orderComponent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        idToken: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (idToken, userId) => dispatch(actions.fetchOrders(idToken, userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

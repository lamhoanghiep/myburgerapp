import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {
    componentWillUpdate(){
        console.log("[OrderSummary]: componentWillUpdade");
    }
    render()
    {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>;
        });
        return (
            <React.Fragment>
                <h3>Your Order</h3>
                <p>A delecious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkhout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </React.Fragment>
        );
    }
};

export default orderSummary;
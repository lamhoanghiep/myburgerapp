import React, { Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    bacon: 3,
    meat: 4
};

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }
    addIngredientHandler = (type) =>{
        const clonedIngredients = {...this.state.ingredients};
        clonedIngredients[type] = this.state.ingredients[type] + 1;
        this.setState({ingredients: clonedIngredients, totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]});
        this.updatePurchaseState(clonedIngredients);
    }
    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] === 0) return;
        const clonedIngredients = {...this.state.ingredients};
        clonedIngredients[type] = this.state.ingredients[type] - 1;
        this.setState({ingredients: clonedIngredients, totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]});
        this.updatePurchaseState(clonedIngredients);
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        alert("You continue");
        //this.setState({purchasing: false});
    }
    
    render(){

        let disabledInfo = {...this.state.ingredients};
        for (var key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] === 0;
            }
        }
        return (
            <React.Fragment>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    <OrderSummary price={this.state.totalPrice} ingredients={this.state.ingredients}  purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice} 
                    disabled={disabledInfo} 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}
                />
            </React.Fragment>
        );
    }
}
export default BurgerBuilder;
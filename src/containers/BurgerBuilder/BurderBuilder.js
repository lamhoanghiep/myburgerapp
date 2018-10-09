import React, { Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    bacon: 3,
    meat: 4
};

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         ingredients: {
    //             salad: 0,
    //             bacon: 0,
    //             cheese: 0,
    //             meat: 0
    //         },
    //         totalPrice: 4,
    //         purchasable: false,
    //         purchasing: false,
    //         loading: false
    //     }
    // }
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        axios.get('/ingredients.json').then(resp => {
            this.setState({ingredients: resp.data});
        }).catch(err => {
            this.setState({error: true});
        });
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
        //alert("You continue");
        //this.setState({purchasing: false});
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "max",
                address: "test street",
                zipCode: "12345",
                email: "test@nbff.com"
            }
        };
        axios.post("/orders.json", order).then(resp => {
            this.setState({loading: false, purchasing: false});
        }).catch(err => {
            this.setState({loading: false, purchasing: false});
        });
    }
    
    render(){

        let disabledInfo = {...this.state.ingredients};
        for (var key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] === 0;
            }
        }
        let orderSummary = null;
        if(this.state.ingredients){
            orderSummary = <OrderSummary 
            price={this.state.totalPrice} 
            ingredients={this.state.ingredients}  
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseContinued={this.purchaseContinueHandler}/>;
        }
        
        
        if(this.state.loading === true){
            orderSummary = <Spinner/>;
        }
        let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner/>
        if(this.state.ingredients){
            burger = <React.Fragment>
            <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice} 
                    disabled={disabledInfo} 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}
                />
        </React.Fragment>;
        }
        
        return (
            <React.Fragment>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                {orderSummary}
                    </Modal>
                {burger}
            </React.Fragment>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);
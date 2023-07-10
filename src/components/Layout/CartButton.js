import React,{useContext} from 'react';
import classes from './CartButton.module.css';
import CartContext from '../../store/cart-context';

const CartButton=(props)=>{
    const cartCtx = useContext(CartContext);
    const {items} =cartCtx;

    const numberOfCartItems = items.reduce((curNum,item)=>{
        return curNum+item.amount;
    },0);


    return(
        <button className={classes.button} onClick={props.onclick}>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default CartButton;
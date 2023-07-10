import React,{Fragment, useState} from 'react';
import { Button } from 'react-bootstrap';
import classes from './Header.module.css';
//import Button from '../UI/Button';
import Card from './Card';
import CartButton from './CartButton';
 const Header=(props)=>{
    const [enteredMedicineName,setEnteredMedicinename] = useState('');
    const [enteredDescription,setEnteredDescription] = useState('');
    const [enteredPrice,setEnteredPrice] = useState('');

    const onAddItemHandler=(event)=>{
        event.preventDefault();
        props.onAddMedicine(enteredMedicineName,enteredDescription,enteredPrice);
        setEnteredMedicinename('');
        setEnteredDescription('');
        setEnteredPrice('');
    }
    const medicineNameChange=(event)=>{
        setEnteredMedicinename(event.target.value);
    }
    const descriptionChange=(event)=>{
        setEnteredDescription(event.target.value);
    }
    const priceChange=(event)=>{
        setEnteredPrice(event.target.value);
    }

    return(
        <Fragment>
            <header className={classes.header}>
                <h1>Medicine Shop</h1>
                <CartButton onclick={props.onShowCart}></CartButton>
            </header>
            <Card className={classes.input}>
                <form onSubmit={onAddItemHandler}>
                    <label htmlFor='itemName'>Medicine name:</label> 
                    <input id='ItemName' type="text" value={enteredMedicineName} onChange={medicineNameChange}/>
                    <label htmlFor='description'>Description:</label>
                    <input id='description' type="text" value={enteredDescription} onChange={descriptionChange}/>
                    <label htmlFor="price">Price:</label>
                    <input id="price" type="number" value={enteredPrice} onChange={priceChange}/>
                    <Button varient="primary" type="submit">Add to cart</Button>
                </form>
            </Card>

        </Fragment>
    )
 }
 export default Header;
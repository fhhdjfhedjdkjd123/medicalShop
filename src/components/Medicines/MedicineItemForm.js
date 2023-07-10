import classes from './MedicineItemForm.module.css'
import { useState,useRef } from 'react';
import Input from '../Layout/Input';

const MedicineItemForm=(props)=>{
    const [amountIsvalid,setAmountIsValid] = useState(true);
    const amountInputRef=useRef();

    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber=+enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNumber<1 || enteredAmountNumber > 3){
            setAmountIsValid(false);
            return
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
            ref={amountInputRef} 
            label="Amount"
            id='amount'
              type="number"
              min="1"
              max="5"
              defaultValue="1"
              />
            <button>Add to Cart</button>
            {!amountIsvalid && <p>Please enter a valid amount(0-3)</p>}

        </form>
    )
}
export default MedicineItemForm;
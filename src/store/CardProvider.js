import React,{ useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState={
    items:[],
    totalAmount: 0
}

const cartReducer=(state,action)=>{
    if(action.type === "ADD"){
        const updatedTotalAmount = state.totalAmount+action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
    
        let updatedItems;
        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }

        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if(action.type === "REMOVE"){
        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems=state.items.filter(item=> item.id !== action.id)
        }else{
            const updatedItem = {...existingItem,amount:existingItem.amount - 1};
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }

    }
    return defaultCartState
}

const CartProvider = props=>{
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);
    const addItemToCardHandler=(item)=>{
        dispatchCartAction({type:"ADD",item:item});
    };
    // useEffect(() => {
    //     const asyncFun = async () => {
    //       let response = await fetch(
    //         `https://crudcrud.com/api/c56df8698ae74cf3910b464908a976dd/cart`
    //       );
    //       let data = await response.json();
    //       //console.log(data);
    //       defaultCartState({type:"ADD",item:item});
    //       //setItems([...data]);
    //     };
    //     asyncFun();
    //   }, []);
    
    //   const addItemToCardHandler = async (item) => {
    //     const existingItem = cartState.items.findIndex(
    //       //This will return index of the existing item if found.
    //       (itm) => itm.name === item.name
    //     );
    
    //     if (existingItem === -1) {
    //       // If there is no existing item it will return -1
    //       let response = await fetch(
    //         `https://crudcrud.com/api/814e3c1ba53a4f3386cebc36511d4412/cart`,
    //         {
    //           method: "POST",
    //           body: JSON.stringify(item),
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       const data = await response.json();
    //       dispatchCartAction((prevValue) => {
    //         return [...prevValue, data];
    //       });
    //     } else {
    //       const allItems = [...cartState.items];
    //       allItems[existingItem].quantity = +allItems[existingItem].quantity + 1;
    //     //  console.log(allItems);
    //       const updatedItem = allItems[existingItem];
    //      // console.log(updatedItem);
    
    //       let response = await fetch(
    //         `https://crudcrud.com/api/814e3c1ba53a4f3386cebc36511d4412/${allItems[existingItem]._id}`,
    
    //         {
    //           method: "PUT",
    //           body: JSON.stringify({
    //             id: updatedItem.id,
    //             title: updatedItem.name,
    //             price: updatedItem.price,
    //             description: updatedItem.description,
    //             // imageUrl: updatedItem.imageUrl,
    //           }),
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       dispatchCartAction(() => {
    //         return [...allItems];
    //       });
    //     }
    //   };
    
    
    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({type:"REMOVE",id:id})
    }
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCardHandler,
        removeItem:removeItemFromCartHandler
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider;
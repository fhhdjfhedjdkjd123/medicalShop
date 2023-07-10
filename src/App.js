import './App.css';
import React,{useState} from 'react';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CardProvider';
import UserMedicineList from './components/Medicines/UserMedicineList';

const App=()=> {
  const [medicalLists, setMedicalLists] = useState([]);
  const [cartIsShown, setCartIsShown] = useState(false);

  const addMedicineHandler =(medicinename,medicinedescription, medicineprice)=>{
    setMedicalLists((prevMedicineList)=>{
      return [...prevMedicineList, 
        {name:medicinename, description:medicinedescription, id:Math.random().toString(), price:medicineprice}];
    });
  }

  const showCartHandler=()=>{
    setCartIsShown(true);
  }
  const onHideCartHandler=()=>{
    setCartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={onHideCartHandler}/>}
      <Header onAddMedicine={addMedicineHandler} onShowCart={showCartHandler}/>
      <main>
      <UserMedicineList medicines={medicalLists}/>
      </main>
    </CartProvider>
  );
}

export default App;

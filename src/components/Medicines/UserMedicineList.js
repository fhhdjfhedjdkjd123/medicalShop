import React from 'react';
import classes from './UserMedicine.module.css';
//import CandyItem from './MedicineItem';
import Card from '../Layout/Card';
import MedicineItem from './MedicineItem';

const UserMedicineList=(props)=>{
    return(
        <Card className={classes.users}>
            <ul>
            {props.medicines.map((medicine)=>(
                <MedicineItem
                id={medicine.id}
                name={medicine.name}
                description={medicine.description}
                price={medicine.price}
                key={medicine.id}
               />
            ))}
            </ul>
        </Card>
    )
}
export default UserMedicineList;
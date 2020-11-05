import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutProgress from '../components/CheckOutProgress';


const PaymentScreen = ({ history, location }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    if(!shippingAddress){
        history.push('/shipping');
    }


    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
             <CheckOutProgress step1 step2 step3 />
         <h2>Payment</h2>
         <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
            <Form.Check 
            type="radio" 
            label="PayPal or Credit Card" 
            id="PayPal" 
            name="paymentMethod" 
            value="PayPal" 
            checked 
            onChange={(e)=> setPaymentMethod(e.target.value)}
            ></Form.Check>
            </Col>
            </Form.Group>
         <Button type="submit">Continue</Button>
         </Form>
        </FormContainer>
    )
}

export default PaymentScreen

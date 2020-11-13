import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../actions/productActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import FormContainer from '../components/FormContainer';
import { useToasts } from 'react-toast-notifications';


const ProductEditScreen = ({ match, history }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState("");

    const userLogin = useSelector(state => state.userLogin);
    const{ userInfo } = userLogin;

    const singleProduct = useSelector(state => state.singleProduct);
    const { getProductLoading, getProductError, product } = singleProduct;


    const { addToast } = useToasts();


    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/');
        }
        if(!product.name || product._id !== match.params.id){
            dispatch(fetchProduct(match.params.id));
        }else{
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCountInStock(product.countInStock)
        }

    },[product, dispatch, match.params.id])


    // const submitHandler = (e)=>{
    //     e.preventDefault();
    //     if(user){
    //         dispatch(editUserDetails(match.params.id, { name, email, isAdmin }));
    //         dispatch(getUserEdit(match.params.id));
    //         setTimeout(()=>{
    //             if(!editError){
    //                 addToast(`${user.name} has been updated`, {
    //                     appearance: 'success'
    //                 });
    //                 }
    //         }, 1000)
    //     }
    // }
            
         // put back on line 69
    //  {editError && <Message variant="danger">{editError}</Message> }

       const submitHandler = ()=>{
           console.log('delete this')
       }

    return (
        <Fragment>
            <Link to='/admin/productlist' className="btn btn-light my-5">
                Go Back
            </Link>

            <FormContainer>
            <h1>Edit Product</h1>
            {getProductLoading ? <Loader /> : getProductError ? <Message variant="danger">{getProductError}</Message> : ( 
            <Form onSubmit={submitHandler}>

            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name"
                 value={name} 
                 onChange={(e)=> setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="price">
                <Form.Label>$ Price</Form.Label>
                <Form.Control type="text" placeholder="Enter Price"
                 value={price} 
                 onChange={(e)=> setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" as="textarea" rows={4} placeholder="Enter Description"
                 value={description} 
                 onChange={(e)=> setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="countInStock">
                <Form.Label>Count in stock</Form.Label>
                <Form.Control type="number" placeholder="Enter Count in stock"
                 value={countInStock} 
                 onChange={(e)=> setCountInStock(e.target.value)} />
            </Form.Group>


             <Button variant="primary" type="submit" id="user-update">
                Update
            </Button>
        </Form>
            )}
            
        </FormContainer>
        </Fragment>
    )
}

export default ProductEditScreen
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';

function Cart() {
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/cartapi').then(response => {
            setCart(response.data);
        }).catch(error => console.log(error));

        axios.get('/productsapi').then(response => {
            setProducts(response.data);
        }).catch(error => console.log(error));
    }, []);

    const handleImageClick = (event, product) => {
        event.preventDefault();
        setProduct(product);
        setShow(true);
    };

    const removeFromCart = (id) => {
        const formData = new FormData()
        formData.append("productid", id)
        axios.post("/removefromcart", formData,
            {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {
                if (response.data.status !== '') {
                    document.location.reload()
                }
            }).catch(error => {
                if (error.response.data.errors.quantity) {
                    setAddMessage(error.response.data.errors.quantity[0])
                    setMessageClass('text-danger')
                }
            })
    }

    const cartProductIds = cart.map(item => item.productid);
    const cartProducts = products.filter(product => cartProductIds.includes(product.id));

    return (
        <div className='productsdiv'>
            <h3>Products:</h3>
            <Row>
                {
                    (cartProducts.length) ? (
                        cartProducts.map(product => (
                            <Col md={3} key={product.id}>
                                <a href="#" onClick={(event) => handleImageClick(event, product)} className='link-primary'>
                                    <img src={`/images/${product.image}`} alt={product.name} />
                                    <b>{product.name}</b>
                                    <br />
                                    <b>Price: {product.price}$</b>
                                    <br />
                                    <b>Quantity: {cart.find(item => item.productid === product.id).quantity}</b>
                                </a>
                            </Col>
                        ))
                    ) : (
                        <h1 className="text-center">No products in cart.</h1>
                    )
                }
            </Row>

            <Modal show={show} onHide={() => setShow(false)}>
                {product && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{product.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <div>
                                    <img src={`/images/${product.image}`} alt={product.name} />
                                </div>
                                <div>
                                    <b>{product.title}</b>
                                </div>
                                <div>
                                    <b>Price: {product.price}</b>
                                </div>
                                <div>
                                    <b>Type: {product.type}</b>
                                </div>
                                <div>
                                    <b>For gender: {product.gender}</b>
                                </div>
                                <div>
                                    <b>For age: {product.age}</b>
                                </div>
                                <div>
                                    <b>Hobby: {product.hobby}</b>
                                </div>
                                <div>
                                    <b>Our ideas: {product.ideas}</b>
                                </div>
                            </div>
                            <div>
                                <Button variant='danger' onClick={() => removeFromCart(product.id)}>Remove from cart</Button>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </div>
    );
}

export default Cart;
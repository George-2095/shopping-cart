import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';

function Home() {
    const [authUser, setAuthUser] = useState([])
    const [productQuantity, setProductQuantity] = useState(0)
    const [messageClass, setMessageClass] = useState('')
    const [addMessage, setAddMessage] = useState('')
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        gender: '',
        age: '',
        hobby: '',
        price: '',
        type: '',
        ideas: '',
    });

    const [showMain, setShowMain] = useState(false)
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        axios.get('/authuserapi').then(response => {
            setAuthUser(response.data);
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

    const AddToCart = (id) => {
        if (authUser.length == 0) {
            setAddMessage(`Please <a href="/login" class="text-decoration-underline">log in</a> to add the product to the cart.`);
            setMessageClass('text-danger')
        } else {
            const formData = new FormData()
            formData.append("productid", id)
            formData.append("quantity", productQuantity)
            axios.post("/addtocart", formData,
                {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                }).then(response => {
                    if (response.data.status !== '') {
                        document.location = '/cart'
                    }
                }).catch(error => {
                    if (error.response.data.errors.quantity) {
                        setAddMessage(error.response.data.errors.quantity[0])
                        setMessageClass('text-danger')
                    }
                })
        }
    };

    const handleFiltersChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredProducts = products.filter(product => {
        if (filters.gender && product.gender !== filters.gender) {
            return false;
        }
        if (filters.age && product.age !== filters.age) {
            return false;
        }
        if (filters.hobby && product.hobby !== filters.hobby) {
            return false;
        }
        if (filters.price) {
            const [minPrice, maxPrice] = filters.price.split('-');
            if (minPrice === "150+") {
                if (product.price < 150) {
                    return false;
                }
            } else {
                if (product.price < minPrice || product.price > maxPrice) {
                    return false;
                }
            }
        }
        if (filters.type && product.type !== filters.type) {
            return false;
        }
        if (filters.ideas && product.ideas !== filters.ideas) {
            return false;
        }
        return true;
    });

    return (
        <>
            <button onClick={() => setShowMain(!showMain)} className='btn btn-purple'>Menu</button>
            {showMain && (
                <div className='productsdiv'>
                    <Button onClick={() => setShowFilters(!showFilters)} variant="primary">Filters</Button>
                    {showFilters && (
                        <>
                            <h3>Filter:</h3>
                            <Form.Group
                                className='mb-3'>
                                <Form.Label htmlFor='gender'>Gender</Form.Label>
                                <select name="gender" id="gender" className='form-control' value={filters.gender} onChange={handleFiltersChange}>
                                    <option value="">All</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='age'>Age</Form.Label>
                                <select name="age" className='form-control' value={filters.age} onChange={handleFiltersChange}>
                                    <option value="">All</option>
                                    {
                                        Array.from({ length: 86 }, (_, i) => i + 15).map((num) => (
                                            <option key={num} value={num}>{num}</option>
                                        ))
                                    }
                                </select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='hobby'>Hobby</Form.Label>
                                <select name="hobby" id="hobby" className='form-control' value={filters.hobby} onChange={handleFiltersChange}>
                                    <option value="">All</option>
                                    <option value="Listening to the music">Listening to the music</option>
                                    <option value="Painting">Painting</option>
                                    <option value="Dancing">Dancing</option>
                                    <option value="Ringing">Singing</option>
                                    <option value="Reading the book">Reading the book</option>
                                    <option value="Drinking">Drinking</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Religion">Religion</option>
                                    <option value="Technology">Technology</option>
                                </select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='price'>Price</Form.Label>
                                <select name="price" id="price" className='form-control' onChange={handleFiltersChange}>
                                    <option value="">All</option>
                                    <option value="1-50">1-50</option>
                                    <option value="50-100">50-100</option>
                                    <option value="100-150">100-150</option>
                                    <option value="150+">150+</option>
                                </select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='type'>Type</Form.Label>
                                <select name="type" id="type" className='form-control' onChange={handleFiltersChange}>
                                    <option value="">All</option>
                                    <option value="Clock">Clock</option>
                                    <option value="Jewellery">Jewellery</option>
                                    <option value="Basketofpens">Basket of pens</option>
                                    <option value="3D crystal">3D crystal</option>
                                </select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='ideas'>Our ideas</Form.Label>
                                <select name="ideas" id="ideas" className='form-control' onChange={handleFiltersChange}>
                                    <option value="">All</option>
                                    <option value="Clothes">Clothes</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Accesories">Accesories</option>
                                    <option value="Women box">Women box</option>
                                    <option value="Men box">Men box</option>
                                </select>
                            </Form.Group>
                            <hr />
                        </>
                    )}
                    <h3>Products:</h3>
                    <Row>
                        {
                            (filteredProducts.length) ? (
                                filteredProducts.map(product => (
                                    <Col md={3} key={product.id}>
                                        <a href="#" onClick={(event) => handleImageClick(event, product)} className='link-primary'>
                                            <img src={`/images/${product.image}`} alt={product.name} />
                                            <b>{product.name}</b>
                                            <br />
                                            <b>Price: {product.price}$</b>
                                        </a>
                                    </Col>
                                ))
                            ) : (
                                <h1 className="text-center">No products match the selected filter.</h1>
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
                                    <div className="mb-3">
                                        <b>Quantity:</b>
                                        <input type="number" name="quantity" id="quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
                                    </div>
                                    <div className='mb-3'>
                                        <b className={messageClass} dangerouslySetInnerHTML={{ __html: addMessage }}></b>
                                    </div>
                                    <div>
                                        <Button variant='success' onClick={() => AddToCart(product.id)}>Add to cart</Button>
                                    </div>
                                </Modal.Body>
                            </>
                        )}
                    </Modal>
                </div>
            )}
        </>
    );
}

export default Home;
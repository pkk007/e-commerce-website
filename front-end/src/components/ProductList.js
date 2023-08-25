import React, {useState, useEffect} from 'react';
import './ProductList.css';
import { Link } from 'react-router-dom';

const ProductList = () =>{
    const [products, setProducts] = useState([]); //intially empty array

    useEffect(()=>{
        getProducts();
    },[]); //empty array to call only once

    const getProducts = async ()=>{
        //here we call our api
        let result = await fetch('http://localhost:5000/products');
        //now convert it in JSON format
        result = await result.json();
        setProducts(result);
    }
    console.warn(products);

    const deleteProduct = async (id) =>{
        // console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method : 'DELETE'
        });
        result = await result.json();
        if(result){
            alert("RECORD DELETED");
            getProducts();
        }
    };

    const searchHandle = async (event)=>{
        // console.warn(event.target.value);
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }
        else{
            getProducts();
        }
    }

    return(
        <div className='product-list'>
            <h3>product list</h3>
            <input type="text" placeholder='Search Product' className='search-box'
                onChange={searchHandle}            
            />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                        <Link to={"/update/"+item._id}>Update</Link></li>
                    </ul>
                )
                : <h1>NO RESULT FOUND</h1>
            }
        </div>
    );
};

export default ProductList;
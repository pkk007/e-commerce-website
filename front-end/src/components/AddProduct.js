import React , {useState} from 'react';
import './AppProduct.css';

const AddProduct = () =>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');

    const [error,setError] = useState(false);

    const addProduct = async ()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false; //so that if all empty then yahi se return ho jaye niche wala naa chle
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product',{
            method : 'POST',
            body : JSON.stringify({name,price,category,company,userId}),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);
    }

    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='enter product name' className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} 
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='enter product price' className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} 
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder='enter product category' className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} 
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input type="text" placeholder='enter product company' className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}} 
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button className='appButton' onClick={()=>addProduct()} >Add Product</button>
        </div>
    );
};

export default AddProduct;
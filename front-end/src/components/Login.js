import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const handleLogin = async () =>{
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers :{
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }
        else{
            alert('invalid user');
        }
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <input className='inputBox' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='enter your email' />
            <input className='inputBox' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='enter your password' />
            <button onClick={handleLogin} className='loginButton' type='button'>Login</button>
        </div>
    )
}

export default Login;
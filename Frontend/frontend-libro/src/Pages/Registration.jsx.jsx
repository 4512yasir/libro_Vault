import React from 'react';
import RegisterForm from '../Components/forms/Register';
import "../css/register.css"



export default function RegisterPage(){
    return(
        <div className='register-page'>
          <div className="left">
            <img src="/logo.png" alt="librovaultlogo" />
          </div>
          <div className="right">
            <div className="top-text">
                <h1>WELCOME TO LIBRO VAULT</h1>
                <h4>PLEASE ENTER YOUR DETAILS TO JOIN </h4>
            </div>
            <div className="inputs">
                <RegisterForm/>
            </div>
            <div className="links">
             <a href="/login">Login</a>
             <a href="/guest">Guest</a>
              <a href="/">Home</a>
          </div>

          </div>
        </div>
    )
}
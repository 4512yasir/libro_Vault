import React from "react";
import "../css/login.css" 
import LoginForm from "../Components/forms/Loginform"


export default function LoginPage(){
    return(
        <div className="login-page">
            <div className="left">
                <img src="/logo.png" alt="logo" />
            </div>
            <div className="form-right">
                <div className="top-text">
                    <h1>WELCOME BACK TO LIBRO-VAULT</h1>
                    <h4>PLEASE LOGIN TO YOUR ACCOUNT</h4>
                </div>
                <div className="inputs">
                    <LoginForm/>
                </div>
                 <div className="links">
             <a href="/register">Register</a>
             <a href="/guest">Guest</a>
          </div>
            </div>
        
        
        </div>
    )
}
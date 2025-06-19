import React, { useState } from "react";
import '../../css/'


export default function Loginform(){
    const [username,setUsername] = useState("")
    const[password,setPassword] = useState("")

    
    return(
        <div className="loginform">
         <form>
          <div className="input-group">
            <label htmlFor="username">Enter your username</label>
            <input 
              id="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Enter Password</label>
            <input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="forgot">
            <a href="#">Forgot password?</a>
          </div>
          <div className="submit">
            <button type="submit">Login</button>
          </div>

         </form>

        
        
        
        </div>
    )

}
import React from "react";
import { Fragment,useState} from "react";
import {Link } from "react-router-dom";
import validator from 'validator'



const Register = () => {

   const [username,setData1] =useState(""); 
   const [password,setData2] =useState("");
   const [email,setData3] =useState(""); 
   const [number,setData4] =useState("");

   

   


    const onSubmitRegistrationForm = async e =>{

    try{
        console.log("in submit");

        e.preventDefault();

        const response =await fetch("http://localhost:5000/userdata");
		const jsonData = await response.json();

		console.log(jsonData);

      
             var flag=1;
        
	
                
             const body= {username,password,email,number};

              for (let i = 0; i < jsonData.length; i++) {

                    if (jsonData[i]["username"]== username){
                        flag=0;
                        break;
                    }
                     else{
                         // pass
                     }
                    
                }
               if (username==null || username=="" || password==null || password=="" || email==null || email=="" || number==null || number==""){  
                    alert("Fields can't be blank");  
                   }
               else if(password.length<8){  
                    alert("Password must be at least 6 characters long.");  
                    }
                else if(!validator.isEmail(email))
                  {
                         alert("InValid email address!");
                    }
               else if(flag==0){
                        alert("username already exists");
                        setData1("");

                }
               else{
                    
                const response1 = fetch("http://localhost:5000/userdata",{
                
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
                
                
                });

                setData1("");
                setData2("");
                setData3("");
                setData4("");

             
                
                alert("Successfully Registered");



            }
                    
        } catch(err){
       
            console.error(err.message);
        }
    

  }  


	return (
        <Fragment>
       <div className="background">
    <div className="layer">
		 <div className="register-form">
        <form onSubmit= {onSubmitRegistrationForm}>
            <div className="form-icon">
                <span><i className="fa fa-user"></i></span>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="username" placeholder="Username" value={username} onChange={e => setData1(e.target.value)}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control item" id="password" placeholder="Password" value={password} onChange={e => setData2(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="email" placeholder="Email" value={email} onChange={e => setData3(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="phone-number" placeholder="Phone Number" value={number} onChange={e => setData4(e.target.value)} />
            </div>
           
            <div className="form-group">
                <button id="register-button" className="btn btn-block create-account">Create Account</button>
            </div>

            <div className="form-group">
                <center><Link to="/">Back to Login</Link></center>
            </div>
        </form>

        </div>
        </div>
        </div>
        </Fragment>
      
	)

}

export default Register;




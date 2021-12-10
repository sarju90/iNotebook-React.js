import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    let history=useHistory();

    const [cradentials, setCradentials] = useState({email:"",password:""})

    const handlesubmit=async(e)=>{
       e.preventDefault();
       const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST', 
      
        headers: {
          'Content-Type': 'application/json',
         
        },
      
        body: JSON.stringify({email:cradentials.email,password:cradentials.password}) 
      });
      const json=await response.json()
           console.log(json);
           if(json.success){
               localStorage.setItem('token',json.authtoken);
               history.push("/")
               props.showAlert("Log in Successfully","success")

           }else{   
             props.showAlert("InValid Details","danger")

           }
    }

    const onchange=(e)=>{
        setCradentials({...cradentials,[e.target.name]:e.target.value});

   }

    return (
        <div>
          <form onSubmit={handlesubmit}>
  <div className="mb-3">
    <label for="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={cradentials.email} onChange={onchange} id="email" aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label for="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={cradentials.password}  onChange={onchange} name="password" id="password"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Login

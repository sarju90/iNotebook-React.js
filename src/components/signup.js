import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';


const Signup = (props) => {

    let history=useHistory();

    const [cradentials, setCradentials] = useState({name:"", email:"",password:"",cpassword:""})

    const handlesubmit=async(e)=>{

       

       e.preventDefault();
       const {name,email,password} =cradentials;
       const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST', 
      
        headers: {
          'Content-Type': 'application/json',
         
        },
      
        body: JSON.stringify({name,email,password}) 
      });
      const json=await response.json()
           console.log(json);
           if(json.success){
               localStorage.setItem('token',json.authtoken);
               history.push('/login')
               props.showAlert("Account Created Successfully","success")

           }else{
              props.showAlert("InValid Craditials","danger")
           }
    }

    const onchange=(e)=>{
        setCradentials({...cradentials,[e.target.name]:e.target.value});

   }


    return (
        <div>
            <form  onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onchange} required minLength={3} name="name" aria-describedby="emailHelp"/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={onchange} required id="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" required minLength={5} onChange={onchange} id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" required minLength={5} onChange={onchange} id="cpassword"/>
                </div>
                    

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup

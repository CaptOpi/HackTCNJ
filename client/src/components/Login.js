// import React, { useEffect, useState} from 'react'
// import axios from "axios"
// import { useNavigate, Link } from 'react-router-dom'

// function Login(){
//     const[email, setEmail] = useState("")
//     const[password, setPassword] = useState("")
//     async function submit(e){
//         e.preventDefault()
//         try{
//             await axios.post("http:")
//         }
//         catch{

//         }
//     }

//     return(
//         <div className="login">
//         <hi>Login</hi>
//             <form action ="POST">
//                 <input type="email" onchange = {(e)=>{setEmail(e.target.value)}} name="Email" id=""/>
//                 <input type="password" onchange = {(e)=>{setPassword(e.target.value)}} name="Password" id=""/>
//                 <input type="submit" onClick={submit}/>
//             </form>
//             <br />
//             <p> OR</p>
//             <br />
//             <Link to="/signup"></Link>
//         </div>
//     )
// }
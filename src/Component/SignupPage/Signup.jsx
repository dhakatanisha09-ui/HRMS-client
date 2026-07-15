import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_URL;

function Signup() {

    let navigate = useNavigate();

    let [SignupData, setSignupData] = useState({});
    let [error,setError] = useState({})

    let handleChange = (e) => {
        let { name, value } = e.target;
        setSignupData({ ...SignupData, [name]: value });
    };


    let handlevalidate=(SignupData)=>{
        let PageError={}

        if(!SignupData.name){
            PageError.name="Name is required"
        }
        else if(!SignupData.email){
            PageError.email="Email is required"
        }
        else if(!SignupData.password){
            PageError.password="Password is required"
        }
        else if(!SignupData.confirmPassword){
            PageError.confirmPassword="Confirm Password is Required"
        }else{
            axios
            .post(`${baseURL}/signup`, SignupData)
            .then((res)=>{
                let{success,message,token} =  res.data
                if(success){
                    alert(message);
                    localStorage.setItem("auth_token",token);

                    navigate("/");
                }
            }).catch((err)=>{
                let{success,message} = err.response.data;
                if(success == false){
                    alert(message);
                }
                console.log(err.response.data);
            })
        }

        setError(PageError);

    }
    let handleClick = () => {
        handlevalidate(SignupData);
        console.log(SignupData);
    };
   

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div class="..."></div>
                <div className="m-auto">
                    <div className="card w-100 h-150 border-2 border-blue-900 rounded-md shadow-2xl/50 bg-yellow-100">

                        <h1 className="card-header text-center font-bold text-xl text-amber">Signup😎</h1>
                        <div className="card-body w-80 h-100 m-auto mt-8 inline-block-500 h-8 rounded-md">
                            <div className="mb-4">
                                <div>
                                    <label className="">Name😒</label>
                                </div>
                                <input className="w-full border-2 border-pink-500" type="text" onChange={handleChange} name="name" />
                                <p className="text-red-600">{error.name}</p>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="">Email😒</label>
                                </div>
                                <input className="w-full border-2 border-pink-500" type="email" onChange={handleChange} name="email" />
                                <p className="text-red-600">{error.email}</p>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="">Password😒</label>
                                </div>
                                <input className="w-full border-2 border-pink-500" type="password" onChange={handleChange} name="password" />
                                <p className="text-red-600">{error.password}</p>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="">Confirm Password😒</label>
                                </div>
                                <input className="w-full border-2 border-pink-500" type="password" onChange={handleChange} name="confirmPassword"  />
                                <p className="text-red-600">{error.confirmPassword}</p>
                            </div>
                            
                            <button type="button" className="w-full bg-blue-500 text-white h-8 rounded-md" onClick={handleClick}> 
                                Signup🙌
                            
                            </button>
                            <div>
                                <label >
                                <Link  to="/" className="text-blue-500 hover:text-blue-700 underline">Already have an account?"</Link>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="..."></div>
            </div>
        </>
    );
}

export default Signup;
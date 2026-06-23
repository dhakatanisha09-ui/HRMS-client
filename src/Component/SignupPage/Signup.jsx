import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {

    let [SignupData, setSignupData] = useState({});
    let [error,setError] = useState({})

    let handleChange = (e) => {
        let { name, value } = e.target;
        setSignupData({ ...SignupData, [name]: value });
    };

    let PageError={}

    let handlevalidate=(SignupData)=>{

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
             console.log("Api data", SignupData);
        }

        setError(PageError);

    }
    let handleClick = () => {
        handlevalidate(SignupData);
    };

    
    console.log(error.name);
    console.log(error.password);
    console.log(error.email);
    console.log(error.confirmPassword);
   

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
                                <input className="w-full border-2 border-pink-500" type="text" onChange={handleChange} name="name" onClick={handleClick}/>
                                <p className="text-red-600">{error.name}</p>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="">Email😒</label>
                                </div>
                                <input className="w-full border-2 border-pink-500" type="email" onChange={handleChange} name="email" onClick={handleClick}/>
                                <p className="text-red-600">{error.email}</p>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="">Password😒</label>
                                </div>
                                <input className="w-full border-2 border-pink-500" type="password" onChange={handleChange} name="password" onClick={handleClick}/>
                                <p className="text-red-600">{error.password}</p>
                            </div>
                            <div className="mb-4">
                                <div>
                                    <label className="">Confirm Password😒</label>
                                </div>
                                <input className="w-full border-2 border-pink-500" type="password" onChange={handleChange} name="confirmPassword"onClick={handleClick} />
                                <p className="text-red-600">{error.confirmPassword}</p>
                            </div>
                            <button className="w-full bg-blue-500 text-white h-8 rounded-md" onClick={handleClick}>
                                Signup🙌
                            </button>
                            <div>
                                <label className="">Already have an account?</label>
                            </div>
                            <Link to="/" className="text-blue-500 hover:text-blue-700 underline">Login</Link>

                        </div>
                    </div>
                </div>

                <div class="..."></div>
            </div>
        </>
    );
}

export default Signup;
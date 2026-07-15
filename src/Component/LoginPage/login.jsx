
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let baseURL = import.meta.env.VITE_BASE_URL;

function Login() {
    let navigate = useNavigate();

    let [loginData, setLoginData] = useState({});
    let [error, setError] = useState({})


    let handleChange = (e) => {

        let { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    let formError = {}
    let handleValidate = (loginData) => {
        if (!loginData.email) {
            formError.email = "Email is required"
        }
        //can use elseif and if
        else if (!loginData.password) {
            formError.password = "Password is required"
        }else if (!loginData.confirmpassword) {
            formError.confirmpassword= " confirm Password is required"
        }else {
            axios
                .post(`${baseURL}/login`, loginData)
                .then((res) => {
                    let { success, message, token, role, email } = res.data
                    if (role==="employee") {
                        alert(message);
                        localStorage.setItem("auth_token", token);
                        navigate("/employee", {state: email})
                    } else{
                      alert(message);
                      localStorage.setItem("auth_token", token);
                      navigate("/Panel");
                    }
                }).catch((err) => {
                    let { success, message } = err.response.data;
                    if (success === false) {
                         alert(message);
                    }
                    console.log(err.response.data);
                    })

        }
                   setError(formError);
    }

let handleClick = () => {
    handleValidate(loginData);
};

console.log(error.email);
console.log(error.password);




return (
    <>
        <div className="grid grid-cols-3 gap-4">
            <div className="..."></div>
            <div className="m-auto">
                <div className="card w-100 h-150 border-2 border-blue-900 rounded-md shadow-2xl/50 bg-amber-200">

                    <h1 className="card-header text-center font-bold text-xl text-amber">Login😎</h1>
                    <div className="card-body w-80 h-100 m-auto mt-8 inline-block-500 h-8 rounded-md">
                        <div className="mb-4">
                            <div>
                                <label className="">Email😒</label>
                            </div>
                            <input className="w-full border-2 border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-700" type="email" onChange={handleChange} name="email" onClick={handleClick} />
                            <p>{error.email}</p>
                        </div>
                        <div className="mb-4">
                            <div>
                                <label className="">Password😒</label>
                            </div>
                            <input className="w-full border-2 border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-700" type="password" onChange={handleChange} name="password" onClick={handleClick} />
                            <p>{error.password}</p>
                        </div>
                        <div className="mb-4">
                            <div>
                                <label className="">Confirm Password😒</label>
                            </div>
                            <input className="w-full border-2 border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-700" type="confirmpassword" onChange={handleChange} name="confirmpassword" onClick={handleClick} />
                            <p>{error.confirmpassword}</p>
                        </div>
                        <button className="w-full bg-blue-500 text-white h-8 rounded-md" onClick={handleClick}>
                            Login🙌
                        </button>
                        <Link to="/Signup">Don't have an account?</Link>

                    </div>
                </div>
            </div>

            <div className="..."></div>
        </div>
    </>
);
}
export default Login;

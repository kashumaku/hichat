import { useContext, useState } from "react";
import { loginContext } from "../context";
import logo from '../images/logo.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useGetUsers } from "../data";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [warnning, setWarnning] = useState("")
    const navigate = useNavigate()
    const users = useGetUsers()
    const notify = () => {
        setWarnning("WRONG USERNAME OR PASSWORD")
        setTimeout(() => {
            setWarnning("")
        }, 3000)

    }
    const handelLogin = (e) => {
        e.preventDefault()
        const userLoged = users.find((user) => (user.email.toLowerCase() === email.toLowerCase()) && (user.password === password))
        if (!userLoged) {
            notify()
        }
        else {

            localStorage.setItem("id", userLoged.id)
            navigate("/chat-app-with-firebase")
        }
    }

    return (
        <div className="h-screen bg-blue-700 flex justify-center items-center">
            <div className="h-[500px] rounded bg-white flex flex-col gap-6 justify-center items-center w-[80%] md:w-[400px]">
                <img src={logo} alt="" className=" w-[50px] h-[50px] rounded-full" />
                <h1 className="text-blue-700 font-bold text-2xl">Login</h1>
                <input type="text" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <button className="bg-blue-700 text-white px-10 py-2" onClick={handelLogin}>Login</button>
                {warnning && <h1 className="text-yellow-500">{warnning}</h1>}
                <p className="">Have no account?  <Link className="text-blue-700 font-bold underline" to='/chat-app-with-firebase/create'>Create account</Link></p>
            </div>
        </div>
    );
}

export default Login;
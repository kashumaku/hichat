import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useGetUsers } from "../data";

const CreateAccount = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [alert, setAlert] = useState("")
    const navigate = useNavigate()
    const notify = (message) => {
        setAlert(message)
        setTimeout(() => {
            setAlert("")
        }, 3000)

    }
    const users = useGetUsers()
    const handelCreate = async () => {
        if (password !== confirm) {
            notify("password doesn't match try again")
            return
        }
        let isEmpty = false;
        const newUser = { first_name: firstName, last_name: lastName, email: email, password: password }
        Object.values(newUser).map((n) => {
            if (n === '') {
                notify("All input fields are required")
                isEmpty = true
            }

        })
        if (isEmpty) {
            console.log("emity")
            return
        } // terminates the next execution if the inputs are empity
        let isUserExist = false
        users.forEach(u => {
            if (u.email === email.toLocaleLowerCase()) isUserExist = true
        })
        if (isUserExist) {
            notify("User already exists")
            return
        }

        const userCollection = collection(db, "users")
        await addDoc(userCollection, newUser)
        notify("User registered")
        navigate('/chat-app-with-firebase/login')


    }
    return (
        <div className="h-screen bg-blue-700 flex justify-center items-center">
            <div className="h-[500px] rounded bg-white flex flex-col gap-8 justify-center items-center w-[80%] md:w-[400px]">
                <h1 className="text-blue-700 font-bold text-2xl">Create Account</h1>
                <p className="text-yellow-500">{alert}</p>
                <input placeholder="First Name..." onChange={(e) => setFirstName(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input placeholder="Last Name..." onChange={(e) => setLastName(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <button onClick={handelCreate} className="bg-blue-700 text-white px-10 py-2" >Create account</button>
                <p className="">Have an account?
                    <Link className="text-blue-700 font-bold underline " to='/chat-app-with-firebase/login'>Login</Link></p>
            </div>
        </div>
    );
}

export default CreateAccount;
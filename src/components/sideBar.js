import { FaRegCircleUser } from "react-icons/fa6";
import defaultProfile from "../images/defaultprofile.jpg"
import { useContext, useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { chatContext, toggleContext } from "../context";
const SideBar = ({ userId, users }) => {
    const [session, setSession] = useState(userId)
    const navigate = useNavigate()
    const { setUserId } = useContext(chatContext)
    const { setToggleMenu, setToggleMessage } = useContext(toggleContext)
    const userAcc = users.filter((u) => u.id === userId)
    const myFriends = users.filter(mf => mf.id !== userId)
    useEffect(() => {
        if (!session)
            navigate('/chat-app-with-firebase/login')
    }, [session])
    const handelLogout = () => {
        localStorage.removeItem('id')
        setSession("")
    }

    return (
        <div className=" bg-gray-700 w-[100vw] h-screen text-gray-100 overflow-y-scroll">
            {(session && users) && (<>

                <div className="fixed w-full bg-gray-700 pt-3 ">
                    <div onClick={() => setToggleMessage(false)} className="absolute right-2 top-4  "><CiCircleRemove size={40} fill='white' /></div>

                    {/* side bar header */}
                    <div className="uppercase text-lg items-center flex  py-3 shadow-md shadow-gray-500  gap-20 pl-4">
                        <div className="flex break-all gap-2 items-center">
                            <FaRegCircleUser size={30} />
                            <span>{userAcc[0].first_name}</span>
                        </div>
                        <button onClick={handelLogout} className=" cursor-pointer bg-blue-500 text-white px-2 py-1 rounded-md text-sm">Log out</button>
                    </div>
                    {/* <hr className="mt-3" /> */}
                </div>
                <div className=" pl-4 py-20">
                    <h1 className="font-bold tracking-wider text-2xl font-mono my-1">Friends</h1>
                    {myFriends.map((user) => {
                        return <ul key={user.id}>
                            <li onClick={() => {
                                setUserId({ chatUserId: user.id, chatUserName: user.first_name })
                                setToggleMessage(false)
                            }} className=" flex items-center gap-2 mt-4 cursor-pointer">
                                <img src={defaultProfile} alt="" className="w-[50px] h-[50px] rounded-full" />
                                <Link>{user.first_name}</Link>
                            </li>
                        </ul>
                    })}
                </div></>)}

        </div>
    );
}

export default SideBar;
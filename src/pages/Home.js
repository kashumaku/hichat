import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useGetMessages, useGetUsers } from "../data";
import ChatBody from "../components/ChatBody";
import { toggleContext } from "../context";
import { useContext } from "react";
import Menu from "../components/menu";
import Feeds from "../components/feeds";


const Home = () => {
    const navigator = useNavigate()
    const { toggleMenu, toggleFeeds, toggleMessage } = useContext(toggleContext)
    //fetching data from the firestore database
    const users = useGetUsers()
    const messages = useGetMessages()

    const userId = localStorage.getItem("id")
    if (!userId && (users <= 0))
        navigator("/login")

    return (
        <div className="flex overflow-hidden relative ">
            {users.length > 0 && <>
                <div className={`absolute  bg-gray-600 duration-[0.1s] ${toggleMessage ? 'left-0 top-[70px] z-10' : 'left-[-44%] top-[70px] -z-10 '}`}  >
                    <SideBar users={users} userId={userId} />
                </div>
                <div className={`absolute  bg-gray-600  ${toggleMenu ? 'block top-[70px] z-10' : 'hidden top-[70px] -z-10 '}`}  >
                    <Menu />
                </div>
                <div className={`absolute bg-gray-600 ${toggleFeeds ? 'block top-[70px] z-10' : 'hidden top-[70px] -z-10 '}`}  >

                    <Feeds />
                </div>
                <ChatBody messages={messages} />
            </>}
        </div>
    );
}

export default Home;
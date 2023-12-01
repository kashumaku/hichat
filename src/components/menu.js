import { MdRssFeed } from "react-icons/md";
import { FaBookBookmark, FaBagShopping } from "react-icons/fa6";
import { SiCoursera } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
const Menu = () => {
    return (
        <div className="w-[100vw] h-screen text-white ">
            <ul className="flex w-full flex-col justify-evenly">
                <li className="flex gap-2 text-2xl"><MdRssFeed />Feeds</li>
                <li className="flex gap-2 text-2xl"><FaBookBookmark />Books</li>
                <li className="flex gap-2 text-2xl"><SiCoursera />Courses</li>
                <li className="flex gap-2 text-2xl"><FaBagShopping />Market Place</li>
                <li className="flex gap-2 text-2xl"><IoMdSettings />Setting</li>
            </ul>
        </div>
    );
}

export default Menu;
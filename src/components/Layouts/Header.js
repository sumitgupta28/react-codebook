import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { Search } from '../Sections/Search';
import { DropdownLoggedOut, DropdownLoggedIn } from '../index'
import { useCart } from '../../context/'
import { getLoggedInUserDetails, logoutUser } from '../../services';

export const Header = () => {
    const [searchSection, setSearchSection] = useState(false);
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [dropdown, setDropdown] = useState(false);
    const token = JSON.parse(sessionStorage.getItem('token'));
    const { cartList } = useCart();
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getData() {
            const user = await getLoggedInUserDetails();
            (token && user?.email) ? setUser(user) : logoutUser();
        }
        token && getData();
    }, [token])


    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <header className="sticky top-0 z-50 shadow-md">
            <nav className="bg-white dark:bg-gray-900">
                <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
                    <Link to="/" className="flex items-center justify-between flex-1 mr-5">
                        <div className="flex items-center">
                            <img src={Logo} className="mr-3 h-10" alt="CodeBook Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
                        </div>

                    </Link>
                    <div className="flex items-center justify-center flex-1">
                        {user?.email ? <span className="text-s font-extrabold whitespace-nowrap dark:text-white"> Welcome {user?.email}  </span> : ""}
                    </div>
                    <div className="flex items-right relative">

                        <span onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>
                        <span onClick={() => setSearchSection(!searchSection)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search"></span>
                        <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
                            <span className="text-2xl bi bi-cart-fill relative">
                                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length}</span>
                            </span>
                        </Link>
                        <span onClick={() => { setDropdown(!dropdown) }} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
                        {dropdown && (token ? <DropdownLoggedIn setDropdown={setDropdown} /> : <DropdownLoggedOut setDropdown={setDropdown} />)}

                    </div>
                </div>
            </nav>
            {searchSection && <Search setSearchSection={setSearchSection} />}

        </header>
    )
}
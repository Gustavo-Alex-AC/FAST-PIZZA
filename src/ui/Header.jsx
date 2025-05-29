import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import Signin from "../ui/Signin";




function Header() {

  
  return (
    <header className=" bg-yellow-400 uppercase px-4 py-4 border-b border-stone-200 sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest">
        Fast Pizza 
      </Link>
      
      <SearchOrder />
      <Signin/>

      <Username />
    </header>
  );
}

export default Header;

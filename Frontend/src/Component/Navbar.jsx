import { NavLink } from "react-router-dom";

function Navbar({input,setInput}){

    return(
        <nav className="navbar">

           <div className="navbar-logo">
                JobHub AI
           </div>

           <div className="navbar-search">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Enter Job Name"
                    value={input}
                    onChange={(e)=>{
                        setInput(e.target.value)
                    }}
                />
           </div>

           <div className="navbar-profile">
                <NavLink className="profile-link" to="/profile/101">
                    👤
                </NavLink>
           </div>

        </nav>
    )
}

export default Navbar;
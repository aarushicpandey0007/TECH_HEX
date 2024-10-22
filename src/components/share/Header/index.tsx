import React from "react"
import HexagonIcon from "../../custom/Hexagon"
const Header:React.FC = ()=>{
    return (
        <>
        <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <HexagonIcon />
          <span className="ml-2 text-2xl font-bold">TechHex</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            How to Play
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Leaderboard
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Login
          </a>
        </nav>
      </header>
        </>
    )

}
export default Header
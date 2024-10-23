import React from 'react'
import hex1 from '../../assets/grid.jpg';

import HexagonIcon from "../../components/custom/Hexagon"
import SearchingSpinner from '../../components/custom/SearchingSpinner'
const SearchingView = () => {
  return (
    <div className='bg-black min-h-screen'  style={{
      backgroundImage: `url(${hex1})`,
      // Set the desired size for each repeated image
      backgroundSize: '80%',
      backgroundPosition: "center",
      
    }}>
         <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center text-white" href="#">
          <HexagonIcon />
          <span className="ml-2 text-2xl font-bold text-white">TechHex</span>
        </a>
        </header>
    <section className="w-full py-5 md:py-24 lg:py-10 xl:py-20 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl/none text-white">
                Searching for the opponent ? Be ready-mentally . . .
                </h1>
                
              </div>
            </div>
          </div>
        </section>
        <div className="flex items-center justify-center lg:space-x-40 md:space-x-32 space-x-10   ">
    
        
<SearchingSpinner/>

</div>

    </div>
  )
}

export default SearchingView
import { ArrowRight } from 'lucide-react';
import React from 'react'
import Header from '../../components/share/Header';
import Hexagon from '../view1/Hexagon';
import { NavLink } from 'react-router-dom';


const HomeView = () => {
  return (
    <div className='min-h-screen bg-cyan-400  '>
        <Header/>
    <section className="w-full py-5 md:py-24 lg:py-10 xl:py-20  ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Challenge Your Tech Knowledge with TechHex
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Engage in thrilling one-on-one battles on a hexagonal grid. Test your knowledge of trending tech topics and climb the leaderboard!
                </p>
              </div>
              <div className="space-x-4">
                <NavLink to="/selectpage"><button>Start Playing <ArrowRight className="ml-2 h-4 w-4" /></button></NavLink>
              </div>
            </div>
          </div>
        </section>
        </div>
       
  )
}

export default HomeView
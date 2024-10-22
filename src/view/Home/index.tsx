import { ArrowRight } from 'lucide-react';
import React from 'react';


const Home: React.FC = () => {
  return (
    <div>
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
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
                <button>Start Playing <ArrowRight className="ml-2 h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
};
export default Home;
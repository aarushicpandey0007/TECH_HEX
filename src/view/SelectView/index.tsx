import { ArrowRight } from 'lucide-react';
import HexagonIcon from "../../components/custom/Hexagon"
import SelectBox from '../../components/custom/SelectBox';

const SelectView = () => {
  return (
    <div className='bg-cyan-400 min-h-screen'>
         <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <HexagonIcon />
          <span className="ml-2 text-2xl font-bold">TechHex</span>
        </a>
        </header>
    <section className="w-full py-5 md:py-24 lg:py-10 xl:py-20 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                In every game, the right choice at the start can turn the tide in our favor.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Hello team, remember: 'Every champion was once a contender that refused to give up. Let's push ourselves to greatness!
                </p>
              </div>
              <div className="space-x-4">
                <button>Start Playing <ArrowRight className="ml-2 h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </section>
        <div className="flex items-center justify-center lg:space-x-40 md:space-x-32 space-x-10 pb-52   ">
    
<SelectBox firstText="Single" lastText="Player" command="Lets Play"/>
<SelectBox firstText="Multi" lastText="Player" command="Lets Play"/>
</div>

    </div>
  )
}

export default SelectView
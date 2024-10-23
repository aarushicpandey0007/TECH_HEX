import HexagonIcon from "../../components/custom/Hexagon"
import SelectBox from '../../components/custom/SelectBox';
import hex1 from '../../assets/grid.jpg';


const ModeSelectView = () => {
  return (
    <div className='bg-black min-h-screen'  style={{
      backgroundImage: `url(${hex1})`,
     // Set the desired size for each repeated image
     backgroundSize: '80%',
      backgroundPosition: "center",
      
    }}>
      
         <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center justify-center text-white" >
          <HexagonIcon />
          <span className="ml-2 text-2xl font-bold text-white">TechHex</span>
        </div>
        </header>
    <section className="w-full py-5 md:py-24 lg:py-10 xl:py-20 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl text-white font-bold tracking-tighter sm:text-3xl md:text-3xl lg:text-5xl/none">
                In every game, the right choice at the start can turn the tide in our favor.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-50 md:text-xl dark:text-gray-50">
                Hello team, remember: 'Every champion was once a contender that refused to give up. Let's push ourselves to greatness!
                </p>
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

export default ModeSelectView
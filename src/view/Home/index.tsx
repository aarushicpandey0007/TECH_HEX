import { useGSAP } from "@gsap/react";
import { IconArrowRight } from "@tabler/icons-react";
import gsap from "gsap";
import React from "react";

const Home: React.FC = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#hbtn",
      { y: 0 },
      {
        y: -10,
        duration: 0.55,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      }
    );
  }, []);
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
        <div className="container px-4 md:px-6 ">
          <div className=" space-y-4 text-center flex flex-col justify-center items-center gap-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Challenge Your Tech Knowledge with TechHex
              </h1>
              <p className="mx-auto max-w-[700px] pt-5 text-gray-500 md:text-xl dark:text-gray-400">
                Engage in thrilling one-on-one battles on a hexagonal grid. Test
                your knowledge of trending tech topics and climb the
                leaderboard!
              </p>
            </div>

            <button
              id="hbtn"
              className="bg-black text-base    text-white flex justify-center items-center px-12 py-3 rounded-xl"
            >
              Start Playing <IconArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;

import React from "react";
import { Hexagon } from "lucide-react"; // Import the Hexagon icon

const InfoPanel: React.FC = () => {
  return (
    <>
      <div
        className="max-w-sm min-w-60 mx-auto bg-transparent overflow-hidden transform skew-x-6" // Skew the entire panel
      >
        {/* Team Name Section */}
        <div className="px-5 py-3 flex justify-between items-center transform -skew-x-6">
          <h3 className="text-zinc-900 dark:text-white text-lg">Team Name</h3>
        </div>

        {/* Additional Info with Hexagon Icon */}
        <div className="px-5 pb-5 transform -skew-x-6">
          <div className="flex items-center mb-2">
            {/* Red Hexagon Icon */}
            <Hexagon className="text-red-500 fill-red-500 w-4 h-4 mr-2" /> {/* Small red hexagon */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Your Path</p>
          </div>
          <div className="flex items-center mb-2">
            {/* Red Hexagon Icon */}
            <Hexagon className="text-gray-700 fill-gray-700 w-4 h-4 mr-2" /> {/* Small red hexagon */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Blocked</p>
          </div>

          {/* Progress Info */}
          <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
            Path Completed
          </p>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2.5 skew-x-6">
            <div className="bg-blue-600 w-7 h-2.5 skew-x-6"></div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              10% Complete
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPanel;

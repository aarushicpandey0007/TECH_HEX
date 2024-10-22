"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Hexagon_1 = require("../midd/Hexagon");
const Prince = () => {
    return (<>
      <div className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          {/* <HexagonIco className="h-6 w-6" /> */}
          <Hexagon_1.default />
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
      </div>
    </>);
};
exports.default = Prince;
//# sourceMappingURL=Prince.js.map
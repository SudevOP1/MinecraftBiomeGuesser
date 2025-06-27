import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  let navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([
    {
      username: "BiomeKing",
      total_score: 95,
      total_tests: 4,
      accuracy: 3.2,
    },
    {
      username: "CaveDweller",
      total_score: 80,
      total_tests: 3,
      accuracy: 2.8,
    },
    {
      username: "ForestFinn",
      total_score: 75,
      total_tests: 3,
      accuracy: 2.5,
    },
    {
      username: "DesertFox",
      total_score: 68,
      total_tests: 2,
      accuracy: 3.4,
    },
    {
      username: "OceanMaster",
      total_score: 60,
      total_tests: 2,
      accuracy: 3.0,
    },
    {
      username: "MountainMan",
      total_score: 55,
      total_tests: 2,
      accuracy: 2.7,
    },
    {
      username: "sudevOP",
      total_score: 50,
      total_tests: 2,
      accuracy: 2.5,
    },
    {
      username: "pixelPro",
      total_score: 45,
      total_tests: 2,
      accuracy: 2.2,
    },
    {
      username: "admin",
      total_score: 10,
      total_tests: 1,
      accuracy: 1.0,
    },
  ]);

  return (
    <div
      className="min-h-screen bg-gray-950 text-white p-8 flex
      flex-col items-center justify-center font-minecraft"
    >
      <div
        className="w-full max-w-5xl bg-indigo-700/30 rounded-3xl
        shadow-2xl border-2 border-indigo-700 p-10 my-8"
      >
        {/* header */}
        <div className="w-full text-center pt-6 pb-4">
          <p className="text-6xl font-bold mb-4 text-indigo-300">
            Minecraft Biome Guesser
          </p>
          <p className="text-3xl text-indigo-500">
            Unleash your inner explorer!
          </p>
        </div>

        <Divider />

        {/* take quiz */}
        <div className="py-4 gap-6 flex flex-col">
          <p className="text-xl text-indigo-400 text-center">
            Test your Minecraft biome knowledge with 10 blurred screenshots.
            <br />
            Choose the correct biome from 4 options and prove you're the
            ultimate expert!
          </p>

          <button
            onClick={() => navigate("/quiz")}
            className="bg-indigo-600 text-black rounded-full cursor-pointer flex items-center
            pt-5 pb-4 justify-center text-2xl transition duration-100 border-4 border-[#020617]
            shadow-[0px_9px_0px_0px_#020617] active:shadow-none active:translate-y-3"
          >
            💡 Take the Quiz!
          </button>
        </div>

        <Divider />

        {/* leaderboard */}
        <div className="text-white mt-10 w-full flex flex-col gap-2">
          <h2 className="text-2xl text-center text-indigo-300">
            🏆 Leaderboard
          </h2>
          <table className="w-full rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-indigo-950 text-indigo-100 text-lg">
                <th className="pt-2 pb-1 px-2 font-light border-1 border-indigo-600 text-left">Rank</th>
                <th className="pt-2 pb-1 px-2 font-light border-1 border-indigo-600 text-left">Username</th>
                <th className="pt-2 pb-1 px-2 font-light border-1 border-indigo-600 text-right">Score</th>
                <th className="pt-2 pb-1 px-2 font-light border-1 border-indigo-600 text-right">Quizzes</th>
                <th className="pt-2 pb-1 px-2 font-light border-1 border-indigo-600 text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr
                  key={player.username}
                  className={`bg-indigo-900 hover:bg-[#2a2770] transition duration-100
                  ${index === 0 ? "text-yellow-300" : "text-indigo-200"}`}
                >
                  <td className="pt-2 pb-1 px-2 border-1 border-indigo-600 text-left">{index + 1}</td>
                  <td className="pt-2 pb-1 px-2 border-1 border-indigo-600 text-left">{player.username}</td>
                  <td className="pt-2 pb-1 px-2 border-1 border-indigo-600 text-right">{player.total_score}</td>
                  <td className="pt-2 pb-1 px-2 border-1 border-indigo-600 text-right">{player.total_tests}</td>
                  <td className="pt-2 pb-1 px-2 border-1 border-indigo-600 text-right">{player.accuracy.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Divider = () => {
  return <div className="w-full border-t-2 border-indigo-600 my-6" />;
};

export default MainPage;

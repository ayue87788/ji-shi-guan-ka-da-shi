'use client';

import { getGrade } from '@/lib/knowledge';

interface FinalResultProps {
  totalScore: number;
  level1Score: number;
  level2Score: number;
  level3Score: number;
  level4Score: number;
  onRestart: () => void;
}

export function FinalResult({
  totalScore,
  level1Score,
  level2Score,
  level3Score,
  level4Score,
  onRestart,
}: FinalResultProps) {
  const grade = getGrade(totalScore);
  const maxScore = 40;

  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <div className="mb-6">
        <div className="text-8xl mb-4">{grade.emoji}</div>
        <h1 className="text-3xl font-black text-gray-800 mb-2 font-serif">
          恭喜你完成了所有关卡！
        </h1>
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-full text-lg shadow-lg">
          {grade.level}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
        <div className="mb-6">
          <div className="text-gray-500 text-sm mb-2">总分</div>
          <div className="text-6xl font-black bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
            {totalScore}
            <span className="text-2xl text-gray-400">/{maxScore}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-20 text-sm text-gray-500 text-left">第一关</span>
            <div className="flex-1 h-3 bg-teal-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-1000"
                style={{ width: `${(level1Score / 9) * 100}%` }}
              />
            </div>
            <span className="w-12 text-sm font-bold text-teal-600 text-right">
              {level1Score}/9
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-20 text-sm text-gray-500 text-left">第二关</span>
            <div className="flex-1 h-3 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                style={{ width: `${(level2Score / 9) * 100}%` }}
              />
            </div>
            <span className="w-12 text-sm font-bold text-amber-600 text-right">
              {level2Score}/9
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-20 text-sm text-gray-500 text-left">第三关</span>
            <div className="flex-1 h-3 bg-rose-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-1000"
                style={{ width: `${(level3Score / 10) * 100}%` }}
              />
            </div>
            <span className="w-12 text-sm font-bold text-rose-600 text-right">
              {level3Score}/10
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-20 text-sm text-gray-500 text-left">第四关</span>
            <div className="flex-1 h-3 bg-violet-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-1000"
                style={{ width: `${(level4Score / 10) * 100}%` }}
              />
            </div>
            <span className="w-12 text-sm font-bold text-violet-600 text-right">
              {level4Score}/10
            </span>
          </div>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-left">
          <p className="text-teal-800 leading-relaxed">{grade.comment}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-6 mb-6 text-white">
        <h3 className="font-bold text-lg mb-2">📜 学习口诀</h3>
        <p className="text-sm opacity-95 leading-relaxed font-serif">
          "即使"一出现，"也"字跟后面；
          <br />
          假设条件真，结果却反变；
          <br />
          如若顺理成，就用"如果"填。
        </p>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal-200"
      >
        再来一次，挑战更高分！
      </button>
    </div>
  );
}

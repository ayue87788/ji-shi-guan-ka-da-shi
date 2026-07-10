'use client';

interface LevelResultProps {
  level: number;
  levelName: string;
  score: number;
  maxScore: number;
  totalScore: number;
  color: 'teal' | 'amber' | 'rose' | 'violet';
  passed: boolean;
  onNext: () => void;
  nextLabel?: string;
}

const colorMap = {
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
    btn: 'bg-teal-600 hover:bg-teal-700',
    score: 'text-teal-600',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    btn: 'bg-amber-500 hover:bg-amber-600',
    score: 'text-amber-600',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    btn: 'bg-rose-500 hover:bg-rose-600',
    score: 'text-rose-600',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    btn: 'bg-violet-500 hover:bg-violet-600',
    score: 'text-violet-600',
  },
};

export function LevelResult({
  level,
  levelName,
  score,
  maxScore,
  totalScore,
  color,
  passed,
  onNext,
  nextLabel = '进入下一关',
}: LevelResultProps) {
  const colors = colorMap[color];
  const percentage = (score / maxScore) * 100;

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className={`${colors.bg} border ${colors.border} rounded-2xl p-8 mb-6`}>
        <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
        <h2 className={`text-2xl font-bold ${colors.text} mb-2`}>
          第{level}关完成！
        </h2>
        <p className="text-gray-500 mb-6">{levelName}</p>

        <div className="bg-white rounded-xl p-6 mb-6 shadow-inner">
          <div className="text-sm text-gray-500 mb-2">本关得分</div>
          <div className={`text-5xl font-black ${colors.score} mb-2`}>
            {score}
            <span className="text-2xl text-gray-400">/{maxScore}</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mt-4">
            <div
              className={`h-full ${
                color === 'teal'
                  ? 'bg-teal-500'
                  : color === 'amber'
                    ? 'bg-amber-500'
                    : color === 'rose'
                      ? 'bg-rose-500'
                      : 'bg-violet-500'
              } rounded-full transition-all duration-1000`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <p className="text-gray-600 mb-2">
          {passed ? '恭喜通过本关！继续加油～' : '别灰心，继续努力！'}
        </p>
        <p className="text-gray-500 text-sm">
          累计总分：<span className={`font-bold ${colors.score}`}>{totalScore}</span> 分
        </p>
      </div>

      <button
        onClick={onNext}
        className={`w-full py-4 ${colors.btn} text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]`}
      >
        {nextLabel}
      </button>
    </div>
  );
}

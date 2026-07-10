'use client';

import { useGameState } from '@/lib/useGameState';
import { Welcome } from '@/components/Welcome';
import { Level1 } from '@/components/Level1';
import { Level2 } from '@/components/Level2';
import { Level3 } from '@/components/Level3';
import { Level4 } from '@/components/Level4';
import { LevelResult } from '@/components/LevelResult';
import { FinalResult } from '@/components/FinalResult';

export default function Home() {
  const {
    state,
    startGame,
    finishLevel1,
    goToLevel2,
    finishLevel2,
    goToLevel3,
    finishLevel3,
    goToLevel4,
    finishLevel4,
    showFinal,
    resetGame,
  } = useGameState();

  const renderContent = () => {
    switch (state.phase) {
      case 'welcome':
      default:
        return <Welcome onStart={startGame} />;

      case 'level1':
        return (
          <Level1 questions={state.level1Questions} onFinish={finishLevel1} />
        );

      case 'level1-result':
        return (
          <LevelResult
            level={1}
            levelName="语言语境 · 辨析「即使」与「如果」"
            score={state.level1Score}
            maxScore={9}
            totalScore={state.totalScore}
            color="teal"
            passed={state.level1Score >= 6}
            onNext={goToLevel2}
            nextLabel="进入第二关：言外语境"
          />
        );

      case 'level2':
        return (
          <Level2 questions={state.level2Questions} onFinish={finishLevel2} />
        );

      case 'level2-result':
        return (
          <LevelResult
            level={2}
            levelName="言外语境 · 重音与态度判断"
            score={state.level2Score}
            maxScore={9}
            totalScore={state.totalScore}
            color="amber"
            passed={state.level2Score >= 6}
            onNext={goToLevel3}
            nextLabel="进入第三关：情境语境"
          />
        );

      case 'level3':
        return state.level3Scenario ? (
          <Level3 scenario={state.level3Scenario} onFinish={finishLevel3} />
        ) : null;

      case 'level3-result':
        return (
          <LevelResult
            level={3}
            levelName="情境语境 · 场景造句"
            score={state.level3Score}
            maxScore={10}
            totalScore={state.totalScore}
            color="rose"
            passed={state.level3Score >= 6}
            onNext={goToLevel4}
            nextLabel="进入第四关：情境外语境"
          />
        );

      case 'level4':
        return state.level4Question ? (
          <Level4 question={state.level4Question} onFinish={finishLevel4} />
        ) : null;

      case 'level4-result':
        return (
          <LevelResult
            level={4}
            levelName="情境外语境 · 文化思辨"
            score={state.level4Score}
            maxScore={10}
            totalScore={state.totalScore}
            color="violet"
            passed={state.level4Score >= 6}
            onNext={showFinal}
            nextLabel="查看最终成绩"
          />
        );

      case 'final':
        return (
          <FinalResult
            totalScore={state.totalScore}
            level1Score={state.level1Score}
            level2Score={state.level2Score}
            level3Score={state.level3Score}
            level4Score={state.level4Score}
            onRestart={resetGame}
          />
        );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-teal-50 py-8 px-4">
      {/* 顶部装饰 */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="font-serif">即使闯关大师</span>
          {state.phase !== 'welcome' && state.phase !== 'final' && (
            <span>
              总分：<span className="font-bold text-teal-600">{state.totalScore}</span> 分
            </span>
          )}
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-2xl mx-auto">
        <div className="animate-fade-in">{renderContent()}</div>
      </div>

      {/* 底部装饰 */}
      <div className="max-w-2xl mx-auto mt-8 text-center">
        <p className="text-gray-300 text-xs font-serif">
          ～ 学而时习之，不亦说乎 ～
        </p>
      </div>
    </main>
  );
}

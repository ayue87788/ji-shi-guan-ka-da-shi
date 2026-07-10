'use client';

import { useState } from 'react';
import type { ScenarioQuestion } from '@/lib/knowledge';

interface Level3Props {
  scenario: ScenarioQuestion;
  onFinish: (score: number) => void;
}

interface Evaluation {
  grammarScore: number;
  logicScore: number;
  appropriatenessScore: number;
  totalScore: number;
  feedback: string;
}

function evaluateSentence(sentence: string): Evaluation {
  let grammarScore = 0;
  let logicScore = 0;
  let appropriatenessScore = 0;

  // 语法检查：是否包含"即使"和"也"
  const hasJiShi = sentence.includes('即使');
  const hasYe = sentence.includes('也');
  const hasJibian = sentence.includes('即便');

  if ((hasJiShi || hasJibian) && hasYe) {
    grammarScore = 4;
  } else if (hasJiShi || hasJibian) {
    grammarScore = 2;
  } else if (hasYe) {
    grammarScore = 1;
  }

  // 语义逻辑检查：是否表达了反预期
  const hasContrast =
    /虽然|但|却|还是|仍然|依然|还是/gi.test(sentence) ||
    // 根据"即使A也B"结构判断A和B是否有反预期感
    (hasJiShi && hasYe && sentence.length > 10);

  if (hasContrast && grammarScore >= 2) {
    logicScore = 3;
  } else if (grammarScore >= 2) {
    logicScore = 2;
  } else {
    logicScore = 0;
  }

  // 场景得体性：句子长度和完整度
  if (sentence.length >= 15 && grammarScore >= 2) {
    appropriatenessScore = 3;
  } else if (sentence.length >= 8) {
    appropriatenessScore = 2;
  } else {
    appropriatenessScore = 1;
  }

  const totalScore = grammarScore + logicScore + appropriatenessScore;

  let feedback = '';
  if (totalScore >= 9) {
    feedback =
      '非常棒！你的句子结构完整，语义逻辑清晰，而且很贴合场景。"即使……也……"的用法掌握得很好！';
  } else if (totalScore >= 7) {
    feedback =
      '不错！你基本掌握了"即使……也……"的用法。可以再注意一下句子的完整性，让表达更自然。';
  } else if (totalScore >= 5) {
    feedback =
      '加油！你已经理解了基本结构，但句子的完整性和逻辑还可以提升。记住"即使"后面跟假设的条件，"也"后面跟反预期的结果。';
  } else {
    feedback =
      '再试试看！记得要用"即使……也……"的完整结构。"即使"引出假设的条件，"也"后面接出乎意料的结果。';
  }

  return {
    grammarScore,
    logicScore,
    appropriatenessScore,
    totalScore,
    feedback,
  };
}

export function Level3({ scenario, onFinish }: Level3Props) {
  const [sentence, setSentence] = useState('');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleSubmit = () => {
    if (!sentence.trim()) return;

    const evalResult = evaluateSentence(sentence.trim());
    setEvaluation(evalResult);
    setAttempts((a) => a + 1);

    if (evalResult.totalScore > bestScore) {
      setBestScore(evalResult.totalScore);
    }
  };

  const handleRetry = () => {
    setEvaluation(null);
    setSentence('');
  };

  const handleNext = () => {
    onFinish(bestScore);
  };

  const canRetry = attempts < 2;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-rose-600 font-bold text-lg">第三关 · 情境语境</span>
          <span className="text-gray-500 text-sm">造句题 · 共 10 分</span>
        </div>
        <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-500 transition-all duration-500 rounded-full"
            style={{
              width: `${evaluation ? 100 : 50}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-rose-100">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{scenario.icon}</span>
            <div>
              <div className="inline-block px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm font-medium">
                场景：{scenario.title}
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{scenario.description}</p>
        </div>

        <div className="bg-rose-50/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">💡 参考示例</p>
          <p className="text-gray-700 font-serif italic">{scenario.example}</p>
        </div>

        {!evaluation && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                请用「即使……也……」造句：
              </label>
              <textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder="在这里写下你的句子..."
                className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:ring-0 outline-none resize-none text-gray-800 transition-colors"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!sentence.trim()}
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              提交答案
            </button>
          </>
        )}

        {evaluation && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📝</span>
                <span className="font-bold text-green-700">评分结果</span>
                <span className="ml-auto text-2xl font-black text-green-600">
                  {evaluation.totalScore}/10
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>语法正确（结构完整）</span>
                  <span className="font-medium">{evaluation.grammarScore}/4</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>语义逻辑（反预期）</span>
                  <span className="font-medium">{evaluation.logicScore}/3</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>场景得体（语气合适）</span>
                  <span className="font-medium">
                    {evaluation.appropriatenessScore}/3
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">{evaluation.feedback}</p>
            </div>

            <div className="flex gap-3">
              {canRetry && evaluation.totalScore < 8 && (
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 bg-white border-2 border-rose-300 text-rose-600 hover:bg-rose-50 font-medium rounded-xl transition-colors"
                >
                  再试一次（还剩 {2 - attempts} 次）
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl transition-colors"
              >
                查看本关成绩
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-gray-500 text-sm">
        最佳得分：<span className="text-rose-600 font-bold">{bestScore}</span> 分
      </div>
    </div>
  );
}

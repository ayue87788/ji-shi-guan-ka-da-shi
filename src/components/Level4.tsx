'use client';

import { useState } from 'react';
import type { CultureQuestion } from '@/lib/knowledge';

interface Level4Props {
  question: CultureQuestion;
  onFinish: (score: number) => void;
}

interface Evaluation {
  score: number;
  feedback: string;
  details: {
    grammar: number;
    depth: number;
    fluency: number;
  };
}

function evaluateAnswer(answer: string): Evaluation {
  let grammar = 0;
  let depth = 0;
  let fluency = 0;

  // 语法检查：是否包含"即使"和"也"
  const hasJiShi = answer.includes('即使');
  const hasYe = answer.includes('也');
  const hasJibian = answer.includes('即便');

  if ((hasJiShi || hasJibian) && hasYe) {
    grammar = 4;
  } else if (hasJiShi || hasJibian) {
    grammar = 2;
  } else {
    grammar = 1;
  }

  // 内容深度
  const lengthScore = answer.length;
  if (lengthScore >= 50) {
    depth = 4;
  } else if (lengthScore >= 30) {
    depth = 3;
  } else if (lengthScore >= 15) {
    depth = 2;
  } else {
    depth = 1;
  }

  // 表达流畅度
  const hasPunctuation = /[，。！？、；：]/.test(answer);
  const hasMultipleSentences = answer.split(/[。！？]/).length >= 2;

  if (hasPunctuation && hasMultipleSentences) {
    fluency = 2;
  } else if (hasPunctuation) {
    fluency = 1.5;
  } else {
    fluency = 1;
  }

  const score = Math.round(grammar + depth + fluency);

  let feedback = '';
  if (score >= 9) {
    feedback =
      '太棒了！你不仅语法正确，而且有自己的思考和观点，表达也很流畅。你已经能用"即使"表达复杂的跨文化对比和个人见解了！';
  } else if (score >= 7) {
    feedback =
      '非常好！你的回答有一定的深度，"即使……也……"的使用也很恰当。如果能再多展开一些，表达会更加完整。';
  } else if (score >= 5) {
    feedback =
      '不错！你尝试表达了自己的观点，"即使"的使用也基本正确。可以再补充一些细节或例子，让内容更丰富。';
  } else {
    feedback =
      '继续加油！记得用完整的"即使……也……"结构，可以多分享一些你的想法和经历哦。';
  }

  return {
    score,
    feedback,
    details: { grammar, depth, fluency },
  };
}

export function Level4({ question, onFinish }: Level4Props) {
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    const evalResult = evaluateAnswer(answer.trim());
    setEvaluation(evalResult);
  };

  const handleFinish = () => {
    onFinish(evaluation?.score ?? 0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-violet-600 font-bold text-lg">第四关 · 情境外语境</span>
          <span className="text-gray-500 text-sm">文化思辨 · 共 10 分</span>
        </div>
        <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-500 rounded-full"
            style={{ width: `${evaluation ? 100 : 50}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-violet-100">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium mb-4">
            🌏 文化思辨
          </div>
          <p className="text-lg text-gray-800 leading-relaxed font-serif">
            {question.question}
          </p>
        </div>

        <div className="bg-violet-50/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">💡 小提示</p>
          <p className="text-gray-700">{question.hint}</p>
        </div>

        {!evaluation && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                请用「即使……也……」回答：
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="在这里写下你的回答..."
                className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-400 focus:ring-0 outline-none resize-none text-gray-800 transition-colors"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="w-full py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              提交答案
            </button>
          </>
        )}

        {evaluation && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🌟</span>
                <span className="font-bold text-green-700">综合评价</span>
                <span className="ml-auto text-2xl font-black text-green-600">
                  {evaluation.score}/10
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>语法正确性</span>
                  <span className="font-medium">{evaluation.details.grammar}/4</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>内容深度</span>
                  <span className="font-medium">{evaluation.details.depth}/4</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>表达流畅度</span>
                  <span className="font-medium">{evaluation.details.fluency}/2</span>
                </div>
              </div>
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">{evaluation.feedback}</p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-colors"
            >
              查看最终成绩
            </button>
          </div>
        )}
      </div>

      {evaluation && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          本关得分：<span className="text-violet-600 font-bold">{evaluation.score}</span> 分
        </div>
      )}
    </div>
  );
}

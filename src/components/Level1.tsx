'use client';

import { useState } from 'react';
import type { ChoiceQuestion } from '@/lib/knowledge';

interface Level1Props {
  questions: ChoiceQuestion[];
  onFinish: (score: number) => void;
}

interface AnswerState {
  selected: string | null;
  isCorrect: boolean | null;
  showAnalysis: boolean;
}

export function Level1({ questions, onFinish }: Level1Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(
    questions.map(() => ({ selected: null, isCorrect: null, showAnalysis: false })),
  );
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (value: string) => {
    if (currentAnswer.showAnalysis) return;

    const isCorrect = value === currentQ.answer;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = {
      selected: value,
      isCorrect,
      showAnalysis: true,
    };
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore((s) => s + 3);
    }
  };

  const handleNext = () => {
    if (isLast) {
      onFinish(score);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const correctCount = answers.filter((a) => a.isCorrect === true).length;
  const answeredCount = answers.filter((a) => a.showAnalysis).length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-teal-700 font-bold text-lg">第一关 · 语言语境</span>
          <span className="text-gray-500 text-sm">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 transition-all duration-500 rounded-full"
            style={{ width: `${((currentIndex + (currentAnswer.showAnalysis ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-4">
            辨析「即使」与「如果」
          </div>
          <p className="text-xl font-serif text-gray-800 leading-relaxed">
            {currentQ.question}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = currentAnswer.selected === opt.value;
            const isCorrectAnswer = opt.value === currentQ.answer;

            let btnClass =
              'w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ';

            if (!currentAnswer.showAnalysis) {
              btnClass +=
                'border-gray-200 hover:border-teal-400 hover:bg-teal-50 cursor-pointer';
            } else if (isCorrectAnswer) {
              btnClass += 'border-green-500 bg-green-50 text-green-800';
            } else if (isSelected && !isCorrectAnswer) {
              btnClass += 'border-red-400 bg-red-50 text-red-800';
            } else {
              btnClass += 'border-gray-200 text-gray-400';
            }

            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                disabled={currentAnswer.showAnalysis}
                className={btnClass}
              >
                <span className="font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {currentAnswer.showAnalysis && (
          <div
            className={`p-4 rounded-xl mb-6 ${
              currentAnswer.isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">{currentAnswer.isCorrect ? '✅' : '💡'}</span>
              <div>
                <p
                  className={`font-bold mb-1 ${
                    currentAnswer.isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {currentAnswer.isCorrect ? '答对了！很好～' : '再想想哦～'}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {currentQ.analysis}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentAnswer.showAnalysis && (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors"
          >
            {isLast ? '查看本关成绩' : '下一题'}
          </button>
        )}
      </div>

      <div className="mt-4 text-center text-gray-500 text-sm">
        已答 {answeredCount}/{questions.length} 题，当前得分：
        <span className="text-teal-600 font-bold">{score}</span> 分
      </div>
      <div className="mt-1 text-center text-gray-400 text-xs">
        通关条件：至少答对 2 题（共 9 分）
      </div>
    </div>
  );
}

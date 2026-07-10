'use client';

import { useState } from 'react';
import type { StressQuestion } from '@/lib/knowledge';

interface Level2Props {
  questions: StressQuestion[];
  onFinish: (score: number) => void;
}

interface AnswerState {
  selected: string | null;
  isCorrect: boolean | null;
  showAnalysis: boolean;
}

export function Level2({ questions, onFinish }: Level2Props) {
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

  const answeredCount = answers.filter((a) => a.showAnalysis).length;

  // Highlight the stressed word
  const renderSentence = () => {
    const sentence = currentQ.sentence;
    const stressWord = currentQ.stressWord;
    const parts = sentence.split(stressWord);

    return (
      <span>
        {parts[0]}
        <span className="text-3xl text-amber-600 font-black underline decoration-4 decoration-amber-400 underline-offset-4">
          {stressWord}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-amber-600 font-bold text-lg">第二关 · 言外语境</span>
          <span className="text-gray-500 text-sm">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-500 rounded-full"
            style={{ width: `${((currentIndex + (currentAnswer.showAnalysis ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-4">
            重音与态度
          </div>
          <p className="text-sm text-gray-500 mb-3">
            句子中黄色标出的词是重音所在，请判断说话人的态度：
          </p>
          <p className="text-2xl font-serif text-gray-800 leading-relaxed text-center py-6 bg-amber-50/50 rounded-xl">
            {renderSentence()}
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
                'border-gray-200 hover:border-amber-400 hover:bg-amber-50 cursor-pointer';
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
                <span className="text-sm text-gray-500 ml-2">— {opt.desc}</span>
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
                  {currentAnswer.isCorrect ? '太棒了！你很有语感～' : '差一点哦～'}
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
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors"
          >
            {isLast ? '查看本关成绩' : '下一题'}
          </button>
        )}
      </div>

      <div className="mt-4 text-center text-gray-500 text-sm">
        已答 {answeredCount}/{questions.length} 题，当前得分：
        <span className="text-amber-600 font-bold">{score}</span> 分
      </div>
      <div className="mt-1 text-center text-gray-400 text-xs">
        通关条件：至少答对 2 题（共 9 分）
      </div>
    </div>
  );
}

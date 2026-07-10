'use client';

import { useState, useCallback } from 'react';
import {
  choiceQuestions,
  stressQuestions,
  scenarioQuestions,
  cultureQuestions,
} from './knowledge';

export type GamePhase =
  | 'welcome'
  | 'level1'
  | 'level1-result'
  | 'level2'
  | 'level2-result'
  | 'level3'
  | 'level3-result'
  | 'level4'
  | 'level4-result'
  | 'final';

export interface GameState {
  phase: GamePhase;
  totalScore: number;
  level1Score: number;
  level2Score: number;
  level3Score: number;
  level4Score: number;
  level1Questions: typeof choiceQuestions;
  level2Questions: typeof stressQuestions;
  level3Scenario: (typeof scenarioQuestions)[number] | null;
  level4Question: (typeof cultureQuestions)[number] | null;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: 'welcome',
    totalScore: 0,
    level1Score: 0,
    level2Score: 0,
    level3Score: 0,
    level4Score: 0,
    level1Questions: [],
    level2Questions: [],
    level3Scenario: null,
    level4Question: null,
  });

  const startGame = useCallback(() => {
    const shuffledChoice = shuffleArray(choiceQuestions).slice(0, 3);
    setState((s) => ({
      ...s,
      phase: 'level1',
      level1Questions: shuffledChoice,
    }));
  }, []);

  const finishLevel1 = useCallback((score: number) => {
    setState((s) => ({
      ...s,
      phase: 'level1-result',
      level1Score: score,
      totalScore: s.totalScore + score,
    }));
  }, []);

  const goToLevel2 = useCallback(() => {
    setState((s) => ({
      ...s,
      phase: 'level2',
      level2Questions: stressQuestions,
    }));
  }, []);

  const finishLevel2 = useCallback((score: number) => {
    setState((s) => ({
      ...s,
      phase: 'level2-result',
      level2Score: score,
      totalScore: s.totalScore + score,
    }));
  }, []);

  const goToLevel3 = useCallback(() => {
    const scenario =
      scenarioQuestions[Math.floor(Math.random() * scenarioQuestions.length)];
    setState((s) => ({
      ...s,
      phase: 'level3',
      level3Scenario: scenario,
    }));
  }, []);

  const finishLevel3 = useCallback((score: number) => {
    setState((s) => ({
      ...s,
      phase: 'level3-result',
      level3Score: score,
      totalScore: s.totalScore + score,
    }));
  }, []);

  const goToLevel4 = useCallback(() => {
    const question =
      cultureQuestions[Math.floor(Math.random() * cultureQuestions.length)];
    setState((s) => ({
      ...s,
      phase: 'level4',
      level4Question: question,
    }));
  }, []);

  const finishLevel4 = useCallback((score: number) => {
    setState((s) => ({
      ...s,
      phase: 'level4-result',
      level4Score: score,
      totalScore: s.totalScore + score,
    }));
  }, []);

  const showFinal = useCallback(() => {
    setState((s) => ({
      ...s,
      phase: 'final',
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      phase: 'welcome',
      totalScore: 0,
      level1Score: 0,
      level2Score: 0,
      level3Score: 0,
      level4Score: 0,
      level1Questions: [],
      level2Questions: [],
      level3Scenario: null,
      level4Question: null,
    });
  }, []);

  return {
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
  };
}

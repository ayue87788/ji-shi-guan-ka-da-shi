// 教学知识库类型定义

export interface ChoiceQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  answer: string;
  analysis: string;
}

export interface StressQuestion {
  id: string;
  sentence: string;
  stressWord: string;
  options: { label: string; value: string; desc: string }[];
  answer: string;
  analysis: string;
}

export interface ScenarioQuestion {
  id: string;
  title: string;
  description: string;
  example: string;
  icon: string;
}

export interface CultureQuestion {
  id: string;
  question: string;
  hint: string;
}

// 第一关：辨析题（"即使" vs "如果"）
export const choiceQuestions: ChoiceQuestion[] = [
  {
    id: 'c1',
    question: '（ ）明天下雨，比赛也不会取消。',
    options: [
      { label: 'A. 如果', value: 'A' },
      { label: 'B. 即使', value: 'B' },
    ],
    answer: 'B',
    analysis: '正确答案是 B。解析："比赛不取消"是反预期结果——按常理下雨比赛会取消，但结果相反，所以用"即使"。',
  },
  {
    id: 'c2',
    question: '（ ）你明天有时间，我们就去爬山。',
    options: [
      { label: 'A. 如果', value: 'A' },
      { label: 'B. 即使', value: 'B' },
    ],
    answer: 'A',
    analysis: '正确答案是 A。解析："去爬山"是顺理成章的结果——有时间就去爬山，是自然而然的，所以用"如果"。',
  },
  {
    id: 'c3',
    question: '他（ ）很忙，也会抽时间来看我。',
    options: [
      { label: 'A. 如果', value: 'A' },
      { label: 'B. 即使', value: 'B' },
    ],
    answer: 'B',
    analysis: '正确答案是 B。解析："来看我"是反预期的——忙的时候按理不会来看我，但他还是来了，所以用"即使"。',
  },
  {
    id: 'c4',
    question: '（ ）你再努力，也不一定能成功。',
    options: [
      { label: 'A. 如果', value: 'A' },
      { label: 'B. 即使', value: 'B' },
    ],
    answer: 'B',
    analysis: '正确答案是 B。解析："不一定成功"是反预期的——努力通常应该成功，但结果不一定，所以用"即使"。',
  },
  {
    id: 'c5',
    question: '（ ）你好好学习，就能考上好大学。',
    options: [
      { label: 'A. 如果', value: 'A' },
      { label: 'B. 即使', value: 'B' },
    ],
    answer: 'A',
    analysis: '正确答案是 A。解析："考上好大学"是顺理成章的结果——好好学习就会考上，所以用"如果"。',
  },
];

// 第二关：重音态度题
export const stressQuestions: StressQuestion[] = [
  {
    id: 's1',
    sentence: '即使你不去，我也去。',
    stressWord: '我',
    options: [
      { label: 'A. 强调条件', value: 'A', desc: '突出前提的极端性' },
      { label: 'B. 强调自己的决心', value: 'B', desc: '表明自己的坚定态度' },
      { label: 'C. 表示无奈', value: 'C', desc: '对对方的行为感到无奈' },
    ],
    answer: 'B',
    analysis: '正确答案是 B。重音在"我"上，强调的是"我"的行为，表达自己无论如何都会去的坚定决心。',
  },
  {
    id: 's2',
    sentence: '即使你不去，我也去。',
    stressWord: '即使',
    options: [
      { label: 'A. 强调条件极端', value: 'A', desc: '带有挑战或假设的语气' },
      { label: 'B. 强调自己的决心', value: 'B', desc: '表明自己的坚定态度' },
      { label: 'C. 表示开心', value: 'C', desc: '对结果感到满意' },
    ],
    answer: 'A',
    analysis: '正确答案是 A。重音在"即使"上，强调的是条件——"就算你真的不去"，带有挑战或假设性的语气。',
  },
  {
    id: 's3',
    sentence: '即使你不去，我也去。',
    stressWord: '你',
    options: [
      { label: 'A. 强调条件极端', value: 'A', desc: '带有挑战语气' },
      { label: 'B. 强调自己的决心', value: 'B', desc: '表明自己的坚定态度' },
      { label: 'C. 强调对方的作用，带不满', value: 'C', desc: '觉得对方本应该去' },
    ],
    answer: 'C',
    analysis: '正确答案是 C。重音在"你"上，强调的是"你"这个人——"连你都不去"，带有不满、无奈或对对方的失望。',
  },
];

// 第三关：场景造句题
export const scenarioQuestions: ScenarioQuestion[] = [
  {
    id: 'sc1',
    title: '朋友争论',
    description: '你的朋友说手机让生活更方便，你不同意他的看法。请用"即使……也……"说一句话表达你的观点。',
    example: '示例：即使手机很方便，它也让我们失去了很多与家人面对面交流的时间。',
    icon: '💬',
  },
  {
    id: 'sc2',
    title: '家庭沟通',
    description: '父母担心你沉迷手机，影响学习和健康。你想让他们放心。请用"即使……也……"说一句话让父母安心。',
    example: '示例：即使我玩手机，我也会控制时间，不会影响学习。',
    icon: '🏠',
  },
  {
    id: 'sc3',
    title: '自我反思',
    description: '你决定减少手机使用，把更多时间用在读书和运动上。请用"即使……也……"说一句话表达你的决心。',
    example: '示例：即使有新消息提示，我也要先把这本书的章节看完。',
    icon: '💪',
  },
];

// 第四关：文化思辨题
export const cultureQuestions: CultureQuestion[] = [
  {
    id: 'cu1',
    question: '在中国，人们很看重"守时"。在你们国家，人们通常怎么看待守时？即使很忙，也会守时吗？',
    hint: '提示：可以从文化差异、个人习惯、不同场合等角度思考，用"即使……也……"来表达。',
  },
  {
    id: 'cu2',
    question: '中国有句谚语叫"塞翁失马，焉知非福"，意思是看似坏事也可能变成好事。你生活中有过这样的经历吗？即使遇到了坏事，也可能有好结果吗？',
    hint: '提示：可以分享一个具体的经历或感悟，用"即使……也……"来表达。',
  },
  {
    id: 'cu3',
    question: '现在的人越来越忙，很多人觉得"无事闲来看飞花"是一种奢侈。你认为呢？即使我们很忙，也应该保留一些悠闲的时间吗？',
    hint: '提示：可以谈谈你对忙碌与悠闲的看法，用"即使……也……"来表达。',
  },
];

// 评分等级
export function getGrade(totalScore: number): { level: string; comment: string; emoji: string } {
  if (totalScore >= 36) {
    return {
      level: '大师级',
      comment: '太棒了！你已经完全掌握了"即使……也……"的用法，无论是语义辨析、语用场景还是文化表达都游刃有余。你就是真正的即使闯关大师！',
      emoji: '🏆',
    };
  }
  if (totalScore >= 30) {
    return {
      level: '优秀',
      comment: '非常棒！你对"即使……也……"的掌握已经很扎实了，在大部分场景下都能正确使用。继续巩固，你很快就能达到大师水平！',
      emoji: '🌟',
    };
  }
  if (totalScore >= 20) {
    return {
      level: '良好',
      comment: '不错哦！你已经理解了"即使……也……"的基本用法，但在一些复杂场景下还需要多加练习。记住口诀："即使"一出现，"也"字跟后面；假设条件真，结果却反变。',
      emoji: '👍',
    };
  }
  return {
    level: '继续努力',
    comment: '加油！你对"即使……也……"还有些不太熟悉。别灰心，记住核心："即使"后面的条件是假设的，但结果是反预期的。再多练习几次，你一定能掌握！',
    emoji: '💪',
  };
}

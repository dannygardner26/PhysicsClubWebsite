export type Difficulty = 'easy' | 'medium' | 'hard';
export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

export interface Problem {
  id: string;
  exam: 'fma' | 'physics-bowl';
  topic: string;
  difficulty: Difficulty;
  question: string;
  choices: string[];
  correctAnswer: number; // 0-indexed
  solution: string;
}

export const PROBLEMS: Problem[] = [
  // F=ma Problems
  {
    id: 'fma-1',
    exam: 'fma',
    topic: 'Kinematics',
    difficulty: 'easy',
    question: 'A ball is thrown horizontally from a cliff of height $h$ with initial velocity $v_0$. How far from the base of the cliff does the ball land?',
    choices: [
      '$v_0 \\sqrt{\\frac{h}{g}}$',
      '$v_0 \\sqrt{\\frac{2h}{g}}$',
      '$v_0 \\sqrt{\\frac{h}{2g}}$',
      '$2v_0 \\sqrt{\\frac{h}{g}}$',
    ],
    correctAnswer: 1,
    solution: 'Time to fall: $h = \\frac{1}{2}gt^2 \\Rightarrow t = \\sqrt{\\frac{2h}{g}}$\n\nHorizontal distance: $x = v_0 t = v_0\\sqrt{\\frac{2h}{g}}$',
  },
  {
    id: 'fma-2',
    exam: 'fma',
    topic: 'Newton\'s Laws',
    difficulty: 'easy',
    question: 'A block of mass $m$ is placed on a frictionless inclined plane of angle $\\theta$. What is the acceleration of the block down the incline?',
    choices: [
      '$g$',
      '$g\\cos\\theta$',
      '$g\\sin\\theta$',
      '$g\\tan\\theta$',
    ],
    correctAnswer: 2,
    solution: 'Using Newton\'s second law along the incline:\n$$ma = mg\\sin\\theta$$\n$$a = g\\sin\\theta$$',
  },
  {
    id: 'fma-3',
    exam: 'fma',
    topic: 'Momentum',
    difficulty: 'medium',
    question: 'Two blocks of masses $m_1$ and $m_2$ are connected by a massless string over a frictionless pulley. If $m_1 > m_2$, what is the acceleration of the system?',
    choices: [
      '$\\frac{(m_1 + m_2)g}{m_1 - m_2}$',
      '$\\frac{(m_1 - m_2)g}{m_1 + m_2}$',
      '$\\frac{m_1 g}{m_2}$',
      '$\\frac{m_2 g}{m_1}$',
    ],
    correctAnswer: 1,
    solution: 'For $m_1$: $m_1 g - T = m_1 a$\nFor $m_2$: $T - m_2 g = m_2 a$\n\nAdding: $(m_1 - m_2)g = (m_1 + m_2)a$\n$$a = \\frac{(m_1 - m_2)g}{m_1 + m_2}$$',
  },
  {
    id: 'fma-4',
    exam: 'fma',
    topic: 'Energy',
    difficulty: 'easy',
    question: 'A spring with spring constant $k$ is compressed by distance $x$. What is the maximum speed of a mass $m$ attached to the spring when released?',
    choices: [
      '$x\\sqrt{\\frac{k}{m}}$',
      '$x\\sqrt{\\frac{m}{k}}$',
      '$\\frac{kx}{m}$',
      '$\\frac{kx^2}{2m}$',
    ],
    correctAnswer: 0,
    solution: 'By conservation of energy:\n$$\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2$$\n$$v = x\\sqrt{\\frac{k}{m}}$$',
  },
  {
    id: 'fma-5',
    exam: 'fma',
    topic: 'Rotational Motion',
    difficulty: 'hard',
    question: 'A solid sphere and a hollow sphere of the same mass and radius roll down an incline without slipping. Which reaches the bottom first?',
    choices: [
      'The solid sphere',
      'The hollow sphere',
      'They reach at the same time',
      'Depends on the angle of incline',
    ],
    correctAnswer: 0,
    solution: 'The solid sphere has a smaller moment of inertia ($I = \\frac{2}{5}mr^2$) compared to the hollow sphere ($I = \\frac{2}{3}mr^2$). Less rotational inertia means more translational kinetic energy, so the solid sphere accelerates faster and reaches the bottom first.',
  },
  {
    id: 'fma-6',
    exam: 'fma',
    topic: 'Oscillations',
    difficulty: 'medium',
    question: 'A simple pendulum has period $T$. If the length is quadrupled, what is the new period?',
    choices: [
      '$T/2$',
      '$T$',
      '$2T$',
      '$4T$',
    ],
    correctAnswer: 2,
    solution: 'Period of a pendulum: $T = 2\\pi\\sqrt{\\frac{L}{g}}$\n\nIf $L \\to 4L$:\n$$T\' = 2\\pi\\sqrt{\\frac{4L}{g}} = 2 \\cdot 2\\pi\\sqrt{\\frac{L}{g}} = 2T$$',
  },

  // Physics Bowl Problems
  {
    id: 'pb-1',
    exam: 'physics-bowl',
    topic: 'Modern Physics',
    difficulty: 'easy',
    question: 'A photon has energy $E = 3.0$ eV. What is its wavelength? (Use $hc = 1240$ eV$\\cdot$nm)',
    choices: [
      '$207$ nm',
      '$413$ nm',
      '$620$ nm',
      '$826$ nm',
    ],
    correctAnswer: 1,
    solution: 'Using $E = \\frac{hc}{\\lambda}$:\n$$\\lambda = \\frac{hc}{E} = \\frac{1240 \\text{ eV}\\cdot\\text{nm}}{3.0 \\text{ eV}} = 413 \\text{ nm}$$',
  },
  {
    id: 'pb-2',
    exam: 'physics-bowl',
    topic: 'Thermodynamics',
    difficulty: 'easy',
    question: 'An ideal gas undergoes an isothermal expansion, doubling its volume. By what factor does the pressure change?',
    choices: [
      '$4$',
      '$2$',
      '$1/2$',
      '$1/4$',
    ],
    correctAnswer: 2,
    solution: 'For an isothermal process, $PV = $ constant.\n$$P_1 V_1 = P_2 V_2$$\n$$P_2 = P_1 \\frac{V_1}{V_2} = P_1 \\cdot \\frac{1}{2} = \\frac{P_1}{2}$$',
  },
  {
    id: 'pb-3',
    exam: 'physics-bowl',
    topic: 'Optics',
    difficulty: 'medium',
    question: 'Light travels from air into water (index of refraction $n = 1.33$) at an angle of incidence of $45°$. What is the angle of refraction?',
    choices: [
      '$25°$',
      '$32°$',
      '$45°$',
      '$60°$',
    ],
    correctAnswer: 1,
    solution: 'Using Snell\'s law: $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$\n$$1.00 \\cdot \\sin 45° = 1.33 \\cdot \\sin\\theta_2$$\n$$\\sin\\theta_2 = \\frac{0.707}{1.33} = 0.532$$\n$$\\theta_2 = \\arcsin(0.532) \\approx 32°$$',
  },
  {
    id: 'pb-4',
    exam: 'physics-bowl',
    topic: 'Electricity',
    difficulty: 'hard',
    question: 'Two identical capacitors are connected in series to a battery. If the same capacitors are reconnected in parallel to the same battery, the energy stored:',
    choices: [
      'Decreases by a factor of 4',
      'Decreases by a factor of 2',
      'Increases by a factor of 2',
      'Increases by a factor of 4',
    ],
    correctAnswer: 3,
    solution: 'Series: $C_{eq} = C/2$, Energy $= \\frac{1}{2}(C/2)V^2 = \\frac{CV^2}{4}$\n\nParallel: $C_{eq} = 2C$, Energy $= \\frac{1}{2}(2C)V^2 = CV^2$\n\nRatio: $\\frac{CV^2}{CV^2/4} = 4$',
  },
  {
    id: 'pb-5',
    exam: 'physics-bowl',
    topic: 'Waves',
    difficulty: 'easy',
    question: 'A string fixed at both ends has a fundamental frequency of 200 Hz. What is the frequency of the third harmonic?',
    choices: [
      '$200$ Hz',
      '$400$ Hz',
      '$600$ Hz',
      '$800$ Hz',
    ],
    correctAnswer: 2,
    solution: 'For a string fixed at both ends, harmonics are integer multiples of the fundamental:\n$$f_n = n \\cdot f_1$$\n$$f_3 = 3 \\times 200 = 600 \\text{ Hz}$$',
  },
  {
    id: 'pb-6',
    exam: 'physics-bowl',
    topic: 'Magnetism',
    difficulty: 'medium',
    question: 'A proton moves with velocity $v$ perpendicular to a magnetic field $B$. The radius of its circular path is $r$. If the velocity is doubled, the new radius is:',
    choices: [
      '$r/2$',
      '$r$',
      '$2r$',
      '$4r$',
    ],
    correctAnswer: 2,
    solution: 'For circular motion in a magnetic field:\n$$r = \\frac{mv}{qB}$$\n\nIf $v \\to 2v$:\n$$r\' = \\frac{m(2v)}{qB} = 2r$$',
  },
];

// Get all unique topics
export function getUniqueTopics(): string[] {
  return [...new Set(PROBLEMS.map(p => p.topic))];
}

// Get topics for a specific exam type
export function getTopicsByExam(exam: 'fma' | 'physics-bowl' | 'both'): string[] {
  if (exam === 'both') {
    return getUniqueTopics();
  }
  return [...new Set(PROBLEMS.filter(p => p.exam === exam).map(p => p.topic))];
}

// Filter problems by criteria
export function filterProblems(
  examFilter: 'fma' | 'physics-bowl' | 'both',
  topics: string[],
  difficulties: Difficulty[]
): Problem[] {
  return PROBLEMS.filter(p => {
    const matchesExam = examFilter === 'both' || p.exam === examFilter;
    const matchesTopic = topics.length === 0 || topics.includes(p.topic);
    const matchesDifficulty = difficulties.length === 0 || difficulties.includes(p.difficulty);
    return matchesExam && matchesTopic && matchesDifficulty;
  });
}

// Get random problem from filtered set, optionally excluding a specific problem
export function getRandomFilteredProblem(
  examFilter: 'fma' | 'physics-bowl' | 'both',
  topics: string[],
  difficulties: Difficulty[],
  excludeIds: string[] = []
): Problem | null {
  const filtered = filterProblems(examFilter, topics, difficulties)
    .filter(p => !excludeIds.includes(p.id));
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Legacy functions for backwards compatibility
export function getRandomProblem(): Problem {
  return PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
}

export function getRandomProblemByExam(exam: 'fma' | 'physics-bowl'): Problem {
  const filtered = PROBLEMS.filter(p => p.exam === exam);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function getProblemsByExam(exam: 'fma' | 'physics-bowl'): Problem[] {
  return PROBLEMS.filter(p => p.exam === exam);
}

export function getProblemsByTopic(topic: string): Problem[] {
  return PROBLEMS.filter(p => p.topic === topic);
}

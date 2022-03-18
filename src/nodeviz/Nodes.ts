export type NodeObj = {
    name: string,
    type: string,
    value: unknown,
    children?: NodeObj[]
}

const t:NodeObj = {
    name: 'question_a',
    type: 'simpleQuestion',
    value: {
        question: 'Some question',
        answers: ['Something', 'Some other thing'],
        correct: 0
    }
}
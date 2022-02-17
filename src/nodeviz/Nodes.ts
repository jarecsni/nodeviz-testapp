export type Node = {
    type: string,
    value: unknown,
    children?: Node[]
}

const t:Node = {
    type: 'simpleQuestion',
    value: {
        question: 'Some question',
        answers: ['Something', 'Some other thing'],
        correct: 0
    }
}
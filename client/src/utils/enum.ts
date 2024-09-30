export enum CardState {
    none = '',
    toLearn = 'To learn',
    known = 'Known',
    learned = 'Learned'
}

export interface InfoModifier {
    style: string
    text: string
    iconStyle: string
}

export enum CardDirection {
    ToStudy = 'study way',
    ToGotIt = 'gotit way',
    ToDelete = 'delete way',
    Deadzone = 'deadzone'
}
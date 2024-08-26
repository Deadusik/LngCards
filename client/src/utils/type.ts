export function isOffset(obj: any): obj is CardOffset {
    return typeof obj === 'object' &&
        'x' in obj && typeof obj.x === 'number' &&
        'y' in obj && typeof obj.y === 'number'
}
export const getProgreesFromRange = (start: number, end: number, point: number): number => {
    return (point - start) / (end - start)
}
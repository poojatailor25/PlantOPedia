export function isNullOrUndefine(value: any):boolean {
    return value === null || value === undefined;
}
export function isNotNullOrUndefine(value: any):boolean {
    return !isNullOrUndefine(value);
}

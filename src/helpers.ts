export function mandatory<T>(elt: T | null | undefined): T {
    if (elt === null || elt === undefined) {
        throw new Error("Mandatory value is missing");
    }
    return elt;
}

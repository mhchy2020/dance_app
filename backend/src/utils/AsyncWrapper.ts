export const asyncWrapper = (fn: (req: any, res: any, next: any) => Promise<any>) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

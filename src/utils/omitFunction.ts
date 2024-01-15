export type omitFunction = <T, K extends keyof T>(obj: T, ...keys: K[]) => Omit<T, K>;

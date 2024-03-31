export interface Repository<T, U> {
    getById(id: number): Promise<T | null>;
    getAll(): Promise<T[]>;
    add(dto: U): Promise<T>;
    delete(id: number): void;
}
export interface Repository<T, U> {
    getById(id: number): T | null;
    getAll(): T[];
    add(dto: U): T;
    delete(id: number): void;
}
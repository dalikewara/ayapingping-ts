import express, { Express } from 'express';

export function expressServer(): [Express | null,  Error | null] {
    try {
        return [express(), null];
    }catch (err) {
        return [null, err instanceof Error ? err : new Error('general error')];
    }
}
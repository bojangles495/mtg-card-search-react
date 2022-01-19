import { Record, List } from 'immutable'

export type ToRecord<T> = Record<any> & Readonly<T>
export type ToImmutable<T>
    = T extends List<any> ? T
    : T extends Record<any> ? T
    : T extends (infer U)[] ? List<ToImmutable<U>>
    : T extends object ? ToRecord<{ [P in keyof T]: ToImmutable<T[P]> }>
    : T

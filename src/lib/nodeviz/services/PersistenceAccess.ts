import type { insert } from 'svelte/internal'

export interface PersistenceAccess {
    update(id:string, obj:object):Promise<void>
    insert(obj:object): Promise<unknown>
    delete(id:string): Promise<void>
}
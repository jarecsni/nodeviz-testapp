
export class PersistenceService {
    private static instance: PersistenceService;
    static getInstance():PersistenceService {
        if (!PersistenceService.instance) {
            PersistenceService.instance = new PersistenceService();
        }
        return PersistenceService.instance;
    }
    private constructor() {

    }
}
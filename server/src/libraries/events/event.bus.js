import { EventEmitter } from "node:events";

export const EVENTS = {
    SSE: "SSE",
    SYSTEM: "SYSTEM_EVENT"
};

export const ACTIONS = {
    CREATE_QUIZ: "CREATE_QUIZ",
    EDIT_QUIZ: "EDIT_QUIZ",
    DELETE_QUIZ: "DELETE_QUIZ"
};

class EventBus {
    constructor () {
        this.emitHandler = new EventEmitter();
        this.emitHandler.setMaxListeners(0);
    }

    getEventEmitter () {
        return this.emitHandler;
    }

    publish (event, action, data) {
        console.log(`[EVENT FIRED] Action: ${action} | Data:${data}`);

        try {
            this.emitHandler.emit(event, action, data);

            //this.emitHandler.emit(action, data);
        } catch (error) {
            console.error(
                `[EVENT BUS ERROR] A listener crashed synchronously on action: 
                ${action}
                ${error.message}`
            );
        }
    }

    subscribe (action, callback) {
        this.emitHandler.on(action, callback);
    }

    subscribersCount (action) {
        return this.emitHandler.listenerCount(action);
    }

}

export const eventBus = new EventBus();
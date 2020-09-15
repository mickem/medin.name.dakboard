interface FlowCardActionRegisterReturn {
    registerRunListener(handler: any);
}

declare namespace Homey {

    class Device {
        getData(): any;
        setCapabilityValue(name: string, data: number | string): Promise<void>;
        setCapabilityOptions(name: string, data: any): Promise<void>;
        registerCapabilityListener(disable: string, arg1: () => Promise<void>);

        setStoreValue(key:string, value:any): Promise<void>;
        getStoreValue(key:string) : any;

    }


    function __(key: string, data: any): string;

    class FlowCardAction {
        constructor(id: String);
        register(): FlowCardActionRegisterReturn;
    }
    class FlowCardTrigger {
        constructor(id: String);
        register();
        trigger(args: any);
    }


    interface ICronTaskType {
        domain: string;
        uri: string;
        id: string;
        when: string;
        data: any;
    }
    class ManagerCron {
        static getTasks(taskname: string): ICronTaskType[];
        static unregisterTask(taskId: string);
        static registerTask(taskname, cron);

    }
    class ManagerSettings {
        static get(key: string): any;
        static set(key: string, data: any);

        static on(event: string, cb: Function);

    }

    class App {

    }
    class app {
        static get(): any;
    }

    class Driver {

    }
}

export = Homey;

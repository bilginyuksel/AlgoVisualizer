
const utils = {
    randInt: (min=8, max=70) => {
        return min + Math.floor((max - min) * Math.random());
    },
    sleep: (ms= 100) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }        
}

class Step {
    constructor(type, params) {
        this.type = type;
        this.params = params;
    }
    // Override this function to use step capabilities.
    execute() {
    }
}

class AlgoRunner {
    constructor() {
        this.steps = [];
        this.currentStep = 0;
        this.speed = 0;
        this.isStarted = false;
        this.isStopped = false;
        this.isPaused = false;
        this.canSleep = true;
    }    

    buildSteps() {

    }

    // Override this function to parameterize your steps.
    // This function can let you specialize your steps.
    executeStep(type, params) {
    }

    async play() {
        while(this.has()) {
            const step = this.steps[this.currentStep];
            await this.executeStep(step.type, step.params);
        }
    }


    prev() {
        if(this.currentStep <= 0) {
            // error situation
            return;
        }
        this.currentStep--;
    }

    has() {
        return this.currentStep < this.steps.length;
    }

    goTo(step) {
        if(step.length <= step) {
            // error situation
            return;
        }
        this.currentStep = step;
    }
}


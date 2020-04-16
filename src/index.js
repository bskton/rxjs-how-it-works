class Observable {
    constructor(subscriptionFunction) {
        this.subscriptionFunction = subscriptionFunction;
    }

    subscribe(observer) {
        return this.subscriptionFunction(observer);
    }

    pipe(...operators) {
        return operators.reduce((source, operator) => operator(source), this);
    }
}

function timer(seconds) {
    const subscriptionFunction = observer => {
        const timeoutId = setTimeout(() => {
            observer.next('Cookie is ready!');
        }, seconds * 1000);

        return () => clearTimeout(timeoutId);
    }

    return new Observable(subscriptionFunction);
}

function logToConsole() {
    return source => new Observable(observer => {
        return source.subscribe({
            next: value => {
                console.log('logToConsole', value);
                observer.next(value + '!!');
            }
        })
    })
}

const myOvenTimer = timer(3);

myOvenTimer
    .pipe(logToConsole())
    .subscribe({
        next: value => console.log(value)
    });
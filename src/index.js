class Observable {
    constructor(subscriptionFunction) {
        this.subscriptionFunction = subscriptionFunction;
    }

    subscribe(observer) {
        return this.subscriptionFunction(observer);
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

const myOvenTimer = timer(3);

myOvenTimer.subscribe({
    next: value => console.log(value)
});
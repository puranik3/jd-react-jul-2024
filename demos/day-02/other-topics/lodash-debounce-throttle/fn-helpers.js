function debounce(fn, wait = 0) {
    let timerId;

    return function (...args) {
        if (timerId) {
            // NOTE: if the scheduled function already executed this would have no effect
            clearTimeout(timerId);
        }

        timerId = setTimeout(
            fn,
            wait,
            ...args
        );
    };
}

function throttle(fn, wait = 0) {
    let callDrop = false;

    return function (...args) {
        if (callDrop) {
            return;
        } else {
            fn(...args);
            callDrop = true;

            setTimeout(
                function () {
                    callDrop = false;
                },
                wait
            );
        }
    };
}

export {
    debounce,
    throttle
};
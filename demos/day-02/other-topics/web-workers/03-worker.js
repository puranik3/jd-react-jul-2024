function sum(a, b) {
    let result = 0;

    for (let i = a; i <= b; ++i) {
        result += i;
    }

    return result;
}

onmessage = function (event) {
    var result = sum(event.data.a, event.data.b);

    postMessage({
        result: result
    });
};
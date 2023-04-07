export function debounce(fn, delay) {
    let timeoutID;
    return function (arg, ...args) {
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(() => fn.apply(arg, args), delay);
    };
}

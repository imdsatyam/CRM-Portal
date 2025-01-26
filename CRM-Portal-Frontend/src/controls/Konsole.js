let OPEN_CONSOLE = true;

const konsole = {
    log: (...args) => {
        if (OPEN_CONSOLE) {
            console.log(...args);
        }
    },
    error: (...args) => {
        if (OPEN_CONSOLE) {
            console.error(...args);
        }
    },
    decor: (...args) => {
        if (OPEN_CONSOLE) {
            console.log('-*-*-*-', ...args, '-*-*-*-');
        }
    },
    encapse: (...args) => {
        if (OPEN_CONSOLE) {
            console.log('-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-');
            console.log(...args);
            console.log('-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-*-*-*-');
        }
    }
}

export default konsole;
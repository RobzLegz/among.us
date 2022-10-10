import * as readline from 'readline';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const input = (questionText: string) =>
    new Promise<string>((resolve) =>
        rl.question(questionText, resolve)
    ).finally(() => rl.close());

const { spawn } = require('child_process');
const config = require('./components.config.json');

const runCommand = (command, args) => {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            stdio: ['pipe', 'pipe', 'pipe'], // Use pipes for stdio to handle input/output
            shell: true
        });

        let stdout = '';
        let stderr = '';

        // Handle stdout
        child.stdout.on('data', (data) => {
            stdout += data.toString();
            console.log(`stdout: ${data.toString()}`);
            // Look for prompts and respond
            if (stdout.includes('(y/N)')) {
                console.log('Prompt detected, sending "y"');
                child.stdin.write('y\n');
            }
        });

        // Handle stderr
        child.stderr.on('data', (data) => {
            stderr += data.toString();
            console.log(`stderr: ${data.toString()}`);
        });

        // Handle the process exit
        child.on('close', (code) => {
            if (code === 0) {
                console.log(`Command executed successfully`);
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}. stderr: ${stderr}`));
            }
        });

        // Handle errors
        child.on('error', (err) => {
            reject(err);
        });

        // Optionally, handle the stdin end
        child.stdin.end();
    });
};

const addComponents = async () => {
    for (const component of config.components) {
        try {
            console.log(`Adding component: ${component}`);
            await runCommand('npx', ['shadcn', 'add', component]);
        } catch (error) {
            console.error(`Failed to add component: ${component}`, error.message);
        }
    }
};

addComponents();

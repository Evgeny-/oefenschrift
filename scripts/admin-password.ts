// Creates or replaces the administrator account: npm run admin:password -- <user>
// The password is read from ADMIN_PASSWORD or asked for without echo.
import { createInterface } from 'node:readline';
import { writeCredentials } from '../server/security';
async function ask(question: string) {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  const muted = (rl as any).output;
  const write = muted.write.bind(muted);
  return new Promise<string>((resolve) => {
    let hide = false;
    (rl as any)._writeToOutput = (text: string) => {
      if (!hide) write(text);
    };
    rl.question(question, (answer) => {
      hide = false;
      write('\n');
      rl.close();
      resolve(answer);
    });
    hide = true;
  });
}
const user = process.argv[2];
if (!user) {
  console.error('Usage: npm run admin:password -- <user>');
  process.exit(1);
}
const password = process.env.ADMIN_PASSWORD || (await ask(`Password for ${user}: `));
const again = process.env.ADMIN_PASSWORD || (await ask('Repeat the password: '));
if (password !== again) {
  console.error('The passwords differ.');
  process.exit(1);
}
try {
  console.log(
    `Administrator "${user}" saved to ${writeCredentials(user, password)}. Sign in at /ops/login.`,
  );
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}

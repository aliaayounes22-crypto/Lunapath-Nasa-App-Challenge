import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    configFile: './vite.config.js',
    root: '.',
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
  });

  await server.listen();
  console.log('====================================================');
  console.log('  LunaPath Development Server is Live');
  console.log('  Local:   http://localhost:5173/');
  console.log('  Network: http://0.0.0.0:5173/');
  console.log('====================================================');
}

start().catch((err) => {
  console.error('Failed to start LunaPath server:', err);
  process.exit(1);
});

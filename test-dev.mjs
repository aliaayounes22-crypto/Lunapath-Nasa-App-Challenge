import { createServer } from 'vite';

async function test() {
  const server = await createServer({
    configFile: './vite.config.js',
    root: '.',
    server: { port: 5174 }
  });

  await server.listen();
  console.log('Server started on port 5174');

  const urls = [
    'http://localhost:5174/',
    'http://localhost:5174/src/main.jsx',
    'http://localhost:5174/src/index.css',
    'http://localhost:5174/src/App.jsx',
    'http://localhost:5174/src/components/Hero.jsx',
    'http://localhost:5174/src/components/SpaceView.jsx',
    'http://localhost:5174/src/components/SpaceView3D.jsx',
    'http://localhost:5174/src/components/SunlightAnalysis.jsx'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(url, '-> Status:', res.status, 'Type:', res.headers.get('content-type'));
      if (!res.ok) {
        const text = await res.text();
        console.error('Error body:', text.slice(0, 500));
      }
    } catch (err) {
      console.error(url, 'Fetch error:', err.message);
    }
  }

  await server.close();
  console.log('Server closed successfully');
}

test().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';

const numCPUs = cpus().length;
const isDev = process.env.NODE_ENV !== 'production';

if (cluster.isPrimary && !isDev) {
  console.log(`🚀 Primary ${process.pid} is running`);
  
  // Fork workers (limited to 2 for memory optimization on free tier)
  const workerCount = Math.min(2, numCPUs);
  
  for (let i = 0; i < workerCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`🔄 Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down workers gracefully');
    for (const worker of Object.values(cluster.workers)) {
      worker.kill('SIGTERM');
    }
  });

} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  import('./index.js');
  console.log(`👷 Worker ${process.pid} started`);
}

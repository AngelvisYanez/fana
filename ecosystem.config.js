module.exports = {
  apps: [
    {
      name: 'fana-milling-center',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      instances: 1,
      exec_mode: 'fork', // Cambiar a fork para reducir uso de memoria
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        // Limitar memoria de Node.js para evitar errores OOM
        NODE_OPTIONS: '--max-old-space-size=1536 --max-semi-space-size=64',
        // Optimizaciones para reducir uso de memoria
        NEXT_TELEMETRY_DISABLED: '1',
        // Resend API Key
        RESEND_API_KEY: process.env.RESEND_API_KEY
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1500M', // Aumentar un poco el límite
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000
    }
  ]
};


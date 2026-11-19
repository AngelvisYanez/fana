// server.js
// Servidor simple para ejecutar la app Next.js en entornos como cPanel
// Uso esperado (producción):
//   npm install
//   npm run build
//   NODE_ENV=production PORT=3000 node server.js

const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

// Si tu app Next está en el mismo directorio (fana-milling), usamos '.'
const app = next({ dev, dir: path.resolve(__dirname) });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Cabeceras de seguridad básicas (opcional)
    server.use((req, res, nextMiddleware) => {
      res.setHeader("X-Frame-Options", "DENY");
      res.setHeader("X-Content-Type-Options", "nosniff");
      nextMiddleware();
    });

    // Servir archivos estáticos de la carpeta public (Next ya los sirve, pero
    // esto ayuda si cPanel espera ficheros en /public accesibles directamente)
    server.use(
      express.static(path.join(__dirname, "public"), { maxAge: "1y" })
    );

    // Si necesitas rutas personalizadas antes del handler de Next, agrégalas aquí.
    // Ejemplo: redireccionar HTTP a HTTPS si lo gestionas en el servidor
    // server.use((req, res, next) => { if (req.headers['x-forwarded-proto'] === 'http') return res.redirect('https://' + req.headers.host + req.url); next(); });

    // Delegar el resto de peticiones a Next
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    const httpServer = server.listen(port, "0.0.0.0", (err) => {
      if (err) throw err;
      console.log(
        `> Next.js server ready on http://0.0.0.0:${port}  (dev=${dev})`
      );
    });

    // Manejo de cierre gracioso
    const shutdown = () => {
      console.log("> Closing server...");
      httpServer.close(() => {
        console.log("> Server closed");
        process.exit(0);
      });
      // Forzar salida si no responde
      setTimeout(() => process.exit(1), 10000).unref();
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  })
  .catch((err) => {
    console.error("Error al preparar la app Next:", err);
    process.exit(1);
  });

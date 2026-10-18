# Publicar la aplicación completa

La interfaz React y la API Express se publican juntas en un servicio Node.js.
GitHub Pages no ejecuta la API de análisis.

## Render

1. Conectar Render con el repositorio `anaesposito/ERP-Support`.
2. Crear un Blueprint usando el archivo `render.yaml` de este repositorio.
3. Ingresar `GEMINI_API_KEY` en el formulario privado de Render. No subir la
   clave a GitHub ni escribirla en el código del navegador.
4. Crear el servicio y esperar que finalice la compilación.
5. Abrir la URL HTTPS que asigna Render.

El Blueprint usa el plan gratuito y configura `NODE_ENV=production` para que
Express sirva los archivos compilados de `dist`. La interfaz y `/api` comparten
la misma dirección, sin necesidad de cambiar las rutas del navegador.
El servicio gratuito puede suspenderse por inactividad y demorar al reactivarse.
La disponibilidad y los límites del servicio y de Gemini dependen de cada cuenta.

## Verificación

- La página principal debe mostrar el formulario de Nagora.
- `/api/status` debe responder `{"configured":true}` después de guardar la clave.
  Esta respuesta comprueba que la variable existe, no que la clave sea válida.
- Enviar un caso de prueba sin información confidencial y verificar que devuelve
  el diagnóstico. Esta prueba confirma también el acceso a Gemini.

## Desarrollo local

```sh
npm install --include=dev
npm run dev
```

Copiar `.env.example` a `.env` e ingresar la clave localmente. Para compilar:

```sh
npm run lint
npm run build
```

Para ejecutar la versión compilada, definir `NODE_ENV=production` en el entorno
y ejecutar `npm start`. El servidor respeta el puerto `PORT` del alojamiento.

# n8n en Render

Este repositorio contiene la configuración necesaria para desplegar n8n en Render.com usando Docker.

## 🚀 Despliegue

### Configuración en Render

1. Ve a [Render.com](https://render.com) y crea un nuevo **Web Service**
2. Conecta este repositorio
3. Configura el servicio:
   - **Environment**: Docker
   - **Plan**: Selecciona el plan que necesites
   - **Port**: 5678

### Variables de entorno en Render

Configura estas variables en Render (Settings → Environment):

```
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=tu_usuario
N8N_BASIC_AUTH_PASSWORD=tu_contraseña_segura
N8N_HOST=tu-app.onrender.com
N8N_PROTOCOL=https
WEBHOOK_URL=https://tu-app.onrender.com/
```

### Opcionales pero recomendadas:

```
N8N_ENCRYPTION_KEY=genera_una_clave_aleatoria_larga
EXECUTIONS_DATA_SAVE_ON_ERROR=all
EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=true
```

## 📝 Configuración del Dockerfile

El Dockerfile usa la imagen oficial de n8n y configura:
- Zona horaria: America/Argentina/Buenos_Aires
- Puerto: 5678

## 🔒 Seguridad

- ⚠️ **IMPORTANTE**: No subas archivos `.env` con credenciales al repositorio
- Las variables de entorno se configuran directamente en Render
- Usa contraseñas seguras para `N8N_BASIC_AUTH_PASSWORD`
- Genera una clave única para `N8N_ENCRYPTION_KEY`

## 📚 Recursos

- [Documentación de n8n](https://docs.n8n.io/)
- [Variables de entorno de n8n](https://docs.n8n.io/hosting/environment-variables/)
- [Render.com](https://render.com)

## 🌍 Zona horaria

Por defecto está configurada para Argentina/Buenos Aires. Para cambiarla, edita el `Dockerfile`:

```dockerfile
ENV TZ=tu_zona_horaria
```

[Lista de zonas horarias](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

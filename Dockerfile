FROM n8nio/n8n:latest

# (Opcional) zona horaria y locale
ENV TZ=America/Argentina/Buenos_Aires

# Autenticación básica
ENV N8N_BASIC_AUTH_ACTIVE=true
ENV N8N_BASIC_AUTH_USER=luis
ENV N8N_BASIC_AUTH_PASSWORD=CHANGEME

# Puerto de n8n
ENV N8N_PORT=5678

# Comando de arranque
CMD ["n8n"]
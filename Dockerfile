FROM nginx:alpine

# Metadata
LABEL maintainer="swagath-tech"
LABEL version="2.0.0"
LABEL description="Swagath Tech System Website - Hardened Enterprise Web Stack"
LABEL security.hardened="true"

# Remove default nginx static assets and configuration
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom enterprise hardened nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy source code with appropriate permissions
COPY ./src /usr/share/nginx/html

# Ensure proper permissions on web root
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Health check to ensure zero-downtime reliability
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
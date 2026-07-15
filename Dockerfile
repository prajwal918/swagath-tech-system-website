FROM nginx:alpine

# Add metadata labels
LABEL maintainer="swagath-tech"
LABEL version="1.0"
LABEL description="Swagath Tech System Website"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy source code
COPY ./src /usr/share/nginx/html

# Add a health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
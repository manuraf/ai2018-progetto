FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/log-interface/. /usr/share/nginx/html/interfacelog

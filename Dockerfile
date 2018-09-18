FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ai2018-progetto/. /usr/share/nginx/html/ai2018

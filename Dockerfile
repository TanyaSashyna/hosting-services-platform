FROM nginx as server

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./build/ /usr/share/nginx/html/
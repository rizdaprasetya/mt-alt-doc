FROM nginx:alpine
COPY ./tooling/docker-files/default.conf /etc/nginx/conf.d/default.conf
COPY ./ /usr/share/nginx/html/
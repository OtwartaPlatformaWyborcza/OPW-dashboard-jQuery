FROM ubuntu

RUN apt-get install nginx --yes
RUN mkdir /etc/nginx/sites
RUN rm -rf /etc/nginx/sites-enabled/*

COPY ./docker/sites/* /etc/nginx/sites/
COPY ./docker/entrypoint.sh /
RUN chmod +x /entrypoint.sh

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

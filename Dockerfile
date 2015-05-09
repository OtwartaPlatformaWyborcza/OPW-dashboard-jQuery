FROM ubuntu

RUN apt-get install nginx --yes
RUN mkdir /etc/nginx/sites
RUN rm -rf /etc/nginx/sites-enabled/*

COPY ./docker/site/* /etc/nginx/sites/
COPY ./docker/entrypoint.sh /

RUN cp -r ./opw-dashboard-jquery/public_html/* /var/www/
RUN chmod +x /entrypoint.sh

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

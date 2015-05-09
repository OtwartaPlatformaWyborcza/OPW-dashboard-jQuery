FROM ubuntu

RUN apt-get install nginx --yes
RUN mkdir /etc/nginx/sites
RUN rm -rf /etc/nginx/sites-enabled/*

COPY ./docker/site/* /etc/nginx/sites/
COPY ./docker/entrypoint.sh /

RUN	mkdir /var/www/
RUN	mkdir /var/www/js
RUN	mkdir /var/www/css
RUN	mkdir /var/www/img

COPY 	./opw-dashboard-jquery/public_html/* 	  /var/www/
#COPY    ./opw-dashboard-jquery/public_html/js/*   /var/www/js/
#COPY    ./opw-dashboard-jquery/public_html/css/*  /var/www/css/
#COPY    ./opw-dashboard-jquery/public_html/img/*  /var/www/img/

RUN 	chmod +x /entrypoint.sh

RUN 	echo "daemon off;" >> /etc/nginx/nginx.conf

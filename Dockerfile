FROM ubuntu
WORKDIR /SpringBootApplication
RUN apt update
RUN apt install -y openjdk-17-jdk openjdk-17-jre
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq install nginx maven nodejs npm
RUN rm /etc/nginx/sites-enabled/default
COPY ./configs/proxy /etc/nginx/sites-enabled
RUN systemctl enable nginx
COPY . /SpringBootApplication
RUN rm /SpringBootApplication/frontend/src/shared && rm /SpringBootApplication/backend/src/shared
COPY ./shared /SpringBootApplication/frontend/src/shared
COPY ./shared /SpringBootApplication/backend/src/shared
RUN cd /SpringBootApplication && mvn package
CMD [ "sh", "/SpringBootApplication/scripts/dockerStart.sh" ]

FROM ubuntu
WORKDIR /SpringBootApplication
RUN apt update
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq install default-jre nginx nodejs npm
RUN rm /etc/nginx/sites-enabled/default
COPY ./configs/proxy /etc/nginx/sites-enabled
RUN service nginx restart
COPY ./target/notekeeper-0.0.1-SNAPSHOT.jar /SpringBootApplication/notekeeper-0.0.1-SNAPSHOT.jar
CMD [ "java", "-jar", "/SpringBootApplication/notekeeper-0.0.1-SNAPSHOT.jar" ]

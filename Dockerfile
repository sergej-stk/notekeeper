FROM ubuntu
WORKDIR /SpringBootApplication
RUN apt update
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq install default-jre nginx maven nodejs npm
RUN rm /etc/nginx/sites-enabled/default
COPY ./configs/proxy /etc/nginx/sites-enabled
RUN service nginx restart
# compile frontend
COPY . /SpringBootApplication
RUN cd /SpringBootApplication/frontend && npm install && npm run lint && npm run build
RUN ./scripts/deployDistToJavaPackage.sh
RUN cd /SpringBootApplication && mvn package
#COPY ./target/notekeeper-0.0.1-SNAPSHOT.jar /SpringBootApplication/notekeeper-0.0.1-SNAPSHOT.jar
CMD [ "java", "-jar", "/SpringBootApplication/notekeeper-0.0.1-SNAPSHOT.jar" ]

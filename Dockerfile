FROM ubuntu
WORKDIR /SpringBootApplication
RUN apt update
RUN apt install -y openjdk-17-jdk openjdk-17-jre
RUN DEBIAN_FRONTEND=noninteractive apt-get -yq install nginx maven nodejs npm
RUN rm /etc/nginx/sites-enabled/default
COPY ./configs/proxy /etc/nginx/sites-enabled
RUN service nginx restart
# compile frontend
COPY . /SpringBootApplication
RUN cd /SpringBootApplication/frontend && npm install --force && npm run lint && npm run build
RUN cd /SpringBootApplication/frontend && chmod +x ./scripts/deployDistToJavaPackage.sh && ./scripts/deployDistToJavaPackage.sh
RUN cd /SpringBootApplication && mvn package
#COPY ./target/notekeeper-0.0.1-SNAPSHOT.jar /SpringBootApplication/notekeeper-0.0.1-SNAPSHOT.jar
CMD [ "java", "-jar", "/SpringBootApplication/target/notekeeper-0.0.1-SNAPSHOT.jar" ]

# Use a minimal JDK image to run the application
FROM eclipse-temurin:21-jre-alpine
RUN apk update && apk upgrade
# Create a non-root
RUN mkdir /app
EXPOSE 8080
RUN adduser -D user && chown -R user /app
WORKDIR .
COPY build/libs/*.jar /app/regelrett.jar
USER user
ENTRYPOINT ["java","-jar","/app/regelrett.jar"]
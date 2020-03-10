#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

ESP8266WebServer server;

char* ssid = "Teste";
char* password = "test1234";

void setup() {
    WiFi.hostname("ESP-host");
    WiFi.begin(ssid,password);
    Serial.begin(115200);
    while(WiFi.status()!=WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("");
    Serial.print("IP Address: ");
    Serial.print(WiFi.localIP());

    server.on("/",[](){server.send(200,"text/plain","Hellou bridge!");});
    server.begin();
}

void loop() {
    server.handleClient();
}

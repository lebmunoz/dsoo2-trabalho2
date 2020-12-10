#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

ESP8266WebServer server;
uint8_t pin_led = 2;
char* ssid = "Teste";
char* password = "test1234";

void setup() {
    pinMode(pin_led, OUTPUT);
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
    server.on("/toggle",toggleLED);
    server.begin();
}

void loop() {
    server.handleClient();
}

void toggleLED() {
    digitalWrite(pin_led,!digitalRead(pin_led));
    delay(500);
    server.send(204,"");
}

// === SIM CARD CODE WITH INTERNET ACCESS CHECK ===
// Set serial for debug console (to the Serial Monitor, default speed 115200)
#define SerialMon Serial

// Set serial for AT commands (to the module)
// Use Hardware Serial on Mega, Leonardo, Micro
#define SerialAT Serial1

#define TINY_GSM_MODEM_SIM7000
#define TINY_GSM_RX_BUFFER 1024 // Set RX buffer to 1Kb
#define SerialAT Serial1

// See all AT commands, if wanted
// #define DUMP_AT_COMMANDS

// set GSM PIN, if any
#define GSM_PIN ""

// Your GPRS credentials, if any
const char apn[]  = "indosatgprs";     // SET TO YOUR APN
const char gprsUser[] = "";         // GPRS user (leave blank if not needed)
const char gprsPass[] = "";         // GPRS password (leave blank if not needed)

#include <TinyGsmClient.h>
#include <SPI.h>
#include <SD.h>
#include <Ticker.h>

#ifdef DUMP_AT_COMMANDS
#include <StreamDebugger.h>
StreamDebugger debugger(SerialAT, SerialMon);
TinyGsm modem(debugger);
#else
TinyGsm modem(SerialAT);
#endif

#define UART_BAUD           9600
#define PIN_DTR             25
#define PIN_TX              27
#define PIN_RX              26
#define PWR_PIN             4

#define SD_MISO             2
#define SD_MOSI             15
#define SD_SCLK             14
#define SD_CS               13
#define LED_PIN             12

// Enable or disable debug mode for network status
bool debugMode = true;  

// Function to check GPRS and internet connectivity
void checkInternetConnection() {
    Serial.println("Checking GPRS connection...");
    
    if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
        Serial.println("GPRS connection failed. Restarting modem...");
        modemRestart();
        return;
    }
    
    Serial.println("GPRS connected.");
    
    // Now check for actual internet access by making a simple request
    TinyGsmClient client(modem);
    const char* host = "google.com";
    if (!client.connect(host, 80)) {
        Serial.println("Internet access failed. Could not connect to google.com.");
    } else {
        Serial.println("Internet access successful!");
        client.stop();
    }
    
    modem.gprsDisconnect();
}

void modemPowerOn() {
    pinMode(PWR_PIN, OUTPUT);
    digitalWrite(PWR_PIN, HIGH);
    delay(1000);    //Datasheet Ton minimum = 1S
    digitalWrite(PWR_PIN, LOW);
}

void modemPowerOff() {
    pinMode(PWR_PIN, OUTPUT);
    digitalWrite(PWR_PIN, HIGH);
    delay(1500);    //Datasheet Ton minimum = 1.2S
    digitalWrite(PWR_PIN, LOW);
}

void modemRestart() {
    modemPowerOff();
    delay(1000);
    modemPowerOn();
}

void setup() {
    SerialMon.begin(115200);
    delay(10);

    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, HIGH);

    modemPowerOn();
    SerialAT.begin(UART_BAUD, SERIAL_8N1, PIN_RX, PIN_TX);

    Serial.println("/**********************************************************/");
    Serial.println("To initialize the network test, please make sure your GPS");
    Serial.println("antenna has been connected to the GPS port on the board.");
    Serial.println("/**********************************************************/\n\n");

    delay(10000);
}

void loop() {
    // Test modem connectivity
    if (!modem.testAT()) {
        Serial.println("Failed to restart modem, attempting to continue without restarting");
        modemRestart();
        return;
    }

    // Check for GPRS connectivity and Internet access
    checkInternetConnection();

    // Add a delay before the next attempt
    delay(10000);
}

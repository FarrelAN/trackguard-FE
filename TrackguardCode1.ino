// // == WIFI & SIMCARD CODE ==

// // Set serial for debug console (to the Serial Monitor, default speed 115200)
// #define SerialMon Serial

// // Set serial for AT commands (to the module)
// // Use Hardware Serial on Mega, Leonardo, Micro
// #define SerialAT Serial1

// #define TINY_GSM_MODEM_SIM7000
// #define TINY_GSM_RX_BUFFER 1024 // Set RX buffer to 1Kb

// // See all AT commands, if wanted
// // #define DUMP_AT_COMMANDS

// // set GSM PIN, if any
// #define GSM_PIN ""

// // Your GPRS credentials, if any
// const char apn[]  = "YOUR-APN";     //SET TO YOUR APN
// const char gprsUser[] = "";
// const char gprsPass[] = "";

// // WiFi credentials
// const char* ssid = "KYLAU LT 2";     // Set to your Wi-Fi SSID
// const char* password = "kylauspace"; // Set to your Wi-Fi Password

// #include <WiFi.h>  // Include WiFi library for ESP32
// #include <TinyGsmClient.h>
// #include <SPI.h>
// #include <SD.h>
// #include <Ticker.h>

// #ifdef DUMP_AT_COMMANDS
// #include <StreamDebugger.h>
// StreamDebugger debugger(SerialAT, SerialMon);
// TinyGsm modem(debugger);
// #else
// TinyGsm modem(SerialAT);
// #endif

// #define uS_TO_S_FACTOR      1000000ULL  // Conversion factor for micro seconds to seconds
// #define TIME_TO_SLEEP       60          // Time ESP32 will go to sleep (in seconds)

// #define UART_BAUD           9600
// #define PIN_DTR             25
// #define PIN_TX              27
// #define PIN_RX              26
// #define PWR_PIN             4

// #define SD_MISO             2
// #define SD_MOSI             15
// #define SD_SCLK             14
// #define SD_CS               13
// #define LED_PIN             12

// bool isWifiConnected = false;  // To track if Wi-Fi is connected

// void enableGPS(void)
// {
//     modem.sendAT("+CGPIO=0,48,1,1");
//     if (modem.waitResponse(10000L) != 1) {
//         SerialMon.println("Set GPS Power HIGH Failed");
//     }
//     modem.enableGPS();
// }

// void disableGPS(void)
// {
//     modem.sendAT("+CGPIO=0,48,1,0");
//     if (modem.waitResponse(10000L) != 1) {
//         SerialMon.println("Set GPS Power LOW Failed");
//     }
//     modem.disableGPS();
// }

// void modemPowerOn()
// {
//     pinMode(PWR_PIN, OUTPUT);
//     digitalWrite(PWR_PIN, HIGH);
//     delay(1000);
//     digitalWrite(PWR_PIN, LOW);
// }

// void modemPowerOff()
// {
//     pinMode(PWR_PIN, OUTPUT);
//     digitalWrite(PWR_PIN, HIGH);
//     delay(1500);
//     digitalWrite(PWR_PIN, LOW);
// }

// void modemRestart()
// {
//     modemPowerOff();
//     delay(1000);
//     modemPowerOn();
// }

// void connectToWiFi()
// {
//     SerialMon.println("Connecting to Wi-Fi...");
//     WiFi.begin(ssid, password);

//     unsigned long startAttemptTime = millis();
    
//     // Wait for connection (10 seconds timeout)
//     while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
//         delay(100);
//         SerialMon.print(".");
//     }

//     if (WiFi.status() == WL_CONNECTED) {
//         isWifiConnected = true;
//         SerialMon.println("\nWi-Fi connected.");
//         SerialMon.print("IP Address: ");
//         SerialMon.println(WiFi.localIP());
//     } else {
//         isWifiConnected = false;
//         SerialMon.println("\nWi-Fi connection failed. Switching to GSM...");
//     }
// }

// void setup()
// {
//     SerialMon.begin(115200);
//     delay(10);

//     pinMode(LED_PIN, OUTPUT);
//     digitalWrite(LED_PIN, HIGH);

//     modemPowerOn();
//     SerialAT.begin(UART_BAUD, SERIAL_8N1, PIN_RX, PIN_TX);

//     SerialMon.println("/**********************************************************/");
//     SerialMon.println("To initialize the network test, please make sure your GPS");
//     SerialMon.println("antenna has been connected to the GPS port on the board.");
//     SerialMon.println("/**********************************************************/\n\n");

//     // First, try to connect to Wi-Fi
//     connectToWiFi();

//     // If Wi-Fi is not connected, proceed with GSM
//     if (!isWifiConnected) {
//         delay(10000);  // Allow time for the GSM modem to power on
//         if (!modem.testAT()) {
//             SerialMon.println("Failed to restart modem, attempting to continue without restarting");
//             modemRestart();
//         }
//     }
// }

// void loop()
// {
//     if (isWifiConnected) {
//         // Jika Wi-Fi terkoneksi, lakukan tugas terkait Wi-Fi (misal, HTTP requests atau MQTT)
//         SerialMon.println("Wi-Fi is active. Performing Wi-Fi tasks...");
//         delay(5000);  // Simulasi tugas menggunakan delay
//         // Keluarkan dari loop atau lakukan tugas lain di sini
//         // Misalnya, menambahkan mekanisme untuk kembali ke kondisi pengecekan Wi-Fi
//     } else {
//         // Jika Wi-Fi tidak terkoneksi, lakukan tugas terkait GSM
//         SerialMon.println("GSM is active. Performing GSM tasks...");

//         enableGPS();

//         float lat, lon;
//         unsigned long startGPSAttemptTime = millis();
//         bool gpsLocked = false;

//         // Loop untuk mendapatkan lokasi GPS, tetapi tambahkan timeout agar tidak terus-menerus looping
//         while (millis() - startGPSAttemptTime < 60000) {  // Timeout 60 detik
//             if (modem.getGPS(&lat, &lon)) {
//                 SerialMon.println("Lokasi terkunci. Latitude dan Longitude adalah:");
//                 SerialMon.print("Latitude: "); SerialMon.println(lat);
//                 SerialMon.print("Longitude: "); SerialMon.println(lon);
//                 gpsLocked = true;
//                 break;  // Keluar dari loop setelah mendapatkan lokasi
//             }
//             digitalWrite(LED_PIN, !digitalRead(LED_PIN));  // Blink LED selama menunggu
//             delay(2000);  // Beri waktu 2 detik sebelum mencoba lagi
//         }

//         if (!gpsLocked) {
//             SerialMon.println("GPS lock gagal dalam waktu yang diberikan.");
//         }

//         disableGPS();

//         SerialMon.println("/**********************************************************/");
//         SerialMon.println("Setelah tes jaringan selesai, silakan masukkan perintah AT di terminal serial.");
//         SerialMon.println("/**********************************************************/\n\n");

//         // Proses untuk membaca input AT, namun tanpa loop infinite
//         unsigned long startATCommandTime = millis();
//         while (millis() - startATCommandTime < 60000) {  // Batasi waktu input AT command
//             if (SerialAT.available()) {
//                 SerialMon.write(SerialAT.read());
//             }
//             if (SerialMon.available()) {
//                 SerialAT.write(SerialMon.read());
//             }
//             delay(100);  // Beri jeda agar tidak membebani prosesor
//         }
//         SerialMon.println("AT command selesai.");
//     }
// }



// // === 2. SIM CARD CODE ONLY ===
// // Set serial for debug console (to the Serial Monitor, default speed 115200)
// #define SerialMon Serial

// // Set serial for AT commands (to the module)
// // Use Hardware Serial on Mega, Leonardo, Micro
// #define SerialAT Serial1

// #define TINY_GSM_MODEM_SIM7000
// #define TINY_GSM_RX_BUFFER 1024 // Set RX buffer to 1Kb
// #define SerialAT Serial1

// // See all AT commands, if wanted
// // #define DUMP_AT_COMMANDS

// // set GSM PIN, if any
// #define GSM_PIN ""

// // Your GPRS credentials, if any
// const char apn[]  = "tri.co.id";  // Set to your APN
// const char gprsUser[] = "3gprs";
// const char gprsPass[] = "3gprs";

// #include <TinyGsmClient.h>
// #include <SPI.h>
// #include <SD.h>
// #include <Ticker.h>

// #ifdef DUMP_AT_COMMANDS
// #include <StreamDebugger.h>
// StreamDebugger debugger(SerialAT, SerialMon);
// TinyGsm modem(debugger);
// #else
// TinyGsm modem(SerialAT);
// #endif

// #define uS_TO_S_FACTOR      1000000ULL  // Conversion factor for micro seconds to seconds
// #define TIME_TO_SLEEP       60          // Time ESP32 will go to sleep (in seconds)

// #define UART_BAUD           9600
// #define PIN_DTR             25
// #define PIN_TX              27
// #define PIN_RX              26
// #define PWR_PIN             4

// #define SD_MISO             2
// #define SD_MOSI             15
// #define SD_SCLK             14
// #define SD_CS               13
// #define LED_PIN             12

// unsigned long startTime;
// bool firstLocation = true;

// // Function to adjust UTC time to WIB (UTC+7)
// String adjustToWIB(const String& gsmTime) {
//     // Extract year, month, day, hour, minute, second from the GSM DateTime string
//     int year, month, day, hour, minute, second;
//     sscanf(gsmTime.c_str(), "%d/%d/%d,%d:%d:%d", &year, &month, &day, &hour, &minute, &second);

//     // Add 7 hours for WIB (UTC+7)
//     hour += 7;

//     // Adjust the time if hour goes beyond 24
//     if (hour >= 24) {
//         hour -= 24;
//         day += 1;  // Adjust day if necessary (simple implementation for now)
//     }

//     // Check if the day exceeds the month's limit (not handling leap years or exact days in each month)
//     // This could be enhanced to handle month and year changes properly.
//     int daysInMonth[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
//     if (day > daysInMonth[month - 1]) {
//         day = 1;  // Reset day and increment month
//         month += 1;
//         if (month > 12) {
//             month = 1;
//             year += 1;
//         }
//     }

//     // Create a new formatted string for WIB time
//     char buffer[30];
//     sprintf(buffer, "%d/%02d/%02d,%02d:%02d:%02d WIB", year, month, day, hour, minute, second);
//     return String(buffer);
// }

// void enableGPS(void)
// {
//     modem.sendAT("+CGPIO=0,48,1,1");
//     if (modem.waitResponse(10000L) != 1) {
//         Serial.println("Set GPS Power HIGH Failed");
//     }
//     modem.enableGPS();
// }

// void disableGPS(void)
// {
//     modem.sendAT("+CGPIO=0,48,1,0");
//     if (modem.waitResponse(10000L) != 1) {
//         Serial.println("Set GPS Power LOW Failed");
//     }
//     modem.disableGPS();
// }

// void modemPowerOn()
// {
//     pinMode(PWR_PIN, OUTPUT);
//     digitalWrite(PWR_PIN, HIGH);
//     delay(1000);    //Datasheet Ton mintues = 1S
//     digitalWrite(PWR_PIN, LOW);
// }

// void modemPowerOff()
// {
//     pinMode(PWR_PIN, OUTPUT);
//     digitalWrite(PWR_PIN, HIGH);
//     delay(1500);    //Datasheet Ton mintues = 1.2S
//     digitalWrite(PWR_PIN, LOW);
// }

// void modemRestart()
// {
//     modemPowerOff();
//     delay(1000);
//     modemPowerOn();
// }

// void setup()
// {
//     SerialMon.begin(115200);
//     delay(10);

//     pinMode(LED_PIN, OUTPUT);
//     digitalWrite(LED_PIN, HIGH);

//     modemPowerOn();
//     SerialAT.begin(UART_BAUD, SERIAL_8N1, PIN_RX, PIN_TX);

//     Serial.println("/**********************************************************/");
//     Serial.println("To initialize the network test, please make sure your GPS");
//     Serial.println("antenna has been connected to the GPS port on the board.");
//     Serial.println("/**********************************************************/\n\n");

//     delay(10000);
//     startTime = millis();  // Start the timer when the program begins
// }

// void loop()
// {
//     if (!modem.testAT()) {
//         Serial.println("Failed to restart modem, attempting to continue without restarting");
//         modemRestart();
//         return;
//     }

//     Serial.println("Start positioning. Make sure to locate outdoors.");
//     Serial.println("The blue indicator light flashes to indicate positioning.");

//     enableGPS();

//     float lat, lon;
//     while (1) {
//         // Get GPS location
//         if (modem.getGPS(&lat, &lon)) {
//             if (firstLocation) {
//                 unsigned long elapsedTime = millis() - startTime;  // Calculate time until first location
//                 Serial.printf("Time to first GPS fix: %lu milliseconds\n", elapsedTime);
//                 firstLocation = false;
//             }

//             // Get real-time clock data if available
//             String gsmTime = modem.getGSMDateTime(DATE_FULL);  // Fetch real-time from GSM
//             String wibTime = adjustToWIB(gsmTime);  // Adjust the time to WIB
//             Serial.printf("Real-time (WIB): %s\n", wibTime.c_str());

//             // Print latitude and longitude
//             Serial.printf("latitude: %.6f\n", lat);  // Print latitude with 6 decimal places
//             Serial.printf("longitude: %.6f\n", lon); // Print longitude with 6 decimal places
//         } else {
//             Serial.println("Unable to get GPS location.");
//         }

//         delay(2000);  // Wait for 2 seconds before getting the location again
//     }

//     disableGPS();  // Disable GPS after exiting loop (not reached in this case)
// }


// === 3. WIFI & SIM CARD CODE ===

// Set serial for debug console (to the Serial Monitor, default speed 115200)
#define SerialMon Serial

// Set serial for AT commands (to the module)
#define SerialAT Serial1

#define TINY_GSM_MODEM_SIM7000
#define TINY_GSM_RX_BUFFER 1024 // Set RX buffer to 1Kb
#define SerialAT Serial1

// Set GSM PIN, if any
#define GSM_PIN ""

// Your GPRS credentials, if any
const char apn[]  = "tri.co.id";  // Set to your APN
const char gprsUser[] = "3gprs";
const char gprsPass[] = "3gprs";

// WiFi credentials
const char* ssid = "ADVAN CPE QNLP";     // Set to your Wi-Fi SSID
const char* password = "tr1ar1esta"; // Set to your Wi-Fi Password

#include <TinyGsmClient.h>
#include <WiFi.h>  // Include WiFi library for ESP32
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

#define uS_TO_S_FACTOR      1000000ULL  // Conversion factor for microseconds to seconds
#define TIME_TO_SLEEP       60          // Time ESP32 will go to sleep (in seconds)

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

unsigned long startTime;
bool firstLocation = true;
bool isWifiConnected = false;  // To track if Wi-Fi is connected
bool isGSMConnected = false;   // To track if GSM is connected

// Function to adjust UTC time to WIB (UTC+7)
String adjustToWIB(const String& gsmTime) {
    // Extract year, month, day, hour, minute, second from the GSM DateTime string
    int year, month, day, hour, minute, second;
    sscanf(gsmTime.c_str(), "%d/%d/%d,%d:%d:%d", &year, &month, &day, &hour, &minute, &second);

    // Add 7 hours for WIB (UTC+7)
    hour += 7;

    // Adjust the time if hour goes beyond 24
    if (hour >= 24) {
        hour -= 24;
        day += 1;  // Adjust day if necessary (simple implementation for now)
    }

    // Check if the day exceeds the month's limit (not handling leap years or exact days in each month)
    int daysInMonth[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    if (day > daysInMonth[month - 1]) {
        day = 1;  // Reset day and increment month
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
    }

    // Create a new formatted string for WIB time
    char buffer[30];
    sprintf(buffer, "%d/%02d/%02d,%02d:%02d:%02d WIB", year, month, day, hour, minute, second);
    return String(buffer);
}

void enableGPS(void)
{
    modem.sendAT("+CGPIO=0,48,1,1");
    if (modem.waitResponse(10000L) != 1) {
        Serial.println("Set GPS Power HIGH Failed");
    }
    modem.enableGPS();
}

void disableGPS(void)
{
    modem.sendAT("+CGPIO=0,48,1,0");
    if (modem.waitResponse(10000L) != 1) {
        Serial.println("Set GPS Power LOW Failed");
    }
    modem.disableGPS();
}

// Power control for the modem
void modemPowerOn()
{
    pinMode(PWR_PIN, OUTPUT);
    digitalWrite(PWR_PIN, HIGH);
    delay(1000);    //Datasheet Ton mintues = 1S
    digitalWrite(PWR_PIN, LOW);
}

void modemPowerOff()
{
    pinMode(PWR_PIN, OUTPUT);
    digitalWrite(PWR_PIN, HIGH);
    delay(1500);    //Datasheet Ton mintues = 1.2S
    digitalWrite(PWR_PIN, LOW);
}

void modemRestart()
{
    modemPowerOff();
    delay(1000);
    modemPowerOn();
}

// Connect to Wi-Fi
bool connectToWiFi() {
    SerialMon.println("Connecting to Wi-Fi...");
    WiFi.begin(ssid, password);

    unsigned long startAttemptTime = millis();
    
    // Wait for connection (10 seconds timeout)
    while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
        delay(100);
        SerialMon.print(".");
    }

    if (WiFi.status() == WL_CONNECTED) {
        isWifiConnected = true;
        SerialMon.println("\nWi-Fi connected.");
        SerialMon.print("IP Address: ");
        SerialMon.println(WiFi.localIP());
        return true;
    } else {
        SerialMon.println("\nWi-Fi connection failed.");
        return false;
    }
}

// Connect to GSM (SIM card)
bool connectToGSM() {
    SerialMon.println("Connecting to GSM network...");
    modem.restart();  // Restart the modem
    if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
        SerialMon.println("GSM connection failed.");
        return false;
    } else {
        SerialMon.println("GSM connected.");
        isGSMConnected = true;
        return true;
    }
}

void setup()
{
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

    // First, try to connect to Wi-Fi
    if (!connectToWiFi()) {
        SerialMon.println("Attempting to connect to GSM network instead...");
        connectToGSM();
    }

    delay(10000);  // Wait for modem and connection to stabilize
    startTime = millis();  // Start the timer when the program begins
}

void loop()
{
    // Print network status
    if (isWifiConnected) {
        SerialMon.println("Connected to Wi-Fi network.");
    } else if (isGSMConnected) {
        SerialMon.println("Connected to GSM network.");
    } else {
        SerialMon.println("No network connection available.");
    }

    if (!modem.testAT()) {
        Serial.println("Failed to restart modem, attempting to continue without restarting");
        modemRestart();
        return;
    }

    Serial.println("Start positioning. Make sure to locate outdoors.");
    Serial.println("The blue indicator light flashes to indicate positioning.");

    enableGPS();

    float lat, lon;
    while (1) {
        // Get GPS location
        if (modem.getGPS(&lat, &lon)) {
            if (firstLocation) {
                unsigned long elapsedTime = millis() - startTime;  // Calculate time until first location
                Serial.printf("Time to first GPS fix: %lu milliseconds\n", elapsedTime);
                firstLocation = false;
            }

            // Get real-time clock data if available
            String gsmTime = modem.getGSMDateTime(DATE_FULL);  // Fetch real-time from GSM
            String wibTime = adjustToWIB(gsmTime);  // Adjust the time to WIB
            Serial.printf("Real-time (WIB): %s\n", wibTime.c_str());

            // Print latitude and longitude
            Serial.printf("Latitude: %.6f\n", lat);  // Print latitude with 6 decimal places
            Serial.printf("Longitude: %.6f\n", lon); // Print longitude with 6 decimal places
        } else {
            Serial.println("Unable to get GPS location.");
        }

        delay(2000);  // Wait for 2 seconds before getting the location again
    }

    disableGPS();  // Disable GPS after exiting loop (not reached in this case)
}

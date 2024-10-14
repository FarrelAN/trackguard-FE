# Network Testing SIM7000G pada LilyGO T-SIM7000G

## Deskripsi Proyek
Proyek ini bertujuan untuk menginisialisasi dan menguji modem **SIM7000G** yang terpasang pada **LilyGO T-SIM7000G**. Pengujian ini mencakup pengecekan sinyal, preferensi jaringan, serta kemampuan modem untuk terhubung ke jaringan GSM/LTE.

Kode .ino untuk network testing ini dapat ditemukan di [Network Testing LilyGO T-SIM7000G](https://github.com/FarrelAN/trackguard-FE/blob/main/Trackguard%20Internet%20Testing/network_testing/network_test.ino)

### Perangkat yang Digunakan
- LilyGO T-SIM7000G
- Modem SIM7000G
- SD Card (opsional untuk penyimpanan data)
- Antena LTE

### Library yang Digunakan
- **TinyGsmClient** untuk komunikasi dengan modem SIM7000G
- **StreamDebugger** untuk debugging komunikasi serial

## Setup Perangkat

1. Pastikan koneksi hardware sesuai dengan konfigurasi pin berikut:
    - **Pin SIM7000G:**
      - TX: 27
      - RX: 26
      - PWR_PIN: 4
    - **Pin SD Card:**
      - MISO: 2
      - MOSI: 15
      - SCLK: 14
      - CS: 13
    - **Pin LED:**
      - LED_PIN: 12

2. Pastikan antena LTE terhubung dengan modem SIM7000G.

3. APN yang digunakan adalah APN Tri Default:
   - **APN:** `tri.co.id`
   - **Username:** `3gprs`
   - **Password:** `3gprs`

## Hasil Pengujian

### 1. **Inisialisasi Kartu SD**
   Modem berhasil diinisialisasi dengan keluaran berikut:
   ```plaintext
   SIMCOMATI Output:
   Revision: 1529B08SIM7000G
   CSUB: V01
   APRev: 1529B08SIM7000,V01
   QCN: MDM9206_TX3.0.SIM7000G_P1.03_20220415
   IMEI: 869951037023870
   ```

### 2. **Inisialisasi Modem**
   Inisialisasi kartu SD gagal dengan keluaran berikut:
   ```plaintext
   SDCard MOUNT FAIL
   ```
   Penyebab kegagalan bisa berasal dari tidak adanya SDCard yang dipasang.

### 3. **Preferensi Mode Jaringan**
   Modem menunjukkan preferensi mode jaringan berikut:
   - Preferred Mode: Automatic
     - Kode AT: ```+CNMP: 2```
   - Preferred Network Type: LTE-M
     - Kode AT: ```+CMNB: 2```

### 4. **Kualitas Sinyal dan Status Koneksi**
   Kualitas sinyal dan status koneksi akan ditampilkan setiap kali loop berjalan. Pengujian dapat dilihat dari keluaran berikut:
   ```plaintext
   ...
   16:06:05.590 -> Signal: 27 isNetworkConnected: NO CONNECT
   16:06:06.615 -> Signal: 27 isNetworkConnected: CONNECT
   16:06:06.615 ->
   16:06:06.615 -> Device is connected.
   ```
   Jika koneksi berhasil, output akan menunjukkan "CONNECT", sedangkan jika gagal, akan menampilkan "NO CONNECT".

### 5.**Informasi Sistem UE (User Equipment)**
   Setelah modem berhasil terhubung ke jaringan, informasi detail mengenai sistem UE dapat diakses menggunakan perintah AT +CPSI?. Berikut adalah hasil dari perintah tersebut:
   ```
   +CPSI: GSM,Online,510-21,0x0e99,8302,85 EGSM 900,-56,0,43-43-43
   ```
   Keterangan:
   - Jaringan: GSM
   - Status Koneksi: Online
   - Operator Jaringan: 510-21 (IM3)
   - Lokasi: 0x0e99, 8302
   - Frekuensi: EGSM 900 MHz
   - Kualitas Sinyal: -56 dBm (Sinyal cukup bagus)

## Hasil Output Keseluruhan

<details open>
<summary>Output Result:</summary>

```plaintext
16:05:46.125 -> SDCard MOUNT FAIL
16:05:46.125 -> ===========================
16:05:46.125 -> /**********************************************************/
16:05:46.125 -> To initialize the network test, please make sure your LTE 
16:05:46.125 -> antenna has been connected to the SIM interface on the board.
16:05:46.125 -> /**********************************************************/
16:05:46.169 -> 
16:05:46.169 -> 
16:05:56.149 -> ========INIT========
16:05:56.471 -> ========SIMCOMATI======
16:05:56.471 -> 
16:05:56.471 -> Revision:1529B08SIM7000G
16:05:56.471 -> CSUB:V01
16:05:56.471 -> APRev:1529B08SIM7000,V01
16:05:56.504 -> QCN:MDM9206_TX3.0.SIM7000G_P1.03_20220415
16:05:56.504 -> IMEI:869951037023870
16:05:56.504 -> 
16:05:56.504 -> =======================
16:05:56.504 -> =====Preferred mode selection=====
16:05:56.504 -> 
16:05:56.504 -> +CNMP: 2
16:05:56.504 -> 
16:05:56.504 -> =======================
16:05:56.504 -> =====Preferred selection between CAT-M and NB-IoT=====
16:05:56.504 -> 
16:05:56.504 -> +CMNB: 2
16:05:56.504 -> 
16:05:56.504 -> =======================
16:05:56.504 -> Modem Name: SIMCOM SIM7000G
16:05:56.504 -> Modem Info: SIM7000G R1529
16:05:56.504 -> Try 2 method
16:05:59.534 -> Signal: 27 isNetworkConnected: NO CONNECT
16:06:00.568 -> Signal: 27 isNetworkConnected: NO CONNECT
16:06:01.564 -> Signal: 27 isNetworkConnected: NO CONNECT
16:06:02.580 -> Signal: 27 isNetworkConnected: NO CONNECT
16:06:03.594 -> Signal: 27 isNetworkConnected: NO CONNECT
16:06:04.575 -> Signal: 27 isNetworkConnected: NO CONNECT
16:06:05.590 -> Signal: 27 isNetworkConnected: NO CONNECT
16:06:06.615 -> Signal: 27 isNetworkConnected: CONNECT
16:06:06.615 ->
16:06:06.615 -> Device is connected .
16:06:06.615 ->
16:06:06.615 -> ===-Inquiring UE system information==
16:06:06.649 ->
16:06:06.649 -> +CPSI: GSM,Online,510-21,0x0e99,8302,85 EGSM 900,-56,0,43-43-43
16:06:06.649 ->
16:06:06.649 ->
16:06:06.649 -> After the network test is complete, please enter the
16:06:06.649 -> AT command in the serial terminal.
```

</details>

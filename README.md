# TeslaChargejs
IOBroker basiertes PV-Überschuss Ladung mit Tesla Fahrzeugen unabhängig von der Wallbox


## Release Notes
### V 1.9.4
- Bugfix: Laden stoppt nicht (issue: #16,#14)
### V 1.9.3
- Neues Objekt ".TeslaChargejs.tesla_min_soc" erstellt
    - Ist der SoC des Autos unter dem Wert (Default 5%) wird das Laden mit der Maximalstromstärke gestartet bis der Mindest SoC erreicht ist
    - Den Wert des Objekts auf 0 setzen um die Funktion komplett zu deaktivieren
- Bugfix, Stopp des Skripts bei Start Stromstärke
### V 1.9.2
- Das Laden des Fahrzeugs wird automatisch gestoppt falls:
    - das Überschussladen aktiviert ist
    - das Auto zuhause steht 
    - es nach Sonnenuntergang und vor Sonnenaufgang ist
### V 1.9.1
- Falls nur ein Status für Einspeisung und Netzbezug vorhanden ist, erstellt das Skript 2 neue Objekte:
    -   0_userdata.0.TeslaChargejs.Einspeisung_dynamisch
    -   0_userdata.0.TeslaChargejs.Netzbezug_dynamisch
    -   Falls der Wert des einzelnen Objekts positiv ist --> Netzbezug = Wert; Einspeisung= 0
    -   Falls der Wert negativ ist -->  Netzbezug = 0; Einspeisung= Wert
-   Code Redesign
### V1.9
- Das Skript regelt nur zwischen Sonnenauf- und Untergang
- Bugfix: Start Stromstärke wird richtig gesetzt

### V1.8.1
- Bugfix-Maximalstromstärke wird gesetzt wenn Überschussladen deaktiviert
- Setze Start-Stromstärke schon wenn das Kabel angesteckt wird - Je nach Update Intervall des Tesla-Adapters kann das eine Weile dauern


### V1.7.1
- Bugfix- Mindest Soc PV-Anlage
- Maximale Stromstärke als Parameter hinzugefügt
- Feature: Hausakku Entladen hinzugefügt:
    -  Ein neues Objekt "Hausakku_entladen" wird angelegt (zum steuern) 
    -  Es wird mit maximaler Stromstärke geladen, bis der Hausakku den Mindest SoC fast erreicht hat
    -  Anschließend schaltet sich das Feature ab und der Hausakku-Stand wird gehalten
### V1.6.1 
- Doku überarbeitet

### V1.6 
- Überarbeitung Loging, Loglevel
- Telegramm Notifizierung hinzugefügt (Eingerichtete Telegramm Instanz notwendig)
- Netzbezug Vermeiden Option hinzugefügt

### V1.5
- Bugfix Berechnung mit PV Überschuss geladener Energy

### V1.4
- Unterstützung PV mit Akku -> Mindest Akkustand Start und Stopp
- Konfig-Sektion überarbeitet 

### V1.3 
- Energy_added monthly und Yearly wird direkt nach Ladung(entfernen des Kabels) berechnet
- Neues Objekt: korrigierte charging_phases: Statt 2 werden 3 Phasen angegeben
- Neues Objekt: Car Status: Online, Offline, Lädt, Schläft

### V1.2 
- Bufixing -> Wenn Stromstärke extern reguliert wird, beendet u.U. die Ladung

### V1.1 
- Energy-Added -> Auswertungen wieviel PV-Strom geladen wurde

### V1.0 
- Initiale Erstellung

## Beschreibung
Das Skript nutzt die Tesla API um ein PV-Überschussladen ohne smarte Wallbox zu ermöglichen. Das Skript funktioniert prinzipiell mit jeder Lademöglichkeit (Auch UMC/Ladeziegel).
Dabei kann je nach aktueller Leistung der PV Anlage und Hausverbrauch die Ladung gestartet/gestoppt werden oder die Stromstärke vollautomatisch angepasst werden.

### Features

- Automatisches Starten und Stoppen der Ladung, je nach Überschüssiger Leistung; Das Auto wird aufgeweckt falls es eingeschlafen ist
- Automatische Regulierung der Stromstärke je nach PV-Überschuss
- Per Geofencing wird sichergestellt, dass das Skript nur an der Heimischen Wallbox/UMC funktioniert
- Es ist keine intelligente Wallbox notwendig
- Unterstützung PV mit Akku (Mindest-SoC für Start und Stop der Ladung)
- Funktion Hausakku entladen:
    -  Ein neues Objekt "Hausakku_entladen" wird angelegt (zum steuern) 
    -  Es wird mit maximaler Stromstärke geladen, bis der Hausakku den Mindest SoC fast erreicht hat
    -  Anschließend schaltet sich das Feature ab und der Hausakku-Stand wird gehalten
- Benachrichtigung per Telegramm
- Berechnung wieviel Energy mit PV-Überschuss geladen wurde
- automatische Phasenerkennnung
- korrigierte Werte für Fahrzeugstatus und Charging Phases aus dem Teslaadapter (werden neu angelegt)

### Voraussetzungen

- Eine lauffähige ioBroker Instanz mit mindestens den folgenden eingerichteten Adaptern
    - javascript
    - tesla-motors
    - (optional) telegram
- Die folgenden des Wechselrichters oder Smartmeters müssen im ioBroker verfügbar sein:
    - Einspeiseleistung (in Watt)
    - Netzbezug (in Watt)
    - Optional:
      - SoC des PV-Akkus
      - Leistung (Ladung/Entladung) des PV Akkus
      - Status des PV-Akkus (Wird geladen/Entladen)
Das Skript funktioniert prinzipiell mit jedem Wechselrichter/Smartmeter, der sich an ioBroker anbinden lässt ( via Adapter oder Modbus). Die Verwendung eines Volkszählers ist ebenso möglich. 
Getestet wurde das mit den folgenden Wechselrichtern/Smartmetern:<br>

Hersteller | Modell | Methode/Adapter
-------- | -------- | --------
SolarEdge   | SE5000 HD   | Modbus TCP / Modbus Adapter
Kostal   | Smart Energy Meter (KSEM)   | Modbus TCP / Modbus Adapter
SMA | SMA Homemanger 2.0|


### Einrichtung

1. Ein neues Javascript - Skript erzeugen
2. Die Daten in der Sektion Einstellungen/Konfiguration ergänzen, ausfüllen
3. Das Skript speichern und schließen

**Hinweis**
Das Skript erzeugt verschiedene neue Objekte im Skript Objekt Verzeichnis. Mit dem Objekt Ueberschussladen_aktiv kann die Funktionalität an und ausgeschalten werden. Im Standard ist das Skript angeschaltet. 

# TeslaChargejs
IOBroker basiertes PV-Überschuss Ladung mit Tesla Fahrzeugen unabhängig von der Wallbox


## Release Notes
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


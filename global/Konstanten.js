//Hierwerden alle verwendeten Objekt IDS Global zur Verfügung gestellt


//=======================================================
//====================IDS================================
//====================Allgemein==========================
const ID_ANWESENHEIT            = "javascript.0.Globale_Variablen.bAnwesenheit";
const ID_HEIZUNG_AKTIV          = "javascript.0.Globale_Variablen.bHeizung_aktiv";
const ID_KUEHLUNG_AKTIV         = "javascript.0.Globale_Variablen.bKuehlung_aktiv";
const ID_ALARMAKTIV             = "javascript.0.Globale_Variablen.bAlarmanlageaktiv";
const ID_ALARMPRESET            = "javascript.0.Globale_Variablen.bAlarmanlagePreset";
const ID_ALARMAUSGELOEST        = "javascript.0.Globale_Variablen.bAlarmanlageausgeloest";
const ID_SCHLAFEN               = "javascript.0.Globale_Variablen.bSchlafen";
const ID_URLAUB                 = "javascript.0.Globale_Variablen.bUrlaubsmodus";
//const ID_MIHOMEGATEWAY          = "mihome.0.devices.gateway_286c07892612";
const ID_VIS_ROLLADEN_WZ        = "javascript.0.VIS.RolladenWZ";
const EXEPT_TV_SCHLAFZIMMER     = 1149;
const ID_PV_UEBERSCHUSS         = "javascript.0.Globale_Variablen.bPV_Ueberschuss";
const ID_PV_ABDECKUNG           = "javascript.0.Globale_Variablen.bPV_Abdeckung";
const ID_CURRENT_WEATHER        = "daswetter.0.NextHours.Location_1.Day_1.current.symbol_desc";
const ID_AVG_AUSSENTEMPERATUR   = "javascript.0.NibeUplink.System_45464.Mittlere_Aussentemperatur";

//==================Buttons==============================
const ID_BTN_LADESTATION        = "zigbee.0.00158d00011c3cab";
const ID_BTN_MARA               = "zigbee.0.00158d000121095d";
const ID_BTN_TESSA              = "zigbee.0.00158d00022cc14f"; 
const ID_BTN_SCHLAFZIMMER_1     = "zigbee.0.00158d0001b12941";
const ID_BTN_BAD                = "zigbee.0.00158d000155c176";
const ID_SWITCH_KUECHE          = "zigbee.0.04cd15fffe2fd889.state";

//==================DIMMER===============================

//==================Bewegungsmelder======================
const ID_PIR_KUECHE_2           = "zigbee.0.00158d0001188def.occupancy"; //Schrank
const ID_PIR_KUECHE_1           = "zigbee.0.00158d00011c31d5.occupancy"; //Insel
const ID_PIR_FLUR_TUER          = "zigbee.0.00158d00012f2948.occupancy";
const ID_PIR_FLUR_BANK          = "zigbee.0.00158d0001a9eb41.occupancy";
const ID_PIR_FLUR_OG            = "zigbee.0.00158d00027520aa.occupancy";
const ID_PIR_BAD_1              =  "zigbee.0.00158d0001d588d3.occupancy"; //Dusche
const ID_PIR_BAD_2              =  "zigbee.0.00158d0001a90568.occupancy"; //Spiegel
const ID_PIR_BAD_3              =  "zigbee.0.00158d00029c4385.occupancy";//Tuer
const ID_PIR_AUSSEN             =  "zigbee.0.00158d0001dc1490.occupancy";

//==================Lichtstärke==========================
const ID_LUX_FLUR_OG            = "zigbee.0.00158d00027520aa.illuminance";
const ID_LUX_Bad                = "zigbee.0.00158d00029c4385.illuminance";

//==================Wassermelder=========================

const ID_LEAK_WASCHMASCHINE     = "zigbee.0.00158d0001bb60af.detected";
const ID_LEAK_KUECHE            = "zigbee.0.00158d0001c32ce9.detected";
const ID_LEAK_HEIZUNG           = "zigbee.0.00158d0001bb8b10.detected";
const ID_LEAK_BADEWANNE         = "zigbee.0.00158d0001c1b23c.detected";

//===================Tür/Fenstersensoren=================

const ID_DWS_TUER_HAUSTUER      = "zigbee.0.00158d000125a0ab.opened";
const ID_DWS_BRIEFKASTEN        = "zigbee.0.00158d0001a99e9d.opened";
const ID_DWS_TUER_TECHNIKRAUM   = "zigbee.0.00158d0001bf27c7.opened";
const ID_DWS_TUER_SCHLAFZIMMER  = "zigbee.0.00158d0001c02ef3.opened";
const ID_DWS_KLINGEL            = "zigbee.0.00158d0002339599.contact";



//===================Distanzsensor=======================

const ID_DST_DISTANZSENSOR_GARTENHAUS = "sonoff.0.DVES_0A29CF.SR04_Distance";
//====================Rolladen===========================

const ID_ROLLADEN_EZ_NORD       = "shelly.0.SHSW-25#B94327#1.Shutter";
const ID_ROLLADEN_EZ_OST        = "shelly.0.SHSW-21#32BF4F#1.Shutter";
const ID_ROLLADEN_KUECHE_1      = "shelly.0.SHSW-25#00B7FD#1.Shutter";
const ID_ROLLADEN_KUECHE_2      = "shelly.0.SHSW-25#00B30B#1.Shutter";
const ID_ROLLADEN_WZ_OST_1      = "shelly.0.SHSW-21#32B689#1.Shutter";
const ID_ROLLADEN_WZ_OST_2      = "shelly.0.SHSW-21#32B9F9#1.Shutter";
const ID_ROLLADEN_WZ_SUED       = "shelly.0.SHSW-21#32AFD6#1.Shutter";
const ID_ROLLADEN_BAD           = "shelly.0.SHSW-25#68669C#1.Shutter";
const ID_ROLLADEN_AZ            = "shelly.0.SHSW-25#E62C87#1.Shutter";
const ID_ROLLADEN_WC            = "shelly.0.SHSW-25#E62C15#1.Shutter";
const ID_ROLLADEN_SZ            = "shelly.0.SHSW-25#E5F73D#1.Shutter";
const ID_ROLLADEN_DF_WEST_1     = "shelly.0.SHSW-25#B8A5A9#1.Shutter";
const ID_ROLLADEN_DF_WEST_2     = "shelly.0.SHSW-25#B94DF2#1.Shutter";

//====================Beleuchtung(Milight)================
const ID_LIGHTML_FLUR_EG        = "milight.0.zone3";
const ID_LIGTHML_FLUR_OG        = "milight.0.zone1";
const ID_LIGHTML_WZ             = "milight.0.zone4";
const ID_LIGHTML_KUECHE         = "milight.0.zone2";

//=====================Beleuchtung(YeeLight)==============
const ID_LIGHTYL_TESSA          = "yeelight-2.0.Licht_Tessa.control";
const ID_LIGHTYL_BAD            = "yeelight-2.0.Licht_Bad.control";

//=====================Beleuchtung(Shelly)================
const ID_LIGHTSH_GARAGE             = "shelly.0.SHRGBW2#6D2BB9#1.lights.Switch";
const ID_LIGHTSH_KUECHE             = "shelly.0.SHSW-1#1154F5#1.Relay0.Switch";
const ID_LIGHTSH_ESSZIMMER          = "shelly.0.SHSW-1#111CDE#1.Relay0.Switch";
const ID_LIGHTSH_LICHT_LED_STRIPE   = "shelly.0.SHRGBW2#26141C#1.lights.Switch";
const ID_LIGHTSH_LICHT_SPOTS        = "shelly.0.SHDM-2#3C6105E34C75#1.lights.Switch";

//=====================Beleuchtung(Sonstiges)
const ID_LIGHT_TESSA_NACHTISCHLAMPE             = "sonoff.0.DVES_AA742D";
const ID_LIGHT_TESSA_NACHTISCHLAMPE_POWER       = ID_LIGHT_TESSA_NACHTISCHLAMPE+ ".POWER";
const ID_LIGHT_MARA_WECKER                      = "sonoff.0.DVES_DB9B60";
const ID_LIGHT_MARA_WECKER_STRIPE_POWER         = ID_LIGHT_MARA_WECKER + ".POWER5";
const ID_LIGHT_MARA_WECKER_DISPLAY_POWER        = ID_LIGHT_MARA_WECKER + ".POWER6";
const ID_LIGHT_MARA_WECKER_SPITZE_LINKS         = ID_LIGHT_MARA_WECKER + ".POWER2";
const ID_LIGHT_MARA_WECKER_SPITZE_OBEN          = ID_LIGHT_MARA_WECKER + ".POWER3";
const ID_LIGHT_MARA_WECKER_SPITZE_RECHTS        = ID_LIGHT_MARA_WECKER + ".POWER4";
//=====================Temperaturen========================
const ID_TEMP_TESSA             = "zigbee.0.00158d000247d55d.temperature";
const ID_TEMP_AZ                = "zigbee.0.00158d0001e423a6.temperature";
const ID_TEMP_KUECHE            = "zigbee.0.00158d0001e455f6.temperature";
const ID_TEMP_WZ                = "zigbee.0.00158d0001fa5c57.temperature";
const ID_TEMP_SZ                = "zigbee.0.00158d0001fa814b.temperature";
const ID_TEMP_BAD               = "zigbee.0.00158d0001fa98d3.temperature";
const ID_TEMP_MARA              = ID_LIGHT_MARA_WECKER + ".DS18B20_Temperature";
const ID_TEMP_AUSSEN            = "javascript.0.NibeUplink.System_45464.Aussentemperatur";


//====================Schaltsteckdosen====================
//const ID_SW_HEIZUNG_WICKELTISCH = "zigbee.0.84182600000fa570.state";
const ID_SW_TV                  = "sonoff.0.DVES_250AFE.POWER";
const ID_SW_AUSSENBELEUCHTUNG   = "shelly.0.SHSW-21#5B258C#1.Relay1.Switch";

const ID_SW_LICHT_ANKLEIDE      = "sonoff.0.DVES_9826E4.POWER";
const ID_SW_LICHT_TECHNIKRAUM   = "sonoff.0.DVES_97F3F8.POWER";
const ID_SW_TV_SCHLAFZIMMER     = "sonoff.0.DVES_12B5A2.POWER";
const ID_SW_POOLPUMPE           = "shelly.0.SHSW-1#C45BBE56E8DA#1.Relay0.Switch";

const ID_SW_CHARGE_TABLET       = "zigbee.0.7cb03eaa00b07e9f.state";
//const ID_Licht_3DDrucker        = "zigbee.0.84182600000fa570.state";
const ID_SW_3DDRUCKER           = "zigbee.0.84182600000fa570.state";

//Leistungsmessung
const ID_PW_PV_ANLAGE           = "shelly.0.SHSW-PM#E89F6D85EF4F#1.Relay0.Power";
const ID_EN_PV_ANLAGE           = "shelly.0.SHSW-PM#E89F6D85EF4F#1.Relay0.Energy";

//===================Device_ALIVE===========================
const ID_ALIVE_AUSSENBELEUCHTUNG = "sonoff.0.DVES_726210.alive";
const ID_ALIVE_LICHT_ANKLEIDE   = "sonoff.0.DVES_9826E4.alive";
const ID_ALIVE_LICHT_TECHNIKRAUM= "sonoff.0.DVES_97F3F8.alive";
const ID_ALIVE_UEBERSCHUSS      = "sonoff.0.DVES_376B93.alive";

//===================Weihnachtsbeleuchtung====================
//const ID_WEIHNACHTSBAUM                = "sonoff.0.DVES_376B93.POWER";
//const ID_SW_STERN                      = "shelly.0.SHPLG2-1#6D9B7F#1.Relay0.Switch";
//const ID_SW_AUSSENBELEUCHTUNG_BAUM     = "shelly.0.SHSW-1#C45BBE56E8DA#1.Relay0.Switch";
//const ID_AUSSENBELEUCHTUNG_GARTENHAUS  = "sonoff.0.DVES_79CD2C.POWER";
//const ID_LICHTERKETTE_TESSA            = "hs100.0.192_168_2_115.state";



//====================ALEXA===============================
const ID_ALEXA_WZ               = "alexa2.0.Echo-Devices.G2A0WK04851400NB"; 
const ID_ALEXA_WZ_SPEAK         = ID_ALEXA_WZ + ".Commands.speak";
const ID_ALEXA_WZ_TUNEIN        = ID_ALEXA_WZ + ".Music-Provider.TuneIn";
const ID_ALEXA_WZ_VOLUME        = ID_ALEXA_WZ + ".Player.volume";
const ID_ALEXA_WZ_PAUSE        = ID_ALEXA_WZ + ".Player.controlPause";

const ID_ALEXA_BAD              = "alexa2.0.Echo-Devices.G2A0P30774550HP0";
const ID_ALEXA_BAD_SPEAK        = ID_ALEXA_BAD + ".Commands.speak";
const ID_ALEXA_BAD_TUNEIN       = ID_ALEXA_BAD + ".Music-Provider.TuneIn";
const ID_ALEXA_BAD_VOLUME       = ID_ALEXA_BAD + ".Player.volume";
const ID_ALEXA_BAD_PAUSE        = ID_ALEXA_BAD + ".Player.controlPause";
const ID_ALEXA_BAD_GOODMORNING  = ID_ALEXA_BAD + ".Commands.goodmorning";

//====================IP-GEräte========================================
const ID_SMARTPHONE_TORSTEN     = "tr-064.0.devices.S20-FE-von-Torsten.active";
const ID_SMARTPHONE_LISA        = "tr-064.0.devices.M2101K9AG.active"; 
const ID_TABLET_WAND            = "fullybrowser.0.192_168_2_188";
const ID_TABLET_WAND_BATTLVL    = ID_TABLET_WAND+".Info.batteryLevel";
const ID_TABLET_WAND_PLUGGED    = ID_TABLET_WAND+".Info.plugged";
const ID_TABLET_WAND_SCREEN_ON  = ID_TABLET_WAND + ".Commands.screenOn";
const ID_TABLET_WAND_SCREEN_OFF = ID_TABLET_WAND + ".Commands.screenOff";
const ID_TABLET_WAND_LOADSTARTURL   = ID_TABLET_WAND + ".Commands.loadStartURL";
const ID_TABLET_WAND_LOADURL    = ID_TABLET_WAND + ".Commands.loadURL";
const ID_CAM_GARTENHAUS         = "eufy-security.0.T8442P1121370616.cameras.T8442P1121370616";
const ID_CAM_GARTENHAUS_MOTION_DETECTED = ID_CAM_GARTENHAUS + ".motion_detected";

//===================Tesla==========================================
const ID_TESLA = "tesla-motors.0.LRW3E7EKXNC514071";
const ID_TESLA_STATE = ID_TESLA + ".state";
const ID_TESLA_POWER = ID_TESLA + ".streamData.power";
const ID_TESLA_SPEED = ID_TESLA + ".streamData.speed_km";
const ID_TESLA_SOC = ID_TESLA + ".charge_state.battery_level";
const ID_TESLA_MINUTES_TO_FULL = ID_TESLA + ".charge_state.minutes_to_full_charge";
const ID_TESLA_EST_RANGE = ID_TESLA + ".streamData.est_range_km";

const ID_TESLA_BATTERY_HEATER = ID_TESLA + ".climate_state.battery_heater";
const ID_TESLA_IS_AUTOCONDITIONING = ID_TESLA + ".climate_state.is_auto_conditioning_on";

const ID_TESLA_CMD_WAKEUP = ID_TESLA + ".remote.wake_up";
const ID_TESLA_CHARGEPORT_OPEN = ID_TESLA + ".charge_state.charge_port_door_open";
const ID_TESLA_CMD_CHARGEPORT_OPEN = ID_TESLA + ".remote.charge_port_door_open";
const ID_TESLA_CMD_CHARGEPORT_CLOSE = ID_TESLA + ".remote.charge_port_door_close";
const ID_TESLA_CMD_CHARGE_START = ID_TESLA + ".remote.charge_start";
const ID_TESLA_CMD_CHARGE_STOP = ID_TESLA + ".remote.charge_stop";
const ID_TESLA_LATITUDE = ID_TESLA + ".drive_state.latitude";
const ID_TESLA_LONGITUDE = ID_TESLA + ".drive_state.longitude";
const TESLA_ZUHAUSE_LATITUDE              = 50.976446; //Breitengrad Koordinaten
const TESLA_ZUHAUSE_LONGITUDE             = 11.264414; //Längengrad Koordinaten , 
const TESLA_ZUHAUSE_MAX_ENTFERNUNG        = 0.5 ; //KM  - Entfernung des Autos von Zuhause




//==================Go-E================================================
const ID_GOE_STATE              = "go-e.0.car";
const ID_GOE_CURRENT            = "go-e.0.ampere";
const ID_GOE_CURRENTPV          = "go-e.0.amperePV";

const ID_GOE_ACCESS_STATE       = "go-e.0.access_state";
const ID_GOE_TEMPERATUR         = "go-e.0.temperatures.maintempereature";
const ID_GOE_LOADED_ENERGY      = "go-e.0.loaded_energy_kwh";
const ID_GOE_LOADED_ENERGY_TOTAL = "go-e.0.energy.total";
const ID_GOE_Voltage_L1         = "go-e.0.energy.phase1.voltage";
const ID_GOE_Voltage_L2         = "go-e.0.energy.phase2.voltage";
const ID_GOE_Voltage_L3         = "go-e.0.energy.phase3.voltage";
const ID_GOE_Voltage_N          = "go-e.0.energy.neutral.voltage";
const ID_GOE_EXCESS_LOAD        = "javascript.0.Go-E.Excess_Load";
const ID_GOE_THREE_PHASE        = "javascript.0.Go-E.Three_Phase";
const ID_GOE_CHARGE_POWER       = "go-e.0.energy.power";
const ID_GOE_CHARGE_POWER_MAX   = "javascript.0.Go-E.Charge_Power_Max";

//Heizung/Lüftung

const ID_LUEFTUNG_HOCH          = "javascript.0.NibeUplink.System_45464.NibeControl.Output03";
const ID_LUEFTUNG_AUS           = "javascript.0.NibeUplink.System_45464.NibeControl.Output04";
const ID_LUEFTUNG_NORMAL        = "javascript.0.NibeUplink.System_45464.NibeControl.Fan_normal";

//===================Photovoltaik======================================
const ID_PVMB_EP_LEISTUNG  = "modbus.0.holdingRegisters.40083_AC_Leistung_Gesamt"; //Eigenproduktion
const ID_PVMB_EP_LEISTUNG_SF = "modbus.0.holdingRegisters.40084_AC_Leistung_Skalierungsfaktor";
const ID_PVMB_EINSPEISUNG_LEISTUNG = "modbus.0.holdingRegisters.40206_Leistung_Einspeisung";
const ID_PVMB_EINSPEISUNG_LEISTUNG_SF = "modbus.0.holdingRegisters.40210_Leistung_Einspeisung_Skalierungsfaktor";
const ID_PVMB_AKKUSTAND               = "modbus.0.holdingRegisters.62852_Batterieladestand";
const ID_PVMB_AKKU_LEISTUNG         = "modbus.0.holdingRegisters.62836_Leistung_AKku";
const ID_PVMB_AKKU_STATUS             = "modbus.0.holdingRegisters.62854_Batteriestatus";
const ID_PVMB_ENERGIE_TOTAL = "modbus.0.holdingRegisters.40093_AC_Gesamtproduktion";
const ID_PVMB_EINSPEISUNG_TOTAL= "modbus.0.holdingRegisters.40226_Einspeisung_Gesamt";
const ID_PVMB_NETZBEZUG_TOTAL= "modbus.0.holdingRegisters.40234_Netzbezug_Gesamt";
const ID_PV_AKKUSTAND       =  "javascript.0.PV-Anlage.Akkustand";
const ID_PV_AKKU_STATUS     =  "javascript.0.PV-Anlage.Akku_Status";
const ID_PV_AKKU_LEISTUNG   =  "javascript.0.PV-Anlage.Akku_Leistung";
const ID_PV_NETZBEZUG_LEISTUNG = "javascript.0.PV-Anlage.Leistung_Netzbezug";
const ID_PV_NETZEINSPEISUNG_LEISTUNG = "javascript.0.PV-Anlage.Leistung_Netzeinspeisung";
const ID_PV_EIGENVERBRAUCH_LEISTUNG = "javascript.0.PV-Anlage.Leistung_Eigenproduktion"
const ID_PV_HAUSVERBRAUCH_LEISTUNG = "javascript.0.PV-Anlage.Leistung_Hausverbrauch";
const ID_PV_PRODUKTION_LEISTUNG = "javascript.0.PV-Anlage.Leistung_PV-Produktion"; 
const ID_PV_EIGENVERBRAUCH_AUS_PV = "javascript.0.PV-Anlage.Leistung_Eigenverbrauch_aus_PV";
const ID_PV_GESAMT_LEISTUNG="0_userdata.0.PV-Anlage.Leistung_PV_Gesamt";
const ID_PV_GARAGE_LEISTUNG="0_userdata.0.PV-Anlage.Leistung_PV_Garage";


//===================Gruppen=================================
const GRP_ROLLADEN_ALLE         = [ID_ROLLADEN_EZ_NORD, ID_ROLLADEN_WZ_OST_2, ID_ROLLADEN_EZ_OST,ID_ROLLADEN_WZ_OST_1,
                                   ID_ROLLADEN_WZ_SUED,ID_ROLLADEN_BAD, ID_ROLLADEN_KUECHE_1,ID_ROLLADEN_KUECHE_2, 
                                   ID_ROLLADEN_AZ,ID_ROLLADEN_WC,ID_ROLLADEN_SZ, ID_ROLLADEN_DF_WEST_1, ID_ROLLADEN_DF_WEST_2];
const GRP_ROLLADEN_KUEHLUNG     = [ID_ROLLADEN_EZ_NORD, ID_ROLLADEN_WZ_SUED,ID_ROLLADEN_KUECHE_1,ID_ROLLADEN_KUECHE_2, 
                                   ID_ROLLADEN_WC,ID_ROLLADEN_DF_WEST_1, ID_ROLLADEN_DF_WEST_2];
const GRP_ROLLADEN_KUEHLUNG_2    = [ID_ROLLADEN_EZ_OST,ID_ROLLADEN_WZ_OST_1,
                                   ID_ROLLADEN_BAD]; // Diese Rolläden werden im Kühlmodus nur kurz geöffnet
const GRP_ROLLADEN_WZ           = [ID_ROLLADEN_EZ_NORD, ID_ROLLADEN_WZ_OST_2, ID_ROLLADEN_EZ_OST,ID_ROLLADEN_WZ_OST_1,ID_ROLLADEN_WZ_SUED,
                                   ID_ROLLADEN_KUECHE_1,ID_ROLLADEN_KUECHE_2];
const GRP_ROLLADEN_EG           = [ID_ROLLADEN_EZ_NORD, ID_ROLLADEN_WZ_OST_2, ID_ROLLADEN_EZ_OST,ID_ROLLADEN_WZ_OST_1,ID_ROLLADEN_WZ_SUED,
                                   ID_ROLLADEN_KUECHE_1,ID_ROLLADEN_KUECHE_2, ID_ROLLADEN_AZ,ID_ROLLADEN_WC];
const GRP_ROLLADEN_DG           = [ID_ROLLADEN_DF_WEST_1,ID_ROLLADEN_DF_WEST_2,ID_ROLLADEN_BAD, ID_ROLLADEN_SZ];

const GRP_PIR_ALLE              = [ID_PIR_BAD_1,ID_PIR_BAD_2,ID_PIR_BAD_3,ID_PIR_KUECHE_1,ID_PIR_KUECHE_2,ID_PIR_FLUR_TUER,ID_PIR_FLUR_BANK];
const GRP_PIR_KUECHE            = [ID_PIR_KUECHE_1,ID_PIR_KUECHE_2];
const GRP_PIR_FLUR              = [ID_PIR_FLUR_TUER,ID_PIR_FLUR_BANK];
const GRP_PIR_BAD               = [ID_PIR_BAD_1,ID_PIR_BAD_2,ID_PIR_BAD_3];

const GRP_BTN_SCHLAFZIMMER_LONG = [ID_BTN_SCHLAFZIMMER_1+".long_click"];
const GRP_BTN_SCHLAFZIMMER_DBL  = [ID_BTN_SCHLAFZIMMER_1+".double_click"];


const GRP_LIGHTML_ALLE          = [ID_LIGHTML_FLUR_EG,ID_LIGTHML_FLUR_OG,ID_LIGHTML_WZ,ID_LIGHTML_KUECHE];
const GRP_LIGHTML_EG            = [ID_LIGHTML_FLUR_EG,ID_LIGHTML_WZ,ID_LIGHTML_KUECHE];

const GRP_TEMP_WOHNRAUM         = [ID_TEMP_TESSA,ID_TEMP_AZ, ID_TEMP_KUECHE, ID_TEMP_WZ, ID_TEMP_BAD];
const GRP_TEMP_SCHLAFRAUM       = [ID_TEMP_SZ, ID_TEMP_MARA];



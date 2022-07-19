//Hier werden alle Konstanten gespeichert, die mit dem Nibe Data_Load Skript in Verbindung stehen

//================================System-Codes========
const ID_SYSTEM_OWN                 =   "45464" ; //Eigener Systemcode



//===============================Sonstige==================================
ID_NIBE_UEBERSCHUSS00 = "javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_00";
ID_NIBE_UEBERSCHUSS01 = "javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_01";
ID_NIBE_UEBERSCHUSS02 = "javascript.0.NibeUplink.System_45464.NibeControl.Ueberschuss_02";

//===============================Paramenter======================================



//Hier die Parameter Definieren [IDAUS QUELLCODE, NAME des Datenpunkts in ioBroker,Einheit];

const PARAM_AUSSENTEMPERATUR        = ["ID40004","Aussentemperatur","°C"];
const PARAM_BW_OBEN                 = ["ID40013","Brauchwasser_oben","°C"];
const PARAM_BRAUCHWASSERBEREITUNG   = ["ID40014","Brauchwasserbereitung","°C"];
const PARAM_MITT_AUSSENTEMPERATUR   = ["ID40067","Mittlere_Aussentemperatur","°C"];
const PARAM_STROM_L1                = ["ID40083","Strom_L1","A"];
const PARAM_STROM_L2                = ["ID40081","Strom_L2","A"];
const PARAM_STROM_L3                = ["ID40079","Strom_L3","A"];
const PARAM_GRADMINUTEN             = ["ID43005","Gradminuten","GM"];
const PARAM_VD_BLOCKIERT            = ["ID10012","Verdichter_blockiert",""];
const PARAM_VD_STARTS               = ["ID43416","Verdichter_starts",""];
const PARAM_DZ_WQ_Pumpe             = ["ID43439","Drehzahl_WQ_Pumpe","%"];
const PARAM_PG_WARMETRAEGER         = ["ID43437","Pumpengeschwindigkeit_Waermetraeger","%"];
const PARAM_FLUESSIGKEITSLEITUNG    = ["ID40019","Fluessigkeitsleitung","°C"];
const PARAM_HEISSGAS                = ["ID40018","Heissgas","°C"];
const PARAM_KT_EIN                  = ["ID40015","Kaeltetraeger_ein","°C"];
const PARAM_KOND_VORLAUF            = ["ID40017","Kondensator_Vorlauf","°C"];
const PARAM_KT_AUS                  = ["ID40016","Kaeltetraeger_aus","°C"];
const PARAM_RUECKLAUF               = ["ID40012","Ruecklauftemperatur","°C"];
const PARAM_SAUGGAS                 = ["ID40022","Sauggas","°C"];
const PARAM_VORLAUF                 = ["ID40008","Vorlauftemperatur","°C"];
const PARAM_BT_VERDICHTER           = ["ID43420","Betriebszeit_Verdichter","h"];
const PARAM_BT_Verdichter_BW        = ["ID43424","Betriebszeit_Verdichter_BW","h"];
const PARAM_AKT_VERDICHTER_FREQUENZ = ["ID43136","aktuelle_Verdichter_Freqenz","Hz"];
const PARAM_MIN_VERDICHTER_FREQUENZ = ["ID43122","minimale_Verdichter_Frequenz","Hz"];   
const PARAM_BODENTROCKNUNG          = ["ID47276","Bodentrocknung",""];
const PARAM_EXT_JUSTIERUNG          = ["ID43161","externe_Justierung",""];
const PARAM_BER_VORLAUFTEMPERATUR   = ["ID43009","berechnete Vorlauftemperatur","°C"];
const PARAM_EXT_VORLAUFTEMPERATUR   = ["ID40071","externe_Vorlauftemperatur","°C"];
const PARAM_RAUMTEMPERATUR          = ["ID40033","Raumtemperatur","°C"];
const PARAM_ZH_BLOCKIERT            = ["ID10033","Zusatzheizung_blockiert",""];
const PARAM_ZH_SICHERUNGSGROESSE    = ["ID47214","Zusatzheizung_Sicherungsgroesse","A"];
const PARAM_ZH_ZEITFAKTOR           = ["ID43081","ZH_Zeitfaktor","h"];
const PARAM_ZH_LEISTUNG             = ["ID43084","ZH_Leistung","W"];
const PARAM_ZH_MAX_LEISTUNG         = ["ID47212","ZH_max_Leistung","W"];
const PARAM_WM_BW_INKL_ZH           = ["ID44298","Waermemenge_BW_inkl_ZH","kWh"];
const PARAM_WM_BW                   = ["ID44306","Waermemenge_BW","kWh"];
const PARAM_WM_HZ                   = ["ID44308","Waermemenge_Heizung","kWh"];
const PARAM_WM_POOL                 = ["ID44304","Waermemenge_Pool","kWh"];
const PARAM_WM_POOL2                = ["ID40771","Waermemenge_Pool2","kWh"];
const PARAM_wm_HZ_INKL_ZH           = ["ID44300","Waermemenge_HZ_inkl_ZH","kWh"];
const PARAM_VOLUMENSTROM            = ["ID40072","Volumenstrom","l/m"];
const PARAM_VENTILATORDREHZAHL      = ["ID10001","Ventilatordrehzahl","%"];
const PARAM_ABLUFT                  = ["ID40025","Abluft","°C"];
const PARAM_FORTLUFT                = ["ID40026","Fortluft","°C"];
const PARAM_KOLL_AUS                = ["ID40029","Kollektor_aus","°C"];
const PARAM_KOLL_EIN                = ["ID40028","Kollektor_ein","°C"];

//==========================NIbe Calc Parameternamen===========================

const PARAM_LAST_WM_BW_INKL_ZH              = "Last_Waerme_BW_inkl_ZH";
const PARAM_LAST_WM_BW_INKL_ZH_ZE           = "Last_Waerme_BW_inkl_ZH_ZE";
const PARAM_LAST_WM_BW                      = "Last_Waerme_BW";
const PARAM_LAST_WM_HZ                      = "Last_Waerme_HZ";
const PARAM_LAST_WM_HZ_INKL_ZH              = "Last_Waerme_HZ_ink_ZH";
const PARAM_LAST_WM_HZ_INKL_ZH_ZE           = "Last_Waerme_HZ_ink_ZH_ZE";
const PARAM_LAST_USAGE_VERDICHTER_START_ZE  = "Last_usage_Verdichter_start_ZE"; //Letzter Wert  Pro Zeiteinheit
const PARAM_LAST_USAGE_VERDICHTER_START     = "Last_usage_Verdichter_start"; // Hochrechnung/Tag
const PARAM_LAST_VERDICHTER_START           = "Last_Verdichter_start" //Wert zum merken
const PARAM_WM_HZ_ZH                        = "Waerme_HZ_ZH";
const PARAM_WM_BW_ZH                        = "Waerme_BW_ZH";
const PARAM_WM_ZH_GESAMT                    = "Waerme_ZH_gesamt";
const PARAM_WRG_TEMP                        = "WRG_Temperaturdiffernz"; // Erhöhung der SOletemperatur durch WRG
const PARAM_LAST_DATA_SET                   = "Last_Data_set"; // Zeitstempel der letzten Ablesung
const PARAM_LAST_DATA_SET_DAYTIME           = "Last_Data_set_daytime"// Daytime der letzen Ablesung
const PARAM_LAST_COUNT_WP                   = "Last_count_WP";// Letzter WP-Zählerstand
const PARAM_LAST_COUNT_HS                   = "Last_count_HS";// Letzter Hausstrom-Zählerstand
const PARAM_LAST_USAGE_WP                   = "Last_usage_WP"; // Letzter Verbrauch der WP
const PARAM_LAST_USAGE_WP_ZE                = "Last_usage_WP_ZE"; // Letzter Verbrauch der WP ZE
const PARAM_LAST_USAGE_WM_HZ                = "Last_usage_WM_HZ";// Letzter Verbrauch Wärme Heizung
const PARAM_LAST_USAGE_WM_BW                = "Last_usage_WM_BW";// Letzter Verbrauch Wärme BW 
const PARAM_LAST_USAGE_WM_HZ_ZE             = "Last_usage_WM_HZ_ZE"; // Letzter Verbrauch Wärme HZ pro Zeiteinheit
const PARAM_LAST_USAGE_WM_BW_ZE             = "Last_usage_WM_BW_ZE"; // Letzter Verbrauch Wärme BW pro Zeiteinheit
const PARAM_LAST_AZ                         = "Last_AZ";        // Die letzte berechnete Arbeitszahl
const PARAM_LAST_AVG_TEMPERATURE            = "Last_avg_temperature"; // Die letzte zugehörige mittlere Aussentemperatur
const PARAM_MONTHLY_USAGE_WP                =  "Monthly_usage_WP";// Der monatliche Verbrauch der Wärmepumpe
const PARAM_YEARLY_AZ                       = "Yearly_AZ"; // Jahresarbeitszahl
const PARAM_YEARLY_USAGE_WP                 = "Yearly_usage_WP"; // Jahresverbrauch der Wärmepumpe (Zählt bis 01.01.2018
const PARAM_YEARLY_COUNT_WP                 = "Yearly_count_WP"; //Zählerstand Wert am 01.01.!
const PARAM_YEARLY_COUNT_WM_HZ              = "Yearly_count_WM_HZ"; //WM HZ am 01.01.
const PARAM_YEARLY_COUNT_WM_BW              = "Yearly_count_WM_BW"; //WM BW am 01.01.
const PARAM_TEMP_COUNT_WP                   = "Temp_count_WP";// Temporärer WP-Zählerstand
const PARAM_TIMESPAN_DAY                    = "Timespan_day"; // Zeitraum in dem abgelesen wurde in Tagen
const BTN_CALC_CLICK                        = "BTN_calc_click";

const PARAM_ARR_CALC_KWH = [PARAM_LAST_WM_BW_INKL_ZH,PARAM_LAST_WM_BW,PARAM_LAST_WM_HZ,PARAM_LAST_WM_HZ_INKL_ZH,PARAM_WM_HZ_ZH,PARAM_WM_BW_ZH,PARAM_WM_ZH_GESAMT,
                            PARAM_LAST_COUNT_WP,PARAM_TEMP_COUNT_WP, PARAM_LAST_USAGE_WP,
                            PARAM_LAST_USAGE_WP_ZE,PARAM_LAST_USAGE_WM_HZ,PARAM_LAST_USAGE_WM_BW,PARAM_LAST_USAGE_WM_HZ_ZE,PARAM_LAST_USAGE_WM_BW_ZE,
                            PARAM_YEARLY_USAGE_WP, PARAM_MONTHLY_USAGE_WP, PARAM_YEARLY_COUNT_WP, PARAM_YEARLY_COUNT_WM_HZ,PARAM_YEARLY_COUNT_WM_BW];
const PARAM_ARR_CALC_TEMP = [PARAM_WRG_TEMP,PARAM_LAST_AVG_TEMPERATURE];
const PARAM_ARR_CALC_OTHER = [PARAM_LAST_DATA_SET,PARAM_LAST_DATA_SET_DAYTIME,BTN_CALC_CLICK,PARAM_LAST_AZ,PARAM_YEARLY_AZ, PARAM_TIMESPAN_DAY,PARAM_LAST_VERDICHTER_START,
                               PARAM_LAST_USAGE_VERDICHTER_START_ZE, PARAM_LAST_USAGE_VERDICHTER_START]; // Keine Einheit


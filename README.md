# DI_DAM_E2_T7

Interfazeen garapena - bilera aplikazioa

Lengoiaiak: Typescript, Angular, SQL

2025/01/13


Errubrika: 

Enuntziuatua:

Web-aplikazioa (ElorAdmin):
ElorAdmin web-aplikazioak erabiltzaile eta bileren datuen alta/baja/aldaketa egiteko aukera ematen du web administrazioko panel baten bidez.

Aplikazioak ondorengo erabiltzaile motak izango ditu:

God: Administratzaile nagusia da. Edozein kudeaketa egiteko baimenak ditu. Ezin du bere burua ezabatu eta beste inork ere ezin du ezabatu.
Administratzaileak (idazkaritzako langilegoa): Aplikatiboaren administratzaileak dira. Erabiltzaileak sortu, kontsultatu, aldatu eta ezabatu ditzakete eta bilerak kontsultatu.
God eta administratzaileen home orrian ondorengoak agertuko dira: ikasle-kopurua, irakasle kopurua eta gaurko eguneko bilera kopurua.

Oharra: Erabiltzaile bakoitzaren argazkia ez da web-aplikazioaren bidez gehitzen.

Irakasleak: Bere datuak eta ordutegia ikusi dezakete, baita bere bilerak kontsultatu ere. Ikasleen datuak kontsultatu ditzakete eta irizpide ezberdinen arabera bilatu.
Ikasleak: Bere home orrira bakarrik sar daitezke, zeinetan bere datu pertsonalak, ordutegia eta bilerak agertuko zaizkien.
Irakasleen ordutegia honako honen antzekoa izango da:

![image](https://github.com/user-attachments/assets/28c3d6a4-4afb-4c05-99eb-1b22327f8189)

Ikasleen ordutegia antzekoa izango da, baina logikoki zaintza eta tutoretza barik.

Bilerak Euskadiko edozein ikastetxetan egin daitezke, baina balio lehenetsia Elorrieta - Erreka Mari izango da. Ikastetxeen informazioa kontsultatzeko OpenDatako Euskadiko Unibertsitatez kanpoko ikastetxeen datuak dituen JSON zerbitzaria erabiliko da. Erabiltzeko prest dagoen JSON fitxategia ematen zaizue, jatorrizkoa ez baitago JSON formatuan eta koordenadak UTM formatuan zehazten baititu Lat/Lon erabili ordez. Hala ere, UTMtik Lat/Lon formatura bihurtzeko irtenbide bat aurkitzea positiboki baloratuko da. Bilera bakoitzeko, datu basikoez gain, ikastetxearen izena eta helbidea erakutsiko dira mapa batean markatuta Mapboxeko APIa erabiliz.

Alderdi bisuala
Web-aplikazioak itxura profesionala izan behar du eta horretarako CSS framework bat eta ikono-liburutegi bat erabiliko dira, itxura homogeneoa izaten laguntzeko.

Ikastetxearen logotipoa erabiliko da eta ikastetxearen koloreak eta identitate bisuala hartuko dira kontuan atalak edo eta izenburuak sortzean.

Web-interfazeak ondorengo bete behar du:

Erantzungarria izatea eta pantaila txikietan (formatu mugikorrean) behar bezala funtzionatzen duela bermatzea.
Webgunearen goiburuan Elorrieta-ErrekaMariren logotipoa agertzea. Logotipoa sakatzean, logeatuta badago dagokion erabiltzailearen home-ra eramango du. Logeatuta ez badago login orrira eramango du eta hori izango da lehenetsitako orria erabiltzailea logeatuta ez dagoenean.
Nazioartekotzeko eskakizunak (i18n) betetzea eta euskaraz eta gaztelaniaz ikusi ahal izatea.





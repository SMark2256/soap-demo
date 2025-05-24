
# SOAP API Demó Alkalmazás

Ez a projekt egy SOAP webszolgáltatásokat integráló alkalmazást mutat be Angular (frontend) és NestJS (backend) technológiákkal. Az alkalmazás különböző SOAP szolgáltatásokat használ, beleértve számológép műveleteket, országinformációkat, valuta adatokat és nyelvlistázást.

## Funkciók

- Számológép alapvető aritmetikai műveletekkel
- Országinformációs böngésző részletekkel (főváros, valuta, zászló)
- Valuta listázás és részletek
- Nyelvek listázása és szűrése

## Előfeltételek

Mielőtt elkezdenéd, győződj meg róla, hogy a következők telepítve vannak:
- [Node.js](https://nodejs.org/) (v18 vagy újabb)
- [npm](https://www.npmjs.com/) (v9 vagy újabb)

## Kezdeti lépések

### 1. lépés: Projekt klónozása

```bash
git clone <repository-url>
cd soap-demo
```

### 2. lépés: Backend beállítása

1. Navigálj a backend könyvtárba:
   ```bash
   cd backend
   ```

2. Függőségek telepítése:
   ```bash
   npm install
   ```

3. Backend szerver indítása:
   ```bash
   npm run start:dev
   ```

   A backend elérhető lesz a http://localhost:3000 címen

### 3. lépés: Frontend beállítása

1. Nyiss egy új terminált és navigálj a projekt gyökérkönyvtárába

2. Függőségek telepítése:
   ```bash
   npm install
   ```

3. Frontend fejlesztői szerver indítása:
   ```bash
   npm start
   ```

   Az alkalmazás elérhető lesz a http://localhost:4200 címen

## Alkalmazás szerkezete

### Backend (NestJS)

A backend különböző modulokra van osztva, amelyek különböző SOAP szolgáltatásokkal integrálódnak:

- **Calculator Modul**: Kapcsolódik egy számológép SOAP szolgáltatáshoz
- **Countries Modul**: Országinformációkat szolgáltat egy SOAP szolgáltatásból
- **Currencies Modul**: Valuta adatokat kér le egy SOAP szolgáltatásból
- **Languages Modul**: Nyelvi információkat kap egy SOAP szolgáltatásból

### Frontend (Angular)

A frontend Angular-rel készült és komponens alapú architektúrát használ:

- **Calculator Komponens**: Felhasználói felület számítások elvégzéséhez
- **Countries Komponens**: Felület országinformációk böngészéséhez
- **Currencies Komponens**: Valuta adatok megjelenítése
- **Languages Komponens**: Nyelvek listázása és szűrése

## Környezeti konfiguráció

### Backend

A környezeti változók a backend könyvtárban található `.env` fájlban vannak tárolva:

```
PORT=3000
HOST=localhost
ENABLE_CORS=true
```

Ha nincs `.env` fájl, az alkalmazás alapértelmezetten a localhost:3000 címet használja.

### Frontend (Jelenleg nincs implementálva)

A környezeti konfiguráció a `src/environments` könyvtárban található:

- `environment.ts`: Fejlesztési környezet beállításai
- `environment.prod.ts`: Éles környezet beállításai

## Éles környezetbe való telepítés

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
npm run build
```

A lefordított frontend a `dist/soap` könyvtárban lesz, készen arra, hogy webszerverre telepítsék.

## Hibaelhárítás

### SOAP szolgáltatás kapcsolódási problémák

Ha problémákat tapasztalsz a SOAP szolgáltatásokhoz való kapcsolódáskor:

1. Ellenőrizd az internetkapcsolatot
2. Ellenőrizd, hogy a SOAP végpontok elérhetőek-e
3. Nézd meg a backend naplókat részletes hibaüzenetekért

### API kapcsolódási problémák

Ha a frontend nem tud kapcsolódni a backendhez:

1. Győződj meg róla, hogy a backend szerver fut
2. Ellenőrizd, hogy a frontend környezeti konfigurációjában lévő API URL megegyezik a backend URL-jével
3. Ellenőrizd, hogy a CORS engedélyezve van-e a backenden

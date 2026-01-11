# CRM Alkalmazás Beállítási Útmutató

Ez egy modern, moduláris CRM webalkalmazás role-alapú hozzáféréssel és térképes megjelenítéssel.

## Funkciók

### Admin felület
- Kapcsolatok (leads) hozzáadása, szerkesztése, törlése
- Adatok: Név, Telefonszám, Cím, Város, Irányítószám, Megjegyzés, GPS koordináták
- Teljes adatbázis kezelés

### Frontend (Üzletkötő) felület
- Kapcsolatok megtekintése térképen interaktív pinekkekkel
- Kapcsolatok listázása kártyás nézetben
- Valós idejű adatfrissítés
- Térkép és lista szinkronizálása

## Technológiai Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS
- **Routing**: React Router DOM
- **Térkép**: Leaflet + React Leaflet
- **Backend/Auth**: Supabase
- **Adatbázis**: PostgreSQL (Supabase)

## Beállítás

### 1. Supabase Projekt Létrehozása

1. Menj a [Supabase Dashboard](https://app.supabase.com)-ra
2. Hozz létre egy új projektet
3. Várj amíg a projekt létrejön

### 2. Adatbázis Séma Beállítása

1. Menj a Supabase projektedben a **SQL Editor** részhez
2. Nyisd meg a `database-setup.sql` fájlt ebből a projektből
3. Másold ki a teljes tartalmat
4. Illeszd be a Supabase SQL Editorba
5. Futtasd le a scriptet

Ez létrehozza:
- `user_profiles` táblát (felhasználói profilok és role-ok)
- `leads` táblát (kapcsolatok adatai)
- Row Level Security (RLS) policy-kat
- Szükséges indexeket és triggereket

### 3. Környezeti Változók Beállítása

1. Menj a Supabase projektedben a **Settings > API** részhez
2. Másold ki a következőket:
   - Project URL
   - anon/public key

3. Nyisd meg a `.env` fájlt a projekt gyökérkönyvtárában
4. Állítsd be az értékeket:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Telepítés és Indítás

```bash
npm install
npm run dev
```

## Első Használat

### Admin Felhasználó Létrehozása

Az első admin felhasználót manuálisan kell létrehozni:

1. Regisztrálj egy felhasználót az alkalmazásban (vagy hozz létre egyet a Supabase Auth felületén)
2. Menj a Supabase **Table Editor > user_profiles** részhez
3. Keresd meg az új felhasználót
4. Változtasd meg a `role` mezőt `admin`-ra

### Frontend Felhasználó Létrehozása

A frontend felhasználók regisztrációja ugyanúgy működik, és alapértelmezetten `frontend_user` role-t kapnak.

## Használat

### Admin Funkciók
- `/admin` - Admin dashboard
- Új kapcsolat hozzáadása gombbal
- Kapcsolatok szerkesztése és törlése
- GPS koordináták megadása a térképes megjelenítéshez

### Frontend Funkciók
- `/frontend` - Üzletkötő nézet
- Térkép interaktív pinekkel
- Kapcsolatok listája
- Pin kattintásra a lista autómatikusan görgeti a megfelelő elemhez

## Moduláris Felépítés

Az alkalmazás modulárisan van felépítve a jövőbeli bővíthetőség érdekében:

```
src/
├── components/
│   ├── admin/          # Admin komponensek
│   ├── auth/           # Authentikáció komponensek
│   ├── frontend/       # Frontend/Üzletkötő komponensek
│   └── shared/         # Közös komponensek
├── contexts/           # React Context providers
├── lib/               # Utility funkciók, típusok
│   ├── supabase.ts    # Supabase kliens
│   └── types.ts       # TypeScript típusdefiníciók
└── App.tsx            # Főoldal routing

```

## Új Modulok Hozzáadása

Az alkalmazás könnyen bővíthető új funkciókkal:

1. **Új Admin Funkció**: Adj hozzá új komponenst az `src/components/admin/` mappába
2. **Új Adattábla**: Hozz létre új migrációt Supabase-ben RLS policy-kkal
3. **Új Role**: Bővítsd a `UserRole` típust a `types.ts`-ben
4. **Új Route**: Adj hozzá új route-ot az `App.tsx`-ben

## Biztonsági Megjegyzések

- Az alkalmazás Row Level Security (RLS) policy-kat használ
- Admin felhasználók teljes hozzáféréssel rendelkeznek
- Frontend felhasználók csak olvasási jogosultságot kapnak
- Minden API hívás authentikált és role-alapú engedélyekkel védett

## Támogatás

Ha bármilyen problémába ütközöl a beállítás során:
1. Ellenőrizd a Supabase projekt API kulcsokat
2. Nézd meg a böngésző konzolt hibákért
3. Ellenőrizd a Supabase RLS policy-kat

<center>
    <h1>
    🏎 Au-Ó Frontend 🚗</h1>
</center>

## 📝 Tartalomjegyzék

### ✅ Fejlesztői dokumentáció - A Typedoc által kiegészített fejlesztői dokumentáció a repo `docs` mappájában található `index.html` fájl megnyitásával érhető el.

- [ 📚 Bevezetés](#-bevezetés)
- [ 🔖 Dokumentációs segítség](#-dokumentációs-segítség)
- [ 🔗 Hasznos linkek](#-hasznos-linkek)
- [ 💡 Termék leírása](#-termék-leírása)
- [ ✅ Telepítési útmutató](#-telepítési-útmutató)
- [ ❓ Használati útmutató](#-használati-útmutató)
- [ 💻 Felhasznált technológiák](#-felhasznált-technológiák)
- [ 📝 Tesztelések](#-tesztelések)

---

## 📚 Bevezetés

#### 👋 Üdvözlünk az Au-Ó családban!

Teszteld első kézből a vizsgára szeretettel készült közösségi média projektünket!

Kövesd az alább található **telepítési** valamint **használati** útmutatókat, és kezdd el használni az alkalmazásunkat!

## 🔖 Dokumentációs segítség
- A README tartalmazza a manuálisan megírt dokumentációs részeket, beleértve a felhasználói és tesztelési dokumentációt.
- A fejlesztői dokumentációt a Typedoc tartalmazza.
  - API hívások dokumentációja
  - komponens snapshotok
  - típus definíciók
  - általános funkciók dokumentációk

## 🔗 Hasznos linkek

📝 Ez a projekt **három** repóból áll, indítás előtt győződjön meg róla, hogy mindhárom komponens elérhető.

- [Frontend | Mobil](https://github.com/bnolod/au-o_mobil)
- [Backend](https://github.com/bnolod/au-o_backend)

💎 Az elsődleges design koncepciókat, valamint prezentációt Figma felületen terveztük, a külön oldalak alább elérhetők.

- [📈 Projekt tab](https://github.com/users/bnolod/projects/4/views/1)
- [💻 Asztali web](https://www.figma.com/design/j9NffYp8ruYwC6iuz0Sgnp/Desktop?node-id=0-1&t=Eszh1sA2oioWKFlm-1)
- [📱 Mobil](https://www.figma.com/design/GDRSmJy5sZxZp7PKZ4rmtD/Mobil?t=QY6xjWNAz19yVUjy-1)
- [⚡ Koncepció](https://www.figma.com/board/7v2i3Ps0qUoqlQQjlErx8S/Koncepci%C3%B3?t=QY6xjWNAz19yVUjy-1)
- [🔏 Adatbázis séma](https://www.figma.com/design/ZMLoquJGEDi3lEhLdslQ9c/DB?t=QY6xjWNAz19yVUjy-0)
- [🗣 Prezentáció](https://www.figma.com/slides/9yKoTciIISnBTpzo4RTfS9/Prezent%C3%A1ci%C3%B3?node-id=54-236&t=QY6xjWNAz19yVUjy-1)

## 💡 Termék leírása

A projektünk **újragondolja** a közösségi média alkalmazások széles körű témaválasztékának szokásait, és biztosít egy felületet az olyanoknak, akiket kifejezetten érdekel minden, ami kerekeken gurul és belső égésű motor hajtja.

Felületünk sajátossága közé tartozik első sorban a felhasználói garázs funkció, amely lehetővé teszi a felhasználóinknak, hogy büszkén viseljék, hogy mit vezetnek.

A garázs funkció kiegészíti a többi funkciót a következőkkel:

- 😄 Színesíti a felhasználói profilt
  - A profilon az autóiddal osztozhatsz a reflektorfényen.
- 🚩 Hozzárendelheted egy autódat a posztokhoz, hogy tudja mindenki, hogy mit vezetsz.
- 📩 Elküldheted az autóidat ismerőseidnek a valós idejű chat funkcióval.

## ✅ Telepítési útmutató

#### Szükséges a futtatáshoz

- [Node.js](https://nodejs.org/en/download)
- A backend sikeres futtatása, ami [ebben](https://github.com/bnolod/au-o_backend) a repóban található.
### Futtatási lépések
> Parancssor:
>
> `npm i`
>
> `npm run host`
> 
> `localhost`**-on kívül** akármelyik link megnyitása

## 📝 Tesztelések
<center>Megjegyzés: ez a részleg csak a WEB FRONTEND felület tesztjeire vonatkozik, kivéve ahol kifejezetten ellenkezőleg van állítva. A többi rész tesztelése elérhető a stack részének külön repójában.</center>

### ⭕ Egységtesztek
- Az egységtesztelést Jesttel oldottuk meg.
- Teszteseteket írtunk a következő elemekre
  - Alap funkciók (functions.ts)
  - Többször felhasznált komponensek (components/ui-ból néhány)
      - **Eredmény** 100% pass 
### 🔜 Statikus tesztek
- A statikus tesztelésnek megfelel a TypeScript által biztosított type-safety, ami virtuálisan kizárja az érvénytelen típusok által dobott hibák lehetőségét.
    - **Eredmény:** Az alkalmazás funkciói teljesen típusbiztosak, így kizárva a type mismatch lehetőségét.

### 🔧 Manuális tesztek
- Az alkalmazás felületét és cross-platform (Android & iOS) kompatibilitását (funkciók és kinézet egyaránt) kézzel teszteltük, biztosítva hogy a legtöbb modern eszközön gond nélkül tud futni.
    - **Eredmény:** 👌

### 📬 API tesztek
- Az API tesztek **megosztottak** a három komponens között. (web & mobil & backend) 
- A frontend és backend közötti kapcsolatot test-driven development koncepciók alapján fejlesztettük.
- Az API tesztek a Backend repóhoz csatolt Postman Collection exportjában található.
    - **Eredmény:** minden felhasznált endpoint elérhetősége és visszaadott értéke le lett tesztelve 
### 👴 Végfelhasználói tesztek
- Az alkalmazásunk beviteli mezőit ellenőrizzük közös validációs szabályokkal (a dokumentációját szintén a backend repóban találják)
- Ezekre a beállításokra készültek mock elemek és tesztesetek a hibakezelésekre.
    - **Eredmény:** minden validálásra szoruló mező ellenőrzésre kerül beküldés előtt, az esetleges hibákról a felhasználó tisztán értesül.


### 🔐 Regisztráció és bejelentkezés
- Az első megjelenített oldal egy **landing** felület, ami üdvözli a felhasználót, és bejelentkezésre vagy regisztrációra utasítja.
- Modalként megjelenik egy standard regisztrációs/bejelentkezős form, melynek valid kitöltésével létrejön a felhasználó, vagy bejelentkezik a már létező felhasználó fiókjába.
  - A validációs módszerek definiálva vannak a backend repo root mappájában található Validációs szabályok.md fájlban.
    - Ezeket a szabályokat alkalmaztuk egységesen, itt az Au-O/lib/Validation mappában találjuk ezeket a szabályokat.
- Miután a felhasználó authentikálva van, az első megjelenített oldal a **feed.** A külön oldalakról részletesebben alább olvashat.

## 🔖 Felhasználói élmény

### 🔰 Regisztráció

- Felhasználó regisztálása a következő adatokkal:
  - Felhasználónév
  - Email cím
  - Jelszó
  - Születési dátum
  - Becenév
- Regisztrálás után egyből bejelentkeztet a felhasználódba.

### 🚪 Bejelentkezés

- Email vagy felhasználónév, és jelszó alapján.

## 🗺 Navigáció

- Felső navigációs sáv
  - Kizárólag authentikált felhasználóknak jelenik meg.
  - Elérhetővé teszi a csoportokat, eseményeket, feedet, illetve a saját profilt
---

### 🏡 Kezdőlap

- Posztok böngészése, infinite scroll (Időrend alapján csökkenő)

### 📣 Csoportok

- Itt elérhető a felhasználók által létrehozott csoportok széles választéka.
- Megjelennek a csoportok, amelyeknek a felhasználó tagjai, valamint az eddig nem látott csoportok is.
- Itt egy kattintásra tud a felhasználó belépni, vagy éppen felvételi jelentkezést benyújtani egy csoportba.

### ✨ Új

- Minden hasonló alkalmazásban a felhasználó van a központban, ezért gyors elérésbe lett helyezve az új profil poszt funkció.
- Egy **űrlap** kitöltése után a felhasználó közzétesz a profiljára egy új bejegyzést
  - 1-10 kép
  - Közepes hosszúságú leírás
  - Rövid helyszín
  - Hozzárendelt autó

### 💬 Chat

- Az alkalmazásunk támogatja a valós idejű csevegést felhasználók között.
- A bal oldali sávban elérheti a legutóbbi üzeneteket, vagy új csevegés indításáért profil oldalról is lehet üzenni.

### 😀 Profil

- Saját felhasználói profil
  - Megnézése
  - Szerkesztése
- Saját posztok
- Követők (+ követő eltávolítása)
- Követéseim (+ követés eltávolítása)
- A felhasználói profilon négy fül található (👂)
  - Posztok
    - Kilistázza a felhasználó posztjait.
  - Csoportok
    - Kilistázza a felhasználó **nyilvános** csoportjait.
  - Garázs
    - Kilistázza a felhasználó összes közzétett járművét.
  - Mentett posztok

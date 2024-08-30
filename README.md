# **Hannah's History Hunt**

Hannah's History Hunt är en interaktiv mobilapp där användare kan skapa och delta i historiska jakter på olika platser. Appen kombinerar kartfunktionalitet med fototagning för att göra jakterna roliga och engagerande.

## **Innehållsförteckning**
- [Funktioner](#funktioner)
- [Installation](#installation)
- [Tekniker](#tekniker)
- [Struktur](#struktur)

## **Funktioner**
- **Användarautentisering:** Registrera och logga in med e-post och lösenord via Firebase Authentication.
- **Skapa en Hunt:** Användare kan skapa en ny hunt med plats, namn, tid och en bild.
- **Delta i Hunts:** Delta i hunts som skapats av andra och fullfölj dem genom att ta en bild vid målet.
- **Inbjudningar:** Användare kan bjuda in andra att delta i deras hunts.
- **Medals:** Efter att en hunt är klar, visas den som en medalj i användarens profil.
- **Karta med vägvisning:** Visa din nuvarande plats och målet med en linje som visar vägen.
- **Profilhantering:** Hantera och uppdatera din profilbild och namn.

## **Installation**
För att komma igång med appen, följ dessa steg:

 **Kloning av Repository:**
   ```bash
   git clone <repository-url>
   cd history-hunt
```

   ## **Tekniker**
- **React Native:** Byggt för mobil utveckling.
- **Expo:** Snabb utvecklingsmiljö för React Native.
- **Firebase Authentication:** Hantering av användarinloggning och registrering.
- **Firebase Realtime Database:** Lagring av hunts, användarinformation och bilder.
- **React Navigation:** Hantering av navigering mellan skärmar.
- **Expo Image Picker:** Välj och ladda upp bilder.

## **Struktur**
Appens struktur följer en tydlig uppdelning av komponenter och skärmar:

- **components/**: Återanvändbara UI-komponenter som knappar, textfält, etc.
- **screens/**: Innehåller alla skärmar i appen som HomeScreen, CreateHuntScreen, ProfileScreen, etc.
- **constants/**: Färger, typsnitt och teman för styling.
- **firebaseConfig.js**: Konfigurationsfil för Firebase.



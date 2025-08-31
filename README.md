# QuranApp

QuranApp adalah aplikasi web interaktif untuk membaca Al-Qur'an dengan fitur lengkap, termasuk audio per ayat, transliterasi Latin, terjemahan, bookmark, dan navigasi antar-surah. Dirancang dengan pengalaman pengguna profesional dan performa optimal.

---

## Fitur Utama

* Membaca Al-Qur'an dengan teks Arab, transliterasi Latin, dan terjemahan bahasa Indonesia.
* Pemutar audio per ayat dengan kontrol play/pause, skip, dan seek.
* Bookmark ayat favorit.
* Navigasi cepat antar surah.
* Sidebar dinamis untuk daftar surah.
* Responsive dan mendukung mode desktop dan mobile.
* Animasi dan interaksi halus menggunakan Framer Motion.
* Offline-friendly (cache audio ringan).

---

## Teknologi

* **Framework & Bahasa**: [Next.js](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/)
* **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), Radix UI
* **State Management**: Zustand
* **Audio & Interaksi**: HTML5 Audio API
* **Animasi**: [Framer Motion](https://www.framer.com/motion/)
* **Deployment & Analytics**: Vercel, optional Google Analytics

---

## Instalasi

Clone repository:

```bash
git clone https://github.com/IrfanNha/quran-app.git
cd quran-app
```

Install dependencies:

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

---

## Environment Variables

Buat file `.env.local` di root project dan tambahkan konfigurasi API `equran.id`:

```bash
NEXT_PUBLIC_EQURAN_API_URL=https://equran.id/api
NEXT_PUBLIC_EQURAN_API_KEY=your_api_key_here
```

* Ganti `your_api_key_here` dengan API key yang kamu dapat dari [equran.id](https://equran.id).
* Prefix `NEXT_PUBLIC_` wajib agar bisa diakses dari client.
* Setelah membuat file ini, restart development server:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

---

## Menjalankan Aplikasi

Jalankan server development:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka browser di [http://localhost:3000](http://localhost:3000).

Build production:

```bash
npm run build
npm run start
```

---

## Struktur Folder

```
quran-app/
├─ app/                # Halaman Next.js (App Router)
│  ├─ page.tsx         # Halaman utama
│  ├─ bookmark/        # Halaman Bookmark
│  └─ surah/           # Halaman surah
├─ components/         # UI components
│  ├─ shared/          # Komponen reusable
│  ├─ surah/           # Sidebar, body, navigation
│  └─ audio/           # AudioBanner, AudioProvider
├─ constants/          # Konstanta aplikasi (Qari map, dsb)
├─ lib/                # Utils, API client
├─ store/              # Zustand stores
├─ styles/             # Global styling & Tailwind config
└─ public/             # Assets statis
```

---

## Contoh Penggunaan

```tsx
import { AudioProvider } from '@/components/audio/audio-provider';
import AudioBanner from '@/components/audio/audio-banner';

export default function App() {
  return (
    <AudioProvider>
      <AudioBanner />
      {/* Komponen lain */}
    </AudioProvider>
  );
}
```

---

## Best Practices

* Audio player menggunakan HTML5 Audio API untuk performa ringan.
* Sticky header dan sidebar untuk navigasi yang nyaman.
* Lazy load surah dan ayat agar tetap ringan di client.
* Gunakan Framer Motion untuk animasi halus tanpa mengorbankan performa.

---

## Deployment

Disarankan menggunakan **[Vercel](https://vercel.com/new)**:

1. Hubungkan repository GitHub.
2. Build & deploy otomatis.
3. Gunakan environment variables untuk konfigurasi audio atau analytics jika diperlukan.

---

## Lisensi

MIT License © IrfanNha - IrfanWork

---

Dokumentasi ini dirancang agar mudah dipahami developer lain dan menjaga standar profesional.
Untuk kontribusi atau pertanyaan, silakan buat pull request atau issue di repository.

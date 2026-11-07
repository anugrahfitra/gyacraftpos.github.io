GYA CRAFT — CFD POS (PWA OFFLINE)
================================

Isi paket:
- index.html       Aplikasi POS (UI dan logika)
- manifest.json    Metadata PWA untuk Home Screen iPhone
- sw.js            Service Worker untuk cache offline
- assets/          Ikon aplikasi

PENTING
-------
1. Paket ini adalah PWA. Jangan membuka index.html langsung dari aplikasi Files
   (file://), karena Service Worker dan IndexedDB membutuhkan secure context.
2. Deploy isi folder ini ke static hosting yang menyediakan HTTPS (contoh:
   Netlify, Cloudflare Pages, atau GitHub Pages).
3. Buka URL HTTPS tersebut menggunakan Safari di iPhone saat masih online.
4. Tunggu sampai halaman selesai dimuat, lalu reload sekali agar Service Worker
   terpasang dan file aplikasi serta dependensi CDN masuk cache.
5. Safari > Share > Add to Home Screen > Add.
6. Buka ikon GYA POS dari Home Screen. Uji dengan Airplane Mode sebelum dipakai
   untuk transaksi sungguhan.

PENYIMPANAN DATA
----------------
- Sesi CFD, interaksi, order, dan konfigurasi disimpan di IndexedDB pada origin
  (domain) yang sama.
- Data transaksi tidak dikirim ke backend/cloud oleh aplikasi ini.
- Jangan mengganti domain/URL hosting setelah mulai menyimpan transaksi.
  IndexedDB pada domain berbeda dianggap database yang berbeda.
- Jangan menghapus Website Data/Safari history untuk domain aplikasi.
- Backup JSON secara berkala melalui tab Pengaturan > Export Backup JSON.
  Simpan file backup ke Files > On My iPhone atau iCloud Drive.
- Restore JSON dapat digunakan untuk memulihkan data. Lakukan backup sebelum
  restore. Restore saat ini menggabungkan/menimpa record berdasarkan ID, bukan
  menghapus seluruh database terlebih dahulu.

KETERGANTUNGAN INTERNET
-----------------------
Aplikasi ini masih menggunakan Tailwind CSS, Font Awesome, dan Chart.js dari
CDN. Service Worker mencoba menyimpan file-file tersebut saat instalasi awal
ketika online, sehingga UI dan grafik dapat digunakan offline setelah cache
berhasil. Karena CDN pihak ketiga dapat berubah atau gagal diakses, lakukan
pengujian Airplane Mode dan pastikan grafik serta ikon tampil sebelum hari CFD.

BATASAN
-------
- Offline berarti transaksi disimpan di iPhone ini saja. Tidak ada sinkronisasi
  otomatis ke perangkat lain.
- IndexedDB relatif tahan untuk penggunaan lokal, tetapi bukan pengganti backup.
- Jika Safari/iOS menghapus data website, perangkat hilang, atau aplikasi
  dibuka dari domain baru, data lokal mungkin tidak tersedia.
- Fitur instalasi PWA memerlukan HTTPS dan Safari modern.

UJI WAJIB SEBELUM DIGUNAKAN
---------------------------
[ ] Buka URL HTTPS saat online.
[ ] Tunggu semua tampilan, ikon, dan grafik selesai dimuat.
[ ] Tambahkan ke Home Screen.
[ ] Buka aplikasi dari Home Screen.
[ ] Aktifkan Airplane Mode.
[ ] Tutup aplikasi sepenuhnya lalu buka kembali.
[ ] Buat sesi uji, interaksi, dan order uji.
[ ] Ubah status order sampai lunas.
[ ] Tutup dan buka kembali aplikasi; pastikan data masih ada.
[ ] Export JSON dan pastikan file backup tersimpan di Files.
[ ] Hapus data uji hanya setelah backup berhasil.

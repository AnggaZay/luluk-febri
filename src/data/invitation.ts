// src/data/invitation.ts

export const WeddingData = {
  coverPhoto: "/images/cover.webp", // ✨ Foto cover (rekomendasi 1080x1920 pixel, rasio 9:16)
  bride: {
    fullName: "Luluk Khorifatul Khofiyah",
    shortName: "Luluk",
    parents: "Putri Bpk. Tulus & Ibu Turipah",
    address: "Werdi, Wonokerto",
    photo: "/images/bride.png", // Path ke public/images
    dana: "0888-0690-7354",
  },
  groom: {
    fullName: "Dwi Febiyanto",
    shortName: "Febi",
    parents: "Putra Bpk. Darnoto & Ibu Munirah",
    address: "Tratebang, Wonokerto",
    photo: "/images/groom.png", // Path ke public/images
    dana: "0896-0328-9551",
  },
  events: {
    akad: {
      date: "2026-04-01",
      time: "07.00 - 08.00 WIB",
      location: "Tempat Mempelai Wanita",
      address: "Ds. Werdi, Dk. Werdi Tengah RT 13/ RW 06, Kec. Wonokerto, Kab. Pekalongan, Jawa Tengah (51153)",
      mapsUrl: "https://maps.app.goo.gl/QgqkoXQYt3VXeptc8",
    },
    ramahTamah: {
      date: "31 Maret - 1 April 2026",
      time: "Selasa Malam Rabu (Jam Selera Anda)",
      location: "Kediaman Mempelai",
      mapsUrl: "#", 
    },
    resepsi: {
      date: "2026-04-01",
      time: "13.00 - Selesai",
      location: "Kediaman Mempelai Wanita",
      mapsUrl: "#",
    }
  },
  stories: [
    {
      title: "Pertemuan",
      content: "Tidak ada yang kebetulan di dunia ini, Semua sudah tersusun rapih oleh Sang Maha Kuasa. Kita tidak bisa memilih dengan siapa kita akan jatuh cinta. Kami bertemu pada tahun 2012, awalnya kita saling bertukar SMS (pesan pendek) pada masa itu, dan tidak ada yang pernah menyangka bahwa pertemuan itu membawa kami pada suatu ikatan cinta yang suci hari ini.",
    },
    {
      title: "Komitmen",
      content: "Pada tahun 2013 kami berpacaran dan putus pada tahun 2014. Kami saling sibuk mencari jatidiri masing-masing. Tepatnya tahun 2022 (8 tahun kemudian), kami dipertemukan kembali dan mulai untuk berkomitmen.",
    },
    {
      title: "Tunangan",
      content: "Setelah berkomitmen kami berdua meyakini mampu melangkah ke jenjang yang lebih serius. Pada 29 April 2023 kami pun bertunangan dengan restu dari kedua orang tua dan keluarga besar.",
    },
    {
      title: "Pernikahan",
      content: "Akhirnya kapal kami segera berlayar. Terima kasih kepada keluarga dan teman-teman yang telah menjadi saksi perjalanan cinta kami. Semoga kami dapat membawa kapal ini terus berlayar dan berlabuh di tujuan yang sama.",
    }
  ],
    gallery: [
    "/images/prewed-1.webp",
    "/images/prewed-2.webp",
    "/images/prewed-3.webp",
    "/images/prewed-4.webp",
    "/images/prewed-5.webp",
    "/images/prewed-6.webp",
    "/images/prewed-7.webp",
    "/images/prewed-8.webp",
  ]
};

interface CoverProps {
  data: typeof WeddingData; // Mengambil struktur langsung dari WeddingData kamu
  onOpen: () => void;
}
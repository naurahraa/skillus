export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "tips-menyusun-proposal-pkm-yang-menarik",
    title: "Tips Menyusun Proposal PKM yang Menarik",
    excerpt: "Pelajari langkah-langkah membuat proposal PKM yang kuat dan berpeluang lolos pendanaan.",
    date: "2 Nov 2025",
    author: "Tim SkillUs",
    content: [
      "Program Kreativitas Mahasiswa (PKM) adalah salah satu jalur paling populer buat mahasiswa yang mau ngembangin ide, riset, atau inovasi jadi sesuatu yang nyata — sekaligus dapet pendanaan resmi dari kampus atau Kemendikbud. Tapi nggak sedikit proposal yang gagal lolos seleksi bukan karena idenya jelek, tapi karena cara nyampeinnya kurang matang.",
      "Hal pertama yang perlu diperhatiin adalah kejelasan masalah yang mau diselesaikan. Reviewer PKM biasanya baca puluhan bahkan ratusan proposal, jadi latar belakang yang muter-muter atau nggak spesifik gampang bikin mereka kehilangan minat di awal.",
      "Kedua, pastiin metode yang ditawarkan realistis buat dikerjain dalam jangka waktu program. Ide yang ambisius itu bagus, tapi kalau timeline dan sumber dayanya nggak masuk akal, reviewer bakal ragu proposal itu bisa selesai tepat waktu.",
      "Terakhir, jangan lupa perhatiin detail administratif — format penulisan, kelengkapan lampiran, sampai konsistensi antar bab. Hal-hal teknis kayak gini sering diremehin, padahal bisa jadi alasan proposal langsung didiskualifikasi.",
    ],
  },
  {
    slug: "strategi-membangun-personal-branding-di-dunia-kampus",
    title: "Strategi Membangun Personal Branding di Dunia Kampus",
    excerpt: "Bikin profil akademik dan kariermu menonjol lewat personal branding yang tepat.",
    date: "1 Nov 2025",
    author: "Tim SkillUs",
    content: [
      "Personal branding bukan cuma soal keliatan keren di media sosial — di dunia kampus, ini soal gimana orang lain (dosen, sesama mahasiswa, sampai calon HRD) inget dan percaya sama kompetensi yang kamu punya.",
      "Langkah paling dasar adalah nentuin 'benang merah' dari apa yang kamu kerjain. Kalau kamu aktif di riset, organisasi, dan lomba yang temanya nyambung satu sama lain, orang bakal lebih gampang ngerti 'kamu itu siapa' dibanding kalau semuanya acak nggak ada arah.",
      "Selain itu, dokumentasiin progress kamu secara konsisten — entah lewat LinkedIn, portofolio online, atau sekadar catatan pribadi. Personal branding yang kuat itu dibangun dari kumpulan bukti nyata, bukan klaim doang.",
      "Terakhir, jangan takut buat sharing proses, bukan cuma hasil akhir. Orang lebih gampang connect sama cerita perjuangan dan pembelajaran dibanding pencapaian yang keliatan udah 'jadi' dari awal.",
    ],
  },
  {
    slug: "belajar-efektif-lewat-webinar-tips-dan-etika-online-learning",
    title: "Belajar Efektif Lewat Webinar: Tips dan Etika Online Learning",
    excerpt: "Simak cara biar pengalaman belajarmu di webinar makin maksimal dan profesional.",
    date: "30 Okt 2025",
    author: "Tim SkillUs",
    content: [
      "Webinar udah jadi salah satu cara belajar paling fleksibel buat mahasiswa — bisa diikutin dari mana aja, kapan aja, tanpa harus dateng fisik. Tapi format online ini juga punya tantangan sendiri yang sering bikin materi nggak keserap maksimal.",
      "Pertama, siapin lingkungan yang mendukung fokus. Matiin notifikasi, cari tempat yang tenang, dan usahain tetep 'hadir' secara aktif walau cuma lewat layar — misalnya dengan nyatet poin penting real-time, bukan cuma nonton pasif.",
      "Kedua, perhatiin etika dasar: nyalain kamera kalau diminta, mute mic pas nggak ngomong, dan manfaatin fitur tanya-jawab dengan pertanyaan yang relevan. Ini nunjukkin kamu serius ngikutin acaranya.",
      "Terakhir, jangan skip sesi review. Setelah webinar selesai, luangin waktu buat baca ulang catatan atau nonton rekamannya kalau ada — soalnya materi yang cuma didenger sekali gampang banget kelupaan dalam beberapa hari.",
    ],
  },
];
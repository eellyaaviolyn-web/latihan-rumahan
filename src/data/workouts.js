export const workouts = [
  {
    id: 1,
    nama: 'Push Up',
    kategori: 'Kekuatan',
    level: 'Pemula',
    durasi: '15 menit',
    set: 3,
    repetisi: '12',
    kalori: 120,
    emoji: '💪',
    deskripsi: 'Latihan beban tubuh klasik yang efektif untuk membangun kekuatan otot dada, bahu, dan trisep.',
    langkah: [
      'Posisikan tubuh telungkup dengan kedua telapak tangan di lantai sedikit lebih lebar dari bahu.',
      'Jaga tubuh tetap lurus sempurna dari kepala hingga tumit dengan mengencangkan otot inti.',
      'Turunkan tubuh secara perlahan dan terkontrol hingga dada hampir menyentuh lantai.',
      'Dorong lantai dengan kuat untuk kembali ke posisi awal sambil menghembuskan napas.'
    ],
    ototTarget: ['Dada', 'Trisep', 'Bahu']
  },
  {
    id: 2,
    nama: 'Squat',
    kategori: 'Kekuatan',
    level: 'Pemula',
    durasi: '15 menit',
    set: 3,
    repetisi: '15',
    kalori: 110,
    emoji: '🏋️',
    deskripsi: 'Gerakan fundamental tubuh bagian bawah untuk memperkuat otot paha, bokong, serta stabilitas sendi lutut.',
    langkah: [
      'Berdiri tegak dengan kaki dibuka selebar bahu dan kedua tangan di depan dada.',
      'Tekuk kedua lutut dan dorong pinggul ke belakang seolah-olah hendak duduk di kursi.',
      'Turunkan tubuh hingga paha sejajar dengan lantai, jaga dada tetap tegak dan punggung lurus.',
      'Dorong melalui tumit kaki untuk kembali berdiri tegak ke posisi awal.'
    ],
    ototTarget: ['Paha', 'Bokong', 'Betis']
  },
  {
    id: 3,
    nama: 'Plank',
    kategori: 'Kekuatan',
    level: 'Menengah',
    durasi: '10 menit',
    set: 3,
    repetisi: '30 detik',
    kalori: 90,
    emoji: '🧘',
    deskripsi: 'Latihan isometrik inti yang memperkuat seluruh otot perut, punggung bagian bawah, dan meningkatkan postur tubuh.',
    langkah: [
      'Posisikan tubuh menelungkup bertumpu pada kedua lengan bawah (forearm) dan ujung jari kaki.',
      'Pastikan posisi siku berada tepat tegak lurus di bawah bahu.',
      'Kencangkan otot perut, bokong, dan paha agar tubuh membentuk satu garis lurus datar.',
      'Tahan posisi ini secara stabil selama durasi target sambil tetap bernapas teratur.'
    ],
    ototTarget: ['Perut', 'Punggung', 'Bahu']
  },
  {
    id: 4,
    nama: 'Burpee',
    kategori: 'Kardio',
    level: 'Lanjutan',
    durasi: '20 menit',
    set: 3,
    repetisi: '10',
    kalori: 180,
    emoji: '🔥',
    deskripsi: 'Latihan seluruh tubuh intensitas tinggi yang memicu detak jantung, membakar lemak, dan melatih daya tahan stamina.',
    langkah: [
      'Mulai dari posisi berdiri tegak, lalu tekuk lutut ke posisi jongkok dan tempelkan telapak tangan ke lantai.',
      'Lompatkan kedua kaki ke belakang hingga Anda berada pada posisi push up.',
      'Lakukan satu kali push up penuh, lalu lompatkan kembali kedua kaki ke depan mendekati tangan.',
      'Lompat secara eksplosif ke udara setinggi mungkin dengan kedua tangan menjangkau ke atas kepala.'
    ],
    ototTarget: ['Seluruh Tubuh']
  },
  {
    id: 5,
    nama: 'Lunges',
    kategori: 'Kekuatan',
    level: 'Menengah',
    durasi: '15 menit',
    set: 3,
    repetisi: '12',
    kalori: 130,
    emoji: '🦵',
    deskripsi: 'Latihan unilateral yang melatih kekuatan masing-masing kaki secara seimbang serta memperbaiki kelenturan pinggul.',
    langkah: [
      'Berdiri tegak dengan kedua kaki dibuka selebar pinggul dan kedua tangan diletakkan di pinggang.',
      'Langkahkan satu kaki ke depan, lalu tekuk kedua lutut hingga membentuk sudut 90 derajat.',
      'Pastikan lutut depan tidak melewati ujung jari kaki dan lutut belakang hampir menyentuh lantai.',
      'Dorong tumit kaki depan untuk kembali ke posisi awal, lalu ulangi secara bergantian untuk kaki lainnya.'
    ],
    ototTarget: ['Paha', 'Bokong', 'Betis']
  },
  {
    id: 6,
    nama: 'Mountain Climber',
    kategori: 'Kardio',
    level: 'Lanjutan',
    durasi: '15 menit',
    set: 3,
    repetisi: '20',
    kalori: 160,
    emoji: '🏃',
    deskripsi: 'Gerakan kardio cepat dari posisi plank yang melatih otot perut, bahu, dan kecepatan gerak kaki.',
    langkah: [
      'Mulai dalam posisi push up tinggi dengan telapak tangan sejajar di bawah bahu dan tubuh lurus.',
      'Tarik lutut kanan secepatnya ke arah dada tanpa membiarkan pinggul terangkat ke atas.',
      'Kembalikan kaki kanan ke posisi semula sambil langsung menarik lutut kiri ke arah dada.',
      'Lanjutkan gerakan bergantian secepat mungkin dengan ritme lari yang stabil dan terkontrol.'
    ],
    ototTarget: ['Perut', 'Bahu', 'Kaki']
  },
  {
    id: 7,
    nama: 'Jumping Jacks',
    kategori: 'Kardio',
    level: 'Pemula',
    durasi: '10 menit',
    set: 3,
    repetisi: '30',
    kalori: 100,
    emoji: '⭐',
    deskripsi: 'Latihan kardio aerobik yang menyenangkan untuk melancarkan sirkulasi darah, pemanasan, dan membakar kalori.',
    langkah: [
      'Berdiri tegak dengan kaki rapat dan kedua lengan rileks di samping tubuh.',
      'Lompat dan lebarkan kedua kaki ke samping sambil mengayunkan kedua lengan ke atas kepala.',
      'Lompat kembali ke posisi awal dengan merapatkan kaki dan menurunkan lengan ke samping tubuh.',
      'Ulangi gerakan ini secara berirama dan mendaratlah dengan lembut menggunakan bagian depan kaki.'
    ],
    ototTarget: ['Seluruh Tubuh']
  },
  {
    id: 8,
    nama: 'Sit Up',
    kategori: 'Kekuatan',
    level: 'Pemula',
    durasi: '10 menit',
    set: 3,
    repetisi: '15',
    kalori: 80,
    emoji: '⚡',
    deskripsi: 'Latihan isolasi otot perut tradisional yang efektif untuk memperkuat dinding perut dan fleksibilitas tulang belakang.',
    langkah: [
      'Berbaring telentang di matras dengan lutut ditekuk dan kedua telapak kaki menapak kuat di lantai.',
      'Letakkan jari-jari tangan di samping pelipis atau silangkan kedua tangan di depan dada.',
      'Gunakan kontraksi otot perut untuk mengangkat tubuh bagian atas hingga mendekati posisi duduk.',
      'Turunkan tubuh kembali ke posisi semula secara perlahan tanpa menjatuhkan punggung tiba-tiba.'
    ],
    ototTarget: ['Perut', 'Pinggang']
  },
  {
    id: 9,
    nama: 'Peregangan Penuh',
    kategori: 'Fleksibilitas',
    level: 'Pemula',
    durasi: '15 menit',
    set: 1,
    repetisi: '10 gerakan',
    kalori: 50,
    emoji: '🧘‍♀️',
    deskripsi: 'Sesi relaksasi dan peregangan menyeluruh untuk melenturkan otot, mencegah cedera, dan mempercepat pemulihan tubuh.',
    langkah: [
      'Lakukan pemanasan ringan dengan peregangan dinamis pada otot leher, bahu, dan pergelangan tangan.',
      'Regangkan otot dada dan punggung bagian atas dengan merentangkan kedua tangan ke belakang tubuh.',
      'Lakukan peregangan tubuh bagian bawah mencakup paha depan (quadriceps), paha belakang (hamstring), dan betis.',
      'Tahan setiap posisi peregangan statis selama 15-30 detik sambil mengatur pernapasan secara mendalam.'
    ],
    ototTarget: ['Seluruh Tubuh']
  }
];

export const jadwalMingguan = [
  {
    hari: 'Senin',
    fokus: 'Kekuatan Atas',
    latihan: [1, 3],
    istirahat: false
  },
  {
    hari: 'Selasa',
    fokus: 'Kardio',
    latihan: [7, 6],
    istirahat: false
  },
  {
    hari: 'Rabu',
    fokus: 'Kekuatan Bawah',
    latihan: [2, 5],
    istirahat: false
  },
  {
    hari: 'Kamis',
    fokus: 'Kardio HIIT',
    latihan: [4, 6],
    istirahat: false
  },
  {
    hari: 'Jumat',
    fokus: 'Core & Kekuatan',
    latihan: [8, 3, 1],
    istirahat: false
  },
  {
    hari: 'Sabtu',
    fokus: 'Fleksibilitas',
    latihan: [9],
    istirahat: false
  },
  {
    hari: 'Minggu',
    fokus: 'Istirahat & Pemulihan',
    latihan: [],
    istirahat: true
  }
];

export default workouts;

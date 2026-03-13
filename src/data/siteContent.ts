export const initialContent = {
  navbar: {
    logo: "/assets/logo.png",
    links: [
      { name: 'HAKKIMIZDA', href: 'about' },
      { name: 'HİZMETLER', href: 'services' },
      { name: 'SEKTÖRLER', href: 'sectors' },
      { name: 'MAKALELER', href: 'articles' },
      { name: 'YORUMLAR', href: 'reviews' },
      { name: 'İLETİŞİM', href: 'contact' },
    ],
    cta: "RANDEVU AL"
  },
  hero: {
    badge: "Kişisel Hukuki Danışmanlık",
    title: "Tecrübe ve Güvenin Adresi",
    description: "Bireysel ve kurumsal hukuki süreçlerinizde, Av. Tugay Kayhan olarak yanınızdayım. Şeffaf ve çözüm odaklı yaklaşımla haklarınızı koruyorum.",
    primaryBtn: "Hemen Randevu Al",
    secondaryBtn: "Sektörlerimizi Gör",
    bgImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  about: {
    image: "/assets/tugay.png",
    name: "Av. Tugay Kayhan",
    role: "Kurucu / Avukat",
    badge: "Hakkımızda",
    title: "Adaletin İzinde Bir Kariyer",
    p1: "Av. Tugay Kayhan, hukuk kariyeri boyunca bireysel ve kurumsal müvekkillerine yüksek standartlarda hukuki danışmanlık hizmeti sunmuştur. İstanbul merkezli ofisinde, dürüstlük ve şeffaflık ilkelerinden ödün vermeden faaliyet göstermektedir.",
    p2: "Karmaşık hukuki problemleri basitleştirerek, müvekkillerinin haklarını en etkin şekilde savunmayı misyon edinmiştir. Hukukun dinamik yapısına uyum sağlayarak, her gün gelişen mevzuatı yakından takip etmektedir.",
    stats: [
      { value: "10+", label: "Yıl Deneyim" },
      { value: "500+", label: "Başarılı Dosya" }
    ]
  },
  services: {
    badge: "Hukuki Çözümler",
    title: "Çalışma Alanlarımız",
    items: [
      { icon: 'Scale', title: 'Ceza Hukuku', desc: 'Haklarınızın savunulmasında profesyonel temsil ve stratejik hukuki destek.' },
      { icon: 'Briefcase', title: 'Ticaret Hukuku', desc: 'Şirketler için sözleşme yönetimi, uyuşmazlık çözümü ve hukuki uyum.' },
      { icon: 'Users', title: 'Aile Hukuku', desc: 'Boşanma, velayet ve miras süreçlerinde hassas ve çözüm odaklı yaklaşım.' },
      { icon: 'ShieldCheck', title: 'Gayrimenkul Hukuku', desc: 'Mülkiyet davaları, tapu işlemleri ve inşaat hukukunda uzman danışmanlık.' }
    ]
  },
  sectors: {
    badge: "Endüstriyel Odak",
    title: "Hizmet Verilen Sektörler",
    items: [
      { icon: 'Building2', name: 'Gayrimenkul & İnşaat' },
      { icon: 'Landmark', name: 'Bankacılık & Finans' },
      { icon: 'Zap', name: 'Enerji & Madencilik' },
      { icon: 'Plane', name: 'Lojistik & Havacılık' },
      { icon: 'Activity', name: 'Sağlık & İlaç' },
      { icon: 'ShoppingBag', name: 'Perakende & E-Ticaret' }
    ]
  },
  articles: {
    badge: "Bilgi Paylaşımı",
    title: "Güncel Makaleler",
    items: [
      {
        title: 'Dijital Dönüşümün Şirketler Hukuku Üzerindeki Etkileri',
        category: 'Ticaret Hukuku',
        date: '12 Mart 2026',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'published',
        content: [
          { type: 'heading', value: 'Dijitalleşen Dünyada Şirket Yönetimi' },
          { type: 'paragraph', value: 'Günümüzde teknolojinin hızla ilerlemesiyle birlikte ticaret hukuku da kabuk değiştiriyor. Artık şirket genel kurulları dijital ortamlarda yapılabiliyor...' },
          { type: 'image', value: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
          { type: 'paragraph', value: 'Bu dönüşüm sürecinde hukuki altyapının doğru kurgulanması, ileride yaşanabilecek uyuşmazlıkların önüne geçmek için kritik önem taşıyor.' }
        ]
      },
      {
        title: '2026 Gayrimenkul Mevzuatındaki Kritik Değişiklikler',
        category: 'Gayrimenkul Hukuku',
        date: '05 Mart 2026',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'published',
        content: [
          { type: 'heading', value: 'Yeni Tapu ve İskan Düzenlemeleri' },
          { type: 'paragraph', value: '2026 yılı itibarıyla yürürlüğe giren yeni düzenlemeler, gayrimenkul alım-satım süreçlerinde dijital onay mekanizmalarını zorunlu hale getiriyor...' },
          { type: 'heading', value: 'Yabancıların Mülk Edinme Şartları' },
          { type: 'paragraph', value: 'Yatırım yoluyla vatandaşlık ve mülk edinme konularında yapılan güncellemeler, sektörde yeni bir hareketlilik yarattı.' }
        ]
      },
      {
        title: 'Yapay Zeka ve Hukuki Sorumluluk: Yeni Bir Dönem',
        category: 'Teknoloji Hukuku',
        date: '28 Şubat 2026',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'published',
        content: [
          { type: 'heading', value: 'Algoritmaların Hukuki Statüsü' },
          { type: 'paragraph', value: 'Yapay zeka sistemlerinin verdiği kararlardan kimin sorumlu olacağı tartışması, Avrupa Birliği Yapay Zeka Yasası (AI Act) ile yeni bir boyut kazandı.' },
          { type: 'paragraph', value: 'Otonom araçlar ve tanı koyan sağlık yazılımları, sorumluluk hukuku açısından en çok tartışılan alanların başında geliyor.' }
        ]
      }
    ]
  },
  faq: {
    badge: "Sıkça Sorulan Sorular",
    title: "Merak Edilenler",
    items: [
      { question: "İlk danışmanlık görüşmesi ücretli mi?", answer: "Hukuk büromuzun prensipleri gereği, her türlü hukuki danışmanlık hizmeti, kapsamı ne olursa olsun Avukatlık Asgari Ücret Tarifesi üzerinden ücretlendirilmektedir." },
      { question: "Randevu için ne kadar önceden iletişime geçmeliyim?", answer: "Mümkünse en az 2 iş günü öncesinden randevu almanız, sizin için daha sağlıklı bir görüşme takvimi oluşturmamıza yardımcı olacaktır." }
    ]
  },
  announcement: {
    active: true,
    text: "Yeni bir mevzuat değişikliği hakkında makalemiz yayında! Okumak için tıklayın.",
    link: "#articles"
  },
  reviews: {
    badge: "Referanslar",
    title: "Müvekkil Değerlendirmeleri",
    items: [
      {
        name: 'Mehmet Yılmaz',
        role: 'CEO, Global Lojistik',
        text: 'Şirketimizin tüm hukuki süreçlerini Av. Tugay Bey büyük bir titizlikle yönetiyor. Kendisinin stratejik bakış açısı bize çok değer kattı.',
        rating: 5
      },
      {
        name: 'Selda Demir',
        role: 'Gayrimenkul Yatırımcısı',
        text: 'Karmaşık bir tapu davasını beklediğimizden çok daha kısa sürede çözüme kavuşturdu. Profesyonelliği ve iletişimi gerçekten etkileyici.',
        rating: 5
      },
      {
        name: 'Ayşe Yılmaz',
        role: 'Uzman Doktor',
        text: "Malpraktis davası sürecimizdeki profesyonel desteği için Tugay Bey'e borçluyuz. Süreç boyunca her sorumuza sabırla yanıt verdi.",
        rating: 5
      },
      {
        name: 'Can Arslan',
        role: 'Girişimci',
        text: 'Sözleşme hazırlama ve ortaklık yapısı konusundaki tecrübesi sayesinde start-up sürecimizi sorunsuz tamamladık. Kesinlikle tavsiye ederim.',
        rating: 5
      }
    ]
  },
  contact: {
    badge: "İletişime Geçin",
    title: "Randevu Talebi Oluşturun",
    description: "Hukuki sorunlarınızın çözümü için ilk adımı atın. Formu doldurarak ön görüşme randevusu alabilirsiniz.",
    phone: "+90 (212) 555 00 00",
    email: "info@tugaykayhan.com",
    address: "Levent, Büyükdere Cad. No:123, İstanbul",
    appointmentCategories: ["Ceza Hukuku", "Ticaret Hukuku", "Aile Hukuku", "Gayrimenkul Hukuku", "İş Hukuku", "Bilişim Hukuku", "Diğer"],
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  footer: {
    logo: "/assets/logo.png",
    copy: "© 2026 Av. Tugay Kayhan Hukuk Bürosu. Tüm hakları saklıdır.",
    workingHours: "Pazartesi - Cuma: 09:00 - 18:00",
    compliance: "Bu site Türkiye Barolar Birliği'nin meslek kurallarına uygun olarak tasarlanmıştır.",
    devCredit: "Bu site SDN Yazılım ve Danışmanlık tarafından geliştirilmiştir.",
    sdnLogo: "/assets/sdnlogo.jpg"
  },
  legal: {
    kvkk: {
      title: "KVKK Aydınlatma Metni",
      content: "Sayın Müvekkillerimiz ve Ziyaretçilerimiz,\n\nAv. Tugay Kayhan Hukuk Bürosu olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ('KVKK') uyarınca, veri sorumlusu sıfatıyla, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz.\n\n1. Veri Sorumlusu: Kişisel verileriniz, veri sorumlusu sıfatıyla Av. Tugay Kayhan tarafından işlenmektedir.\n2. Veri İşleme Amaçları: Kişisel verileriniz; hukuki danışmanlık hizmetlerinin sunulması, randevu taleplerinin yönetilmesi, müvekkil ilişkilerinin yürütülmesi ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.\n3. Kişisel Veri Toplama Yöntemi: Verileriniz, web sayfamızdaki randevu formu, iletişim formları ve şahsen yapılan başvurular aracılığıyla toplanmaktadır.\n4. Veri Sahibi Hakları: KVKK m. 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini isteme, silinmesini talep etme haklarına sahipsiniz."
    },
    privacy: {
      title: "Gizlilik Politikası",
      content: "Bu gizlilik politikası, tugaykayhan.com web sitesini ziyaret eden kullanıcıların kişisel bilgilerinin nasıl toplandığını ve kullanıldığını açıklar.\n\nSitemizde bulunan iletişim ve randevu formları aracılığıyla paylaştığınız bilgiler (ad, soyad, telefon, e-posta), yalnızca size geri dönüş yapmak ve taleplerinizi karşılamak amacıyla kullanılır. Bu bilgiler üçüncü şahıslarla asla paylaşılmaz.\n\nWeb sitemiz, kullanıcı deneyimini iyileştirmek amacıyla standart çerezler (cookies) kullanabilir. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz."
    },
    terms: {
      title: "Kullanım Şartları",
      content: "Bu web sitesini kullanmaya devam etmeniz, aşağıdaki şartları kabul ettiğiniz anlamına gelir:\n\n1. Sitede yer alan bilgiler genel bilgilendirme amaçlıdır ve hukuki tavsiye niteliği taşımaz.\n2. Site içeriği (metinler, makaleler, tasarım) telif hakları ile korunmaktadır, izinsiz kopyalanamaz.\n3. Web sitesinde paylaşılan içeriklerin doğruluğu için azami çaba gösterilse de, bu bilgilerden kaynaklanabilecek doğrudan veya dolaylı zararlardan mesuliyet kabul edilmez.\n4. Avukatlık meslek kuralları ve reklam yasağına uygun olarak hazırlanan bu sitede, ticari kazanç amaçlı reklam bulunmamaktadır."
    }
  },
  seo: {
    title: "Av. Tugay Kayhan | İstanbul Hukuk & Danışmanlık Bürosu",
    description: "İstanbul merkezli Av. Tugay Kayhan Hukuk Bürosu; Ceza Hukuku, Ticaret Hukuku, Aile Hukuku ve Gayrimenkul Hukuku alanlarında profesyonel danışmanlık hizmeti sunar.",
    keywords: "istanbul avukat, tugay kayhan, ceza avukatı, boşanma avukatı, gayrimenkul hukuku, ticaret hukuku, hukuk bürosu levent",
    author: "Av. Tugay Kayhan",
    ogImage: "/assets/logo.png",
    ogType: "website"
  }
};

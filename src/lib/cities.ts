// src/lib/cities.ts
// Türkiye'nin 81 ili — lokal SEO mimarisi için.
// 12 öncelikli şehir elle yazılmış özgün içerikle, kalan 69 il şablon + ilçe verisiyle üretilir.

import type { City } from '@/types'
import { hashString, seededRandom } from '@/lib/utils'

interface CitySeed {
  slug: string
  name: string
  region: string
  population: number
  priorityLevel: 1 | 2 | 3
  geo: { lat: number; lng: number }
  districts: string[]
  industries?: string[]
  description?: string
  featuredServices?: string[]
}

const PRIORITY_SEEDS: CitySeed[] = [
  {
    slug: 'istanbul',
    name: 'İstanbul',
    region: 'Marmara',
    population: 15655924,
    priorityLevel: 1,
    geo: { lat: 41.0082, lng: 28.9784 },
    districts: [
      'Maltepe', 'Kadıköy', 'Üsküdar', 'Ataşehir', 'Beşiktaş', 'Şişli', 'Beyoğlu',
      'Bakırköy', 'Bahçelievler', 'Başakşehir', 'Esenyurt', 'Kartal', 'Pendik',
      'Tuzla', 'Sarıyer', 'Kağıthane', 'Fatih', 'Zeytinburnu', 'Ümraniye', 'Sancaktepe',
    ],
    industries: ['finans ve bankacılık', 'e-ticaret', 'lojistik', 'yazılım ve teknoloji', 'sağlık', 'medya', 'dış ticaret'],
    description:
      'İstanbul, Türkiye ekonomisinin kalbi ve dijital dönüşüm talebinin en yoğun olduğu şehirdir. Finans kuruluşları, e-ticaret markaları, lojistik şirketleri, yazılım ekipleri ve binlerce KOBİ; kurumsal web sitesi, özel yazılım, CRM ve SEO ihtiyaçlarını aynı anda büyütüyor. Merkez ofisimiz Maltepe’de bulunduğu için İstanbul projelerinde yüz yüze görüşme, saha ziyareti ve hızlı destek avantajı sunuyoruz. Anadolu Yakası’nda Kadıköy, Ataşehir, Üsküdar ve Kartal hattındaki firmalarla; Avrupa Yakası’nda Şişli, Beşiktaş, Başakşehir ve Bakırköy çevresindeki işletmelerle aktif olarak çalışıyoruz. Rekabetin en yüksek olduğu bu pazarda görünürlük kazanmak için teknik SEO, lokal SEO ve yapısal veri çalışmasını birlikte yürütüyoruz. İstanbul’daki işletmeler için web sitesi, e-ticaret, CRM, yönetim paneli, dijital otomasyon ve yapay zekâ çözümlerini uçtan uca sağlıyoruz. Proje görüşmelerini ofisimizde veya çevrim içi yapabilir, ücretsiz ön analiz ile başlayabilirsiniz.',
    featuredServices: [
      'kurumsal-web-sitesi', 'e-ticaret-sitesi', 'crm', 'lokal-seo',
      'dijital-donusum', 'saas-platformu', 'teknik-seo', 'yonetim-paneli',
    ],
  },
  {
    slug: 'ankara',
    name: 'Ankara',
    region: 'İç Anadolu',
    population: 5803482,
    priorityLevel: 1,
    geo: { lat: 39.9334, lng: 32.8597 },
    districts: [
      'Çankaya', 'Yenimahalle', 'Keçiören', 'Sincan', 'Etimesgut', 'Altındağ',
      'Mamak', 'Pursaklar', 'Gölbaşı', 'Ostim',
    ],
    industries: ['kamu ve savunma sanayii', 'yazılım ve bilişim', 'sağlık', 'eğitim', 'enerji', 'inşaat'],
    description:
      'Ankara; kamu kurumları, savunma sanayii şirketleri, organize sanayi bölgeleri ve teknoloji geliştirme bölgeleriyle Türkiye’nin ikinci büyük dijital pazarıdır. Başkentte faaliyet gösteren firmalar için güvenlik, KVKK uyumu, erişim kontrolü ve dokümantasyon kritik önceliklerdir. Tardigrad Software olarak Ankara projelerinde rol bazlı yetkilendirme, işlem logları, yedekleme ve denetime hazır raporlama standartlarını öne çıkarıyoruz. Çankaya ve Ostim hattındaki yazılım şirketleri, Sincan ve Etimesgut çevresindeki üreticiler, Gölbaşı’ndaki teknoloji firmaları için kurumsal web sitesi, özel yazılım, yönetim paneli, API entegrasyonu ve teknik SEO hizmetleri sunuyoruz. Kamu ihale süreçlerinde ihtiyaç duyulan kurumsal tanıtım siteleri ve başvuru sistemleri de uzmanlık alanımızdır. Ankara’daki işletmelerle projeleri çevrim içi yürütüyor, gerektiğinde yerinde toplantı planlıyoruz.',
    featuredServices: [
      'kurumsal-web-sitesi', 'crm', 'yonetim-paneli', 'api-entegrasyonu',
      'teknik-seo', 'form-basvuru-sistemi', 'dijital-donusum', 'lokal-seo',
    ],
  },
  {
    slug: 'izmir',
    name: 'İzmir',
    region: 'Ege',
    population: 4479525,
    priorityLevel: 1,
    geo: { lat: 38.4237, lng: 27.1428 },
    districts: [
      'Konak', 'Bornova', 'Karşıyaka', 'Buca', 'Çiğli', 'Gaziemir',
      'Balçova', 'Bayraklı', 'Alsancak', 'Torbalı',
    ],
    industries: ['dış ticaret ve liman lojistiği', 'turizm', 'tarım ve gıda', 'tekstil', 'teknopark girişimleri', 'sağlık'],
    description:
      'İzmir; liman ticareti, ihracat odaklı üretim, turizm ve teknopark girişimleriyle Ege Bölgesi’nin dijital merkezidir. Alsancak ve Bornova hattındaki ajanslar, Gaziemir ve Torbalı’daki sanayi firmaları, Çeşme ve Urla tarafındaki turizm işletmeleri farklı dijital ihtiyaçlar üretir. Tardigrad Software olarak İzmir’deki ihracatçı firmalar için çok dilli tanıtım siteleri ve ürün katalogları, turizm işletmeleri için rezervasyon sistemleri, üretim firmaları için stok ve sipariş yönetimi geliştiriyoruz. Lokal SEO tarafında “İzmir” aramalarında görünürlük kazanmak isteyen işletmeler için şehir ve ilçe bazlı sayfa mimarisi kuruyor, Google Business Profile optimizasyonunu yapıyoruz. Karşıyaka ve Bayraklı’daki yeni nesil girişimler için MVP ve SaaS geliştirme desteği de sağlıyoruz. İzmir projelerini uzaktan yönetiyor, kritik aşamalarda yerinde görüşme yapıyoruz.',
    featuredServices: [
      'e-ticaret-sitesi', 'kurumsal-web-sitesi', 'rezervasyon-basvuru-sistemi',
      'lokal-seo', 'stok-yonetimi', 'mvp-startup-urunu', 'urun-tanitim-sitesi',
    ],
  },
  {
    slug: 'antalya',
    name: 'Antalya',
    region: 'Akdeniz',
    population: 2696249,
    priorityLevel: 2,
    geo: { lat: 36.8969, lng: 30.7133 },
    districts: ['Muratpaşa', 'Konyaaltı', 'Kepez', 'Lara', 'Alanya', 'Manavgat', 'Side', 'Kemer', 'Serik'],
    industries: ['turizm ve konaklama', 'emlak ve inşaat', 'tarım ve seracılık', 'sağlık turizmi', 'yatçılık'],
    description:
      'Antalya, Türkiye’nin turizm başkentidir ve dijital görünürlüğün doğrudan gelire dönüştüğü şehirlerden biridir. Oteller, tatil köyleri, tur organizatörleri, emlak ofisleri, sağlık turizmi klinikleri ve seracılık işletmeleri için web sitesi, rezervasyon sistemi ve çok dilli içerik kritik önemdedir. Tardigrad Software olarak Antalya’daki turizm işletmeleri için online rezervasyon ve başvuru sistemleri, çok dilli (Türkçe/İngilizce/Rusça) tanıtım siteleri ve Google Business Profile optimizasyonu sunuyoruz. Muratpaşa ve Konyaaltı’ndaki hizmet işletmeleri, Alanya ve Manavgat’taki turizm tesisleri, Lara hattındaki klinikler için lokal SEO çalışmaları yürütüyoruz. Sezon öncesinde yayına alınan hızlı ve mobil uyumlu siteler, doğrudan rezervasyon oranını artırarak komisyon maliyetini düşürür. Antalya projelerinde sezon takvimine uygun planlama yapıyoruz.',
    featuredServices: [
      'rezervasyon-basvuru-sistemi', 'lokal-seo', 'kurumsal-web-sitesi',
      'landing-page', 'ai-chatbot', 'e-ticaret-sitesi', 'dijital-donusum',
    ],
  },
  {
    slug: 'bursa',
    name: 'Bursa',
    region: 'Marmara',
    population: 3194720,
    priorityLevel: 2,
    geo: { lat: 40.1885, lng: 29.061 },
    districts: ['Osmangazi', 'Nilüfer', 'Yıldırım', 'İnegöl', 'Gemlik', 'Mustafakemalpaşa', 'Kestel', 'Gürsu'],
    industries: ['otomotiv ve yan sanayi', 'tekstil', 'makine imalatı', 'gıda', 'mobilya'],
    description:
      'Bursa, otomotiv ve tekstil sanayisinin merkezlerinden biri olarak üretim odaklı dijitalleşme ihtiyacının en yoğun olduğu şehirlerdendir. İnegöl mobilya, Gemlik ve Osmangazi sanayi bölgeleri, Nilüfer’deki teknoloji ve hizmet firmaları; stok yönetimi, sipariş takibi, tedarikçi yönetimi ve üretim raporlaması konularında yazılım desteği arar. Tardigrad Software olarak Bursa’daki üreticiler için stok ve depo yönetim sistemleri, proforma ve sipariş akışları, tedarikçi performans takibi ve yönetim dashboard’ları geliştiriyoruz. İhracat yapan firmalar için çok dilli ürün tanıtım siteleri ve dijital kataloglar hazırlıyoruz. Tekstil ve mobilya sektöründe faaliyet gösteren KOBİ’ler için e-ticaret ve bayi paneli çözümleri sunuyoruz. Bursa projelerinde fabrikanın mevcut işleyişini yerinde analiz ederek süreci tasarlıyoruz.',
    featuredServices: [
      'stok-yonetimi', 'proforma-siparis-yonetimi', 'e-ticaret-sitesi',
      'urun-tedarikci-yonetimi', 'dashboard-sistemi', 'kurumsal-web-sitesi', 'dijital-donusum',
    ],
  },
  {
    slug: 'kocaeli',
    name: 'Kocaeli',
    region: 'Marmara',
    population: 2079072,
    priorityLevel: 2,
    geo: { lat: 40.8533, lng: 29.8815 },
    districts: ['İzmit', 'Gebze', 'Darıca', 'Çayırova', 'Körfez', 'Gölcük', 'Derince', 'Kartepe', 'Dilovası'],
    industries: ['otomotiv', 'kimya ve petrokimya', 'lojistik ve liman', 'metal sanayi', 'Ar-Ge merkezleri'],
    description:
      'Kocaeli, Türkiye’nin en yoğun sanayi koridorudur; Gebze, Çayırova ve Dilovası hattındaki organize sanayi bölgeleri, limanlar ve Ar-Ge merkezleri ile üretim ve lojistik dijitalleşmesinin merkezindedir. Bölgedeki firmalar için üretim verisi takibi, depo ve sevkiyat yönetimi, tedarikçi entegrasyonu ve iş güvenliği kayıtları önceliklidir. Tardigrad Software olarak Kocaeli’ndeki sanayi kuruluşları için iş takip sistemleri, stok ve sevkiyat yönetimi, bakım planlama modülleri ve yönetici dashboard’ları geliştiriyoruz. İstanbul’a yakınlık sayesinde Gebze ve İzmit çevresindeki işletmelerle yüz yüze çalışma imkânımız vardır. Lojistik firmaları için sipariş ve araç takibi, kimya ve metal sektörü için parti bazlı izlenebilirlik çözümleri sunuyoruz. Kurumsal web sitesi ve teknik SEO tarafında da B2B görünürlük çalışmaları yürütüyoruz.',
    featuredServices: [
      'is-takip-sistemi', 'stok-yonetimi', 'e-ticaret-sitesi', 'dashboard-sistemi',
      'api-entegrasyonu', 'kurumsal-web-sitesi', 'dijital-otomasyon',
    ],
  },
  {
    slug: 'gaziantep',
    name: 'Gaziantep',
    region: 'Güneydoğu Anadolu',
    population: 2154051,
    priorityLevel: 2,
    geo: { lat: 37.0662, lng: 37.3833 },
    districts: ['Şahinbey', 'Şehitkamil', 'Nizip', 'İslahiye', 'Oğuzeli', 'Araban'],
    industries: ['gıda ve fıstık üretimi', 'tekstil ve halı', 'ihracat', 'plastik ve kimya', 'tarım makineleri'],
    description:
      'Gaziantep, ihracat hacmi ve üretim kapasitesiyle Güneydoğu Anadolu’nun ekonomik merkezidir. Gıda, halı, tekstil, plastik ve makine sektörlerinde faaliyet gösteren firmalar; bayi ağı yönetimi, ihracat odaklı tanıtım siteleri, sipariş ve stok sistemleri konusunda dijitalleşmeye ihtiyaç duyar. Tardigrad Software olarak Gaziantep’teki üreticiler için çok dilli ürün katalogları, bayi paneli, proforma ve sipariş yönetimi, stok takip sistemleri geliştiriyoruz. Şahinbey ve Şehitkamil’deki ticaret işletmeleri, Nizip’teki gıda üreticileri için e-ticaret ve dijital pazarlama altyapıları kuruyoruz. İhracat yapan firmalar için İngilizce ve Arapça içerik desteği, teknik SEO ve yapısal veri çalışmaları sunuyoruz. Bölgedeki aile şirketlerinin kurumsallaşma sürecinde dijital dönüşüm danışmanlığı sağlıyoruz.',
    featuredServices: [
      'urun-tanitim-sitesi', 'crm', 'stok-yonetimi', 'proforma-siparis-yonetimi',
      'e-ticaret-sitesi', 'dijital-donusum', 'lokal-seo',
    ],
  },
  {
    slug: 'konya',
    name: 'Konya',
    region: 'İç Anadolu',
    population: 2296347,
    priorityLevel: 2,
    geo: { lat: 37.8746, lng: 32.4932 },
    districts: ['Selçuklu', 'Meram', 'Karatay', 'Ereğli', 'Akşehir', 'Beyşehir'],
    industries: ['tarım makineleri', 'otomotiv yan sanayi', 'gıda ve un sanayi', 'döküm ve metal', 'tarım'],
    description:
      'Konya, tarım makineleri, döküm, gıda ve otomotiv yan sanayi üretimiyle İç Anadolu’nun en güçlü sanayi şehirlerinden biridir. Selçuklu ve Karatay’daki üretim tesisleri, Ereğli ve Akşehir’deki tarım işletmeleri; sipariş yönetimi, bayi ağı, stok takibi ve servis hizmetleri için yazılım ihtiyacı duyar. Tardigrad Software olarak Konya’daki üreticiler için yedek parça ve servis takip sistemleri, bayi sipariş panelleri, üretim iş emri yönetimi ve raporlama altyapıları geliştiriyoruz. Tarım makineleri sektöründe faaliyet gösteren firmalar için çok dilli tanıtım siteleri ve dijital kataloglar hazırlıyoruz. Gıda üreticileri için izlenebilirlik ve parti takibi çözümleri sunuyoruz. Konya projelerinde saha ziyaretleriyle üretim süreçlerini yerinde analiz ediyor, sistemleri gerçek iş akışına göre kurguluyoruz.',
    featuredServices: [
      'crm', 'stok-yonetimi', 'urun-tanitim-sitesi', 'is-takip-sistemi',
      'proforma-siparis-yonetimi', 'kurumsal-web-sitesi', 'lokal-seo',
    ],
  },
  {
    slug: 'adana',
    name: 'Adana',
    region: 'Akdeniz',
    population: 2274106,
    priorityLevel: 3,
    geo: { lat: 37.0, lng: 35.3213 },
    districts: ['Seyhan', 'Yüreğir', 'Çukurova', 'Sarıçam', 'Ceyhan', 'Kozan'],
    industries: ['tekstil', 'gıda ve tarım', 'petrokimya', 'lojistik', 'inşaat'],
    description:
      'Adana, Çukurova Bölgesi’nin ticaret ve sanayi merkezi olarak tekstil, gıda, tarım ve lojistik sektörlerinde güçlü bir ekonomik yapıya sahiptir. Seyhan ve Çukurova’daki hizmet işletmeleri, Ceyhan’daki sanayi kuruluşları ve bölgedeki tarım firmaları; kurumsal web sitesi, sipariş yönetimi ve dijital görünürlük konularında desteğe ihtiyaç duyar. Tardigrad Software olarak Adana’daki işletmeler için kurumsal web sitesi, e-ticaret altyapısı, stok ve sipariş yönetim sistemleri, lokal SEO çalışmaları sunuyoruz. Tarım ve gıda üreticileri için izlenebilirlik ve bayi yönetimi çözümleri geliştiriyoruz. Bölgedeki KOBİ’lerin dijital dönüşüm yolculuğunda mevcut durum analizi, önceliklendirme ve kademeli uygulama planı ile ilerliyoruz. Adana projelerini uzaktan yönetiyor, ihtiyaç hâlinde yerinde görüşme yapıyoruz.',
    featuredServices: [
      'kurumsal-web-sitesi', 'e-ticaret-sitesi', 'stok-yonetimi',
      'lokal-seo', 'dijital-donusum', 'teklif-hazirlama-sistemi',
    ],
  },
  {
    slug: 'kayseri',
    name: 'Kayseri',
    region: 'İç Anadolu',
    population: 1434357,
    priorityLevel: 3,
    geo: { lat: 38.7205, lng: 35.4826 },
    districts: ['Melikgazi', 'Kocasinan', 'Talas', 'İncesu', 'Develi'],
    industries: ['mobilya', 'metal ve makine', 'elektrik ve kablo', 'gıda', 'tekstil'],
    description:
      'Kayseri, mobilya ve metal sanayisindeki üretim gücüyle İç Anadolu’nun önemli ticaret merkezlerinden biridir. Organize sanayi bölgelerindeki üreticiler, bayi ağları ve ihracat yapan firmalar; ürün kataloğu, sipariş yönetimi, stok takibi ve kurumsal tanıtım konularında dijital çözümlere ihtiyaç duyar. Tardigrad Software olarak Kayseri’deki mobilya üreticileri için dijital katalog ve e-ticaret altyapıları, metal ve makine firmaları için teklif hazırlama ve sipariş yönetim sistemleri geliştiriyoruz. Melikgazi ve Kocasinan’daki işletmeler için kurumsal web sitesi ve lokal SEO hizmeti sunuyoruz. İhracat odaklı firmalar için çok dilli tanıtım siteleri ve yapısal veri çalışmaları yürütüyoruz. Kayseri projelerinde üretim süreçlerini analiz ederek sistemleri gerçek iş akışına uyumlu hâle getiriyoruz.',
    featuredServices: [
      'teklif-hazirlama-sistemi', 'urun-tanitim-sitesi', 'e-ticaret-sitesi',
      'stok-yonetimi', 'kurumsal-web-sitesi', 'lokal-seo',
    ],
  },
  {
    slug: 'eskisehir',
    name: 'Eskişehir',
    region: 'İç Anadolu',
    population: 906617,
    priorityLevel: 3,
    geo: { lat: 39.7767, lng: 30.5206 },
    districts: ['Tepebaşı', 'Odunpazarı', 'Sivrihisar', 'Alpu', 'Mahmudiye'],
    industries: ['havacılık ve savunma', 'raylı sistemler', 'üniversite ve eğitim', 'seramik', 'yazılım'],
    description:
      'Eskişehir; havacılık, raylı sistemler ve savunma sanayii yatırımları, iki büyük üniversitesi ve genç teknoloji ekosistemiyle farklı bir dijital profil çizer. Tepebaşı ve Odunpazarı’ndaki teknoloji girişimleri, sanayi kuruluşları ve eğitim kurumları; web uygulaması geliştirme, MVP ürünleri, eğitim platformları ve kurumsal tanıtım siteleri için destek arar. Tardigrad Software olarak Eskişehir’deki startup’lar için MVP geliştirme ve SaaS altyapısı, sanayi firmaları için iş takip ve raporlama sistemleri, eğitim kurumları için başvuru ve kayıt platformları sunuyoruz. Şehrin genç ve teknolojiye açık kitlesi, dijital ürün geliştirme projeleri için güçlü bir test ortamı sağlar. Kurumsal web sitesi, teknik SEO ve dijital otomasyon hizmetlerimizle Eskişehir’deki işletmelerin büyümesine destek oluyoruz.',
    featuredServices: [
      'mvp-startup-urunu', 'saas-platformu', 'kurumsal-web-sitesi',
      'form-basvuru-sistemi', 'is-takip-sistemi', 'lokal-seo',
    ],
  },
  {
    slug: 'denizli',
    name: 'Denizli',
    region: 'Ege',
    population: 1056332,
    priorityLevel: 3,
    geo: { lat: 37.7765, lng: 29.0864 },
    districts: ['Pamukkale', 'Merkezefendi', 'Sarayköy', 'Çivril', 'Tavas'],
    industries: ['tekstil ve havlu', 'ihracat', 'turizm (Pamukkale)', 'mermer ve maden', 'tarım'],
    description:
      'Denizli, tekstil ve havlu üretiminde dünya çapında tanınan bir ihracat merkezidir; ayrıca Pamukkale sayesinde güçlü bir turizm potansiyeline sahiptir. Merkezefendi ve Pamukkale’deki üreticiler, ihracat firmaları ve turizm işletmeleri; çok dilli tanıtım siteleri, dijital kataloglar, rezervasyon sistemleri ve e-ticaret altyapıları için dijital çözümlere ihtiyaç duyar. Tardigrad Software olarak Denizli’deki tekstil ihracatçıları için İngilizce ve çok dilli ürün katalogları, bayi panelleri ve B2B sipariş sistemleri geliştiriyoruz. Turizm işletmeleri için online rezervasyon ve başvuru sistemleri kuruyor, lokal SEO ile bölge aramalarında görünürlük sağlıyoruz. Mermer ve maden sektöründe faaliyet gösteren firmalar için teklif ve sipariş yönetimi çözümleri sunuyoruz.',
    featuredServices: [
      'urun-tanitim-sitesi', 'e-ticaret-sitesi', 'rezervasyon-basvuru-sistemi',
      'lokal-seo', 'teklif-hazirlama-sistemi', 'kurumsal-web-sitesi',
    ],
  },
]

// ---------------------------------------------------------------------------
// 81 İL — tamamı (12 öncelikli + 69 diğer)
// ---------------------------------------------------------------------------

const OTHER_CITIES: CitySeed[] = [
  { slug: 'adiyaman', name: 'Adıyaman', region: 'Güneydoğu Anadolu', population: 635169, priorityLevel: 3, geo: { lat: 37.7648, lng: 38.2786 }, districts: ['Merkez', 'Kahta', 'Besni', 'Gölbaşı'] },
  { slug: 'afyonkarahisar', name: 'Afyonkarahisar', region: 'Ege', population: 747555, priorityLevel: 3, geo: { lat: 38.7507, lng: 30.5567 }, districts: ['Merkez', 'Sandıklı', 'Dinar', 'Bolvadin'] },
  { slug: 'agri', name: 'Ağrı', region: 'Doğu Anadolu', population: 524644, priorityLevel: 3, geo: { lat: 39.7191, lng: 43.0503 }, districts: ['Merkez', 'Doğubayazıt', 'Patnos', 'Diyadin'] },
  { slug: 'amasya', name: 'Amasya', region: 'Karadeniz', population: 338267, priorityLevel: 3, geo: { lat: 40.6499, lng: 35.8353 }, districts: ['Merkez', 'Merzifon', 'Suluova', 'Taşova'] },
  { slug: 'artvin', name: 'Artvin', region: 'Karadeniz', population: 169543, priorityLevel: 3, geo: { lat: 41.1828, lng: 41.8183 }, districts: ['Merkez', 'Hopa', 'Arhavi', 'Borçka'] },
  { slug: 'aydin', name: 'Aydın', region: 'Ege', population: 1148241, priorityLevel: 3, geo: { lat: 37.856, lng: 27.8416 }, districts: ['Efeler', 'Nazilli', 'Söke', 'Kuşadası', 'Didim'] },
  { slug: 'balikesir', name: 'Balıkesir', region: 'Marmara', population: 1257590, priorityLevel: 3, geo: { lat: 39.6484, lng: 27.8826 }, districts: ['Altıeylül', 'Karesi', 'Bandırma', 'Edremit', 'Ayvalık'] },
  { slug: 'bilecik', name: 'Bilecik', region: 'Marmara', population: 228334, priorityLevel: 3, geo: { lat: 40.1451, lng: 29.9799 }, districts: ['Merkez', 'Bozüyük', 'Osmaneli', 'Söğüt'] },
  { slug: 'bingol', name: 'Bingöl', region: 'Doğu Anadolu', population: 282556, priorityLevel: 3, geo: { lat: 38.8853, lng: 40.4983 }, districts: ['Merkez', 'Genç', 'Solhan', 'Karlıova'] },
  { slug: 'bitlis', name: 'Bitlis', region: 'Doğu Anadolu', population: 353988, priorityLevel: 3, geo: { lat: 38.4006, lng: 42.1095 }, districts: ['Merkez', 'Tatvan', 'Ahlat', 'Güroymak'] },
  { slug: 'bolu', name: 'Bolu', region: 'Karadeniz', population: 320824, priorityLevel: 3, geo: { lat: 40.7392, lng: 31.6089 }, districts: ['Merkez', 'Gerede', 'Mudurnu', 'Göynük'] },
  { slug: 'burdur', name: 'Burdur', region: 'Akdeniz', population: 273716, priorityLevel: 3, geo: { lat: 37.7203, lng: 30.2908 }, districts: ['Merkez', 'Bucak', 'Gölhisar', 'Yeşilova'] },
  { slug: 'canakkale', name: 'Çanakkale', region: 'Marmara', population: 557276, priorityLevel: 3, geo: { lat: 40.1553, lng: 26.4142 }, districts: ['Merkez', 'Biga', 'Çan', 'Gelibolu', 'Ayvacık'] },
  { slug: 'cankiri', name: 'Çankırı', region: 'İç Anadolu', population: 195789, priorityLevel: 3, geo: { lat: 40.6013, lng: 33.6134 }, districts: ['Merkez', 'Ilgaz', 'Çerkeş', 'Orta'] },
  { slug: 'corum', name: 'Çorum', region: 'Karadeniz', population: 525180, priorityLevel: 3, geo: { lat: 40.5489, lng: 34.9533 }, districts: ['Merkez', 'Sungurlu', 'Osmancık', 'İskilip'] },
  { slug: 'diyarbakir', name: 'Diyarbakır', region: 'Güneydoğu Anadolu', population: 1791373, priorityLevel: 3, geo: { lat: 37.9144, lng: 40.2306 }, districts: ['Bağlar', 'Kayapınar', 'Yenişehir', 'Sur', 'Ergani'] },
  { slug: 'edirne', name: 'Edirne', region: 'Marmara', population: 411783, priorityLevel: 3, geo: { lat: 41.6771, lng: 26.5557 }, districts: ['Merkez', 'Keşan', 'Uzunköprü', 'Enez'] },
  { slug: 'elazig', name: 'Elazığ', region: 'Doğu Anadolu', population: 591497, priorityLevel: 3, geo: { lat: 38.681, lng: 39.2264 }, districts: ['Merkez', 'Kovancılar', 'Karakoçan', 'Palu'] },
  { slug: 'erzincan', name: 'Erzincan', region: 'Doğu Anadolu', population: 239223, priorityLevel: 3, geo: { lat: 39.75, lng: 39.4833 }, districts: ['Merkez', 'Tercan', 'Refahiye', 'Üzümlü'] },
  { slug: 'erzurum', name: 'Erzurum', region: 'Doğu Anadolu', population: 767848, priorityLevel: 3, geo: { lat: 39.9043, lng: 41.2679 }, districts: ['Yakutiye', 'Palandöken', 'Aziziye', 'Oltu', 'Horasan'] },
  { slug: 'giresun', name: 'Giresun', region: 'Karadeniz', population: 461712, priorityLevel: 3, geo: { lat: 40.9128, lng: 38.3895 }, districts: ['Merkez', 'Bulancak', 'Görele', 'Espiye'] },
  { slug: 'gumushane', name: 'Gümüşhane', region: 'Karadeniz', population: 164521, priorityLevel: 3, geo: { lat: 40.4386, lng: 39.5086 }, districts: ['Merkez', 'Kelkit', 'Şiran', 'Torul'] },
  { slug: 'hakkari', name: 'Hakkâri', region: 'Doğu Anadolu', population: 275761, priorityLevel: 3, geo: { lat: 37.5744, lng: 43.7408 }, districts: ['Merkez', 'Yüksekova', 'Şemdinli', 'Çukurca'] },
  { slug: 'hatay', name: 'Hatay', region: 'Akdeniz', population: 1609856, priorityLevel: 3, geo: { lat: 36.2025, lng: 36.1606 }, districts: ['Antakya', 'İskenderun', 'Defne', 'Samandağ', 'Kırıkhan'] },
  { slug: 'isparta', name: 'Isparta', region: 'Akdeniz', population: 445325, priorityLevel: 3, geo: { lat: 37.7648, lng: 30.5566 }, districts: ['Merkez', 'Eğirdir', 'Yalvaç', 'Şarkikaraağaç'] },
  { slug: 'mersin', name: 'Mersin', region: 'Akdeniz', population: 1892775, priorityLevel: 3, geo: { lat: 36.8, lng: 34.6333 }, districts: ['Yenişehir', 'Akdeniz', 'Mezitli', 'Toroslar', 'Tarsus', 'Erdemli'] },
  { slug: 'kars', name: 'Kars', region: 'Doğu Anadolu', population: 282323, priorityLevel: 3, geo: { lat: 40.6013, lng: 43.0975 }, districts: ['Merkez', 'Sarıkamış', 'Kağızman', 'Digor'] },
  { slug: 'kastamonu', name: 'Kastamonu', region: 'Karadeniz', population: 378115, priorityLevel: 3, geo: { lat: 41.3887, lng: 33.7827 }, districts: ['Merkez', 'Tosya', 'Taşköprü', 'İnebolu'] },
  { slug: 'kirklareli', name: 'Kırklareli', region: 'Marmara', population: 366363, priorityLevel: 3, geo: { lat: 41.7355, lng: 27.2256 }, districts: ['Merkez', 'Lüleburgaz', 'Babaeski', 'Vize'] },
  { slug: 'kirsehir', name: 'Kırşehir', region: 'İç Anadolu', population: 242944, priorityLevel: 3, geo: { lat: 39.1425, lng: 34.1709 }, districts: ['Merkez', 'Kaman', 'Mucur', 'Çiçekdağı'] },
  { slug: 'kutahya', name: 'Kütahya', region: 'Ege', population: 580701, priorityLevel: 3, geo: { lat: 39.4242, lng: 29.9833 }, districts: ['Merkez', 'Tavşanlı', 'Simav', 'Gediz'] },
  { slug: 'malatya', name: 'Malatya', region: 'Doğu Anadolu', population: 812580, priorityLevel: 3, geo: { lat: 38.3552, lng: 38.3095 }, districts: ['Battalgazi', 'Yeşilyurt', 'Doğanşehir', 'Akçadağ'] },
  { slug: 'manisa', name: 'Manisa', region: 'Ege', population: 1475716, priorityLevel: 3, geo: { lat: 38.6191, lng: 27.4289 }, districts: ['Şehzadeler', 'Yunusemre', 'Akhisar', 'Salihli', 'Turgutlu', 'Soma'] },
  { slug: 'kahramanmaras', name: 'Kahramanmaraş', region: 'Akdeniz', population: 1177436, priorityLevel: 3, geo: { lat: 37.5858, lng: 36.9371 }, districts: ['Onikişubat', 'Dulkadiroğlu', 'Elbistan', 'Afşin', 'Türkoğlu'] },
  { slug: 'mardin', name: 'Mardin', region: 'Güneydoğu Anadolu', population: 870374, priorityLevel: 3, geo: { lat: 37.3212, lng: 40.7245 }, districts: ['Artuklu', 'Kızıltepe', 'Midyat', 'Nusaybin'] },
  { slug: 'mugla', name: 'Muğla', region: 'Ege', population: 1028460, priorityLevel: 3, geo: { lat: 37.2153, lng: 28.3636 }, districts: ['Menteşe', 'Bodrum', 'Fethiye', 'Marmaris', 'Milas', 'Dalaman'] },
  { slug: 'mus', name: 'Muş', region: 'Doğu Anadolu', population: 408728, priorityLevel: 3, geo: { lat: 38.7432, lng: 41.5064 }, districts: ['Merkez', 'Bulanık', 'Malazgirt', 'Varto'] },
  { slug: 'nevsehir', name: 'Nevşehir', region: 'İç Anadolu', population: 310011, priorityLevel: 3, geo: { lat: 38.6939, lng: 34.6857 }, districts: ['Merkez', 'Ürgüp', 'Avanos', 'Gülşehir'] },
  { slug: 'nigde', name: 'Niğde', region: 'İç Anadolu', population: 370183, priorityLevel: 3, geo: { lat: 37.9667, lng: 34.6833 }, districts: ['Merkez', 'Bor', 'Ulukışla', 'Çiftlik'] },
  { slug: 'ordu', name: 'Ordu', region: 'Karadeniz', population: 761400, priorityLevel: 3, geo: { lat: 40.9839, lng: 37.8764 }, districts: ['Altınordu', 'Fatsa', 'Ünye', 'Perşembe'] },
  { slug: 'rize', name: 'Rize', region: 'Karadeniz', population: 348608, priorityLevel: 3, geo: { lat: 41.0201, lng: 40.5234 }, districts: ['Merkez', 'Çayeli', 'Pazar', 'Ardeşen'] },
  { slug: 'sakarya', name: 'Sakarya', region: 'Marmara', population: 1080080, priorityLevel: 3, geo: { lat: 40.7569, lng: 30.3783 }, districts: ['Adapazarı', 'Serdivan', 'Erenler', 'Hendek', 'Akyazı'] },
  { slug: 'samsun', name: 'Samsun', region: 'Karadeniz', population: 1371274, priorityLevel: 3, geo: { lat: 41.2867, lng: 36.33 }, districts: ['İlkadım', 'Atakum', 'Canik', 'Bafra', 'Çarşamba'] },
  { slug: 'siirt', name: 'Siirt', region: 'Güneydoğu Anadolu', population: 331980, priorityLevel: 3, geo: { lat: 37.9333, lng: 41.95 }, districts: ['Merkez', 'Kurtalan', 'Pervari', 'Baykan'] },
  { slug: 'sinop', name: 'Sinop', region: 'Karadeniz', population: 220799, priorityLevel: 3, geo: { lat: 42.0231, lng: 35.1531 }, districts: ['Merkez', 'Boyabat', 'Gerze', 'Ayancık'] },
  { slug: 'sivas', name: 'Sivas', region: 'İç Anadolu', population: 650401, priorityLevel: 3, geo: { lat: 39.7477, lng: 37.0179 }, districts: ['Merkez', 'Şarkışla', 'Suşehri', 'Yıldızeli'] },
  { slug: 'tekirdag', name: 'Tekirdağ', region: 'Marmara', population: 1142451, priorityLevel: 3, geo: { lat: 40.9833, lng: 27.5167 }, districts: ['Süleymanpaşa', 'Çorlu', 'Çerkezköy', 'Ergene', 'Kapaklı'] },
  { slug: 'tokat', name: 'Tokat', region: 'Karadeniz', population: 612646, priorityLevel: 3, geo: { lat: 40.3167, lng: 36.55 }, districts: ['Merkez', 'Erbaa', 'Turhal', 'Niksar'] },
  { slug: 'trabzon', name: 'Trabzon', region: 'Karadeniz', population: 816684, priorityLevel: 3, geo: { lat: 41.0027, lng: 39.7168 }, districts: ['Ortahisar', 'Akçaabat', 'Yomra', 'Of', 'Vakfıkebir'] },
  { slug: 'tunceli', name: 'Tunceli', region: 'Doğu Anadolu', population: 84660, priorityLevel: 3, geo: { lat: 39.1079, lng: 39.5401 }, districts: ['Merkez', 'Pertek', 'Mazgirt', 'Hozat'] },
  { slug: 'sanliurfa', name: 'Şanlıurfa', region: 'Güneydoğu Anadolu', population: 2073615, priorityLevel: 3, geo: { lat: 37.1591, lng: 38.7969 }, districts: ['Eyyübiye', 'Haliliye', 'Karaköprü', 'Siverek', 'Viranşehir'] },
  { slug: 'usak', name: 'Uşak', region: 'Ege', population: 374883, priorityLevel: 3, geo: { lat: 38.6823, lng: 29.4082 }, districts: ['Merkez', 'Banaz', 'Eşme', 'Karahallı'] },
  { slug: 'van', name: 'Van', region: 'Doğu Anadolu', population: 1128749, priorityLevel: 3, geo: { lat: 38.4891, lng: 43.4089 }, districts: ['İpekyolu', 'Tuşba', 'Edremit', 'Erciş', 'Başkale'] },
  { slug: 'yozgat', name: 'Yozgat', region: 'İç Anadolu', population: 421200, priorityLevel: 3, geo: { lat: 39.8181, lng: 34.8147 }, districts: ['Merkez', 'Sorgun', 'Yerköy', 'Boğazlıyan'] },
  { slug: 'zonguldak', name: 'Zonguldak', region: 'Karadeniz', population: 590010, priorityLevel: 3, geo: { lat: 41.4564, lng: 31.7987 }, districts: ['Merkez', 'Ereğli', 'Çaycuma', 'Devrek'] },
  { slug: 'aksaray', name: 'Aksaray', region: 'İç Anadolu', population: 429069, priorityLevel: 3, geo: { lat: 38.3687, lng: 34.037 }, districts: ['Merkez', 'Ortaköy', 'Eskil', 'Gülağaç'] },
  { slug: 'bayburt', name: 'Bayburt', region: 'Karadeniz', population: 86047, priorityLevel: 3, geo: { lat: 40.2552, lng: 40.2249 }, districts: ['Merkez', 'Demirözü', 'Aydıntepe'] },
  { slug: 'karaman', name: 'Karaman', region: 'İç Anadolu', population: 258838, priorityLevel: 3, geo: { lat: 37.1759, lng: 33.2287 }, districts: ['Merkez', 'Ermenek', 'Sarıveliler', 'Kazımkarabekir'] },
  { slug: 'kirikkale', name: 'Kırıkkale', region: 'İç Anadolu', population: 277046, priorityLevel: 3, geo: { lat: 39.8468, lng: 33.5153 }, districts: ['Merkez', 'Yahşihan', 'Keskin', 'Delice'] },
  { slug: 'batman', name: 'Batman', region: 'Güneydoğu Anadolu', population: 626839, priorityLevel: 3, geo: { lat: 37.8812, lng: 41.1351 }, districts: ['Merkez', 'Kozluk', 'Sason', 'Beşiri'] },
  { slug: 'sirnak', name: 'Şırnak', region: 'Güneydoğu Anadolu', population: 557605, priorityLevel: 3, geo: { lat: 37.5164, lng: 42.4611 }, districts: ['Merkez', 'Cizre', 'Silopi', 'İdil'] },
  { slug: 'bartin', name: 'Bartın', region: 'Karadeniz', population: 198999, priorityLevel: 3, geo: { lat: 41.6344, lng: 32.3375 }, districts: ['Merkez', 'Amasra', 'Kurucaşile', 'Ulus'] },
  { slug: 'ardahan', name: 'Ardahan', region: 'Doğu Anadolu', population: 94932, priorityLevel: 3, geo: { lat: 41.1105, lng: 42.7022 }, districts: ['Merkez', 'Göle', 'Posof', 'Çıldır'] },
  { slug: 'igdir', name: 'Iğdır', region: 'Doğu Anadolu', population: 199442, priorityLevel: 3, geo: { lat: 39.9237, lng: 44.045 }, districts: ['Merkez', 'Tuzluca', 'Aralık', 'Karakoyunlu'] },
  { slug: 'yalova', name: 'Yalova', region: 'Marmara', population: 296333, priorityLevel: 3, geo: { lat: 40.65, lng: 29.2667 }, districts: ['Merkez', 'Çiftlikköy', 'Termal', 'Armutlu'] },
  { slug: 'karabuk', name: 'Karabük', region: 'Karadeniz', population: 248014, priorityLevel: 3, geo: { lat: 41.2061, lng: 32.6204 }, districts: ['Merkez', 'Safranbolu', 'Eskipazar', 'Yenice'] },
  { slug: 'kilis', name: 'Kilis', region: 'Güneydoğu Anadolu', population: 145826, priorityLevel: 3, geo: { lat: 36.7184, lng: 37.1212 }, districts: ['Merkez', 'Musabeyli', 'Elbeyli', 'Polateli'] },
  { slug: 'osmaniye', name: 'Osmaniye', region: 'Akdeniz', population: 534415, priorityLevel: 3, geo: { lat: 37.0742, lng: 36.2464 }, districts: ['Merkez', 'Kadirli', 'Düziçi', 'Bahçe'] },
  { slug: 'duzce', name: 'Düzce', region: 'Karadeniz', population: 398467, priorityLevel: 3, geo: { lat: 40.8438, lng: 31.1565 }, districts: ['Merkez', 'Akçakoca', 'Gölyaka', 'Kaynaşlı'] },
]

const ALL_SEEDS: CitySeed[] = [...PRIORITY_SEEDS, ...OTHER_CITIES]

/** Öncelik seviyesine göre sektör kümesi (şablon şehirler için) */
const REGION_INDUSTRIES: Record<string, string[]> = {
  Marmara: ['üretim ve sanayi', 'lojistik', 'hizmet sektörü', 'tarım'],
  Ege: ['tarım ve gıda', 'turizm', 'tekstil', 'ihracat'],
  Akdeniz: ['turizm', 'tarım', 'lojistik', 'inşaat'],
  'İç Anadolu': ['tarım makineleri', 'gıda', 'madencilik', 'hayvancılık'],
  Karadeniz: ['tarım', 'balıkçılık', 'turizm', 'ormancılık'],
  'Doğu Anadolu': ['hayvancılık', 'tarım', 'ticaret', 'turizm'],
  'Güneydoğu Anadolu': ['tarım', 'tekstil', 'ticaret', 'gıda'],
}

function buildDescription(seed: CitySeed): string {
  if (seed.description) return seed.description
  const industries = (REGION_INDUSTRIES[seed.region] ?? ['ticaret', 'hizmet sektörü']).slice(0, 3)
  const districtText = seed.districts.slice(0, 3).join(', ')
  return [
    `${seed.name}, ${seed.region} Bölgesi’nde ${industries.join(', ')} alanlarında faaliyet gösteren işletmeleriyle dijital çözümlere ihtiyaç duyan şehirlerimizden biridir.`,
    `${seed.name} merkez ve ${districtText} çevresindeki firmalar için kurumsal web sitesi, e-ticaret altyapısı, özel yazılım, yönetim paneli ve SEO hizmetleri sunuyoruz.`,
    `Tardigrad Software olarak ${seed.name}’daki işletmelerle projeleri uzaktan yürütüyor; ihtiyaç analizi, tasarım, geliştirme, test, yayına alma ve bakım adımlarını tek ekip olarak yönetiyoruz.`,
    `Şehrinizde Google’da görünürlük kazanmak için lokal SEO, Google Business Profile optimizasyonu ve ${seed.name} odaklı içerik sayfaları hazırlıyor; teknik SEO ile sitenizin hızını ve indexlenmesini iyileştiriyoruz.`,
    `Mevcut sisteminizi modernleştirmek, Excel ve WhatsApp üzerindeki işleri yazılıma taşımak veya sıfırdan bir ürün geliştirmek istiyorsanız ücretsiz ön analiz ile başlayabiliriz.`,
  ].join(' ')
}

function buildCity(seed: CitySeed): City {
  return {
    slug: seed.slug,
    name: seed.name,
    region: seed.region,
    population: seed.population,
    priorityLevel: seed.priorityLevel,
    description: buildDescription(seed),
    districts: seed.districts,
    industries: seed.industries ?? REGION_INDUSTRIES[seed.region] ?? ['ticaret', 'hizmet sektörü'],
    geo: seed.geo,
    featuredServices: seed.featuredServices,
  }
}

export const cities: City[] = ALL_SEEDS.map(buildCity)

export const cityCount = cities.length

export const citiesBySlug: Record<string, City> = Object.fromEntries(
  cities.map((city) => [city.slug, city]),
)

export const citySlugs = cities.map((city) => city.slug)

export function getCityBySlug(slug: string): City | undefined {
  return citiesBySlug[slug]
}

/** Öncelik seviyesine göre şehirler (1 = metropol) */
export function getCitiesByPriority(level: 1 | 2 | 3): City[] {
  return cities.filter((city) => city.priorityLevel === level)
}

/** Ana sayfa ve footer'da öne çıkan 12 şehir */
export const featuredCities: City[] = [
  ...getCitiesByPriority(1),
  ...getCitiesByPriority(2),
  ...getCitiesByPriority(3).slice(0, 4),
].slice(0, 12)

export const featuredCitySlugs = featuredCities.map((city) => city.slug)

/** Bölgeye göre şehirler */
/** Şehir meta başlığı (≤60 karakter) */
export function buildCityMetaTitle(city: City): string {
  const base = `${city.name} Web Sitesi ve Yazılım Hizmetleri`
  return base.length <= 60 ? base : `${city.name} Web Sitesi ve Yazılım`
}

/** Şehir meta açıklaması (≤155 karakter) */
export function buildCityMetaDescription(city: City): string {
  const industries = city.industries.slice(0, 2).join(' ve ')
  const full = `${city.name}’de kurumsal web sitesi, e-ticaret, özel yazılım ve SEO hizmetleri. ${
    industries ? `${industries} sektörüne özel dijital çözümler. ` : ''
  }Ücretsiz ön analiz: Tardigrad Software.`
  if (full.length <= 155) return full
  return full.slice(0, 152).replace(/[,;.]\s*$/, '').trimEnd() + '...'
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter((city) => city.region === region)
}

export const cityRegions = Array.from(new Set(cities.map((city) => city.region)))

/** Şehir sayfasında gösterilecek hizmetler */
export function getCityServices(city: City, services: { slug: string }[]): string[] {
  if (city.featuredServices && city.featuredServices.length) return city.featuredServices
  const rand = seededRandom(hashString(`${city.slug}-services`))
  return services
    .map((s) => ({ slug: s.slug, sort: rand() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 8)
    .map((s) => s.slug)
}

/** Popülasyona göre sıralı (büyükten küçüğe) */
export const citiesByPopulation = [...cities].sort((a, b) => b.population - a.population)

export { PRIORITY_SEEDS as PRIORITY_CITY_SEEDS, OTHER_CITIES, ALL_SEEDS as CITY_SEEDS }

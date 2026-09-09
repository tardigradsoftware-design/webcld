// src/lib/services.ts
// 43 hizmetin tamamı — tip güvenli, SEO alanları ve sayfa içerikleri ile birlikte.
//
// Yapı:
//   1) SERVICE_SEEDS      → elle yazılmış benzersiz çekirdek veriler (anahtar kelime, kapsam, fayda, SSS)
//   2) buildService()     → çekirdek veriden tip uyumlu tam Service nesnesi üretir
//   3) services / helpers → uygulama genelinde kullanılan sorgu fonksiyonları

import type {
  Benefit,
  FAQ,
  ProcessStep,
  Service,
  ServiceCategory,
  ServiceImage,
  WhyNeededItem,
} from '@/types'
import { CATEGORY_MAP } from '@/lib/constants'
import { hashString, seededInt, seededRandom, truncate } from '@/lib/utils'

interface ServiceSeed {
  slug: string
  title: string
  shortTitle: string
  category: ServiceCategory
  primaryKeyword: string
  secondaryKeywords: string[]
  icon: string
  imageQuery: string
  /** 1-2 cümle: hizmetin özü (kart + hero için) */
  summary: string
  /** 100-160 kelimelik "{Hizmet} Nedir?" bölümü */
  description: string
  heroTagline: string
  whyNeeded: { title: string; description: string; icon: string }[]
  scope: string[]
  benefits: { title: string; description: string; metric?: string; icon: string }[]
  targetAudience: string[]
  faq: { question: string; answer: string }[]
  relatedServices: string[]
  /** Şehir kombinasyonu üretilecek öncelikli hizmetler */
  localPriority?: boolean
  schemaType?: 'Service' | 'ProfessionalService'
}

// ---------------------------------------------------------------------------
// ÇEKİRDEK VERİLER — 43 hizmet
// ---------------------------------------------------------------------------

const SEEDS: ServiceSeed[] = [
  // 01
  {
    slug: 'kurumsal-web-sitesi',
    title: 'Kurumsal Web Sitesi',
    shortTitle: 'Kurumsal Web Sitesi',
    category: 'web',
    primaryKeyword: 'kurumsal web sitesi',
    secondaryKeywords: [
      'kurumsal web sitesi hizmeti',
      'firma web sitesi',
      'kurumsal internet sitesi',
      'web sitesi tasarımı',
    ],
    icon: 'Building2',
    imageQuery: 'corporate website design dark',
    summary:
      'Markanızı dijitalde doğru anlatan, hızlı, SEO uyumlu ve yönetimi kolay kurumsal web siteleri tasarlıyor ve geliştiriyoruz.',
    description:
      'Kurumsal web sitesi, bir işletmenin dijital dünyadaki merkez ofisidir; müşterileriniz sizi Google’da bulduğunda ilk karşılaştığı yüz, markanızın güvenilirliğini belirler. Tardigrad Software olarak kurumsal web sitesi hizmetimizde yalnızca görsel bir tasarım üretmiyoruz. İşletmenizin hizmetlerini, referanslarını, sektör deneyimini ve iletişim kanallarını tek bir stratejik akışta birleştiriyoruz. Next.js ve TypeScript altyapısıyla geliştirdiğimiz siteler 1 saniyenin altında açılır, mobilde kusursuz çalışır ve schema.org yapısal verisi ile Google tarafından doğru biçimde anlaşılır. Yönetim paneli sayesinde ekibiniz teknik bilgiye ihtiyaç duymadan içerik güncelleyebilir. Kurumsal web sitesi yatırımı; yeni müşteri kazanımı, marka itibarı ve satış ekibinizin ikna gücü üzerinde doğrudan etki yaratır. Türkiye’nin 81 ilinde faaliyet gösteren işletmeler için kurumsal web sitesi projelerini uzaktan, şeffaf bir süreçle yönetiyoruz. Proje sonunda hız skorları, SEO denetimi ve bakım planı ile birlikte teslim ediyoruz.',
    heroTagline: 'Markanızın dijital merkez ofisi: hızlı, güvenli ve SEO uyumlu.',
    whyNeeded: [
      {
        title: 'İlk izlenim 3 saniyede oluşuyor',
        description:
          'Potansiyel müşteriler sitenizi açtığında yavaş veya eski görünümlü bir sayfa ile karşılaşırsa teklif aşamasına hiç gelmiyor.',
        icon: 'Timer',
      },
      {
        title: 'Mobil trafiği kaybediyorsunuz',
        description:
          'Türkiye’de aramaların büyük bölümü mobilden yapılıyor. Mobil uyumlu olmayan kurumsal siteler ciddi oranda talep kaybeder.',
        icon: 'Smartphone',
      },
      {
        title: 'Google’da görünmüyorsunuz',
        description:
          'Teknik SEO temeli olmayan siteler, rakipleri aynı bütçeyi harcamadan üst sıralara çıkarken görünmez kalır.',
        icon: 'SearchX',
      },
      {
        title: 'Güven vermeyen iletişim',
        description:
          'Kurumsal e-posta yerine ücretsiz adresler, güncellenmemiş referanslar ve eksik KVKK metni itibar kaybı yaratır.',
        icon: 'ShieldAlert',
      },
    ],
    scope: [
      'İhtiyaç analizi, hedef kitle ve rakip incelemesi',
      'Kurumsal kimliğe uygun özgün UI/UX tasarımı',
      'Ana sayfa, hizmetler, hakkımızda, referanslar, blog ve iletişim sayfaları',
      'İçerik yönetim paneli (ekibinizin kendi başına güncelleyebileceği yapı)',
      'Çok dilli altyapı hazırlığı (isteğe bağlı)',
      'Teknik SEO: meta yönetimi, canonical, sitemap, robots, schema.org',
      'Hız optimizasyonu: WebP görseller, next/image, font ve kod optimizasyonu',
      'İletişim formu + spam koruması + KVKK onayı + e-posta bildirimi',
      'Google Analytics 4 ve Search Console kurulumu',
      'Yayına alma, 301 yönlendirmeleri ve 30 gün hata düzeltme garantisi',
    ],
    benefits: [
      {
        title: 'Daha hızlı açılan sayfalar',
        description: 'Core Web Vitals hedeflerine uygun, optimize edilmiş yayın altyapısı.',
        metric: '%55 daha hızlı',
        icon: 'Zap',
      },
      {
        title: 'Daha fazla iletişim talebi',
        description: 'Net CTA yerleşimi ve güven veren tasarım ile form dönüşüm oranı artar.',
        metric: '2x dönüşüm',
        icon: 'MousePointerClick',
      },
      {
        title: 'Google’da görünürlük',
        description: 'Teknik SEO temeli ve yapısal veri ile organik trafikte istikrarlı artış.',
        metric: '+40% organik',
        icon: 'TrendingUp',
      },
      {
        title: 'Kendi başınıza güncelleme',
        description: 'Yönetim paneli sayesinde içerik değişiklikleri için ajans beklemeye gerek kalmaz.',
        metric: '0 teknik bilgi',
        icon: 'Settings2',
      },
      {
        title: 'Uzun ömürlü mimari',
        description: 'Tip güvenli kod ve modüler yapı; yeni sayfa ve entegrasyon eklemek kolaydır.',
        metric: '5 yıl+ ömür',
        icon: 'Layers',
      },
    ],
    targetAudience: [
      'KOBİ ve orta ölçekli işletmeler',
      'Üretim ve sanayi firmaları',
      'Hukuk, mali müşavirlik ve danışmanlık ofisleri',
      'Sağlık klinikleri ve diş hekimleri',
      'İnşaat ve mimarlık şirketleri',
      'Lojistik ve dış ticaret firmaları',
      'Eğitim kurumları ve kurslar',
      'Hizmet sektörü işletmeleri',
    ],
    faq: [
      {
        question: 'Kurumsal web sitesi ne kadar sürede hazırlanır?',
        answer:
          'Standart bir kurumsal web sitesi projesi ortalama 2-4 hafta içinde tamamlanır. Tasarım onayı, içerik teslimi ve entegrasyon ihtiyaçları takvimi etkiler. İçerikleriniz hazırsa ve onaylar hızlı verilirse 10 iş gününe kadar kısalabilir.',
      },
      {
        question: 'Mevcut sitemdeki içerikler ve Google sıralamam korunur mu?',
        answer:
          'Evet. Yayına geçişte tüm eski adresler için 301 yönlendirme haritası çıkarır, sitemap’i günceller ve Search Console üzerinden geçişi izleriz. İçeriklerinizi taşıyıp SEO açısından zayıf sayfaları güçlendirerek devralırız.',
      },
      {
        question: 'Sitenin içeriğini kendim güncelleyebilir miyim?',
        answer:
          'Evet. Teslim ettiğimiz yönetim paneli üzerinden sayfa, haber, referans ve görsel ekleyebilirsiniz. Panel kullanımı için kısa bir eğitim videosu ve doküman sağlıyoruz.',
      },
      {
        question: 'Web sitesi fiyatları neye göre belirleniyor?',
        answer:
          'Sayfa sayısı, tasarımın özgünlüğü, entegrasyonlar (CRM, ödeme, rezervasyon), çok dillilik ve bakım ihtiyacı fiyatı belirler. Ücretsiz ön analiz sonrası kalem kalem yazılı teklif paylaşıyoruz; gizli maliyet yoktur.',
      },
      {
        question: 'Hosting, domain ve e-posta işlerini de siz mi yönetiyorsunuz?',
        answer:
          'İsterseniz evet. Domain ve DNS yönetimi, hosting kurulumu, SSL, yedekleme ve kurumsal e-posta yapılandırmasını biz üstlenebiliriz ya da mevcut sağlayıcınızla birlikte çalışabiliriz.',
      },
      {
        question: 'Site mobil ve tabletlerde nasıl görünür?',
        answer:
          'Tüm projeleri mobil öncelikli (mobile-first) geliştiriyoruz. Tasarım aşamasında mobil, tablet ve masaüstü görünümleri ayrı ayrı onayınıza sunulur ve gerçek cihazlarda test edilir.',
      },
      {
        question: 'Teslim sonrası destek veriyor musunuz?',
        answer:
          'Yayına alma sonrası 30 gün boyunca hata düzeltme garantisi veriyoruz. Sonrasında aylık bakım paketi ile güncelleme, yedekleme, güvenlik izleme ve küçük içerik değişikliklerini biz yönetiyoruz.',
      },
    ],
    relatedServices: [
      'firma-web-sitesi',
      'web-sitesi-yenileme',
      'teknik-seo',
      'landing-page',
      'kurumsal-email',
      'hosting-yedekleme',
      'lokal-seo',
    ],
    localPriority: true,
    schemaType: 'ProfessionalService',
  },
  // 02
  {
    slug: 'firma-web-sitesi',
    title: 'Firma Web Sitesi',
    shortTitle: 'Firma Web Sitesi',
    category: 'web',
    primaryKeyword: 'firma web sitesi',
    secondaryKeywords: [
      'firma web sitesi tasarımı',
      'şirket sitesi',
      'işletme web sitesi',
      'profesyonel internet sitesi',
    ],
    icon: 'Briefcase',
    imageQuery: 'business website professional',
    summary:
      'Küçük ve orta ölçekli firmalar için hızlı kurulan, profesyonel görünümlü ve satış odaklı web siteleri.',
    description:
      'Firma web sitesi, işletmenizin ne yaptığını, kime hizmet verdiğini ve neden tercih edilmesi gerektiğini birkaç saniyede anlatan en güçlü satış aracıdır. Tardigrad Software olarak firma web sitesi projelerinde gösterişten çok netliğe odaklanıyoruz: kim olduğunuz, hangi problemi çözdüğünüz, referanslarınız ve iletişim yolunuz tek bakışta anlaşılır. Hazır şablonlara sıkışmak yerine firmanızın sektörüne, hizmet alanına ve hedef kitlesine göre kurgulanmış bir sayfa akışı tasarlıyoruz. Site; hızlı açılır, mobilde sorunsuz çalışır, Google’da doğru anahtar kelimelerle indexlenir ve iletişim formları doğrudan size ulaşır. İsterseniz kurumsal e-posta, domain yönetimi ve bakım hizmetlerini de aynı pakette sunuyoruz. Yeni kurulmuş bir işletme olsanız da yıllardır faaliyet gösterseniz de, firma web sitesi yatırımının geri dönüşü ölçülebilir: daha fazla arama görünürlüğü, daha fazla teklif talebi ve daha güçlü bir marka algısı.',
    heroTagline: 'Firmanızın hikâyesini anlatan, teklif getiren bir web sitesi.',
    whyNeeded: [
      {
        title: 'Müşteriler önce Google’a soruyor',
        description:
          'Web sitesi olmayan bir firma, arama yapan potansiyel müşteriler için hiç var olmamış demektir.',
        icon: 'Search',
      },
      {
        title: 'Rakipleriniz dijitalde önde',
        description:
          'Aynı bölgede aynı işi yapan firmalar profesyonel sitelerle teklifleri toplarken siz telefon bekliyorsanız kayıp büyür.',
        icon: 'Swords',
      },
      {
        title: 'Güven eksikliği satış kapatır',
        description:
          'Kurumsal bir adresi, referansları ve açık iletişim bilgileri olmayan firmalar kurumsal müşterilerden elenir.',
        icon: 'BadgeCheck',
      },
      {
        title: 'Sürekli tekrar eden sorular',
        description:
          'Hizmet kapsamı, fiyat mantığı ve çalışma süreci sitede anlatılmadığında aynı sorular telefonda defalarca yanıtlanır.',
        icon: 'MessagesSquare',
      },
    ],
    scope: [
      'Firma tanıtımı, hizmet ve sektör sayfaları kurgusu',
      'Özgün tasarım ve kurumsal kimlik uyumu',
      'Hızlı iletişim formu, telefon ve WhatsApp entegrasyonu',
      'Google Haritalar konum ve çalışma saatleri bloğu',
      'Referans ve proje vitrini bölümü',
      'Blog / duyuru altyapısı ile sürekli içerik üretimi',
      'Teknik SEO ve schema.org (Organization + LocalBusiness) işaretlemeleri',
      'Domain, hosting ve kurumsal e-posta yapılandırması',
      'GA4 kurulumu ve dönüşüm takibi',
      'Yayına alma ve 30 gün destek',
    ],
    benefits: [
      {
        title: 'Hızlı kurulum',
        description: 'Net kapsamla 2-3 hafta içinde yayında olan profesyonel bir site.',
        metric: '15 günde yayın',
        icon: 'Rocket',
      },
      {
        title: 'Teklif taleplerinde artış',
        description: 'İyi kurgulanmış CTA ve formlar sayesinde gelen talep sayısı belirgin şekilde yükselir.',
        metric: '+35% talep',
        icon: 'Inbox',
      },
      {
        title: 'Kurumsal görünüm',
        description: 'Marka değerinizi yükselten tutarlı tasarım ve profesyonel içerik dili.',
        metric: 'İtibar +',
        icon: 'Award',
      },
      {
        title: 'Düşük işletme maliyeti',
        description: 'Sunucu, bakım ve güncelleme maliyetleri öngörülebilir ve düşüktür.',
        metric: 'Sabit maliyet',
        icon: 'Wallet',
      },
    ],
    targetAudience: [
      'Yeni kurulan işletmeler',
      'KOBİ’ler',
      'Hizmet sektörü firmaları',
      'Müteahhit ve yapı firmaları',
      'Teknik servisler',
      'Toptan ve perakende ticaret',
      'Ajanslar ve danışmanlar',
    ],
    faq: [
      {
        question: 'Firma web sitesi ile kurumsal web sitesi arasındaki fark nedir?',
        answer:
          'Firma web sitesi daha çok tanıtım ve iletişim odaklı, daha hızlı kurulan bir çözümdür. Kurumsal web sitesi ise çok sayfalı mimari, içerik yönetim paneli, çok dillilik ve daha kapsamlı marka kurgusu içerir. İhtiyacınıza göre ücretsiz ön analizde hangisinin uygun olduğunu birlikte belirliyoruz.',
      },
      {
        question: 'Domain ve hosting dahil mi?',
        answer:
          'İsteğe bağlı olarak dahil edebiliriz. Kendi domaininiz varsa DNS yönetimini biz yapılandırırız. Hosting tarafında Vercel ve güvenilir bulut sağlayıcılarıyla çalışıyor, yıllık maliyeti şeffaf biçimde paylaşıyoruz.',
      },
      {
        question: 'İçerikleri kim yazacak?',
        answer:
          'Temel metinleri sizin verdiğiniz bilgilerden biz üretiyoruz. İsterseniz SEO odaklı içerik üretimi paketini de ekleyebilir; hizmet sayfaları ve blog yazılarını anahtar kelime araştırmasıyla hazırlayabiliriz.',
      },
      {
        question: 'Sitem Google’da ne zaman çıkmaya başlar?',
        answer:
          'Yayına aldığımız gün Search Console’a gönderim yapılır ve indexleme birkaç gün içinde başlar. Rekabetçi anahtar kelimelerde anlamlı sıralama için genellikle 2-4 aylık sürekli optimizasyon gerekir.',
      },
      {
        question: 'Sonradan yeni sayfa ekleyebilir miyim?',
        answer:
          'Evet. Mimari buna göre kurulur; yönetim panelinden sayfa ekleyebilir ya da bizden destek alabilirsiniz. E-ticaret, rezervasyon veya CRM gibi modüller de sonradan entegre edilebilir.',
      },
      {
        question: 'Firma web sitesi mobil uyumlu mu?',
        answer:
          'Tüm projeler mobil öncelikli geliştirilir ve gerçek cihazlarda test edilir. Dokunmatik alanlar, menü davranışı ve form deneyimi mobil kullanıcıya göre optimize edilir.',
      },
    ],
    relatedServices: [
      'kurumsal-web-sitesi',
      'urun-tanitim-sitesi',
      'lokal-seo',
      'kurumsal-email',
      'web-sitesi-yenileme',
      'landing-page',
    ],
  },
  // 03
  {
    slug: 'landing-page',
    title: 'Landing Page Tasarımı',
    shortTitle: 'Landing Page',
    category: 'web',
    primaryKeyword: 'landing page',
    secondaryKeywords: [
      'landing page nedir',
      'açılış sayfası',
      'satış sayfası',
      'kampanya sayfası',
    ],
    icon: 'MousePointerClick',
    imageQuery: 'landing page conversion dark',
    summary:
      'Reklam bütçenizi boşa harcamayan, tek hedefe odaklanan yüksek dönüşümlü açılış sayfaları.',
    description:
      'Landing page, tek bir hedefe odaklanan açılış sayfasıdır: ziyaretçi gelir, mesajı anlar ve istenen aksiyonu alır. Reklam trafiğinin ana sayfaya yönlendirilmesi dönüşüm oranlarını ciddi biçimde düşürür; çünkü ziyaretçinin dikkatini dağıtan onlarca link ve mesaj bulunur. Tardigrad Software olarak landing page tasarlarken önce tek bir hedef belirliyoruz — form doldurma, WhatsApp mesajı, randevu alma veya satış. Ardından başlık hiyerarşisi, sosyal kanıt, itiraz kırıcı bölümler ve CTA yerleşimini bu hedefe göre kurguluyoruz. A/B test altyapısı, GA4 dönüşüm takibi ve piksel entegrasyonları ile hangi versiyonun daha iyi çalıştığını veriyle ölçüyoruz. Sayfalar next/image ve kritik CSS optimizasyonlarıyla 1 saniyenin altında açılır; bu hem reklam kalite puanını hem dönüşüm oranını doğrudan yükseltir. Kampanya, ürün lansmanı, etkinlik kaydı veya lead toplama için landing page ihtiyacınız varsa, 5-10 iş günü içinde yayına alıyoruz.',
    heroTagline: 'Tek hedef, tek sayfa, ölçülebilir dönüşüm.',
    whyNeeded: [
      {
        title: 'Reklam bütçesi boşa gidiyor',
        description:
          'Tıklama başına ödeme yapıyorsanız, zayıf bir açılış sayfası her tıklamada para kaybettirir.',
        icon: 'CircleDollarSign',
      },
      {
        title: 'Ana sayfa satış yapmaz',
        description:
          'Ana sayfa bilgilendirir; dönüşüm için odaklanmış, sade ve ikna eden ayrı bir sayfa gerekir.',
        icon: 'Crosshair',
      },
      {
        title: 'Ölçüm yapılamıyor',
        description:
          'Dönüşüm takibi kurulmamış kampanyalarda hangi mesajın çalıştığını bilemez, körlemesine bütçe harcarsınız.',
        icon: 'ChartLine',
      },
      {
        title: 'Kampanya hızla yayına alınmalı',
        description:
          'Fırsat pencereleri kısadır; haftalarca süren site projeleri kampanyayı kaçırmanıza neden olur.',
        icon: 'AlarmClock',
      },
    ],
    scope: [
      'Hedef ve dönüşüm metriği tanımı',
      'Mesaj hiyerarşisi ve ikna akışı kurgusu',
      'Özgün tasarım (mobil öncelikli)',
      'Form, WhatsApp ve telefon dönüşüm noktaları',
      'Sosyal kanıt: yorum, logo, sayısal kanıt blokları',
      'Sık sorulan sorular ve itiraz kırıcı bölüm',
      'GA4 + Meta/Google Ads piksel entegrasyonu',
      'A/B test altyapısı ve varyasyon üretimi',
      'Hız optimizasyonu (LCP < 2.0s hedefi)',
      'Kampanya sonrası performans raporu',
    ],
    benefits: [
      {
        title: 'Daha yüksek dönüşüm oranı',
        description: 'Odaklı mesaj ve sade akış sayesinde aynı trafikte daha fazla form ve satış.',
        metric: '%30-80 artış',
        icon: 'Target',
      },
      {
        title: 'Daha düşük lead maliyeti',
        description: 'Kalite puanı yükselir, tıklama maliyeti düşer.',
        metric: '-25% CPC',
        icon: 'PiggyBank',
      },
      {
        title: 'Hızlı yayın',
        description: 'Kampanya takvimine uygun, günler içinde yayında.',
        metric: '5-10 gün',
        icon: 'Timer',
      },
      {
        title: 'Veriye dayalı iyileştirme',
        description: 'Her varyasyon ölçülür; kararlar tahmine değil veriye dayanır.',
        metric: 'A/B test',
        icon: 'FlaskConical',
      },
    ],
    targetAudience: [
      'Performans pazarlama yapan firmalar',
      'E-ticaret kampanyaları',
      'Eğitim ve kurs programları',
      'Etkinlik ve webinar organizasyonları',
      'SaaS ürün lansmanları',
      'Sağlık ve estetik klinikleri',
      'Gayrimenkul projeleri',
    ],
    faq: [
      {
        question: 'Landing page nedir, normal web sitesinden farkı ne?',
        answer:
          'Landing page tek bir hedefe odaklanan, menü ve dikkat dağıtıcı linkleri minimumda tutan açılış sayfasıdır. Web sitesi işletmeyi bütünüyle anlatırken, landing page ziyaretçiyi tek bir aksiyona yönlendirir.',
      },
      {
        question: 'Reklam vermeden landing page işe yarar mı?',
        answer:
          'Evet. Organik trafik, sosyal medya, e-posta listesi veya WhatsApp yönlendirmeleri için de odaklı bir sayfa dönüşümü artırır. Ayrıca belirli bir hizmet için ayrı bir açılış sayfası SEO açısından da değerlidir.',
      },
      {
        question: 'A/B testi yapıyor musunuz?',
        answer:
          'Evet. Başlık, CTA metni, görsel ve bölüm sırası gibi kritik öğelerde varyasyonlar üretip GA4 üzerinden karşılaştırıyor, kazanan versiyonu kalıcı hâle getiriyoruz.',
      },
      {
        question: 'Formdan gelen lead’lar nereye düşüyor?',
        answer:
          'E-posta bildirimi, Supabase veritabanı kaydı ve tercihinize göre CRM veya WhatsApp entegrasyonu kuruyoruz. Lead’lerin kaybı yaşanmaz, her gönderim loglanır.',
      },
      {
        question: 'Landing page kaç günde hazır olur?',
        answer:
          'İçerik ve görseller hazırsa 5-10 iş günü içinde yayına alıyoruz. Çok dilli veya ödeme entegrasyonlu sayfalarda süre biraz uzayabilir.',
      },
      {
        question: 'Mevcut sitemin altında bir sayfa olarak yayınlanabilir mi?',
        answer:
          'Evet. Mevcut alan adınızda alt sayfa (siteadi.com/kampanya/) veya ayrı bir alt alan adı (kampanya.siteadi.com) olarak yayınlayabiliriz; DNS ve SSL yapılandırmasını biz üstleniyoruz.',
      },
    ],
    relatedServices: [
      'kurumsal-web-sitesi',
      'form-basvuru-sistemi',
      'e-ticaret-sitesi',
      'teknik-seo',
      'odeme-whatsapp-crm-entegrasyonu',
      'ai-icerik-araclar',
    ],
  },
  // 04
  {
    slug: 'e-ticaret-sitesi',
    title: 'E-Ticaret Sitesi',
    shortTitle: 'E-Ticaret Sitesi',
    category: 'web',
    primaryKeyword: 'e-ticaret sitesi',
    secondaryKeywords: [
      'e-ticaret web sitesi kurulumu',
      'online satış sitesi',
      'e-ticaret yazılımı',
      'e ticaret sitesi fiyatları',
    ],
    icon: 'ShoppingCart',
    imageQuery: 'ecommerce online store dark',
    summary:
      'Ürünlerinizi 7/24 satan, ödeme ve kargo entegrasyonlu, SEO uyumlu e-ticaret siteleri kuruyoruz.',
    description:
      'E-ticaret sitesi, ürünlerinizi coğrafi sınır olmadan 7/24 satmanızı sağlayan dijital mağazadır. Ancak başarılı bir e-ticaret projesi yalnızca ürün listelemek değildir; kategori mimarisi, filtreleme, sepet ve ödeme akışı, kargo entegrasyonu, stok senkronizasyonu ve teknik SEO birlikte çalışmalıdır. Tardigrad Software olarak e-ticaret sitesi kurulumunda Next.js tabanlı, hız odaklı bir mimari kullanıyoruz. Ürün sayfaları schema.org Product işaretlemesi ile zengin sonuçlara uygun hazırlanır, ödeme tarafında Türkiye’de yaygın sanal POS altyapılarıyla entegrasyon sağlanır. Sepet terk oranını düşüren akışlar, mobilde tek elle tamamlanabilen ödeme adımları ve güven veren iade/teslimat blokları standart olarak yer alır. İsterseniz mevcut pazar yeri hesaplarınızla stok ve sipariş senkronizasyonu kuruyor, isterseniz tamamen size özel bir e-ticaret yazılımı geliştiriyoruz. Proje sonunda hız skorları, dönüşüm hunisi ölçümü ve büyüme önerileri ile teslim ediyoruz.',
    heroTagline: 'Ürünlerinizi 7/24 satan, hızlı ve güvenli dijital mağaza.',
    whyNeeded: [
      {
        title: 'Pazar yeri komisyonları kârı eritiyor',
        description:
          'Yüksek komisyonlar ve müşteri verisine erişememe, markanızı platformlara bağımlı hâle getirir.',
        icon: 'Percent',
      },
      {
        title: 'Müşteri verisi sizde değil',
        description:
          'Kendi siteniz olmadığında yeniden pazarlama, e-posta listesi ve sadakat programı kuramazsınız.',
        icon: 'DatabaseZap',
      },
      {
        title: 'Yavaş siteler sepeti terk ettirir',
        description:
          'Sayfa açılışındaki her 1 saniyelik gecikme dönüşüm oranını belirgin biçimde düşürür.',
        icon: 'Gauge',
      },
      {
        title: 'Google Shopping ve organik trafik kaçıyor',
        description:
          'Ürün verisi yapısal olarak işaretlenmediğinde ücretsiz görünürlük fırsatları kullanılamaz.',
        icon: 'ShoppingBag',
      },
    ],
    scope: [
      'Kategori ve ürün mimarisi planlaması',
      'Ürün listeleme, filtreleme ve arama',
      'Ürün detay sayfaları (varyant, stok, görsel galerisi)',
      'Sepet ve çok adımlı / tek sayfa ödeme akışı',
      'Sanal POS ve ödeme altyapısı entegrasyonu',
      'Kargo entegrasyonu ve sipariş takibi',
      'Üyelik, adres defteri ve sipariş geçmişi',
      'Stok ve fiyat yönetimi paneli (ERP / pazar yeri senkronu opsiyonel)',
      'Product, Offer, BreadcrumbList schema.org işaretlemeleri',
      'KVKK, mesafeli satış sözleşmesi ve iade süreçleri sayfaları',
      'GA4 e-ticaret olayları ve dönüşüm hunisi kurulumu',
      'Hız optimizasyonu ve görsel WebP dönüşümü',
    ],
    benefits: [
      {
        title: 'Komisyonsuz satış kanalı',
        description: 'Kendi mağazanızda satış yaparak pazar yeri komisyonlarını ortadan kaldırırsınız.',
        metric: '%15-25 tasarruf',
        icon: 'Coins',
      },
      {
        title: 'Daha yüksek sepet tamamlama',
        description: 'Optimize edilmiş ödeme akışı ve hızlı sayfalar terk oranını düşürür.',
        metric: '-30% terk',
        icon: 'ShoppingBasket',
      },
      {
        title: 'Müşteri verisi sahipliği',
        description: 'E-posta, telefon ve alışveriş geçmişi sizde; sadakat ve yeniden pazarlama mümkün.',
        metric: '1. taraf veri',
        icon: 'Users',
      },
      {
        title: 'Ölçeklenebilir altyapı',
        description: 'Kampanya günlerinde trafik artsa da site ayakta kalır.',
        metric: 'Yüksek trafikte stabil',
        icon: 'Activity',
      },
      {
        title: 'Google’da ürün görünürlüğü',
        description: 'Yapısal veri ve teknik SEO ile ürün sayfaları organik trafik getirir.',
        metric: 'Ücretsiz trafik',
        icon: 'Search',
      },
    ],
    targetAudience: [
      'Perakende ve toptan satış yapan firmalar',
      'Tekstil ve hazır giyim',
      'Kozmetik ve kişisel bakım',
      'Elektronik ve beyaz eşya',
      'Gıda ve yöresel ürün üreticileri',
      'Hırdavat ve endüstriyel ürünler',
      'El sanatları ve butik üreticiler',
      'Pazar yerinden kendi sitesine geçmek isteyenler',
    ],
    faq: [
      {
        question: 'E-ticaret sitesi kurulumu ne kadar sürer?',
        answer:
          'Ürün sayısı ve entegrasyon ihtiyacına göre 4-8 hafta arasında değişir. Hazır ödeme altyapısı ve sınırlı ürün yelpazesiyle daha hızlı, ERP entegrasyonlu büyük kataloglarda daha uzun sürer.',
      },
      {
        question: 'Hangi ödeme sistemlerini entegre ediyorsunuz?',
        answer:
          'Türkiye’de yaygın sanal POS sağlayıcıları, banka kartı/kredi kartı, havale/EFT ve kapıda ödeme seçenekleriyle çalışıyoruz. Mevcut anlaşmanız olan bankanın sanal POS’unu da entegre edebiliriz.',
      },
      {
        question: 'Ürünleri kim yükleyecek?',
        answer:
          'İlk kurulumda örnek ürünleri biz yüklüyor ve panel eğitimini veriyoruz. Toplu ürün girişini Excel/CSV içe aktarma ile hızlandırıyoruz. İsterseniz katalog girişini hizmet olarak da üstlenebiliriz.',
      },
      {
        question: 'Pazar yerleriyle stok senkronizasyonu mümkün mü?',
        answer:
          'Evet. API entegrasyonu ile pazar yeri siparişleri ve stok güncellemeleri tek panelde toplanabilir. Bu, çift satış riskini ve manuel stok takibini ortadan kaldırır.',
      },
      {
        question: 'Mevcut e-ticaret sitemi taşıyabilir misiniz?',
        answer:
          'Evet. Ürün, kategori ve müşteri verilerini aktarıyor, eski URL’ler için 301 yönlendirme haritası çıkararak Google görünürlüğünü koruyoruz.',
      },
      {
        question: 'E-ticaret sitesinde SEO dahil mi?',
        answer:
          'Teknik SEO temeli (hız, yapısal veri, sitemap, meta yönetimi, mobil uyum) standart olarak dahildir. Kategori içerikleri ve sürekli SEO çalışması ayrı bir paket olarak sunulur.',
      },
      {
        question: 'Fatura ve muhasebe entegrasyonu yapıyor musunuz?',
        answer:
          'Evet. e-Fatura/e-Arşiv sağlayıcıları ve yaygın muhasebe yazılımlarıyla API entegrasyonu kurarak siparişten faturaya otomatik akış oluşturuyoruz.',
      },
    ],
    relatedServices: [
      'stok-yonetimi',
      'proforma-siparis-yonetimi',
      'odeme-whatsapp-crm-entegrasyonu',
      'teknik-seo',
      'urun-tanitim-sitesi',
      'musteri-paneli',
      'api-entegrasyonu',
    ],
    localPriority: true,
    schemaType: 'ProfessionalService',
  },
  // 05
  {
    slug: 'urun-tanitim-sitesi',
    title: 'Ürün ve Hizmet Tanıtım Sitesi',
    shortTitle: 'Tanıtım Sitesi',
    category: 'web',
    primaryKeyword: 'ürün tanıtım sitesi',
    secondaryKeywords: [
      'ürün web sitesi',
      'hizmet tanıtım sitesi',
      'ürün tanıtım sayfası',
      'katalog sitesi',
    ],
    icon: 'Package',
    imageQuery: 'product showcase website',
    summary:
      'Tek ürün, tek hizmet veya katalog odaklı; görsel gücü yüksek tanıtım siteleri ve dijital kataloglar.',
    description:
      'Ürün tanıtım sitesi, belirli bir ürünü, ürün ailesini veya hizmeti derinlemesine anlatan odaklı bir dijital vitrindir. E-ticaret yapmadan da satış üretebilirsiniz: ziyaretçi ürünü tanır, teknik özellikleri inceler, görselleri ve kullanım senaryolarını görür, sonra teklif ister. Tardigrad Software olarak tanıtım sitelerinde anlatı akışına önem veriyoruz. Önce problem, sonra çözüm, ardından teknik detay ve sosyal kanıt sırasıyla ilerleyen bir kurgu tasarlıyoruz. Galeri, video, 360° görsel, indirilebilir katalog (PDF) ve karşılaştırma tabloları ile ürünün değeri somutlaşıyor. Dijital katalog siteleri; bayi ağları, ihracat yapan üreticiler ve teknik ürün satan firmalar için güçlü bir satış destek aracıdır. Her ürün sayfası schema.org Product işaretlemesi ile hazırlanır, böylece Google görsel ve zengin sonuçlarda görünürlük kazanırsınız. Teklif formu ve WhatsApp entegrasyonu sayesinde ziyaretçiler doğrudan satış ekibinize ulaşır.',
    heroTagline: 'Ürününüzü anlatan, teklif toplayan dijital vitrin.',
    whyNeeded: [
      {
        title: 'Bayiler güncel bilgiye ulaşamıyor',
        description:
          'Eski katalog PDF’leri ve dağınık fiyat listeleri bayi ağında tutarsız anlatıma yol açar.',
        icon: 'FileWarning',
      },
      {
        title: 'Ürün değeri anlaşılmıyor',
        description:
          'Teknik özellik listesi tek başına ikna etmez; kullanım senaryosu ve karşılaştırma gerekir.',
        icon: 'EyeOff',
      },
      {
        title: 'İhracatta görünürlük eksik',
        description:
          'Yabancı alıcılar ürününüzü İngilizce kaynaklarda arar; çok dilli tanıtım olmadan bulunamazsınız.',
        icon: 'Globe',
      },
      {
        title: 'Satış ekibi tekrar ediyor',
        description:
          'Her görüşmede aynı sunum tekrarlanıyorsa, ürün hikâyesi dijitalde kendi kendine çalışmıyordur.',
        icon: 'Repeat',
      },
    ],
    scope: [
      'Ürün ailesi ve kategori mimarisi',
      'Görsel odaklı ürün detay sayfaları',
      'Teknik özellik ve karşılaştırma tabloları',
      'Video, galeri ve 360° görsel desteği',
      'İndirilebilir PDF katalog üretimi',
      'Teklif talebi formu ve bayi başvuru akışı',
      'WhatsApp ve telefon yönlendirmeleri',
      'Product + ItemList schema.org işaretlemeleri',
      'Çok dilli altyapı (TR / EN opsiyonel)',
      'GA4 etkinlik takibi ve ısı haritası önerileri',
    ],
    benefits: [
      {
        title: 'Satış ekibine hazır lead',
        description: 'Ürünü inceleyip ikna olmuş ziyaretçiler teklif formunu doldurur.',
        metric: 'Nitelikli talep',
        icon: 'UserCheck',
      },
      {
        title: 'Güncel katalog',
        description: 'Baskı maliyeti olmadan her an güncel tutulan dijital ürün kataloğu.',
        metric: '0 baskı maliyeti',
        icon: 'RefreshCw',
      },
      {
        title: 'İhracat görünürlüğü',
        description: 'Çok dilli yapı ile yurt dışı alıcılarına ulaşım.',
        metric: 'TR + EN',
        icon: 'Plane',
      },
      {
        title: 'Google görsel trafiği',
        description: 'Optimize edilmiş görseller ve yapısal veri ile ek organik trafik.',
        metric: '+20% görsel arama',
        icon: 'Image',
      },
    ],
    targetAudience: [
      'Üretici firmalar',
      'Bayilik ağı olan markalar',
      'İhracat yapan KOBİ’ler',
      'Endüstriyel ürün tedarikçileri',
      'Yazılım ve donanım ürünleri',
      'Gıda ve tarım üreticileri',
      'Mobilya ve yapı malzemeleri',
    ],
    faq: [
      {
        question: 'Ürün tanıtım sitesi ile e-ticaret sitesi arasındaki fark nedir?',
        answer:
          'Tanıtım sitesinde ödeme ve sepet akışı yoktur; amaç ürünü anlatıp teklif talebi veya bayi başvurusu toplamaktır. E-ticaret sitesinde ürün doğrudan satın alınır. İki modeli birleştiren hibrit yapılar da kurabiliyoruz.',
      },
      {
        question: 'PDF kataloğu siteden otomatik üretebilir miyiz?',
        answer:
          'Evet. Ürün verilerinden otomatik PDF katalog üretimi kurabiliyoruz; böylece baskı dosyanız her zaman güncel kalır ve tek yerden yönetilir.',
      },
      {
        question: 'Kaç ürün yükleyebilirim, sınır var mı?',
        answer:
          'Teknik bir sınır yoktur. Yüzlerce ürünlük katalogları Excel/CSV içe aktarma ile hızlıca yüklüyor, filtreleme ve arama performansını buna göre optimize ediyoruz.',
      },
      {
        question: 'Fiyatlar sitede görünmek zorunda mı?',
        answer:
          'Hayır. Fiyatları gizleyip “Teklif İste” akışı kurabilir, bayi girişinden sonra görünür yapabilir ya da açık fiyatlı çalışabilirsiniz.',
      },
      {
        question: 'Çok dilli site yapıyor musunuz?',
        answer:
          'Evet. Türkçe/İngilizce başta olmak üzere çok dilli mimari kuruyor, her dil için ayrı canonical ve hreflang etiketleri ile SEO uyumlu yayın yapıyoruz.',
      },
      {
        question: 'Sonradan e-ticarete dönebilir miyim?',
        answer:
          'Evet. Ürün verisi ve mimari buna uygun kurulur; ödeme, kargo ve stok modüllerini ekleyerek tanıtım sitesini e-ticaret sitesine dönüştürebiliyoruz.',
      },
    ],
    relatedServices: [
      'e-ticaret-sitesi',
      'portfoy-sitesi',
      'landing-page',
      'firma-web-sitesi',
      'teknik-seo',
      'form-basvuru-sistemi',
    ],
  },
  // 06
  {
    slug: 'portfoy-sitesi',
    title: 'Portföy Sitesi',
    shortTitle: 'Portföy Sitesi',
    category: 'web',
    primaryKeyword: 'portfolyo sitesi',
    secondaryKeywords: [
      'portfolyo web sitesi',
      'kişisel portfolio sitesi',
      'tasarımcı portfolyosu',
      'freelancer web sitesi',
    ],
    icon: 'Palette',
    imageQuery: 'portfolio design creative dark',
    summary:
      'Tasarımcılar, geliştiriciler, fotoğrafçılar ve danışmanlar için işlerinizi anlatan kişisel portföy siteleri.',
    description:
      'Portföy sitesi, çalışmalarınızı kendi kurallarınızla sergilediğiniz kişisel vitrindir. Sosyal medya platformlarında işleriniz kronolojik akışta kaybolur; oysa bir portfolyo sitesi en güçlü projelerinizi öne çıkarır, sürecinizi anlatır ve sizi doğrudan işe alan kişiyle buluşturur. Tardigrad Software olarak portföy sitelerinde görsel performansı ile anlatı gücünü dengeliyoruz: büyük görseller WebP olarak optimize edilir, sayfa hızı korunur, proje sayfaları problem-çözüm-sonuç kurgusuyla yazılır. Freelancer, ajans çalışanı, mimar, fotoğrafçı, yazılımcı veya danışman olmanız fark etmez; hedefiniz yeni müşteri ya da yeni bir pozisyonsa portföy sitesi en yüksek getirili kişisel yatırımdır. İletişim formu, takvim entegrasyonu ve uygunluk durumu göstergesi ile işe alım sürecini hızlandırıyoruz. Ayrıca schema.org Person ve CreativeWork işaretlemeleri ile Google’da adınızın doğru biçimde görünmesini sağlıyoruz.',
    heroTagline: 'İşlerinizi anlatan kişisel vitrin, yeni fırsatların kapısı.',
    whyNeeded: [
      {
        title: 'Sosyal medya işlerinizi taşımıyor',
        description:
          'Platformlarda içerik akıp gider; kalıcı, aranabilir ve size ait bir arşiv oluşmaz.',
        icon: 'Share2',
      },
      {
        title: 'CV tek başına ikna etmiyor',
        description:
          'İşe alım süreçlerinde somut çıktı görmek isteniyor; görsel kanıt olmadan öne çıkmak zorlaşır.',
        icon: 'FileText',
      },
      {
        title: 'Fiyat ve kapsam netleşmiyor',
        description:
          'Hizmetlerinizi, çalışma modelinizi ve referanslarınızı anlatmadığınızda her görüşme sıfırdan başlar.',
        icon: 'CircleHelp',
      },
      {
        title: 'Kendi alan adınız yok',
        description:
          'adsoyad.com gibi bir adres, ücretsiz platform profillerine göre çok daha profesyonel görünür.',
        icon: 'AtSign',
      },
    ],
    scope: [
      'Kişisel marka ve anlatı kurgusu',
      'Proje vaka çalışması şablonu (problem / çözüm / sonuç)',
      'Görsel ağırlıklı galeri ve filtreleme',
      'Hakkımda, hizmetler ve iletişim sayfaları',
      'Blog / yazı bölümü (uzmanlık gösterimi)',
      'CV indirme ve uygunluk durumu göstergesi',
      'Randevu / görüşme takvimi entegrasyonu',
      'Person + CreativeWork schema.org işaretlemeleri',
      'Sosyal medya ve Behance/Dribbble/LinkedIn bağlantıları',
      'Hız ve görsel optimizasyonu',
    ],
    benefits: [
      {
        title: 'Daha fazla iş teklifi',
        description: 'Aranabilir bir portföy, pasif şekilde yeni fırsatlar üretir.',
        metric: 'Sürekli görünürlük',
        icon: 'Sparkles',
      },
      {
        title: 'Yüksek algılanan değer',
        description: 'Profesyonel sunum, daha iyi projeler ve daha yüksek ücretler anlamına gelir.',
        metric: 'Premium algı',
        icon: 'Gem',
      },
      {
        title: 'Kendi kanalınız',
        description: 'Platform algoritmalarına bağımlı kalmadan doğrudan iletişim.',
        metric: '0 komisyon',
        icon: 'Rss',
      },
      {
        title: 'Hızlı güncelleme',
        description: 'Yeni projeyi dakikalar içinde yayına alabilirsiniz.',
        metric: '5 dakikada yayın',
        icon: 'Pencil',
      },
    ],
    targetAudience: [
      'Grafik ve UI/UX tasarımcıları',
      'Yazılım geliştiriciler',
      'Fotoğrafçı ve videograflar',
      'Mimar ve iç mimarlar',
      'Danışmanlar ve eğitmenler',
      'Yazarlar ve içerik üreticileri',
      'Freelancer ve bağımsız profesyoneller',
    ],
    faq: [
      {
        question: 'Portföy sitesi için hazır şablon mu kullanıyorsunuz?',
        answer:
          'Hayır. Tasarımı mesleğinize, işlerinizin görsel diline ve hedefinize göre özgün olarak üretiyoruz. Şablon siteleri hem hız hem özgünlük açısından dezavantaj yaratır.',
      },
      {
        question: 'Kaç proje eklemeliyim?',
        answer:
          'Genellikle 6-12 güçlü proje yeterlidir. Az ama derinlemesine anlatılmış vaka çalışmaları, çok sayıda yüzeysel görselden daha etkili olur.',
      },
      {
        question: 'Görsellerimi ben mi yükleyeceğim?',
        answer:
          'İlk kurulumda biz yüklüyor ve boyut/optimizasyon kurallarını paylaşıyoruz. Sonrasında yönetim panelinden kendiniz ekleyebilirsiniz.',
      },
      {
        question: 'Blog yazmak zorunda mıyım?',
        answer:
          'Zorunlu değil ama güçlü bir avantajdır. Uzmanlığınızı gösteren yazılar hem organik trafik getirir hem işe alım tarafında güven oluşturur.',
      },
      {
        question: 'Portföy sitesi maliyeti nedir?',
        answer:
          'Sayfa sayısı, animasyon seviyesi ve entegrasyonlara göre değişir. Basit bir portföy sitesi ile animasyon ağırlıklı özel bir proje arasında belirgin fark vardır; ücretsiz ön analizde netleştiriyoruz.',
      },
      {
        question: 'Siteyi Türkçe ve İngilizce yapabilir miyiz?',
        answer:
          'Evet. Yurt dışı müşteriler veya global pozisyonlar için iki dilli portföy kurulumu sıkça tercih edilir.',
      },
    ],
    relatedServices: [
      'firma-web-sitesi',
      'landing-page',
      'ai-icerik-araclar',
      'teknik-seo',
      'urun-tanitim-sitesi',
    ],
  },
  // 07
  {
    slug: 'rezervasyon-basvuru-sistemi',
    title: 'Rezervasyon ve Başvuru Sistemi',
    shortTitle: 'Rezervasyon Sistemi',
    category: 'yazilim',
    primaryKeyword: 'rezervasyon sistemi',
    secondaryKeywords: [
      'online rezervasyon',
      'randevu sistemi',
      'başvuru formu',
      'online başvuru sistemi',
    ],
    icon: 'CalendarCheck',
    imageQuery: 'online booking system',
    summary:
      'Randevu, rezervasyon ve başvuru süreçlerini otomatikleştiren, takvim ve bildirim entegrasyonlu sistemler.',
    description:
      'Rezervasyon ve başvuru sistemi, müşterilerinizin size telefonla ulaşmasını beklemeden kendi kendine randevu almasını, kayıt oluşturmasını veya başvuru yapmasını sağlar. Telefon trafiği, çakışan randevular, eksik bilgiyle gelen talepler ve unutulan görüşmeler işletmelerin en sık yaşadığı operasyonel kayıplardır. Tardigrad Software olarak geliştirdiğimiz sistemlerde takvim yönetimi, kapasite ve personel bazlı uygunluk, otomatik SMS/e-posta hatırlatma, iptal-yeniden planlama akışı ve yönetici paneli standarttır. Klinik, salon, atölye, eğitim kurumu, otel, restoran veya etkinlik organizasyonu fark etmez; süreçlerinizi dinleyip rezervasyon akışını sizin iş modelinize göre kurguluyoruz. Başvuru sistemlerinde ise çok adımlı formlar, belge yükleme, otomatik puanlama ve durum takibi ile değerlendirme sürecini hızlandırıyoruz. Tüm veriler Supabase / PostgreSQL üzerinde saklanır, KVKK’ya uygun şekilde yetkilendirilir ve yedeklenir.',
    heroTagline: 'Randevular kendi kendine dolsun, telefon trafiği azalsın.',
    whyNeeded: [
      {
        title: 'Randevu çakışmaları',
        description:
          'Manuel tutulan takvimlerde aynı saate iki kayıt alınır; hem müşteri hem ekip zaman kaybeder.',
        icon: 'CalendarX',
      },
      {
        title: 'Gelmeyen müşteriler (no-show)',
        description:
          'Hatırlatma yapılmadığında randevuların önemli bir bölümü boşa düşer ve gelir kaybı oluşur.',
        icon: 'UserX',
      },
      {
        title: 'Mesai dışı talepler kaçıyor',
        description:
          'Akşam ve hafta sonu rezervasyon almak isteyen müşterilere ulaşamıyorsanız rakibe giderler.',
        icon: 'MoonStar',
      },
      {
        title: 'Başvurular kayboluyor',
        description:
          'E-posta ile toplanan başvurularda belge eksikleri, tekrarlar ve değerlendirme gecikmeleri yaşanır.',
        icon: 'FolderX',
      },
    ],
    scope: [
      'Takvim ve uygunluk yönetimi (personel / oda / kapasite bazlı)',
      'Online randevu ve rezervasyon akışı',
      'Çok adımlı başvuru formları ve belge yükleme',
      'Otomatik e-posta ve SMS bildirimleri',
      'Hatırlatma, iptal ve yeniden planlama akışları',
      'Ön ödeme / kapora entegrasyonu (opsiyonel)',
      'Yönetici paneli: günlük plan, doluluk, gelir raporu',
      'Müşteri geçmişi ve notlar (CRM benzeri kayıt)',
      'Google Takvim senkronizasyonu (opsiyonel)',
      'KVKK aydınlatma, açık rıza ve veri silme akışları',
      'GA4 dönüşüm takibi ve iptal oranı raporları',
    ],
    benefits: [
      {
        title: 'Daha az boş randevu',
        description: 'Otomatik hatırlatmalar sayesinde gelmeme oranı belirgin biçimde düşer.',
        metric: '-40% no-show',
        icon: 'BellRing',
      },
      {
        title: '7/24 rezervasyon',
        description: 'Mesai dışında da talep toplayan bir kanalınız olur.',
        metric: '24 saat açık',
        icon: 'Clock',
      },
      {
        title: 'Azalan telefon trafiği',
        description: 'Ekip rutin randevu görüşmeleri yerine işine odaklanır.',
        metric: '-50% çağrı',
        icon: 'PhoneOff',
      },
      {
        title: 'Hızlanan değerlendirme',
        description: 'Başvurular otomatik sıralanır, eksik belgeler anında talep edilir.',
        metric: '3x daha hızlı',
        icon: 'ListFilter',
      },
      {
        title: 'Ölçülebilir doluluk',
        description: 'Hangi gün, saat ve personelin daha verimli olduğunu veriyle görürsünüz.',
        metric: 'Canlı rapor',
        icon: 'ChartPie',
      },
    ],
    targetAudience: [
      'Klinikler ve diş hekimleri',
      'Güzellik salonları ve kuaförler',
      'Spor salonları ve stüdyolar',
      'Eğitim kurumları ve kurslar',
      'Oteller ve konaklama tesisleri',
      'Restoran ve kafe işletmeleri',
      'Etkinlik ve tur organizatörleri',
      'Belediye ve dernek başvuru süreçleri',
    ],
    faq: [
      {
        question: 'Hazır bir rezervasyon eklentisi mi kuruyorsunuz?',
        answer:
          'Basit ihtiyaçlarda hazır çözümleri yapılandırabiliriz; ancak çoğu projede iş akışınıza özel geliştirme yapıyoruz. Hazır eklentilerin kısıtları (personel bazlı kapasite, özel fiyatlandırma, entegrasyon) büyüdükçe sorun yaratır.',
      },
      {
        question: 'SMS bildirimi gönderebiliyor muyuz?',
        answer:
          'Evet. Türkiye’de kullanılan SMS sağlayıcılarıyla entegrasyon kuruyoruz. Hatırlatma, onay ve iptal mesajlarını otomatik gönderiyor, gönderim loglarını panelde tutuyoruz.',
      },
      {
        question: 'Ön ödeme veya kapora alabilir miyim?',
        answer:
          'Evet. Sanal POS entegrasyonu ile rezervasyon sırasında ön ödeme alınabilir, iptal politikalarına göre iade akışı kurgulanabilir.',
      },
      {
        question: 'Mevcut müşteri listemi aktarabilir miyim?',
        answer:
          'Evet. Excel veya mevcut yazılımınızdan alınan kayıtları temizleyip sisteme aktarıyor, geçmiş randevu ve notları da taşıyabiliyoruz.',
      },
      {
        question: 'Çok şubeli işletmelerde çalışır mı?',
        answer:
          'Evet. Şube bazlı takvim, personel ve kapasite yönetimi kuruyor; merkez panelinden tüm şubelerin doluluğunu tek ekrandan izleyebiliyorsunuz.',
      },
      {
        question: 'Sistem KVKK’ya uygun mu?',
        answer:
          'Evet. Açık rıza kaydı, aydınlatma metni, rol bazlı erişim, veri saklama süresi ve silme talepleri için akışlar kuruyoruz.',
      },
      {
        question: 'Rezervasyon sistemi ne kadar sürede kurulur?',
        answer:
          'Tek şubeli standart bir randevu sistemi 3-6 hafta, çok şubeli ve ödeme entegrasyonlu projeler 6-10 hafta sürebilir.',
      },
    ],
    relatedServices: [
      'form-basvuru-sistemi',
      'musteri-yonetim-sistemi',
      'crm',
      'yonetim-paneli',
      'dijital-otomasyon',
      'odeme-whatsapp-crm-entegrasyonu',
    ],
  },
  // 08
  {
    slug: 'web-sitesi-yenileme',
    title: 'Web Sitesi Yenileme ve Modernizasyon',
    shortTitle: 'Site Yenileme',
    category: 'web',
    primaryKeyword: 'web sitesi yenileme',
    secondaryKeywords: [
      'web sitesi güncelleme',
      'web sitesi yenileme hizmeti',
      'eski siteyi yenileme',
      'site modernizasyonu',
    ],
    icon: 'RefreshCw',
    imageQuery: 'website redesign modern',
    summary:
      'Eski, yavaş ve güncellenemeyen sitelerinizi görünürlüğünüzü kaybetmeden modern platformlara taşıyoruz.',
    description:
      'Web sitesi yenileme, mevcut sitenizin tasarımını, altyapısını ve içerik mimarisini baştan kurgulama işidir. Pek çok işletmenin sitesi çalışıyor gibi görünür ama mobilde bozulur, yavaş açılır, güncellenemez ve Google’da sıralama kaybeder. Yenileme projelerinde ilk adım yıkım değil teşhistir: mevcut sitenizin hız testini, teknik SEO denetimini, içerik envanterini ve trafik kaynaklarını çıkarıyoruz. Hangi sayfaların değer ürettiğini, hangilerinin birleştirilmesi gerektiğini belirledikten sonra modern bir mimariye taşıyoruz. Taşıma sırasında 301 yönlendirme haritası, sitemap güncellemesi ve Search Console izlemesi ile mevcut görünürlüğünüzü koruyoruz. Next.js tabanlı yeni altyapı; daha hızlı sayfa açılışı, daha kolay içerik yönetimi ve yeni özellikler eklenebilir modüler bir yapı sağlar. Yenileme sonrası 90 gün boyunca sıralama ve trafik değişimini raporluyor, gerekirse hızlı müdahale ediyoruz.',
    heroTagline: 'Görünürlüğünüzü kaybetmeden modern, hızlı bir siteye geçin.',
    whyNeeded: [
      {
        title: 'Site mobilde bozuk görünüyor',
        description:
          'Ziyaretçilerin çoğu mobilden geliyor; taşan metinler ve küçük butonlar hemen çıkma oranını yükseltir.',
        icon: 'SmartphoneNfc',
      },
      {
        title: 'Güncelleme yapılamıyor',
        description:
          'Eski altyapılarda basit bir metin değişikliği için bile geliştirici beklemek gerekir.',
        icon: 'LockKeyhole',
      },
      {
        title: 'Trafik var, dönüşüm yok',
        description:
          'Kötü kurgulanmış sayfalar ziyaretçiyi yorar; form doldurma oranı düşer.',
        icon: 'UserMinus',
      },
      {
        title: 'Güvenlik riski',
        description:
          'Güncellenmeyen sistemler saldırıya açık hâle gelir; site çökmesi veya veri kaybı yaşanabilir.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Marka algısı eskidi',
        description:
          'Kurumsal kimliğiniz yenilendi ama siteniz 5 yıl önceki hâliyle duruyorsa tutarsızlık güven kaybettirir.',
        icon: 'ImageOff',
      },
    ],
    scope: [
      'Mevcut site denetimi: hız, SEO, içerik, erişilebilirlik',
      'Trafik ve dönüşüm verisi analizi (GA4 / Search Console)',
      'İçerik envanteri ve bilgi mimarisi yeniden kurgusu',
      'Modern tasarım ve mobil öncelikli arayüz',
      'Yeni altyapıya içerik ve görsel taşıma',
      '301 yönlendirme haritası ve sitemap güncellemesi',
      'Yapısal veri (schema.org) yeniden kurulumu',
      'Performans optimizasyonu ve Core Web Vitals iyileştirmesi',
      'Form, analytics ve piksel entegrasyonlarının yeniden bağlanması',
      'Yayın sonrası 90 gün sıralama ve trafik izleme',
    ],
    benefits: [
      {
        title: 'Belirgin hızlanma',
        description: 'Modern altyapı ve optimizasyonlarla açılış süresi ciddi biçimde düşer.',
        metric: '%55 daha hızlı',
        icon: 'Zap',
      },
      {
        title: 'Korunan görünürlük',
        description: 'Yönlendirme haritası sayesinde mevcut sıralamalar kaybedilmez.',
        metric: '0 sıralama kaybı hedefi',
        icon: 'Shield',
      },
      {
        title: 'Kolay içerik yönetimi',
        description: 'Yeni panel ile güncellemeler dakikalar içinde yapılır.',
        metric: 'Dakikalar içinde',
        icon: 'PencilRuler',
      },
      {
        title: 'Artan dönüşüm',
        description: 'Yenilenen akış ve net CTA’lar form doldurma oranını yükseltir.',
        metric: '+30% dönüşüm',
        icon: 'TrendingUp',
      },
    ],
    targetAudience: [
      '5+ yıllık sitesi olan işletmeler',
      'Kurumsal kimliğini yenileyen markalar',
      'Trafik alıp dönüşüm üretemeyen siteler',
      'Eski CMS kullanan firmalar',
      'Satın alma sonrası site birleştiren şirketler',
      'Hedef kitlesini değiştiren işletmeler',
    ],
    faq: [
      {
        question: 'Yenileme sırasında sitem kapanır mı?',
        answer:
          'Hayır. Yeni siteyi ayrı bir ortamda geliştiriyor, onayınız geldiğinde kısa bir DNS geçişiyle yayına alıyoruz. Kesinti dakikalar düzeyinde olur.',
      },
      {
        question: 'Google sıralamam düşer mi?',
        answer:
          'Doğru yönetilmezse düşebilir. Bu yüzden 301 yönlendirme haritası, canonical, sitemap ve Search Console izlemesi zorunlu adımlarımızdır. Yayın sonrası 90 gün performansı raporluyoruz.',
      },
      {
        question: 'Mevcut içeriklerimi koruyacak mısınız?',
        answer:
          'Evet. Değer üreten içerikleri taşıyor, zayıf sayfaları birleştirip güçlendiriyoruz. Silinmesi önerilen sayfalar için gerekçeli bir rapor sunuyoruz.',
      },
      {
        question: 'Sadece tasarım yenilemesi yapabilir misiniz?',
        answer:
          'Evet. Altyapıya dokunmadan yalnızca arayüz ve içerik kurgusunu yenileyebiliriz. Ancak hız ve yönetilebilirlik sorunları varsa altyapı yenilemesini de öneriyoruz.',
      },
      {
        question: 'Yenileme mi, sıfırdan yeni site mi daha mantıklı?',
        answer:
          'Ücretsiz ön analizde mevcut sitenin teknik durumunu ölçüp karar veriyoruz. İçerik ve görünürlük değerliyse yenileme, altyapı çok eskiyse sıfırdan kurulum daha doğru olabilir.',
      },
      {
        question: 'Yenileme projesi ne kadar sürer?',
        answer:
          'Kapsama göre 2-6 hafta. Denetim ve tasarım 1-2 hafta, geliştirme ve taşıma 1-3 hafta, test ve yayın 3-5 iş günü sürer.',
      },
    ],
    relatedServices: [
      'kurumsal-web-sitesi',
      'teknik-seo',
      'seo-uyumlu-sayfa-mimarisi',
      'hosting-yedekleme',
      'cloudflare-cdn',
      'vercel-deployment',
      'dijital-donusum',
    ],
  },
  // 09
  {
    slug: 'crm',
    title: 'CRM Sistemi',
    shortTitle: 'CRM Sistemi',
    category: 'yazilim',
    primaryKeyword: 'CRM',
    secondaryKeywords: [
      'CRM sistemi',
      'CRM yazılımı',
      'müşteri ilişkileri yönetimi',
      'CRM geliştirme',
    ],
    icon: 'Users',
    imageQuery: 'crm dashboard data',
    summary:
      'Müşteri ilişkilerini, satış hunisini ve ekip performansını tek ekranda yöneten özel CRM yazılımları.',
    description:
      'CRM (Customer Relationship Management) sistemi, müşterilerinizle kurduğunuz tüm temasları tek yerde toplayan ve satış sürecinizi ölçülebilir hâle getiren yazılımdır. Hazır CRM ürünleri çoğu zaman ya işletmenizin süreçlerine uymaz ya da kullanmadığınız yüzlerce özellikle karmaşıklaşır. Tardigrad Software olarak sizin satış akışınıza göre şekillenen özel CRM yazılımları geliştiriyoruz: lead kaynakları, aşama tanımları, görev ve hatırlatmalar, teklif bağlantısı, ekip yetkileri ve raporlar iş modelinize göre kurgulanır. WhatsApp, e-posta, telefon ve web formu üzerinden gelen talepler otomatik olarak kayda dönüşür; hiçbir lead kaybolmaz. Yönetici panelinde satış hunisi, dönüşüm oranları, ekip performansı ve gelir tahmini canlı olarak izlenir. Supabase / PostgreSQL altyapısı ve rol bazlı erişim (RLS) ile verileriniz güvende kalır. Mevcut CRM’iniz varsa veri taşıma ve entegrasyon da yapıyoruz.',
    heroTagline: 'Lead kaybetmeyin: satış süreciniz tek ekranda, ölçülebilir.',
    whyNeeded: [
      {
        title: 'Lead’ler kayboluyor',
        description:
          'Formdan, WhatsApp’tan veya telefondan gelen talepler takip edilmediğinde doğrudan gelir kaybı oluşur.',
        icon: 'UserX',
      },
      {
        title: 'Satış süreci görünmüyor',
        description:
          'Hangi aşamada kaç fırsat var, neden kaybedildi bilinemiyorsa yönetim körlemesine karar verir.',
        icon: 'EyeOff',
      },
      {
        title: 'Takip hatırlatılmıyor',
        description:
          'Görüşme sonrası aranması gereken müşteriler unutulur; sıcak lead soğur.',
        icon: 'AlarmClockOff',
      },
      {
        title: 'Bilgi kişilere bağımlı',
        description:
          'Müşteri bilgisi bir çalışanın not defterindeyse, personel ayrıldığında ilişki de gider.',
        icon: 'FolderLock',
      },
      {
        title: 'Hazır CRM süreçlere uymuyor',
        description:
          'Karmaşık lisanslı ürünlerde ekip sistemin etrafından dolaşır; veri kalitesi düşer.',
        icon: 'Puzzle',
      },
    ],
    scope: [
      'Satış hunisi ve aşama tasarımı (iş modelinize özel)',
      'Lead / fırsat / müşteri kayıt yönetimi',
      'Görev, hatırlatma ve takip planı',
      'Web formu, WhatsApp ve e-posta lead yakalama',
      'Teklif hazırlama ve gönderim entegrasyonu',
      'Ekip, rol ve yetki yönetimi',
      'Müşteri etkileşim zaman çizelgesi (arama, e-posta, not)',
      'Canlı dashboard: huni, gelir tahmini, ekip performansı',
      'Veri taşıma (mevcut Excel / CRM içe aktarımı)',
      'E-posta ve bildirim otomasyonları',
      'KVKK uyumlu erişim, loglama ve veri silme akışları',
      'API entegrasyonları (muhasebe, pazar yeri, telefon santrali)',
    ],
    benefits: [
      {
        title: 'Kayıp lead oranı düşer',
        description: 'Her talep kayda dönüşür ve otomatik olarak bir sahibe atanır.',
        metric: '-60% kayıp lead',
        icon: 'UserCheck',
      },
      {
        title: 'Satış döngüsü kısalır',
        description: 'Hatırlatmalar ve net aşama tanımları ile fırsatlar daha hızlı kapanır.',
        metric: '2x hız',
        icon: 'Timer',
      },
      {
        title: 'Yönetim görünürlüğü',
        description: 'Tahmin edilebilir gelir raporu ve ekip performans analizi.',
        metric: 'Canlı rapor',
        icon: 'ChartLine',
      },
      {
        title: 'Kurumsal hafıza',
        description: 'Müşteri geçmişi şirkette kalır, personel değişiminde bilgi kaybolmaz.',
        metric: 'Kalıcı kayıt',
        icon: 'Database',
      },
      {
        title: 'Lisans maliyeti avantajı',
        description: 'Kullanıcı başı aylık lisans yerine tek seferlik geliştirme ve düşük bakım.',
        metric: 'Kullanıcı başı 0 ₺',
        icon: 'Coins',
      },
    ],
    targetAudience: [
      'B2B satış yapan firmalar',
      'Emlak ve gayrimenkul ofisleri',
      'Sigorta ve finans danışmanları',
      'Toptan ticaret ve distribütörler',
      'Yazılım ve ajans şirketleri',
      'Üretim ve sanayi firmaları',
      'Lojistik şirketleri',
      'Çok kişili satış ekipleri',
    ],
    faq: [
      {
        question: 'Hazır CRM mi, özel CRM mi tercih etmeliyim?',
        answer:
          'Süreçleriniz standart ve ekip küçükse hazır CRM hızlı bir başlangıç olabilir. Ancak özel aşamalarınız, fiyatlandırma mantığınız, entegrasyon ihtiyaçlarınız varsa veya kullanıcı başı lisans maliyeti büyüyorsa özel CRM daha avantajlıdır.',
      },
      {
        question: 'Mevcut müşteri verilerimi aktarabilir misiniz?',
        answer:
          'Evet. Excel, CSV veya mevcut CRM’inizden alınan verileri temizleyip eşleştirerek taşıyoruz. Duplicate kayıtları birleştiriyor, geçmiş etkileşimleri koruyoruz.',
      },
      {
        question: 'WhatsApp görüşmeleri CRM’e düşer mi?',
        answer:
          'WhatsApp Business API entegrasyonu ile mesajlar kayda bağlanabilir. Ayrıca tek tıkla WhatsApp konuşması başlatan butonlar ve görüşme notu akışı ekliyoruz.',
      },
      {
        question: 'Ekip üyeleri farklı yetkilere sahip olabilir mi?',
        answer:
          'Evet. Rol bazlı yetkilendirme ile satış temsilcisi yalnızca kendi kayıtlarını, yönetici tüm huniyi görür. Alan bazlı kısıtlamalar da tanımlanabilir.',
      },
      {
        question: 'CRM sistemi ne kadar sürede kurulur?',
        answer:
          'Çekirdek modüller 4-8 hafta içinde canlıya alınır. Sonrasında ek modüller (teklif, muhasebe, çağrı merkezi entegrasyonu) faz faz eklenebilir.',
      },
      {
        question: 'Mobilde kullanabilir miyim?',
        answer:
          'Evet. Arayüz tamamen responsive’dir; sahada çalışan ekipler telefonda da kayıt açıp güncelleyebilir. İhtiyaç varsa ayrı bir mobil uygulama da geliştiriyoruz.',
      },
      {
        question: 'Verilerimiz nerede tutuluyor?',
        answer:
          'Supabase / PostgreSQL üzerinde, tercih ettiğiniz bölgede barındırılır. Erişimler rol bazlı politika (RLS) ile sınırlandırılır, günlük yedekleme yapılır.',
      },
    ],
    relatedServices: [
      'musteri-yonetim-sistemi',
      'teklif-hazirlama-sistemi',
      'dashboard-sistemi',
      'is-takip-sistemi',
      'odeme-whatsapp-crm-entegrasyonu',
      'yonetim-paneli',
      'dijital-otomasyon',
    ],
    localPriority: true,
    schemaType: 'ProfessionalService',
  },
  // 10
  {
    slug: 'musteri-yonetim-sistemi',
    title: 'Müşteri Yönetim Sistemi',
    shortTitle: 'Müşteri Yönetimi',
    category: 'yazilim',
    primaryKeyword: 'müşteri yönetim sistemi',
    secondaryKeywords: [
      'müşteri takip sistemi',
      'müşteri veritabanı',
      'müşteri paneli',
      'müşteri yönetim yazılımı',
    ],
    icon: 'Contact',
    imageQuery: 'customer management software',
    summary:
      'Müşteri kayıtlarını, sözleşmeleri, ödemeleri ve iletişim geçmişini tek veritabanında yönetin.',
    description:
      'Müşteri yönetim sistemi, işletmenizin müşteri verisini dağınık dosyalardan çıkarıp tek bir güvenilir kaynakta toplar. Cari kayıtlar, iletişim bilgileri, sözleşmeler, ödeme planları, hizmet geçmişi ve notlar bir arada tutulduğunda hem satış hem finans hem de destek ekipleri aynı güncel bilgiyi görür. Tardigrad Software olarak müşteri yönetim sistemlerini işletmenizin çalışma şekline göre tasarlıyoruz: bireysel müşteri mi, kurumsal hesap mı, alt kullanıcılar mı, şube bazlı yapı mı? Yetkilendirme, etiketleme, segmentasyon ve arama özellikleri buna göre kurgulanır. Sistem; tekrar eden kayıtları birleştirir, eksik alanları işaretler ve toplu işlem (e-posta, etiket, dışa aktarma) yapmanıza izin verir. Müşteri paneli modülü ile müşterileriniz kendi bilgilerini, faturalarını ve taleplerini görüntüleyebilir. Böylece destek yükünüz azalır. Tüm yapı KVKK’ya uygun; açık rıza kayıtları, veri saklama süreleri ve silme talepleri için hazır akışlarla gelir.',
    heroTagline: 'Tüm müşteri bilgisi tek yerde, güncel ve yetkili ellerde.',
    whyNeeded: [
      {
        title: 'Aynı müşteri üç ayrı dosyada',
        description:
          'Excel, e-posta ve not uygulamalarında tutulan kayıtlar tutarsızlık ve mükerrer veri yaratır.',
        icon: 'Files',
      },
      {
        title: 'Geçmiş görünmüyor',
        description:
          'Müşteriyle daha önce ne konuşuldu, hangi hizmet verildi bilinmediğinde güven zedelenir.',
        icon: 'History',
      },
      {
        title: 'Tahsilat takibi zor',
        description:
          'Ödeme planları manuel takip edildiğinde gecikmeler fark edilmez, nakit akışı bozulur.',
        icon: 'Wallet',
      },
      {
        title: 'KVKK riski',
        description:
          'Kimin hangi veriye eriştiği belli değilse hem güvenlik hem hukuki risk büyür.',
        icon: 'ShieldAlert',
      },
    ],
    scope: [
      'Müşteri / cari kartı ve iletişim bilgileri yönetimi',
      'Segmentasyon, etiketleme ve gelişmiş arama',
      'Mükerrer kayıt tespiti ve birleştirme',
      'Sözleşme, evrak ve dosya arşivi',
      'Ödeme planı ve tahsilat takibi',
      'Hizmet / satın alma geçmişi zaman çizelgesi',
      'Müşteri paneli (self-servis görüntüleme)',
      'Rol bazlı yetkilendirme ve işlem logları',
      'Excel/CSV içe ve dışa aktarma',
      'Toplu e-posta ve bildirim gönderimi',
      'KVKK: açık rıza kaydı, saklama süresi, silme akışı',
      'Raporlama: müşteri sayısı, gelir, churn',
    ],
    benefits: [
      {
        title: 'Tek doğruluk kaynağı',
        description: 'Tüm ekipler aynı güncel müşteri verisiyle çalışır.',
        metric: '0 veri çakışması',
        icon: 'Database',
      },
      {
        title: 'Daha hızlı destek',
        description: 'Müşteri geçmişi saniyeler içinde görüntülenir, çözüm süresi kısalır.',
        metric: '-45% çözüm süresi',
        icon: 'Headset',
      },
      {
        title: 'Tahsilatta iyileşme',
        description: 'Geciken ödemeler otomatik hatırlatılır.',
        metric: '-30% gecikme',
        icon: 'CircleDollarSign',
      },
      {
        title: 'Hukuki güvence',
        description: 'Erişim logları ve rıza kayıtları ile denetime hazır yapı.',
        metric: 'KVKK uyumlu',
        icon: 'Scale',
      },
    ],
    targetAudience: [
      'Abonelik modelli işletmeler',
      'Hizmet sektörü firmaları',
      'Sağlık ve eğitim kurumları',
      'Danışmanlık ve hukuk ofisleri',
      'Toptan ticaret',
      'Aidat yöneten site ve dernekler',
      'Teknik servisler',
    ],
    faq: [
      {
        question: 'Müşteri yönetim sistemi ile CRM arasındaki fark nedir?',
        answer:
          'CRM daha çok satış hunisi ve fırsat yönetimine odaklanır; müşteri yönetim sistemi ise müşteri kaydını, sözleşmeleri, ödemeleri ve hizmet geçmişini merkezine alır. İhtiyaca göre iki modülü birleştiriyoruz.',
      },
      {
        question: 'Mevcut Excel listemi sisteme aktarabilir miyim?',
        answer:
          'Evet. Excel/CSV dosyalarınızı alan eşleştirme ile içeri alıyoruz; mükerrer kayıtları tespit edip birleştiriyoruz.',
      },
      {
        question: 'Müşterilerim kendi bilgilerini görebilir mi?',
        answer:
          'Evet. Müşteri paneli modülü ile kendi kayıtlarını, sözleşmelerini, faturalarını ve talep geçmişlerini görüntüleyebilirler. Bu, destek taleplerini belirgin şekilde azaltır.',
      },
      {
        question: 'Farklı şubeler ayrı ayrı çalışabilir mi?',
        answer:
          'Evet. Şube bazlı veri ayrımı kurabiliyor; merkez kullanıcılara tüm şubeleri görme yetkisi verebiliyoruz.',
      },
      {
        question: 'Muhasebe programımla entegre olur mu?',
        answer:
          'Yaygın muhasebe ve ERP yazılımlarıyla API veya dosya tabanlı entegrasyon kuruyoruz. Cari ve fatura verileri iki yönlü senkronize edilebilir.',
      },
      {
        question: 'Sistemde veri silme taleplerini nasıl yönetiyoruz?',
        answer:
          'KVKK başvuru akışı ekliyoruz: talep kaydı açılır, yasal saklama zorunluluğu olan alanlar işaretlenir, kalan veriler silinir veya anonimleştirilir ve işlem loglanır.',
      },
    ],
    relatedServices: [
      'crm',
      'musteri-paneli',
      'raporlama-sistemi',
      'proforma-siparis-yonetimi',
      'personel-kullanici-yonetimi',
      'dijital-otomasyon',
    ],
  },
  // 11
  {
    slug: 'teklif-hazirlama-sistemi',
    title: 'Teklif Hazırlama Sistemi',
    shortTitle: 'Teklif Sistemi',
    category: 'yazilim',
    primaryKeyword: 'teklif hazırlama sistemi',
    secondaryKeywords: [
      'online teklif sistemi',
      'teklif yazılımı',
      'teklif yönetimi',
      'teklif takip',
    ],
    icon: 'FileText',
    imageQuery: 'proposal software business',
    summary:
      'Dakikalar içinde profesyonel teklif üretin, gönderin, takip edin ve onayları online alın.',
    description:
      'Teklif hazırlama sistemi, satış ekibinizin fiyat tekliflerini standart, hızlı ve izlenebilir biçimde üretmesini sağlar. Word dosyalarında kopyala-yapıştır ile hazırlanan teklifler; tutarsız format, hatalı fiyat ve kaybolan versiyonlar demektir. Tardigrad Software olarak ürün/hizmet kataloğu, fiyat listesi, iskonto kuralları ve onay mekanizmalarını tek sistemde topluyoruz. Ekip üyesi kalemleri seçer, sistem birim fiyatı, KDV’yi, indirimi ve toplamı otomatik hesaplar; kurumsal şablona uygun PDF teklif saniyeler içinde oluşur. Teklif bir bağlantıyla gönderilir; müşteri görüntülediğinde, indirdiğinde veya onayladığında satış temsilcisi anlık bildirim alır. Onaylanan teklifler tek tıkla siparişe veya sözleşmeye dönüşür. Tüm teklifler numaralandırılır, arşivlenir ve raporlanır: kazanma oranı, ortalama teklif tutarı, cevap süresi ve ekip performansı görünür hâle gelir.',
    heroTagline: 'Teklifi dakikalar içinde üret, gönder, takip et ve online onay al.',
    whyNeeded: [
      {
        title: 'Teklif hazırlamak saatler alıyor',
        description:
          'Kopyala-yapıştır yöntemi hem zaman kaybettirir hem fiyat hatalarına yol açar.',
        icon: 'Hourglass',
      },
      {
        title: 'Gönderilen teklif takip edilmiyor',
        description:
          'Teklifin açılıp açılmadığı bilinmediğinde takip zamanlaması yanlış olur, fırsat soğur.',
        icon: 'EyeOff',
      },
      {
        title: 'Fiyat tutarsızlığı',
        description:
          'Aynı ürün için farklı temsilciler farklı fiyat verdiğinde marka güvenilirliği zarar görür.',
        icon: 'Scale',
      },
      {
        title: 'Versiyon karmaşası',
        description:
          '“teklif_final_v3_YENI.pdf” dosyaları arasında hangi sürümün geçerli olduğu kaybolur.',
        icon: 'GitBranch',
      },
      {
        title: 'Onay süreci yavaş',
        description:
          'E-posta zincirinde dolaşan onaylar günler sürer; rakip bu sürede işi kapatır.',
        icon: 'MailWarning',
      },
    ],
    scope: [
      'Ürün / hizmet kataloğu ve güncel fiyat listeleri',
      'Kurumsal teklif şablonu ve marka uyumlu PDF üretimi',
      'Kalem bazlı iskonto, KDV, döviz ve marj kuralları',
      'Teklif numarası, versiyonlama ve geçerlilik süresi',
      'Online teklif bağlantısı ve görüntüleme takibi',
      'Müşteri onay / red akışı ve e-imza entegrasyonu (opsiyonel)',
      'İç onay mekanizması (yetki limitleri)',
      'Tekliften siparişe / proformaya dönüşüm',
      'E-posta ve WhatsApp gönderim entegrasyonu',
      'CRM ile müşteri ve fırsat bağlantısı',
      'Raporlar: kazanma oranı, ortalama tutar, cevap süresi',
      'Rol bazlı erişim ve işlem logları',
    ],
    benefits: [
      {
        title: 'Çok daha hızlı teklif',
        description: 'Katalogdan seçip saniyeler içinde profesyonel PDF üretin.',
        metric: '3x daha hızlı',
        icon: 'Zap',
      },
      {
        title: 'Daha yüksek kazanma oranı',
        description: 'Hızlı dönüş ve takip bildirimi fırsatları rakipten önce kapatır.',
        metric: '+22% kazanma',
        icon: 'Trophy',
      },
      {
        title: 'Fiyat disiplini',
        description: 'Kurallar sistemde tanımlı; hatalı fiyat ve yetkisiz iskonto engellenir.',
        metric: '0 fiyat hatası',
        icon: 'Calculator',
      },
      {
        title: 'Tam arşiv',
        description: 'Tüm teklifler numaralı, aranabilir ve denetime hazır biçimde saklanır.',
        metric: 'Anında erişim',
        icon: 'Archive',
      },
    ],
    targetAudience: [
      'İnşaat ve taahhüt firmaları',
      'Makine ve endüstriyel tedarikçiler',
      'Yazılım ve ajans şirketleri',
      'Danışmanlık firmaları',
      'Reklam ve matbaa sektörü',
      'Lojistik firmaları',
      'Toptan ticaret',
      'Teknik servis ve bakım şirketleri',
    ],
    faq: [
      {
        question: 'Teklif şablonumuzu kullanabilir miyiz?',
        answer:
          'Evet. Mevcut Word/Excel şablonunuzu veya kurumsal kimlik dosyalarınızı alıp birebir aynı görünümdde PDF üreten bir şablona dönüştürüyoruz.',
      },
      {
        question: 'Müşteri teklifi online onaylayabilir mi?',
        answer:
          'Evet. Teklif bir bağlantıyla paylaşılır; müşteri görüntüleyebilir, onaylayabilir veya not bırakabilir. Onay anı loglanır ve temsilciye bildirim gider.',
      },
      {
        question: 'Dövizli ve KDV’li teklif düzenleyebilir miyim?',
        answer:
          'Evet. Çoklu para birimi, güncel kur çekme, KDV oranları ve tevkifat gibi kuralları tanımlayabiliyoruz.',
      },
      {
        question: 'İskonto yetkilerini sınırlayabilir miyim?',
        answer:
          'Evet. Temsilci, müdür ve genel müdür için iskonto limitleri tanımlanır; limit aşımında otomatik onay akışı devreye girer.',
      },
      {
        question: 'CRM ile entegre çalışır mı?',
        answer:
          'Evet. Kendi CRM modülümüzle entegre gelir; farklı bir CRM kullanıyorsanız API üzerinden bağlayabiliriz.',
      },
      {
        question: 'Teklif sistemi ne kadar sürede kurulur?',
        answer:
          'Katalog ve şablon hazırsa 3-5 hafta içinde canlıya alınır. E-imza, ERP veya onay hiyerarşisi gibi ek modüller faz olarak eklenebilir.',
      },
    ],
    relatedServices: [
      'crm',
      'proforma-siparis-yonetimi',
      'musteri-paneli',
      'form-basvuru-sistemi',
      'raporlama-sistemi',
      'api-entegrasyonu',
    ],
  },
  // 12
  {
    slug: 'proforma-siparis-yonetimi',
    title: 'Proforma ve Sipariş Yönetimi',
    shortTitle: 'Sipariş Yönetimi',
    category: 'yazilim',
    primaryKeyword: 'sipariş yönetim sistemi',
    secondaryKeywords: [
      'proforma sistemi',
      'sipariş takibi',
      'sipariş yönetim yazılımı',
      'online sipariş',
    ],
    icon: 'ClipboardList',
    imageQuery: 'order management system',
    summary:
      'Proformadan sevkiyata kadar sipariş akışını tek ekrandan yönetin, gecikmeleri önleyin.',
    description:
      'Sipariş yönetim sistemi, proforma teklifinden sevkiyat ve tahsilata kadar tüm sipariş akışını dijital ortamda izlemenizi sağlar. Telefon, WhatsApp, e-posta ve Excel üzerinden gelen siparişler farklı yerlerde biriktiğinde; yanlış ürün, eksik adet, geç sevkiyat ve tahsilat sorunları kaçınılmaz olur. Tardigrad Software olarak siparişlerinizi tek bir kayıt altında topluyoruz: müşteri bilgisi, kalemler, fiyat, ödeme planı, teslim tarihi, depo durumu ve kargo takibi aynı ekranda görünür. Proforma tek tıkla siparişe, sipariş irsaliyeye ve faturaya dönüşür. Durum değişikliklerinde müşteriye otomatik bildirim gider; ekibiniz “siparişim nerede?” sorularıyla vakit kaybetmez. Stok modülü ile entegre çalıştığında sipariş girildiği anda rezervasyon yapılır, kritik stok seviyesinde uyarı üretilir. Yönetici raporları ile satış hacmi, ortalama sipariş tutarı, gecikme oranı ve tahsilat performansı ölçülür.',
    heroTagline: 'Proformadan sevkiyata sipariş akışı tek ekranda.',
    whyNeeded: [
      {
        title: 'Siparişler farklı kanallardan geliyor',
        description:
          'WhatsApp, telefon ve e-posta ile gelen talepler birleşmediğinde sipariş atlanır.',
        icon: 'Split',
      },
      {
        title: 'Teslim tarihi kaçırılıyor',
        description:
          'Takip edilmediğinde gecikmeler son anda fark edilir; müşteri memnuniyeti düşer.',
        icon: 'CalendarClock',
      },
      {
        title: 'Stok ile sipariş uyuşmuyor',
        description:
          'Stokta olmayan ürünün satılması iptal ve iade maliyeti doğurur.',
        icon: 'Boxes',
      },
      {
        title: 'Tahsilat takibi dağınık',
        description:
          'Hangi siparişin ne kadarı ödendi manuel hesaplanıyorsa nakit akışı riski büyür.',
        icon: 'Receipt',
      },
    ],
    scope: [
      'Proforma, sipariş, irsaliye ve fatura akışı',
      'Çok kanallı sipariş toplama (web formu, e-posta, WhatsApp, bayi paneli)',
      'Sipariş durum yönetimi ve zaman çizelgesi',
      'Kalem bazlı kısmi teslimat ve kalan takibi',
      'Stok rezervasyonu ve kritik seviye uyarıları',
      'Teslim tarihi planlama ve sevkiyat takvimi',
      'Müşteriye otomatik durum bildirimi (e-posta / SMS)',
      'Tahsilat planı ve ödeme durumu',
      'Bayi / müşteri paneli üzerinden online sipariş',
      'İade ve değişim süreçleri',
      'ERP / muhasebe entegrasyonu',
      'Yönetici raporları: hacim, gecikme, tahsilat',
    ],
    benefits: [
      {
        title: 'Kaçan sipariş yok',
        description: 'Her talep sisteme düşer ve bir sorumluya atanır.',
        metric: '0 kayıp sipariş',
        icon: 'CheckCheck',
      },
      {
        title: 'Daha az gecikme',
        description: 'Teslim planı ve uyarılar sayesinde zamanında sevkiyat oranı artar.',
        metric: '-40% gecikme',
        icon: 'Truck',
      },
      {
        title: 'Azalan destek yükü',
        description: 'Müşteri sipariş durumunu kendi panelinden görür.',
        metric: '-50% “nerede?” çağrısı',
        icon: 'MessagesSquare',
      },
      {
        title: 'Net nakit akışı',
        description: 'Sipariş bazlı tahsilat durumu anlık görünür.',
        metric: 'Canlı tahsilat',
        icon: 'Landmark',
      },
    ],
    targetAudience: [
      'Toptan ve dağıtım firmaları',
      'Üreticiler',
      'Gıda tedarikçileri',
      'Tekstil ve konfeksiyon',
      'Yapı malzemeleri',
      'Medikal tedarik',
      'E-ticaret operasyonları',
      'Bayi ağı olan markalar',
    ],
    faq: [
      {
        question: 'Bayilerim kendi siparişini girebilir mi?',
        answer:
          'Evet. Bayi paneli ile her bayi kendi fiyat listesi, limiti ve kampanyasıyla online sipariş verebilir; siparişler doğrudan sisteminize düşer.',
      },
      {
        question: 'Mevcut muhasebe programımla çalışır mı?',
        answer:
          'Evet. Cari, fatura ve irsaliye verilerini yaygın muhasebe/ERP sistemleriyle senkronize ediyoruz. API yoksa dosya tabanlı aktarım da kurulabilir.',
      },
      {
        question: 'Kısmi teslimat yapabiliyor muyuz?',
        answer:
          'Evet. Sipariş kalemleri parça parça sevk edilebilir; kalan miktarlar otomatik takip edilir ve müşteri bilgilendirilir.',
      },
      {
        question: 'WhatsApp ile gelen siparişler sisteme girer mi?',
        answer:
          'WhatsApp Business API entegrasyonu ile mesajlar sipariş taslağına dönüştürülebilir. Temsilci onayladıktan sonra resmî sipariş kaydı oluşur.',
      },
      {
        question: 'Mobil cihazdan kullanabilir miyim?',
        answer:
          'Evet. Depo ve saha ekipleri tablet veya telefonla sipariş durumunu güncelleyebilir, irsaliye görüntüleyebilir.',
      },
      {
        question: 'Kurulum ne kadar sürer?',
        answer:
          'Standart sipariş akışı 4-7 hafta, bayi paneli ve ERP entegrasyonu içeren projeler 7-12 hafta sürebilir. Fazlı yayınla riski azaltıyoruz.',
      },
    ],
    relatedServices: [
      'stok-yonetimi',
      'teklif-hazirlama-sistemi',
      'urun-tedarikci-yonetimi',
      'musteri-paneli',
      'raporlama-sistemi',
      'api-entegrasyonu',
    ],
  },
  // 13
  {
    slug: 'stok-yonetimi',
    title: 'Stok Yönetim Sistemi',
    shortTitle: 'Stok Yönetimi',
    category: 'yazilim',
    primaryKeyword: 'stok yönetim sistemi',
    secondaryKeywords: [
      'stok takip programı',
      'envanter yönetimi',
      'stok yazılımı',
      'depo yönetimi',
    ],
    icon: 'Boxes',
    imageQuery: 'inventory management warehouse',
    summary:
      'Depo, raf ve şube stoklarını gerçek zamanlı izleyin; fazla stok ve stok dışı kalma maliyetini azaltın.',
    description:
      'Stok yönetim sistemi, ürün giriş-çıkışlarını, depo yerleşimini, parti ve son kullanma takibini ve sayım süreçlerini dijitalleştiren yazılımdır. Manuel tutulan stoklarda en sık yaşanan sorunlar; gerçek stok ile kayıtların uyuşmaması, kritik üründe stok dışı kalma, fazla stok nedeniyle bağlanan sermaye ve miadı dolan ürün kayıplarıdır. Tardigrad Software olarak geliştirdiğimiz stok yönetim sistemleri çoklu depo, raf/lokasyon bazlı takip, barkod ve karekod okutma, minimum-maksimum stok seviyeleri, otomatik sipariş önerisi ve sayım modülü içerir. Satış, sipariş ve üretim modülleriyle entegre çalıştığında her hareket anlık olarak stoğa yansır. Parti ve seri numarası takibi gereken sektörlerde izlenebilirlik sağlanır; geri çağırma durumlarında hangi ürünün hangi müşteriye gittiği saniyeler içinde bulunur. Raporlama tarafında devir hızı, ölü stok, tedarikçi performansı ve stok değeri analizleri yer alır.',
    heroTagline: 'Gerçek zamanlı stok: ne var, nerede, ne kadar kaldı.',
    whyNeeded: [
      {
        title: 'Kayıt ile fiziki stok uyuşmuyor',
        description: 'Sayım farkları büyür, kârlılık gerçekçi hesaplanamaz.',
        icon: 'Scale',
      },
      {
        title: 'Stok dışı kalma',
        description: 'En çok satan üründe stok bitince sipariş kaçar ve müşteri rakibe gider.',
        icon: 'PackageX',
      },
      {
        title: 'Fazla stok sermayeyi bağlıyor',
        description: 'Yavaş dönen ürünler depo maliyeti ve nakit baskısı yaratır.',
        icon: 'Warehouse',
      },
      {
        title: 'Miadı dolan ürünler',
        description: 'Son kullanma takibi yoksa imha maliyeti ve yasal risk doğar.',
        icon: 'CalendarX',
      },
    ],
    scope: [
      'Çoklu depo ve raf/lokasyon bazlı stok takibi',
      'Ürün kartı, varyant, barkod ve karekod yönetimi',
      'Giriş / çıkış / virman / iade hareketleri',
      'Minimum-maksimum stok ve otomatik sipariş önerisi',
      'Parti, lot ve seri numarası takibi (izlenebilirlik)',
      'Son kullanma tarihi ve FEFO/FIFO kuralları',
      'Sayım modülü (dönemsel ve döngüsel sayım)',
      'Sipariş, satış ve üretim modülleriyle entegrasyon',
      'Mobil / el terminali ile barkod okutma',
      'Tedarikçi ve satın alma bağlantısı',
      'Stok değeri, devir hızı ve ölü stok raporları',
      'Yetkilendirme ve hareket logları',
    ],
    benefits: [
      {
        title: 'Doğru stok verisi',
        description: 'Sayım farkları azalır, planlama güvenilir hâle gelir.',
        metric: '-70% sayım farkı',
        icon: 'CircleCheckBig',
      },
      {
        title: 'Serbest kalan sermaye',
        description: 'Ölü stok tespit edilip azaltılır, nakit döngüsü hızlanır.',
        metric: '%20 daha az stok',
        icon: 'PiggyBank',
      },
      {
        title: 'Kaçan satış azalır',
        description: 'Kritik seviye uyarıları ile stok dışı kalma önlenir.',
        metric: '-45% stok dışı',
        icon: 'BellRing',
      },
      {
        title: 'Hızlı sayım',
        description: 'El terminali ile sayım süresi kısalır, operasyon durmaz.',
        metric: '3x daha hızlı',
        icon: 'ScanBarcode',
      },
    ],
    targetAudience: [
      'Toptancı ve distribütörler',
      'Perakende zincirleri',
      'Üretim tesisleri',
      'Gıda ve ilaç depoları',
      'Yedek parça tedarikçileri',
      'Tekstil ve konfeksiyon',
      'E-ticaret operasyonları',
      'Medikal ve laboratuvar',
    ],
    faq: [
      {
        question: 'Barkod veya karekod ile çalışıyor mu?',
        answer:
          'Evet. El terminali, USB barkod okuyucu veya telefon kamerası ile okutma desteklenir. Ürünlerinizde barkod yoksa etiket üretimi de kuruyoruz.',
      },
      {
        question: 'Birden fazla depoyu yönetebilir miyim?',
        answer:
          'Evet. Depo bazlı stok, depolar arası virman ve konsolide raporlama standart olarak gelir.',
      },
      {
        question: 'E-ticaret sitemle stok senkronize olur mu?',
        answer:
          'Evet. Kendi e-ticaret altyapımızla anlık, pazar yerleriyle API üzerinden senkronizasyon kuruyoruz; çift satış riski ortadan kalkar.',
      },
      {
        question: 'Son kullanma tarihi takibi yapılıyor mu?',
        answer:
          'Evet. Parti bazlı SKT takibi, FEFO (önce miadı yaklaşan çıkar) kuralı ve yaklaşan miat uyarıları mevcuttur.',
      },
      {
        question: 'Sayım yaparken işler durur mu?',
        answer:
          'Hayır. Döngüsel sayım modülü ile depo çalışmaya devam ederken bölge bölge sayım yapılabilir; farklar otomatik raporlanır.',
      },
      {
        question: 'Mevcut stok verimi aktarabilir miyim?',
        answer:
          'Evet. Excel veya eski yazılımınızdan alınan stok ve ürün kartlarını temizleyip içe aktarıyor, açılış bakiyelerini birlikte doğruluyoruz.',
      },
    ],
    relatedServices: [
      'proforma-siparis-yonetimi',
      'urun-tedarikci-yonetimi',
      'dashboard-sistemi',
      'raporlama-sistemi',
      'e-ticaret-sitesi',
      'dijital-otomasyon',
    ],
  },
  // 14
  {
    slug: 'urun-tedarikci-yonetimi',
    title: 'Ürün ve Tedarikçi Yönetimi',
    shortTitle: 'Ürün & Tedarikçi',
    category: 'yazilim',
    primaryKeyword: 'ürün yönetim sistemi',
    secondaryKeywords: [
      'ürün katalog yönetimi',
      'tedarikçi takibi',
      'ürün yönetim yazılımı',
      'satın alma sistemi',
    ],
    icon: 'Truck',
    imageQuery: 'supply chain management',
    summary:
      'Ürün kartları, tedarikçi performansları ve satın alma süreçlerini tek sistemde yönetin.',
    description:
      'Ürün ve tedarikçi yönetimi, işletmenizin satın alma zincirini şeffaflaştıran yazılım katmanıdır. Ürün kartları dağınık Excel dosyalarında tutulduğunda, aynı ürün için farklı kodlar açılır; fiyat karşılaştırması yapılamaz ve tedarikçi performansı ölçülemez. Tardigrad Software olarak ürün hiyerarşisini, tedarikçi kayıtlarını, fiyat anlaşmalarını ve satın alma taleplerini tek sistemde topluyoruz. Her ürün için onaylı tedarikçi listesi, birim fiyat geçmişi, teslim süresi ve minimum sipariş adedi tutulur. Satın alma talebi onay akışından geçer, siparişe dönüşür ve teslimat performansı otomatik puanlanır. Böylece hangi tedarikçinin geciktiğini, hangisinin fiyat avantajı sağladığını veriyle görürsünüz. Ürün verisi aynı zamanda e-ticaret, stok ve teklif modüllerini besler; bir kez girilen bilgi her yerde tutarlı kullanılır. Kalite kontrol ve iade süreçleri de aynı akışa bağlanabilir.',
    heroTagline: 'Doğru ürünü, doğru tedarikçiden, doğru fiyata alın.',
    whyNeeded: [
      {
        title: 'Aynı ürün birden çok kodla kayıtlı',
        description: 'Mükerrer ürün kartları raporları bozar, stok şişer.',
        icon: 'Copy',
      },
      {
        title: 'Fiyat karşılaştırması yapılamıyor',
        description: 'Tedarikçi fiyat geçmişi tutulmadığında pazarlık gücü kaybolur.',
        icon: 'GitCompareArrows',
      },
      {
        title: 'Geç teslimatlar görünmüyor',
        description: 'Tedarikçi performansı ölçülmediğinde sorunlu iş ortaklarıyla çalışılmaya devam edilir.',
        icon: 'AlarmClock',
      },
      {
        title: 'Satın alma kontrolsüz',
        description: 'Onay akışı olmayan talepler gereksiz harcama ve bütçe aşımı yaratır.',
        icon: 'ShieldX',
      },
    ],
    scope: [
      'Ürün kartı, kategori ve varyant yönetimi',
      'Mükerrer ürün tespiti ve kod standardizasyonu',
      'Tedarikçi kayıtları, sözleşme ve fiyat anlaşmaları',
      'Çoklu tedarikçi fiyat geçmişi ve karşılaştırma',
      'Satın alma talebi ve onay akışı',
      'Tedarikçi siparişi ve teslimat takibi',
      'Tedarikçi performans puanlama (teslim süresi, kalite, fiyat)',
      'Kalite kontrol ve iade süreçleri',
      'Minimum sipariş adedi ve teslim süresi kuralları',
      'Stok, sipariş ve e-ticaret modülleriyle entegrasyon',
      'Excel/CSV içe aktarma ve toplu güncelleme',
      'Raporlar: harcama dağılımı, tedarikçi karnesi',
    ],
    benefits: [
      {
        title: 'Daha iyi satın alma fiyatı',
        description: 'Fiyat geçmişi ve karşılaştırma ile pazarlık gücü artar.',
        metric: '-8% maliyet',
        icon: 'Coins',
      },
      {
        title: 'Güvenilir tedarik',
        description: 'Performans karnesi zayıf tedarikçiler erken tespit edilir.',
        metric: '+25% zamanında teslim',
        icon: 'Truck',
      },
      {
        title: 'Temiz ürün verisi',
        description: 'Tek ürün kartı tüm modülleri besler, hatalar azalır.',
        metric: 'Tek kaynak',
        icon: 'Database',
      },
      {
        title: 'Kontrollü harcama',
        description: 'Onay akışı sayesinde bütçe dışı satın alma engellenir.',
        metric: 'Bütçe disiplini',
        icon: 'Lock',
      },
    ],
    targetAudience: [
      'Üretim firmaları',
      'Toptan ve distribütörler',
      'Perakende zincirleri',
      'İnşaat ve taahhüt',
      'Gıda tedarikçileri',
      'Medikal tedarik',
      'Tekstil üreticileri',
    ],
    faq: [
      {
        question: 'Ürün kartlarını kim oluşturacak?',
        answer:
          'Mevcut verinizi Excel’den içe aktarıyor, mükerrerleri birleştirip kod standardı öneriyoruz. Sonrasında ürün kartlarını ekibiniz panel üzerinden yönetir.',
      },
      {
        question: 'Tedarikçi performansını nasıl ölçüyorsunuz?',
        answer:
          'Zamanında teslim oranı, sipariş doğruluğu, kalite/iade oranı ve fiyat rekabetçiliği üzerinden otomatik puanlama yapılır; dönemsel karne üretilir.',
      },
      {
        question: 'Onay akışını özelleştirebilir miyiz?',
        answer:
          'Evet. Tutar limitine, departmana ve ürün grubuna göre farklı onay hiyerarşileri tanımlanabilir.',
      },
      {
        question: 'Tedarikçiler sisteme giriş yapabilir mi?',
        answer:
          'İsterseniz tedarikçi portalı ekliyoruz: siparişlerini görüntüleyip teslim tarihi teyidi verebilir, fiyat güncellemesi yükleyebilirler.',
      },
      {
        question: 'ERP sistemimizle entegre olur mu?',
        answer:
          'Evet. Yaygın ERP ve muhasebe yazılımlarıyla API veya dosya tabanlı entegrasyon kuruyoruz; hangi sistemin ana kaynak olacağını birlikte belirliyoruz.',
      },
      {
        question: 'Kurulum süresi nedir?',
        answer:
          'Ürün ve tedarikçi verisi hazırsa 4-6 hafta; ERP entegrasyonu ve tedarikçi portalı içeren projelerde 6-10 hafta.',
      },
    ],
    relatedServices: [
      'stok-yonetimi',
      'proforma-siparis-yonetimi',
      'teklif-hazirlama-sistemi',
      'raporlama-sistemi',
      'api-entegrasyonu',
      'is-takip-sistemi',
    ],
  },
  // 15
  {
    slug: 'personel-kullanici-yonetimi',
    title: 'Personel ve Kullanıcı Yönetimi',
    shortTitle: 'Personel Yönetimi',
    category: 'yazilim',
    primaryKeyword: 'personel yönetim sistemi',
    secondaryKeywords: [
      'personel takip sistemi',
      'kullanıcı yönetimi',
      'personel paneli',
      'yetki yönetimi',
    ],
    icon: 'UserCog',
    imageQuery: 'hr management team',
    summary:
      'Personel kayıtları, izin takibi, görev atamaları ve sistem yetkilerini tek panelde yönetin.',
    description:
      'Personel ve kullanıcı yönetimi, hem insan kaynakları kayıtlarını hem de dijital sistemlerdeki erişim yetkilerini düzenleyen yazılım katmanıdır. İşletmeler büyüdükçe kim hangi sisteme erişebiliyor, kimin izni onaylandı, hangi görev kime atandı soruları karmaşıklaşır. Tardigrad Software olarak personel kartları, departman ve pozisyon yapısı, izin ve rapor takibi, vardiya planlaması, görev atamaları, eğitim ve sertifika kayıtları ile rol bazlı yetkilendirme modüllerini tek panelde birleştiriyoruz. Sistem yetkileri tarafında ise her uygulamanızda geçerli tek oturum (single sign-on benzeri) yaklaşımı, rol tanımları ve işlem logları kuruyoruz; işten ayrılan personelin erişimi tek tıkla kapanır. Bu, hem operasyonel düzen hem bilgi güvenliği açısından kritiktir. Personel paneli ile çalışanlar kendi izin bakiyelerini, bordro bilgilerini ve görevlerini görebilir; İK üzerindeki rutin soru yükü azalır.',
    heroTagline: 'Kim, neye erişebilir, hangi görevde — hepsi tek panelde.',
    whyNeeded: [
      {
        title: 'Yetki karmaşası',
        description:
          'Kim hangi verilere erişebiliyor bilinmediğinde hem güvenlik hem denetim riski doğar.',
        icon: 'KeyRound',
      },
      {
        title: 'İzin takibi Excel’de',
        description:
          'İzin bakiyeleri manuel hesaplandığında hatalar ve tartışmalar kaçınılmazdır.',
        icon: 'CalendarOff',
      },
      {
        title: 'İşten ayrılan erişimleri',
        description:
          'Ayrılan personelin hesapları kapanmadığında veri sızıntısı riski sürer.',
        icon: 'UserMinus',
      },
      {
        title: 'Görevler kayboluyor',
        description:
          'Sözlü veya mesajla atanan işler takip edilmediğinde teslim tarihleri kaçar.',
        icon: 'ListTodo',
      },
    ],
    scope: [
      'Personel kartı, departman ve pozisyon hiyerarşisi',
      'İzin, rapor ve telafi takibi (yıllık bakiye otomatiği)',
      'Vardiya ve çalışma takvimi planlaması',
      'Görev ve sorumluluk atamaları',
      'Eğitim, sertifika ve geçerlilik takibi',
      'Evrak arşivi (sözleşme, kimlik, belge)',
      'Rol ve yetki matrisi, alan bazlı kısıtlamalar',
      'Tek oturum açma (SSO) yaklaşımı ve parola politikaları',
      'İşe giriş / işten çıkış akışları ve erişim kapatma',
      'Personel self-servis paneli',
      'İşlem logları ve denetim izi',
      'Performans ve hedef takibi (opsiyonel)',
    ],
    benefits: [
      {
        title: 'Kontrollü erişim',
        description: 'Rol bazlı yetkilendirme ile veriye yalnızca yetkili kişiler ulaşır.',
        metric: '0 yetki sızıntısı',
        icon: 'Shield',
      },
      {
        title: 'Azalan İK iş yükü',
        description: 'Personel kendi bilgilerini panelden görür, rutin sorular azalır.',
        metric: '-50% tekrar soru',
        icon: 'LifeBuoy',
      },
      {
        title: 'Hatasız izin hesabı',
        description: 'Bakiyeler otomatik hesaplanır, onay akışı loglanır.',
        metric: '0 manuel hesap',
        icon: 'Calculator',
      },
      {
        title: 'Denetime hazır kayıt',
        description: 'Tüm erişim ve değişiklikler loglanır; iç denetim kolaylaşır.',
        metric: 'Tam izlenebilirlik',
        icon: 'FileSearch',
      },
    ],
    targetAudience: [
      '20+ çalışanı olan işletmeler',
      'Üretim ve fabrika operasyonları',
      'Çok şubeli perakende',
      'Sağlık kurumları',
      'Lojistik firmaları',
      'Yazılım ve ajans şirketleri',
      'Kamu ve dernek yapıları',
    ],
    faq: [
      {
        question: 'Bordro hesaplaması yapıyor mu?',
        answer:
          'Sistem izin, çalışma günü ve devamsızlık verisini üretir; bordro hesabını mevcut bordro yazılımınızla entegre ederek veri aktarımı sağlıyoruz. Tam bordro modülü ihtiyacınız varsa ayrıca planlayabiliriz.',
      },
      {
        question: 'Personel mobilde kullanabilir mi?',
        answer:
          'Evet. Panel tamamen responsive’dir; izin talebi açma, görev görüntüleme ve duyuru takibi telefondan yapılabilir.',
      },
      {
        question: 'Mevcut kullanıcıları diğer sistemlerle eşleştirebilir miyiz?',
        answer:
          'Evet. Geliştirdiğimiz diğer modüllerle (CRM, stok, sipariş) ortak kullanıcı ve rol yapısını paylaşıyoruz; tek kimlikle erişim sağlanır.',
      },
      {
        question: 'İşten ayrılan personelin erişimi nasıl kapanır?',
        answer:
          'Çıkış akışı tek tıkla tüm modüllerdeki erişimi kapatır, açık görevleri devreder ve arşiv kaydını oluşturur.',
      },
      {
        question: 'KVKK açısından personel verisi nasıl korunur?',
        answer:
          'Aydınlatma metni, açık rıza kayıtları, alan bazlı erişim kısıtlaması, şifreli saklama ve saklama süresi politikaları ile uyumlu bir yapı kuruyoruz.',
      },
      {
        question: 'Vardiya planlaması yapabilir miyim?',
        answer:
          'Evet. Haftalık/aylık vardiya şablonları, nöbet rotasyonu ve personel uygunluk kısıtları ile planlama yapılabilir; plana uyum raporu alınır.',
      },
    ],
    relatedServices: [
      'yonetim-paneli',
      'is-takip-sistemi',
      'musteri-paneli',
      'form-basvuru-sistemi',
      'dijital-otomasyon',
      'raporlama-sistemi',
    ],
  },
  // 16
  {
    slug: 'yonetim-paneli',
    title: 'Yönetim Paneli Geliştirme',
    shortTitle: 'Yönetim Paneli',
    category: 'yazilim',
    primaryKeyword: 'yönetim paneli',
    secondaryKeywords: [
      'admin panel',
      'yönetim paneli geliştirme',
      'web yönetim paneli',
      'admin dashboard',
    ],
    icon: 'LayoutDashboard',
    imageQuery: 'admin dashboard dark',
    summary:
      'İçerik, kullanıcı, sipariş ve raporlarınızı yönettiğiniz; hızlı, güvenli ve kullanımı kolay admin panelleri.',
    description:
      'Yönetim paneli, web sitenizin veya yazılımınızın arka planını yönettiğiniz kontrol merkezidir. İyi tasarlanmamış bir panel; yavaş açılan listeler, karmaşık formlar, eksik arama ve yetki sorunları yüzünden ekibinizin her gün vakit kaybetmesine neden olur. Tardigrad Software olarak yönetim panellerini kullanıcı deneyimi öncelikli geliştiriyoruz: en sık yapılan işlemler tek tıkla erişilebilir, listelerde filtreleme ve toplu işlem standarttır, formlarda otomatik kayıt ve hata doğrulama vardır. İçerik yönetimi, kullanıcı ve rol yönetimi, sipariş ve teklif akışları, raporlama ekranları ve ayarlar modülü tek bir tutarlı arayüzde toplanır. Tüm işlemler loglanır; kim neyi ne zaman değiştirdi görünür. Performans tarafında büyük veri kümelerinde sayfalama, indeksleme ve önbellekleme ile panel her zaman hızlı kalır. Mevcut bir siteniz veya sisteminiz varsa ona panel geliştirebilir, sıfırdan bir ürün için de tam kapsamlı admin arayüzü kurabiliriz.',
    heroTagline: 'Ekibinizin her gün kullandığı kontrol merkezi, hızlı ve güvenli.',
    whyNeeded: [
      {
        title: 'İçerik güncellemesi geliştiriciye bağımlı',
        description: 'Panel yoksa her küçük değişiklik için teknik destek beklenir.',
        icon: 'PlugZap',
      },
      {
        title: 'Veriler dağınık',
        description: 'Sipariş, kullanıcı ve içerik verisi farklı yerlerde tutulduğunda tutarlılık bozulur.',
        icon: 'ChartScatter',
      },
      {
        title: 'Yetki kontrolü yok',
        description: 'Herkesin her şeyi değiştirebildiği sistemlerde hatalar ve güvenlik açıkları artar.',
        icon: 'KeyRound',
      },
      {
        title: 'Yavaş panel motivasyonu düşürür',
        description: 'Büyük listelerde sayfa açılmıyorsa ekip sistemin etrafından dolaşır.',
        icon: 'Snail',
      },
    ],
    scope: [
      'Kullanıcı, rol ve yetki yönetimi (RBAC)',
      'İçerik yönetimi: sayfa, haber, ürün, medya kütüphanesi',
      'Liste ekranları: arama, filtre, sıralama, sayfalama, dışa aktarma',
      'Toplu işlem (durum değiştirme, etiketleme, silme)',
      'Form yönetimi ve başvuruların görüntülenmesi',
      'Sipariş, teklif ve müşteri kayıtları modülleri',
      'Raporlama ve grafik ekranları',
      'Ayarlar modülü (site bilgileri, e-posta şablonları, entegrasyon anahtarları)',
      'İşlem logları ve denetim izi',
      'Performans optimizasyonu (indeks, önbellek, sayfalama)',
      'İki adımlı doğrulama ve parola politikaları',
      'Mobil uyumlu panel arayüzü',
    ],
    benefits: [
      {
        title: 'Kendi başınıza yönetim',
        description: 'Teknik bilgiye ihtiyaç duymadan içerik ve kayıtları güncelleyin.',
        metric: '0 geliştirici ihtiyacı',
        icon: 'SlidersHorizontal',
      },
      {
        title: 'Hızlı ekranlar',
        description: 'Büyük veri kümelerinde bile akıcı çalışan liste ve filtreleme.',
        metric: '<300ms sorgu',
        icon: 'Gauge',
      },
      {
        title: 'Güvenli yetkilendirme',
        description: 'Rol bazlı erişim ve işlem logları ile kontrollü yönetim.',
        metric: 'Tam denetim izi',
        icon: 'ShieldCheck',
      },
      {
        title: 'Ölçeklenebilir modüller',
        description: 'Yeni özellikler mevcut yapıyı bozmadan eklenebilir.',
        metric: 'Modüler mimari',
        icon: 'Blocks',
      },
    ],
    targetAudience: [
      'İçerik üreten işletmeler',
      'E-ticaret firmaları',
      'SaaS ürün ekipleri',
      'Çok kullanıcılı iç sistemler',
      'Ajanslar ve medya şirketleri',
      'Dernek, vakıf ve kamu birimleri',
    ],
    faq: [
      {
        question: 'Hazır bir CMS mi kullanıyorsunuz, özel mi geliştiriyorsunuz?',
        answer:
          'İhtiyaca göre değişir. Basit içerik yönetimi için yapılandırılmış çözümler yeterli olabilir; özel iş akışları, karmaşık yetkiler veya performans gereksinimleri varsa özel panel geliştiriyoruz.',
      },
      {
        question: 'Mevcut siteme panel ekleyebilir misiniz?',
        answer:
          'Evet. Mevcut veritabanı ve içerik yapısını inceleyip üzerine yönetim katmanı geliştiriyoruz. Gerekirse veriyi yeni mimariye taşıyoruz.',
      },
      {
        question: 'Kaç kullanıcı tanımlayabilirim?',
        answer:
          'Kullanıcı sayısı sınırı yoktur; rol ve yetki matrisini organizasyon yapınıza göre kurarız.',
      },
      {
        question: 'Panelde rapor alabilir miyim?',
        answer:
          'Evet. Özet dashboard, dönemsel raporlar ve Excel/PDF dışa aktarma standarttır. Özel KPI ekranları da ekleyebiliriz.',
      },
      {
        question: 'Panel mobilde çalışır mı?',
        answer:
          'Evet. Responsive tasarım sayesinde tablet ve telefondan da yönetilebilir; saha ekipleri için sadeleştirilmiş görünümler oluşturabiliriz.',
      },
      {
        question: 'Güvenlik nasıl sağlanıyor?',
        answer:
          'Şifreli parola saklama, iki adımlı doğrulama, rol bazlı erişim (RLS), rate limiting, işlem logları ve düzenli güvenlik güncellemeleri uyguluyoruz.',
      },
    ],
    relatedServices: [
      'musteri-paneli',
      'dashboard-sistemi',
      'personel-kullanici-yonetimi',
      'raporlama-sistemi',
      'supabase-postgresql',
      'is-takip-sistemi',
    ],
  },
  // 17
  {
    slug: 'musteri-paneli',
    title: 'Müşteri Paneli',
    shortTitle: 'Müşteri Paneli',
    category: 'yazilim',
    primaryKeyword: 'müşteri paneli',
    secondaryKeywords: [
      'müşteri portali',
      'online müşteri paneli',
      'müşteri hesap sayfası',
      'üyelik paneli',
    ],
    icon: 'LayoutPanelLeft',
    imageQuery: 'customer portal online',
    summary:
      'Müşterilerinizin sipariş, fatura, talep ve aboneliklerini kendi başına yönettiği self-servis portal.',
    description:
      'Müşteri paneli, müşterilerinizin sizinle ilgili işlemleri kendi başına gerçekleştirdiği self-servis portaldır. Sipariş durumu, fatura ve ödeme geçmişi, abonelik yönetimi, destek talepleri, sözleşme ve doküman indirme gibi işlemler panele taşındığında hem müşteri memnuniyeti artar hem destek ekibinizin yükü azalır. Tardigrad Software olarak müşteri panellerini güvenlik ve sadelik dengesini gözeterek geliştiriyoruz: hızlı giriş (parola, e-posta ile doğrulama veya sosyal giriş), net bir ana ekran, anlaşılır menü yapısı ve mobil uyumlu arayüz. Panel, arka plandaki sipariş, CRM ve fatura modülleriyle canlı bağlantılıdır; müşteri bilgisi gördüğü anda günceldir. Destek talebi modülü ile “telefon trafiği” yerine kayıt bazlı, takip edilebilir bir iletişim akışı kurulur. Abonelik tabanlı işletmelerde plan değişikliği, ödeme yöntemi güncelleme ve iptal akışları da panel üzerinden yönetilebilir.',
    heroTagline: 'Müşteriniz kendi işini kendi görsün, destek yükünüz azalsın.',
    whyNeeded: [
      {
        title: 'Destek hattı meşgul',
        description:
          '“Siparişim nerede?”, “Faturamı gönderir misiniz?” gibi sorular ekibin zamanını tüketir.',
        icon: 'PhoneCall',
      },
      {
        title: 'Bilgi e-postada kayboluyor',
        description:
          'Belgeler ve yanıtlar posta kutularında dağınık durduğunda müşteri tekrar tekrar sorar.',
        icon: 'MailSearch',
      },
      {
        title: 'Abonelik yönetimi manuel',
        description:
          'Plan değişikliği ve ödeme güncellemeleri elle yapılıyorsa hata ve gecikme kaçınılmazdır.',
        icon: 'Repeat2',
      },
      {
        title: 'Müşteri deneyimi zayıf',
        description:
          'Kendi verisine ulaşamayan müşteri markayı hantal ve ulaşılmaz olarak algılar.',
        icon: 'Frown',
      },
    ],
    scope: [
      'Üyelik, giriş ve parola sıfırlama akışları',
      'Müşteri profili ve iletişim tercihleri',
      'Sipariş ve teslimat durumu görüntüleme',
      'Fatura, makbuz ve sözleşme arşivi (PDF indirme)',
      'Abonelik planı, ödeme yöntemi ve iptal yönetimi',
      'Destek talebi açma ve takip etme (ticket)',
      'Duyuru ve bildirim merkezi',
      'E-posta ve SMS bildirim tercihleri',
      'Rol bazlı erişim (kurumsal müşterilerde çok kullanıcı)',
      'KVKK: açık rıza, veri indirme ve silme talebi',
      'Arka ofis modülleriyle canlı veri bağlantısı',
      'Panel kullanım analitiği',
    ],
    benefits: [
      {
        title: 'Azalan destek talebi',
        description: 'Sık sorulan işlemler self-servis hâle gelir.',
        metric: '-45% destek çağrısı',
        icon: 'Headset',
      },
      {
        title: 'Yüksek müşteri memnuniyeti',
        description: '7/24 erişilebilir bilgi ve hızlı işlem deneyimi.',
        metric: 'NPS artışı',
        icon: 'Smile',
      },
      {
        title: 'Daha az tahsilat gecikmesi',
        description: 'Fatura ve ödeme durumu görünürlüğü gecikmeleri azaltır.',
        metric: '-25% gecikme',
        icon: 'CreditCard',
      },
      {
        title: 'Kayıt bazlı iletişim',
        description: 'Her talep numaralanır, izlenir ve raporlanır.',
        metric: 'Tam izlenebilirlik',
        icon: 'TicketCheck',
      },
    ],
    targetAudience: [
      'Abonelik modelli işletmeler',
      'E-ticaret firmaları',
      'Lojistik ve kargo şirketleri',
      'Hizmet sağlayıcılar (internet, enerji, bakım)',
      'Eğitim kurumları',
      'Sağlık kuruluşları',
      'B2B bayi ağları',
    ],
    faq: [
      {
        question: 'Müşterilerim paneli kullanmayı öğrenir mi?',
        answer:
          'Arayüzü mümkün olan en sade akışta tasarlıyoruz; ilk girişte yönlendirme ve kısa açıklamalar ekliyoruz. Ayrıca kullanım videoları ve yardım merkezi içeriği hazırlıyoruz.',
      },
      {
        question: 'Kurumsal müşterilerde birden fazla kullanıcı olabilir mi?',
        answer:
          'Evet. Tek hesap altında alt kullanıcılar tanımlanabilir; her birine farklı yetki (sipariş verme, fatura görüntüleme) verilebilir.',
      },
      {
        question: 'Giriş güvenliğini nasıl sağlıyorsunuz?',
        answer:
          'Şifreli parola saklama, e-posta doğrulama, isteğe bağlı iki adımlı doğrulama, oturum süresi politikaları ve rate limiting uyguluyoruz.',
      },
      {
        question: 'Mevcut sistemimizle bağlanabilir mi?',
        answer:
          'Evet. Sipariş, fatura ve müşteri verilerini API veya veritabanı bağlantısıyla çekiyor; paneli mevcut iş akışınıza entegre ediyoruz.',
      },
      {
        question: 'Mobil uygulama yerine panel yeterli mi?',
        answer:
          'Çoğu işletme için evet. Responsive panel, uygulama mağazası süreçleri olmadan mobil deneyim sunar. İhtiyaç büyürse ayrı mobil uygulamaya geçiş planlanabilir.',
      },
      {
        question: 'Panel geliştirme süresi nedir?',
        answer:
          'Çekirdek panel 4-6 hafta; abonelik yönetimi, ödeme ve ticket modülleri eklendiğinde 6-10 hafta sürer.',
      },
    ],
    relatedServices: [
      'musteri-yonetim-sistemi',
      'abonelik-tabanli-yazilim',
      'yonetim-paneli',
      'proforma-siparis-yonetimi',
      'form-basvuru-sistemi',
      'crm',
    ],
  },
  // 18
  {
    slug: 'is-takip-sistemi',
    title: 'İş Takip Sistemi',
    shortTitle: 'İş Takip Sistemi',
    category: 'yazilim',
    primaryKeyword: 'iş takip sistemi',
    secondaryKeywords: [
      'proje takip yazılımı',
      'görev yönetim sistemi',
      'iş takip programı',
      'proje yönetim yazılımı',
    ],
    icon: 'SquareKanban',
    imageQuery: 'project management kanban',
    summary:
      'Projeler, görevler, sorumlular ve teslim tarihleri tek ekranda; işler kaybolmasın.',
    description:
      'İş takip sistemi, ekiplerin yürüttüğü projeleri, görevleri, sorumlulukları ve teslim tarihlerini görünür kılan yazılımdır. Sohbet uygulamalarında kaybolan talepler, kimin ne yaptığını bilmeyen yöneticiler ve kaçan teslim tarihleri; büyüyen her işletmenin ortak sorunudur. Tardigrad Software olarak iş takip sistemlerini iş akışınıza göre kurguluyoruz: kanban panosu, görev listeleri, alt görevler, zaman takibi, dosya paylaşımı, yorumlar ve bildirimler standarttır. Talep yönetiminde ise müşteri veya iç birimden gelen işler kayda dönüşür, önceliklendirilir, atanır ve tamamlanana dek izlenir. Teknik servis, üretim, ajans, inşaat ve bakım operasyonlarında saha ekipleri mobil üzerinden iş kapatabilir, fotoğraf yükleyebilir. Yönetici ekranlarında iş yükü dağılımı, geciken görevler, ekip verimliliği ve proje kârlılığı görünür. Böylece “kim ne yapıyor?” sorusu toplantılarda değil, panelde cevaplanır.',
    heroTagline: 'Görevler kaybolmasın: kim, neyi, ne zamana kadar yapıyor — net.',
    whyNeeded: [
      {
        title: 'İşler sohbet arasında kayboluyor',
        description: 'Mesajla verilen görevler unutulur, sorumluluk belirsizleşir.',
        icon: 'MessageSquareOff',
      },
      {
        title: 'Teslim tarihleri kaçıyor',
        description: 'Hatırlatma olmayan görevler son gün fark edilir.',
        icon: 'CalendarClock',
      },
      {
        title: 'İş yükü dengesiz',
        description: 'Kimin ne kadar işi olduğu görünmediğinde bazı kişiler aşırı yüklenir.',
        icon: 'Scale',
      },
      {
        title: 'Proje kârlılığı bilinmiyor',
        description: 'Harcanan saat kaydedilmediğinde hangi işin kârlı olduğu anlaşılmaz.',
        icon: 'TimerReset',
      },
    ],
    scope: [
      'Proje, görev ve alt görev yönetimi',
      'Kanban panosu ve liste görünümleri',
      'Sorumlu atama, öncelik ve teslim tarihi',
      'Takip ve hatırlatma bildirimleri',
      'Yorum, etiket ve dosya paylaşımı',
      'Zaman takibi ve efor raporlaması',
      'Talep / ticket yönetimi ve SLA takibi',
      'Saha ekibi için mobil iş kapatma ve fotoğraf yükleme',
      'Tekrarlayan görev ve bakım planları',
      'Proje şablonları ve iş akışı otomasyonları',
      'Yönetici dashboard: iş yükü, gecikme, kârlılık',
      'Diğer modüllerle (CRM, sipariş) bağlantı',
    ],
    benefits: [
      {
        title: 'Zamanında teslim',
        description: 'Hatırlatma ve net sorumluluk ile gecikmeler azalır.',
        metric: '-35% gecikme',
        icon: 'CalendarCheck',
      },
      {
        title: 'Şeffaf ekip yönetimi',
        description: 'İş yükü ve ilerleme herkes için görünür.',
        metric: 'Canlı görünürlük',
        icon: 'Eye',
      },
      {
        title: 'Ölçülebilir kârlılık',
        description: 'Proje bazlı efor takibi ile gerçek maliyet ortaya çıkar.',
        metric: '+18% kâr marjı',
        icon: 'ChartLine',
      },
      {
        title: 'Daha az toplantı',
        description: 'Durum güncellemeleri panelde olduğu için koordinasyon toplantıları kısalır.',
        metric: '-40% toplantı süresi',
        icon: 'UsersRound',
      },
    ],
    targetAudience: [
      'Ajanslar ve yazılım ekipleri',
      'İnşaat ve taahhüt firmaları',
      'Teknik servis ve bakım ekipleri',
      'Üretim işletmeleri',
      'Danışmanlık firmaları',
      'Etkinlik organizatörleri',
      'Çok şubeli hizmet işletmeleri',
    ],
    faq: [
      {
        question: 'Hazır proje yönetim araçları yerine neden özel sistem?',
        answer:
          'Hazır araçlar genel amaçlıdır; iş akışınız, terminolojiniz ve rapor ihtiyaçlarınız farklıysa uyum sağlamak zorlaşır ve kullanıcı başı lisans maliyeti büyür. Özel sistem tam sizin sürecinize göre şekillenir.',
      },
      {
        question: 'Saha ekipleri mobilde kullanabilir mi?',
        answer:
          'Evet. Responsive arayüz ve sadeleştirilmiş mobil akış ile sahada iş açma, güncelleme, fotoğraf yükleme ve kapatma yapılabilir.',
      },
      {
        question: 'Müşterilerim de sisteme girebilir mi?',
        answer:
          'Evet. Sınırlı yetkili müşteri erişimi ile talep açma ve durum görüntüleme sağlanabilir; bu destek yükünüzü azaltır.',
      },
      {
        question: 'Zaman takibi zorunlu mu?',
        answer:
          'Hayır. İhtiyacınıza göre görev bazlı veya proje bazlı zaman kaydı açılabilir; raporlar yalnızca yetkili kişilere görünür.',
      },
      {
        question: 'Bildirimler nasıl çalışıyor?',
        answer:
          'Atama, teslim tarihi yaklaşması, yorum ve durum değişikliklerinde e-posta bildirimi gönderilir; istenirse tarayıcı bildirimi eklenebilir.',
      },
      {
        question: 'Kurulum süresi ne kadar?',
        answer:
          'Çekirdek iş takip modülü 3-5 hafta; saha mobil akışı, SLA ve zaman takibi eklendiğinde 5-8 hafta.',
      },
    ],
    relatedServices: [
      'yonetim-paneli',
      'raporlama-sistemi',
      'dijital-otomasyon',
      'crm',
      'personel-kullanici-yonetimi',
      'dashboard-sistemi',
    ],
  },
  // 19
  {
    slug: 'raporlama-sistemi',
    title: 'Raporlama Sistemi',
    shortTitle: 'Raporlama Sistemi',
    category: 'yazilim',
    primaryKeyword: 'raporlama sistemi',
    secondaryKeywords: [
      'otomatik raporlama',
      'dashboard',
      'raporlama yazılımı',
      'iş analitiği',
    ],
    icon: 'ChartColumn',
    imageQuery: 'data analytics dashboard',
    summary:
      'Farklı kaynaklardaki veriyi birleştirip otomatik rapor ve canlı dashboard’lara dönüştürüyoruz.',
    description:
      'Raporlama sistemi, işletmenizin farklı kaynaklarında biriken veriyi tek bir anlam bütününe çeviren katmandır. Satış CRM’de, sipariş Excel’de, pazarlama verisi GA4’te, finans muhasebe programında durduğunda yöneticiler karar vermek için günlerce veri toplar. Tardigrad Software olarak veri kaynaklarınızı birleştirip otomatik raporlama altyapısı kuruyoruz: günlük, haftalık ve aylık raporlar belirlenen saatte e-posta ile ilgili kişilere ulaşır; canlı dashboard’lar ise anlık durumu gösterir. Satış hunisi, tahsilat, stok devri, ekip performansı, kampanya dönüşümü ve müşteri kayıp oranı gibi metrikler görselleştirilir. Raporlar PDF ve Excel olarak dışa aktarılabilir, kullanıcı bazında filtrelenebilir. Veri modeli doğru kurulduğunda raporlama bir “iş” olmaktan çıkar, sistemin doğal çıktısı hâline gelir. Böylece yönetim toplantıları veri toplamakla değil, karar almakla geçer.',
    heroTagline: 'Veri toplamayı bırakın, karar almaya başlayın.',
    whyNeeded: [
      {
        title: 'Rapor hazırlamak günler alıyor',
        description: 'Manuel veri toplama süreci hem yavaş hem hataya açıktır.',
        icon: 'FileClock',
      },
      {
        title: 'Veriler farklı sistemlerde',
        description: 'Tek bakışta toplam performans görülemediğinde kararlar sezgiye dayanır.',
        icon: 'Network',
      },
      {
        title: 'Geçmiş veri kayboluyor',
        description: 'Dönem karşılaştırması yapılamadığında trendler fark edilmez.',
        icon: 'History',
      },
      {
        title: 'Yanlış veriyle karar',
        description: 'Güncel olmayan tablolar hatalı fiyatlandırma ve stok kararlarına yol açar.',
        icon: 'TriangleAlert',
      },
    ],
    scope: [
      'Veri kaynaklarının tespiti ve entegrasyonu',
      'Veri modeli ve metrik tanımları (KPI sözlüğü)',
      'Otomatik rapor üretimi ve zamanlanmış gönderim',
      'Canlı dashboard ve grafik ekranları',
      'Dönem karşılaştırmaları ve trend analizleri',
      'Departman ve kullanıcı bazlı rapor filtreleri',
      'PDF / Excel dışa aktarma',
      'E-posta ile otomatik dağıtım listeleri',
      'Anormallik uyarıları (eşik aşımı bildirimi)',
      'GA4, Search Console ve reklam platformu verilerinin birleştirilmesi',
      'Veri kalitesi kontrolleri ve loglama',
      'Yetkilendirme ve rapor erişim denetimi',
    ],
    benefits: [
      {
        title: 'Ayda onlarca saat tasarruf',
        description: 'Manuel rapor hazırlama işi ortadan kalkar.',
        metric: '40 saat/ay',
        icon: 'Clock',
      },
      {
        title: 'Anlık karar desteği',
        description: 'Dashboard’lar her zaman güncel veriyle çalışır.',
        metric: 'Gerçek zamanlı',
        icon: 'Activity',
      },
      {
        title: 'Erken uyarı',
        description: 'Eşik aşımlarında otomatik bildirim ile sorun büyümeden fark edilir.',
        metric: 'Proaktif',
        icon: 'BellRing',
      },
      {
        title: 'Tek doğruluk kaynağı',
        description: 'Herkes aynı metriği aynı tanımıyla görür.',
        metric: '0 veri anlaşmazlığı',
        icon: 'Database',
      },
    ],
    targetAudience: [
      'Büyüyen KOBİ’ler',
      'Çok şubeli işletmeler',
      'E-ticaret firmaları',
      'Üretim şirketleri',
      'Ajanslar ve danışmanlar',
      'Finans ve muhasebe birimleri',
      'Yönetim kurulu raporlaması yapan firmalar',
    ],
    faq: [
      {
        question: 'Hangi veri kaynaklarını bağlayabiliyorsunuz?',
        answer:
          'Excel/CSV dosyaları, SQL veritabanları, kendi geliştirdiğimiz modüller, GA4, Search Console, reklam platformları, muhasebe/ERP yazılımları ve API’si olan tüm sistemler.',
      },
      {
        question: 'Raporlar otomatik olarak e-postama gelir mi?',
        answer:
          'Evet. Günlük, haftalık veya aylık periyotlarda belirlenen alıcı listesine PDF veya Excel olarak otomatik gönderilir.',
      },
      {
        question: 'Kendi metriklerimizi tanımlayabilir miyiz?',
        answer:
          'Evet. Proje başında bir KPI sözlüğü oluşturuyor; hesaplama mantığını birlikte tanımlayıp sistemde sabitliyoruz.',
      },
      {
        question: 'Verilerimiz üçüncü tarafla paylaşılır mı?',
        answer:
          'Hayır. Raporlama altyapısını kendi veritabanınız üzerinde kuruyoruz; erişimler rol bazlıdır ve tüm sorgular loglanır.',
      },
      {
        question: 'Dashboard’ı televizyonda gösterebilir miyim?',
        answer:
          'Evet. Ofis ekranları için tam ekran modu ve otomatik yenilenen gösterim ekranları hazırlıyoruz.',
      },
      {
        question: 'Raporlama sistemi ne kadar sürede kurulur?',
        answer:
          'Veri kaynakları erişilebilirse 2-4 hafta içinde ilk raporlar üretilir; ek kaynaklar ve gelişmiş analizler faz faz eklenir.',
      },
    ],
    relatedServices: [
      'dashboard-sistemi',
      'crm',
      'stok-yonetimi',
      'api-entegrasyonu',
      'supabase-postgresql',
      'google-search-console-kurulumu',
    ],
  },
  // 20
  {
    slug: 'form-basvuru-sistemi',
    title: 'Form ve Başvuru Sistemi',
    shortTitle: 'Form Sistemi',
    category: 'yazilim',
    primaryKeyword: 'başvuru formu sistemi',
    secondaryKeywords: [
      'online form sistemi',
      'web form',
      'başvuru sistemi geliştirme',
      'veri toplama formu',
    ],
    icon: 'TextCursorInput',
    imageQuery: 'online form data collection',
    summary:
      'Çok adımlı formlar, belge yükleme, otomatik puanlama ve değerlendirme akışlarıyla başvuru sistemleri.',
    description:
      'Form ve başvuru sistemi, işletmenizin veya kurumunuzun dışarıdan veri topladığı tüm noktaları düzenleyen yazılımdır. İş başvurusu, bayi başvurusu, etkinlik kaydı, anket, teklif talebi, şikâyet ve izin formları aynı mantıkla yönetilebilir: veri toplanır, doğrulanır, kaydedilir, ilgililere bildirilir ve raporlanır. Tardigrad Software olarak çok adımlı formlar, koşullu alanlar (önceki cevaba göre değişen sorular), belge yükleme, otomatik puanlama ve değerlendirme panelleri geliştiriyoruz. Spam koruması, rate limiting, KVKK açık rıza kaydı ve e-posta bildirimleri standart olarak gelir. Başvurular durum akışına girer: yeni, incelemede, onaylandı, reddedildi. Değerlendirme ekibi yorum bırakabilir, puan verebilir ve toplu işlem yapabilir. Tamamlanan süreç sonunda başvuru sahibine otomatik bilgilendirme gider; böylece ne başvuran ne de ekibiniz belirsizlikte kalır.',
    heroTagline: 'Veri toplayan her süreci düzenli, güvenli ve ölçülebilir hâle getirin.',
    whyNeeded: [
      {
        title: 'E-posta ile toplanan başvurular',
        description: 'Gelen kutusunda biriken başvurularda kayıp, tekrar ve gecikme yaşanır.',
        icon: 'MailOpen',
      },
      {
        title: 'Eksik bilgiyle gelen talepler',
        description: 'Zorunlu alan kontrolü olmayan formlar sürekli geri dönüş gerektirir.',
        icon: 'FileQuestion',
      },
      {
        title: 'Değerlendirme süreci şeffaf değil',
        description: 'Kim hangi başvuruyu inceledi, sonuç ne oldu takip edilemez.',
        icon: 'EyeOff',
      },
      {
        title: 'Spam ve kötüye kullanım',
        description: 'Koruma olmayan formlar botlar tarafından doldurulur, veri kirlenir.',
        icon: 'Bot',
      },
    ],
    scope: [
      'Form tasarımcısı mantığıyla çok adımlı akışlar',
      'Koşullu alanlar ve dinamik soru setleri',
      'Dosya / belge yükleme ve doğrulama',
      'Sunucu tarafı doğrulama (Zod) ve hata mesajları',
      'Spam koruması: honeypot + reCAPTCHA v3 + rate limit',
      'KVKK açık rıza kaydı ve aydınlatma metni bağlantısı',
      'Otomatik e-posta bildirimleri (başvuran + yetkili)',
      'Başvuru listesi, filtreleme ve durum akışı',
      'Puanlama, değerlendirme ve yorum modülü',
      'Toplu işlem ve dışa aktarma (Excel/CSV)',
      'Form analitiği: tamamlama oranı, düşülen adım',
      'Çok dilli form desteği',
    ],
    benefits: [
      {
        title: 'Eksiksiz veri',
        description: 'Zorunlu alan ve doğrulama kuralları sayesinde geri dönüş ihtiyacı azalır.',
        metric: '-60% eksik kayıt',
        icon: 'ListChecks',
      },
      {
        title: 'Yüksek tamamlama oranı',
        description: 'Adım adım ilerleyen, mobil uyumlu formlar daha çok tamamlanır.',
        metric: '+25% tamamlama',
        icon: 'CircleCheck',
      },
      {
        title: 'Hızlı değerlendirme',
        description: 'Otomatik puanlama ile uygun başvurular öne çıkar.',
        metric: '3x daha hızlı',
        icon: 'Zap',
      },
      {
        title: 'Temiz veri',
        description: 'Spam koruması ile veritabanınız bot kayıtlarıyla dolmaz.',
        metric: '%99 spam engeli',
        icon: 'ShieldCheck',
      },
    ],
    targetAudience: [
      'İK ve işe alım süreçleri',
      'Bayi ve franchise başvuruları',
      'Eğitim kurumları ve kurs kayıtları',
      'Etkinlik ve webinar organizasyonları',
      'Kamu, dernek ve vakıflar',
      'Sağlık kuruluşları',
      'Anket ve pazar araştırması',
      'İhale ve teklif toplama',
    ],
    faq: [
      {
        question: 'Kaç adımlı form oluşturabiliriz?',
        answer:
          'Sınır yoktur; ancak kullanıcı deneyimi için 3-5 adım öneriyoruz. Her adımda ilerleme göstergesi ve otomatik kayıt ile yarıda bırakma kaybını azaltıyoruz.',
      },
      {
        question: 'Formu kendi başımıza düzenleyebilir miyiz?',
        answer:
          'Evet. Sık değişen formlar için yönetilebilir form alanı yapısı kuruyoruz; yeni soru ekleme ve sıralama panel üzerinden yapılabilir.',
      },
      {
        question: 'Belge yükleme güvenli mi?',
        answer:
          'Evet. Dosya tipi ve boyut doğrulaması, zararlı uzantı engelleme, yetkisiz erişimi önleyen imzalı bağlantılar ve KVKK uyumlu saklama politikaları uyguluyoruz.',
      },
      {
        question: 'Spam başvuruları nasıl engelliyorsunuz?',
        answer:
          'Honeypot alanı, reCAPTCHA v3 skor kontrolü, IP bazlı rate limiting ve sunucu tarafı doğrulama katmanlarını birlikte kullanıyoruz.',
      },
      {
        question: 'Başvuru sahibine otomatik yanıt gidebilir mi?',
        answer:
          'Evet. Onay, bilgilendirme ve sonuç e-postaları otomatik gönderilir; şablonları panel üzerinden düzenleyebilirsiniz.',
      },
      {
        question: 'Mevcut sitemize gömebilir miyiz?',
        answer:
          'Evet. Formu ayrı bir sayfa olarak yayınlayabilir veya mevcut sitenize gömülebilir bileşen olarak entegre edebiliriz.',
      },
    ],
    relatedServices: [
      'rezervasyon-basvuru-sistemi',
      'personel-kullanici-yonetimi',
      'dijital-otomasyon',
      'yonetim-paneli',
      'crm',
      'dijital-otomasyon',
    ],
  },
  // 21
  {
    slug: 'saas-platformu',
    title: 'SaaS Platformu Geliştirme',
    shortTitle: 'SaaS Platformu',
    category: 'saas',
    primaryKeyword: 'SaaS yazılım',
    secondaryKeywords: [
      'SaaS platformu geliştirme',
      'SaaS nedir',
      'abonelik yazılımı',
      'SaaS ürün',
    ],
    icon: 'Cloud',
    imageQuery: 'saas platform cloud',
    summary:
      'Fikrinizi abonelik gelirine dönüştüren, ölçeklenebilir ve çok kiracılı SaaS ürünleri geliştiriyoruz.',
    description:
      'SaaS (Software as a Service) platformu, kullanıcıların tarayıcı üzerinden abone olup kullandığı yazılım ürünüdür. Doğru kurgulandığında tekrar eden gelir, düşük dağıtım maliyeti ve hızlı ölçeklenme sağlar; yanlış kurgulandığında ise veri mimarisi ve ödeme altyapısı sonradan düzeltilemeyecek kadar karmaşıklaşır. Tardigrad Software olarak SaaS projelerinde en kritik kararı baştan doğru veriyoruz: multi-tenant veri mimarisi, abonelik ve faturalama modeli, kullanıcı/rol yapısı, kullanım limitleri ve ölçeklenme stratejisi. Next.js ve TypeScript ile tip güvenli bir ön yüz, Supabase / PostgreSQL ile güçlü bir veri katmanı, Vercel ve Cloudflare ile global ölçekte hızlı dağıtım kuruyoruz. Abonelik tarafında plan tanımları, deneme süresi, yükseltme/düşürme, ödeme hatası yönetimi ve faturalama otomasyonu yer alır. Ürün analitiği ile hangi özelliğin kullanıldığını ölçüyor, yol haritasını veriye göre şekillendiriyoruz.',
    heroTagline: 'Fikrinizden ölçeklenebilir, gelir üreten bir ürüne.',
    whyNeeded: [
      {
        title: 'Tek seferlik satış gelir getirmez',
        description: 'Abonelik modeli öngörülebilir ve tekrar eden gelir yaratır.',
        icon: 'Repeat',
      },
      {
        title: 'Yanlış veri mimarisi',
        description: 'Multi-tenant yapı baştan kurgulanmazsa sonradan geçiş çok maliyetlidir.',
        icon: 'Database',
      },
      {
        title: 'Ölçeklenme sorunları',
        description: 'Kullanıcı arttığında yavaşlayan ürün churn’ü yükseltir.',
        icon: 'TrendingDown',
      },
      {
        title: 'Ödeme ve faturalama karmaşası',
        description: 'Manuel takip edilen aboneliklerde tahsilat hataları ve gelir kaybı olur.',
        icon: 'CreditCard',
      },
    ],
    scope: [
      'Ürün keşfi, pazar ve rakip analizi',
      'Multi-tenant veri mimarisi tasarımı',
      'Abonelik planları, deneme süresi ve limit yönetimi',
      'Ödeme entegrasyonu ve faturalama otomasyonu',
      'Kullanıcı, organizasyon ve rol yönetimi',
      'Kimlik doğrulama, SSO ve iki adımlı doğrulama',
      'Ön yüz: Next.js + TypeScript + Tailwind',
      'Arka uç: Supabase / PostgreSQL + RLS politikaları',
      'E-posta akışları (onboarding, yenileme, ödeme hatası)',
      'Ürün analitiği ve olay takibi',
      'Durum sayfası, yardım merkezi ve destek akışı',
      'Vercel + Cloudflare ile global dağıtım ve izleme',
      'KVKK/GDPR veri işleme ve silme akışları',
    ],
    benefits: [
      {
        title: 'Tekrar eden gelir',
        description: 'Abonelik modeli öngörülebilir nakit akışı sağlar.',
        metric: 'MRR büyümesi',
        icon: 'Coins',
      },
      {
        title: 'Düşük dağıtım maliyeti',
        description: 'Bulut altyapısı ile kullanıcı başına marjinal maliyet düşüktür.',
        metric: 'Ölçeklenebilir',
        icon: 'Cloud',
      },
      {
        title: 'Hızlı iterasyon',
        description: 'Modüler mimari sayesinde yeni özellikler haftalar içinde yayınlanır.',
        metric: 'Haftalık sürüm',
        icon: 'GitMerge',
      },
      {
        title: 'Veriye dayalı karar',
        description: 'Kullanım analitiği ile hangi özelliğin değer ürettiği bilinir.',
        metric: 'Ürün analitiği',
        icon: 'ChartColumn',
      },
      {
        title: 'Düşük churn',
        description: 'İyi onboarding ve ödeme hatası yönetimi iptal oranını azaltır.',
        metric: '-30% churn',
        icon: 'HeartHandshake',
      },
    ],
    targetAudience: [
      'Startup kurucuları',
      'Dikey sektör yazılımı geliştirenler',
      'Ajanslar (ürünleşme)',
      'B2B hizmet firmaları',
      'Veri ve analitik ürünleri',
      'Eğitim teknolojileri',
      'Sağlık teknolojileri',
    ],
    faq: [
      {
        question: 'SaaS nedir, geleneksel yazılımdan farkı ne?',
        answer:
          'SaaS, kullanıcının kurulum yapmadan tarayıcı üzerinden abone olup kullandığı yazılım modelidir. Geleneksel yazılımda lisans bir kez satın alınır ve kurulum müşteri tarafında yapılır; SaaS’ta gelir tekrar eden ve ürün sürekli güncellenir.',
      },
      {
        question: 'Multi-tenant mimari neden önemli?',
        answer:
          'Tek bir uygulama örneğinin birçok müşteriye hizmet vermesi maliyeti düşürür ve yönetimi kolaylaştırır. Veri izolasyonu doğru kurulmazsa güvenlik riski oluşur; biz row level security (RLS) ile tenant ayrımını garanti altına alıyoruz.',
      },
      {
        question: 'Abonelik ödemelerini nasıl alacağız?',
        answer:
          'Türkiye ve global pazar için yaygın ödeme sağlayıcılarıyla entegrasyon kuruyoruz. Kart saklama, tekrarlayan tahsilat, başarısız ödeme denemeleri ve fatura üretimi otomatikleştirilir.',
      },
      {
        question: 'MVP ile başlamak mantıklı mı?',
        answer:
          'Evet. Tam ürün yerine çekirdek değeri kanıtlayan bir MVP ile pazara çıkıp gerçek kullanıcı verisiyle büyümek riski azaltır. MVP geliştirme hizmetimiz bunun için tasarlandı.',
      },
      {
        question: 'Ürünün fikri mülkiyeti kimde olacak?',
        answer:
          'Tamamı sizde. Kod deposu, alan adı, veritabanı ve tüm hesaplar sizin adınıza kurulur; proje sonunda kaynak kodlar teslim edilir.',
      },
      {
        question: 'Kullanıcı sayısı arttığında sistem dayanır mı?',
        answer:
          'Mimari baştan ölçeklenebilir kurulur: veritabanı indeksleri, önbellekleme, sunucusuz (serverless) fonksiyonlar ve CDN ile trafik artışları karşılanır. Yük testi ile doğruluyoruz.',
      },
      {
        question: 'SaaS platformu geliştirme maliyeti nedir?',
        answer:
          'Kapsam, ekran sayısı, entegrasyonlar ve destek süresine göre değişir. MVP aşaması ile tam ürün aşaması farklı bütçelerdir; ücretsiz ön analiz sonrası fazlı bir teklif sunuyoruz.',
      },
    ],
    relatedServices: [
      'mvp-startup-urunu',
      'abonelik-tabanli-yazilim',
      'multi-tenant-uygulama',
      'dashboard-sistemi',
      'supabase-postgresql',
      'vercel-deployment',
      'odeme-whatsapp-crm-entegrasyonu',
    ],
    schemaType: 'ProfessionalService',
  },
  // 22
  {
    slug: 'abonelik-tabanli-yazilim',
    title: 'Abonelik Tabanlı Yazılım',
    shortTitle: 'Abonelik Yazılımı',
    category: 'saas',
    primaryKeyword: 'abonelik tabanlı yazılım',
    secondaryKeywords: [
      'abonelik sistemi',
      'üyelik sistemi',
      'abonelik yazılımı',
      'ödeme abonelik',
    ],
    icon: 'CreditCard',
    imageQuery: 'subscription software',
    summary:
      'Plan, deneme, tahsilat, yenileme ve iptal akışlarını yöneten eksiksiz abonelik altyapısı.',
    description:
      'Abonelik tabanlı yazılım, kullanıcıların belirli bir plan karşılığında düzenli ödeme yaparak hizmete eriştiği modeldir. Gelir tarafında öngörülebilirlik sağlarken, teknik tarafında dikkatli kurgulanması gereken bir dizi akış barındırır: plan tanımları, deneme süresi, yükseltme ve düşürme, ödeme hataları, kart güncelleme, yenileme hatırlatmaları, iptal ve geri kazanım. Tardigrad Software olarak bu akışların tamamını tek bir abonelik katmanında topluyoruz. Kullanıcı panelinde mevcut plan, bir sonraki fatura tarihi, ödeme yöntemi ve kullanım limitleri görünür; arka planda ise tahsilat denemeleri, dunning (ödeme hatası kurtarma) e-postaları ve fatura arşivi otomatik çalışır. Abonelik verisi ürün analitiği ile birleştiğinde hangi planın daha kârlı olduğu, hangi aşamada iptal yaşandığı ve hangi özelliğin yükseltmeye neden olduğu netleşir. Mevcut bir hizmetiniz varsa onu abonelik modeline dönüştürmek için de çalışıyoruz.',
    heroTagline: 'Öngörülebilir gelir: plan, tahsilat ve yenileme otomasyonu.',
    whyNeeded: [
      {
        title: 'Manuel tahsilat takibi',
        description: 'Her ay tek tek ödeme takip etmek hem zaman alır hem hata üretir.',
        icon: 'CalendarClock',
      },
      {
        title: 'Ödeme hatasında gelir kaybı',
        description: 'Kartı reddedilen kullanıcıyı kurtarma akışı yoksa istemsiz iptal yaşanır.',
        icon: 'CreditCard',
      },
      {
        title: 'Plan karmaşası',
        description: 'Hangi kullanıcının hangi özelliğe eriştiği net değilse destek yükü artar.',
        icon: 'Layers',
      },
      {
        title: 'İptal nedeni bilinmiyor',
        description: 'Churn analizi yapılmadığında aynı sorunlar tekrar eder.',
        icon: 'TrendingDown',
      },
    ],
    scope: [
      'Plan ve paket tanımları (özellik matrisi, limitler)',
      'Ücretsiz deneme ve deneme sonu akışları',
      'Ödeme sağlayıcı entegrasyonu ve kart saklama',
      'Tekrarlayan tahsilat ve fatura üretimi',
      'Yükseltme / düşürme ve oransal hesaplama (proration)',
      'Ödeme hatası kurtarma (dunning) e-posta akışları',
      'İptal, duraklatma ve geri kazanım kampanyaları',
      'Kullanıcı panelinde abonelik yönetimi',
      'Yönetim panelinde gelir, MRR ve churn raporları',
      'Kupon, indirim ve kampanya kodları',
      'E-fatura / e-arşiv entegrasyonu',
      'KVKK uyumlu ödeme verisi işleme',
    ],
    benefits: [
      {
        title: 'Öngörülebilir gelir',
        description: 'MRR takibi ile nakit akışı planlanabilir hâle gelir.',
        metric: 'Canlı MRR',
        icon: 'ChartLine',
      },
      {
        title: 'Kurtarılan ödemeler',
        description: 'Dunning akışları istemsiz iptalleri geri kazanır.',
        metric: '+12% kurtarma',
        icon: 'HeartPulse',
      },
      {
        title: 'Azalan manuel iş',
        description: 'Tahsilat, fatura ve hatırlatmalar otomatikleşir.',
        metric: '-80% manuel işlem',
        icon: 'Bot',
      },
      {
        title: 'Churn görünürlüğü',
        description: 'İptal nedenleri raporlanır, ürün kararları veriye dayanır.',
        metric: 'Neden bazlı analiz',
        icon: 'ChartPie',
      },
    ],
    targetAudience: [
      'SaaS ürünleri',
      'Online eğitim platformları',
      'İçerik ve medya abonelikleri',
      'B2B hizmet paketleri',
      'Üyelik bazlı topluluklar',
      'Yazılım lisanslama modelleri',
      'Bakım ve destek sözleşmeleri',
    ],
    faq: [
      {
        question: 'Hangi ödeme sağlayıcılarıyla çalışıyorsunuz?',
        answer:
          'Türkiye ve global pazar için yaygın ödeme altyapılarıyla entegrasyon kuruyoruz. Mevcut anlaşmanız varsa onu kullanıyor, yoksa ihtiyaçlarınıza uygun sağlayıcıyı birlikte seçiyoruz.',
      },
      {
        question: 'Kullanıcı planını kendi değiştirebilir mi?',
        answer:
          'Evet. Müşteri panelinden yükseltme ve düşürme yapılabilir; oransal hesap (proration) otomatik uygulanır ve fark faturaya yansır.',
      },
      {
        question: 'Ödeme başarısız olursa ne oluyor?',
        answer:
          'Otomatik yeniden deneme, kullanıcıya kart güncelleme e-postası ve erişim kısıtlama akışı devreye girer. Belirli bir süreden sonra abonelik pasife alınır.',
      },
      {
        question: 'Fatura otomatik kesiliyor mu?',
        answer:
          'Evet. e-Fatura / e-arşiv entegrasyonu ile her tahsilat için otomatik fatura üretilir ve kullanıcı panelinde arşivlenir.',
      },
      {
        question: 'Deneme süresi sonunda otomatik tahsilat yapılabilir mi?',
        answer:
          'Evet. Kart bilgisi alınarak veya alınmadan deneme modelleri kurulabilir; yasal bilgilendirme metinlerini de ekliyoruz.',
      },
      {
        question: 'Mevcut abonelerimi yeni sisteme taşıyabilir miyim?',
        answer:
          'Evet. Aktif abonelikleri, kalan süreleri ve ödeme bilgilerini (sağlayıcı kuralları çerçevesinde) taşıyor, kesintisiz geçiş sağlıyoruz.',
      },
    ],
    relatedServices: [
      'saas-platformu',
      'musteri-paneli',
      'odeme-whatsapp-crm-entegrasyonu',
      'multi-tenant-uygulama',
      'raporlama-sistemi',
      'mvp-startup-urunu',
    ],
  },
  // 23
  {
    slug: 'multi-tenant-uygulama',
    title: 'Multi-Tenant Uygulama Geliştirme',
    shortTitle: 'Multi-Tenant',
    category: 'saas',
    primaryKeyword: 'multi-tenant',
    secondaryKeywords: [
      'multi tenant yazılım',
      'çok kiracılı uygulama',
      'çok firmalı yazılım',
      'SaaS multi-tenant',
    ],
    icon: 'Layers',
    imageQuery: 'multi tenant cloud architecture',
    summary:
      'Tek uygulama, yüzlerce firma: veri izolasyonu garantili çok kiracılı mimari kuruyoruz.',
    description:
      'Multi-tenant uygulama, tek bir yazılım örneğinin birden fazla müşteriye (tenant) hizmet verdiği mimaridir. Her müşteri kendi verisini, kullanıcılarını, ayarlarını ve markasını görür; ancak altyapı ortak olduğu için maliyet ve bakım yükü düşer. Bu mimarinin en kritik noktası veri izolasyonudur: bir müşterinin verisi yanlışlıkla diğerine görünürse sonuç hem hukuki hem ticari olarak ağır olur. Tardigrad Software olarak multi-tenant projelerde PostgreSQL row level security (RLS) politikaları, tenant bazlı şema ayrımı, merkezi kimlik doğrulama ve tenant’a özel özelleştirme katmanları kuruyoruz. Her tenant kendi alan adı veya alt alan adıyla yayınlanabilir, kendi logosunu ve renklerini kullanabilir, kendi modüllerini açabilir. Ölçeklenme tarafında tenant bazlı kullanım ölçümü, limit yönetimi ve adil kaynak paylaşımı sağlanır. Bayi ağı, şube yapısı, franchise sistemleri ve SaaS ürünleri için en doğru yaklaşımdır.',
    heroTagline: 'Tek altyapı, sınırsız müşteri: veri izolasyonu garantili.',
    whyNeeded: [
      {
        title: 'Müşteri başına ayrı kurulum maliyeti',
        description: 'Single-tenant yaklaşımda her müşteri için ayrı bakım ve altyapı gideri doğar.',
        icon: 'Coins',
      },
      {
        title: 'Veri sızıntısı riski',
        description: 'İzolasyon doğru kurulmazsa tenant’lar arası veri karışması yaşanır.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Sürüm karmaşası',
        description: 'Her müşteride farklı sürüm varsa hata düzeltmeleri haftalar sürer.',
        icon: 'GitBranch',
      },
      {
        title: 'Özelleştirme talepleri',
        description: 'Tenant bazlı marka ve modül farklılıkları yönetilemez hâle gelir.',
        icon: 'Palette',
      },
    ],
    scope: [
      'Tenant veri modeli tasarımı (şema / satır bazlı izolasyon kararı)',
      'PostgreSQL Row Level Security (RLS) politikaları',
      'Tenant kimlik doğrulama ve oturum yönetimi',
      'Alt alan adı veya özel domain bağlama',
      'Tenant bazlı marka özelleştirme (logo, renk, e-posta şablonu)',
      'Modül ve özellik açma/kapama (feature flags)',
      'Kullanım limitleri ve kota yönetimi',
      'Tenant bazlı yedekleme ve veri taşıma',
      'Merkezi yönetici paneli (tüm tenant’lar)',
      'Tenant self-servis paneli',
      'Ölçeklenme: önbellek, indeks, bağlantı havuzu',
      'Denetim logları ve güvenlik testleri',
    ],
    benefits: [
      {
        title: 'Düşük işletme maliyeti',
        description: 'Tek altyapı üzerinde yüzlerce müşteri barındırılır.',
        metric: '-70% altyapı maliyeti',
        icon: 'Server',
      },
      {
        title: 'Hızlı müşteri açılışı',
        description: 'Yeni tenant dakikalar içinde oluşturulur.',
        metric: 'Dakikalar içinde',
        icon: 'Zap',
      },
      {
        title: 'Güvenli izolasyon',
        description: 'RLS politikaları ile tenant verileri veritabanı seviyesinde ayrılır.',
        metric: 'Veritabanı düzeyinde',
        icon: 'Lock',
      },
      {
        title: 'Tek sürüm yönetimi',
        description: 'Tüm müşteriler aynı güncel sürümü kullanır.',
        metric: 'Anlık yayın',
        icon: 'RefreshCw',
      },
    ],
    targetAudience: [
      'SaaS girişimleri',
      'Bayi ve franchise ağları',
      'Çok şubeli işletmeler',
      'Ajanslar (beyaz etiket ürün)',
      'Eğitim platformları',
      'Sektörel dikey yazılımlar',
      'Pazar yeri benzeri yapılar',
    ],
    faq: [
      {
        question: 'Multi-tenant ile single-tenant arasındaki fark nedir?',
        answer:
          'Single-tenant mimaride her müşteri için ayrı bir kurulum ve veritabanı vardır; izolasyon yüksektir ama maliyet ve bakım da yüksektir. Multi-tenant’ta uygulama ve veritabanı paylaşılır, izolasyon politikalarla sağlanır; maliyet düşer, yönetim kolaylaşır.',
      },
      {
        question: 'Veri izolasyonunu nasıl garanti ediyorsunuz?',
        answer:
          'PostgreSQL Row Level Security politikaları, uygulama katmanında tenant bağlamı kontrolü, otomatik testler ve güvenlik denetimleri ile. Her sorgu tenant filtresi olmadan çalışamaz.',
      },
      {
        question: 'Müşteriler kendi alan adını kullanabilir mi?',
        answer:
          'Evet. Alt alan adı (musteri.urun.com) veya kendi özel alan adı (app.musteri.com) bağlanabilir; SSL sertifikaları otomatik üretilir.',
      },
      {
        question: 'Her tenant farklı özellikler görebilir mi?',
        answer:
          'Evet. Feature flag altyapısı ile plan bazlı modül açma/kapama, tenant bazlı özelleştirme ve kademeli yayın (rollout) yapılabilir.',
      },
      {
        question: 'Tenant bazlı yedekleme mümkün mü?',
        answer:
          'Evet. Genel yedeklemenin yanında tek bir tenant’ın verisini dışa aktarma veya geri yükleme akışları kurabiliyoruz.',
      },
      {
        question: 'Mevcut single-tenant sistemimizi dönüştürebilir misiniz?',
        answer:
          'Evet. Veri modelini analiz edip kademeli bir geçiş planı çıkarıyoruz; müşteri kesintisi yaşamadan tenant yapısına geçiş sağlanır.',
      },
    ],
    relatedServices: [
      'saas-platformu',
      'abonelik-tabanli-yazilim',
      'supabase-postgresql',
      'yonetim-paneli',
      'vercel-deployment',
      'cloudflare-cdn',
    ],
  },
  // 24
  {
    slug: 'dashboard-sistemi',
    title: 'Dashboard Sistemi',
    shortTitle: 'Dashboard',
    category: 'yazilim',
    primaryKeyword: 'dashboard',
    secondaryKeywords: [
      'online dashboard',
      'yönetim paneli dashboard',
      'veri görselleştirme',
      'dashboard yazılımı',
    ],
    icon: 'Gauge',
    imageQuery: 'business dashboard analytics',
    summary:
      'Kritik metriklerinizi tek ekranda toplayan, canlı ve etkileşimli dashboard’lar tasarlıyoruz.',
    description:
      'Dashboard sistemi, işletmenizin kritik metriklerini tek ekranda görselleştiren arayüz katmanıdır. Yöneticinin her sabah ilk baktığı ekran doğru tasarlanmışsa kararlar hızlanır; yanlış tasarlanmışsa veri bolluğu içinde hiçbir şey görülmez. Tardigrad Software olarak dashboard projelerine “hangi kararı destekleyecek?” sorusuyla başlıyoruz. Ardından metrik hiyerarşisini kuruyoruz: üst seviyede gelir, dönüşüm ve operasyon sağlığı; alt seviyede detay kırılımlar. Grafikler, karşılaştırma dönemleri, filtreler ve uyarı eşikleri ile etkileşimli bir deneyim sunuyoruz. Veriler Supabase / PostgreSQL üzerinde gerçek zamanlı sorgulanır veya önbelleğe alınır; böylece ekran her zaman hızlı kalır. Departman bazlı farklı görünümler (satış, operasyon, finans, pazarlama) aynı veri modelinden beslenir. Ofis ekranları için tam ekran modu, mobil için sadeleştirilmiş kart görünümü standarttır.',
    heroTagline: 'Kritik metrikler tek ekranda, her zaman güncel.',
    whyNeeded: [
      {
        title: 'Veri var, görünürlük yok',
        description: 'Tablolarda duran sayılar karar anında hızlıca okunamaz.',
        icon: 'TableProperties',
      },
      {
        title: 'Farklı ekipler farklı sayı görüyor',
        description: 'Ortak metrik tanımı olmadığında tartışmalar veriye değil yoruma dayanır.',
        icon: 'GitCompare',
      },
      {
        title: 'Sorunlar geç fark ediliyor',
        description: 'Canlı ekran ve eşik uyarısı olmadığında problem büyüdüğünde görünür.',
        icon: 'AlarmClock',
      },
      {
        title: 'Rapor talepleri birikiyor',
        description: 'Her soru için ayrı rapor istenirse analitik ekip iş yapamaz hâle gelir.',
        icon: 'Inbox',
      },
    ],
    scope: [
      'KPI tanımları ve metrik sözlüğü',
      'Yönetici özet ekranı (üst seviye sağlık göstergeleri)',
      'Departman bazlı dashboard’lar (satış, operasyon, finans, pazarlama)',
      'Etkileşimli grafikler: zaman serisi, dağılım, karşılaştırma',
      'Filtreleme: tarih aralığı, şube, ekip, ürün, kanal',
      'Dönem karşılaştırması (bu ay / geçen ay / geçen yıl)',
      'Eşik uyarıları ve bildirimler',
      'Canlı veri bağlantısı veya zamanlanmış yenileme',
      'Tam ekran ofis modu ve mobil görünüm',
      'PDF / Excel dışa aktarma ve e-posta ile paylaşım',
      'Performans optimizasyonu (önbellek, indeks, sorgu planı)',
      'Yetkilendirme: kim hangi veriyi görür',
    ],
    benefits: [
      {
        title: 'Hızlı karar',
        description: 'Doğru metrik doğru biçimde gösterildiğinde karar süresi kısalır.',
        metric: '3x daha hızlı karar',
        icon: 'Zap',
      },
      {
        title: 'Ortak dil',
        description: 'Tüm ekipler aynı tanımlarla aynı sayıyı görür.',
        metric: 'Tek kaynak',
        icon: 'UsersRound',
      },
      {
        title: 'Erken uyarı',
        description: 'Eşik aşımında bildirim ile sorun büyümeden müdahale edilir.',
        metric: 'Proaktif',
        icon: 'BellRing',
      },
      {
        title: 'Rapor yükü azalır',
        description: 'Self-servis ekranlar sayesinde ad hoc rapor talepleri düşer.',
        metric: '-60% rapor talebi',
        icon: 'FileChartColumn',
      },
    ],
    targetAudience: [
      'Yönetim ekipleri',
      'Satış organizasyonları',
      'E-ticaret operasyonları',
      'Üretim tesisleri',
      'Pazarlama ekipleri',
      'Finans birimleri',
      'Çok şubeli işletmeler',
    ],
    faq: [
      {
        question: 'Dashboard ile rapor arasındaki fark nedir?',
        answer:
          'Dashboard canlı ve etkileşimli bir özet ekrandır; günlük kararları destekler. Rapor ise belirli bir dönemin detaylı, genellikle dışa aktarılabilen çıktısıdır. İkisini birlikte kuruyoruz.',
      },
      {
        question: 'Hangi metrikleri göstermeliyiz?',
        answer:
          'Proje başında karar odaklı bir KPI atölyesi yapıyoruz: hangi kararı kim veriyor, hangi veriye ihtiyacı var? Sonrasında en fazla 8-12 ana metrik seçip detay kırılımları alt ekranlara taşıyoruz.',
      },
      {
        question: 'Veriler ne sıklıkla güncellenir?',
        answer:
          'Kaynak sisteme bağlı olarak gerçek zamanlı, dakikalık veya günlük yenileme kurulabilir. Performans için uygun stratejiyi birlikte belirliyoruz.',
      },
      {
        question: 'Mevcut veritabanımıza bağlanabilir mi?',
        answer:
          'Evet. PostgreSQL, MySQL gibi veritabanlarına, API’lere ve Excel kaynaklarına bağlanabiliyoruz. Veri modeli farklıysa ara katman (view / özet tablo) kuruyoruz.',
      },
      {
        question: 'Televizyonda gösterebilir miyiz?',
        answer:
          'Evet. Ofis ekranları için otomatik yenilenen, tam ekran ve uzak mesafeden okunabilen gösterim modu hazırlıyoruz.',
      },
      {
        question: 'Kurulum ne kadar sürer?',
        answer:
          'Veri kaynağı erişilebilirse ilk dashboard 2-3 hafta içinde yayına alınır; ek ekranlar ve uyarılar faz faz eklenir.',
      },
    ],
    relatedServices: [
      'raporlama-sistemi',
      'yonetim-paneli',
      'crm',
      'supabase-postgresql',
      'api-entegrasyonu',
      'is-takip-sistemi',
    ],
  },
  // 25
  {
    slug: 'mvp-startup-urunu',
    title: 'MVP ve Startup Ürünü Geliştirme',
    shortTitle: 'MVP / Startup',
    category: 'saas',
    primaryKeyword: 'MVP geliştirme',
    secondaryKeywords: [
      'MVP nedir',
      'startup web uygulaması',
      'MVP tasarımı',
      'hızlı ürün geliştirme',
    ],
    icon: 'Rocket',
    imageQuery: 'startup mvp development',
    summary:
      'Fikrinizi 4-8 haftada pazara çıkan, yatırım sunumuna hazır bir ürüne dönüştürüyoruz.',
    description:
      'MVP (Minimum Viable Product), bir ürün fikrinin en küçük çalışır hâlidir; amaç tüm özellikleri değil, temel değer önerisini gerçek kullanıcıyla test etmektir. Startup’ların en sık yaptığı hata, altı ay boyunca kapalı kapılar ardında “mükemmel” ürün geliştirmektir; pazara çıkıldığında varsayımların çoğu yanlış çıkar. Tardigrad Software olarak MVP sürecinde önce değer hipotezini netleştiriyoruz: kim, hangi problemi, neden çözümsüz bırakıyor? Ardından özellikleri “olmazsa olmaz” ve “sonra” olarak ayırıp 4-8 haftalık bir yayın planı çıkarıyoruz. Next.js, TypeScript ve Supabase ile hızlı ama borç bırakmayan bir mimari kuruyoruz; MVP’den tam ürüne geçişte kod çöpe gitmiyor. Ürün analitiği ve kullanıcı geri bildirim kanalları ilk günden kurulur, böylece kararlar tahminle değil veriyle verilir. Yatırım sunumu, demo ortamı ve teknik dokümantasyon da teslim kapsamında yer alır.',
    heroTagline: 'Fikriniz 4-8 haftada kullanıcıların elinde olsun.',
    whyNeeded: [
      {
        title: 'Varsayımlar test edilmiyor',
        description: 'Kullanıcıyla konuşmadan geliştirilen ürün pazara uymayabilir.',
        icon: 'CircleHelp',
      },
      {
        title: 'Bütçe yanlış özelliklere gidiyor',
        description: 'Kullanılmayacak modüller geliştirilirse kaynak tükenir.',
        icon: 'Wallet',
      },
      {
        title: 'Pazara geç çıkış',
        description: 'Rakipler önce davranır, kategori kapanır.',
        icon: 'Hourglass',
      },
      {
        title: 'Yatırımcı kanıt istiyor',
        description: 'Sunum dosyası değil, çalışan ürün ve erken kullanım verisi ikna eder.',
        icon: 'Presentation',
      },
    ],
    scope: [
      'Fikir doğrulama ve değer hipotezi atölyesi',
      'Kapsam kesme: MVP özellik seti ve yayın planı',
      'Kullanıcı akışları ve wireframe',
      'Hızlı UI tasarımı (design system temelli)',
      'Next.js + TypeScript ön yüz geliştirme',
      'Supabase / PostgreSQL veri katmanı ve auth',
      'Çekirdek iş akışının uçtan uca çalışır hâle getirilmesi',
      'Ürün analitiği ve olay takibi kurulumu',
      'Kullanıcı geri bildirim kanalları (form, anket, destek)',
      'Beta kullanıcı onboarding akışı',
      'Yatırım sunumu için demo ortamı ve ekran kayıtları',
      'Teknik dokümantasyon ve kod teslimi',
      'Yayın sonrası 30 günlük iyileştirme turu',
    ],
    benefits: [
      {
        title: 'Hızlı pazara çıkış',
        description: 'Aylar değil haftalar içinde gerçek kullanıcıyla test.',
        metric: '4-8 hafta',
        icon: 'Rocket',
      },
      {
        title: 'Düşük başlangıç maliyeti',
        description: 'Yalnızca gerekli özelliklere yatırım yapılır.',
        metric: '-60% gereksiz kapsam',
        icon: 'PiggyBank',
      },
      {
        title: 'Veriye dayalı yol haritası',
        description: 'Sonraki sürüm gerçek kullanım verisiyle planlanır.',
        metric: 'Kanıtlanmış karar',
        icon: 'Compass',
      },
      {
        title: 'Borç bırakmayan mimari',
        description: 'MVP kodu tam ürüne taşınabilir; yeniden yazım gerekmez.',
        metric: 'Ölçeklenebilir temel',
        icon: 'Blocks',
      },
    ],
    targetAudience: [
      'Erken aşama startup kurucuları',
      'Kurum içi girişim ekipleri',
      'Yeni ürün fikri olan işletmeler',
      'Ajanslar ve ürünleşen hizmet firmaları',
      'Yatırım arayışındaki girişimler',
      'Dikey SaaS fikirleri',
    ],
    faq: [
      {
        question: 'MVP nedir, prototipten farkı ne?',
        answer:
          'Prototip görsel ve akış doğrulaması için yapılan, gerçek işlevi olmayan makettir. MVP ise gerçek kullanıcıların kullanabildiği, çekirdek değeri uçtan uca teslim eden çalışan üründür.',
      },
      {
        question: 'Hangi özellikleri MVP’ye almalıyım?',
        answer:
          'Kullanıcının problemi çözmesini sağlayan en küçük set. Birlikte yaptığımız kapsam atölyesinde her özelliği “değer üretiyor mu?” sorusuyla değerlendirip listeden çıkarıyoruz.',
      },
      {
        question: 'MVP ne kadar sürede hazır olur?',
        answer:
          'Kapsama göre 4-8 hafta. Tasarım ve geliştirme paralel yürütülür; her hafta çalışan bir çıktı paylaşılır.',
      },
      {
        question: 'Sonrasında ürünü büyütebilir miyiz?',
        answer:
          'Evet. Mimari baştan ölçeklenebilir kurulur: tip güvenli kod, modüler yapı ve temiz veri modeli sayesinde yeni özellikler mevcut sistemi bozmadan eklenir.',
      },
      {
        question: 'Kod ve ürünün sahibi kim olacak?',
        answer:
          'Tamamı sizde. Depo, alan adı, veritabanı ve tüm hesaplar sizin adınıza açılır; proje sonunda kaynak kodlar ve dokümantasyon teslim edilir.',
      },
      {
        question: 'Yatırımcı sunumu için destek veriyor musunuz?',
        answer:
          'Evet. Demo ortamı, ürün videosu, teknik mimari özeti ve metrik raporları hazırlıyor; sunumda teknik sorular için destek oluyoruz.',
      },
      {
        question: 'Fikrimi paylaşmak güvenli mi?',
        answer:
          'Evet. Görüşmelerde karşılıklı gizlilik anlaşması (NDA) imzalayabiliriz; proje verileri yalnızca yetkili ekip üyeleriyle paylaşılır.',
      },
    ],
    relatedServices: [
      'saas-platformu',
      'multi-tenant-uygulama',
      'abonelik-tabanli-yazilim',
      'dashboard-sistemi',
      'supabase-postgresql',
      'vercel-deployment',
      'ai-icerik-araclar',
    ],
  },
  // 26
  {
    slug: 'teknik-seo',
    title: 'Teknik SEO Hizmeti',
    shortTitle: 'Teknik SEO',
    category: 'seo',
    primaryKeyword: 'teknik SEO',
    secondaryKeywords: [
      'teknik SEO hizmeti',
      'site teknik SEO',
      'SEO denetimi',
      'web sitesi SEO',
    ],
    icon: 'SearchCode',
    imageQuery: 'technical seo audit',
    summary:
      'Hız, tarama bütçesi, indexleme ve yapısal veride eksiksiz teknik SEO denetimi ve uygulaması.',
    description:
      'Teknik SEO, sitenizin Google tarafından doğru biçimde taranmasını, anlaşılmasını ve sıralanmasını sağlayan altyapı çalışmasıdır. İçerik ne kadar iyi olursa olsun; yavaş açılan, mobilde bozulan, hatalı canonical kullanan veya yapısal veri eksikleri olan sayfalar potansiyeline ulaşamaz. Tardigrad Software olarak teknik SEO hizmetinde kapsamlı bir denetimle başlıyoruz: Core Web Vitals (LCP, CLS, INP), tarama ve indexleme durumu, sitemap ve robots yapılandırması, yönlendirme zincirleri, kırık linkler, görsel optimizasyonu, JavaScript render sorunları ve schema.org doğrulaması. Ardından tespit edilen sorunları önceliklendirip uyguluyoruz; yalnızca rapor verip bırakmıyoruz. Next.js tabanlı sitelerde sunucu tarafı render, next/image, font optimizasyonu ve önbellekleme ile hız skorlarını belirgin şekilde yükseltiyoruz. Cloudflare ve Vercel yapılandırmasıyla global ölçekte düşük gecikme sağlıyoruz. Çalışma sonunda önce/sonra karşılaştırmalı bir rapor ve sürekli izleme kurulumu teslim ediyoruz.',
    heroTagline: 'Google’ın sitenizi doğru okuması ve hızlı görmesi için teknik temel.',
    whyNeeded: [
      {
        title: 'Sayfalar yavaş açılıyor',
        description: 'Hız, hem sıralama sinyali hem kullanıcı deneyimi için kritiktir.',
        icon: 'Gauge',
      },
      {
        title: 'Sayfalar indexlenmiyor',
        description: 'noindex, canonical ve yönlendirme hataları sayfaları görünmez kılar.',
        icon: 'SearchX',
      },
      {
        title: 'Mobil deneyim zayıf',
        description: 'Mobil öncelikli indexleme nedeniyle mobil sorunlar sıralamayı doğrudan etkiler.',
        icon: 'Smartphone',
      },
      {
        title: 'Yapısal veri eksik',
        description: 'Schema işaretlemesi olmayan sayfalar zengin sonuç fırsatlarını kaçırır.',
        icon: 'Braces',
      },
      {
        title: 'Tarama bütçesi israfı',
        description: 'Kopya ve düşük değerli sayfalar tarandıkça önemli sayfalar gecikir.',
        icon: 'Trash2',
      },
    ],
    scope: [
      'Kapsamlı teknik SEO denetimi ve önceliklendirilmiş aksiyon listesi',
      'Core Web Vitals analizi ve iyileştirme (LCP, CLS, INP)',
      'Tarama ve indexleme kontrolü (robots.txt, noindex, canonical)',
      'XML sitemap üretimi ve Search Console gönderimi',
      'Yönlendirme haritası ve 301 zincirlerinin temizlenmesi',
      'Kırık link ve yetim sayfa tespiti',
      'Görsel optimizasyonu: WebP/AVIF, boyut, lazy loading, alt metin',
      'JavaScript render ve sunucu tarafı render kontrolü',
      'schema.org yapısal veri kurulumu ve doğrulama',
      'URL yapısı ve iç link mimarisi optimizasyonu',
      'Site hızı: önbellek, CDN, font, kritik CSS',
      'Güvenlik ve HTTPS yapılandırması',
      'Uluslararası SEO (hreflang) kontrolü',
      'Önce/sonra performans raporu ve sürekli izleme',
    ],
    benefits: [
      {
        title: 'Hızlı açılan sayfalar',
        description: 'Core Web Vitals hedeflerine uygun optimizasyon.',
        metric: 'LCP < 2.5s',
        icon: 'Zap',
      },
      {
        title: 'Daha fazla indexlenen sayfa',
        description: 'Tarama ve indexleme sorunları giderilir.',
        metric: '+35% index',
        icon: 'FolderCheck',
      },
      {
        title: 'Zengin sonuç fırsatı',
        description: 'Yapısal veri ile yıldız, SSS ve breadcrumb görünümleri.',
        metric: 'Schema doğrulanmış',
        icon: 'Star',
      },
      {
        title: 'Sürdürülebilir sıralama',
        description: 'Sağlam teknik temel, içerik ve link çalışmalarının etkisini büyütür.',
        metric: 'Uzun vadeli',
        icon: 'TrendingUp',
      },
    ],
    targetAudience: [
      'Organik trafiğini büyütmek isteyen işletmeler',
      'E-ticaret siteleri',
      'Çok sayfalı kurumsal siteler',
      'Hız sorunu yaşayan siteler',
      'Yeni yayınlanan projeler',
      'Site taşıma/yenileme yapan firmalar',
      'Yurt dışı pazarlara açılanlar',
    ],
    faq: [
      {
        question: 'Teknik SEO ile normal SEO arasındaki fark nedir?',
        answer:
          'Teknik SEO altyapıya odaklanır: hız, tarama, indexleme, yapısal veri, mobil uyum. İçerik ve bağlantı (off-page) çalışmaları ise ayrı disiplinlerdir. Teknik temel sağlam olmadan diğer çalışmaların etkisi sınırlı kalır.',
      },
      {
        question: 'Denetim ne kadar sürer?',
        answer:
          'Site büyüklüğüne göre 3-7 iş günü. Sonrasında önceliklendirilmiş bir aksiyon listesi ve tahmini etki raporu teslim ediyoruz.',
      },
      {
        question: 'Sorunları siz mi düzeltiyorsunuz?',
        answer:
          'Evet. Yalnızca rapor vermiyoruz; erişim sağlandığında düzeltmeleri biz uyguluyoruz. Farklı bir geliştirici ekiple çalışıyorsanız teknik dokümantasyonu onlara uygun biçimde hazırlıyoruz.',
      },
      {
        question: 'Sonuçları ne zaman görürüm?',
        answer:
          'Hız ve indexleme iyileşmeleri günler içinde ölçülür. Sıralama ve trafik etkisi genellikle 1-3 ay içinde belirginleşir; rekabet ve içerik kalitesine göre değişir.',
      },
      {
        question: 'Hangi araçları kullanıyorsunuz?',
        answer:
          'Google Search Console, PageSpeed Insights, Lighthouse, Screaming Frog benzeri tarama araçları, yapısal veri test araçları ve gerçek kullanıcı ölçümleri (CrUX).',
      },
      {
        question: 'Sitem WordPress, teknik SEO yapılır mı?',
        answer:
          'Evet. Platformdan bağımsız çalışıyoruz; ancak hız ve mimari sorunları köklüyse Next.js tabanlı bir yenilemeyi de öneriyoruz.',
      },
      {
        question: 'Sürekli takip gerekiyor mu?',
        answer:
          'Evet. Her yeni içerik, tasarım değişikliği veya entegrasyon teknik sorun yaratabilir. Aylık izleme paketi ile sağlık skorunu sürekli kontrol altında tutuyoruz.',
      },
    ],
    relatedServices: [
      'lokal-seo',
      'schema-org-structured-data',
      'seo-uyumlu-sayfa-mimarisi',
      'google-search-console-kurulumu',
      'cloudflare-cdn',
      'vercel-deployment',
      'web-sitesi-yenileme',
    ],
    schemaType: 'ProfessionalService',
  },
  // 27
  {
    slug: 'lokal-seo',
    title: 'Lokal SEO Hizmeti',
    shortTitle: 'Lokal SEO',
    category: 'seo',
    primaryKeyword: 'lokal SEO',
    secondaryKeywords: [
      'yerel SEO',
      "Google'da görünürlük",
      'ilçe SEO',
      'bölgesel SEO',
      'yerel Google arama',
    ],
    icon: 'MapPin',
    imageQuery: 'local seo google maps',
    summary:
      'Şehrinizde ve ilçenizde “yakınımda” aramalarında üst sıralara çıkmanız için lokal SEO.',
    description:
      'Lokal SEO, belirli bir şehir veya bölgede hizmet veren işletmelerin yerel aramalarda görünür olmasını sağlayan çalışmadır. “İstanbul kurumsal web sitesi”, “Maltepe diş kliniği” veya “yakınımdaki muhasebeci” gibi sorgular yüksek satın alma niyeti taşır; bu aramalarda görünmeyen işletme doğrudan müşteri kaybeder. Tardigrad Software olarak lokal SEO hizmetinde Google Business Profile optimizasyonu, NAP (isim-adres-telefon) tutarlılığı, yerel yapısal veri (LocalBusiness schema), şehir ve ilçe bazlı içerik sayfaları, yerel yorum yönetimi ve harita entegrasyonlarını birlikte yürütüyoruz. Şehir sayfalarını kopya içerik üretmeden, o şehrin sektör yapısına ve işletme ihtiyaçlarına özgü metinlerle hazırlıyoruz. Hizmet + şehir kombinasyon sayfaları ile uzun kuyruk aramalarda görünürlük sağlıyoruz. Sonuçları Search Console ve GA4 üzerinden konum bazlı raporlayarak ölçüyoruz.',
    heroTagline: 'Şehrinizde arandığınızda bulunun: konum bazlı görünürlük.',
    whyNeeded: [
      {
        title: 'Yerel aramalar satın alma niyeti taşır',
        description: '“Yakınımda” sorguları en yüksek dönüşüm oranına sahip aramalardır.',
        icon: 'Target',
      },
      {
        title: 'Rakipler haritada önde',
        description: 'Google Business Profile optimize edilmemişse yerel paket sonuçlarında yer alamazsınız.',
        icon: 'MapPinned',
      },
      {
        title: 'Bilgiler tutarsız',
        description: 'Farklı dizinlerde farklı adres/telefon görünmesi güveni ve sıralamayı düşürür.',
        icon: 'Unlink',
      },
      {
        title: 'Yorumlar yönetilmiyor',
        description: 'Cevaplanmayan olumsuz yorumlar potansiyel müşterileri uzaklaştırır.',
        icon: 'MessageSquareWarning',
      },
    ],
    scope: [
      'Google Business Profile kurulumu ve tam optimizasyonu',
      'NAP tutarlılığı denetimi ve dizin düzeltmeleri',
      'LocalBusiness / ProfessionalService schema işaretlemeleri',
      'Şehir ve ilçe bazlı özgün içerik sayfaları',
      'Hizmet + şehir kombinasyon sayfaları (lokal landing)',
      'Yerel anahtar kelime araştırması ve haritalama',
      'Harita entegrasyonu ve konum doğrulaması',
      'Yorum toplama stratejisi ve yanıtlama şablonları',
      'Yerel backlink ve dizin fırsatları',
      'Mobil tıklama-ara ve yol tarifi optimizasyonu',
      'Search Console ve GA4 konum bazlı raporlama',
      'Aylık performans takibi ve iyileştirme',
    ],
    benefits: [
      {
        title: 'Yerel aramalarda görünürlük',
        description: 'Harita paketi ve organik sonuçlarda üst sıralar.',
        metric: '+60% yerel gösterim',
        icon: 'MapPin',
      },
      {
        title: 'Daha fazla telefon ve ziyaret',
        description: 'Yerel aramalar doğrudan aksiyona dönüşür.',
        metric: '2x çağrı',
        icon: 'PhoneCall',
      },
      {
        title: 'Güven veren tutarlılık',
        description: 'Her platformda aynı bilgi, profesyonel bir izlenim bırakır.',
        metric: 'NAP tutarlı',
        icon: 'BadgeCheck',
      },
      {
        title: 'Ölçülebilir sonuç',
        description: 'Konum bazlı trafik ve dönüşüm raporları ile etki netleşir.',
        metric: 'Aylık rapor',
        icon: 'ChartLine',
      },
    ],
    targetAudience: [
      'Belirli bir şehirde hizmet veren işletmeler',
      'Klinikler, diş hekimleri, veterinerler',
      'Hukuk ve mali müşavirlik ofisleri',
      'Restoran, kafe ve oteller',
      'Teknik servisler ve tamirciler',
      'Emlak ofisleri',
      'Eğitim kurumları ve kurslar',
      'Çok şubeli perakende',
    ],
    faq: [
      {
        question: 'Lokal SEO ne kadar sürede sonuç verir?',
        answer:
          'Google Business Profile optimizasyonu ve teknik düzeltmelerin etkisi 2-6 hafta içinde görülür. Rekabetçi şehirlerde içerik ve otorite çalışmalarıyla anlamlı sıralama için 2-4 ay gerekir.',
      },
      {
        question: 'Birden fazla şubem var, hepsi için çalışılır mı?',
        answer:
          'Evet. Her şube için ayrı konum kaydı, ayrı lokal sayfa ve şube bazlı schema işaretleme yapıyoruz; şubeler arası kanibalizasyonu önlüyoruz.',
      },
      {
        question: 'Yorum satın almak işe yarar mı?',
        answer:
          'Hayır ve risklidir. Sahte yorumlar Google politikalarına aykırıdır ve profil cezasına yol açabilir. Bunun yerine gerçek müşterilerden düzenli yorum isteme akışı kuruyoruz.',
      },
      {
        question: 'Şehir sayfaları kopya içerik olur mu?',
        answer:
          'Doğru yapılmazsa olur. Biz her şehir sayfasını o şehrin sektör yapısı, ihtiyaçları ve örnek senaryolarıyla özgünleştiriyor; şablon metinleri kullanmıyoruz.',
      },
      {
        question: 'Fiziksel adresim yok, yine de lokal SEO yapılabilir mi?',
        answer:
          'Evet. Hizmet bölgesi (service area) tanımlı işletmeler için adres gizlenerek bölge bazlı görünürlük çalışması yapılabilir.',
      },
      {
        question: 'Hangi şehirlerde hizmet veriyorsunuz?',
        answer:
          'Türkiye’nin 81 iline hizmet veriyoruz. İstanbul, Ankara, İzmir, Antalya, Bursa, Kocaeli, Gaziantep, Konya, Adana, Kayseri, Eskişehir ve Denizli için ayrı lokal sayfalarımız mevcut.',
      },
    ],
    relatedServices: [
      'teknik-seo',
      'schema-org-structured-data',
      'seo-danismanligi',
      'kurumsal-web-sitesi',
      'google-search-console-kurulumu',
      'seo-uyumlu-sayfa-mimarisi',
    ],
    localPriority: true,
    schemaType: 'ProfessionalService',
  },
  // 28
  {
    slug: 'seo-uyumlu-sayfa-mimarisi',
    title: 'SEO Uyumlu Sayfa Mimarisi',
    shortTitle: 'Sayfa Mimarisi',
    category: 'seo',
    primaryKeyword: 'SEO uyumlu sayfa mimarisi',
    secondaryKeywords: [
      'SEO sayfa yapısı',
      'SEO site mimarisi',
      'URL yapısı',
      'iç link yapısı',
    ],
    icon: 'Network',
    imageQuery: 'website architecture seo',
    summary:
      'URL yapısı, kategori hiyerarşisi ve iç link mimarisi ile tarama verimliliği kuruyoruz.',
    description:
      'SEO uyumlu sayfa mimarisi, sitenizin sayfaları arasındaki hiyerarşiyi, URL yapısını ve iç link bağlantılarını arama motorlarının kolayca anlayabileceği şekilde kurgulamaktır. Dağınık mimarilerde önemli sayfalar ana sayfadan 5-6 tıklama uzakta kalır, tarama bütçesi israf edilir ve konu otoritesi dağılır. Tardigrad Software olarak mimari çalışmalarına anahtar kelime haritası çıkararak başlıyoruz: hangi sorgu hangi sayfaya hizmet edecek, sayfalar arası ilişki nasıl kurulacak, hangi içerikler birleştirilecek. Ardından URL şeması, kategori hiyerarşisi, breadcrumb yapısı, iç link kuralları ve silo (konu kümesi) mantığı tasarlanır. Sonuç; hem kullanıcının aradığını hızla bulduğu hem Google’ın konu ilişkilerini net gördüğü bir yapıdır. Yeni içerik üretildiğinde nereye bağlanacağı bellidir, mevcut sayfalar birbirini güçlendirir ve büyüme sürdürülebilir hâle gelir.',
    heroTagline: 'Doğru yapı, doğru sıralama: mimariyi baştan kurun.',
    whyNeeded: [
      {
        title: 'Önemli sayfalar derinde',
        description: 'Tıklama uzaklığı arttıkça sayfa otoritesi ve sıralama gücü düşer.',
        icon: 'Layers',
      },
      {
        title: 'Konu otoritesi dağılıyor',
        description: 'Birbiriyle ilgili içerikler linklenmediğinde Google konuyu bütünsel göremez.',
        icon: 'Unlink',
      },
      {
        title: 'URL yapısı anlamsız',
        description: 'Parametreli ve okunmayan adresler hem kullanıcıyı hem botu zorlar.',
        icon: 'Link2Off',
      },
      {
        title: 'Kopya içerik riski',
        description: 'Aynı konuya hizmet eden çok sayıda sayfa birbirini yer (kanibalizasyon).',
        icon: 'Copy',
      },
    ],
    scope: [
      'Anahtar kelime haritası ve sayfa eşleştirme',
      'Mevcut mimari denetimi ve tarama derinliği analizi',
      'URL şeması tasarımı (kategori / hizmet / şehir / blog)',
      'Silo (konu kümesi) yapısı ve içerik grupları',
      'İç link kuralları ve anchor metin stratejisi',
      'Breadcrumb mimarisi ve BreadcrumbList schema',
      'Kanibalizasyon tespiti ve sayfa birleştirme planı',
      '301 yönlendirme haritası',
      'Pagination ve filtreli sayfaların yönetimi',
      'Yetim sayfa tespiti ve bağlama',
      'Yeni içerik için yerleşim kuralları',
      'Mimari dokümantasyonu ve içerik takvimi önerisi',
    ],
    benefits: [
      {
        title: 'Daha verimli tarama',
        description: 'Tarama bütçesi değerli sayfalarda kullanılır.',
        metric: '+40% tarama verimi',
        icon: 'ScanSearch',
      },
      {
        title: 'Güçlenen konu otoritesi',
        description: 'İlgili sayfalar birbirini destekler, sıralama yükselir.',
        metric: 'Topic cluster',
        icon: 'Network',
      },
      {
        title: 'Kolay büyüme',
        description: 'Yeni sayfa eklemek mevcut yapıyı bozmaz.',
        metric: 'Ölçeklenebilir',
        icon: 'GitBranchPlus',
      },
      {
        title: 'İyi kullanıcı deneyimi',
        description: 'Ziyaretçi aradığını daha az tıkla bulur, sitede daha uzun kalır.',
        metric: '-25% hemen çıkma',
        icon: 'Route',
      },
    ],
    targetAudience: [
      'Çok sayfalı kurumsal siteler',
      'E-ticaret katalogları',
      'İçerik ağırlıklı bloglar',
      'Lokal SEO yapan işletmeler',
      'Site birleştiren firmalar',
      'Büyüme aşamasındaki projeler',
    ],
    faq: [
      {
        question: 'Sayfa mimarisi neden bu kadar önemli?',
        answer:
          'Çünkü Google sayfaları tek tek değil, bir bütün olarak değerlendirir. Konu ilişkileri net, taraması kolay ve iç linkleri güçlü siteler daha hızlı otorite kazanır.',
      },
      {
        question: 'Mevcut URL’lerim değişecek mi?',
        answer:
          'Gerekirse evet, ancak her değişiklik 301 yönlendirme haritasıyla yapılır. Mevcut görünürlüğü korumak önceliğimizdir; gereksiz URL değişiminden kaçınırız.',
      },
      {
        question: 'Anahtar kelime haritası nedir?',
        answer:
          'Her arama sorgusunun hangi sayfaya hizmet edeceğini gösteren tablodur. Kanibalizasyonu önler, içerik üretimini yönlendirir ve iç link stratejisinin temelini oluşturur.',
      },
      {
        question: 'E-ticaret sitelerinde filtre sayfaları nasıl yönetilir?',
        answer:
          'Değer üreten filtre kombinasyonları indexlenir, geri kalanlar canonical veya noindex ile kontrol altına alınır. Böylece tarama bütçesi boşa harcanmaz.',
      },
      {
        question: 'Bu çalışma tek seferlik mi?',
        answer:
          'Temel mimari tek seferlik kurulur; ancak yeni içerik ve kategori eklendikçe kurallara uyulması gerekir. Aylık danışmanlıkla mimari disiplini koruyoruz.',
      },
      {
        question: 'Ne kadar sürer?',
        answer:
          'Site büyüklüğüne göre 1-3 hafta. Analiz, harita üretimi, yönlendirme planı ve uygulama dokümantasyonu bu süreye dahildir.',
      },
    ],
    relatedServices: [
      'teknik-seo',
      'lokal-seo',
      'schema-org-structured-data',
      'seo-danismanligi',
      'web-sitesi-yenileme',
      'ai-icerik-araclar',
    ],
  },
  // 29
  {
    slug: 'schema-org-structured-data',
    title: 'Schema.org ve Yapısal Veri',
    shortTitle: 'Schema.org',
    category: 'seo',
    primaryKeyword: 'schema.org',
    secondaryKeywords: [
      'structured data',
      'schema markup',
      'JSON-LD',
      'yapısal veri SEO',
    ],
    icon: 'Braces',
    imageQuery: 'structured data markup',
    summary:
      'JSON-LD ile Service, FAQ, LocalBusiness ve Article işaretlemeleri: zengin sonuçlara hazır olun.',
    description:
      'Schema.org yapısal verisi, sitenizdeki içeriğin anlamını arama motorlarına açık biçimde anlatan işaretleme dilidir. Google bir sayfanın hizmet mi, ürün mü, etkinlik mi, soru-cevap mı olduğunu yapısal veri sayesinde net olarak anlar ve uygun durumlarda zengin sonuç (rich result) gösterir: yıldız puanları, SSS akordeonları, breadcrumb izi, fiyat bilgisi. Tardigrad Software olarak JSON-LD formatında manuel ve doğrulanabilir işaretlemeler üretiyoruz. Her hizmet sayfasında Service/ProfessionalService, her SSS bölümünde FAQPage, her sayfada BreadcrumbList, ana sayfada Organization, iletişim ve şehir sayfalarında LocalBusiness şemaları yer alır. Blog yazılarında Article, ürün sayfalarında Product ve Offer işaretlemeleri eklenir. Tüm yapılar Google Zengin Sonuçlar Testi ile doğrulanır, hatalar ve uyarılar giderilir. Doğru kurulan yapısal veri, tıklanma oranını belirgin şekilde yükseltir.',
    heroTagline: 'Google içeriğinizi tahmin etmesin, net olarak anlasın.',
    whyNeeded: [
      {
        title: 'Zengin sonuç fırsatları kaçıyor',
        description: 'İşaretleme olmayan sayfalar arama sonuçlarında düz metin olarak kalır.',
        icon: 'Star',
      },
      {
        title: 'İçerik türü anlaşılmıyor',
        description: 'Hizmet mi, ürün mü, makale mi belirsizse alakasız sorgularla eşleşirsiniz.',
        icon: 'FileQuestion',
      },
      {
        title: 'Yerel görünürlük zayıf',
        description: 'LocalBusiness verisi olmadan harita ve yerel sonuçlarda güç kaybedersiniz.',
        icon: 'MapPinOff',
      },
      {
        title: 'Hatalı markup ceza riski',
        description: 'Yanlış veya spam amaçlı yapısal veri manuel işlem riskine yol açar.',
        icon: 'ShieldAlert',
      },
    ],
    scope: [
      'Mevcut yapısal veri denetimi ve hata tespiti',
      'Organization ve WebSite şeması (site geneli)',
      'Service / ProfessionalService işaretlemeleri',
      'FAQPage şeması ve SSS içerik eşleştirmesi',
      'BreadcrumbList ve sayfa hiyerarşisi',
      'LocalBusiness + GeoCoordinates (şehir sayfaları)',
      'Product, Offer ve AggregateRating (e-ticaret)',
      'Article, BlogPosting ve Author işaretlemeleri',
      'JSON-LD üretimi (manuel, doğrulanabilir)',
      'Google Zengin Sonuçlar Testi ve Search Console doğrulama',
      'İçerik güncellemelerinde şema senkronizasyonu',
      'Dokümantasyon: hangi sayfada hangi şema var',
    ],
    benefits: [
      {
        title: 'Yüksek tıklanma oranı',
        description: 'Zengin sonuçlar arama sayfasında daha fazla yer kaplar.',
        metric: '+25% CTR',
        icon: 'MousePointerClick',
      },
      {
        title: 'Doğru içerik eşleşmesi',
        description: 'Google sayfalarınızın amacını net biçimde anlar.',
        metric: 'Anlamsal netlik',
        icon: 'BrainCircuit',
      },
      {
        title: 'Yerel arama gücü',
        description: 'LocalBusiness verisi ile harita ve bölgesel sonuçlarda görünürlük.',
        metric: 'Geo işaretli',
        icon: 'Map',
      },
      {
        title: 'Sesli arama uyumu',
        description: 'Yapılandırılmış cevaplar sesli asistanlar tarafından tercih edilir.',
        metric: 'Soru-cevap hazır',
        icon: 'Mic',
      },
    ],
    targetAudience: [
      'Tüm kurumsal web siteleri',
      'E-ticaret işletmeleri',
      'Yerel hizmet veren firmalar',
      'İçerik ve haber siteleri',
      'SSS ağırlıklı hizmet sayfaları',
      'Çok sayfalı katalog siteleri',
    ],
    faq: [
      {
        question: 'Yapısal veri sıralamayı doğrudan yükseltir mi?',
        answer:
          'Doğrudan bir sıralama sinyali değildir; ancak zengin sonuçlarla tıklanma oranını artırır ve içeriğin doğru anlaşılmasını sağlar. Bu dolaylı olarak sıralamayı güçlendirir.',
      },
      {
        question: 'JSON-LD mi, microdata mı kullanıyorsunuz?',
        answer:
          'JSON-LD kullanıyoruz. Google’ın önerdiği format budur; sayfa içeriğinden bağımsız, bakımı kolay ve Next.js ile sunucu tarafında üretilebilir.',
      },
      {
        question: 'Hangi şema türlerini ekliyorsunuz?',
        answer:
          'İçerik tipine göre Organization, WebSite, Service, ProfessionalService, FAQPage, BreadcrumbList, LocalBusiness, Product, Offer, Article, BlogPosting ve Person şemalarını kullanıyoruz.',
      },
      {
        question: 'Mevcut sitemde hatalı şema var, düzeltir misiniz?',
        answer:
          'Evet. Eklentilerin ürettiği hatalı veya çakışan işaretlemeleri temizliyor, tek ve tutarlı bir şema katmanı kuruyoruz.',
      },
      {
        question: 'FAQ şeması hâlâ çalışıyor mu?',
        answer:
          'Google, FAQ zengin sonuçlarını bazı site türlerinde sınırlandırdı; ancak yapısal veri içeriğin anlaşılmasına katkı sağlamaya devam ediyor. Gerçek kullanıcı sorularına dayalı SSS bölümleri dönüşüm açısından da değerlidir.',
      },
      {
        question: 'Şemaları nasıl doğruluyorsunuz?',
        answer:
          'Google Zengin Sonuçlar Testi, Schema.org validator ve Search Console geliştirmeler raporunu kullanıyor; yayın sonrası hataları izliyoruz.',
      },
    ],
    relatedServices: [
      'teknik-seo',
      'lokal-seo',
      'seo-uyumlu-sayfa-mimarisi',
      'seo-danismanligi',
      'google-search-console-kurulumu',
      'kurumsal-web-sitesi',
    ],
  },
  // 30
  {
    slug: 'google-search-console-kurulumu',
    title: 'Google Search Console Kurulumu',
    shortTitle: 'Search Console',
    category: 'seo',
    primaryKeyword: 'Google Search Console',
    secondaryKeywords: [
      'GSC kurulumu',
      'site doğrulama',
      'GSC analizi',
      'arama performansı',
    ],
    icon: 'Terminal',
    imageQuery: 'google search console analytics',
    summary:
      'Site doğrulama, sitemap gönderimi ve arama performansı izlemesini eksiksiz kuruyoruz.',
    description:
      'Google Search Console, sitenizin Google arama sonuçlarındaki performansını doğrudan Google verisiyle izlemenizi sağlayan ücretsiz araçtır. Doğru kurulmadığında indexleme sorunları, manuel işlemler ve tarama hataları geç fark edilir; bu da aylarca süren görünürlük kaybı anlamına gelir. Tardigrad Software olarak Search Console kurulumunu eksiksiz yapıyoruz: alan adı mülkü doğrulaması, www/non-www ve HTTP/HTTPS varyantlarının yönetimi, XML sitemap gönderimi, robots.txt kontrolü, indexleme kapsamı izleme ve yapısal veri raporlarının takibi. Ayrıca GA4 ile bağlantı kurarak arama verisi ile site davranışını birlikte analiz ediyoruz. Kurulum sonrası ilk 30 gün boyunca günlük izleme yapıyor; indexlenmeyen sayfalar, tarama hataları ve güvenlik uyarıları için hızlı aksiyon alıyoruz. Ekip içindeki ilgili kişilere doğru yetki seviyeleriyle erişim tanımlıyoruz.',
    heroTagline: 'Google’ın siteniz hakkında ne düşündüğünü kendi verisinden görün.',
    whyNeeded: [
      {
        title: 'Indexleme sorunları fark edilmiyor',
        description: 'Hangi sayfaların indexlenmediği yalnızca GSC’de görünür.',
        icon: 'FolderX',
      },
      {
        title: 'Tarama hataları birikiyor',
        description: '404 ve sunucu hataları biriktiğinde site kalitesi düşer.',
        icon: 'Bug',
      },
      {
        title: 'Arama performansı ölçülemiyor',
        description: 'Hangi sorgudan ne kadar tıklama geldiği bilinmeden içerik planı yapılamaz.',
        icon: 'ChartNoAxesColumn',
      },
      {
        title: 'Güvenlik ve manuel işlem riski',
        description: 'Uyarılar takip edilmediğinde cezalar geç fark edilir.',
        icon: 'ShieldAlert',
      },
    ],
    scope: [
      'Alan adı mülkü ve URL öneki doğrulaması (DNS / meta / dosya)',
      'www – non-www ve HTTP – HTTPS varyant yönetimi',
      'XML sitemap üretimi, gönderimi ve izlenmesi',
      'robots.txt denetimi',
      'Indexleme kapsamı raporu analizi',
      'URL denetimi ve indexleme talepleri',
      'Yapısal veri ve zengin sonuç raporlarının takibi',
      'Core Web Vitals raporu izleme',
      'GA4 ve Search Console bağlantısı',
      'Sorgu ve sayfa bazlı performans analizi',
      'Ekip yetkilendirmesi ve erişim yönetimi',
      'Aylık arama performansı raporu',
    ],
    benefits: [
      {
        title: 'Erken uyarı',
        description: 'Indexleme ve güvenlik sorunları büyümeden tespit edilir.',
        metric: 'Günlük izleme',
        icon: 'BellRing',
      },
      {
        title: 'Veriye dayalı içerik planı',
        description: 'Gerçek sorgu verisi ile hangi içeriğin üretileceği netleşir.',
        metric: 'Sorgu bazlı',
        icon: 'FileSearch',
      },
      {
        title: 'Hızlı indexleme',
        description: 'Yeni sayfalar sitemap ve URL denetimi ile daha hızlı indexlenir.',
        metric: 'Günler içinde',
        icon: 'Zap',
      },
      {
        title: 'Ücretsiz güçlü veri',
        description: 'Google’ın kendi verisiyle performans ölçümü, ek maliyet yok.',
        metric: '0 ₺',
        icon: 'Gift',
      },
    ],
    targetAudience: [
      'Yeni yayınlanan siteler',
      'Organik trafiğini büyütmek isteyenler',
      'Site taşıma yapan işletmeler',
      'E-ticaret siteleri',
      'İçerik pazarlaması yapanlar',
      'Ajanslar ve çoklu site yönetenler',
    ],
    faq: [
      {
        question: 'Search Console ücretsiz mi?',
        answer:
          'Evet, Google’ın ücretsiz aracıdır. Maliyet yalnızca kurulum, yapılandırma ve sürekli analiz hizmeti için oluşur.',
      },
      {
        question: 'Doğrulamayı nasıl yapıyorsunuz?',
        answer:
          'Önceliğimiz DNS kaydı üzerinden alan adı mülkü doğrulamasıdır; böylece tüm alt alan adları ve protokoller tek mülkte izlenir. DNS erişimi yoksa HTML dosyası veya meta etiket yöntemlerini kullanıyoruz.',
      },
      {
        question: 'Sitemap’i kim üretiyor?',
        answer:
          'Next.js projelerinde sitemap.ts ile otomatik üretiyoruz. Farklı bir altyapı kullanıyorsanız mevcut sitemap’i denetleyip gerekli düzeltmeleri yapıyoruz.',
      },
      {
        question: 'GA4 ile birlikte mi çalışıyor?',
        answer:
          'Evet. İki hesabı birbirine bağlayarak arama sorguları ile site içi davranışı birlikte analiz ediyoruz.',
      },
      {
        question: 'Indexlenmeyen sayfalar için ne yapıyorsunuz?',
        answer:
          'Nedenini rapordan tespit ediyoruz: canonical, noindex, tarama derinliği, içerik kalitesi veya yönlendirme. Nedene göre düzeltme uygulayıp yeniden indexleme talep ediyoruz.',
      },
      {
        question: 'Raporlama yapıyor musunuz?',
        answer:
          'Evet. Aylık olarak gösterim, tıklama, ortalama konum, öne çıkan sorgular, index durumu ve teknik uyarıları içeren bir rapor paylaşıyoruz.',
      },
    ],
    relatedServices: [
      'teknik-seo',
      'seo-danismanligi',
      'schema-org-structured-data',
      'lokal-seo',
      'raporlama-sistemi',
      'domain-dns-yonetimi',
    ],
  },
  // 31
  {
    slug: 'seo-danismanligi',
    title: 'SEO Danışmanlığı',
    shortTitle: 'SEO Danışmanlığı',
    category: 'seo',
    primaryKeyword: 'SEO danışmanlığı',
    secondaryKeywords: [
      'SEO danışman hizmeti',
      'web sitesi danışmanlığı',
      'SEO stratejisi',
      'SEO uzmanı',
    ],
    icon: 'Lightbulb',
    imageQuery: 'seo consulting strategy',
    summary:
      'Anahtar kelime stratejisi, içerik planı ve teknik yol haritası ile sürdürülebilir büyüme danışmanlığı.',
    description:
      'SEO danışmanlığı, işletmenizin arama görünürlüğünü artırmak için strateji, önceliklendirme ve sürekli rehberlik sağlayan hizmettir. Tek seferlik bir denetim çoğu zaman yeterli olmaz; çünkü algoritma güncellemeleri, rakip hamleleri ve içerik ihtiyacı sürekli değişir. Tardigrad Software olarak danışmanlıkta önce mevcut durumu ölçüyor, ardından hedef sorgu kümelerini ve iş hedeflerini eşleştiriyoruz. Hangi sayfaların hangi sorgulara hizmet edeceği, hangi içeriklerin üretileceği, hangi teknik sorunların önce çözüleceği net bir yol haritasına dönüşür. Aylık çalışma temposunda performans takibi, içerik önerileri, teknik kontroller ve rakip analizi yer alır. Ekip içinde içerik üreten veya geliştirme yapan kişiler varsa onlara eğitim ve dokümantasyon sağlıyoruz; böylece bilgi şirket içinde kalır. Danışmanlık, yalnızca rapor göndermek değil, sonuç alana kadar birlikte çalışmaktır.',
    heroTagline: 'Rapor değil, sonuç: birlikte uygulanan SEO stratejisi.',
    whyNeeded: [
      {
        title: 'Öncelik belirlenemiyor',
        description: 'Onlarca sorun arasında hangisinin etki yaratacağı bilinmez.',
        icon: 'ListOrdered',
      },
      {
        title: 'İçerik rastgele üretiliyor',
        description: 'Anahtar kelime araştırması olmadan yazılan içerikler trafik getirmez.',
        icon: 'PenLine',
      },
      {
        title: 'Rakipler önde',
        description: 'Rakip stratejisi analiz edilmeden yapılan çalışma tekrar üretir.',
        icon: 'Swords',
      },
      {
        title: 'Ekip bilgisi eksik',
        description: 'SEO prensipleri bilinmeden yapılan değişiklikler kazanımları geri alır.',
        icon: 'GraduationCap',
      },
    ],
    scope: [
      'Mevcut durum analizi ve performans ölçümü',
      'Anahtar kelime araştırması ve sorgu kümesi planı',
      'Rakip analizi ve fırsat boşlukları',
      'Sayfa ve mimari eşleştirme (keyword mapping)',
      'İçerik takvimi ve konu kümesi (topic cluster) planı',
      'Teknik SEO yol haritası ve önceliklendirme',
      'On-page optimizasyon şablonları (başlık, meta, H etiketleri)',
      'İç link stratejisi',
      'Yerel SEO ve Google Business Profile rehberliği',
      'Aylık performans raporu ve yol haritası güncellemesi',
      'Ekip eğitimi ve dokümantasyon',
      'Algoritma güncellemelerinde hızlı değerlendirme',
    ],
    benefits: [
      {
        title: 'Net öncelikler',
        description: 'Etki yaratacak işler önce yapılır, kaynak israfı önlenir.',
        metric: 'Önceliklendirilmiş plan',
        icon: 'Target',
      },
      {
        title: 'Sürdürülebilir trafik',
        description: 'Reklama bağımlılık azalır, organik kanal büyür.',
        metric: '+50% organik',
        icon: 'Sprout',
      },
      {
        title: 'Şirket içinde bilgi',
        description: 'Ekip eğitimi ile SEO disiplini kalıcı hâle gelir.',
        metric: 'Eğitim dahil',
        icon: 'GraduationCap',
      },
      {
        title: 'Hızlı adaptasyon',
        description: 'Algoritma güncellemelerinde hızlı değerlendirme ve aksiyon.',
        metric: 'Aylık takip',
        icon: 'RefreshCcw',
      },
    ],
    targetAudience: [
      'İçerik ekibi olan işletmeler',
      'Büyüme hedefi olan KOBİ’ler',
      'E-ticaret firmaları',
      'Yeni pazarlara açılanlar',
      'Ajans ve yazılım şirketleri',
      'Kurumsal markalar',
    ],
    faq: [
      {
        question: 'SEO danışmanlığı ile SEO hizmeti arasındaki fark nedir?',
        answer:
          'Danışmanlıkta strateji, plan ve rehberlik sağlarız; uygulamanın bir kısmı sizin ekibiniz tarafından yapılabilir. Tam hizmette teknik düzeltmeleri, içerik üretimini ve uygulamayı da biz üstleniriz.',
      },
      {
        question: 'Ne kadar sürede sonuç alınır?',
        answer:
          'Teknik düzeltmelerin etkisi haftalar içinde, içerik stratejisinin etkisi 3-6 ay içinde belirginleşir. Rekabet seviyesi ve mevcut otorite süreyi etkiler.',
      },
      {
        question: 'İlk sırayı garanti ediyor musunuz?',
        answer:
          'Hayır. Sıralama garantisi veren yaklaşımlar etik dışıdır ve uzun vadede risklidir. Biz ölçülebilir ilerlemeyi, şeffaf raporlamayı ve sürdürülebilir yöntemleri garanti ediyoruz.',
      },
      {
        question: 'İçerikleri kim yazacak?',
        answer:
          'Model tercihinize bağlı. İçerik brief’lerini ve anahtar kelime hedeflerini biz hazırlıyoruz; yazımı sizin ekibiniz yapabilir ya da içerik üretimini biz üstlenebiliriz.',
      },
      {
        question: 'Hangi raporları alacağım?',
        answer:
          'Aylık performans raporu: sıralama değişimleri, organik trafik, sorgu kazanımları, teknik sağlık, yapılan işler ve sonraki ay planı.',
      },
      {
        question: 'Asgari çalışma süresi var mı?',
        answer:
          'Anlamlı sonuç için en az 3 aylık çalışma öneriyoruz. Sözleşmeler aylık olarak yenilenir; uzun vadeli taahhüt baskısı kurmuyoruz.',
      },
    ],
    relatedServices: [
      'teknik-seo',
      'lokal-seo',
      'seo-uyumlu-sayfa-mimarisi',
      'ai-icerik-araclar',
      'schema-org-structured-data',
      'google-search-console-kurulumu',
    ],
  },
  // 32
  {
    slug: 'dijital-otomasyon',
    title: 'Dijital Otomasyon',
    shortTitle: 'Dijital Otomasyon',
    category: 'otomasyon',
    primaryKeyword: 'dijital otomasyon',
    secondaryKeywords: [
      'iş süreç otomasyonu',
      'otomasyon yazılımı',
      'web otomasyon',
      'form otomasyonu',
    ],
    icon: 'Workflow',
    imageQuery: 'digital automation workflow',
    summary:
      'Tekrarlayan manuel işleri otomatikleştirin: ekip zamanını değer üreten işlere ayırın.',
    description:
      'Dijital otomasyon, işletmenizde tekrar eden manuel işlemlerin yazılım tarafından otomatik yapılmasıdır. Veri kopyalama, e-posta gönderme, durum güncelleme, rapor üretme, dosya adlandırma, onay isteme gibi işler; hem zaman kaybettirir hem hata üretir. Tardigrad Software olarak süreçlerinizi haritalayıp otomasyona uygun adımları belirliyoruz. Form doldurulduğunda kayıt oluşturulması, kaydın ilgili kişiye atanması, bildirim gönderilmesi, belge üretilmesi, verinin başka sisteme aktarılması ve raporlanması tek bir akışta birbirine bağlanır. Web tabanlı otomasyonlarda zamanlanmış görevler (cron), kuyruk sistemleri ve webhook’lar kullanıyoruz. Ekip “iş yetiştirme” yerine “iş geliştirme”ye odaklanır. Otomasyon bir kez kurulduğunda 7/24 çalışır; ölçek arttıkça ek personel ihtiyacı doğmadan kapasite yükselir. Süreç dokümantasyonu ve hata izleme de teslim kapsamında yer alır.',
    heroTagline: 'Tekrarlayan işler otomatik, ekibiniz değer üreten işlerde.',
    whyNeeded: [
      {
        title: 'Manuel veri girişi',
        description: 'Aynı bilgiyi birden çok sisteme girmek zaman kaybı ve hata kaynağıdır.',
        icon: 'Keyboard',
      },
      {
        title: 'Unutulan adımlar',
        description: 'İnsan hafızasına bırakılan süreçlerde atlanan adımlar müşteri memnuniyetini düşürür.',
        icon: 'BrainCog',
      },
      {
        title: 'Ölçekleme maliyeti',
        description: 'İş hacmi arttıkça daha fazla personel gerekir; otomasyon bu maliyeti azaltır.',
        icon: 'UsersRound',
      },
      {
        title: 'Görünürlük eksik',
        description: 'Süreç adımları loglanmadığında darboğazın nerede olduğu anlaşılmaz.',
        icon: 'EyeOff',
      },
    ],
    scope: [
      'Süreç haritalama ve otomasyon fırsatı analizi',
      'Tetikleyici tasarımı (form, zamanlayıcı, webhook, e-posta)',
      'Otomatik kayıt oluşturma ve veri senkronizasyonu',
      'Görev atama ve onay akışları',
      'Bildirim otomasyonları (e-posta, SMS, WhatsApp)',
      'Belge üretimi (teklif, sözleşme, rapor, fatura)',
      'Zamanlanmış görevler ve kuyruk yönetimi',
      'Üçüncü parti servis entegrasyonları',
      'Hata yakalama, yeniden deneme ve uyarı mekanizmaları',
      'Süreç logları ve performans izleme',
      'Süreç dokümantasyonu ve ekip eğitimi',
      'Kademeli devreye alma ve geri alma planı',
    ],
    benefits: [
      {
        title: 'Ciddi zaman tasarrufu',
        description: 'Tekrarlayan işler otomatikleşir, ekip değerli işlere odaklanır.',
        metric: 'Ayda 40+ saat',
        icon: 'Hourglass',
      },
      {
        title: 'Daha az hata',
        description: 'İnsan kaynaklı veri giriş hataları ortadan kalkar.',
        metric: '-85% hata',
        icon: 'CircleCheck',
      },
      {
        title: 'Ölçeklenebilirlik',
        description: 'İş hacmi artsa da ek personel ihtiyacı doğmaz.',
        metric: '7/24 çalışır',
        icon: 'Infinity',
      },
      {
        title: 'Süreç görünürlüğü',
        description: 'Her adım loglanır; darboğazlar veriyle tespit edilir.',
        metric: 'Tam izlenebilirlik',
        icon: 'Activity',
      },
    ],
    targetAudience: [
      'Operasyon ağırlıklı işletmeler',
      'E-ticaret firmaları',
      'Lojistik şirketleri',
      'Muhasebe ve mali müşavirlik ofisleri',
      'İnsan kaynakları birimleri',
      'Üretim firmaları',
      'Ajanslar',
      'Çok şubeli işletmeler',
    ],
    faq: [
      {
        question: 'Hangi süreçler otomasyona uygundur?',
        answer:
          'Tekrar eden, kuralları tanımlı ve veri hareketi içeren her süreç: lead aktarımı, sipariş onayı, fatura üretimi, rapor gönderimi, bildirimler, yedekleme, başvuru değerlendirme.',
      },
      {
        question: 'Mevcut yazılımlarımızla çalışır mı?',
        answer:
          'Evet. API’si olan tüm sistemlerle entegre oluyoruz. API yoksa veritabanı bağlantısı, dosya aktarımı veya arayüz otomasyonu gibi alternatif yaklaşımlar kullanıyoruz.',
      },
      {
        question: 'Otomasyon hatalı çalışırsa ne olur?',
        answer:
          'Her akışta hata yakalama, yeniden deneme ve bildirim mekanizması kuruyoruz. Başarısız işlemler kuyrukta tutulur ve manuel müdahale edilebilir.',
      },
      {
        question: 'Tüm süreci bir anda mı otomatikleştiriyoruz?',
        answer:
          'Hayır. Kademeli yaklaşımı öneriyoruz: en çok zaman kaybettiren adımla başlayıp doğruladıktan sonra genişletiyoruz. Bu, risk ve değişim yönetimini kolaylaştırır.',
      },
      {
        question: 'Personel işini kaybeder mi?',
        answer:
          'Amaç insanı çıkarmak değil, insanı rutin işten kurtarmaktır. Ekip daha nitelikli işlere yönlendirilir; kapasite artışı genellikle büyüme için kullanılır.',
      },
      {
        question: 'Otomasyon projesi ne kadar sürer?',
        answer:
          'Tek bir akış 1-2 hafta, birden çok sistemi bağlayan kapsamlı otomasyon 4-8 hafta sürebilir.',
      },
    ],
    relatedServices: [
      'api-entegrasyonu',
      'dijital-donusum',
      'form-basvuru-sistemi',
      'raporlama-sistemi',
      'odeme-whatsapp-crm-entegrasyonu',
      'is-takip-sistemi',
    ],
    localPriority: true,
  },
  // 33
  {
    slug: 'domain-dns-yonetimi',
    title: 'Domain ve DNS Yönetimi',
    shortTitle: 'Domain / DNS',
    category: 'altyapi',
    primaryKeyword: 'DNS yönetimi',
    secondaryKeywords: [
      'domain yönetimi',
      'domain yönlendirme',
      'DNS ayarları',
      'alan adı yönetimi',
    ],
    icon: 'Globe',
    imageQuery: 'dns domain management',
    summary:
      'Alan adı, DNS kayıtları, yönlendirmeler ve e-posta yapılandırmasını güvenli şekilde yönetiyoruz.',
    description:
      'Domain ve DNS yönetimi, dijital varlıklarınızın adres katmanıdır. Yanlış yapılandırılmış bir DNS kaydı; sitenizin açılmamasına, e-postalarınızın ulaşmamasına veya güvenlik açıklarına yol açabilir. Tardigrad Software olarak alan adı kayıtlarınızı, DNS zone yapılandırmanızı, alt alan adlarınızı, yönlendirme kurallarınızı ve e-posta kayıtlarınızı (MX, SPF, DKIM, DMARC) profesyonel biçimde yönetiyoruz. www ve non-www varyantları arasında kalıcı yönlendirme, HTTP’den HTTPS’e geçiş, çok dilli sitelerde alt alan adı stratejisi ve CDN entegrasyonu bu kapsamdadır. Alan adı yenileme takibi, transfer süreçleri ve WHOIS gizliliği gibi operasyonel konuları da üstleniyoruz; alan adınızın süresi dolup başkası tarafından alınması riskini ortadan kaldırıyoruz. Ayrıca DNSSEC ve doğru TTL politikaları ile hem güvenlik hem performans sağlıyoruz. Tüm kayıtlar dokümante edilir, değişiklikler loglanır.',
    heroTagline: 'Alan adınız ve DNS kayıtlarınız güvenli ellerde.',
    whyNeeded: [
      {
        title: 'Site erişilemez hâle geliyor',
        description: 'Hatalı A veya CNAME kaydı tüm yayını durdurabilir.',
        icon: 'PlugZap',
      },
      {
        title: 'E-postalar spam’e düşüyor',
        description: 'SPF, DKIM ve DMARC eksikse kurumsal e-postalar ulaşmaz.',
        icon: 'MailWarning',
      },
      {
        title: 'Alan adı yenileme kaçıyor',
        description: 'Süresi dolan domain başkası tarafından alınabilir; marka kaybı yaşanır.',
        icon: 'AlarmClock',
      },
      {
        title: 'Kayıtlar dağınık',
        description: 'Kimin neyi değiştirdiği bilinmeyen DNS zone’lar risklidir.',
        icon: 'ScrollText',
      },
    ],
    scope: [
      'Alan adı kayıt, transfer ve yenileme yönetimi',
      'DNS zone yapılandırması (A, AAAA, CNAME, MX, TXT, SRV)',
      'SPF, DKIM ve DMARC kayıtları ile e-posta güvenilirliği',
      'www / non-www ve HTTP / HTTPS yönlendirmeleri',
      'Alt alan adı stratejisi (blog, panel, api, mağaza)',
      'CDN ve Cloudflare DNS entegrasyonu',
      'DNSSEC ve güvenlik kayıtları',
      'TTL politikaları ve geçiş planlaması',
      'Çok dilli sitelerde dil bazlı yönlendirme',
      'Erişim kontrolü: kayıt sağlayıcı ve DNS panel yetkileri',
      'Değişiklik logları ve DNS dokümantasyonu',
      'Kesinti durumları için kurtarma planı',
    ],
    benefits: [
      {
        title: 'Kesintisiz erişim',
        description: 'Doğru yapılandırılmış kayıtlar ile yayın sürekliliği sağlanır.',
        metric: '%99.9 erişilebilirlik',
        icon: 'Server',
      },
      {
        title: 'Güvenilir e-posta',
        description: 'SPF/DKIM/DMARC ile mesajlarınız inbox’a ulaşır.',
        metric: '-90% spam riski',
        icon: 'MailCheck',
      },
      {
        title: 'Marka koruması',
        description: 'Yenileme takibi ve transfer kontrolü ile alan adı kaybı yaşanmaz.',
        metric: 'Otomatik takip',
        icon: 'Shield',
      },
      {
        title: 'Hızlı geçişler',
        description: 'Doğru TTL planlaması ile taşıma işlemleri dakikalar içinde tamamlanır.',
        metric: 'Dakikalar içinde',
        icon: 'Zap',
      },
    ],
    targetAudience: [
      'Tüm işletmeler',
      'Çok alt alan adı kullanan firmalar',
      'Kurumsal e-posta kullanan şirketler',
      'Site taşıma yapanlar',
      'Ajanslar ve çoklu site yönetenler',
      'Startup’lar',
    ],
    faq: [
      {
        question: 'Alan adımı başka bir firmaya taşıyabilir miyim?',
        answer:
          'Evet. Transfer kodunu alıp taşıma sürecini yönetiyoruz. Taşıma sırasında yayında kesinti olmaması için DNS geçişini önceden planlıyoruz.',
      },
      {
        question: 'E-postalarımız spam’e düşüyor, çözer misiniz?',
        answer:
          'Genellikle SPF, DKIM ve DMARC kayıtlarının eksik veya hatalı olmasından kaynaklanır. Kayıtları düzenleyip gönderim itibarını iyileştiriyoruz.',
      },
      {
        question: 'DNS değişiklikleri ne kadar sürede yayılır?',
        answer:
          'TTL değerine bağlı olarak dakikalar içinde; global yayılım için 24-48 saat öngörülür. Kritik geçişlerde TTL’i önceden düşürerek süreyi kısaltıyoruz.',
      },
      {
        question: 'Cloudflare kullanmak zorunda mıyım?',
        answer:
          'Hayır, ancak CDN, önbellek, güvenlik duvarı ve DDoS koruması sağladığı için öneriyoruz. Mevcut sağlayıcınızla da çalışabiliriz.',
      },
      {
        question: 'Alan adı yenilemelerini takip ediyor musunuz?',
        answer:
          'Evet. Yenileme tarihlerini takip ediyor, otomatik yenileme ayarlarını kontrol ediyor ve süresi yaklaşan kayıtlar için sizi bilgilendiriyoruz.',
      },
      {
        question: 'Birden çok alan adını yönetebilir misiniz?',
        answer:
          'Evet. Ana domain, yönlendirilen domainler, kampanya alan adları ve alt alan adlarını tek bir doküman ve erişim politikası altında yönetiyoruz.',
      },
    ],
    relatedServices: [
      'hosting-yedekleme',
      'cloudflare-cdn',
      'vercel-deployment',
      'kurumsal-email',
      'supabase-postgresql',
      'teknik-seo',
    ],
  },
  // 34
  {
    slug: 'hosting-yedekleme',
    title: 'Hosting ve Yedekleme Yönetimi',
    shortTitle: 'Hosting & Yedekleme',
    category: 'altyapi',
    primaryKeyword: 'web hosting',
    secondaryKeywords: [
      'hosting yönetimi',
      'web sitesi yedekleme',
      'hosting kurulumu',
      'site taşıma',
    ],
    icon: 'Server',
    imageQuery: 'web hosting server',
    summary:
      'Güvenli hosting kurulumu, otomatik yedekleme, izleme ve kesintisiz site taşıma hizmeti.',
    description:
      'Hosting ve yedekleme yönetimi, sitenizin ve verilerinizin barındırıldığı altyapının doğru kurulması ve sürekli korunmasıdır. Ucuz ama yetersiz bir hosting paketi; yavaş açılan sayfalar, sık kesintiler ve güvenlik açıkları demektir. Yedekleme yapılmayan bir sistemde ise tek bir hata tüm veriyi kaybettirebilir. Tardigrad Software olarak projenize uygun barındırma modelini seçiyoruz: serverless platformlar (Vercel), yönetilen bulut sunucular veya Supabase gibi BaaS çözümleri. SSL sertifikaları, otomatik yedekleme politikaları (günlük/hourly), geri yükleme testleri, izleme ve uyarı sistemleri kurulumun parçasıdır. Mevcut bir siteniz varsa kesintisiz taşıma yapıyoruz: dosyalar, veritabanı, e-postalar ve DNS kayıtları planlı biçimde aktarılır, yönlendirmeler korunur. Taşıma sonrası performans ve erişilebilirlik testleri ile her şeyin çalıştığı doğrulanır.',
    heroTagline: 'Hızlı, güvenli ve her zaman yedeği olan bir altyapı.',
    whyNeeded: [
      {
        title: 'Site yavaş veya kesintili',
        description: 'Yetersiz hosting kaynakları hız ve erişilebilirlik kaybı yaratır.',
        icon: 'Snail',
      },
      {
        title: 'Yedek yok',
        description: 'Veri kaybı, hack veya hatalı güncelleme sonrası geri dönüş imkânsız hâle gelir.',
        icon: 'HardDriveDownload',
      },
      {
        title: 'SSL ve güvenlik eksik',
        description: 'Sertifika yenilenmeyen siteler tarayıcı uyarısı verir, güven kaybolur.',
        icon: 'ShieldOff',
      },
      {
        title: 'Taşıma riski',
        description: 'Plansız taşımalarda veri kaybı ve SEO görünürlüğü kaybı yaşanır.',
        icon: 'Truck',
      },
    ],
    scope: [
      'İhtiyaca uygun hosting / platform seçimi ve kurulumu',
      'Ortam ayrımı: geliştirme, test, üretim',
      'SSL sertifikası kurulumu ve otomatik yenileme',
      'Otomatik yedekleme politikası (dosya + veritabanı)',
      'Geri yükleme prosedürü ve periyodik test',
      'Kesintisiz site taşıma (dosya, veritabanı, e-posta, DNS)',
      'Sunucu / platform izleme ve kesinti uyarıları',
      'Performans ayarları: önbellek, sıkıştırma, CDN',
      'Güvenlik sertleştirme: erişim kısıtları, güvenlik duvarı',
      'Maliyet optimizasyonu ve kaynak planlaması',
      'Felaket kurtarma planı dokümantasyonu',
      'Aylık altyapı sağlık raporu',
    ],
    benefits: [
      {
        title: 'Yüksek erişilebilirlik',
        description: 'İzleme ve otomatik müdahale ile kesintiler minimize edilir.',
        metric: '%99.9 uptime',
        icon: 'Activity',
      },
      {
        title: 'Veri güvencesi',
        description: 'Test edilmiş yedekleme ile veri kaybı riski ortadan kalkar.',
        metric: 'Günlük yedek',
        icon: 'DatabaseBackup',
      },
      {
        title: 'Hızlı sayfalar',
        description: 'Doğru platform, önbellek ve CDN ile açılış süreleri düşer.',
        metric: '%50 daha hızlı',
        icon: 'Gauge',
      },
      {
        title: 'Öngörülebilir maliyet',
        description: 'Kaynak planlaması ile sürpriz faturalar oluşmaz.',
        metric: 'Sabit bütçe',
        icon: 'Receipt',
      },
    ],
    targetAudience: [
      'Tüm web sitesi sahipleri',
      'E-ticaret işletmeleri',
      'Veri kaybı riski taşıyan firmalar',
      'Site taşıma planlayanlar',
      'Yüksek trafik alan projeler',
      'Kurumsal e-posta kullanan şirketler',
    ],
    faq: [
      {
        question: 'Hangi hosting platformlarını kullanıyorsunuz?',
        answer:
          'Next.js projelerinde Vercel, veritabanı ve auth tarafında Supabase, CDN ve güvenlik için Cloudflare öncelikli tercihlerimiz. Mevcut sağlayıcınızla çalışmak gerekiyorsa onu da yönetebiliriz.',
      },
      {
        question: 'Yedekler nerede saklanıyor?',
        answer:
          'Ayrı bir depolama alanında, tercihen farklı bir bölgede saklanır. Yedeklere erişim yetkilendirilir ve geri yükleme prosedürü düzenli olarak test edilir.',
      },
      {
        question: 'Site taşıma sırasında kesinti olur mu?',
        answer:
          'Planlı taşımalarda kesinti dakikalar düzeyindedir. Yeni ortamı hazır edip DNS geçişini düşük TTL ile yapıyor, eski ortamı güvenlik için bir süre daha çalışır durumda tutuyoruz.',
      },
      {
        question: 'Mevcut sitem hacklendi, yardımcı olur musunuz?',
        answer:
          'Evet. Temizlik, zararlı dosya tespiti, erişim sıfırlama, güvenlik sertleştirme ve yedekten geri yükleme süreçlerini yönetiyoruz.',
      },
      {
        question: 'Hosting maliyeti ne kadar?',
        answer:
          'Trafik, depolama ve platform seçimine göre değişir. Küçük kurumsal siteler için aylık maliyet düşüktür; teklif aşamasında net rakamları paylaşıyoruz.',
      },
      {
        question: 'İzleme ve uyarı sistemi kuruyor musunuz?',
        answer:
          'Evet. Kesinti, yavaşlama ve hata oranı artışlarında otomatik bildirim alıyorsunuz; kritik durumlarda biz de müdahale ediyoruz.',
      },
    ],
    relatedServices: [
      'domain-dns-yonetimi',
      'cloudflare-cdn',
      'vercel-deployment',
      'supabase-postgresql',
      'kurumsal-email',
      'web-sitesi-yenileme',
    ],
  },
  // 35
  {
    slug: 'cloudflare-cdn',
    title: 'Cloudflare ve CDN Yapılandırması',
    shortTitle: 'Cloudflare / CDN',
    category: 'altyapi',
    primaryKeyword: 'Cloudflare',
    secondaryKeywords: [
      'Cloudflare kurulumu',
      'CDN yapılandırma',
      'site hızlandırma',
      'güvenlik duvarı',
    ],
    icon: 'ShieldHalf',
    imageQuery: 'cloudflare cdn network',
    summary:
      'CDN, önbellek, güvenlik duvarı ve DDoS koruması ile sitenizi hızlandırıp koruyoruz.',
    description:
      'Cloudflare ve CDN yapılandırması, sitenizin içeriğini kullanıcılara en yakın noktadan sunarak hız kazandıran, aynı zamanda güvenlik katmanı ekleyen altyapı çalışmasıdır. Statik varlıkların önbelleğe alınması, görsel optimizasyonu, TLS yönetimi, bot koruması ve DDoS filtreleme tek bir katmanda toplanır. Tardigrad Software olarak Cloudflare kurulumunda doğru önbellek kurallarını yazıyoruz: hangi varlıklar ne kadar süre saklanacak, hangi sayfalar önbelleğe alınmayacak, dinamik içerik nasıl yönetilecek. Sayfa kuralları, dönüşüm kuralları (transform rules), güvenlik seviyeleri ve hızlandırma ayarları (Brotli, HTTP/3, Early Hints) projenize göre yapılandırılır. Yanlış CDN ayarları; formların çalışmaması, oturum kayıpları veya eski içeriğin görünmesi gibi sorunlara yol açar — bu yüzden kurulum sonrası uçtan uca test yapıyoruz. Sonuç: global ölçekte düşük gecikme, daha az sunucu yükü ve daha güçlü güvenlik.',
    heroTagline: 'Daha hızlı açılış, daha az sunucu yükü, daha güçlü koruma.',
    whyNeeded: [
      {
        title: 'Uzak kullanıcılar yavaş erişiyor',
        description: 'Tek bölgeden sunum yapıldığında gecikme artar, hemen çıkma yükselir.',
        icon: 'Globe',
      },
      {
        title: 'Sunucu yükü yüksek',
        description: 'Statik içerik her istekte yeniden üretilirse kaynak israfı olur.',
        icon: 'Cpu',
      },
      {
        title: 'Bot ve saldırı trafiği',
        description: 'Kötü niyetli istekler hem performansı hem güvenliği tehdit eder.',
        icon: 'BugPlay',
      },
      {
        title: 'Hız skorları düşük',
        description: 'CDN olmayan sitelerde LCP ve TTFB değerleri olumsuz etkilenir.',
        icon: 'Gauge',
      },
    ],
    scope: [
      'Cloudflare hesap kurulumu ve DNS devri',
      'Önbellek kuralları (Cache Rules) ve TTL stratejisi',
      'Statik varlık optimizasyonu: Brotli, HTTP/3, Early Hints',
      'Görsel optimizasyonu ve WebP/AVIF dönüşümü',
      'SSL/TLS modu ve sertifika yönetimi',
      'Güvenlik duvarı kuralları (WAF) ve bot yönetimi',
      'DDoS koruması ve hız sınırlama (rate limiting)',
      'Sayfa kuralları ve yönlendirme (redirect) kuralları',
      'Formlar, oturumlar ve dinamik içerik için istisna yapılandırması',
      'Origin server koruması (gerçek IP gizleme)',
      'Analitik izleme: trafik, önbellek isabet oranı, tehditler',
      'Kurulum sonrası uçtan uca test ve dokümantasyon',
    ],
    benefits: [
      {
        title: 'Global hız',
        description: 'İçerik kullanıcıya en yakın veri merkezinden sunulur.',
        metric: '-45% TTFB',
        icon: 'Zap',
      },
      {
        title: 'Düşük sunucu maliyeti',
        description: 'Önbellek isabeti sayesinde origin yükü azalır.',
        metric: '%70 önbellek isabeti',
        icon: 'PiggyBank',
      },
      {
        title: 'Güçlü koruma',
        description: 'WAF, bot yönetimi ve DDoS filtreleme tek katmanda.',
        metric: 'Otomatik savunma',
        icon: 'Shield',
      },
      {
        title: 'İyileşen Core Web Vitals',
        description: 'Hız skorları yükselir, SEO performansı desteklenir.',
        metric: 'LCP < 2.5s',
        icon: 'TrendingUp',
      },
    ],
    targetAudience: [
      'Yüksek trafikli siteler',
      'E-ticaret platformları',
      'Global kullanıcıya hizmet verenler',
      'Saldırı riski taşıyan projeler',
      'Medya ve içerik siteleri',
      'SaaS ürünleri',
    ],
    faq: [
      {
        question: 'Cloudflare ücretsiz planı yeterli mi?',
        answer:
          'Küçük ve orta ölçekli siteler için ücretsiz plan çoğu ihtiyacı karşılar. Gelişmiş WAF kuralları, görsel optimizasyonu ve ayrıntılı analitik için ücretli plan gerekir; ihtiyaca göre öneride bulunuyoruz.',
      },
      {
        question: 'Sitem Cloudflare’e geçince kesinti olur mu?',
        answer:
          'DNS devri sırasında kısa bir yayılma süresi olur; planlı geçişte kesinti yaşanmaz. TTL değerlerini önceden düşürerek süreci hızlandırıyoruz.',
      },
      {
        question: 'Önbellek yüzünden eski içerik görünür mü?',
        answer:
          'Doğru kurallarla hayır. Dinamik sayfaları önbellek dışında tutuyor, içerik güncellemelerinde otomatik purge mekanizması kuruyoruz.',
      },
      {
        question: 'Formlar ve giriş sayfaları etkilenir mi?',
        answer:
          'Etkilenmemesi için istisna kuralları yazıyoruz. Kurulum sonrası tüm kritik akışları (form, sepet, giriş) test ediyoruz.',
      },
      {
        question: 'DDoS saldırısında ne olur?',
        answer:
          'Cloudflare saldırı trafiğini kenar noktalarında filtreler; origin sunucunuz korunur. Gerekirse güvenlik seviyesini geçici olarak yükseltiyoruz.',
      },
      {
        question: 'Mevcut CDN’imizi değiştirmeli miyiz?',
        answer:
          'Mevcut çözüm performans ve maliyet açısından iyiyse değiştirmek şart değildir. Analiz yapıp karşılaştırmalı bir öneri sunuyoruz.',
      },
    ],
    relatedServices: [
      'hosting-yedekleme',
      'domain-dns-yonetimi',
      'vercel-deployment',
      'teknik-seo',
      'supabase-postgresql',
      'api-entegrasyonu',
    ],
  },
  // 36
  {
    slug: 'vercel-deployment',
    title: 'Vercel Deployment',
    shortTitle: 'Vercel',
    category: 'altyapi',
    primaryKeyword: 'Vercel',
    secondaryKeywords: [
      'Vercel deployment',
      'Vercel kurulumu',
      'Next.js Vercel',
      'Vercel hosting',
    ],
    icon: 'Triangle',
    imageQuery: 'vercel deployment nextjs',
    summary:
      'Next.js projeleriniz için CI/CD, önizleme ortamları ve global edge dağıtım kurulumu.',
    description:
      'Vercel deployment, Next.js projelerinin global ölçekte hızlı ve otomatik biçimde yayınlanmasını sağlayan dağıtım sürecidir. Git deposuna gelen her commit için otomatik derleme, önizleme ortamı (preview deployment) ve üretim yayını; hata riskini azaltır, yayın süresini dakikalara indirir. Tardigrad Software olarak Vercel kurulumunda ortam değişkenleri yönetimi, alan adı ve SSL yapılandırması, yönlendirme ve yeniden yazma kuralları, edge fonksiyonlar, ISR (Incremental Static Regeneration) stratejisi ve analiz izlemesini yapılandırıyoruz. Preview ortamları sayesinde tasarım ve içerik değişiklikleri yayına alınmadan önce gerçek bağlantıyla test edilir; pazarlama ekibi de onay verebilir. Dağıtım sonrası Core Web Vitals izleme, hata logları ve hız analitiği ile performansı sürekli takip ediyoruz. Mevcut bir altyapınız varsa Vercel’e kesintisiz taşıma yapıyoruz.',
    heroTagline: 'Her commit otomatik yayında: hızlı, güvenli, global dağıtım.',
    whyNeeded: [
      {
        title: 'Manuel yayın süreci',
        description: 'FTP ile dosya yüklemek hem yavaş hem hataya açıktır.',
        icon: 'CloudUpload',
      },
      {
        title: 'Test edilemeyen değişiklikler',
        description: 'Önizleme ortamı yoksa hatalar üretimde fark edilir.',
        icon: 'EyeOff',
      },
      {
        title: 'Yavaş global erişim',
        description: 'Tek bölgeden sunum uzak kullanıcılar için gecikme yaratır.',
        icon: 'Globe',
      },
      {
        title: 'Ortam değişkeni karmaşası',
        description: 'Yanlış yapılandırma yayında beklenmedik hatalara yol açar.',
        icon: 'KeyRound',
      },
    ],
    scope: [
      'Vercel hesap ve proje kurulumu',
      'Git deposu entegrasyonu ve otomatik CI/CD',
      'Ortam değişkenleri yönetimi (geliştirme / önizleme / üretim)',
      'Önizleme dağıtımları ve ekip onay akışı',
      'Alan adı bağlama ve otomatik SSL',
      'Redirect, rewrite ve header kuralları (next.config)',
      'ISR ve önbellekleme stratejisi',
      'Edge fonksiyon ve middleware yapılandırması',
      'Vercel Analytics ve Speed Insights kurulumu',
      'Hata izleme ve log yönetimi',
      'Mevcut altyapıdan kesintisiz taşıma',
      'Maliyet ve kullanım izleme',
    ],
    benefits: [
      {
        title: 'Dakikalar içinde yayın',
        description: 'Otomatik derleme ve dağıtım ile bekleme süresi ortadan kalkar.',
        metric: '5 dakikada yayın',
        icon: 'Rocket',
      },
      {
        title: 'Güvenli önizleme',
        description: 'Her değişiklik üretimden önce gerçek ortamda test edilir.',
        metric: '0 sürpriz hata',
        icon: 'FlaskConical',
      },
      {
        title: 'Global performans',
        description: 'Edge ağı sayesinde dünyanın her yerinden hızlı erişim.',
        metric: 'Düşük gecikme',
        icon: 'Globe',
      },
      {
        title: 'Ölçeklenebilirlik',
        description: 'Trafik arttığında altyapı otomatik olarak genişler.',
        metric: 'Otomatik ölçek',
        icon: 'TrendingUp',
      },
    ],
    targetAudience: [
      'Next.js kullanan projeler',
      'Startup ve MVP ürünleri',
      'Kurumsal web siteleri',
      'E-ticaret platformları',
      'Ajanslar ve çoklu site yönetenler',
      'SaaS ürünleri',
    ],
    faq: [
      {
        question: 'Vercel ücretli mi?',
        answer:
          'Hobi planı ücretsizdir; ticari projeler için Pro plan gerekir. Trafik ve fonksiyon kullanımına göre maliyet değişir; kurulum öncesinde tahmini aylık maliyeti paylaşıyoruz.',
      },
      {
        question: 'Next.js dışında projeler de yayınlanabilir mi?',
        answer:
          'Evet. Statik siteler, React, Vue, Svelte gibi ön yüz projeleri ve API fonksiyonları da yayınlanabilir. Ancak Vercel’in en güçlü olduğu senaryo Next.js’tir.',
      },
      {
        question: 'Mevcut sitemi Vercel’e taşıyabilir miyiz?',
        answer:
          'Evet. Statik veya Next.js tabanlı projeleri taşıyoruz. Farklı bir teknoloji kullanıyorsanız önce modern bir altyapıya geçiş planı çıkarıyoruz.',
      },
      {
        question: 'Alan adımızı Vercel’e taşımak zorunda mıyız?',
        answer:
          'Hayır. Alan adınız mevcut sağlayıcıda kalabilir; DNS kayıtlarını Vercel’e yönlendirerek kullanabilirsiniz.',
      },
      {
        question: 'Ekip üyeleri nasıl yayın yapacak?',
        answer:
          'Git deposuna erişimi olan herkes branch açarak önizleme ortamı oluşturabilir; üretim yayını onay akışına bağlanabilir.',
      },
      {
        question: 'Yayında sorun çıkarsa geri alabilir miyiz?',
        answer:
          'Evet. Vercel’de önceki dağıtımlar saklanır; tek tıkla bir önceki sürüme dönülebilir.',
      },
    ],
    relatedServices: [
      'cloudflare-cdn',
      'hosting-yedekleme',
      'domain-dns-yonetimi',
      'supabase-postgresql',
      'kurumsal-web-sitesi',
      'teknik-seo',
    ],
  },
  // 37
  {
    slug: 'supabase-postgresql',
    title: 'Supabase ve PostgreSQL Altyapısı',
    shortTitle: 'Supabase / PostgreSQL',
    category: 'altyapi',
    primaryKeyword: 'Supabase',
    secondaryKeywords: [
      'Supabase kurulumu',
      'PostgreSQL veritabanı',
      'Supabase auth',
      'backend yapılandırma',
    ],
    icon: 'Database',
    imageQuery: 'supabase database backend',
    summary:
      'Veritabanı tasarımı, kimlik doğrulama, RLS güvenlik politikaları ve API katmanı kurulumu.',
    description:
      'Supabase ve PostgreSQL altyapısı, uygulamanızın veri katmanını açık kaynak ve ölçeklenebilir bir temel üzerine kurar. Doğru tasarlanmış bir veritabanı şeması; performans, güvenlik ve gelecekteki değişiklikler açısından belirleyicidir. Tardigrad Software olarak veri modeli tasarımı, tablo ve ilişki yapısı, indeksleme stratejisi, Row Level Security (RLS) politikaları, kimlik doğrulama akışları (e-posta, telefon, sosyal giriş), depolama (storage) yapılandırması ve gerçek zamanlı abonelikler kuruyoruz. PostgreSQL’in güçlü özelliklerini (view, function, trigger, JSONB) uygulamanızın ihtiyaçlarına göre kullanıyor; iş kurallarını veritabanı seviyesinde garanti altına alıyoruz. Edge fonksiyonlar ve API katmanı ile ön yüzün ihtiyaç duyduğu uç noktaları sağlıyoruz. Yedekleme, izleme, bağlantı havuzu yönetimi ve maliyet optimizasyonu da kapsam dahilindedir. Mevcut bir veritabanınız varsa Supabase’e taşıma ve şema dönüşümü yapıyoruz.',
    heroTagline: 'Güçlü, güvenli ve ölçeklenebilir veri katmanı.',
    whyNeeded: [
      {
        title: 'Veri modeli sonradan değişiyor',
        description: 'Kötü tasarlanmış şemalarda her yeni özellik maliyetli refactor gerektirir.',
        icon: 'Shapes',
      },
      {
        title: 'Güvenlik politikaları eksik',
        description: 'Yetkisiz erişim riski veri ihlali ve yasal yaptırım anlamına gelir.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Performans sorunları',
        description: 'İndeks ve sorgu optimizasyonu olmayan tablolar büyüdükçe yavaşlar.',
        icon: 'Gauge',
      },
      {
        title: 'Auth yeniden yazılıyor',
        description: 'Kimlik doğrulamayı sıfırdan geliştirmek zaman ve güvenlik riski yaratır.',
        icon: 'KeyRound',
      },
    ],
    scope: [
      'Veri modeli tasarımı ve şema dokümantasyonu',
      'Tablo, ilişki ve kısıt (constraint) tanımları',
      'İndeksleme ve sorgu performans optimizasyonu',
      'Row Level Security (RLS) politikaları',
      'Kimlik doğrulama: e-posta, telefon, OAuth, magic link',
      'Depolama (storage) ve dosya erişim politikaları',
      'Gerçek zamanlı abonelikler (realtime)',
      'Database function, trigger ve view tasarımları',
      'Edge fonksiyonlar ve API uç noktaları',
      'Yedekleme, PITR ve geri yükleme prosedürü',
      'Ortam ayrımı (geliştirme / üretim) ve migration yönetimi',
      'Bağlantı havuzu, maliyet ve kullanım izleme',
      'Mevcut veritabanından taşıma ve dönüşüm',
    ],
    benefits: [
      {
        title: 'Veritabanı seviyesinde güvenlik',
        description: 'RLS ile her satır yetkiye göre korunur.',
        metric: '0 yetkisiz erişim',
        icon: 'Lock',
      },
      {
        title: 'Hızlı geliştirme',
        description: 'Hazır auth, storage ve API katmanı ile haftalar kazanılır.',
        metric: '-50% backend süresi',
        icon: 'Zap',
      },
      {
        title: 'Ölçeklenebilir performans',
        description: 'PostgreSQL gücü ve doğru indeksleme ile büyüyen veriye dayanır.',
        metric: 'Milyonlarca satır',
        icon: 'TrendingUp',
      },
      {
        title: 'Açık kaynak özgürlüğü',
        description: 'Sağlayıcı kilitlenmesi olmadan PostgreSQL üzerine taşınabilir.',
        metric: 'Vendor lock-in yok',
        icon: 'LockOpen',
      },
    ],
    targetAudience: [
      'SaaS ürünleri',
      'Web ve mobil uygulamalar',
      'Startup MVP projeleri',
      'Kurumsal iç sistemler',
      'E-ticaret platformları',
      'Veri ağırlıklı uygulamalar',
    ],
    faq: [
      {
        question: 'Supabase nedir, neden tercih ediyorsunuz?',
        answer:
          'Supabase, PostgreSQL üzerine kurulu açık kaynak bir backend platformudur; veritabanı, kimlik doğrulama, depolama ve gerçek zamanlı özellikleri hazır sunar. Firebase’e göre ilişkisel veri modeli ve SQL gücü avantaj sağlar.',
      },
      {
        question: 'RLS nedir ve neden gerekli?',
        answer:
          'Row Level Security, veritabanı satırı bazında erişim politikası tanımlar. Uygulama katmanında hata olsa bile yetkisiz veri erişimi engellenir; multi-tenant sistemlerde kritik öneme sahiptir.',
      },
      {
        question: 'Mevcut veritabanımızı taşıyabilir miyiz?',
        answer:
          'Evet. MySQL veya başka bir PostgreSQL kurulumundan veri ve şema taşıması yapıyor, gerekli dönüşümleri uyguluyoruz.',
      },
      {
        question: 'Veriler hangi bölgede saklanıyor?',
        answer:
          'Proje oluşturulurken bölge seçilir; Avrupa (ör. Frankfurt) bölgesi KVKK açısından sık tercih edilir. İhtiyacınıza göre uygun bölgeyi birlikte belirliyoruz.',
      },
      {
        question: 'Supabase maliyeti nedir?',
        answer:
          'Ücretsiz katman küçük projeler için yeterlidir; büyüyen projelerde kullanım bazlı ücretlendirme vardır. Kurulum öncesi tahmini aylık maliyeti paylaşıyor, gereksiz kullanımı optimize ediyoruz.',
      },
      {
        question: 'Mobil uygulama da bağlanabilir mi?',
        answer:
          'Evet. Supabase istemci kütüphaneleri web, React Native ve Flutter ile çalışır; aynı backend’i mobil uygulamanız da kullanabilir.',
      },
    ],
    relatedServices: [
      'vercel-deployment',
      'multi-tenant-uygulama',
      'saas-platformu',
      'yonetim-paneli',
      'api-entegrasyonu',
      'hosting-yedekleme',
    ],
  },
  // 38
  {
    slug: 'kurumsal-email',
    title: 'Kurumsal E-Posta Kurulumu',
    shortTitle: 'Kurumsal E-Posta',
    category: 'altyapi',
    primaryKeyword: 'kurumsal e-posta',
    secondaryKeywords: [
      'kurumsal mail',
      'profesyonel e-posta',
      'işletme e-posta',
      'alan adı e-posta',
    ],
    icon: 'Mail',
    imageQuery: 'corporate email business',
    summary:
      'info@firmanız.com adresiyle profesyonel e-posta: kurulum, güvenlik ve teslim edilebilirlik.',
    description:
      'Kurumsal e-posta, işletmenizin kendi alan adını kullanan profesyonel iletişim altyapısıdır. Ücretsiz servis adresleriyle yapılan yazışmalar kurumsal müşterilerde güven kaybı yaratır; ayrıca alan adınız değiştiğinde tüm iletişim geçmişiniz risk altına girer. Tardigrad Software olarak kurumsal e-posta kurulumunda doğru sağlayıcı seçimi, MX/SPF/DKIM/DMARC kayıtları, kullanıcı hesapları, grup adresleri (info@, satis@, destek@), imza standardı, mobil cihaz yapılandırması ve arşivleme politikalarını yönetiyoruz. Teslim edilebilirlik (deliverability) en kritik konudur: doğru kayıtlar olmadan gönderdiğiniz e-postalar spam klasörüne düşer. Mevcut bir e-posta sisteminiz varsa kesintisiz taşıma yapıyor, eski mesajları aktarıyor ve DNS geçişini planlıyoruz. Ayrıca otomatik yanıt, yönlendirme kuralları ve KVKK kapsamında saklama süreleri ile ilgili yapılandırmaları da kuruyoruz.',
    heroTagline: 'info@firmanız.com ile profesyonel ve güvenilir iletişim.',
    whyNeeded: [
      {
        title: 'Ücretsiz adres güven vermiyor',
        description: 'Kurumsal müşteriler, gmail/hotmail adresli tedarikçileri elemeyi tercih eder.',
        icon: 'MailX',
      },
      {
        title: 'E-postalar spam’e düşüyor',
        description: 'SPF/DKIM/DMARC eksikse gönderimler inbox’a ulaşmaz.',
        icon: 'MailWarning',
      },
      {
        title: 'Personel ayrıldığında hesap kayboluyor',
        description: 'Kişisel hesaplarda kurumsal iletişim geçmişi de gider.',
        icon: 'UserMinus',
      },
      {
        title: 'Ortak kutular karmaşık',
        description: 'info@ adresine gelen mesajların kim tarafından yanıtlandığı bilinmez.',
        icon: 'Inbox',
      },
    ],
    scope: [
      'E-posta sağlayıcı seçimi ve hesap kurulumu',
      'MX, SPF, DKIM ve DMARC kayıtları',
      'Kullanıcı hesapları ve takma ad (alias) tanımları',
      'Grup adresleri ve dağıtım listeleri (info@, satis@, destek@)',
      'Otomatik yanıt ve yönlendirme kuralları',
      'Ortak kutu (shared inbox) ve görev atama',
      'İmza standardı ve kurumsal şablon',
      'Mobil cihaz ve e-posta istemcisi yapılandırması',
      'Mevcut e-postaların kesintisiz taşınması',
      'Arşivleme ve saklama politikası',
      'İki adımlı doğrulama ve güvenlik ayarları',
      'Teslim edilebilirlik testi ve izleme',
    ],
    benefits: [
      {
        title: 'Profesyonel imaj',
        description: 'Kendi alan adınızla kurumsal güven oluşturursunuz.',
        metric: 'Marka tutarlılığı',
        icon: 'BadgeCheck',
      },
      {
        title: 'Inbox’a ulaşan mesajlar',
        description: 'Doğru kayıtlar ile teslim edilebilirlik yükselir.',
        metric: '-90% spam riski',
        icon: 'MailCheck',
      },
      {
        title: 'Kurumsal kontrol',
        description: 'Hesaplar şirkete aittir; personel değişiminde veri kaybolmaz.',
        metric: 'Şirket mülkiyeti',
        icon: 'Building',
      },
      {
        title: 'Düzenli iletişim',
        description: 'Ortak kutular ve görev ataması ile hiçbir mesaj yanıtsız kalmaz.',
        metric: '0 kaçan mesaj',
        icon: 'Inbox',
      },
    ],
    targetAudience: [
      'Yeni kurulan işletmeler',
      'Ücretsiz e-posta kullanan firmalar',
      'Çok kişili ekipler',
      'Ajanslar ve danışmanlar',
      'Kurumsal satış yapan firmalar',
      'Marka geçişi yapan işletmeler',
    ],
    faq: [
      {
        question: 'Hangi e-posta sağlayıcısını öneriyorsunuz?',
        answer:
          'İhtiyaca göre Google Workspace veya Microsoft 365 öncelikli önerilerimizdir. Bütçe ve ölçeğe göre alternatif çözümleri de değerlendirip karşılaştırmalı bir öneri sunuyoruz.',
      },
      {
        question: 'Mevcut e-postalarımızı kaybeder miyiz?',
        answer:
          'Hayır. Taşıma sırasında eski mesajlar, takvimler ve kişiler aktarılır. DNS geçişini planlı yaparak yeni mesajların kaybolmasını da önlüyoruz.',
      },
      {
        question: 'Kaç kullanıcı hesabı açabiliriz?',
        answer:
          'Sağlayıcı lisansına bağlı olarak sınırsıza yakın sayıda hesap açılabilir. Departman bazlı grup adresleri ile lisans maliyetini optimize ediyoruz.',
      },
      {
        question: 'E-postalarımız spam’e düşüyor, düzelir mi?',
        answer:
          'Çoğu durumda evet. SPF, DKIM ve DMARC kayıtlarını düzenleyip gönderim itibarını iyileştiriyoruz; gerekliyse içerik ve gönderim sıklığı önerileri de veriyoruz.',
      },
      {
        question: 'Mobilde e-posta kurulumunu yapıyor musunuz?',
        answer:
          'Evet. iOS ve Android cihazlarda hesap kurulumu, bildirim ayarları ve güvenlik politikaları için adım adım rehber sağlıyoruz.',
      },
      {
        question: 'Form bildirimleri bu adreslere düşebilir mi?',
        answer:
          'Evet. Web sitenizdeki iletişim formlarını Resend veya SMTP üzerinden kurumsal adreslerinize yönlendiriyor, otomatik yanıt akışı da ekliyoruz.',
      },
    ],
    relatedServices: [
      'domain-dns-yonetimi',
      'hosting-yedekleme',
      'kurumsal-web-sitesi',
      'dijital-otomasyon',
      'form-basvuru-sistemi',
      'cloudflare-cdn',
    ],
  },
  // 39
  {
    slug: 'api-entegrasyonu',
    title: 'API Entegrasyonu',
    shortTitle: 'API Entegrasyonu',
    category: 'otomasyon',
    primaryKeyword: 'API entegrasyonu',
    secondaryKeywords: [
      'REST API',
      'web API',
      'üçüncü parti entegrasyon',
      'API geliştirme',
    ],
    icon: 'Plug',
    imageQuery: 'api integration connection',
    summary:
      'Sistemlerinizi birbirine bağlayan güvenli, hızlı ve belgelenmiş API entegrasyonları.',
    description:
      'API entegrasyonu, farklı yazılımların birbiriyle konuşmasını sağlayan bağlantı katmanıdır. Muhasebe programınız, e-ticaret siteniz, kargo firmanız, ödeme sağlayıcınız ve CRM’iniz ayrı ayrı çalıştığında aynı veriyi defalarca girmek zorunda kalırsınız. Tardigrad Software olarak REST ve GraphQL tabanlı entegrasyonlar geliştiriyor; mevcut API’leri tüketiyor veya sizin için yeni API uç noktaları üretiyoruz. Kimlik doğrulama (API key, OAuth 2.0, JWT), hız sınırlama, hata yönetimi, yeniden deneme mekanizmaları, veri dönüşümü (mapping) ve loglama entegrasyonun standart parçalarıdır. Webhook tabanlı gerçek zamanlı akışlarla veri anlık olarak senkronize edilir. Türkiye’de yaygın kullanılan muhasebe, e-fatura, kargo, SMS, ödeme ve pazar yeri servisleriyle çalışma deneyimimiz vardır. Her entegrasyon dokümante edilir; böylece ekibiniz veya gelecekteki geliştiriciler sistemin nasıl çalıştığını net biçimde görür.',
    heroTagline: 'Sistemleriniz birbiriyle konuşsun, veri iki kez girilmesin.',
    whyNeeded: [
      {
        title: 'Aynı veri defalarca giriliyor',
        description: 'Manuel aktarım zaman kaybettirir ve hata üretir.',
        icon: 'CopyPlus',
      },
      {
        title: 'Sistemler senkron değil',
        description: 'Stok, fiyat ve sipariş bilgisi farklı sistemlerde farklı görünür.',
        icon: 'RefreshCcw',
      },
      {
        title: 'Üçüncü parti servisler karmaşık',
        description: 'Dokümantasyon ve kimlik doğrulama akışları uzmanlık gerektirir.',
        icon: 'BookOpenText',
      },
      {
        title: 'Hatalar izlenmiyor',
        description: 'Başarısız entegrasyon çağrıları fark edilmediğinde veri kaybı oluşur.',
        icon: 'Bug',
      },
    ],
    scope: [
      'Entegrasyon ihtiyaç analizi ve veri akış haritası',
      'REST / GraphQL API geliştirme ve tüketimi',
      'Kimlik doğrulama: API key, OAuth 2.0, JWT',
      'Webhook kurulumu ve gerçek zamanlı senkronizasyon',
      'Veri eşleştirme (mapping) ve dönüşüm katmanı',
      'Hata yönetimi, yeniden deneme ve kuyruk mekanizması',
      'Rate limiting ve performans optimizasyonu',
      'Ödeme, kargo, SMS, e-fatura ve pazar yeri entegrasyonları',
      'ERP / muhasebe yazılımı bağlantıları',
      'API dokümantasyonu (OpenAPI / Swagger)',
      'İzleme, loglama ve alarm mekanizmaları',
      'Güvenlik: anahtar yönetimi, IP kısıtları, şifreleme',
    ],
    benefits: [
      {
        title: 'Tek veri girişi',
        description: 'Bilgi bir kez girilir, tüm sistemlere yayılır.',
        metric: '-80% manuel giriş',
        icon: 'KeyboardOff',
      },
      {
        title: 'Gerçek zamanlı senkron',
        description: 'Webhook ile veri anında güncellenir.',
        metric: 'Saniyeler içinde',
        icon: 'Zap',
      },
      {
        title: 'Azalan hata',
        description: 'Otomatik aktarım insan kaynaklı hataları ortadan kaldırır.',
        metric: '-90% veri hatası',
        icon: 'CircleCheck',
      },
      {
        title: 'Genişleyen yetenek',
        description: 'Yeni servisler mevcut sisteme kolayca eklenir.',
        metric: 'Modüler yapı',
        icon: 'Blocks',
      },
    ],
    targetAudience: [
      'E-ticaret firmaları',
      'Lojistik şirketleri',
      'Üretim işletmeleri',
      'Finans ve muhasebe birimleri',
      'SaaS ürünleri',
      'Pazar yeri satıcıları',
      'Çok sistemli kurumsal yapılar',
    ],
    faq: [
      {
        question: 'Hangi servislerle entegrasyon yapıyorsunuz?',
        answer:
          'API dokümantasyonu olan tüm servislerle çalışıyoruz: ödeme sağlayıcıları, kargo firmaları, SMS servisleri, e-fatura/e-arşiv, pazar yerleri, muhasebe/ERP yazılımları, CRM platformları ve sosyal medya API’leri.',
      },
      {
        question: 'Kendi API’mizi de geliştirebilir misiniz?',
        answer:
          'Evet. Uygulamanızın verilerini dış sistemlere açmak için REST veya GraphQL uç noktaları geliştiriyor, OpenAPI dokümantasyonu ve örnek istemci kodları ile teslim ediyoruz.',
      },
      {
        question: 'Entegrasyon başarısız olursa veri kaybolur mu?',
        answer:
          'Hayır. Başarısız çağrılar kuyruğa alınır, otomatik yeniden deneme yapılır ve belirli bir eşikten sonra bildirim gönderilir. Tüm işlemler loglanır.',
      },
      {
        question: 'API anahtarları güvenli mi?',
        answer:
          'Anahtarlar ortam değişkenlerinde saklanır, koda gömülmez. Erişim kısıtları, IP filtreleri ve düzenli anahtar rotasyonu uyguluyoruz.',
      },
      {
        question: 'Üçüncü parti servisin API’si yoksa ne yapıyoruz?',
        answer:
          'Alternatif olarak dosya tabanlı aktarım (CSV/XML), veritabanı bağlantısı veya arayüz otomasyonu değerlendirilir. Hangi yöntemin sürdürülebilir olduğunu birlikte karar veriyoruz.',
      },
      {
        question: 'Entegrasyon projesi ne kadar sürer?',
        answer:
          'Tek bir servis entegrasyonu 1-2 hafta; çok sistemli, iki yönlü veri akışı gerektiren projeler 3-8 hafta sürebilir.',
      },
    ],
    relatedServices: [
      'dijital-otomasyon',
      'odeme-whatsapp-crm-entegrasyonu',
      'supabase-postgresql',
      'e-ticaret-sitesi',
      'raporlama-sistemi',
      'stok-yonetimi',
    ],
  },
  // 40
  {
    slug: 'odeme-whatsapp-crm-entegrasyonu',
    title: 'Ödeme, WhatsApp ve CRM Entegrasyonu',
    shortTitle: 'Ödeme & CRM Entegrasyonu',
    category: 'otomasyon',
    primaryKeyword: 'CRM entegrasyonu',
    secondaryKeywords: [
      'ödeme entegrasyonu',
      'WhatsApp API',
      'ödeme sistemi',
      'CRM API',
    ],
    icon: 'Link2',
    imageQuery: 'payment whatsapp crm integration',
    summary:
      'Ödeme, WhatsApp ve CRM’i tek akışta birleştirin: lead’den tahsilata kesintisiz süreç.',
    description:
      'Ödeme, WhatsApp ve CRM entegrasyonu; müşteri yolculuğunun üç kritik noktasını tek bir akışta birleştirir. Bir müşteri web sitenizden form doldurduğunda kaydın CRM’e düşmesi, WhatsApp üzerinden bilgilendirilmesi, teklifin gönderilmesi ve ödemenin alınması ayrı sistemlerde yaşanıyorsa süreç kopar. Tardigrad Software olarak bu üç katmanı birbirine bağlıyoruz: form ve reklam lead’leri otomatik olarak CRM kaydına dönüşür, WhatsApp Business API ile onay ve bilgilendirme mesajları gönderilir, ödeme adımı sanal POS entegrasyonu ile tamamlanır ve tüm hareketler tek zaman çizelgesinde toplanır. Terk edilen sepetler, yarım kalan başvurular ve başarısız ödemeler için otomatik kurtarma akışları kuruyoruz. Böylece satış ekibi manuel takip yerine kapanmaya hazır fırsatlarla ilgilenir. Entegrasyon, KVKK’ya uygun açık rıza ve iletişim izni kontrolleriyle birlikte gelir.',
    heroTagline: 'Lead’den tahsilata kesintisiz, otomatik bir müşteri akışı.',
    whyNeeded: [
      {
        title: 'Lead’ler geç işleniyor',
        description: 'İlk 5 dakikada dönüş yapılmayan lead’lerin kapanma olasılığı ciddi şekilde düşer.',
        icon: 'TimerOff',
      },
      {
        title: 'İletişim kopuk',
        description: 'WhatsApp görüşmeleri CRM’e yansımadığında ekip geçmişi göremez.',
        icon: 'Unplug',
      },
      {
        title: 'Ödeme takibi manuel',
        description: 'Tahsilat durumu elle kontrol edildiğinde gecikmeler fark edilmez.',
        icon: 'ReceiptText',
      },
      {
        title: 'Terk edilen işlemler',
        description: 'Sepet ve başvuru terkleri için otomatik kurtarma yoksa gelir kaybolur.',
        icon: 'ShoppingCart',
      },
    ],
    scope: [
      'Web formu ve reklam lead’lerinin CRM’e otomatik aktarımı',
      'Lead atama, etiketleme ve önceliklendirme kuralları',
      'WhatsApp Business API entegrasyonu ve şablon mesajlar',
      'Otomatik onay, hatırlatma ve takip mesajları',
      'Sanal POS ve ödeme sağlayıcı entegrasyonu',
      'Tekrarlayan ödeme ve abonelik tahsilatı',
      'Başarısız ödeme kurtarma akışları',
      'Sepet ve form terk otomasyonları',
      'Fatura üretimi ve e-fatura entegrasyonu',
      'Tek zaman çizelgesinde tüm etkileşim kaydı',
      'Dönüşüm takibi (GA4, piksel) ve raporlama',
      'KVKK: açık rıza, iletişim izni ve opt-out akışları',
    ],
    benefits: [
      {
        title: 'Anında lead işleme',
        description: 'Talep geldiği saniye kayıt açılır ve bildirim gider.',
        metric: '5 dakikada dönüş',
        icon: 'Zap',
      },
      {
        title: 'Yüksek dönüşüm',
        description: 'Terk otomasyonları kaybedilen gelirin bir kısmını geri kazanır.',
        metric: '+15% kurtarma',
        icon: 'HeartHandshake',
      },
      {
        title: 'Tek ekran görünürlük',
        description: 'Satış, destek ve finans aynı güncel veriyi görür.',
        metric: 'Tam senkron',
        icon: 'LayoutDashboard',
      },
      {
        title: 'Hızlanan tahsilat',
        description: 'Ödeme hatırlatmaları ve online tahsilat gecikmeleri azaltır.',
        metric: '-30% gecikme',
        icon: 'Landmark',
      },
    ],
    targetAudience: [
      'E-ticaret firmaları',
      'B2B satış ekipleri',
      'Hizmet işletmeleri',
      'Eğitim ve kurs merkezleri',
      'Sağlık kuruluşları',
      'Abonelik modelli ürünler',
      'Ajanslar',
    ],
    faq: [
      {
        question: 'WhatsApp Business API kullanmak zorunda mıyım?',
        answer:
          'Otomatik ve ölçekli mesaj gönderimi için API gereklidir. Küçük ölçekli ihtiyaçlarda WhatsApp Business uygulaması ve tıklama bağlantıları ile de başlayabiliriz.',
      },
      {
        question: 'Müşteriler mesaj almaya nasıl onay verir?',
        answer:
          'KVKK ve ticari elektronik ileti kuralları gereği açık rıza alınır; formlarda onay kutusu ve aydınlatma metni bağlantısı bulunur. İzin kayıtları loglanır.',
      },
      {
        question: 'Hangi ödeme sağlayıcılarıyla çalışıyorsunuz?',
        answer:
          'Türkiye’de yaygın sanal POS ve ödeme altyapılarıyla entegrasyon sağlıyoruz. Mevcut banka anlaşmanız varsa onun API’sini de bağlayabiliriz.',
      },
      {
        question: 'Mevcut CRM’imiz var, ona bağlanabilir mi?',
        answer:
          'Evet. API’si olan CRM platformlarıyla iki yönlü veri akışı kuruyoruz. API yoksa veri aktarımını dosya veya webhook tabanlı alternatiflerle sağlıyoruz.',
      },
      {
        question: 'Terk edilen sepet için otomatik mesaj atılır mı?',
        answer:
          'Evet. Belirlenen süre sonunda e-posta veya WhatsApp ile hatırlatma gönderilir; isteğe bağlı indirim kodu tanımlanabilir.',
      },
      {
        question: 'Entegrasyon ne kadar sürer?',
        answer:
          'Tek bir kanal (ör. form → CRM) 1-2 hafta; ödeme, WhatsApp ve CRM’i kapsayan tam akış 3-6 hafta sürebilir.',
      },
    ],
    relatedServices: [
      'crm',
      'api-entegrasyonu',
      'dijital-otomasyon',
      'abonelik-tabanli-yazilim',
      'e-ticaret-sitesi',
      'ai-chatbot',
      'form-basvuru-sistemi',
    ],
  },
  // 41
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot Geliştirme',
    shortTitle: 'AI Chatbot',
    category: 'ai',
    primaryKeyword: 'AI chatbot',
    secondaryKeywords: [
      'chatbot yazılımı',
      'yapay zekâ chatbot',
      'AI destekli chatbot',
      'müşteri botu',
    ],
    icon: 'Bot',
    imageQuery: 'ai chatbot artificial intelligence',
    summary:
      'Müşteri sorularını 7/24 yanıtlayan, satışa yönlendiren ve ekibe devir yapabilen AI chatbotlar.',
    description:
      'AI chatbot, müşterilerinizin sorularını insan müdahalesi olmadan yanıtlayan, gerekli durumlarda satış veya destek ekibine devir yapan yapay zekâ destekli sohbet arayüzüdür. Doğru kurgulandığında destek maliyetini düşürür, mesai dışı talepleri yakalar ve dönüşüm oranını artırır; yanlış kurgulandığında ise kullanıcıyı sinirlendiren bir engel hâline gelir. Tardigrad Software olarak chatbot projelerinde önce niyet haritası çıkarıyoruz: kullanıcılar en çok ne soruyor, hangi sorular satışa gidiyor, hangileri insan müdahalesi gerektiriyor. Ardından işletmenizin kendi içerikleriyle (SSS, ürün bilgisi, politika metinleri) beslenen bir bilgi tabanı oluşturuyoruz. Bot; web sitesinde, WhatsApp’ta veya müşteri panelinde çalışabilir, form doldurabilir, randevu alabilir, sipariş durumu sorgulayabilir. Yanıtlayamadığı konularda kibarca insan temsilciye devreder ve konuşma geçmişini aktarır. Tüm konuşmalar loglanır, haftalık analiz raporlarıyla iyileştirme yapılır.',
    heroTagline: '7/24 yanıt veren, satışa yönlendiren akıllı asistan.',
    whyNeeded: [
      {
        title: 'Mesai dışı talepler kaçıyor',
        description: 'Akşam ve hafta sonu gelen sorular ertesi güne kaldığında müşteri rakibe gider.',
        icon: 'MoonStar',
      },
      {
        title: 'Aynı sorular tekrar tekrar',
        description: 'Destek ekibi rutin sorularla meşgulken karmaşık işlere vakit kalmaz.',
        icon: 'Repeat',
      },
      {
        title: 'Yanıt süresi uzun',
        description: 'Bekletilen müşteri hem memnuniyetsiz olur hem dönüşümden çıkar.',
        icon: 'Hourglass',
      },
      {
        title: 'Satış fırsatı değerlendirilmiyor',
        description: 'Bilgi arayan ziyaretçiye doğru anda teklif sunulmazsa fırsat kaçar.',
        icon: 'Target',
      },
    ],
    scope: [
      'Niyet ve konuşma akışı tasarımı',
      'İşletme içeriğiyle beslenen bilgi tabanı (RAG) kurulumu',
      'Web sitesi sohbet bileşeni (widget)',
      'WhatsApp ve diğer kanallara entegrasyon',
      'Form doldurma, randevu ve sipariş sorgulama akışları',
      'İnsan temsilciye devir (handoff) ve konuşma aktarımı',
      'Çok dilli destek (TR / EN)',
      'Kişiselleştirme: kullanıcı geçmişi ve bağlam kullanımı',
      'Güvenlik: içerik filtreleme, kişisel veri koruma',
      'Konuşma logları ve analitik dashboard',
      'Yanıt kalitesi ölçümü ve sürekli iyileştirme',
      'KVKK uyumlu aydınlatma ve veri saklama politikası',
    ],
    benefits: [
      {
        title: 'Anında yanıt',
        description: 'Müşteri beklemeden cevap alır, memnuniyet yükselir.',
        metric: '<3 saniye yanıt',
        icon: 'Zap',
      },
      {
        title: 'Azalan destek yükü',
        description: 'Rutin sorular otomatik yanıtlanır, ekip değerli işlere odaklanır.',
        metric: '-45% tekrar soru',
        icon: 'Headset',
      },
      {
        title: '7/24 lead toplama',
        description: 'Mesai dışında da talepler kayda dönüşür.',
        metric: '24 saat aktif',
        icon: 'Clock',
      },
      {
        title: 'Artan dönüşüm',
        description: 'Doğru anda sunulan yönlendirme satış oranını yükseltir.',
        metric: '+18% dönüşüm',
        icon: 'TrendingUp',
      },
    ],
    targetAudience: [
      'E-ticaret siteleri',
      'Hizmet işletmeleri',
      'Sağlık kuruluşları',
      'Eğitim kurumları',
      'SaaS ürünleri',
      'Turizm ve konaklama',
      'Teknik servisler',
      'Çok kanallı destek ekipleri',
    ],
    faq: [
      {
        question: 'Chatbot yanlış bilgi verirse ne olur?',
        answer:
          'Botu yalnızca sizin onayladığınız içeriklerle besliyoruz (RAG yaklaşımı). Bilgi tabanında olmayan konularda tahmin yürütmek yerine temsilciye devreder. Ayrıca haftalık yanıt denetimi yapıyoruz.',
      },
      {
        question: 'Müşteriler bot konuştuğunu anlayacak mı?',
        answer:
          'Evet, şeffaflık ilkesini uyguluyoruz. Kullanıcıya yapay zekâ asistanıyla konuştuğu belirtilir ve istediği anda insan temsilciye geçme seçeneği sunulur.',
      },
      {
        question: 'WhatsApp’ta çalışır mı?',
        answer:
          'Evet. WhatsApp Business API üzerinden entegre ediyoruz; web widget, müşteri paneli ve diğer kanallarla aynı bilgi tabanını paylaşır.',
      },
      {
        question: 'Hangi dilleri destekliyor?',
        answer:
          'Türkçe ve İngilizce başta olmak üzere çok dilli çalışabilir. Dil bazlı bilgi tabanı ve yanıt şablonları ayrı ayrı yönetilir.',
      },
      {
        question: 'Mevcut CRM’imize bağlanabilir mi?',
        answer:
          'Evet. Konuşmalar lead kaydı olarak CRM’e düşer; müşteri geçmişi bot bağlamına eklenerek kişiselleştirilmiş yanıtlar üretilir.',
      },
      {
        question: 'Chatbot maliyeti nedir?',
        answer:
          'Kapsam, kanal sayısı ve yapay zekâ kullanım hacmine göre değişir. Kurulum maliyeti ve aylık işletme maliyetini ayrı ayrı şeffaf biçimde paylaşıyoruz.',
      },
      {
        question: 'Kurulum ne kadar sürer?',
        answer:
          'Bilgi tabanı hazırsa tek kanallı bir chatbot 2-4 hafta içinde yayına alınır; çok kanallı ve CRM entegrasyonlu projeler 4-8 hafta sürer.',
      },
    ],
    relatedServices: [
      'ai-icerik-araclar',
      'odeme-whatsapp-crm-entegrasyonu',
      'api-entegrasyonu',
      'crm',
      'rezervasyon-basvuru-sistemi',
      'dijital-otomasyon',
      'musteri-paneli',
    ],
    schemaType: 'ProfessionalService',
  },
  // 42
  {
    slug: 'ai-icerik-araclar',
    title: 'AI Destekli İçerik ve İş Araçları',
    shortTitle: 'AI İçerik & Araçlar',
    category: 'ai',
    primaryKeyword: 'AI içerik',
    secondaryKeywords: [
      'yapay zekâ içerik',
      'AI araçları',
      'otomatik içerik üretimi',
      'AI asistan',
    ],
    icon: 'Sparkles',
    imageQuery: 'ai content tools artificial intelligence',
    summary:
      'İçerik üretimini, veri analizini ve rutin işleri hızlandıran yapay zekâ destekli araçlar geliştiriyoruz.',
    description:
      'AI destekli içerik ve iş araçları, yapay zekâyı işletmenizin günlük akışına yerleştiren uygulamalardır. Amaç sohbet botu kurmak değil; somut iş çıktıları üretmektir: SEO uyumlu ürün açıklamaları, hizmet metinleri, e-posta kampanyaları, sosyal medya içerikleri, toplantı özetleri, sözleşme analizi, müşteri yorumlarının sınıflandırılması veya görsel üretimi. Tardigrad Software olarak bu araçları işletmenizin kendi verisi ve tonuyla çalışacak şekilde geliştiriyoruz. Marka dilinizi, yasaklı ifadeleri ve onay akışını sisteme tanımlıyoruz; böylece üretilen içerik otomatik olarak kurallarınıza uyar. Araçlar bir yönetim paneli üzerinden kullanılır: şablon seçimi, girdi alanları, üretim, düzenleme ve onay adımları tek ekranda toplanır. Toplu üretim (örneğin 500 ürün açıklaması) ve dışa aktarma desteklenir. İnsan onayı olmadan yayın yapılmaz; kalite kontrol sürecin doğal parçasıdır.',
    heroTagline: 'Yapay zekâ sizin markanızın diliyle üretsin, ekibiniz onaylasın.',
    whyNeeded: [
      {
        title: 'İçerik üretimi yavaş',
        description: 'Ürün açıklamaları ve kampanya metinleri haftalar alır.',
        icon: 'PenLine',
      },
      {
        title: 'Tutarlı marka dili yok',
        description: 'Farklı kişiler farklı tonda yazdığında marka algısı zayıflar.',
        icon: 'MessagesSquare',
      },
      {
        title: 'Veri analiz edilmiyor',
        description: 'Yorumlar, anketler ve destek kayıtları içindeki içgörüler okunmadan kalır.',
        icon: 'ChartSpline',
      },
      {
        title: 'Rutin işler tekrar ediyor',
        description: 'Özetleme, sınıflandırma ve etiketleme gibi işler manuel yapılıyor.',
        icon: 'Repeat',
      },
    ],
    scope: [
      'İhtiyaç analizi ve kullanım senaryosu tasarımı',
      'Marka dili, ton ve yasaklı ifade kurallarının tanımlanması',
      'İçerik üretim şablonları (ürün, hizmet, blog, e-posta, sosyal)',
      'İşletme verisiyle beslenen bilgi tabanı (RAG)',
      'Toplu üretim ve dışa aktarma (Excel/CSV)',
      'Görsel üretimi ve optimizasyonu (WebP)',
      'Metin sınıflandırma, özetleme ve etiketleme araçları',
      'İnsan onay akışı ve versiyonlama',
      'Yönetim paneli ve kullanıcı yetkilendirmesi',
      'Maliyet izleme ve model seçimi optimizasyonu',
      'KVKK: kişisel verilerin modele gönderilmemesi kuralları',
      'Kullanım analitiği ve kalite ölçümü',
    ],
    benefits: [
      {
        title: 'Çok daha hızlı üretim',
        description: 'Saatler süren metin işleri dakikalara iner.',
        metric: '5x daha hızlı',
        icon: 'Zap',
      },
      {
        title: 'Tutarlı marka dili',
        description: 'Tüm içerikler tanımlı kurallara uygun üretilir.',
        metric: 'Standart ton',
        icon: 'Palette',
      },
      {
        title: 'Ölçeklenebilir içerik',
        description: 'Binlerce ürün veya sayfa için toplu üretim yapılabilir.',
        metric: 'Toplu işlem',
        icon: 'Layers',
      },
      {
        title: 'Görünmeyen içgörü',
        description: 'Yorum ve destek kayıtlarından otomatik tema çıkarımı.',
        metric: 'Otomatik analiz',
        icon: 'Lightbulb',
      },
    ],
    targetAudience: [
      'E-ticaret firmaları (ürün açıklamaları)',
      'Pazarlama ve içerik ekipleri',
      'Ajanslar',
      'SEO çalışması yapan işletmeler',
      'Destek ekipleri',
      'İnsan kaynakları birimleri',
      'Hukuk ve danışmanlık ofisleri',
    ],
    faq: [
      {
        question: 'Üretilen içerikler özgün mü?',
        answer:
          'Evet. İçerikler sizin bilgi tabanınız ve kurallarınızla üretilir, ardından editoryal kontrolden geçer. Kopya içerik riskini azaltmak için benzersizlik kontrolü yapıyoruz.',
      },
      {
        question: 'Yapay zekâ içerikleri doğrudan yayınlanıyor mu?',
        answer:
          'Hayır. İnsan onay akışı zorunludur. Sistem taslak üretir, ekibiniz düzenler ve onayladıktan sonra yayınlanır. Bu hem kalite hem hukuki güvenlik sağlar.',
      },
      {
        question: 'Müşteri verilerini modele gönderiyor musunuz?',
        answer:
          'KVKK kapsamında kişisel verilerin modele gönderilmemesi için kurallar ve maskeleme mekanizmaları kuruyoruz. Hangi verinin işleneceğini birlikte belirliyoruz.',
      },
      {
        question: 'Hangi yapay zekâ modellerini kullanıyorsunuz?',
        answer:
          'Göreve göre model seçiyoruz: metin üretimi, özetleme, sınıflandırma ve görsel üretim için farklı sağlayıcılar kullanılabilir. Maliyet ve kalite dengesini birlikte optimize ediyoruz.',
      },
      {
        question: 'Toplu ürün açıklaması üretebilir miyiz?',
        answer:
          'Evet. Ürün verilerinizi (ad, kategori, özellikler) yükleyip binlerce açıklamayı toplu üretebilir, Excel veya doğrudan sisteminize aktarabilirsiniz.',
      },
      {
        question: 'Maliyet nasıl hesaplanıyor?',
        answer:
          'Kurulum maliyeti ve aylık model kullanım maliyeti ayrı kalemlerdir. Kullanım hacmine göre tahmini aylık maliyeti önceden paylaşıyor, panel üzerinden izleme sağlıyoruz.',
      },
    ],
    relatedServices: [
      'ai-chatbot',
      'seo-danismanligi',
      'teknik-seo',
      'e-ticaret-sitesi',
      'dijital-otomasyon',
      'yonetim-paneli',
      'api-entegrasyonu',
    ],
  },
  // 43
  {
    slug: 'dijital-donusum',
    title: 'Dijital Dönüşüm Süreçleri',
    shortTitle: 'Dijital Dönüşüm',
    category: 'otomasyon',
    primaryKeyword: 'dijital dönüşüm',
    secondaryKeywords: [
      'dijital dönüşüm danışmanlığı',
      'iş süreçleri dijitalleştirme',
      'dijitalleşme',
      'kurumsal dönüşüm',
    ],
    icon: 'Compass',
    imageQuery: 'digital transformation business',
    summary:
      'İş süreçlerinizi uçtan uca dijitalleştiren, ölçülebilir ve kademeli dönüşüm programları.',
    description:
      'Dijital dönüşüm, teknoloji satın almak değil; iş yapma biçiminizi veri, otomasyon ve doğru araçlar etrafında yeniden tasarlamaktır. Excel dosyaları, WhatsApp grupları, kağıt formlar ve kişisel notlar üzerine kurulu bir işletme büyüdükçe tıkanır: bilgi kaybolur, süreçler yavaşlar, hata oranı artar ve yönetim görünürlüğünü yitirir. Tardigrad Software olarak dönüşüm programlarına mevcut durum analizi ile başlıyoruz. Süreçlerinizi haritalıyor, darboğazları ve otomasyon fırsatlarını tespit ediyor, önceliklendirilmiş bir yol haritası çıkarıyoruz. Ardından kademeli olarak uyguluyoruz: önce en çok değer üreten süreç dijitalleşir, sonuç ölçülür, sonra bir sonraki faza geçilir. Web sitesi, CRM, sipariş ve stok sistemleri, otomasyon akışları, raporlama ve yapay zekâ araçları tek bir bütünün parçaları olarak kurgulanır. Ekip adaptasyonu için eğitim ve dokümantasyon sağlıyoruz; dönüşümün kalıcı olması için değişim yönetimini de planlıyoruz.',
    heroTagline: 'Excel’den sisteme: iş yapma biçiminizi baştan tasarlayın.',
    whyNeeded: [
      {
        title: 'Bilgi dağınık ve kayıp',
        description: 'Veri farklı dosya ve sohbetlerde durduğunda kararlar gecikir.',
        icon: 'FolderSearch',
      },
      {
        title: 'Büyüme tıkanıyor',
        description: 'Manuel süreçler ölçeklenemez; her büyümede daha fazla insan gerekir.',
        icon: 'TrendingUp',
      },
      {
        title: 'Rekabet geride kalıyor',
        description: 'Dijitalleşen rakipler daha hızlı teklif verip daha iyi hizmet sunar.',
        icon: 'Swords',
      },
      {
        title: 'Maliyet görünmüyor',
        description: 'Süreç bazlı maliyet ölçülmediğinde kârsız işler sürdürülür.',
        icon: 'Calculator',
      },
      {
        title: 'Personel bağımlılığı',
        description: 'Kritik bilgi tek kişide olduğunda ayrılık operasyonu durdurur.',
        icon: 'UserRoundX',
      },
    ],
    scope: [
      'Mevcut durum analizi ve süreç haritalama',
      'Dijital olgunluk değerlendirmesi',
      'Darboğaz ve otomasyon fırsatı tespiti',
      'Önceliklendirilmiş dönüşüm yol haritası',
      'Hedef mimari tasarımı (sistemler, veri akışı, entegrasyonlar)',
      'Kademeli uygulama planı ve faz tanımları',
      'Web, CRM, ERP benzeri modüllerin geliştirilmesi',
      'Veri migrasyonu ve temizliği',
      'Otomasyon ve entegrasyon akışlarının kurulumu',
      'Raporlama ve KPI altyapısı',
      'Ekip eğitimi ve değişim yönetimi',
      'Dokümantasyon ve süreç sahipliği ataması',
      'Dönüşüm sonrası etki ölçümü ve iyileştirme',
    ],
    benefits: [
      {
        title: 'Ölçülebilir verimlilik',
        description: 'Manuel işler azalır, süreç süreleri kısalır.',
        metric: '%40 daha az manuel iş',
        icon: 'Gauge',
      },
      {
        title: 'Ölçeklenebilir operasyon',
        description: 'İş hacmi arttıkça ek personel ihtiyacı orantılı büyümez.',
        metric: '2x kapasite',
        icon: 'Expand',
      },
      {
        title: 'Yönetim görünürlüğü',
        description: 'Tüm süreçler canlı panellerden izlenir.',
        metric: 'Gerçek zamanlı',
        icon: 'LayoutDashboard',
      },
      {
        title: 'Kurumsal hafıza',
        description: 'Bilgi kişilere değil sisteme kayıtlıdır.',
        metric: 'Kalıcı kayıt',
        icon: 'Database',
      },
      {
        title: 'Rekabet avantajı',
        description: 'Daha hızlı teklif, daha iyi müşteri deneyimi, daha düşük maliyet.',
        metric: 'Pazarda öne çıkış',
        icon: 'Trophy',
      },
    ],
    targetAudience: [
      'Büyüme aşamasındaki KOBİ’ler',
      'Üretim ve sanayi işletmeleri',
      'Çok şubeli hizmet firmaları',
      'Lojistik şirketleri',
      'Toptan ticaret',
      'Kurumsallaşmak isteyen aile şirketleri',
      'Kamu ve sivil toplum kuruluşları',
    ],
    faq: [
      {
        question: 'Dijital dönüşüm ne kadar sürer?',
        answer:
          'Kapsama göre 3-12 ay. İlk faz genellikle 4-8 hafta içinde değer üretmeye başlar; tam dönüşüm kademeli olarak ilerler. Büyük patlamalı geçişler yerine ölçülebilir fazları öneriyoruz.',
      },
      {
        question: 'Tüm sistemleri değiştirmek zorunda mıyız?',
        answer:
          'Hayır. Çalışan ve değer üreten sistemleri koruyup entegre ediyoruz. Yalnızca darboğaz yaratan veya sürdürülemez olanları yeniliyoruz.',
      },
      {
        question: 'Ekip yeni sisteme uyum sağlayabilir mi?',
        answer:
          'Değişim yönetimini projenin parçası olarak planlıyoruz: eğitim, dokümantasyon, kademeli devreye alma ve süreç sahipleri ataması. Kullanılmayan sistem başarısız sistemdir.',
      },
      {
        question: 'Bütçemiz sınırlı, nereden başlamalıyız?',
        answer:
          'En çok zaman kaybettiren veya en çok hata üreten süreçten. Ücretsiz ön analizde süreçlerinizi değerlendirip yatırım getirisi en yüksek ilk adımı birlikte belirliyoruz.',
      },
      {
        question: 'Dönüşümün başarısını nasıl ölçeceğiz?',
        answer:
          'Proje başında ölçülebilir hedefler tanımlıyoruz: süreç süresi, hata oranı, maliyet, dönüşüm oranı, çalışan memnuniyeti. Her faz sonunda önce/sonra karşılaştırması raporlanır.',
      },
      {
        question: 'Danışmanlık mı alıyoruz, yoksa siz mi uyguluyorsunuz?',
        answer:
          'İkisini birlikte sunuyoruz. Yol haritasını çıkarıyor, ardından gerekli yazılım, otomasyon ve altyapı işlerini kendimiz geliştiriyoruz. Tek sorumlu muhatap avantajı sağlar.',
      },
      {
        question: 'Verilerimizin güvenliği nasıl sağlanacak?',
        answer:
          'KVKK uyumlu veri işleme, rol bazlı erişim, şifreli saklama, düzenli yedekleme ve işlem logları standarttır. Erişim yetkileri süreç sahiplerine göre sınırlandırılır.',
      },
    ],
    relatedServices: [
      'dijital-otomasyon',
      'crm',
      'yonetim-paneli',
      'raporlama-sistemi',
      'web-sitesi-yenileme',
      'saas-platformu',
      'ai-icerik-araclar',
      'api-entegrasyonu',
    ],
    localPriority: true,
    schemaType: 'ProfessionalService',
  },
]

// ---------------------------------------------------------------------------
// İÇERİK ÜRETİCİLERİ
// ---------------------------------------------------------------------------

const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  web: 'Web Geliştirme',
  yazilim: 'Özel Yazılım',
  saas: 'SaaS Geliştirme',
  seo: 'SEO Hizmetleri',
  otomasyon: 'Dijital Otomasyon',
  altyapi: 'Altyapı ve DevOps',
  ai: 'Yapay Zekâ',
}

/** Kategoriye göre schema tipi */
function resolveSchemaType(seed: ServiceSeed): 'Service' | 'ProfessionalService' {
  if (seed.schemaType) return seed.schemaType
  return seed.category === 'seo' || seed.category === 'ai' ? 'ProfessionalService' : 'Service'
}

function buildImage(seed: ServiceSeed): ServiceImage {
  return {
    filename: `${seed.slug}-tardigrad-software.webp`,
    alt: `${seed.title} Hizmeti – Tardigrad Software | ${CATEGORY_LABEL[seed.category]}, Türkiye geneli`,
    width: 1200,
    height: 630,
  }
}

/** Meta title: max 60 karakter hedefi */
function buildMetaTitle(seed: ServiceSeed): string {
  const suffix = 'Tardigrad Software'
  const base = `${seed.title} Hizmeti`
  const full = `${base} | ${suffix}`
  if (full.length <= 60) return full
  const short = `${seed.shortTitle} | ${suffix}`
  return truncate(short.length <= 60 ? short : `${seed.shortTitle} – ${suffix}`, 60)
}

/** Meta description: max 155 karakter hedefi */
function buildMetaDescription(seed: ServiceSeed): string {
  const base = `${seed.summary} Türkiye geneli hizmet, ücretsiz ön analiz.`
  return truncate(base, 155)
}

function buildH1(seed: ServiceSeed): string {
  return `${seed.title} Hizmeti`
}

/** Neden gerekli → tip uyumlu WhyNeededItem */
function buildWhyNeeded(seed: ServiceSeed): WhyNeededItem[] {
  return seed.whyNeeded.map((item) => ({
    title: item.title,
    description: item.description,
    icon: item.icon,
  }))
}

function buildBenefits(seed: ServiceSeed): Benefit[] {
  return seed.benefits.map((item) => ({
    title: item.title,
    description: item.description,
    metric: item.metric,
    icon: item.icon,
  }))
}

/**
 * 9 adımlı şirket süreci; hizmetin kategorisine göre 1 adım özelleştirilir.
 * Böylece her hizmet sayfası benzersiz bir süreç adımı içerir.
 */
function buildProcess(seed: ServiceSeed): ProcessStep[] {
  const custom: Record<ServiceCategory, { step: number; title: string; description: string; icon: string }> = {
    web: {
      step: 4,
      title: 'Sayfa ve Bileşen Geliştirme',
      description:
        'Tasarım, Next.js bileşenlerine dönüştürülür; içerik yönetimi, formlar ve responsive davranış kodlanır.',
      icon: 'LayoutTemplate',
    },
    yazilim: {
      step: 4,
      title: 'Modül Geliştirme',
      description:
        'Veri modeli, iş kuralları ve ekranlar modül modül geliştirilir; her sprint sonunda çalışan bir çıktı paylaşılır.',
      icon: 'Blocks',
    },
    saas: {
      step: 4,
      title: 'Ürün Geliştirme',
      description:
        'Multi-tenant veri katmanı, abonelik akışı ve ürün özellikleri geliştirilir; beta kullanıcılarla doğrulanır.',
      icon: 'Boxes',
    },
    seo: {
      step: 4,
      title: 'Optimizasyon Uygulaması',
      description:
        'Denetimde tespit edilen maddeler öncelik sırasına göre uygulanır; her değişiklik öncesi/sonrası ölçülür.',
      icon: 'Wrench',
    },
    otomasyon: {
      step: 4,
      title: 'Akış Geliştirme',
      description:
        'Tetikleyiciler, veri dönüşümleri, entegrasyon çağrıları ve hata yakalama mekanizmaları kodlanır.',
      icon: 'Workflow',
    },
    altyapi: {
      step: 4,
      title: 'Altyapı Yapılandırma',
      description:
        'Sunucu/platform ayarları, güvenlik politikaları, önbellek kuralları ve yedekleme tanımları uygulanır.',
      icon: 'ServerCog',
    },
    ai: {
      step: 4,
      title: 'Model ve Akış Geliştirme',
      description:
        'Bilgi tabanı hazırlanır, model entegrasyonu yapılır, yanıt kalitesi örnek veri setiyle test edilir.',
      icon: 'BrainCircuit',
    },
  }

  const base = COMPANY_PROCESS_STEPS
  return base.map((step) => {
    const override = custom[seed.category]
    if (step.step === override.step) {
      return { ...override }
    }
    return { ...step }
  })
}

/** Süreç adımlarının yerel kopyası (döngüsel import’u önlemek için) */
const COMPANY_PROCESS_STEPS: ProcessStep[] = [
  { step: 1, title: 'İhtiyaç Analizi', description: 'Mevcut durumu, hedefleri ve kısıtları birlikte çıkarıyoruz.', icon: 'Search' },
  { step: 2, title: 'Strateji ve Kapsam', description: 'Kapsam, takvim, bütçe ve başarı kriterleri tek dokümanda netleşir.', icon: 'Target' },
  { step: 3, title: 'Tasarım ve Mimari', description: 'Ekran akışları, veri modeli ve teknik mimari tasarlanır.', icon: 'PenTool' },
  { step: 4, title: 'Geliştirme', description: 'Modüller kodlanır, her sprint sonunda çalışan çıktı paylaşılır.', icon: 'CodeXml' },
  { step: 5, title: 'Test ve Kalite', description: 'Fonksiyonel, cihaz ve performans testleri yapılır.', icon: 'ShieldCheck' },
  { step: 6, title: 'Canlıya Alma', description: 'Yayın, DNS ve yedekleme yapılandırması ile kesintisiz geçiş.', icon: 'Rocket' },
  { step: 7, title: 'SEO ve Ölçüm', description: 'Yapısal veri, sitemap, analytics ve dönüşüm takibi kurulur.', icon: 'TrendingUp' },
  { step: 8, title: 'Eğitim ve Destek', description: 'Ekip eğitimi, dokümantasyon ve 30 gün destek.', icon: 'LifeBuoy' },
  { step: 9, title: 'Raporlama ve İyileştirme', description: 'Aylık performans raporu ve sonraki adım önerileri.', icon: 'ChartColumn' },
]

/** Her hizmete özgü 1-2 SSS + ortak SSS şablonları → 5-8 soru */
function buildFaq(seed: ServiceSeed): FAQ[] {
  const own: FAQ[] = seed.faq.map((item) => ({ question: item.question, answer: item.answer }))

  const templates: FAQ[] = [
    {
      question: `${seed.title} hizmeti hangi şehirlerde veriliyor?`,
      answer:
        'Tardigrad Software merkez ofisi İstanbul Maltepe’dedir ve Türkiye’nin 81 iline hizmet vermektedir. Proje görüşmeleri çevrim içi yürütülür, gerekli hâllerde saha ziyareti planlanır. İstanbul, Ankara, İzmir, Bursa, Antalya ve Kocaeli başta olmak üzere birçok şehirde aktif projeler yürütüyoruz.',
    },
    {
      question: `${seed.title} için nasıl teklif alabilirim?`,
      answer:
        'Sayfadaki iletişim formunu doldurarak, info@tardigradsoftware.com adresine yazarak veya WhatsApp hattımızdan ulaşarak ücretsiz ön analiz talebi oluşturabilirsiniz. İhtiyaçlarınızı dinledikten sonra kapsam, takvim ve maliyet kalemlerini içeren yazılı bir teklif paylaşıyoruz.',
    },
    {
      question: `Tardigrad Software ${seed.primaryKeyword.toLocaleLowerCase('tr-TR')} alanında nasıl çalışıyor?`,
      answer:
        'Her projede aynı disiplinle ilerliyoruz: ihtiyaç analizi, kapsam ve strateji, tasarım/mimari, geliştirme, test, canlıya alma, SEO ve ölçüm, bakım, raporlama. Bu 9 adımlı süreç sayesinde teslim tarihleri ve kalite standartları öngörülebilir olur.',
    },
    {
      question: 'Proje sonrası bakım ve destek sağlanıyor mu?',
      answer:
        'Evet. Yayına alma sonrası 30 gün hata düzeltme garantisi veriyoruz. Devamında aylık bakım paketi ile güncelleme, yedekleme, güvenlik izleme, küçük geliştirme talepleri ve performans raporlamasını üstleniyoruz.',
    },
    {
      question: 'Verilerimiz ve sistemimiz KVKK’ya uygun mu?',
      answer:
        'Evet. Kişisel veriler açık rıza kaydı ile işlenir, rol bazlı erişim politikaları uygulanır, bağlantılar şifrelenir ve veriler tercih ettiğiniz bölgede (genellikle Avrupa) barındırılır. Silme ve veri taşınabilirliği talepleri için hazır akışlar kuruyoruz.',
    },
  ]

  const rand = seededRandom(hashString(seed.slug))
  const picked: FAQ[] = [...own]
  for (const tpl of templates) {
    if (picked.length >= 8) break
    // Her hizmete en az 3, en fazla 5 ortak soru
    if (picked.length < 5 || rand() > 0.35) picked.push(tpl)
  }
  return picked.slice(0, 8)
}

function buildRelatedCities(seed: ServiceSeed, citySlugs: string[]): string[] {
  const rand = seededRandom(hashString(`${seed.slug}-city`))
  const priority = ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'kocaeli']
  const base = priority.filter((slug) => citySlugs.includes(slug))
  const rest = citySlugs.filter((slug) => !base.includes(slug))
  const shuffled = rest.sort(() => rand() - 0.5)
  return [...base, ...shuffled].slice(0, 4)
}

/**
 * Çekirdek veriden tam Service nesnesi üretir.
 */
function buildService(seed: ServiceSeed, index: number, citySlugs: string[]): Service {
  return {
    id: index + 1,
    slug: seed.slug,
    title: seed.title,
    shortTitle: seed.shortTitle,
    category: seed.category,
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: seed.secondaryKeywords,
    metaTitle: buildMetaTitle(seed),
    metaDescription: buildMetaDescription(seed),
    h1: buildH1(seed),
    summary: seed.summary,
    heroTagline: seed.heroTagline,
    description: seed.description,
    whyNeeded: buildWhyNeeded(seed),
    scope: seed.scope,
    process: buildProcess(seed),
    benefits: buildBenefits(seed),
    targetAudience: seed.targetAudience,
    faq: buildFaq(seed),
    image: buildImage(seed),
    relatedServices: seed.relatedServices.filter((slug) => slug !== seed.slug),
    relatedCities: buildRelatedCities(seed, citySlugs),
    schemaType: resolveSchemaType(seed),
    icon: seed.icon,
    localPriority: seed.localPriority ?? false,
    imageQuery: seed.imageQuery,
  }
}

// ---------------------------------------------------------------------------
// DIŞA AKTARILAN VERİ
// ---------------------------------------------------------------------------

/** Şehir slug listesi — döngüsel import’u önlemek için yerel sabit */
const PRIORITY_CITY_SLUGS = [
  'istanbul', 'ankara', 'izmir', 'antalya', 'bursa', 'kocaeli',
  'gaziantep', 'konya', 'adana', 'kayseri', 'eskisehir', 'denizli',
]

export const services: Service[] = SEEDS.map((seed, index) =>
  buildService(seed, index, PRIORITY_CITY_SLUGS),
)

export const serviceCount = services.length

export const servicesBySlug: Record<string, Service> = Object.fromEntries(
  services.map((service) => [service.slug, service]),
)

export const serviceSlugs = services.map((service) => service.slug)

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesBySlug[slug]
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category)
}

export function getCategoryCounts(): Record<ServiceCategory, number> {
  return services.reduce(
    (acc, service) => {
      acc[service.category] = (acc[service.category] ?? 0) + 1
      return acc
    },
    {} as Record<ServiceCategory, number>,
  )
}

/** Ana sayfadaki 5 büyük blok: web / yazılım+saas / seo / otomasyon+altyapi+ai */
export const HOMEPAGE_CATEGORY_GROUPS = [
  { key: 'web', label: 'Web Siteleri', categories: ['web'] as ServiceCategory[] },
  { key: 'yazilim', label: 'Özel Yazılım & Paneller', categories: ['yazilim', 'saas'] as ServiceCategory[] },
  { key: 'seo', label: 'SEO Hizmetleri', categories: ['seo'] as ServiceCategory[] },
  { key: 'otomasyon', label: 'Otomasyon, Altyapı & AI', categories: ['otomasyon', 'altyapi', 'ai'] as ServiceCategory[] },
]

export function getServicesForGroup(categories: ServiceCategory[]): Service[] {
  return services.filter((service) => categories.includes(service.category))
}

export function getRelatedServices(service: Service, limit = 6): Service[] {
  const direct = service.relatedServices
    .map((slug) => servicesBySlug[slug])
    .filter((item): item is Service => Boolean(item))
  if (direct.length >= limit) return direct.slice(0, limit)

  const sameCategory = getServicesByCategory(service.category).filter(
    (item) => item.slug !== service.slug && !direct.some((d) => d.slug === item.slug),
  )
  const merged = [...direct, ...sameCategory]
  if (merged.length >= limit) return merged.slice(0, limit)

  const others = services.filter(
    (item) => item.slug !== service.slug && !merged.some((m) => m.slug === item.slug),
  )
  const rand = seededRandom(hashString(`${service.slug}-related`))
  return [...merged, ...others.sort(() => rand() - 0.5)].slice(0, limit)
}

/** Lokal SEO: hizmet + şehir kombinasyonu üretilecek hizmetler */
export const localPriorityServices = services.filter((service) => service.localPriority)

export function isLocalPriorityService(slug: string): boolean {
  return Boolean(servicesBySlug[slug]?.localPriority)
}

/**
 * Hizmet + şehir kombinasyonu üretilecek hizmetler.
 * 5 hizmet × 12 öncelikli şehir = 60 lokal kombinasyon sayfası.
 * `dijital-otomasyon` localPriority olsa da kombinasyon üretmez (şehir sayfalarından linklenir).
 */
export const LOCAL_COMBO_SERVICE_SLUGS = [
  'kurumsal-web-sitesi',
  'e-ticaret-sitesi',
  'crm',
  'lokal-seo',
  'dijital-donusum',
] as const

/** Hizmet + şehir kombinasyonu üretilecek hizmet objeleri */
export const localComboServices: Service[] = LOCAL_COMBO_SERVICE_SLUGS.map(
  (slug) => servicesBySlug[slug],
).filter(Boolean) as Service[]

/** Hizmetin şehir kombinasyonu için uygun şehirler */
export function getLocalCitiesForService(service: Service, citySlugs: string[]): string[] {
  if (!(LOCAL_COMBO_SERVICE_SLUGS as readonly string[]).includes(service.slug)) return []
  const ordered = [
    ...service.relatedCities.filter((slug) => citySlugs.includes(slug)),
    ...citySlugs.filter((slug) => !service.relatedCities.includes(slug)),
  ]
  return ordered.slice(0, citySlugs.length)
}

/** Üretilecek tüm hizmet+şehir kombinasyonları (statik sayfa listesi) */
export function getLocalServiceCombos(citySlugs: string[]): Array<{ service: Service; citySlug: string }> {
  return localComboServices.flatMap((service) =>
    getLocalCitiesForService(service, citySlugs).map((citySlug) => ({ service, citySlug })),
  )
}

/** Anahtar kelime tabanlı basit arama (site içi arama / öneri) */
export function searchServices(query: string, limit = 8): Service[] {
  const q = query.toLocaleLowerCase('tr-TR').trim()
  if (!q) return services.slice(0, limit)
  const scored = services
    .map((service) => {
      let score = 0
      const haystack = [
        service.title,
        service.shortTitle,
        service.primaryKeyword,
        ...service.secondaryKeywords,
        service.summary,
      ]
        .join(' ')
        .toLocaleLowerCase('tr-TR')
      if (haystack.includes(q)) score += 3
      if (service.primaryKeyword.toLocaleLowerCase('tr-TR').includes(q)) score += 4
      if (service.title.toLocaleLowerCase('tr-TR').includes(q)) score += 2
      if (service.slug.includes(q)) score += 1
      return { service, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((item) => item.service)
}

export { SEEDS as SERVICE_SEEDS, CATEGORY_LABEL }

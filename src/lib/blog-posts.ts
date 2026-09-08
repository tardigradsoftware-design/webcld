// src/lib/blog-posts.ts
// SEO hedefli blog yazıları — her yazı hizmet ve şehir sayfalarına iç link içerir.

import type { BlogPost } from '@/types'
import { hashString, seededRandom } from '@/lib/utils'

const AUTHOR = 'Tardigrad Software Editör Ekibi'

interface PostSeed {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: string
  tags: string[]
  publishedAt: string
  relatedServices: string[]
  relatedCities: string[]
  content: string
}

const SEEDS: PostSeed[] = [
  {
    slug: 'kurumsal-web-sitesi-yaptirmadan-once',
    title: 'Kurumsal Web Sitesi Yaptırmadan Önce Bilinmesi Gereken 10 Nokta',
    metaTitle: 'Kurumsal Web Sitesi Yaptırmadan Önce 10 Kritik Nokta',
    metaDescription:
      'Kurumsal web sitesi yaptırmadan önce bilmeniz gereken 10 nokta: kapsam, fiyat, SEO, hız, içerik, bakım ve doğru ajans seçimi.',
    excerpt:
      'Web sitesi yatırımında en sık yapılan hataları ve bunlardan nasıl kaçınacağınızı 10 başlıkta topladık.',
    category: 'Web Siteleri',
    tags: ['kurumsal web sitesi', 'web tasarım', 'SEO', 'fiyatlandırma'],
    publishedAt: '2026-01-12T09:00:00.000Z',
    relatedServices: ['kurumsal-web-sitesi', 'firma-web-sitesi', 'web-sitesi-yenileme', 'teknik-seo'],
    relatedCities: ['istanbul', 'ankara', 'izmir'],
    content: `## Web sitesi bir gider değil, satış aracıdır

Kurumsal web sitesi yaptırmayı düşünen işletmelerin büyük bölümü bu işi bir "gider kalemi" olarak görüyor. Oysa doğru kurgulanmış bir site; Google'dan sürekli müşteri getiren, satış ekibinizin ikna süresini kısaltan ve marka itibarınızı taşıyan bir varlıktır. Bu yüzden ilk soru "Ne kadar tutar?" değil, "Bu site hangi iş problemini çözecek?" olmalıdır.

Tardigrad Software olarak her projeye bu soruyla başlıyoruz. Hedef netleşmeden belirlenen bütçeler, genellikle kullanılmayan özelliklere harcanır.

## 1. Hedefi ve başarı kriterini baştan tanımlayın

Sitenin amacı teklif toplamak mı, marka bilinirliği mi, online satış mı, yoksa bayi bilgilendirmesi mi? Her hedef farklı bir sayfa mimarisi, farklı bir CTA yerleşimi ve farklı ölçüm kurgusu gerektirir. Hedefi tek cümlede yazamıyorsanız kapsam da netleşmez.

Ölçülebilir bir başarı kriteri koyun: "Ayda 40 nitelikli form", "organik trafikte 6 ayda %50 artış" gibi. Böylece proje sonunda neyi başardığınızı sayılarla görebilirsiniz.

## 2. Sayfa sayısı değil, sayfa görevi önemlidir

"20 sayfalık site" diye bir satın alma kriteri yoktur. Her sayfanın bir görevi olmalıdır: hizmet sayfası talebi yakalar, referans sayfası güven verir, blog sayfası organik trafik getirir. Görevi olmayan sayfalar hem bakım yükü hem tarama bütçesi israfıdır.

Hizmet sayfalarınızı gerçek arama sorgularına göre planlayın. Örneğin "kurumsal web sitesi" ve "firma web sitesi" farklı sorgulardır ve farklı sayfalara ihtiyaç duyar.

## 3. Tasarım kadar hız da bir tasarım kararıdır

Bir sitenin 3 saniyede açılması ile 1 saniyede açılması arasındaki fark, dönüşüm oranında çift haneli değişimler yaratır. Google'ın Core Web Vitals metrikleri (LCP, CLS, INP) artık doğrudan sıralama sinyalidir.

Hız; görsel optimizasyonu (WebP), doğru font yükleme stratejisi, gereksiz JavaScript'in kaldırılması ve CDN kullanımıyla sağlanır. Bu maddeler tasarım aşamasında konuşulmazsa sonradan eklemek zorlaşır.

## 4. SEO temeli sonradan eklenmez

Teknik SEO; URL yapısı, canonical etiketleri, sitemap, robots, iç link mimarisi ve schema.org yapısal verisinden oluşur. Bu katman sitenin iskeletidir ve baştan kurgulanmalıdır.

Site yayına alındıktan sonra eklenen bir schema işaretleme, en baştan tasarlanmış bir yapı kadar tutarlı olmaz. Bu yüzden ajansınıza "yapısal veri ekliyor musunuz?" diye mutlaka sorun.

## 5. İçerik sorumluluğunu netleştirin

Projelerin en sık gecikme nedeni içeriktir. Metinleri kim yazacak, görseller nereden gelecek, kaç revizyon hakkı var? Bunlar sözleşmede yazmazsa takvim kayar.

İçerik üretimi konusunda destek alacaksanız, metinlerin hedef anahtar kelimelerle uyumlu üretilmesini isteyin. Rastgele yazılmış metinler trafik getirmez.

## 6. Yönetim paneli olmadan site yaşlanmaz

Yeni bir kampanya, bir duyuru veya bir referans eklemek için her seferinde ajansı aramak zorunda kalıyorsanız siteniz kısa sürede güncelliğini yitirir. Yönetim paneli, ekibinizin teknik bilgiye ihtiyaç duymadan içerik güncelleyebilmesini sağlar.

Panel tasarımında en sık yapılan işlemlerin kaç adımda tamamlandığına bakın. Beş tıklama yerine iki tıklama, uzun vadede ciddi zaman kazandırır.

## 7. Mobil deneyim ayrı bir tasarım işidir

Türkiye'de aramaların büyük bölümü mobil cihazlardan yapılıyor. Masaüstü tasarımın küçültülmüş hâli mobil deneyim değildir. Buton boyutları, form alanları, menü davranışı ve okuma sırası mobil için ayrıca tasarlanmalıdır.

Teklif alırken mobil tasarımın kapsamda olduğunu yazılı olarak doğrulayın.

## 8. Sahiplik, erişim ve taşınabilirlik

Alan adı kimin adına kayıtlı? Hosting hesabına kimin erişimi var? Kodlar size teslim edilecek mi? Bu sorular proje sonunda değil, başında sorulmalıdır.

Tardigrad Software olarak tüm projelerde depo, alan adı ve altyapı hesaplarını müşteri adına kuruyor, proje sonunda kaynak kodları teslim ediyoruz. Bağımlılık yaratan modeller uzun vadede müşteriye zarar verir.

## 9. Fiyat teklifini kalem kalem isteyin

"Web sitesi: X TL" şeklinde bir teklif, kapsam belirsizliğinin işaretidir. Tasarım, geliştirme, içerik, SEO, hosting, bakım kalemleri ayrı ayrı yazılmalıdır. Böylece neye para ödediğinizi bilir, gerekirse kapsamı kendiniz daraltabilirsiniz.

En ucuz teklif genellikle en pahalı olandır: eksik kapsam sonradan ek maliyet olarak geri döner.

## 10. Yayın sonrası destek ve bakım planı

Site yayına alındığı gün bitmez; o gün başlar. Güvenlik güncellemeleri, yedekleme, hız izleme, küçük içerik değişiklikleri ve SEO takibi sürekli işlerdir.

Bakım paketinin kapsamını sorun: neler dahil, yanıt süresi ne kadar, acil durumda nasıl ulaşacaksınız?

## Doğru ajansı nasıl seçersiniz?

- Kendi web sitelerinin hız skoruna bakın. Kendi sitesi yavaş olan bir ekipten hızlı site beklemeyin.
- Daha önce benzer sektörde iş yapıp yapmadıklarını sorun.
- Süreçlerini anlatmalarını isteyin: analiz, tasarım, geliştirme, test, yayın, bakım.
- Referanslarla konuşma imkânı isteyin.
- Sözleşmede kapsam, takvim, revizyon hakkı ve sahiplik maddelerinin olduğundan emin olun.

## Sonuç: planlı bir yatırım, ölçülebilir sonuç

Kurumsal web sitesi; doğru hedef, net kapsam, sağlam teknik temel ve sürekli bakım ile birleştiğinde işletmenizin en verimli satış kanalı olur. Aceleyle verilen kararlar ise yıllarca taşıyacağınız bir yüke dönüşür.

Ücretsiz ön analiz hizmetimizde mevcut durumunuzu değerlendiriyor, hedeflerinize uygun kapsam ve bütçe önerisini yazılı olarak paylaşıyoruz. İstanbul, Ankara ve İzmir başta olmak üzere Türkiye'nin 81 ilindeki işletmelerle uzaktan çalışıyoruz.

İlgili hizmetler: kurumsal web sitesi, firma web sitesi, web sitesi yenileme ve teknik SEO.`,
  },
  {
    slug: 'e-ticaret-sitesi-nasil-kurulur',
    title: 'E-Ticaret Sitesi Nasıl Kurulur? SEO Uyumlu Kontrol Listesi',
    metaTitle: 'E-Ticaret Sitesi Nasıl Kurulur? SEO Kontrol Listesi',
    metaDescription:
      'E-ticaret sitesi kurulumu adım adım: altyapı seçimi, ürün mimarisi, ödeme entegrasyonu, hız ve SEO uyumlu kontrol listesi.',
    excerpt:
      'Sıfırdan e-ticaret sitesi kurarken atlanmaması gereken adımlar ve yayın öncesi SEO kontrol listesi.',
    category: 'E-Ticaret',
    tags: ['e-ticaret', 'SEO', 'ödeme entegrasyonu', 'dönüşüm optimizasyonu'],
    publishedAt: '2026-01-26T09:00:00.000Z',
    relatedServices: ['e-ticaret-sitesi', 'teknik-seo', 'stok-yonetimi', 'odeme-whatsapp-crm-entegrasyonu'],
    relatedCities: ['istanbul', 'bursa', 'izmir'],
    content: `## E-ticaret sitesi kurmak bir teknoloji işi değil, süreç işidir

E-ticaret sitesi kurulumu denildiğinde akla önce yazılım gelir. Oysa başarılı bir online mağaza; ürün verisi, fiyatlandırma, lojistik, ödeme, müşteri iletişimi ve pazarlama süreçlerinin birbiriyle uyumlu çalışmasıyla oluşur. Teknoloji bu süreci taşır, ama sürecin kendisi değildir.

Bu yazıda kurulumu dokuz adımda ele alacak, sonunda yayın öncesi kullanabileceğiniz bir kontrol listesi paylaşacağız.

## 1. Adım: İş modelinizi ve hedef kitlenizi tanımlayın

Perakende mi, toptan mı satış yapacaksınız? Son kullanıcıya mı, bayilere mi? Hangi kategoride, hangi fiyat segmentinde? Bu sorular altyapı seçiminden kategori mimarisine kadar her kararı etkiler.

B2B satış yapan bir firma ile son kullanıcıya satan bir markanın ihtiyaçları tamamen farklıdır: B2B'de cari hesap, limit, vade ve müşteriye özel fiyat gerekir.

## 2. Adım: Altyapı seçimi

Üç ana seçenek vardır:

- **Hazır e-ticaret paketleri:** Hızlı başlangıç, aylık ücret, sınırlı özelleştirme.
- **Açık kaynak platformlar:** Esnek ama bakım ve geliştirme yükü sizde.
- **Özel geliştirme (Next.js + Supabase gibi):** Tam kontrol, yüksek hız, ölçeklenebilirlik; başlangıç maliyeti daha yüksek.

Ürün sayınız az ve süreçleriniz standart ise hazır paket yeterlidir. Kendi iş akışınız, entegrasyon ihtiyaçlarınız veya performans hedefleriniz varsa özel geliştirme uzun vadede daha ekonomiktir.

## 3. Adım: Kategori ve ürün mimarisi

Kategori ağacını arama sorgularına göre kurun. Kullanıcılar "erkek spor ayakkabı" diye arar, "AYK-2024-K" diye aramaz. URL yapısı okunabilir olmalı: /kategori/alt-kategori/urun-adi/

Her ürün için benzersiz başlık, açıklama, görsel ve teknik özellik tanımlayın. Üreticiden alınan kopya açıklamalar hem SEO'ya zarar verir hem dönüşümü düşürür.

## 4. Adım: Ürün sayfalarını ikna edecek şekilde tasarlayın

Bir ürün sayfasının görevi sepete ekletmektir. Bunun için:

- İlk ekranda net fiyat, stok durumu ve "Sepete Ekle" butonu
- Yüksek çözünürlüklü, birden çok açıdan görsel (WebP formatında)
- Varyant seçimi (beden, renk) anlaşılır ve hızlı
- Kargo süresi ve iade koşulları görünür
- Soru-cevap ve değerlendirme bölümü
- Benzer ve tamamlayıcı ürün önerileri

## 5. Adım: Sepet ve ödeme akışını sadeleştirin

Sepet terk oranı e-ticaretin en pahalı sorunudur. Terklerin önemli kısmı teknik sürtünmeden kaynaklanır: zorunlu üyelik, uzun formlar, beklenmedik kargo ücreti, güvensiz ödeme ekranı.

Çözüm: misafir checkout seçeneği, tek sayfa veya en fazla üç adımlı ödeme, kargo ücretini sepette erken gösterme, birden çok ödeme yöntemi ve güven rozetleri.

## 6. Adım: Ödeme ve kargo entegrasyonları

Sanal POS entegrasyonunda 3D Secure, taksit seçenekleri ve hata yönetimi kritik önemdedir. Başarısız ödeme denemeleri için otomatik yeniden deneme ve kullanıcıya bildirim akışı kurun.

Kargo tarafında barkod üretimi, takip numarasının otomatik gönderimi ve teslimat durumu bildirimleri müşteri deneyimini belirgin şekilde iyileştirir.

## 7. Adım: Stok, sipariş ve muhasebe bağlantısı

E-ticaret sitesi tek başına çalışmaz. Stok yönetimi, sipariş takibi, fatura üretimi ve muhasebe kaydı ile bağlantılı olmalıdır. Aynı ürünün hem pazar yerinde hem kendi sitenizde satılması, senkronizasyon kurulmadığında çift satış riskini doğurur.

Bu entegrasyonları baştan planlayın; sonradan eklemek veri temizliği gerektirir.

## 8. Adım: Hız ve performans

E-ticaret sitelerinde hız doğrudan gelir demektir. Hedefleriniz şu olmalı: LCP < 2.5 saniye, CLS < 0.1, INP < 200 ms.

Bunun için: WebP/AVIF görseller, next/image ile otomatik boyutlandırma, kritik CSS, CDN (Cloudflare), veritabanı indeksleri ve önbellekleme. Liste sayfalarında sayfalama ve lazy loading kullanın.

## 9. Adım: SEO ve ölçüm

- Her ürün ve kategori sayfası için benzersiz title ve meta description
- Product, Offer, BreadcrumbList ve AggregateRating şemaları
- XML sitemap (ürün, kategori ve içerik sayfaları ayrı)
- Kırık link ve yetim sayfa kontrolü
- GA4 e-ticaret olayları: view_item, add_to_cart, begin_checkout, purchase
- Search Console kurulumu ve indexleme takibi

## Yayın öncesi SEO ve kalite kontrol listesi

**Teknik**
- [ ] Mobil, tablet ve masaüstünde tüm akışlar test edildi
- [ ] Core Web Vitals hedefleri karşılanıyor
- [ ] HTTPS ve güvenlik başlıkları yapılandırıldı
- [ ] 404 ve yönlendirme kuralları çalışıyor
- [ ] Yedekleme ve izleme aktif

**İçerik**
- [ ] Tüm ürünlerde benzersiz başlık ve açıklama
- [ ] Görseller optimize edilmiş ve alt metinli
- [ ] Kategori metinleri yazılmış
- [ ] İade, teslimat, KVKK ve mesafeli satış sözleşmesi sayfaları yayında

**SEO**
- [ ] Schema işaretlemeleri doğrulandı
- [ ] Sitemap Search Console'a gönderildi
- [ ] Canonical etiketleri kontrol edildi
- [ ] İç linkler kuruldu (kategori → ürün, blog → ürün)

**Ölçüm**
- [ ] GA4 e-ticaret olayları çalışıyor
- [ ] Dönüşüm hunisi tanımlandı
- [ ] Piksel ve reklam dönüşümleri doğrulandı

## Sonuç

E-ticaret sitesi kurulumu bir seferlik bir iş değil, sürekli iyileştirilen bir operasyondur. İlk yayında mükemmeli hedeflemek yerine ölçüm altyapısını kurup verilerle iyileştirmek çok daha verimli sonuç verir.

Türkiye genelinde e-ticaret projeleri geliştiriyor; stok yönetimi, sipariş takibi, ödeme entegrasyonu ve SEO çalışmalarını tek ekip olarak yürütüyoruz. İstanbul, Bursa ve İzmir'deki üretici ve perakende firmalarıyla aktif çalışıyoruz.`,
  },
  {
    slug: 'lokal-seo-stratejisi',
    title: "Lokal SEO ile Google'da İlk Sayfaya Çıkma Stratejisi",
    metaTitle: "Lokal SEO Stratejisi: Google'da İlk Sayfaya Çıkın",
    metaDescription:
      'Lokal SEO nasıl yapılır? Google Business Profile, NAP tutarlılığı, şehir sayfaları, yorum yönetimi ve yerel yapısal veri rehberi.',
    excerpt:
      'Şehrinizde arama yapan müşterilere görünür olmanın adım adım yol haritası ve ölçüm yöntemleri.',
    category: 'SEO',
    tags: ['lokal SEO', 'Google Business Profile', 'yapısal veri', 'yerel arama'],
    publishedAt: '2026-02-09T09:00:00.000Z',
    relatedServices: ['lokal-seo', 'teknik-seo', 'seo-danismanligi', 'schema-org-structured-data'],
    relatedCities: ['istanbul', 'izmir', 'antalya', 'bursa'],
    content: `## Lokal arama, en yüksek niyetli trafiktir

"yakınımdaki diş kliniği", "İstanbul kurumsal web sitesi", "Ankara CRM yazılımı" gibi sorgular, kullanıcının satın alma kararına en yakın olduğu anlardır. Bu sorgularda görünmeyen bir işletme, rakibine hazır müşteri teslim eder.

Lokal SEO; teknik optimizasyon, içerik, profil yönetimi ve itibar çalışmalarının birlikte yürütüldüğü bir disiplindir. Tek bir adımla sonuç alınmaz.

## 1. Google Business Profile: yerel görünürlüğün temeli

Yerel arama sonuçlarının üstünde çıkan harita paketi (local pack), büyük ölçüde Google Business Profile verisine dayanır. Profilinizde şunlar eksiksiz olmalı:

- İşletme adı (anahtar kelime doldurmadan, gerçek adınızla)
- Kategori ve alt kategoriler
- Adres veya hizmet bölgesi
- Telefon ve web sitesi
- Çalışma saatleri ve özel günler
- En az 10-15 gerçek fotoğraf
- Hizmet ve ürün listesi
- Soru-cevap bölümünün doldurulması

Profili oluşturmak yetmez; düzenli güncelleme ve etkileşim sıralamayı etkiler.

## 2. NAP tutarlılığı

NAP = Name, Address, Phone. Bu üç bilginin web sitenizde, Google profilinizde, dizinlerde ve sosyal medya hesaplarında birebir aynı olması gerekir. "Cad." ile "Caddesi", farklı telefon formatları veya eski adresler güven sinyalini zayıflatır.

Bir denetim yapın: işletmenizi internette arayın, bulunduğunuz tüm platformlarda bilgileri karşılaştırın ve tutarsızlıkları düzeltin.

## 3. Yerel yapısal veri (LocalBusiness schema)

Web sitenize JSON-LD formatında LocalBusiness veya ProfessionalService şeması ekleyin. Bu şema; işletme adı, adres, koordinat, çalışma saatleri, telefon ve hizmet bölgesini makine tarafından okunabilir hâle getirir.

Şemayı ekledikten sonra Google Zengin Sonuçlar Testi ile doğrulayın. Hatalı şema, hiç şema olmamasından daha risklidir.

## 4. Şehir ve ilçe bazlı içerik sayfaları

Lokal görünürlük için "İstanbul" sayfası yetmez. Hizmet + şehir kombinasyonları ve ilçe bazlı sayfalar uzun kuyruk aramaları yakalar:

- /sehir/istanbul/
- /hizmet/kurumsal-web-sitesi/istanbul/
- /hizmet/lokal-seo/izmir/

Burada en kritik nokta özgünlüktür. Aynı metni şehir adıyla değiştirerek çoğaltmak "doorway page" olarak değerlendirilir ve fayda yerine zarar getirir. Her sayfa o şehrin sektör yapısını, işletme ihtiyaçlarını ve gerçek kullanım senaryolarını anlatmalıdır.

## 5. Yerel anahtar kelime haritası

Her sorgu bir sayfaya hizmet etmeli. "ankara web tasarım" sorgusunu hem ana sayfada hem hizmet sayfasında hem blog yazısında hedeflerseniz sayfalar birbirini yer (kanibalizasyon).

Bir tablo oluşturun: sorgu → hedef sayfa → arama hacmi → mevcut konum → öncelik. Bu tablo tüm içerik planınızın temelidir.

## 6. Yorum stratejisi

Yorum sayısı ve puanı, yerel sıralamada doğrudan etkili. Amaç satın alınmış değil, gerçek ve sürekli yorum akışıdır:

- Hizmet tamamlandığında otomatik yorum talebi gönderin (e-posta veya WhatsApp)
- QR kod ile doğrudan yorum sayfasına yönlendirin
- Tüm yorumlara (olumlu ve olumsuz) 48 saat içinde yanıt verin
- Yanıtlarda doğal dilde hizmet adını geçirin

Sahte yorum satın almak profil cezasına yol açabilir; bu riske girmeyin.

## 7. Yerel bağlantılar (backlink)

Yerel otorite için yerel kaynaklardan bağlantı değerlidir: ticaret odası ve meslek kuruluşları, yerel haber siteleri, sektör dizinleri, sponsorluklar, tedarikçi ve bayi sayfaları. Kalite, miktardan önemlidir.

## 8. Mobil deneyim ve tıklama aksiyonları

Yerel aramaların büyük bölümü mobilden yapılır ve kullanıcı hemen aksiyon almak ister. Sitenizde "tıkla-ara" bağlantısı, yol tarifi butonu ve WhatsApp ile hızlı iletişim olmalıdır. Bu aksiyonlar hem dönüşümü hem yerel sinyal gücünü artırır.

## 9. Ölçüm: neyi takip etmelisiniz?

- Search Console'da yerel sorguların gösterim ve tıklama sayısı
- Google Business Profile etkileşimleri (arama, yol tarifi, site tıklaması)
- GA4'te telefon tıklama ve form gönderim olayları
- Harita paketi konum takibi (şehir + sorgu bazlı)
- Yorum sayısı, puanı ve yanıt süresi

Aylık bir rapor ile bu metrikleri takip etmeden lokal SEO çalışması yönlendirilemez.

## 90 günlük örnek yol haritası

**1. ay:** Profil optimizasyonu, NAP denetimi, teknik SEO düzeltmeleri, LocalBusiness şeması, ilk 5 şehir sayfası.
**2. ay:** Hizmet + şehir kombinasyon sayfaları, içerik üretimi, yorum toplama akışının kurulması, yerel dizin kayıtları.
**3. ay:** İlçe bazlı sayfalar, yerel bağlantı çalışması, performans analizi ve optimizasyon turu.

## Sonuç

Lokal SEO sabır ve süreklilik ister; ancak doğru uygulandığında en düşük maliyetli müşteri edinme kanallarından biridir. Reklam bütçesi bittiğinde trafik durur, yerel görünürlük kalıcıdır.

Tardigrad Software olarak İstanbul, Ankara, İzmir, Antalya, Bursa ve Kocaeli başta olmak üzere Türkiye'nin 81 ilinde lokal SEO, şehir sayfaları ve yapısal veri çalışmaları yürütüyoruz.`,
  },
  {
    slug: 'crm-ile-musteri-kaybi-onleme',
    title: 'CRM Sistemi ile Müşteri Kaybını Önleme Yolları',
    metaTitle: 'CRM ile Müşteri Kaybını Önleme: 7 Etkili Yöntem',
    metaDescription:
      'CRM sistemi müşteri kaybını nasıl önler? Lead takibi, hatırlatmalar, satış hunisi, churn analizi ve otomasyon yöntemleri.',
    excerpt:
      'Müşteri kayıplarının gerçek nedenleri ve CRM ile bu kayıpları nasıl durduracağınız üzerine pratik bir rehber.',
    category: 'Yazılım',
    tags: ['CRM', 'müşteri yönetimi', 'satış otomasyonu', 'churn'],
    publishedAt: '2026-02-23T09:00:00.000Z',
    relatedServices: ['crm', 'musteri-yonetim-sistemi', 'teklif-hazirlama-sistemi', 'dijital-otomasyon'],
    relatedCities: ['istanbul', 'ankara', 'gaziantep'],
    content: `## Müşteri kaybı genellikle bir olay değil, bir süreçtir

Bir müşteri nadiren tek bir sebeple gider. Genellikle: geç dönüş yapılır, talebi unutulur, aynı soruyu üç kez anlatmak zorunda kalır, fiyat konusunda belirsizlik yaşar ve sonunda sessizce rakibe geçer. Bu zincir halkalarının her biri ölçülebilir ve önlenebilir.

CRM sistemi tam olarak burada devreye girer: ilişkiyi kişilerin hafızasından çıkarıp kurumun sistemine taşır.

## 1. Lead kaybının en yaygın nedeni: geç dönüş

Araştırmalar, ilk 5 dakika içinde dönüş yapılan lead'lerin kapanma olasılığının kat kat yüksek olduğunu gösteriyor. Telefon ve WhatsApp'tan gelen talepler bir deftere yazıldığında ise bu hız imkânsızdır.

**Çözüm:** Tüm lead kaynaklarını (web formu, WhatsApp, e-posta, telefon, sosyal medya) tek kayıt noktasında toplayın. Form doldurulduğu saniye kayıt açılsın, otomatik olarak bir temsilciye atansın ve bildirim gitsin.

## 2. Takipsizlik: sıcak lead'i soğutmak

Görüşme yapıldı, teklif gönderildi ve sonra... sessizlik. Çoğu satış kaybı burada yaşanır. Takip hatırlatması olmayan sistemlerde temsilci meşgul olduğunda fırsat kendiliğinden ölür.

**Çözüm:** Her aşama için otomatik takip görevi oluşturun. "Teklif gönderildi + 2 gün → ara", "Görüşme yapıldı + 1 hafta → durum sor". Sistem hatırlattığında unutmak mümkün olmaz.

## 3. Bilginin kişilere bağımlı olması

Müşteri ilişkisi bir çalışanın telefonunda, not defterinde veya hafızasında duruyorsa, o çalışan ayrıldığında ilişki de gider. Daha kötüsü: müşteri aynı hikâyeyi yeni kişiye baştan anlatmak zorunda kalır.

**Çözüm:** Tüm etkileşimleri (arama, e-posta, WhatsApp, toplantı notu, teklif) tek bir zaman çizelgesinde saklayın. Böylece herhangi bir temsilci kaydı açtığında tam geçmişe 10 saniyede ulaşır.

## 4. Satış hunisinin görünmemesi

"Bu ay kaç fırsat var, hangileri kapanmak üzere, neden kaybettik?" sorularına cevap veremiyorsanız yönetim sezgiyle çalışıyor demektir.

**Çözüm:** Huniyi aşamalara ayırın (yeni lead, iletişim kuruldu, ihtiyaç analiz edildi, teklif verildi, pazarlık, kazanıldı/kaybedildi). Her aşamadaki fırsat sayısını, ortalama bekleme süresini ve dönüşüm oranını izleyin. Kayıp nedenlerini zorunlu alan olarak kaydedin.

## 5. Fiyat ve teklif tutarsızlığı

Aynı ürün için farklı temsilcilerin farklı fiyat vermesi, müşteri güvenini zedeler ve pazarlık gücünüzü düşürür. Excel'de hazırlanan tekliflerde hata riski de yüksektir.

**Çözüm:** Teklif hazırlama modülü ile katalog fiyatlarını, iskonto limitlerini ve onay kurallarını sisteme tanımlayın. Teklif tek tıkla profesyonel PDF olarak üretilsin, gönderildiğinde müşteriye bildirilsin ve görüntülenme anı takip edilsin.

## 6. Mevcut müşteriyi elde tutmanın ihmal edilmesi

Yeni müşteri kazanmak, mevcut müşteriyi elde tutmaktan belirgin şekilde daha maliyetlidir. Buna rağmen çoğu işletme tüm enerjisini yeni lead'lere harcar.

**Çözüm:** CRM'de churn riski göstergeleri tanımlayın: son alışverişten geçen süre, destek talebi sayısı, ödeme gecikmesi, etkileşim sıklığı. Risk eşikleri aşıldığında otomatik görev oluşturun ve elde tutma aksiyonu (özel teklif, arama, anket) tetikleyin.

## 7. Veriye dayalı iyileştirme yapılmaması

CRM kurmak tek başına sonuç üretmez; verisini okumak gerekir. Hangi kaynak daha kaliteli lead getiriyor? Hangi temsilcinin kapanma oranı yüksek? Hangi aşamada en çok fırsat düşüyor?

**Çözüm:** Aylık bir dashboard ile bu soruları cevaplayın. Kaynak bazlı dönüşüm oranı, temsilci performansı, ortalama satış döngüsü ve kayıp nedenleri dağılımı en değerli dört grafiktir.

## Özel CRM mi, hazır CRM mi?

Hazır CRM'ler hızlı başlangıç sağlar. Ancak şu durumlarda özel geliştirme daha avantajlıdır:

- Satış süreciniz standart aşamalara uymuyorsa
- Kullanıcı başı lisans maliyeti büyüyorsa
- Kendi modüllerinizle (stok, sipariş, teklif) entegrasyon gerekiyorsa
- Verinin sizin altyapınızda kalması kritikse
- Arayüz karmaşası nedeniyle ekip sistemi kullanmıyorsa

Tardigrad Software olarak işletmenizin gerçek satış akışına göre şekillenen özel CRM sistemleri geliştiriyoruz. Supabase/PostgreSQL altyapısı, rol bazlı yetkilendirme ve KVKK uyumlu veri işleme standart olarak gelir.

## Uygulamaya nereden başlamalı?

1. Mevcut müşteri ve lead verinizi tek dosyada toplayın (temizlik fırsatı).
2. Satış aşamalarınızı yazılı hâle getirin.
3. En çok kayıp yaşanan iki aşamayı belirleyin.
4. Bu iki aşama için otomasyon ve hatırlatma kurallarını tanımlayın.
5. Ölçün: 30 gün sonra aynı aşamalardaki dönüşüm oranını karşılaştırın.

Küçük başlayıp ölçerek büyütmek, büyük patlamalı geçişlerden çok daha başarılı sonuç verir.

## Sonuç

Müşteri kaybı kader değildir. Görünürlük, disiplin ve otomasyon ile önlenebilir. İstanbul, Ankara ve Gaziantep'teki satış organizasyonlarıyla yürüttüğümüz projelerde en sık gördüğümüz kazanım, kayıp lead oranındaki düşüş ve satış döngüsünün kısalmasıdır.`,
  },
  {
    slug: 'teklif-hazirlama-sistemi-faydalari',
    title: 'Teklif Hazırlama Sistemi İşletmenize Ne Kazandırır?',
    metaTitle: 'Teklif Hazırlama Sistemi: 6 Somut Kazanım',
    metaDescription:
      'Teklif hazırlama sistemi işletmenize ne kazandırır? Hız, fiyat disiplini, takip, arşiv, onay akışı ve kazanma oranı etkileri.',
    excerpt:
      'Word ve Excel ile teklif hazırlamanın gizli maliyetleri ve otomatik teklif sisteminin ölçülebilir faydaları.',
    category: 'Yazılım',
    tags: ['teklif yönetimi', 'satış otomasyonu', 'CRM', 'verimlilik'],
    publishedAt: '2026-03-09T09:00:00.000Z',
    relatedServices: ['teklif-hazirlama-sistemi', 'crm', 'proforma-siparis-yonetimi', 'dijital-otomasyon'],
    relatedCities: ['istanbul', 'kocaeli', 'kayseri'],
    content: `## Teklif, satış sürecinin en kritik belgesidir

Müşteri kararını çoğu zaman teklifinize bakarak verir. Buna rağmen teklif hazırlama, birçok işletmede hâlâ Word şablonları, Excel fiyat listeleri ve kopyala-yapıştır ile yürütülür. Bu yöntem yavaş, hataya açık ve izlenemezdir.

Peki bu dağınıklığın gerçek maliyeti nedir?

## Gizli maliyet 1: Zaman

Bir teklifin hazırlanması; doğru fiyat listesini bulma, kalemleri yazma, hesapları kontrol etme, formatı düzeltme, PDF'e çevirme ve e-posta ile gönderme adımlarından oluşur. Bu süreç 30-90 dakika sürebilir.

Haftada 20 teklif hazırlayan bir ekip için bu, ayda 40-70 saatlik bir yüktür. Otomatik bir sistemde aynı teklif 3-5 dakikada üretilir: kalemler katalogdan seçilir, fiyat, KDV ve iskonto otomatik hesaplanır, kurumsal şablonda PDF oluşur.

## Gizli maliyet 2: Hata

Manuel hesaplamada birim fiyat hatası, yanlış KDV oranı, eksik kalem veya güncel olmayan fiyat listesi kullanımı sık görülür. Bu hataların bedeli iki türlüdür: doğrudan kâr kaybı veya müşteri güveninin zedelenmesi.

Sistem tabanlı teklif üretiminde fiyatlar merkezi katalogdan çekilir, kurallar motor tarafından uygulanır ve hata payı sıfıra yaklaşır.

## Gizli maliyet 3: Takipsizlik

Teklif gönderildi, sonra ne oldu? Word dosyasıyla gönderilen teklifin açılıp açılmadığını, müşteriye ulaşıp ulaşmadığını bilemezsiniz. Takip aramaları ise temsilcinin inisiyatifine kalır.

Online teklif bağlantısı ile gönderim yaptığınızda: görüntülenme zamanı, kaç kez açıldığı, hangi bölümde ne kadar vakit geçirildiği ve onay durumu izlenebilir. Temsilci doğru anda doğru bilgiyle arama yapar.

## Gizli maliyet 4: Fiyat disiplini kaybı

Aynı ürüne üç farklı temsilci üç farklı fiyat verdiğinde iki şey olur: müşteri güveni zedelenir ve kâr marjı öngörülemez hâle gelir. Yetkisiz indirimler de bu ortamda kolaylaşır.

Sistemde iskonto limitleri role göre tanımlanır. Temsilci %5'e kadar onay almadan uygulayabilir; üzerindeki indirimler otomatik olarak yönetici onayına düşer. Hem hız hem kontrol korunur.

## Kazanım 1: Daha hızlı dönüş, daha yüksek kazanma oranı

Hızlı teklif veren firma, müşteri zihninde "ilgili ve profesyonel" olarak konumlanır. Talep geldikten saatler sonra değil, dakikalar sonra dönüş yapabilen ekiplerin kazanma oranı belirgin şekilde yükselir.

## Kazanım 2: Onay sürecinin hızlanması

E-posta zincirinde dolaşan onaylar günler alabilir. Sistem içinde onay akışı kurulduğunda: teklif hazırlanır, limit aşımı varsa yöneticiye bildirim gider, tek tıkla onaylanır ve müşteriye otomatik gönderilir. Tüm adımlar loglanır.

## Kazanım 3: Tam arşiv ve denetim

Tüm teklifler numaralı, tarihli ve aranabilir biçimde saklanır. "Geçen yıl bu müşteriye hangi fiyattan verdik?" sorusu saniyeler içinde cevaplanır. Fiyat geçmişi, pazarlık gücünüzü artırır.

## Kazanım 4: Tekliften siparişe kesintisiz akış

Onaylanan teklif tek tıkla siparişe, irsaliyeye ve faturaya dönüşür. Veri iki kez girilmez, tutarsızlık oluşmaz. Stok sistemiyle bağlantılıysa sipariş anında rezervasyon yapılır.

## Kazanım 5: Ölçülebilir satış performansı

Sistem veri ürettiği için rapor da üretir:

- Kazanma / kaybetme oranı
- Ortalama teklif tutarı ve kalemi
- Tekliften kapanışa geçen süre
- Temsilci ve ürün bazlı performans
- Kayıp nedenleri dağılımı

Bu raporlar olmadan satış yönetimi tahminlere dayanır.

## Kazanım 6: Kurumsal imaj

Marka şablonuna uygun, düzenli ve hatasız bir teklif belgesi, fiyat kadar etkili bir ikna unsurudur. Karmaşık Excel çıktıları ile profesyonel PDF teklif arasındaki fark, müşteri algısında belirgindir.

## Bir teklif sistemi hangi modülleri içermeli?

1. **Ürün/hizmet kataloğu:** merkezi fiyat listeleri, versiyon geçmişi
2. **Şablon motoru:** kurumsal kimliğe uygun PDF üretimi
3. **Kural motoru:** KDV, iskonto, döviz, marj hesapları
4. **Onay akışı:** limit bazlı iç onay
5. **Gönderim ve takip:** e-posta, online bağlantı, görüntüleme takibi
6. **Müşteri onayı:** online kabul/red, e-imza opsiyonu
7. **Arşiv ve rapor:** numaralandırma, arama, performans analizleri
8. **Entegrasyon:** CRM, stok, sipariş, muhasebe

## Uygulamaya geçiş önerisi

Mevcut teklif şablonunuzu ve fiyat listelerinizi koruyarak başlayın. İlk fazda katalog + PDF üretimi + arşiv; ikinci fazda online takip + onay akışı; üçüncü fazda CRM ve sipariş entegrasyonu planlayın. Bu kademeli yaklaşım, ekibin adaptasyonunu kolaylaştırır.

## Sonuç

Teklif hazırlama sistemi, satış ekibinizin hızını ve disiplinini artıran, yönetim tarafına ise ölçülebilirlik kazandıran bir yatırımdır. İstanbul, Kocaeli ve Kayseri'deki üretim ve taahhüt firmalarıyla yürüttüğümüz projelerde en hızlı geri dönüş alınan modüllerden biri olmuştur.`,
  },
  {
    slug: 'saas-mvp-gelistirme',
    title: 'SaaS Ürünü MVP Olarak Nasıl Geliştirilir?',
    metaTitle: 'SaaS MVP Geliştirme: 6 Haftalık Yol Haritası',
    metaDescription:
      'SaaS ürünü MVP olarak nasıl geliştirilir? Kapsam kesme, multi-tenant mimari, abonelik, analitik ve 6 haftalık yol haritası.',
    excerpt:
      'Fikrinizi çöpe atmadan, ölçülebilir bir MVP ile pazara çıkmanın pratik yol haritası.',
    category: 'SaaS',
    tags: ['MVP', 'SaaS', 'startup', 'ürün geliştirme'],
    publishedAt: '2026-03-23T09:00:00.000Z',
    relatedServices: ['mvp-startup-urunu', 'saas-platformu', 'multi-tenant-uygulama', 'abonelik-tabanli-yazilim'],
    relatedCities: ['istanbul', 'eskisehir', 'izmir'],
    content: `## MVP, küçük ürün değil; odaklanmış üründür

MVP (Minimum Viable Product) genellikle "az özellikli ürün" olarak anlaşılır. Doğru tanım şudur: hedef kullanıcının temel problemini uçtan uca çözen, gerçek kullanım verisi üreten en küçük ürün.

Bir dosya yükleme aracı MVP değildir; çünkü problemi çözmez. Yüklenen dosyayı işleyip sonucu kullanıcıya veren akış MVP'dir.

## 1. Adım: Değer hipotezini tek cümlede yazın

Şablon: "[Hedef kullanıcı], [problem] yaşıyor; biz [çözüm] ile [ölçülebilir fayda] sağlıyoruz."

Bu cümleyi yazamıyorsanız kapsam da belirleyemezsiniz. Örneğin: "Küçük muhasebe ofisleri, müşteri evraklarını e-posta ile topluyor ve kaybediyor; biz merkezi bir evrak portalı ile evrak kaybını sıfırlıyoruz."

## 2. Adım: Özellikleri üçe ayırın

- **Zorunlu (MVP):** Hipotezi test etmek için şart olanlar.
- **Erteleyebilir:** Değerli ama ilk testte gerekli olmayanlar.
- **Asla (şimdilik):** "Olursa güzel olur" listesi.

Deneyimimiz şunu gösteriyor: kurucuların MVP olarak tanımladığı kapsam genellikle %40-60 oranında küçültülebilir.

## 3. Adım: Multi-tenant mimari kararını baştan verin

SaaS ürünlerinde en pahalı hata, veri mimarisini sonradan değiştirmektir. Başta tek müşteri için kurulan yapı, müşteri sayısı arttığında ya ayrı kurulumlara (yüksek maliyet) ya da riskli veri karışmalarına yol açar.

Multi-tenant yaklaşımda tek uygulama birçok müşteriye hizmet eder ve veri izolasyonu Row Level Security (RLS) politikalarıyla veritabanı seviyesinde garanti edilir. MVP aşamasında bu temeli kurmak, sonradan refactor maliyetini ortadan kaldırır.

## 4. Adım: Abonelik akışını basit tutun

MVP'de üç plan yeterlidir: Ücretsiz deneme, temel plan, gelişmiş plan. Karmaşık fiyatlandırma, kullanım bazlı kota ve kurumsal sözleşme akışları ilk aşamada gerekmez.

Ancak şu akışlar zorunludur: kayıt olma, deneme başlatma, ödeme alma, yenileme, ödeme hatası bildirimi ve iptal. Bu akışlardan biri eksikse gelir ölçemezsiniz.

## 5. Adım: Analitik ve geri bildirim kanallarını ilk günden kurun

MVP'nin asıl çıktısı kod değil, öğrenmedir. Şu ölçümleri baştan tanımlayın:

- Kayıt olma oranı (landing → signup)
- Aktivasyon (ilk değer anını yaşama oranı)
- Haftalık aktif kullanıcı
- Denemeden ücretli plana dönüşüm
- İptal oranı ve nedenleri
- Özellik bazlı kullanım

Ayrıca ürün içi geri bildirim butonu ve basit bir anket ekleyin. Kullanıcıların ne dediği ile ne yaptığı arasındaki fark, en değerli içgörüdür.

## 6. Adım: Teknoloji seçimini hıza göre yapın

MVP aşamasında amaç en doğru değil, en hızlı ve değiştirilebilir çözümü seçmektir. Bizim standart yığınımız:

- **Next.js + TypeScript:** tip güvenli, hızlı geliştirme, SEO uyumlu
- **Tailwind CSS + shadcn/ui:** hızlı ve tutarlı arayüz
- **Supabase (PostgreSQL):** hazır auth, database, storage, RLS
- **Vercel:** otomatik CI/CD, preview ortamları, global edge
- **Cloudflare:** CDN, güvenlik, hız
- **Resend:** işlem e-postaları
- **GA4 + ürün analitiği:** ölçüm

Bu yığın ile 4-8 haftada çalışan bir ürün yayına alınabilir ve ölçeklenme aşamasında yeniden yazım gerekmez.

## 6 haftalık örnek plan

**Hafta 1:** Keşif ve kapsam. Değer hipotezi, kullanıcı akışları, ekran listesi, veri modeli taslağı.
**Hafta 2:** Tasarım ve temel. Design system, ana ekranlar, auth akışı, veritabanı şeması ve RLS politikaları.
**Hafta 3:** Çekirdek özellik. Ürünün temel değerini üreten akış uçtan uca çalışır hâle gelir.
**Hafta 4:** Abonelik ve ödeme. Plan tanımları, ödeme entegrasyonu, faturalama, deneme akışı.
**Hafta 5:** Analitik, e-postalar, onboarding. Olay takibi, işlem e-postaları, ilk kullanım rehberi.
**Hafta 6:** Test, yayın, beta. Hata ayıklama, performans, güvenlik kontrolü, beta kullanıcı alımı.

## MVP sonrası: ne zaman ölçeklemeye geçmeli?

Şu üç sinyali birlikte gördüğünüzde ölçekleme yatırımı anlamlıdır:

1. Aktivasyon oranı hedefin üzerinde ve kullanıcılar kendi kendine değer üretiyor
2. Ücretli dönüşüm başladı veya güçlü bir niyet sinyali var
3. Kullanıcılar kendi istekleriyle özellik öneriyor (yani ürünü sahiplenmişler)

Bu sinyaller yoksa sorun özellik eksikliği değil, değer hipotezinin kendisi olabilir. O durumda pivot daha ucuzdur.

## Sık yapılan hatalar

- **Herkes için ürün yapmaya çalışmak:** niş seçin, derinleşin.
- **Tasarımı sonraya bırakmak:** ilk izlenim aktivasyonu belirler.
- **Ödeme akışını geciktirmek:** gelir sinyali olmadan karar veremezsiniz.
- **Geri bildirim kanalı kurmamak:** kullanıcıların neden ayrıldığını tahmin edersiniz.
- **Teknik borcu görmezden gelmek:** MVP hız için esner ama veri modeli ve güvenlik esnemez.

## Sonuç

MVP, yatırımınızı koruma mekanizmasıdır. Aylar boyunca kapalı kapılar ardında geliştirme yapmak yerine haftalar içinde gerçek kullanıcıyla test etmek, hem bütçeyi hem motivasyonu korur.

Tardigrad Software olarak startup kurucuları ve kurum içi girişim ekipleriyle MVP geliştirme projeleri yürütüyoruz; demo ortamı, teknik dokümantasyon ve yatırım sunumu desteği de teslim kapsamında yer alıyor.`,
  },
  {
    slug: 'supabase-backend-kurulumu',
    title: 'Supabase ile Hızlı Backend Kurulumu: Adım Adım Rehber',
    metaTitle: 'Supabase Backend Kurulumu: Adım Adım Rehber',
    metaDescription:
      'Supabase ile hızlı backend kurulumu: proje oluşturma, şema tasarımı, RLS politikaları, auth, storage ve Next.js entegrasyonu.',
    excerpt:
      'Sıfırdan üretime giden Supabase kurulumunda kritik adımlar, güvenlik politikaları ve performans ipuçları.',
    category: 'Altyapı',
    tags: ['Supabase', 'PostgreSQL', 'backend', 'Next.js'],
    publishedAt: '2026-04-06T09:00:00.000Z',
    relatedServices: ['supabase-postgresql', 'vercel-deployment', 'multi-tenant-uygulama', 'yonetim-paneli'],
    relatedCities: ['istanbul', 'ankara'],
    content: `## Neden Supabase?

Supabase, PostgreSQL üzerine kurulu açık kaynak bir backend platformudur. Veritabanı, kimlik doğrulama, dosya depolama, gerçek zamanlı abonelikler ve edge fonksiyonları tek panelde sunar. Geleneksel "backend'i sıfırdan yaz" yaklaşımına göre haftalar kazandırır; Firebase gibi alternatiflere göre ise ilişkisel veri modeli ve SQL gücü ile öne çıkar.

En kritik avantajı: altyapı PostgreSQL'dir. Yani sağlayıcı bağımlılığı (vendor lock-in) yoktur; gerektiğinde kendi sunucunuza taşıyabilirsiniz.

## 1. Adım: Proje ve bölge seçimi

Proje oluştururken bölge seçimi hem performans hem KVKK açısından önemlidir. Türkiye'deki kullanıcılar için Avrupa bölgesi (örneğin Frankfurt) düşük gecikme sağlar ve veri saklama tercihleriyle uyumludur.

Veritabanı parolasını güçlü üretin ve bir parola yöneticisinde saklayın. Bu parola service role erişimi için kritiktir.

## 2. Adım: Şema tasarımı

Şemayı koddan önce tasarlayın. İyi bir başlangıç için:

- Tabloları tekil isimle adlandırın (users değil, profile; orders değil, order)
- Her tabloda \`id\`, \`created_at\`, \`updated_at\` alanlarını standart tutun
- İlişkileri foreign key ile tanımlayın ve uygun \`ON DELETE\` davranışını seçin
- Çok kullanılan sorgu alanlarına indeks ekleyin
- JSONB'i esnek ama sorgulanmayan veriler için kullanın

Örnek bir temas uygulaması için: \`profiles\`, \`leads\`, \`interactions\`, \`tasks\`, \`documents\` tabloları yeterli bir başlangıçtır.

## 3. Adım: Row Level Security (RLS) — en kritik adım

RLS, veritabanı satırı bazında erişim politikası tanımlar. Uygulama katmanında bir hata olsa bile yetkisiz veri erişimini engeller. Multi-tenant sistemlerde vazgeçilmezdir.

\`\`\`sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kendi leadlerini gör" ON leads
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Yönetici tümünü görür" ON leads
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );
\`\`\`

Sık yapılan hata: RLS'i etkinleştirmeyi unutmak. Etkinleştirilmemiş tabloda anon anahtarıyla tüm veri okunabilir. Her tablo için kontrol edin.

## 4. Adım: Kimlik doğrulama

Supabase Auth; e-posta/parola, magic link, telefon (OTP) ve OAuth (Google, GitHub vb.) yöntemlerini destekler. Next.js tarafında sunucu ve istemci istemcilerini doğru ayırmak önemlidir:

- Sunucu bileşenlerinde \`@supabase/ssr\` ile cookie tabanlı oturum
- API route'larında service role anahtarı (yalnızca sunucuda, asla istemciye gönderilmez)
- İstemci tarafında anon anahtarı (RLS ile korunur)

İki adımlı doğrulama, parola politikaları ve oturum süresi ayarlarını güvenlik gereksinimlerinize göre yapılandırın.

## 5. Adım: Storage ve dosya erişimi

Dosyalar için bucket oluşturun ve erişim politikalarını tanımlayın. Genel okunabilir bucket'lar (logo, ürün görseli) ile özel bucket'lar (sözleşme, kimlik belgesi) ayrılmalıdır. Özel dosyalara imzalı URL (signed URL) ile süreli erişim verin.

Dosya yüklemelerinde tip ve boyut doğrulaması yapın; zararlı uzantıları engelleyin.

## 6. Adım: Veritabanı fonksiyonları ve trigger'lar

İş kurallarının bir kısmını veritabanına taşımak tutarlılığı artırır:

- \`updated_at\` alanını otomatik güncelleyen trigger
- Kayıt oluşturulduğunda bildirim tablosuna yazan fonksiyon
- Karmaşık hesapları yapan stored function

Bu yaklaşım, uygulamanın farklı noktalarından yapılan işlemlerde aynı kuralın uygulanmasını garanti eder.

## 7. Adım: Edge fonksiyonlar ve API

Supabase Edge Functions ile webhook alıcıları, üçüncü parti entegrasyonlar ve arka plan işleri yazabilirsiniz. Tipik kullanım alanları: ödeme sağlayıcısı webhook'ları, e-posta gönderimi, dış API çağrıları, zamanlanmış görevler.

Hassas anahtarları fonksiyon ortam değişkenlerinde tutun, istemci koduna asla koymayın.

## 8. Adım: Next.js entegrasyonu

\`\`\`ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
)
\`\`\`

Sunucu bileşenlerinde doğrudan sorgularını \`await\` ile çalıştırın; gereksiz istemci tarafı veri çekiminden kaçının. Bu yaklaşım hem hızı hem güvenliği artırır.

## 9. Adım: Performans ve ölçeklenme

- Sık sorgulanan alanlarda indeks; birleşik sorgularda composite indeks kullanın
- Büyük listelerde sayfalama (limit + offset yerine keyset pagination tercih edin)
- Tekrarlayan sorguları view veya özet tabloya taşıyın
- Connection pooler'ı (transaction mode) sunucusuz ortamlarda mutlaka kullanın
- Slow query log'u düzenli inceleyin

## 10. Adım: Yedekleme, izleme ve migration

- Otomatik yedekleme ve PITR (point-in-time recovery) ayarlarını kontrol edin
- Şema değişikliklerini migration dosyalarıyla versiyonlayın (Supabase CLI)
- Ortam ayrımı kurun: geliştirme, test, üretim
- API kullanımını, hata oranlarını ve veritabanı metriklerini izleyin

## Sık yapılan hatalar

1. RLS'i etkinleştirmemek veya politikaları test etmemek
2. Service role anahtarını istemci tarafında kullanmak
3. İndeks eklemeden büyük tablolarla çalışmak
4. Migration yerine panel üzerinden elle şema değiştirmek
5. Bölge seçimini düşünmeden yapmak
6. Yedekleme ve geri yükleme prosedürünü test etmemek

## Sonuç

Supabase, doğru kurulduğunda küçük bir MVP'den milyonlarca kayıtlı sisteme kadar ölçeklenebilen bir backend sunar. Kritik nokta, güvenlik politikalarını ve veri modelini baştan doğru kurgulamaktır.

Tardigrad Software olarak Supabase/PostgreSQL altyapısı, RLS politikaları, auth akışları ve Vercel dağıtımını uçtan uca kuruyor; İstanbul ve Ankara'daki teknoloji ekipleriyle aktif projeler yürütüyoruz.`,
  },
  {
    slug: 'ai-chatbot-entegrasyonu',
    title: 'AI Chatbot İşletmenize Nasıl Entegre Edilir?',
    metaTitle: 'AI Chatbot Entegrasyonu: Adım Adım Kurulum Rehberi',
    metaDescription:
      'AI chatbot işletmenize nasıl entegre edilir? Bilgi tabanı, niyet haritası, WhatsApp bağlantısı, CRM entegrasyonu ve ölçüm.',
    excerpt:
      'Müşteri sorularını 7/24 yanıtlayan bir chatbot kurmanın pratik adımları ve sık yapılan hatalar.',
    category: 'Yapay Zekâ',
    tags: ['AI chatbot', 'yapay zekâ', 'WhatsApp API', 'müşteri deneyimi'],
    publishedAt: '2026-04-20T09:00:00.000Z',
    relatedServices: ['ai-chatbot', 'api-entegrasyonu', 'ai-icerik-araclar', 'crm'],
    relatedCities: ['istanbul', 'antalya', 'izmir'],
    content: `## Chatbot bir özellik değil, bir süreçtir

Birçok işletme chatbot'u "siteye eklenecek bir kutu" olarak görüyor. Sonuç: yanlış bilgi veren, kullanıcıyı döngüye sokan ve kısa sürede kapatılan botlar. Başarılı bir chatbot; niyet analizi, bilgi tabanı, devir akışı ve sürekli iyileştirme döngüsünün birleşimidir.

## 1. Adım: Gerçek soruları toplayın

Bot tasarımına hayal ederek değil, veriyle başlayın. Son 6 aya ait şu kaynakları inceleyin:

- Destek e-postaları ve WhatsApp konuşmaları
- Web formundaki mesajlar
- Satış ekibinin sık duyduğu sorular
- Sosyal medya yorumları ve mesajlar

Bu soruları kategorilere ayırın: bilgi alma, fiyat/süre sorma, randevu, sipariş durumu, şikâyet, teknik destek. En yüksek hacimli üç kategori, MVP botunuzun kapsamıdır.

## 2. Adım: Bilgi tabanını (RAG) kurun

Botun doğru cevap verebilmesi için işletmenizin kendi içeriğiyle beslenmesi gerekir. Bu yaklaşıma RAG (Retrieval-Augmented Generation) denir: soru geldiğinde ilgili doküman parçaları bulunur ve model yalnızca bu bağlamla yanıt üretir.

Bilgi tabanına eklenecekler: hizmet sayfaları, SSS, fiyatlandırma mantığı, teslim süreleri, iade ve garanti politikaları, iletişim bilgileri, çalışma saatleri, KVKK aydınlatma metni.

Kritik kural: bilgi tabanında olmayan konuda bot tahmin yürütmemeli, "bu konuda size bir arkadaşımız dönüş yapsın" diyerek devir akışını başlatmalıdır.

## 3. Adım: Niyet ve akış tasarımını yapın

Her niyet için bir akış tanımlayın:

- **Bilgi niyeti:** yanıt + ilgili sayfaya yönlendirme
- **Lead niyeti:** kısa form + CRM kaydı + temsilci bildirimi
- **Randevu niyeti:** takvim entegrasyonu + onay mesajı
- **Sipariş durumu:** kimlik doğrulama + API sorgusu
- **Şikâyet:** insan temsilciye acil devir + kayıt

Akışları çizerek (flow diagram) tasarlarsanız kör noktaları önceden görürsünüz.

## 4. Adım: İnsan devir (handoff) mekanizması

En önemli özellik budur. Bot şu durumlarda devri tetiklemelidir: kullanıcı açıkça insan ister, soru bilgi tabanında yoktur, duygu analizi olumsuzdur, konu hassastır (ödeme sorunu, hukuki, sağlık).

Devir sırasında tüm konuşma geçmişi temsilciye aktarılmalıdır; kullanıcı aynı şeyleri tekrar anlatmak zorunda kalmamalıdır.

## 5. Adım: Kanal entegrasyonları

- **Web widget:** en hızlı başlangıç; mevcut sitenize gömülür
- **WhatsApp Business API:** Türkiye'de en yüksek kullanım oranına sahip kanal
- **Müşteri paneli:** giriş yapmış kullanıcılara kişiselleştirilmiş yanıt
- **E-posta:** otomatik ilk yanıt ve sınıflandırma

Tüm kanallar aynı bilgi tabanını paylaşmalıdır; aksi hâlde tutarsız yanıtlar verilir.

## 6. Adım: CRM ve iş sistemleriyle bağlantı

Bot yalnızca konuşmaz, iş yapar:

- Yeni lead kaydı açar ve temsilciye atar
- Randevu oluşturur ve takvime işler
- Sipariş durumunu sorgular ve bildirir
- Destek talebi (ticket) oluşturur
- Konuşma özetini müşteri kartına ekler

Bu entegrasyonlar olmadan bot bir bilgi kutusu olarak kalır; gerçek değer üretmez.

## 7. Adım: Şeffaflık ve güvenlik

- Kullanıcıya yapay zekâ asistanıyla konuştuğu açıkça belirtilmeli
- Kişisel veri istenirken KVKK aydınlatma ve açık rıza akışı çalışmalı
- Kişisel veriler modele gönderilmeden önce maskelenmeli
- Küfür, kötüye kullanım ve prompt injection girişimlerine karşı filtre uygulanmalı
- Tüm konuşmalar loglanmalı ve saklama süresi tanımlanmalı

Şeffaf olmayan botlar kullanıcı güvenini zedeler ve yasal risk doğurur.

## 8. Adım: Ölçüm ve iyileştirme

Takip edilecek metrikler:

- Konuşma sayısı ve kanal dağılımı
- Çözüm oranı (bot içinde tamamlanan görüşmeler)
- Devir oranı ve devir nedenleri
- Ortalama yanıt süresi
- Lead dönüşüm sayısı
- Kullanıcı memnuniyeti (konuşma sonu puanlama)
- Yanıtlanamayan sorular listesi

Haftalık olarak yanıtlanamayan soruları inceleyip bilgi tabanını güncelleyin. Bu döngü, botun kalitesini sürekli yükseltir.

## Sık yapılan hatalar

1. **Kapsamı büyütmek:** ilk fazda üç niyet yeterlidir.
2. **Bilgi tabanını güncellememek:** fiyat ve politika değiştiğinde bot eski bilgiyi verir.
3. **Devir akışını kurmamak:** kullanıcı çıkış yolu bulamayınca markaya sinirlenir.
4. **Bot olduğunu gizlemek:** güven kaybı yaratır.
5. **Ölçüm yapmamak:** iyileştirme şansı olmaz.
6. **Tüm kanallarda ayrı bot kullanmak:** tutarsızlık üretir.

## Yatırımın geri dönüşü nasıl hesaplanır?

Şu kalemleri karşılaştırın:

- Destek ekibinin rutin sorulara harcadığı aylık saat × saat maliyeti
- Mesai dışı kaçan lead sayısı × ortalama lead değeri
- Yanıt süresinin kısalmasıyla artan dönüşüm oranı

Çoğu projede ilk üç ayda rutin soruların %30-50'si bota devredilir ve mesai dışı lead kaybı ortadan kalkar.

## Sonuç

AI chatbot, doğru kurgulandığında hem maliyet düşürür hem gelir artırır. Anahtar; sınırlı kapsamla başlamak, işletmenin kendi verisiyle beslemek, insan devrini her zaman açık tutmak ve ölçerek iyileştirmektir.

Tardigrad Software olarak web, WhatsApp ve müşteri paneli kanallarında çalışan, CRM ve takvim sistemlerinize entegre AI chatbot çözümleri geliştiriyoruz.`,
  },
  {
    slug: 'web-sitesi-hizi-seo',
    title: 'Web Sitesi Hızı ile SEO Arasındaki İlişki',
    metaTitle: 'Site Hızı ve SEO: Core Web Vitals Rehberi',
    metaDescription:
      'Web sitesi hızı SEO\'yu nasıl etkiler? Core Web Vitals (LCP, CLS, INP), hız optimizasyonu adımları ve ölçüm araçları.',
    excerpt:
      'Hız neden bir sıralama sinyali, nasıl ölçülür ve hangi adımlarla iyileştirilir — teknik ama anlaşılır bir rehber.',
    category: 'SEO',
    tags: ['site hızı', 'Core Web Vitals', 'teknik SEO', 'performans'],
    publishedAt: '2026-05-04T09:00:00.000Z',
    relatedServices: ['teknik-seo', 'cloudflare-cdn', 'vercel-deployment', 'web-sitesi-yenileme'],
    relatedCities: ['istanbul', 'ankara', 'bursa'],
    content: `## Hız bir teknik detay değil, gelir kalemidir

Sayfa açılışındaki her gecikme iki maliyet üretir: kullanıcı kaybı ve arama görünürlüğü kaybı. Mobilde kullanıcılar 3 saniyeden uzun süren sayfalarda büyük oranda ayrılır; Google ise hız metriklerini doğrudan sıralama sinyalinde kullanır.

## Core Web Vitals: üç temel metrik

**LCP (Largest Contentful Paint):** Sayfadaki en büyük içeriğin görünme süresi. Hedef: 2.5 saniyenin altı. Genellikle hero görseli veya büyük başlık bloğu LCP öğesidir.

**CLS (Cumulative Layout Shift):** Sayfa yüklenirken öğelerin beklenmedik kayması. Hedef: 0.1'in altı. Boyutu belirtilmemiş görseller ve sonradan yüklenen banner'lar ana sebeptir.

**INP (Interaction to Next Paint):** Kullanıcı etkileşimine verilen yanıt süresi. Hedef: 200 milisaniyenin altı. Ağır JavaScript ve uzun süren ana thread işleri bu metriği bozar.

## Hız SEO'yu nasıl etkiler?

1. **Doğrudan sinyal:** Core Web Vitals, Google'ın sayfa deneyimi kriterlerinin parçasıdır.
2. **Davranışsal sinyaller:** Yavaş site → yüksek hemen çıkma → düşük oturum süresi. Bu sinyaller dolaylı olarak sıralamayı etkiler.
3. **Tarama verimliliği:** Hızlı siteler daha verimli taranır; yeni içerik daha çabuk indexlenir.
4. **Dönüşüm:** Trafik aynı kalsa bile hızlanan site daha çok form ve satış üretir.

## Adım 1: Ölçün (tahmin etmeyin)

- **PageSpeed Insights:** hem laboratuvar hem gerçek kullanıcı (CrUX) verisi
- **Lighthouse:** geliştirme sırasında hızlı teşhis
- **Search Console → Core Web Vitals raporu:** URL grupları bazlı durum
- **WebPageTest:** ayrıntılı film şeridi ve ağ analizi
- **Vercel Speed Insights / RUM:** üretim ortamında gerçek kullanıcı ölçümü

Laboratuvar ve saha verilerini birlikte değerlendirin; yalnızca laboratuvar sonucu yanıltıcı olabilir.

## Adım 2: Görselleri optimize edin

Görseller çoğu sitenin en ağır kaynağıdır:

- WebP veya AVIF formatına geçin (JPEG'e göre %30-60 daha küçük)
- next/image ile otomatik boyutlandırma ve kaynak seti kullanın
- Her görselde width ve height belirterek CLS'i önleyin
- Hero görseline priority, diğerlerine lazy loading uygulayın
- Gereksiz büyük görselleri gerçek kullanım boyutuna indirin

## Adım 3: Kritik kaynakları önceliklendirin

- LCP öğesini preload edin
- Kritik CSS'i inline, kalanını ertelemeli yükleyin
- Font'larda \`font-display: swap\` ve self-hosting kullanın
- Üçüncü taraf script'leri (analytics, sohbet, piksel) \`defer\`/\`async\` ile yükleyin, mümkünse geciktirin

## Adım 4: JavaScript yükünü azaltın

INP sorunlarının çoğu aşırı istemci tarafı JavaScript'ten kaynaklanır:

- Sunucu bileşenleri (RSC) ile gereksiz client component kullanımını azaltın
- Kullanılmayan kütüphane kodlarını tree-shake edin
- Ağır hesaplamaları bölerek ana thread'i serbest bırakın
- Animasyonlarda \`transform\` ve \`opacity\` kullanın, layout tetikleyen özelliklerden kaçının

## Adım 5: Sunucu yanıt süresini (TTFB) düşürün

- CDN kullanın (Cloudflare) ve statik varlıkları kenara taşıyın
- Sunucu tarafında önbellekleme (ISR, stale-while-revalidate) uygulayın
- Veritabanı sorgularını indeksleyin, N+1 sorgularını kaldırın
- Gereksiz yönlendirme zincirlerini temizleyin (HTTP→HTTPS→www→non-www tek adımda)

## Adım 6: Mimari kararları gözden geçirin

Bazı hız sorunları optimizasyonla değil mimariyle çözülür:

- Ağır sayfa oluşturucular (page builder) yerine statik üretim
- Tek dev sayfa yerine bölünmüş, odaklı sayfalar
- Üçüncü taraf eklenti yığını yerine yerel geliştirme
- Eski PHP tabanlı yapılar yerine modern framework (Next.js)

## Sık yapılan hatalar

1. Yalnızca ana sayfayı optimize edip iç sayfaları ihmal etmek
2. Görsel sıkıştırma aracını kullanıp boyut (width/height) belirtmemek
3. Hız eklentileriyle önbellek kurallarını çakıştırmak
4. Üçüncü taraf script'leri kontrolsüz eklemek
5. Optimizasyonu bir kez yapıp izlememek

## Ölçüm ritmi oluşturun

Hız çalışması bir proje değil, bir disiplindir:

- Her yayında Lighthouse skoru kontrolü
- Aylık Core Web Vitals raporu
- Yeni özellik eklendiğinde performans regresyon testi
- Gerçek kullanıcı verisi (RUM) ile laboratuvar verisini karşılaştırma

## Sonuç

Hız optimizasyonu; teknik SEO'nun en ölçülebilir, en hızlı geri dönüş veren alanıdır. Doğru sırayla ilerlediğinizde (ölç → görsel → kritik kaynak → JavaScript → sunucu → mimari) hem sıralama hem dönüşüm tarafında belirgin kazanım elde edersiniz.

Tardigrad Software olarak Core Web Vitals hedeflerine uygun Next.js projeleri geliştiriyor, mevcut sitelerde hız optimizasyonu ve CDN yapılandırması yapıyoruz.`,
  },
  {
    slug: 'dijital-donusume-nereden-baslamali',
    title: "Dijital Dönüşüme Nereden Başlamalı? KOBİ'ler İçin Yol Haritası",
    metaTitle: 'Dijital Dönüşüme Nereden Başlamalı? KOBİ Yol Haritası',
    metaDescription:
      'Dijital dönüşüme nereden başlamalı? Süreç haritalama, önceliklendirme, hızlı kazanımlar ve 12 aylık KOBİ yol haritası.',
    excerpt:
      "Büyük bütçeler gerektirmeyen, ölçülebilir adımlarla dijitalleşme: KOBİ'ler için pratik bir başlangıç rehberi.",
    category: 'Dijital Dönüşüm',
    tags: ['dijital dönüşüm', 'otomasyon', 'KOBİ', 'süreç yönetimi'],
    publishedAt: '2026-05-18T09:00:00.000Z',
    relatedServices: ['dijital-donusum', 'dijital-otomasyon', 'crm', 'raporlama-sistemi'],
    relatedCities: ['istanbul', 'konya', 'gaziantep', 'bursa'],
    content: `## Dijital dönüşüm teknoloji satın almak değildir

Dijital dönüşüm, iş yapma biçiminizi veri, otomasyon ve doğru araçlar etrafında yeniden tasarlamaktır. Yeni bir yazılım alıp eski süreçleri olduğu gibi dijital ortama taşımak, yalnızca eski sorunları daha pahalı hâle getirir.

Bu yüzden başlangıç noktası teknoloji değil, süreçtir.

## 1. Adım: Mevcut durumu dürüstçe haritalayın

Bir hafta boyunca şu bilgileri toplayın:

- Hangi işler hangi araçlarla yapılıyor (Excel, WhatsApp, kağıt, telefon, e-posta)?
- Hangi veriler birden çok yerde tekrar giriliyor?
- Hangi süreçlerde en çok hata ve gecikme yaşanıyor?
- Hangi bilgiler yalnızca bir kişinin hafızasında?
- Haftada kaç saat rutin ve tekrarlayan işe gidiyor?

Bu harita, dönüşümün yol göstericisidir. Çoğu işletme bu çalışmayı ilk kez yaptığında şaşırtıcı sayıda tekrar ve kayıp tespit eder.

## 2. Adım: Dijital olgunluk seviyenizi belirleyin

Beş seviyeli basit bir model kullanın:

1. **Manuel:** kağıt, telefon ve hafıza
2. **Dağınık dijital:** Excel dosyaları, kişisel notlar, WhatsApp grupları
3. **Bölümlü sistemler:** ayrı yazılımlar var ama birbirine bağlı değil
4. **Entegre:** sistemler veri paylaşıyor, otomasyon var
5. **Veri odaklı:** canlı dashboard'lar, tahminleme, sürekli iyileştirme

Seviyenizi bilmek, gerçekçi bir hedef koymanızı sağlar. 2. seviyedeki bir işletmenin doğrudan 5. seviyeye atlaması mümkün değildir; aradaki basamaklar atlanırsa proje başarısız olur.

## 3. Adım: Hızlı kazanımları (quick win) seçin

Büyük ve riskli bir dönüşüm yerine, 4-8 hafta içinde ölçülebilir değer üreten bir ilk faz seçin. İyi adaylar:

- Web formundan gelen taleplerin otomatik kayda dönüşmesi
- Teklif hazırlamanın kataloğa bağlanması
- Stok ve sipariş durumunun tek ekranda görünmesi
- Manuel raporun otomatik dashboard'a dönüşmesi
- Müşteri kayıtlarının tek veritabanında toplanması

İlk fazın başarısı, ekibin dönüşüme olan güvenini belirler. Bu yüzden "en etkileyici" değil, "en garantili" adımı seçin.

## 4. Adım: Veri modelini bir kez doğru kurun

Dönüşüm projelerinin en pahalı hatası, veri modelini süreç içinde değiştirmektir. Başlangıçta şu soruları cevaplayın:

- Müşteri kaydı hangi alanları içerir ve kim güncelleyebilir?
- Ürün/hizmet kartı nasıl tanımlanır, varyantlar nasıl tutulur?
- Sipariş, teklif ve fatura arasındaki ilişki nedir?
- Hangi veriler tarihsel olarak saklanmalı?

Doğru kurulmuş bir veri modeli, sonraki tüm modüllerin temelini oluşturur.

## 5. Adım: Entegrasyonu sonraya bırakmayın

Ayrı çalışan sistemler "dijital silolar" yaratır. CRM satış verisini tutar, muhasebe faturayı, depo stoğu; ama hiçbiri birbiriyle konuşmazsa yönetim yine manuel rapor bekler.

Entegrasyon planını baştan yapın: hangi sistem ana kaynak (source of truth), hangi veri nereye akıyor, hangi API'ler kullanılacak?

## 6. Adım: Ekip adaptasyonunu planlayın

Kullanılmayan sistem, başarısız sistemdir. Adaptasyon için:

- Süreç sahipleri atayın (her modülün bir sorumlusu olsun)
- Ekibi tasarım aşamasına dahil edin (kendi sürecini tasarlayan ekip sahiplenir)
- Eğitim ve kısa video rehberler hazırlayın
- Kademeli devreye alın; bir modül oturmadan diğerine geçmeyin
- Eski yöntemi (Excel) belirli bir tarihte kapatın

Değişim yönetimini ihmal eden projelerde ekip eski alışkanlıklara geri döner.

## 7. Adım: Ölçün ve raporlayın

Dönüşümün başarısı sayılarla kanıtlanmalıdır. Başlangıç değerlerini kaydedin ve her faz sonunda karşılaştırın:

- Süreç süresi (ör. teklif hazırlama: 45 dk → 6 dk)
- Hata oranı (ör. stok farkı: %8 → %1)
- Manuel iş yükü (ör. ayda 60 saat → 15 saat)
- Müşteri yanıt süresi (ör. 8 saat → 20 dakika)
- Gelir etkisi (ör. kayıp lead oranı: %25 → %8)

Bu metrikler hem yönetim kuruluna sunum hem sonraki fazın planlanması için gereklidir.

## 12 aylık örnek yol haritası

**1-2. ay:** Analiz ve yol haritası. Süreç haritalama, olgunluk değerlendirmesi, önceliklendirme, veri modeli tasarımı.
**3-4. ay:** Çekirdek modül. Müşteri kayıtları + lead yönetimi + web formu entegrasyonu.
**5-6. ay:** Operasyon modülü. Teklif, sipariş veya stok yönetimi (sektöre göre).
**7-8. ay:** Otomasyon. Bildirimler, hatırlatmalar, belge üretimi, entegrasyonlar.
**9-10. ay:** Raporlama. Dashboard'lar, KPI takibi, otomatik aylık raporlar.
**11-12. ay:** Optimizasyon ve genişleme. Eğitim, dokümantasyon, ikinci faz planı, gerekirse AI araçları.

## Bütçe ve öncelik: sınırlı kaynakla ne yapılmalı?

Bütçeniz kısıtlıysa şu sırayı izleyin:

1. **Görünürlük:** profesyonel web sitesi + lokal SEO (talep olmadan sistem doldurulmaz)
2. **Kayıt:** müşteri ve lead verisinin tek yerde toplanması
3. **Otomasyon:** en çok zaman alan tekrarlayan işin otomatikleştirilmesi
4. **Raporlama:** yönetimin karar vermesini sağlayan canlı veriler
5. **Ölçekleme:** SaaS, AI ve ileri analitik

Bu sıra hem nakit akışını korur hem her adımda ölçülebilir değer üretir.

## Sık yapılan hatalar

- Büyük patlamalı geçiş planlamak (tüm sistemleri aynı anda değiştirmek)
- Süreçleri sadeleştirmeden dijitalleştirmek
- Ekip katılımı olmadan karar vermek
- Yalnızca yazılıma yatırım yapıp eğitimi ihmal etmek
- Başarı metriklerini baştan tanımlamamak
- İlk fazdan sonra projeyi durdurmak

## Sonuç

Dijital dönüşüm bir varış noktası değil, sürekli iyileşme yolculuğudur. Küçük başlayın, ölçün, kanıtlayın ve genişletin. İlk fazda elde edilen somut kazanım, sonraki adımların hem bütçesini hem motivasyonunu sağlar.

Tardigrad Software olarak KOBİ'ler ve üretim firmalarıyla dijital dönüşüm programları yürütüyor; analizden uygulamaya, eğitimden raporlamaya tek muhatap olarak ilerliyoruz. İstanbul, Bursa, Konya ve Gaziantep'teki işletmelerle aktif projelerimiz bulunuyor.`,
  },
]

function buildPost(seed: PostSeed, index: number): BlogPost {
  const rand = seededRandom(hashString(seed.slug))
  const readTime = Math.max(4, Math.round(seed.content.split(/\s+/).length / 180))
  return {
    slug: seed.slug,
    title: seed.title,
    metaTitle: seed.metaTitle,
    metaDescription: seed.metaDescription,
    excerpt: seed.excerpt,
    content: seed.content,
    publishedAt: seed.publishedAt,
    updatedAt: seed.publishedAt,
    author: AUTHOR,
    category: seed.category,
    tags: seed.tags,
    image: {
      filename: `${seed.slug}-blog.webp`,
      alt: `${seed.title} – Tardigrad Software Blog`,
    },
    relatedServices: seed.relatedServices,
    relatedCities: seed.relatedCities,
    readingTime: readTime + Math.floor(rand() * 2),
  }
}

export const blogPosts: BlogPost[] = SEEDS.map(buildPost)

export const blogPostsBySlug: Record<string, BlogPost> = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
)

export const blogSlugs = blogPosts.map((post) => post.slug)

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsBySlug[slug]
}

/** En yeni yazılar */
export function getRecentPosts(limit = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

/** Bir hizmete bağlı blog yazıları */
export function getPostsForService(serviceSlug: string, limit = 3): BlogPost[] {
  const matched = blogPosts.filter((post) => post.relatedServices.includes(serviceSlug))
  const rest = blogPosts.filter((post) => !post.relatedServices.includes(serviceSlug))
  return [...matched, ...rest].slice(0, limit)
}

/** Bir şehre bağlı blog yazıları */
export function getPostsForCity(citySlug: string, limit = 3): BlogPost[] {
  const matched = blogPosts.filter((post) => post.relatedCities.includes(citySlug))
  const rest = blogPosts.filter((post) => !post.relatedCities.includes(citySlug))
  return [...matched, ...rest].slice(0, limit)
}

export const blogCategories = Array.from(new Set(blogPosts.map((post) => post.category)))

export { SEEDS as BLOG_SEEDS }

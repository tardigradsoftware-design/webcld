// src/app/kvkk/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, Mail, ShieldCheck } from 'lucide-react'

import { CONTACT, SITE } from '@/lib/constants'
import { staticMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/sections/PageHero'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = staticMetadata({
  title: 'KVKK Aydınlatma Metni',
  description: `${SITE.legalName} 6698 sayılı KVKK kapsamında aydınlatma metni: işlenen veri kategorileri, amaçlar, hukuki sebepler, aktarım, saklama süreleri ve haklarınız.`,
  path: '/kvkk/',
  keywords: ['KVKK aydınlatma metni', 'kişisel verilerin korunması', 'veri sorumlusu', 'KVKK başvuru'],
})

const EFFECTIVE_DATE = '1 Ocak 2026'

const SECTIONS: { id: string; no: string; title: string; body: string[]; list?: string[] }[] = [
  {
    id: 'veri-sorumlusu',
    no: '1',
    title: 'Veri Sorumlusu',
    body: [
      `6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla ${SITE.legalName} (“${SITE.name}”) tarafından, aşağıda açıklanan kapsam ve amaçlarla işlenmektedir.`,
      `Merkez adresimiz: ${CONTACT.address.full}. İletişim e-posta adresimiz: ${CONTACT.email}.`,
      `Veri sorumlusuyla iletişime geçmek, KVKK kapsamındaki taleplerinizi iletmek veya şikâyet başvurularınızı yapmak için metnin 9. bölümünde yer alan başvuru yollarını kullanabilirsiniz.`,
    ],
  },
  {
    id: 'islenen-veriler',
    no: '2',
    title: 'İşlenen Kişisel Veri Kategorileri',
    body: [
      'Web sitemiz, iletişim formlarımız ve proje süreçlerimiz kapsamında aşağıdaki veri kategorileri işlenebilmektedir:',
    ],
    list: [
      'Kimlik bilgileri: ad, soyad, unvan.',
      'İletişim bilgileri: e-posta adresi, telefon numarası, kurumsal adres/şehir bilgisi.',
      'Müşteri işlem bilgileri: talep edilen hizmet, proje konusu, mesaj içeriği, teklif ve sözleşme kayıtları.',
      'İşlem güvenliği bilgileri: IP adresi, talep zamanı, kullanıcı ajanı, çerez kayıtları, oturum ve güvenlik logları.',
      'Pazarlama tercih bilgileri: çerez onay tercihleri, e-posta bülteni onayı (yalnızca açık rıza verilmesi hâlinde).',
      'Görsel/işitsel kayıtlar: yalnızca tarafların karşılıklı onayıyla yapılan toplantı kayıtları.',
      'Proje kapsamında sizin tarafınızdan sağlanan ve üçüncü kişilere ait olabilecek veriler: bu verilerin işlenme sorumluluğu, veriyi aktaran taraf olarak size aittir; tarafımızca yalnızca sözleşmenin ifası amacıyla ve talimatlarınız doğrultusunda işlenir.',
    ],
  },
  {
    id: 'isleme-amaclari',
    no: '3',
    title: 'Kişisel Verilerin İşlenme Amaçları',
    body: [
      'Kişisel verileriniz aşağıdaki amaçlarla, KVKK’nın 5. ve 6. maddelerinde belirtilen şartlar dahilinde işlenmektedir:',
    ],
    list: [
      'İletişim formu ve diğer kanallardan gelen taleplerin kaydedilmesi, yanıtlanması ve sonuçlandırılması.',
      'Ücretsiz ön analiz, teklif, kapsam ve fiyatlandırma çalışmalarının yürütülmesi.',
      'Sözleşme süreçlerinin kurulması, ifası, faturalandırma ve tahsilat işlemlerinin gerçekleştirilmesi.',
      'Proje yönetimi: görev takibi, sprint raporlaması, demo paylaşımı ve teknik destek süreçleri.',
      'Hizmet güvenliğinin sağlanması: yetkisiz erişim, spam, kötüye kullanım ve saldırıların önlenmesi.',
      'Yasal yükümlülüklerin yerine getirilmesi: muhasebe, vergi, denetim ve yetkili kurum taleplerinin karşılanması.',
      'Açık rızanızın bulunması hâlinde; ürün/hizmet tanıtımı, kampanya ve bülten iletişimi.',
      'Web sitesi performansının ölçülmesi ve içeriklerin iyileştirilmesi (yalnızca analitik çerez onayı verilmesi hâlinde).',
    ],
  },
  {
    id: 'hukuki-sebepler',
    no: '4',
    title: 'Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi',
    body: [
      'Kişisel verileriniz; web sitemizdeki iletişim formları, e-posta, telefon, WhatsApp ve benzeri mesajlaşma uygulamaları, çevrim içi toplantılar, sözleşme ve fatura süreçleri ile çerezler aracılığıyla, tamamen veya kısmen otomatik yöntemlerle toplanmaktadır.',
      'Toplanan veriler aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:',
    ],
    list: [
      'KVKK m.5/2-c — Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması.',
      'KVKK m.5/2-ç — Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması.',
      'KVKK m.5/2-e — Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması.',
      'KVKK m.5/2-f — İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması (talep yönetimi, hizmet güvenliği, site performansının ölçülmesi).',
      'KVKK m.5/1 — Açık rıza (ticari elektronik ileti gönderimi ve zorunlu olmayan analitik/pazarlama çerezleri).',
    ],
  },
  {
    id: 'aktarim',
    no: '5',
    title: 'Kişisel Verilerin Aktarılması',
    body: [
      'Kişisel verileriniz; yukarıda belirtilen amaçlarla sınırlı olmak ve KVKK’nın 8. ve 9. maddelerine uygun hareket edilmek suretiyle aşağıdaki alıcı gruplarıyla paylaşılabilir:',
    ],
    list: [
      'Hizmet aldığımız tedarikçiler: bulut altyapı ve barındırma sağlayıcıları (ör. Vercel, Cloudflare, Supabase), e-posta gönderim hizmeti (ör. Resend), hız sınırı/önbellekleme hizmeti (ör. Upstash), spam koruma hizmeti (ör. Google reCAPTCHA), analiz hizmetleri (ör. Google Analytics 4) ve iş güvenlik araçları.',
      'Yetkili kamu kurum ve kuruluşları ile yargı mercileri: kanuni yükümlülüklerin yerine getirilmesi veya hukuki taleplerin karşılanması amacıyla, talep edilen kapsamla sınırlı olarak.',
      'Mali müşavir, denetçi ve hukuk danışmanları: muhasebe, vergi, denetim ve hukuki süreçlerin yürütülmesi amacıyla.',
      'Proje kapsamında sizin talimatınızla entegre edilen üçüncü taraf sistemler (ör. ödeme sağlayıcıları, kargo firmaları, pazaryerleri): yalnızca ilgili işlemin gerçekleştirilmesi için gerekli verilerle sınırlı olarak.',
      'Açık rızanız bulunmadıkça kişisel verileriniz ticari amaçla üçüncü kişilere satılmaz, kiralanmaz veya pazarlanmaz.',
    ],
  },
  {
    id: 'yurt-disi-aktarim',
    no: '6',
    title: 'Yurt Dışına Aktarım',
    body: [
      'Web sitemizin altyapısında kullanılan bazı hizmet sağlayıcılar (barındırma, CDN, e-posta gönderimi, hız sınırı, spam koruma ve analitik) yurt dışında sunucu bulundurabilmektedir. Bu kapsamda kişisel verileriniz, KVKK m.9’da öngörülen şartlara uygun olarak ve hizmetin gerektirdiği ölçüde yurt dışına aktarılabilir.',
      'Aktarım; ilgili sağlayıcının taahhüt ettiği güvenlik önlemleri, sözleşmesel korumalar ve yeterli koruma sağlamasına ilişkin değerlendirmeler çerçevesinde gerçekleştirilir. Zorunlu olmayan çerezler (ör. analitik) yalnızca açık rızanız varsa çalışır.',
    ],
  },
  {
    id: 'saklama',
    no: '7',
    title: 'Kişisel Verilerin Saklanma Süresi',
    body: [
      'Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen azami saklama sürelerine uygun olarak saklanır; sürenin sonunda silinir, yok edilir veya anonim hâle getirilir.',
    ],
    list: [
      'İletişim formu talepleri ve yazışmalar: talep sonuçlandıktan sonra en fazla 3 yıl (meşru menfaat ve olası uyuşmazlıklar).',
      'Sözleşme, teklif, fatura ve muhasebe kayıtları: 6102 sayılı Türk Ticaret Kanunu ve 213 sayılı Vergi Usul Kanunu gereği 10 yıl.',
      'İşlem güvenliği logları (IP, zaman damgası, erişim kayıtları): 5651 sayılı Kanun ve ilgili mevzuat gereği en az 2 yıl.',
      'Çerez kayıtları: çerez türüne göre oturum süresi ile 24 ay arasında.',
      'Proje kaynak kodu ve teslim dokümanları: sözleşmede belirtilen süre boyunca; talep hâlinde teslim edilerek ilişkilendirilebilir veriler silinir.',
    ],
  },
  {
    id: 'guvenlik',
    no: '8',
    title: 'Veri Güvenliğine İlişkin Önlemler',
    body: [
      'Kişisel verilerin hukuka aykırı olarak işlenmesini ve erişilmesini önlemek, muhafazasını sağlamak amacıyla teknik ve idari tedbirler alıyoruz:',
    ],
    list: [
      'Tüm iletişim HTTPS/TLS ile şifrelenir; güvenlik başlıkları (CSP, HSTS, X-Frame-Options vb.) uygulanır.',
      'Veritabanında satır düzeyinde güvenlik politikaları (Row Level Security) kullanılır; form verilerine yalnızca hizmet rolü üzerinden erişilir.',
      'Form gönderimlerinde gizli alan (honeypot), reCAPTCHA doğrulaması ve IP bazlı hız sınırı uygulanarak spam ve kötüye kullanım engellenir.',
      'Erişimler rol bazlı yetkilendirme ile sınırlandırılır; yetki matrisi düzenli olarak gözden geçirilir.',
      'Otomatik yedekleme, izleme ve olay kaydı (log) mekanizmaları çalıştırılır; güvenlik olaylarında müdahale prosedürü uygulanır.',
      'Personel ve tedarikçilerle gizlilik taahhütleri alınır; KVKK farkındalığı sağlanır.',
      'Kişisel veri ihlali hâlinde, durum KVKK m.12 gereği en kısa sürede (72 saat içinde) Kurul’a ve ilgili kişilere bildirilir.',
    ],
  },
  {
    id: 'haklariniz',
    no: '9',
    title: 'KVKK m.11 Kapsamındaki Haklarınız',
    body: [
      'KVKK’nın 11. maddesi uyarınca veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz:',
    ],
    list: [
      'Kişisel verilerinizin işlenip işlenmediğini öğrenme.',
      'İşlenmişse buna ilişkin bilgi talep etme.',
      'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.',
      'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme.',
      'Eksik veya yanlış işlenmişse düzeltilmesini isteme.',
      'KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme.',
      'Düzeltme, silme veya yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme.',
      'Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.',
      'Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.',
    ],
  },
  {
    id: 'basvuru',
    no: '10',
    title: 'Başvuru Yöntemi ve Sonuçlandırma',
    body: [
      `Haklarınıza ilişkin taleplerinizi ${CONTACT.email} adresine e-posta göndererek veya ${CONTACT.address.full} adresine yazılı olarak iletebilirsiniz. Başvurunuzda kimliğinizi doğrulamaya elverişli bilgilerin (ad, soyad, iletişim bilgisi ve varsa müşteri/talep numarası) bulunması süreci hızlandırır.`,
      'Başvurular, talebin niteliğine göre en geç 30 gün içinde ücretsiz olarak sonuçlandırılır. Ancak işlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulunca belirlenen tarifedeki ücret alınabilir.',
      'Yanıtımızdan memnun kalmamanız veya başvurunuzun reddedilmesi hâlinde; cevabımızı öğrendiğiniz tarihten itibaren 30 gün ve her hâlde başvuru tarihinden itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu’na şikâyette bulunabilirsiniz.',
    ],
  },
  {
    id: 'cocuklar',
    no: '11',
    title: 'Çocuklara İlişkin Veriler',
    body: [
      'Hizmetlerimiz işletmelere yöneliktir ve 18 yaşından küçüklerden bilerek kişisel veri toplamıyoruz. Çocuğunuza ait verilerin tarafımıza iletildiğini düşünüyorsanız, lütfen bizimle iletişime geçin; ilgili veriler gecikmeksizin silinir.',
    ],
  },
  {
    id: 'cikar-catisma',
    no: '12',
    title: 'Metindeki Değişiklikler',
    body: [
      `Bu aydınlatma metni yürürlükteki mevzuata ve hizmet kapsamımıza göre güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır ve yayım tarihinde yürürlüğe girer. Önemli değişikliklerde, iletişim bilgisi bulunan ilgili kişilere ayrıca bildirim yapılabilir.`,
      `Son güncelleme: ${EFFECTIVE_DATE}.`,
    ],
  },
]

const COOKIES = [
  {
    name: 'Zorunlu çerezler',
    purpose: 'Site güvenliği, form gönderimi, hız sınırı ve çerez onay tercihlerinin hatırlanması.',
    legal: 'KVKK m.5/2-f (meşru menfaat) — açık rıza gerektirmez',
    duration: 'Oturum – 12 ay',
  },
  {
    name: 'Analitik çerezler (GA4)',
    purpose: 'Sayfa performansının ve içerik ilgisinin ölçülmesi; iyileştirme kararlarının veriye dayandırılması.',
    legal: 'KVKK m.5/1 (açık rıza)',
    duration: 'En fazla 24 ay',
  },
  {
    name: 'Spam koruma (reCAPTCHA)',
    purpose: 'Form gönderimlerinin insan tarafından yapılıp yapılmadığının doğrulanması.',
    legal: 'KVKK m.5/2-f (meşru menfaat)',
    duration: 'Oturum – 6 ay',
  },
]

export default function KvkkPage() {
  return (
    <>


      <PageHero
        breadcrumbs={[{ name: 'KVKK Aydınlatma Metni', url: '/kvkk/' }]}
        eyebrow="6698 sayılı Kanun · m.10"
        h1="KVKK Aydınlatma Metni"
        lead={`${SITE.legalName} olarak kişisel verilerinizin gizliliğine ve güvenliğine önem veriyoruz. Bu metin; hangi verileri, hangi amaçla ve hangi hukuki sebebe dayanarak işlediğimizi, kimlerle paylaştığımızı, ne kadar süre sakladığımızı ve KVKK kapsamındaki haklarınızı açıklar.`}
        meta={[
          { label: 'Veri sorumlusu', value: SITE.name },
          { label: 'Başvuru', value: CONTACT.email },
          { label: 'Yanıtlama süresi', value: 'En geç 30 gün' },
          { label: 'Son güncelleme', value: EFFECTIVE_DATE },
        ]}
        showCta={false}
      />

      <div className="section-light py-12 lg:py-16">
        <div className="container grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          {/* İçindekiler */}
          <nav
            aria-label="Aydınlatma metni içindekiler"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-2xl border border-brand-navy-100 bg-brand-paper-soft p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-navy-400">
                İçindekiler
              </h2>
              <ol className="mt-3 space-y-1.5">
                {SECTIONS.map((section) => (
                  <li key={section.id} className="flex gap-2 text-[13.5px]">
                    <span className="font-mono text-xs text-brand-navy-300">{section.no}.</span>
                    <a
                      href={`#${section.id}`}
                      className="text-brand-ink-soft underline-offset-4 transition hover:text-brand-navy-900 hover:underline"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li className="flex gap-2 text-[13.5px]">
                  <span className="font-mono text-xs text-brand-navy-300">13.</span>
                  <a
                    href="#cerezler"
                    className="text-brand-ink-soft underline-offset-4 transition hover:text-brand-navy-900 hover:underline"
                  >
                    Çerez Politikası Özeti
                  </a>
                </li>
              </ol>
            </div>

            <div className="mt-4 rounded-2xl border border-brand-navy-100 bg-white p-5 shadow-card">
              <ShieldCheck className="h-5 w-5 text-brand-green" aria-hidden />
              <h2 className="mt-3 text-sm font-semibold text-brand-ink">Talebinizi iletin</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-brand-ink-soft/70">
                Verilerinize erişim, düzeltme veya silme taleplerinizi e-posta ile iletebilirsiniz.
              </p>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('KVKK Başvurusu')}`}
                className="mt-3 inline-flex items-center gap-1.5 break-all text-[13px] font-semibold text-brand-navy-700 transition hover:text-brand-navy-900"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                {CONTACT.email}
              </a>
            </div>
          </nav>

          {/* Metin */}
          <article className="min-w-0">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-baslik`}
                className="scroll-mt-28 border-b border-brand-navy-100 py-8 first:pt-0 last:border-b-0"
              >
                <h2
                  id={`${section.id}-baslik`}
                  className="text-xl font-semibold text-brand-ink lg:text-[22px]"
                >
                  <span className="mr-2.5 font-mono text-base text-brand-navy-300">{section.no}.</span>
                  {section.title}
                </h2>
                {section.body.map((paragraph, index) => (
                  <p key={index} className="mt-3.5 text-[15.5px] leading-[1.8] text-brand-ink-soft/88">
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-4 space-y-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-5 text-[15px] leading-[1.75] text-brand-ink-soft/85 before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-cyan"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {/* Çerez politikası özeti */}
            <section
              id="cerezler"
              aria-labelledby="cerezler-baslik"
              className="scroll-mt-28 py-8"
            >
              <h2 id="cerezler-baslik" className="text-xl font-semibold text-brand-ink lg:text-[22px]">
                <span className="mr-2.5 font-mono text-base text-brand-navy-300">13.</span>
                Çerez Politikası Özeti
              </h2>
              <p className="mt-3.5 text-[15.5px] leading-[1.8] text-brand-ink-soft/88">
                Sitemizde yalnızca gerekli olan çerezler varsayılan olarak çalışır. Analitik ve
                pazarlama amaçlı çerezler, çerez onay bandında açık rıza vermeniz hâlinde
                etkinleşir; tercihlerinizi dilediğiniz an sayfanın altındaki “Çerez tercihleri”
                bağlantısından değiştirebilirsiniz.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border border-brand-navy-100">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <caption className="sr-only">Çerez türleri, amaçları, hukuki sebepleri ve saklama süreleri</caption>
                    <thead className="bg-brand-navy-900 text-white">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Çerez türü</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Amaç</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Hukuki sebep</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Süre</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-navy-100 bg-white">
                      {COOKIES.map((cookie) => (
                        <tr key={cookie.name}>
                          <th scope="row" className="px-4 py-3.5 align-top font-semibold text-brand-ink">
                            {cookie.name}
                          </th>
                          <td className="px-4 py-3.5 align-top text-[13.5px] leading-relaxed text-brand-ink-soft/80">
                            {cookie.purpose}
                          </td>
                          <td className="px-4 py-3.5 align-top text-[13px] leading-relaxed text-brand-ink-soft/70">
                            {cookie.legal}
                          </td>
                          <td className="px-4 py-3.5 align-top font-mono text-[12.5px] whitespace-nowrap text-brand-navy-600">
                            {cookie.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-brand-navy-100 bg-brand-paper-soft p-5">
                <h3 className="text-sm font-semibold text-brand-ink">İlgili sayfalar</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    { label: 'İletişim ve başvuru formu', href: '/iletisim/' },
                    { label: 'Hakkımızda', href: '/hakkimizda/' },
                    { label: 'Proje sürecimiz', href: '/surec/' },
                    { label: 'Hizmetlerimiz', href: '/hizmetler/' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-2 rounded-lg border border-brand-navy-100 bg-white px-4 py-2.5 text-[13.5px] text-brand-ink-soft transition hover:border-brand-cyan/50 hover:text-brand-navy-900"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5 text-brand-navy-300" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </article>
        </div>
      </div>

      <ContactSection
        compact
        title="KVKK talebiniz mi var?"
        description={`Verilerinize erişim, düzeltme veya silme taleplerinizi formdan ya da ${CONTACT.email} adresinden iletebilirsiniz. Talepler en geç 30 gün içinde sonuçlandırılır.`}
      />
    </>
  )
}

"use client";

import { useEffect, useMemo, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Captions,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  Film,
  HeartHandshake,
  Languages,
  LockKeyhole,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

type Locale = "tr" | "en";
type Bilingual = { tr: string; en: string };
const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
type Episode = {
  n: string;
  title: Bilingual;
  value: Bilingual;
  summary: Bilingual;
  outcome: Bilingual;
  question: Bilingual;
  beats: Bilingual[];
};

const episodes: Episode[] = [
  {
    n: "01",
    title: { tr: "Biz Buradayız", en: "We Are Here" },
    value: { tr: "Güvenli bağ · Aidiyet", en: "Secure bond · Belonging" },
    summary: {
      tr: "Kısa bir elektrik kesintisinde aile birbirine sakin seslerle ulaşır. Elif'in gölge oyunu fikri, güvenli ortamı birlikte kurulan bir oyuna dönüştürür.",
      en: "During a short power cut, the family reaches one another with calm voices. Elif's shadow-play idea turns a safe response into a game they create together.",
    },
    outcome: {
      tr: "Çocuk, ihtiyaç anında güvenilir bir yetişkine seslenmeyi ve ‘buradayım’ diyerek güven vermeyi ayırt eder.",
      en: "The child recognizes asking a trusted adult for help and reassuring someone by saying ‘I’m here’.",
    },
    question: {
      tr: "Bir şeye ihtiyaç duyduğunda sana ‘buradayım’ diyen kişiler bunu nasıl gösteriyor?",
      en: "How do the people who say ‘I’m here’ show it when you need something?",
    },
    beats: [
      { tr: "Sofra hazırlığı ve Elif’in fikrine alan açılması", en: "Dinner preparation and room for Elif’s idea" },
      { tr: "Kısa kesinti; sakin ve karşılıklı seslenişler", en: "A short outage; calm calls and responses" },
      { tr: "Şarjlı ışıkla güvenli gölge oyunu", en: "Safe shadow play with a rechargeable lamp" },
      { tr: "Işık döner; aile oyunu birlikte tamamlar", en: "Lights return; the family completes the game" },
    ],
  },
  {
    n: "02",
    title: { tr: "Ailece Sofrada", en: "Together at the Table" },
    value: { tr: "Aidiyet · Nitelikli zaman", en: "Belonging · Quality time" },
    summary: {
      tr: "Hafta sonu sofrası beş kişinin yaşına uygun katkısıyla kurulur. Çocukların anlattıkları dinlenir ve bir fikir ortak aile planına dönüşür.",
      en: "A weekend table is prepared through five age-appropriate contributions. The children are heard, and one idea becomes a shared family plan.",
    },
    outcome: {
      tr: "Çocuk, sofraya katkı sunabileceğini ve birlikte geçirilen zamanın konuşma–dinleme fırsatı olduğunu fark eder.",
      en: "The child sees that they can contribute to the table and that shared time creates room to speak and listen.",
    },
    question: {
      tr: "Sofrada herkesin katkı sunabileceği küçük bir işi nasıl seçerdin?",
      en: "What small task could everyone choose to help with at the table?",
    },
    beats: [
      { tr: "Kahvaltı görevlerinin yaşa göre paylaşılması", en: "Breakfast tasks shared by age and ability" },
      { tr: "Can’ın hikâyesinin söz kesilmeden dinlenmesi", en: "Can’s story is heard without interruption" },
      { tr: "Elif’in kuşlar için su önerisi", en: "Elif suggests leaving water for birds" },
      { tr: "Sofranın birlikte toplanması", en: "The table is cleared together" },
    ],
  },
  {
    n: "03",
    title: { tr: "Seni Dinliyorum", en: "I’m Listening" },
    value: { tr: "Dinleme · Saygı", en: "Listening · Respect" },
    summary: {
      tr: "Elif’in bulduğu sarı yaprak, aile dikkatini ona verdiğinde büyük bir hikâyeye dönüşür. Dinlenen Elif, ardından Can’ı aynı özenle dinler.",
      en: "A yellow leaf becomes a big story when the family gives Elif their attention. Having been heard, Elif listens to Can with the same care.",
    },
    outcome: {
      tr: "Çocuk; yüzünü dönmenin, beklemenin, soru sormanın ve anlatılanı hatırlamanın dinleme davranışları olduğunu görür.",
      en: "The child sees that turning toward someone, waiting, asking and remembering are all acts of listening.",
    },
    question: {
      tr: "Biri seni gerçekten dinlediğinde bunu hangi hareketlerinden anlarsın?",
      en: "What actions tell you that someone is truly listening?",
    },
    beats: [
      { tr: "Elif anlatmak için izin ister", en: "Elif asks to share her story" },
      { tr: "Aile işini bırakıp dikkatini ona verir", en: "The family pauses and turns their attention to her" },
      { tr: "Açık uçlu sorularla hikâye büyür", en: "Open questions expand the story" },
      { tr: "Elif bu kez Can’ı dinler", en: "Elif now listens to Can" },
    ],
  },
  {
    n: "04",
    title: { tr: "Evimiz Hepimizin", en: "Our Home Belongs to Us All" },
    value: { tr: "İş birliği · Ortak yaşam", en: "Cooperation · Shared life" },
    summary: {
      tr: "Hikâye gecesinin salonu tek bir kişinin emeğiyle değil, farklı ellerin katkısıyla hazırlanır. Ortak keyif, ortak sorumlulukla kurulur.",
      en: "The room for story night is built not by one person, but through many hands. Shared joy begins with shared responsibility.",
    },
    outcome: {
      tr: "Çocuk, ortak alanlara güvenli ve yaşına uygun katkının hem sorumluluk hem aidiyet olduğunu kavrar.",
      en: "The child understands that a safe, age-appropriate contribution to shared spaces is both responsibility and belonging.",
    },
    question: {
      tr: "Evde herkesin keyif alacağı bir etkinlik için sen ne hazırlayabilirsin?",
      en: "What could you prepare for an activity everyone at home will enjoy?",
    },
    beats: [
      { tr: "Hikâye gecesi fikri", en: "The idea of a family story night" },
      { tr: "Minder, su, ışık ve oyuncak görevleri", en: "Cushion, water, light and toy tasks" },
      { tr: "Yardım isteme ve kendi çözümünü deneme", en: "Asking for help and trying one’s own solution" },
      { tr: "Herkesin izi olan ortak sahne", en: "A shared stage carrying everyone’s touch" },
    ],
  },
  {
    n: "05",
    title: { tr: "Benim Küçük Görevim", en: "My Small Responsibility" },
    value: { tr: "Sorumluluk · Süreklilik", en: "Responsibility · Continuity" },
    summary: {
      tr: "Yeni fesleğen fidesi, Elif ve Can’ın kurduğu görsel takip sistemiyle büyür. Yetişkinler görevi üstlenmez; güvenli çevreyi hazırlar.",
      en: "A basil seedling grows through the visual tracking system created by Elif and Can. Adults do not take over; they prepare a safe environment.",
    },
    outcome: {
      tr: "Çocuk, küçük bir görevi hatırlamak için sistem kurabileceğini ve bakımın süreklilik istediğini fark eder.",
      en: "The child learns that a simple system can support a small responsibility and that care requires continuity.",
    },
    question: {
      tr: "Hatırlamak istediğin küçük bir görev için hangi işareti kullanırdın?",
      en: "What symbol would help you remember a small responsibility?",
    },
    beats: [
      { tr: "Fesleğen fidesinin eve gelişi", en: "The basil seedling arrives" },
      { tr: "Toprağı gözlemleme ve ölçü belirleme", en: "Observing the soil and setting a measure" },
      { tr: "Takvim ve çizelgeyle birkaç günlük bakım", en: "Several days of care with a calendar" },
      { tr: "Yeni yaprağın aile sofrasına katkısı", en: "A new leaf contributes to the family meal" },
    ],
  },
  {
    n: "06",
    title: { tr: "Fotoğraftaki Hikâye", en: "The Story in the Photograph" },
    value: { tr: "Aile hafızası · Süreklilik", en: "Family memory · Continuity" },
    summary: {
      tr: "Eski bir piknik fotoğrafındaki çınar bulunur; aile aynı yerde bugünün ayrıntılarıyla yeni bir kare çeker. Geçmiş taklit edilmez, devam ettirilir.",
      en: "The plane tree in an old picnic photo is found, and the family takes a new picture there with details from today. The past is continued, not copied.",
    },
    outcome: {
      tr: "Çocuk, aile büyüğüne açık uçlu soru sormanın ve kendi deneyimini aile hafızasına eklemenin değerini görür.",
      en: "The child discovers the value of asking elders open questions and adding their own experience to family memory.",
    },
    question: {
      tr: "Eski bir aile fotoğrafındaki kişiye hangi soruyu sormak isterdin?",
      en: "What would you ask someone in an old family photograph?",
    },
    beats: [
      { tr: "Albümden düşen eski fotoğraf", en: "An old photograph slips from the album" },
      { tr: "Çocukların ayrıntılardan soru üretmesi", en: "Children form questions from its details" },
      { tr: "Aynı çınara yapılan aile yürüyüşü", en: "A family walk to the same plane tree" },
      { tr: "Eski ve yeni fotoğrafın yan yana gelişi", en: "Old and new photographs placed side by side" },
    ],
  },
  {
    n: "07",
    title: { tr: "Bizim Ailenin Tarifi", en: "Our Family Recipe" },
    value: { tr: "Kültürel aktarım · Birlikte üretme", en: "Cultural continuity · Making together" },
    summary: {
      tr: "Hasan Dede’nin annesinden öğrendiği çorba, çocukların ölçüleri ve çizimleriyle yeniden kayda geçer. Gelenek, yeni kuşağın katkısıyla yaşayan bilgiye dönüşür.",
      en: "A soup Hasan learned from his mother is recorded anew through the children’s measures and drawings. Tradition becomes living knowledge through a new generation.",
    },
    outcome: {
      tr: "Çocuk, aile büyüğünden öğrenirken soru sorabileceğini, ölçebileceğini ve kendi katkısını ekleyebileceğini görür.",
      en: "The child sees that learning from an elder can include asking, measuring, recording and adding one’s own contribution.",
    },
    question: {
      tr: "Ailenden öğrendiğin bir tarife hangi küçük işareti eklerdin?",
      en: "What small sign would you add to a recipe learned from your family?",
    },
    beats: [
      { tr: "Yağmurlu günde ortak çorba kararı", en: "A shared soup plan on a rainy day" },
      { tr: "Ölçü, görev ve güvenli mutfak paylaşımı", en: "Measures, tasks and a safely shared kitchen" },
      { tr: "Anıların çocuk çizimleriyle kaydı", en: "Memories recorded through children’s drawings" },
      { tr: "Geleceğe açık tarif defteri", en: "A recipe book left open to the future" },
    ],
  },
  {
    n: "08",
    title: { tr: "Misafirimiz Var", en: "We Have a Guest" },
    value: { tr: "Misafirperverlik · Kapsayıcılık", en: "Hospitality · Inclusion" },
    summary: {
      tr: "Elif ve Can’ın karşılama kartı, misafir çocuğun çizimiyle ortak bir hatıraya dönüşür. Misafirperverlik gösterişle değil, yer açmakla anlatılır.",
      en: "Elif and Can’s welcome card becomes a shared memory through their young guest’s drawing. Hospitality is shown as making room, not displaying abundance.",
    },
    outcome: {
      tr: "Çocuk, selam verme, yer gösterme, ihtiyacı sorma ve paylaşmaya alan açmayı ayırt eder.",
      en: "The child recognizes greeting, showing a place, asking what is needed and allowing room to share.",
    },
    question: {
      tr: "Bir misafirin rahat hissetmesi için hangi kısa soruyu sorabilirsin?",
      en: "What short question could help a guest feel comfortable?",
    },
    beats: [
      { tr: "Ziyaret haberi ve düşünceli hazırlık", en: "News of a visit and thoughtful preparation" },
      { tr: "Kart, oyun köşesi ve sade ikram", en: "A card, play corner and simple refreshments" },
      { tr: "Misafirin tercihine gerçek alan açılması", en: "Real room for the guest’s preferences" },
      { tr: "Kartın ortak hatıraya dönüşmesi", en: "The card becomes a shared memory" },
    ],
  },
  {
    n: "09",
    title: { tr: "Küçük Bir İncelik", en: "A Small Kindness" },
    value: { tr: "Şefkat · Karşılıklı bakım", en: "Compassion · Mutual care" },
    summary: {
      tr: "Elif dedesinin güneş şapkasını, Hasan Dede Elif’in su şişesini hatırlar. Bakım, iki yönde akan küçük ve saygılı bir dikkattir.",
      en: "Elif remembers her grandfather’s sun hat; Hasan remembers Elif’s water bottle. Care is a small, respectful attention flowing both ways.",
    },
    outcome: {
      tr: "Çocuk, bir başkasının ihtiyacını fark edip küçük ve saygılı yardım sunmanın şefkat olduğunu görür.",
      en: "The child sees that noticing another person’s need and offering respectful help is an act of compassion.",
    },
    question: {
      tr: "Bugün evde birinin işini kolaylaştıracak hangi ayrıntıyı fark edebilirsin?",
      en: "What small detail could you notice today to make someone’s day easier?",
    },
    beats: [
      { tr: "Şapka ve su şişesinin paralel hatırlanması", en: "Hat and water bottle remembered in parallel" },
      { tr: "Kapıda iki inceliğin buluşması", en: "Two small kindnesses meet at the door" },
      { tr: "Parkta davranışların doğal sonucu", en: "Their natural value becomes visible in the park" },
      { tr: "Dikkatin çevreye genişlemesi", en: "Attention expands to the shared environment" },
    ],
  },
  {
    n: "10",
    title: { tr: "İyi Ki Yaptın", en: "I’m Glad You Did" },
    value: { tr: "Şükran · Emeği fark etme", en: "Gratitude · Seeing effort" },
    summary: {
      tr: "Aile üyeleri gün boyunca birbirlerinin küçük katkılarını somut cümlelerle fark eder. Takdir, puan veren bir sistem değil, aile içinde dolaşan dildir.",
      en: "Family members notice one another’s small contributions with specific words. Appreciation is not a reward chart but a language that circulates through the home.",
    },
    outcome: {
      tr: "Çocuk, teşekkür ederken davranışı adlandırmayı ve başkalarının görünmeyen emeğini fark etmeyi öğrenir.",
      en: "The child learns to name the action when thanking someone and to notice effort that might otherwise remain unseen.",
    },
    question: {
      tr: "Bugün kime, yaptığı hangi küçük şey için teşekkür etmek istersin?",
      en: "Who would you thank today, and for what small action?",
    },
    beats: [
      { tr: "İlk küçük katkıların fark edilmesi", en: "The first small contributions are noticed" },
      { tr: "Teşekkür cümlesinde davranışın adlandırılması", en: "The action is named in the thank-you" },
      { tr: "Takdir dilinin her yöne dolaşması", en: "Appreciation moves in every direction" },
      { tr: "Farklı el izlerinin panoda buluşması", en: "Different handprints meet on the family board" },
    ],
  },
  {
    n: "11",
    title: { tr: "Bayram Hazırlığı", en: "Preparing for the Holiday" },
    value: { tr: "Gelenek · Ziyaret", en: "Tradition · Visiting" },
    summary: {
      tr: "Hasan Dede’nin bayram kartı ile çocukların kısa görüntülü selam fikri birleşir. Eski ve yeni araçlar, yakınları hatırlama niyetinde buluşur.",
      en: "Hasan’s holiday card joins the children’s idea for a short video greeting. Old and new tools meet in the intention to remember loved ones.",
    },
    outcome: {
      tr: "Çocuk, bayramın hatırlama, selam verme, ziyaret ve birlikte hazırlık gibi ilişki kuran davranışlarını tanır.",
      en: "The child recognizes remembering, greeting, visiting and preparing together as relationship-building parts of a holiday.",
    },
    question: {
      tr: "Bayramda uzaktaki bir yakınına nasıl sıcak bir selam gönderirdin?",
      en: "How would you send a warm holiday greeting to someone far away?",
    },
    beats: [
      { tr: "Ziyaret planı ve eski kartın bulunması", en: "Visit planning and an old card" },
      { tr: "El çizimi kart ile kısa video selamın birleşmesi", en: "A hand-drawn card joins a short video greeting" },
      { tr: "Üç kuşağın hazırlığa eşit katkısı", en: "Three generations contribute equally" },
      { tr: "Açık kapıdan ziyaret yolculuğu", en: "A journey to visit through the open door" },
    ],
  },
  {
    n: "12",
    title: { tr: "Sevincin Çoğalsın", en: "Let Joy Grow" },
    value: { tr: "Destek · Süreç odaklı takdir", en: "Support · Process-focused praise" },
    summary: {
      tr: "Can bağcığını kendi yöntemiyle bağlar. Aile onu ‘en iyi’ ilan etmek yerine denemesini, sabrını ve yöntemini görünür kılar.",
      en: "Can ties his laces with his own method. Rather than calling him ‘the best’, the family notices his trying, patience and method.",
    },
    outcome: {
      tr: "Çocuk, bir yakınının başarısını kıyaslamadan kutlayabileceğini ve öğrendiği yöntemi paylaşabileceğini görür.",
      en: "The child sees that another person’s success can be celebrated without comparison and that a useful method can be shared.",
    },
    question: {
      tr: "Birinin sevincini büyütmek için ona ne söyleyebilirsin?",
      en: "What could you say to help someone’s joy grow?",
    },
    beats: [
      { tr: "Can’ın sakin denemeleri", en: "Can’s calm attempts" },
      { tr: "Ailenin işi elinden almadan destek olması", en: "Support without taking the task away" },
      { tr: "Düğümün tamamlanması ve sürecin adlandırılması", en: "The knot is completed and the process is named" },
      { tr: "Can’ın yöntemini başkasına aktarması", en: "Can shares his method with someone else" },
    ],
  },
  {
    n: "13",
    title: { tr: "Uzaklar Yakın Olunca", en: "When Far Feels Near" },
    value: { tr: "Akrabalık · Bilinçli teknoloji", en: "Family ties · Mindful technology" },
    summary: {
      tr: "Uzaktaki Leyla Hala’yla kısa ve amaçlı bir görüntülü görüşme yapılır. Ekran kapandıktan sonra fiziksel bir çizim ve zarf hazırlanır.",
      en: "The family has a short, purposeful video call with Aunt Leyla. When the screen closes, they prepare a physical drawing and envelope.",
    },
    outcome: {
      tr: "Çocuk, teknolojinin süre ve amaç sınırı olan bir iletişim aracı olabileceğini görür.",
      en: "The child sees that technology can be a communication tool with a clear purpose and time boundary.",
    },
    question: {
      tr: "Ekran kapandıktan sonra uzaktaki bir yakının için ne hazırlayabilirsin?",
      en: "What could you make for a relative after the screen is put away?",
    },
    beats: [
      { tr: "Uygun saat ve amaçla görüşme hazırlığı", en: "A call planned around purpose and a suitable time" },
      { tr: "Sırayla konuşulan sıcak aile görüşmesi", en: "A warm family call where everyone takes turns" },
      { tr: "Ekranın bilinçli biçimde kapanması", en: "The screen is intentionally put away" },
      { tr: "Eski fotoğraf, yeni çizim ve zarf", en: "An old photo, a new drawing and an envelope" },
    ],
  },
  {
    n: "14",
    title: { tr: "Komşumuza da Var", en: "Some for Our Neighbour, Too" },
    value: { tr: "Paylaşma · Komşuluk", en: "Sharing · Neighbourhood" },
    summary: {
      tr: "Büyüyen fesleğen komşuyla paylaşılır; karşılığında gelen çiçek tohumları yeni bir ortak döngü başlatır. Veren–alan hiyerarşisi kurulmaz.",
      en: "The thriving basil is shared with a neighbour; flower seeds received in return begin a new cycle. No giver–receiver hierarchy is created.",
    },
    outcome: {
      tr: "Çocuk, paylaşmanın saygılı ve karşılıklılığa açık toplumsal bağ kurduğunu fark eder.",
      en: "The child sees that sharing can build a respectful social bond open to reciprocity.",
    },
    question: {
      tr: "İyi bir şeyi çoğaltmak için komşunla ne paylaşabilirsin?",
      en: "What good thing could you share with a neighbour to help it grow?",
    },
    beats: [
      { tr: "Fesleğen fazlasını paylaşma kararı", en: "A decision to share the extra basil" },
      { tr: "Çocukların hazırladığı küçük saksı", en: "A small pot prepared by the children" },
      { tr: "Komşudan gelen kadife çiçeği tohumu", en: "Marigold seeds from the neighbour" },
      { tr: "İki balkonda büyüyen ortak döngü", en: "A shared cycle grows across two balconies" },
    ],
  },
  {
    n: "15",
    title: { tr: "İyi Ki Aileyiz", en: "Glad We Are a Family" },
    value: { tr: "Ortak kimlik · Geleceğe süreklilik", en: "Shared identity · Continuity" },
    summary: {
      tr: "Her aile üyesi ortak hatıra kutusuna kendinden bir iz koyar. Hasan Dede’nin boş zarfı, hikâyenin birlikte yaşanacak yeni günlerle süreceğini söyler.",
      en: "Each family member places a personal trace in a shared memory box. Hasan’s empty envelope promises that the story will continue through days yet to be lived.",
    },
    outcome: {
      tr: "Çocuk, aile aidiyetinin tek bir kişiye değil ortak yaşantılara ve herkesin katkısına dayandığını ayırt eder.",
      en: "The child recognizes that family belonging rests not on one person, but on shared experiences and everyone’s contribution.",
    },
    question: {
      tr: "Ailenizin hatıra kutusuna bugün hangi küçük izi koyardın?",
      en: "What small trace would you place in your family’s memory box today?",
    },
    beats: [
      { tr: "Hatıra kutusu için ortak tasarım", en: "A shared design for the memory box" },
      { tr: "Önceki bölümlerden nesnelerin seçimi", en: "Objects selected from earlier episodes" },
      { tr: "Her nesneye eşlik eden kişisel anı", en: "A personal memory accompanies each object" },
      { tr: "Gelecek günler için boş zarf", en: "An empty envelope for future days" },
    ],
  },
];

const copy = {
  tr: {
    nav: [["Proje", "#proje"], ["Neden?", "#neden"], ["Evren", "#evren"], ["15 Bölüm", "#bolumler"], ["Storyboard", "#storyboard"], ["Üretim", "#uretim"], ["Etki", "#etki"]],
    eyebrow: "ANİMASYON KAMU SPOTU SERİSİ",
    heroTitleA: "Bir çocuk güveni",
    heroTitleB: "görerek öğrenir.",
    heroText: "Üç kuşağın aynı evde sevgi, güven, dinleme ve ortak yaşam kültürüyle buluştuğu 15 bölümlük animasyon serisi.",
    primaryCta: "Bölümleri keşfet",
    secondaryCta: "Projeyi 90 saniyede anla",
    submitted: "T.C. Aile ve Sosyal Hizmetler Bakanlığı’na sunulmak üzere",
    prepared: "Ratel Dijital · Proje Geliştirme",
    promiseLabel: "Projenin tek cümlelik vaadi",
    promise: "Bir çocuk bu seriyi izlediğinde yalnızca ‘Aile benim için ne yapar?’ sorusuna değil, ‘Ben ailemin sıcaklığına nasıl katkı sunarım?’ sorusuna da davranış örnekleriyle cevap bulur.",
  },
  en: {
    nav: [["Project", "#proje"], ["Why?", "#neden"], ["World", "#evren"], ["15 Episodes", "#bolumler"], ["Storyboard", "#storyboard"], ["Production", "#uretim"], ["Impact", "#etki"]],
    eyebrow: "ANIMATED PUBLIC-SERVICE SERIES",
    heroTitleA: "A child learns trust",
    heroTitleB: "by seeing it.",
    heroText: "A 15-episode animated series where three generations share love, trust, attentive listening and the culture of living together.",
    primaryCta: "Explore episodes",
    secondaryCta: "Understand it in 90 seconds",
    submitted: "Prepared for submission to the Ministry of Family and Social Services",
    prepared: "Ratel Digital · Project Development",
    promiseLabel: "The project in one sentence",
    promise: "A child who watches the series finds behavioural answers not only to ‘What does my family do for me?’ but also to ‘How can I contribute to the warmth of my family?’",
  },
};

const characters = [
  { initials: "E", color: "turquoise", name: "Elif · 8", tr: "Merakı sahneyi başlatır. Soru sorar, fikir önerir ve aile hafızasına yeni bir iz ekler.", en: "Her curiosity starts the scene. She asks, proposes and adds a new trace to family memory." },
  { initials: "C", color: "mustard", name: "Can · 6", tr: "Somut düşünür, küçük görevleri görünür kılar. Ablasının yardımcısı değil, ayrı fikri olan ortağıdır.", en: "He thinks concretely and makes small tasks visible. He is a partner with ideas of his own." },
  { initials: "Z", color: "plum", name: "Zeynep · 36", tr: "Hazır cevap vermek yerine alan açan; sakin, net ve eşit sorumluluk alan anne.", en: "A calm, clear mother who makes room for children’s thinking and shares responsibility equally." },
  { initials: "M", color: "navy", name: "Murat · 39", tr: "Bakım veren, ev yaşamına katılan ve çocuğun işini elinden almadan destekleyen baba.", en: "A caring father active at home who supports a child without taking the task away." },
  { initials: "H", color: "olive", name: "Hasan Dede · 68", tr: "Geçmişi taşıyan ama bugünü de merak eden; aktif, özerk ve çocuktan öğrenmeye açık aile büyüğü.", en: "An active, independent elder who carries the past, stays curious about today and learns from children." },
];

const storyboardSets = [
  {
    episode: "01", image: `${ASSET_PREFIX}/images/storyboard-biz-buradayiz.webp`, title: { tr: "Biz Buradayız", en: "We Are Here" },
    frames: [
      { tr: "Sofra için herkes küçük bir işe dokunur.", en: "Every hand contributes to preparing the table." },
      { tr: "Işık kesilir; yüzler hâlâ okunur, sesler sakindir.", en: "The power cuts; faces remain readable and voices calm." },
      { tr: "Can seslenir; aile sırayla ‘buradayız’ diye cevap verir.", en: "Can calls out; the family answers one by one: ‘We are here.’" },
      { tr: "Murat şarjlı ışığı getirir, Zeynep güvenli alanı kurar.", en: "Murat brings the lamp; Zeynep secures the play area." },
      { tr: "Elif, Hasan Dede’ye kuş gölgesini öğretir.", en: "Elif teaches Hasan the bird shadow." },
      { tr: "Işık geri gelir; sıcak pencere aileyi tek kadrajda tutar.", en: "The light returns; a warm window holds the family in one frame." },
    ],
  },
  {
    episode: "06", image: `${ASSET_PREFIX}/images/storyboard-fotograftaki-hikaye.webp`, title: { tr: "Fotoğraftaki Hikâye", en: "The Story in the Photograph" },
    frames: [
      { tr: "Eski fotoğraf kitaplıktan sessizce düşer.", en: "An old photograph quietly slips from the shelf." },
      { tr: "Çocuklar ayrıntıları seçer; Hasan Dede cevap yerine hikâye açar.", en: "The children pick details; Hasan opens a story rather than giving a lecture." },
      { tr: "Geçmişteki piknik kısa, sıcak bir görsel anıya dönüşür.", en: "The old picnic becomes a brief, warm visual memory." },
      { tr: "Aile aynı çınara bugünden yürür.", en: "The family walks to the same tree from the present day." },
      { tr: "Yeni fotoğraf, bugünün kırmızı su şişesiyle çekilir.", en: "A new photograph is taken with today’s red water bottle." },
      { tr: "İki zaman, albümde yan yana yaşayan aile hafızası olur.", en: "Two times live side by side as family memory." },
    ],
  },
  {
    episode: "15", image: `${ASSET_PREFIX}/images/storyboard-iyi-ki-aileyiz.webp`, title: { tr: "İyi Ki Aileyiz", en: "Glad We Are a Family" },
    frames: [
      { tr: "Elif dolan panodan bir hatıra kutusu fikri çıkarır.", en: "A full family board inspires Elif’s memory-box idea." },
      { tr: "Beş kişi kutuyu birlikte tasarlar ve üretir.", en: "All five design and build the box together." },
      { tr: "Sarı yaprak, tarif, fotoğraf ve tohumlar bir araya gelir.", en: "Leaf, recipe, photographs and seeds come together." },
      { tr: "Her nesneye bir kişinin kısa hatırası eşlik eder.", en: "Each object is accompanied by one person’s short memory." },
      { tr: "Hasan Dede, gelecekteki günler için boş zarfı koyar.", en: "Hasan adds an empty envelope for future days." },
      { tr: "Beş el, açık kutu ve sıcak pencere aynı duyguda birleşir.", en: "Five hands, the open box and the warm window share one feeling." },
    ],
  },
];

const productionSteps: { n: string; title: Bilingual; text: Bilingual }[] = [
  { n: "01", title: { tr: "Konsept kilidi", en: "Concept lock" }, text: { tr: "Ana fikir, aile tanımı, karakter işlevleri ve kırmızı çizgiler kurum–yaratıcı ekip–pedagog arasında kesinleşir.", en: "The institution, creative team and pedagogue lock the premise, family definition, character roles and red lines." } },
  { n: "02", title: { tr: "Pilot senaryo", en: "Pilot script" }, text: { tr: "‘Biz Buradayız’ diyalog, süre ve tek davranış ilkesiyle ayrıntılı senaryoya dönüşür.", en: "‘We Are Here’ becomes a full script built around timing, dialogue and one observable behaviour." } },
  { n: "03", title: { tr: "Görsel geliştirme", en: "Visual development" }, text: { tr: "Model sheet, ev yerleşimi, renk senaryosu, prop kütüphanesi ve ana stil kareleri üretilir.", en: "Model sheets, home layout, colour script, prop library and key style frames are produced." } },
  { n: "04", title: { tr: "Storyboard + animatik", en: "Storyboard + animatic" }, text: { tr: "Kamera, bakış, ritim ve davranış okunabilirliği üretim öncesi doğrulama aşamasında test edilir.", en: "Camera, gaze, rhythm and behavioural readability are tested during pre-production validation." } },
  { n: "05", title: { tr: "Çocuk testi", en: "Child testing" }, text: { tr: "6–9 yaş grubunda anlaşılabilirlik, duygu, karakter yakınlığı ve hatırlama gözlenir.", en: "Comprehension, emotion, character affinity and recall are observed with children aged 6–9." } },
  { n: "06", title: { tr: "Seri üretimi", en: "Series production" }, text: { tr: "Onaylanan pilot diliyle 14 bölüm; ortak karakter, mekân ve nesne kütüphanesinden üretilir.", en: "Fourteen episodes are produced from the approved pilot language and shared asset library." } },
  { n: "07", title: { tr: "Teslim ve arşiv", en: "Delivery and archive" }, text: { tr: "Ana master, erişilebilir sürümler, sosyal uyarlamalar, onay kayıtları ve sohbet kartları teslim edilir.", en: "Masters, accessible versions, social edits, approvals and conversation cards are delivered." } },
];

const outputCards = [
  { icon: Film, number: "15", tr: "16:9 yayın masterı", en: "16:9 broadcast masters" },
  { icon: Captions, number: "15", tr: "altyazılı erişilebilir sürüm", en: "accessible subtitled versions" },
  { icon: Eye, number: "9:16", tr: "ve 1:1 sosyal uyarlamalar", en: "and 1:1 social adaptations" },
  { icon: BookOpen, number: "15", tr: "aile sohbet kartı", en: "family conversation cards" },
];

function SectionHeading({ locale, kicker, title, text }: { locale: Locale; kicker: Bilingual; title: Bilingual; text?: Bilingual }) {
  return <div className="section-heading"><p className="kicker">{kicker[locale]}</p><h2>{title[locale]}</h2>{text && <p className="section-intro">{text[locale]}</p>}</div>;
}

const USER_HASH = "75da293fa893fbfa8fd5fe575af4445661b67cb715437aebcbbb7b4d6cc34d5b";
const PASSWORD_HASH = "95f5c93cdf6f7d46d7c7cd41d2b6199ee390f2cc82259ce2233bad2cab194ad3";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function AccessGate({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    const [userHash, passwordHash] = await Promise.all([sha256(username.trim()), sha256(password)]);
    if (userHash === USER_HASH && passwordHash === PASSWORD_HASH) {
      window.sessionStorage.setItem("iyikiaileyiz-access", "granted");
      onSuccess();
      return;
    }
    setLoading(false);
    setError(true);
  };

  return (
    <main className="access-gate">
      <img className="access-backdrop" src={`${ASSET_PREFIX}/images/yalin-family-hero.webp`} alt="" />
      <div className="access-overlay" />
      <div className="access-topbar">
        <a className="access-project-brand" href="https://rateldijital.com" target="_blank" rel="noreferrer">
          <span className="brand-mark"><HeartHandshake size={22} strokeWidth={1.8} /></span>
          <span><strong>İYİ Kİ AİLEYİZ</strong><small>ANİMASYON PROJESİ</small></span>
        </a>
        <span className="access-status"><i /> ÖZEL PROJE SUNUMU</span>
      </div>

      <section className="access-panel" aria-labelledby="access-title">
        <div className="access-intro">
          <p className="access-kicker">RATEL DİJİTAL SUNAR</p>
          <div className="ratel-wordmark" aria-label="Ratel Dijital"><strong>RATEL</strong><span>DİJİTAL</span></div>
          <h1 id="access-title">Birlikte büyüyen güvenin animasyon dünyası.</h1>
          <p>“İyi Ki Aileyiz” projesinin kapsamını, 15 bölümlük anlatı evrenini ve yapım modelini incelemek üzere hazırlanmış özel sunum alanı.</p>
          <a className="ratel-link" href="https://rateldijital.com" target="_blank" rel="noreferrer">rateldijital.com <ArrowRight size={16} /></a>
        </div>

        <form className="access-form" onSubmit={submit}>
          <div className="access-lock"><LockKeyhole size={23} /></div>
          <p className="access-form-kicker">YETKİLİ ERİŞİMİ</p>
          <h2>Proje sunumuna giriş</h2>
          <p className="access-form-copy">Size iletilen kullanıcı adı ve şifreyle devam edin.</p>
          <label>
            <span>Kullanıcı adı</span>
            <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" spellCheck={false} required />
          </label>
          <label>
            <span>Şifre</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          {error && <p className="access-error" role="alert">Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.</p>}
          <button type="submit" disabled={loading}>{loading ? "Doğrulanıyor…" : "Sunuma giriş"}<ArrowRight size={18} /></button>
          <small>Bu sunum Ratel Dijital tarafından kurum değerlendirmesi için hazırlanmıştır.</small>
        </form>
      </section>
      <p className="access-footer">© 2026 RATEL DİJİTAL · HAYAL ET · TASARLA · GELİŞTİR · ÜRET</p>
    </main>
  );
}

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [locale, setLocale] = useState<Locale>("tr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [boardIndex, setBoardIndex] = useState(0);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const c = copy[locale];
  const episode = episodes[selectedEpisode];
  const board = storyboardSets[boardIndex];

  useEffect(() => { setAuthorized(window.sessionStorage.getItem("iyikiaileyiz-access") === "granted"); }, []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setFrame((current) => (current + 1) % 6), 2200);
    return () => window.clearInterval(id);
  }, [playing]);
  useEffect(() => { setFrame(0); setPlaying(false); }, [boardIndex]);

  const framePosition = useMemo(() => `${(frame % 3) * 50}% ${Math.floor(frame / 3) * 100}%`, [frame]);
  const chooseEpisode = (index: number) => {
    setSelectedEpisode(index);
    window.setTimeout(() => document.getElementById("episode-detail")?.scrollIntoView({ behavior: "auto", block: "center" }), 40);
  };
  const navigateToSection = (event: ReactMouseEvent<HTMLAnchorElement>, href: string, closeMenu = false) => {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const headerOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    window.history.replaceState(null, "", href);
    event.currentTarget.blur();
    if (closeMenu) setMenuOpen(false);
  };

  if (!authorized) return <AccessGate onSuccess={() => setAuthorized(true)} />;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#proje" aria-label="İyi Ki Aileyiz"><span className="brand-mark"><HeartHandshake size={22} strokeWidth={1.8} /></span><span><strong>İYİ Kİ AİLEYİZ</strong><small>{locale === "tr" ? "ANİMASYON PROJESİ" : "ANIMATION PROJECT"}</small></span></a>
        <nav className="desktop-nav" aria-label={locale === "tr" ? "Ana menü" : "Main navigation"}>{c.nav.map(([label, href]) => <a key={href} href={href} onClick={(event) => navigateToSection(event, href)}>{label}</a>)}</nav>
        <div className="header-actions"><button className="language-button" onClick={() => setLocale(locale === "tr" ? "en" : "tr")} aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geç"}><Languages size={17} /> {locale === "tr" ? "EN" : "TR"}</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={locale === "tr" ? "Menüyü aç" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button></div>
        {menuOpen && <nav className="mobile-nav">{c.nav.map(([label, href]) => <a key={href} href={href} onClick={(event) => navigateToSection(event, href, true)}>{label}<ChevronRight size={18} /></a>)}</nav>}
      </header>

      <section className="hero" id="proje">
        <img src={`${ASSET_PREFIX}/images/yalin-family-hero.webp`} alt={locale === "tr" ? "Yalın ailesi sofrayı birlikte hazırlıyor" : "The Yalın family prepares the table together"} />
        <div className="hero-shade" />
        <div className="hero-content shell"><div className="hero-copy"><p className="hero-eyebrow"><span />{c.eyebrow}</p><h1>{c.heroTitleA}<em>{c.heroTitleB}</em></h1><p className="hero-text">{c.heroText}</p><div className="hero-buttons"><a className="button primary" href="#bolumler">{c.primaryCta}<ArrowRight size={18} /></a><a className="button ghost" href="#neden"><Play size={17} fill="currentColor" />{c.secondaryCta}</a></div></div><div className="hero-meta"><div><span>15</span><small>{locale === "tr" ? "BÖLÜM" : "EPISODES"}</small></div><div><span>90–120</span><small>{locale === "tr" ? "SANİYE" : "SECONDS"}</small></div><div><span>6–9</span><small>{locale === "tr" ? "YAŞ" : "AGES"}</small></div><div><span>3</span><small>{locale === "tr" ? "KUŞAK" : "GENERATIONS"}</small></div></div></div>
        <div className="hero-credit shell"><span>{c.submitted}</span><span>{c.prepared}</span></div>
      </section>

      <section className="promise-strip"><div className="shell promise-layout"><p>{c.promiseLabel}</p><blockquote>{c.promise}</blockquote><Sparkles aria-hidden="true" /></div></section>

      <section className="section why-section" id="neden"><div className="shell">
        <SectionHeading locale={locale} kicker={{ tr: "NEDEN BU PROJE?", en: "WHY THIS PROJECT?" }} title={{ tr: "Her çocuk güven veren aile davranışlarını gözlemleyemiyor.", en: "Not every child gets to observe reassuring family behaviour." }} text={{ tr: "Proje olumsuz aile deneyimlerini ekrana taşımak yerine, güvenli ilişkiyi oluşturan davranışları görünür ve taklit edilebilir hâle getirir.", en: "Rather than depicting negative family experiences, the project makes the behaviours that build safe relationships visible and repeatable." }} />
        <div className="logic-grid">{[
          { n: "01", tr: "Sorun", en: "Challenge", trText: "Her çocuk kendisini güvende, değerli ve dinlenmiş hissettiren davranışları gündelik yaşamında yeterince göremiyor.", enText: "Not every child regularly sees behaviours that make them feel safe, valued and heard." },
          { n: "02", tr: "Yaratıcı yanıt", en: "Creative response", trText: "Bağırma, ceza ve çatışmayı yeniden üretmeden; dinleme, yardım isteme ve ortak sorumluluk animasyonla modelleniyor.", enText: "Listening, asking for help and shared responsibility are modelled without reproducing shouting, punishment or conflict." },
          { n: "03", tr: "Somut çıktı", en: "Tangible output", trText: "Her biri tek değer–tek davranış taşıyan 15 bağımsız kısa animasyon ve tamamlayıcı aile materyalleri.", enText: "Fifteen standalone short animations—one value and one observable behaviour each—plus family materials." },
          { n: "04", tr: "Beklenen etki", en: "Intended impact", trText: "Çocukların güveni, dinlenmeyi, aidiyeti, katkı sunmayı ve yardım istemeyi davranış düzeyinde tanıması.", enText: "Children recognize trust, listening, belonging, contributing and asking for help at the level of behaviour." },
        ].map((item) => <article className="logic-card" key={item.n}><span>{item.n}</span><h3>{locale === "tr" ? item.tr : item.en}</h3><p>{locale === "tr" ? item.trText : item.enText}</p></article>)}</div>
        <div className="evidence-band"><div className="evidence-lead"><ShieldCheck size={38} /><div><p>{locale === "tr" ? "PEDAGOJİK YAKLAŞIM" : "PEDAGOGICAL APPROACH"}</p><h3>{locale === "tr" ? "Öğüt değil, açık davranış modeli" : "Observable models, not lectures"}</h3></div></div><p>{locale === "tr" ? "Prososyal medya araştırmaları, açık biçimde modellenen olumlu davranışlarla prososyal davranış ve empatik ilgi arasında destekleyici ilişkiler bulunduğunu gösteriyor. Proje etkiyi garanti etmez; davranışı görünür, konuşulabilir ve tekrar edilebilir kılar." : "Research on prosocial media reports supportive associations between clearly modelled positive behaviour, prosocial action and empathic concern. The project does not promise automatic change; it makes behaviour visible, discussable and repeatable."}</p></div>
      </div></section>

      <section className="section concept-section"><div className="shell concept-grid"><div>
        <SectionHeading locale={locale} kicker={{ tr: "ANLATI MOTORU", en: "STORY ENGINE" }} title={{ tr: "Çatışmasız. Ama asla durağan değil.", en: "Conflict-free. Never static." }} text={{ tr: "Dramatik hareket aile içi gerilimden değil; merak, seçim, küçük dışsal olay ve birlikte üretimden doğar.", en: "Dramatic movement grows from curiosity, choice, small external events and making together—not family conflict." }} />
        <div className="engine-list">{[["01", "Gündelik düzen", "Everyday rhythm"], ["02", "Çocuk merakı", "Child curiosity"], ["03", "Küçük dışsal olay", "Small external event"], ["04", "Birlikte eylem", "Shared action"], ["05", "Somut sonuç", "Visible result"]].map(([n, tr, en], index) => <div key={n}><span>{n}</span><p>{locale === "tr" ? tr : en}</p>{index < 4 && <ChevronRight />}</div>)}</div>
      </div><aside className="constitution-card"><p className="kicker">{locale === "tr" ? "PEDAGOJİK ANAYASA" : "PEDAGOGICAL CONSTITUTION"}</p><h3>{locale === "tr" ? "15 değişmez ilke" : "15 non-negotiable principles"}</h3><ul>{[
        { tr: "Tek bölümde tek ana değer ve tek gözlenebilir davranış", en: "One core value and one observable behaviour per episode" }, { tr: "Çocuk; soru soran, seçen ve katkı sunan aktif özne", en: "The child asks, chooses and actively contributes" }, { tr: "Anne ve baba bakımda ve karar süreçlerinde eşit görünür", en: "Mother and father are equally visible in care and decisions" }, { tr: "Hasan Dede hem öğreten hem çocuktan öğrenen aktif aile büyüğü", en: "Hasan both teaches and learns as an active elder" }, { tr: "Korku, utandırma, kıyas, ceza ve yaşlılık mizahı yok", en: "No fear, shame, comparison, punishment or age-based ridicule" }, { tr: "Değer önce görüntüde yaşanır, sonra gerekirse söze dönüşür", en: "Values are lived on screen before they are ever named" },
      ].map((item) => <li key={item.tr}><Check size={17} />{item[locale]}</li>)}</ul><p className="constitution-note">{locale === "tr" ? "Her senaryo çocuk gelişimi, güvenlik, kapsayıcılık ve kültürel temsil kontrolünden geçer." : "Every script passes child-development, safety, inclusion and cultural-representation review."}</p></aside></div></section>

      <section className="section world-section" id="evren"><div className="shell">
        <SectionHeading locale={locale} kicker={{ tr: "YALIN AİLESİ", en: "THE YALIN FAMILY" }} title={{ tr: "Üç kuşak. Beş ayrı ses. Tek güvenli ilişki alanı.", en: "Three generations. Five distinct voices. One safe relational space." }} text={{ tr: "Karakterler kusursuz oldukları için değil, güven veren davranışları gündelik hayatın içinde görünür kıldıkları için örnek oluşturur.", en: "The characters are not models because they are perfect, but because they make reassuring behaviour visible in everyday life." }} />
        <div className="character-grid">{characters.map((character) => <article className="character-card" key={character.name}><div className={`character-avatar ${character.color}`}>{character.initials}</div><div><h3>{character.name}</h3><p>{character[locale]}</p></div></article>)}</div>
        <div className="home-card"><div><p className="kicker">{locale === "tr" ? "EV DE BİR KARAKTERDİR" : "THE HOME IS A CHARACTER"}</p><h3>{locale === "tr" ? "Yaşanmış, erişilebilir, sıcak." : "Lived-in, accessible, warm."}</h3></div><p>{locale === "tr" ? "Lüks ya da yoksunluk göstergesi olmayan ev; çocuk çizimleri, farklı kuşaklardan kitaplar, ortak sofra, balkon bitkileri ve kişisel köşelerle gerçekten birlikte yaşanan bir mekândır." : "Neither luxurious nor deprived, the home feels genuinely shared through children’s drawings, books from different generations, the family table, balcony plants and private corners."}</p></div>
      </div></section>

      <section className="section episodes-section" id="bolumler"><div className="shell">
        <SectionHeading locale={locale} kicker={{ tr: "15 BÖLÜM · 15 DAVRANIŞ", en: "15 EPISODES · 15 BEHAVIOURS" }} title={{ tr: "Bir sezon değil, yaşayan bir aile iletişim kütüphanesi.", en: "More than a season: a living library of family communication." }} text={{ tr: "Bölümler bağımsız izlenir; sarı yaprak, fesleğen, tarif defteri, fotoğraf ve hatıra kutusu düzenli izleyici için birikimli hafıza oluşturur.", en: "Episodes stand alone, while the yellow leaf, basil, recipe book, photographs and memory box create a cumulative memory for regular viewers." }} />
        <div className="episode-selector" aria-label={locale === "tr" ? "Bölüm seçici" : "Episode selector"}>{episodes.map((item, index) => <button key={item.n} className={selectedEpisode === index ? "active" : ""} onClick={() => chooseEpisode(index)}><span>{item.n}</span><strong>{item.title[locale]}</strong><small>{item.value[locale]}</small></button>)}</div>
        <article className="episode-detail" id="episode-detail"><div className="episode-main"><div className="episode-number">{episode.n}</div><p className="kicker">{locale === "tr" ? "BÖLÜM DOSYASI" : "EPISODE FILE"}</p><h3>{episode.title[locale]}</h3><p className="episode-value">{episode.value[locale]}</p><p className="episode-summary">{episode.summary[locale]}</p><div className="outcome-box"><ShieldCheck /><div><small>{locale === "tr" ? "GÖZLENEBİLİR KAZANIM" : "OBSERVABLE OUTCOME"}</small><p>{episode.outcome[locale]}</p></div></div><div className="episode-pager"><button disabled={selectedEpisode === 0} onClick={() => setSelectedEpisode((i) => Math.max(0, i - 1))}><ArrowLeft />{locale === "tr" ? "Önceki" : "Previous"}</button><span>{selectedEpisode + 1} / 15</span><button disabled={selectedEpisode === 14} onClick={() => setSelectedEpisode((i) => Math.min(14, i + 1))}>{locale === "tr" ? "Sonraki" : "Next"}<ArrowRight /></button></div></div>
        <div className="episode-board"><div className="board-top"><span>{locale === "tr" ? "ÖNERİLEN ANİMATİK OMURGASI" : "PROPOSED ANIMATIC SPINE"}</span><span><Clock3 size={15} />105–110 sn</span></div><div className="beat-list">{episode.beats.map((beat, index) => <div className="beat" key={beat.tr}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{["00:00", "00:25", "01:10", "01:38"][index]}</small><p>{beat[locale]}</p></div></div>)}</div><div className="conversation-card"><BookOpen /><div><small>{locale === "tr" ? "AİLE SOHBET KARTI" : "FAMILY CONVERSATION CARD"}</small><p>{episode.question[locale]}</p></div></div></div></article>
      </div></section>

      <section className="section storyboard-section" id="storyboard"><div className="shell">
        <SectionHeading locale={locale} kicker={{ tr: "STORYBOARD + ANİMATİK", en: "STORYBOARD + ANIMATIC" }} title={{ tr: "Fikir, animasyona geçmeden önce görsel bir anlatıya dönüşür.", en: "The idea becomes a visual narrative before animation production begins." }} text={{ tr: "Üç kilit bölümün karakalem storyboardları; kamera, ritim, bakış yönü ve davranışın görüntüde okunabilirliğini test eden etkileşimli animatik ön izlemeye dönüştürüldü.", en: "Pencil storyboards for three key episodes become an interactive animatic preview that tests camera, rhythm, gaze and the on-screen readability of behaviour." }} />
        <div className="storyboard-tabs">{storyboardSets.map((item, index) => <button key={item.episode} className={boardIndex === index ? "active" : ""} onClick={() => setBoardIndex(index)}><span>{item.episode}</span>{item.title[locale]}</button>)}</div>
        <div className="animatic"><div className="animatic-screen" style={{ backgroundImage: `url(${board.image})`, backgroundPosition: framePosition }} role="img" aria-label={`${board.title[locale]} — ${board.frames[frame][locale]}`}><div className="frame-safe"><span>{locale === "tr" ? "KARE" : "FRAME"} {String(frame + 1).padStart(2, "0")}</span><span>16:9 SAFE</span></div><div className="animatic-caption"><strong>{board.title[locale]}</strong><p>{board.frames[frame][locale]}</p></div></div><div className="animatic-console"><div className="console-head"><div><small>{locale === "tr" ? "ANİMATİK ÖN İZLEME" : "ANIMATIC PREVIEW"}</small><strong>{board.title[locale]}</strong></div><span>01:{String(45 + boardIndex * 2).padStart(2, "0")}</span></div><div className="progress-track">{board.frames.map((_, index) => <button key={index} className={index <= frame ? "filled" : ""} onClick={() => { setFrame(index); setPlaying(false); }} aria-label={`${locale === "tr" ? "Kare" : "Frame"} ${index + 1}`} />)}</div><div className="console-controls"><button onClick={() => { setPlaying(false); setFrame((f) => (f + 5) % 6); }}><ArrowLeft /></button><button className="play" onClick={() => setPlaying(!playing)}>{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={() => { setPlaying(false); setFrame((f) => (f + 1) % 6); }}><ArrowRight /></button></div><div className="shot-notes"><p><span>{locale === "tr" ? "KAMERA" : "CAMERA"}</span>{frame % 3 === 0 ? (locale === "tr" ? "Geniş plan" : "Wide shot") : frame % 3 === 1 ? (locale === "tr" ? "Orta plan" : "Medium shot") : (locale === "tr" ? "Yakın plan" : "Close-up")}</p><p><span>{locale === "tr" ? "ODAK" : "FOCUS"}</span>{locale === "tr" ? "Davranış okunabilirliği" : "Behavioural readability"}</p></div></div></div>
        <div className="full-board"><img src={board.image} alt={`${board.title[locale]} storyboard`} /><div><span>6 {locale === "tr" ? "ANA KARE" : "KEY FRAMES"}</span><span>CHILD-EYE CAMERA</span><span>GRAPHITE STUDY</span></div></div>
      </div></section>

      <section className="section production-section" id="uretim"><div className="shell">
        <SectionHeading locale={locale} kicker={{ tr: "FİKİRDEN YAYINA", en: "FROM IDEA TO BROADCAST" }} title={{ tr: "Her yaratıcı kararın bir kontrol kapısı var.", en: "Every creative decision passes a quality gate." }} text={{ tr: "Pilot bölüm, yalnızca ilk yayın değil; kalan 14 bölümün ilişki dili, ışığı, ritmi ve pedagojik standardıdır.", en: "The pilot is not merely episode one; it defines the relational language, light, rhythm and pedagogical standard for the remaining fourteen." }} />
        <div className="production-timeline">{productionSteps.map((step) => <article key={step.n}><span>{step.n}</span><div><h3>{step.title[locale]}</h3><p>{step.text[locale]}</p></div></article>)}</div>
        <div className="quality-gate"><div><ShieldCheck /><span>{locale === "tr" ? "BÖLÜM ONAY KAPISI" : "EPISODE APPROVAL GATE"}</span></div><div className="quality-items">{[
          { tr: "Tek değer net mi?", en: "Is the single value clear?" }, { tr: "Davranış görüntüde okunuyor mu?", en: "Is behaviour readable on screen?" }, { tr: "Çocuğun gerçek katkısı var mı?", en: "Does the child truly contribute?" }, { tr: "Ebeveyn görünürlüğü dengeli mi?", en: "Is parental visibility balanced?" }, { tr: "Korku, kıyas veya klişe var mı?", en: "Any fear, comparison or stereotype?" }, { tr: "Erişilebilirlik testi tamam mı?", en: "Is accessibility testing complete?" },
        ].map((item) => <p key={item.tr}><Check />{item[locale]}</p>)}</div></div>
      </div></section>

      <section className="section impact-section" id="etki"><div className="shell">
        <SectionHeading locale={locale} kicker={{ tr: "ÇIKTI + ETKİ", en: "OUTPUT + IMPACT" }} title={{ tr: "Başarı yalnızca izlenme sayısı değildir.", en: "Success is more than a view count." }} text={{ tr: "Çıktı, üretilen materyaldir. Etki ise çocuğun davranışı tanıması, hatırlaması ve ailesiyle konuşabilmesidir.", en: "Output is the material produced. Impact is the child’s ability to recognize, remember and discuss the behaviour with family." }} />
        <div className="output-grid">{outputCards.map((item) => { const Icon = item.icon; return <article key={item.tr}><Icon /><strong>{item.number}</strong><p>{item[locale]}</p></article>; })}</div>
        <div className="metrics-panel"><div className="metric-intro"><p className="kicker">{locale === "tr" ? "ÖNERİLEN PİLOT HEDEFLERİ" : "PROPOSED PILOT TARGETS"}</p><h3>{locale === "tr" ? "Ölçülebilir, dürüst ve revizyona açık." : "Measurable, honest and open to revision."}</h3><p>{locale === "tr" ? "Hedefler gerçekleşmiş sonuç değildir; örneklem ve yöntem kurum ile araştırma ekibi tarafından kesinleştirilir." : "These are proposed targets, not achieved results; the institution and research team will finalize sample and method."}</p></div><div className="metric-bars">{[
          { value: 80, tr: "Ana olayın doğru anlatılması", en: "Correct retelling of the main event" }, { value: 70, tr: "Hedef davranışın kendiliğinden hatırlanması", en: "Spontaneous recall of target behaviour" }, { value: 100, tr: "Pedagojik ve güvenlik kontrolünde yayın öncesi onay", en: "Pre-broadcast pedagogical and safety approval" }, { value: 100, tr: "Altyazı ve son kart okunabilirlik testi", en: "Subtitle and end-card readability testing" },
        ].map((metric) => <div className="metric" key={metric.tr}><div><span>{metric[locale]}</span><strong>%{metric.value}</strong></div><div className="bar"><i style={{ width: `${metric.value}%` }} /></div></div>)}</div></div>
        <div className="accessibility-grid">{[{ icon: Captions, tr: "Yüksek kontrastlı Türkçe altyazı", en: "High-contrast Turkish subtitles" }, { icon: Volume2, tr: "Kuruma göre sesli betimleme", en: "Audio description as commissioned" }, { icon: Eye, tr: "Diyaloğa bağımlı olmayan görsel eylem", en: "Visual action not dependent on dialogue" }, { icon: Film, tr: "16:9, 9:16 ve 1:1 güvenli kadraj", en: "Safe framing for 16:9, 9:16 and 1:1" }].map((item) => { const Icon = item.icon; return <div key={item.tr}><Icon /><p>{item[locale]}</p></div>; })}</div>
      </div></section>

      <section className="final-statement"><div className="shell"><p>{locale === "tr" ? "NİHAİ DEĞER ÖNERİSİ" : "FINAL VALUE PROPOSITION"}</p><h2>{locale === "tr" ? "Öğüt vermeyen ama yön gösteren; çatışma üretmeyen ama hikâyesi olan; geleneği koruyan ama çocuğun sesini kısmayan kalıcı bir animasyon serisi." : "A lasting animation series that guides without lecturing, tells stories without manufacturing conflict, and carries tradition without silencing the child."}</h2><a href="#proje">İYİ Kİ AİLEYİZ <ArrowRight /></a></div></section>
      <footer><div className="shell footer-layout"><div className="brand"><span className="brand-mark"><HeartHandshake size={22} /></span><span><strong>İYİ Kİ AİLEYİZ</strong><small>{locale === "tr" ? "Çünkü güven, birlikte yaşanan küçük anlarda büyür." : "Because trust grows in the small moments we share."}</small></span></div><div><p>{c.submitted}</p><p>© 2026 Ratel Dijital</p></div></div></footer>
    </main>
  );
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ja' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    vehicles: 'Vehicles',
    tours: 'Tours',
    gallery: 'Gallery',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    book: 'Book',
    contact: 'Contact',
    
    // Home Page
    heroTitle: 'Discover Sri Lanka',
    heroSubtitle: 'Experience the beauty of Sri Lanka with premium tours, luxury vehicles, and expert local guides.',
    exploreTours: 'Explore Tours',
    bookNow: 'Book Now',
    exploreToursTitle: 'Explore Tours',
    exploreToursDesc: 'Discover curated tour packages and custom itineraries across Sri Lanka',
    ourVehicles: 'Our Vehicles',
    ourVehiclesDesc: 'Premium fleet of luxury vehicles for your comfort and safety',
    galleryTitle: 'Gallery',
    galleryDesc: 'View stunning photos from our tours and beautiful destinations',
    whyChooseUs: 'Why Choose Ceylon Drive Hub',
    premiumExperience: 'Premium Experience',
    premiumExperienceDesc: 'Luxury vehicles and professional service for unforgettable journeys',
    localExpertise: 'Local Expertise',
    localExpertiseDesc: 'Expert guides who know every hidden gem across Sri Lanka',
    bestValue: 'Best Value',
    bestValueDesc: 'Competitive pricing with transparent rates and no hidden fees',
    readyToStart: 'Ready to Start Your Adventure?',
    readyToStartDesc: 'Book your Sri Lankan journey today and create memories that last a lifetime.',
    contactUs: 'Contact Us',
    
    // Vehicles Page
    vehiclesHeroTitle: 'Our Premium Fleet',
    vehiclesHeroSubtitle: 'Choose from our selection of luxury vehicles for your journey',
    luxuryVehicles: 'Luxury Vehicles',
    specifications: 'Specifications',
    passengers: 'Passengers',
    luggage: 'Luggage',
    transmission: 'Transmission',
    
    // Tours Page
    toursHeroTitle: 'Explore Sri Lanka',
    toursHeroSubtitle: 'Curated tour packages and custom itineraries',
    ourServices: 'Our Services',
    popularDestinations: 'Popular Destinations',
    
    // Gallery Page
    galleryHeroTitle: 'Photo Gallery',
    galleryHeroSubtitle: 'Stunning views from our tours across Sri Lanka',
    
    // Pricing Page
    pricingHeroTitle: 'Transparent Pricing',
    pricingHeroSubtitle: 'Choose the perfect package for your journey',
    chooseYourPlan: 'Choose Your Plan',
    daily: 'Daily',
    weekend: 'Weekend',
    weekly: 'Weekly',
    perDay: 'per day',
    perWeekend: '/Fri–Sun',
    perWeek: '/week',
    bestValueBadge: 'BEST VALUE',
    getStarted: 'Get Started',
    kmPerDayIncluded: '200 km/day included',
    additionalKm030: 'Additional km: $0.30/km',
    basicInsurance: 'Basic insurance included',
    fuelNotIncluded: 'Fuel not included',
    roadside247: '24/7 roadside assistance',
    flexiblePickup: 'Flexible pickup times',
    kmIncluded600: '600 km included',
    additionalKm025: 'Additional km: $0.25/km',
    freeDelivery: 'Free delivery/pickup',
    unlimitedKm: 'Unlimited kilometers',
    premiumInsurance: 'Premium insurance included',
    prioritySupport: 'Priority support',
    
    // Testimonials Page
    testimonialsHeroTitle: 'What Our Clients Say',
    testimonialsHeroSubtitle: 'Read reviews from travelers who experienced Sri Lanka with us',
    customerReviews: 'Customer Reviews',
    
    // Book Page
    bookHeroTitle: 'Book Your Journey',
    bookHeroSubtitle: 'Fill in the details and we will get back to you shortly',
    bookingForm: 'Booking Form',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    phoneWhatsapp: 'Phone/WhatsApp',
    serviceType: 'Service Type',
    selectService: 'Select a service',
    startDate: 'Start Date',
    endDate: 'End Date',
    pickupDate: 'Pickup Date',
    returnDate: 'Return Date',
    numberOfPeople: 'Number of People',
    specialRequests: 'Special Requests',
    notes: 'Notes',
    submitBooking: 'Submit Booking',
    requestBooking: 'Request Booking',
    estimatedPrice: 'Estimated Price',
    pricingPlans: 'Pricing Plans',
    confirmAvailability: "We'll confirm availability and final price by email/WhatsApp.",
    anythingKnow: 'Anything we should know?',
    namePlaceholder: 'Jane Doe',
    emailPlaceholder: 'jane@example.com',
    phonePlaceholder: '+1 555 123 4567',
    bestValuePlan: 'Best value',
    
    // Contact Page
    contactHeroTitle: 'Get in Touch',
    contactHeroSubtitle: 'We are here to help you plan your perfect Sri Lankan adventure',
    contactInfo: 'Contact Information',
    phoneNumber: 'Phone',
    whatsapp: 'WhatsApp',
    whatsappChat: 'WhatsApp Chat',
    emailAddress: 'Email',
    sendUsMessage: 'Send us a Message',
    yourName: 'Your Name',
    name: 'Name',
    yourEmail: 'Your Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    findUs: 'Find Us',
    howCanHelp: 'How can we help?',
    yourNamePlaceholder: 'Your name',
    emailPlaceholder2: 'you@example.com',
  },
  
  ja: {
    // Navigation
    home: 'ホーム',
    vehicles: '車両',
    tours: 'ツアー',
    gallery: 'ギャラリー',
    pricing: '料金',
    testimonials: 'お客様の声',
    book: '予約',
    contact: 'お問い合わせ',
    
    // Home Page
    heroTitle: 'スリランカを発見',
    heroSubtitle: 'プレミアムツアー、高級車、地元の専門ガイドでスリランカの美しさを体験してください。',
    exploreTours: 'ツアーを探す',
    bookNow: '今すぐ予約',
    exploreToursTitle: 'ツアーを探す',
    exploreToursDesc: 'スリランカ全土の厳選されたツアーパッケージとカスタム旅程を発見',
    ourVehicles: '私たちの車両',
    ourVehiclesDesc: '快適さと安全性のための高級車両のプレミアムフリート',
    galleryTitle: 'ギャラリー',
    galleryDesc: 'ツアーと美しい目的地からの素晴らしい写真をご覧ください',
    whyChooseUs: 'セイロンドライブハブを選ぶ理由',
    premiumExperience: 'プレミアム体験',
    premiumExperienceDesc: '忘れられない旅のための高級車両とプロフェッショナルなサービス',
    localExpertise: '地元の専門知識',
    localExpertiseDesc: 'スリランカのあらゆる隠れた名所を知る専門ガイド',
    bestValue: '最高の価値',
    bestValueDesc: '透明な料金と隠れた費用なしの競争力のある価格',
    readyToStart: '冒険を始める準備はできましたか？',
    readyToStartDesc: '今すぐスリランカの旅を予約して、一生の思い出を作りましょう。',
    contactUs: 'お問い合わせ',
    
    // Vehicles Page
    vehiclesHeroTitle: 'プレミアムフリート',
    vehiclesHeroSubtitle: '旅のための高級車両からお選びください',
    luxuryVehicles: '高級車両',
    specifications: '仕様',
    passengers: '乗客',
    luggage: '荷物',
    transmission: 'トランスミッション',
    
    // Tours Page
    toursHeroTitle: 'スリランカを探索',
    toursHeroSubtitle: '厳選されたツアーパッケージとカスタム旅程',
    ourServices: '私たちのサービス',
    popularDestinations: '人気の目的地',
    
    // Gallery Page
    galleryHeroTitle: 'フォトギャラリー',
    galleryHeroSubtitle: 'スリランカ全土のツアーからの素晴らしい景色',
    
    // Pricing Page
    pricingHeroTitle: '透明な料金',
    pricingHeroSubtitle: '旅に最適なパッケージを選択してください',
    chooseYourPlan: 'プランを選択',
    daily: '毎日',
    weekend: '週末',
    weekly: '毎週',
    perDay: '1日あたり',
    perWeekend: '/金曜〜日曜',
    perWeek: '/週',
    bestValueBadge: '最高の価値',
    getStarted: '始める',
    kmPerDayIncluded: '200km/日含まれる',
    additionalKm030: '追加km: $0.30/km',
    basicInsurance: '基本保険含まれる',
    fuelNotIncluded: '燃料は含まれません',
    roadside247: '24/7ロードサービス',
    flexiblePickup: '柔軟なピックアップ時間',
    kmIncluded600: '600km含まれる',
    additionalKm025: '追加km: $0.25/km',
    freeDelivery: '無料配送/引き取り',
    unlimitedKm: '無制限キロメートル',
    premiumInsurance: 'プレミアム保険含まれる',
    prioritySupport: '優先サポート',
    
    // Testimonials Page
    testimonialsHeroTitle: 'お客様の声',
    testimonialsHeroSubtitle: '私たちと一緒にスリランカを体験した旅行者のレビューを読む',
    customerReviews: 'お客様のレビュー',
    
    // Book Page
    bookHeroTitle: '旅を予約',
    bookHeroSubtitle: '詳細を記入してください。すぐにご連絡いたします',
    bookingForm: '予約フォーム',
    fullName: 'フルネーム',
    email: 'メール',
    phone: '電話',
    phoneWhatsapp: '電話/WhatsApp',
    serviceType: 'サービスタイプ',
    selectService: 'サービスを選択',
    startDate: '開始日',
    endDate: '終了日',
    pickupDate: 'ピックアップ日',
    returnDate: '返却日',
    numberOfPeople: '人数',
    specialRequests: '特別なリクエスト',
    notes: 'メモ',
    submitBooking: '予約を送信',
    requestBooking: '予約をリクエスト',
    estimatedPrice: '推定価格',
    pricingPlans: '料金プラン',
    confirmAvailability: 'メール/WhatsAppで利用可能性と最終価格を確認します。',
    anythingKnow: '何か知っておくべきことはありますか？',
    namePlaceholder: '山田 太郎',
    emailPlaceholder: 'taro@example.com',
    phonePlaceholder: '+81 90 1234 5678',
    bestValuePlan: '最高の価値',
    
    // Contact Page
    contactHeroTitle: 'お問い合わせ',
    contactHeroSubtitle: '完璧なスリランカの冒険を計画するお手伝いをします',
    contactInfo: '連絡先情報',
    phoneNumber: '電話',
    whatsapp: 'WhatsApp',
    whatsappChat: 'WhatsAppチャット',
    emailAddress: 'メール',
    sendUsMessage: 'メッセージを送る',
    yourName: 'お名前',
    name: '名前',
    yourEmail: 'メールアドレス',
    subject: '件名',
    message: 'メッセージ',
    sendMessage: 'メッセージを送る',
    findUs: '場所',
    howCanHelp: 'どのようにお手伝いできますか？',
    yourNamePlaceholder: 'あなたの名前',
    emailPlaceholder2: 'you@example.com',
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    vehicles: 'Fahrzeuge',
    tours: 'Touren',
    gallery: 'Galerie',
    pricing: 'Preise',
    testimonials: 'Bewertungen',
    book: 'Buchen',
    contact: 'Kontakt',
    
    // Home Page
    heroTitle: 'Entdecken Sie Sri Lanka',
    heroSubtitle: 'Erleben Sie die Schönheit Sri Lankas mit Premium-Touren, Luxusfahrzeugen und erfahrenen lokalen Guides.',
    exploreTours: 'Touren erkunden',
    bookNow: 'Jetzt buchen',
    exploreToursTitle: 'Touren erkunden',
    exploreToursDesc: 'Entdecken Sie kuratierte Tourpakete und individuelle Reisepläne in ganz Sri Lanka',
    ourVehicles: 'Unsere Fahrzeuge',
    ourVehiclesDesc: 'Premium-Flotte von Luxusfahrzeugen für Ihren Komfort und Ihre Sicherheit',
    galleryTitle: 'Galerie',
    galleryDesc: 'Sehen Sie atemberaubende Fotos von unseren Touren und schönen Zielen',
    whyChooseUs: 'Warum Ceylon Drive Hub wählen',
    premiumExperience: 'Premium-Erlebnis',
    premiumExperienceDesc: 'Luxusfahrzeuge und professioneller Service für unvergessliche Reisen',
    localExpertise: 'Lokale Expertise',
    localExpertiseDesc: 'Fachkundige Guides, die jedes versteckte Juwel in Sri Lanka kennen',
    bestValue: 'Bestes Preis-Leistungs-Verhältnis',
    bestValueDesc: 'Wettbewerbsfähige Preise mit transparenten Tarifen und ohne versteckte Gebühren',
    readyToStart: 'Bereit, Ihr Abenteuer zu beginnen?',
    readyToStartDesc: 'Buchen Sie noch heute Ihre Reise durch Sri Lanka und schaffen Sie Erinnerungen fürs Leben.',
    contactUs: 'Kontaktieren Sie uns',
    
    // Vehicles Page
    vehiclesHeroTitle: 'Unsere Premium-Flotte',
    vehiclesHeroSubtitle: 'Wählen Sie aus unserer Auswahl an Luxusfahrzeugen für Ihre Reise',
    luxuryVehicles: 'Luxusfahrzeuge',
    specifications: 'Spezifikationen',
    passengers: 'Passagiere',
    luggage: 'Gepäck',
    transmission: 'Getriebe',
    
    // Tours Page
    toursHeroTitle: 'Erkunden Sie Sri Lanka',
    toursHeroSubtitle: 'Kuratierte Tourpakete und individuelle Reisepläne',
    ourServices: 'Unsere Dienstleistungen',
    popularDestinations: 'Beliebte Ziele',
    
    // Gallery Page
    galleryHeroTitle: 'Fotogalerie',
    galleryHeroSubtitle: 'Atemberaubende Ausblicke von unseren Touren in ganz Sri Lanka',
    
    // Pricing Page
    pricingHeroTitle: 'Transparente Preise',
    pricingHeroSubtitle: 'Wählen Sie das perfekte Paket für Ihre Reise',
    chooseYourPlan: 'Wählen Sie Ihren Plan',
    daily: 'Täglich',
    weekend: 'Wochenende',
    weekly: 'Wöchentlich',
    perDay: 'pro Tag',
    perWeekend: '/Fr–So',
    perWeek: '/Woche',
    bestValueBadge: 'BESTER WERT',
    getStarted: 'Loslegen',
    kmPerDayIncluded: '200 km/Tag inklusive',
    additionalKm030: 'Zusätzliche km: $0.30/km',
    basicInsurance: 'Basisversicherung inklusive',
    fuelNotIncluded: 'Kraftstoff nicht inklusive',
    roadside247: '24/7 Pannenhilfe',
    flexiblePickup: 'Flexible Abholzeiten',
    kmIncluded600: '600 km inklusive',
    additionalKm025: 'Zusätzliche km: $0.25/km',
    freeDelivery: 'Kostenlose Lieferung/Abholung',
    unlimitedKm: 'Unbegrenzte Kilometer',
    premiumInsurance: 'Premiumversicherung inklusive',
    prioritySupport: 'Prioritätsunterstützung',
    
    // Testimonials Page
    testimonialsHeroTitle: 'Was unsere Kunden sagen',
    testimonialsHeroSubtitle: 'Lesen Sie Bewertungen von Reisenden, die Sri Lanka mit uns erlebt haben',
    customerReviews: 'Kundenbewertungen',
    
    // Book Page
    bookHeroTitle: 'Buchen Sie Ihre Reise',
    bookHeroSubtitle: 'Füllen Sie die Details aus und wir melden uns in Kürze bei Ihnen',
    bookingForm: 'Buchungsformular',
    fullName: 'Vollständiger Name',
    email: 'E-Mail',
    phone: 'Telefon',
    phoneWhatsapp: 'Telefon/WhatsApp',
    serviceType: 'Servicetyp',
    selectService: 'Service auswählen',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    pickupDate: 'Abholdatum',
    returnDate: 'Rückgabedatum',
    numberOfPeople: 'Anzahl der Personen',
    specialRequests: 'Besondere Wünsche',
    notes: 'Notizen',
    submitBooking: 'Buchung absenden',
    requestBooking: 'Buchung anfordern',
    estimatedPrice: 'Geschätzter Preis',
    pricingPlans: 'Preispläne',
    confirmAvailability: 'Wir bestätigen Verfügbarkeit und Endpreis per E-Mail/WhatsApp.',
    anythingKnow: 'Sollten wir etwas wissen?',
    namePlaceholder: 'Max Mustermann',
    emailPlaceholder: 'max@example.com',
    phonePlaceholder: '+49 151 1234 5678',
    bestValuePlan: 'Bester Wert',
    
    // Contact Page
    contactHeroTitle: 'Kontaktieren Sie uns',
    contactHeroSubtitle: 'Wir helfen Ihnen gerne, Ihr perfektes sri-lankisches Abenteuer zu planen',
    contactInfo: 'Kontaktinformationen',
    phoneNumber: 'Telefon',
    whatsapp: 'WhatsApp',
    whatsappChat: 'WhatsApp Chat',
    emailAddress: 'E-Mail',
    sendUsMessage: 'Senden Sie uns eine Nachricht',
    yourName: 'Ihr Name',
    name: 'Name',
    yourEmail: 'Ihre E-Mail',
    subject: 'Betreff',
    message: 'Nachricht',
    sendMessage: 'Nachricht senden',
    findUs: 'Finden Sie uns',
    howCanHelp: 'Wie können wir helfen?',
    yourNamePlaceholder: 'Ihr Name',
    emailPlaceholder2: 'sie@example.com',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'ja', 'de'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

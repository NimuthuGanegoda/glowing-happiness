'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function KingsPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      if (!el.classList.contains('animate-in')) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const kings = [
    {
      name: t('kingVijaya'),
      period: '543-505 BCE',
      desc: t('kingVijayaDesc'),
      highlight: t('kingVijayaHighlight')
    },
    {
      name: t('kingDevanampiyaTissa'),
      period: '247-207 BCE',
      desc: t('kingDevanampiyaTissaDesc'),
      highlight: t('kingDevanampiyaTissaHighlight')
    },
    {
      name: t('kingDutugemunu'),
      period: '161-137 BCE',
      desc: t('kingDutugemunuDesc'),
      highlight: t('kingDutugemunuHighlight')
    },
    {
      name: t('kingValagamba'),
      period: '89-77 BCE',
      desc: t('kingValagambaDesc'),
      highlight: t('kingValagambaHighlight')
    },
    {
      name: t('kingMahasena'),
      period: '276-303 CE',
      desc: t('kingMahasenaDesc'),
      highlight: t('kingMahasenaHighlight')
    },
    {
      name: t('kingDhatusena'),
      period: '455-473 CE',
      desc: t('kingDhatusenaDesc'),
      highlight: t('kingDhatusenaHighlight')
    },
    {
      name: t('kingKashyapa'),
      period: '477-495 CE',
      desc: t('kingKashyapaDesc'),
      highlight: t('kingKashyapaHighlight')
    },
    {
      name: t('kingParakramabahu'),
      period: '1153-1186 CE',
      desc: t('kingParakramabahuDesc'),
      highlight: t('kingParakramabahuHighlight')
    }
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 px-5 sm:px-6">
      {/* Hero Section */}
      <section className="max-w-[980px] mx-auto text-center mb-20 fade-in">
        <h1 className="apple-headline mb-5">
          {t('kingsHeroTitle')}
        </h1>
        <p className="apple-subheadline max-w-2xl mx-auto">
          {t('kingsHeroSubtitle')}
        </p>
      </section>

      {/* Kings List */}
      <section className="max-w-[980px] mx-auto space-y-12">
        {kings.map((king, idx) => (
          <div
            key={idx}
            className="group card scroll-animate opacity-0 translate-y-8 transition-all duration-700"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white">
                    {king.name}
                  </h2>
                  <span className="text-[15px] text-blue-600 dark:text-blue-400 font-medium">
                    {king.period}
                  </span>
                </div>
                <p className="text-[17px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {king.desc}
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[13px] font-medium text-gray-900 dark:text-white">
                  🏆 {king.highlight}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Conclusion */}
      <section className="max-w-[980px] mx-auto mt-20 text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700">
        <p className="text-[17px] text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('kingsConclusion')}
        </p>
      </section>
    </main>
  );
}

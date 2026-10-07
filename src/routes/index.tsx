import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Leaf, Heart, ShieldCheck, Menu, X, Wheat, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/deli-hero.jpg';
import meats from '@/assets/meats.jpg';
import cheese from '@/assets/cheese.jpg';
import produce from '@/assets/produce.jpg';
import pantry from '@/assets/pantry.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'АНЕЛ 007 — Малките удоволствия започват тук' },
    { name: 'description', content: 'Открийте подбрани колбаси, сирена, свежи плодове и зеленчуци в кварталния магазин АНЕЛ 007.' },
    { property: 'og:title', content: 'АНЕЛ 007 — Малките удоволствия започват тук' },
    { property: 'og:description', content: 'Вкусни деликатеси и свежи продукти, подбрани с внимание за вашата трапеза.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Storefront,
});

const categories = [
  { title: 'Месни деликатеси', label: 'Традиция във всяка хапка', image: meats, items: ['Луканка', 'Суджук', 'Салам', 'Наденици'], tag: 'Любими вкусове' },
  { title: 'Сирена и кашкавали', label: 'За ценителите на добрия вкус', image: cheese, items: ['Бяло саламурено сирене', 'Кашкавал', 'Зрели сирена', 'Млечни продукти'], tag: 'Подбрано качество' },
  { title: 'Плодове и зеленчуци', label: 'Свежест от природата', image: produce, items: ['Домати', 'Краставици', 'Сезонни плодове', 'Свежи зеленчуци'], tag: 'Сезонна селекция' },
  { title: 'За вашата трапеза', label: 'Малките ежедневни радости', image: pantry, items: ['Хляб', 'Мед', 'Основни хранителни продукти', 'Продукти за споделяне'], tag: 'Всеки ден' },
];

function Storefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (selected === null) return;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key !== 'Tab') return;
      const controls = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); if (previousFocus instanceof HTMLElement) previousFocus.focus(); };
  }, [selected]);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  return <div className="storefront">
    <div className="announcement"><Leaf size={13} /> Добрият вкус е близо до вас <span>·</span> Вашият квартален магазин</div>
    <header className="site-header page-width">
      <a className="brand" href="#" aria-label="АНЕЛ 007 начало"><span className="brand-symbol"><Wheat size={25} strokeWidth={1.5} /></span><span>АНЕЛ <b>007</b><small>ВКУСЪТ НА ДОБРОТО</small></span></a>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Основна навигация">
        <Button variant="navigation" onClick={() => scrollTo('products')}>Нашите продукти</Button>
        <Button variant="navigation" onClick={() => scrollTo('about')}>За нас</Button>
        <Button variant="navigation" onClick={() => scrollTo('visit')}>Заповядайте при нас</Button>
      </nav>
      <Button variant="deli" onClick={() => scrollTo('products')} className="header-cta">Разгледайте продуктите <ArrowUpRight /></Button>
      <Button variant="ghost" size="icon" className="mobile-menu" aria-label={menuOpen ? 'Затвори менюто' : 'Отвори менюто'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </header>
    <main>
      <section className="hero page-width" aria-labelledby="hero-title">
        <img src={hero} alt="Традиционен суджук, подбрани сирена и свежи продукти върху дървена дъска" width={1536} height={1024} className="hero-photo" fetchPriority="high" />
        <div className="hero-content">
          <div className="eyebrow"><span /> МАЛЪК МАГАЗИН. ГОЛЯМ ВКУС.</div>
          <h1 id="hero-title">АНЕЛ 007</h1>
          <h2>Добрият вкус.<br />Близо до дома.</h2>
          <p>Подбрани деликатеси, свежи продукти и<br className="desktop-break" /> малки удоволствия за всяка трапеза.</p>
          <Button variant="deli" onClick={() => scrollTo('products')}>Открийте нашите продукти <ArrowUpRight /></Button>
          <div className="hero-note"><Heart size={15} /> Подбрано с внимание. Поднесено с усмивка.</div>
        </div>
        <div className="hero-stamp"><Wheat size={26} strokeWidth={1.2} /><span>Качество,<br />което се усеща</span></div>
        <div className="photo-caption"><span /> Истински вкус, без компромиси</div>
      </section>
      <div className="values-strip page-width">
        <div><Leaf /><span>Свежест всеки ден<small>Продукти, които обичате</small></span></div>
        <div><ShieldCheck /><span>Подбрано качество<small>Внимание към всеки детайл</small></span></div>
        <div><Heart /><span>С грижа за вас<small>Лично отношение и усмивка</small></span></div>
      </div>
      <section id="products" className="products-section page-width">
        <div className="section-heading"><div><div className="eyebrow">ПОДБРАНО ЗА ВАС</div><h2>Вкусни находки за всеки ден</h2></div><p>От любимата луканка до свежия домат —<br />всичко за една хубава трапеза.</p></div>
        <div className="category-grid">{categories.map((category, i) => <Button variant="category" key={category.title} onClick={() => setSelected(i)} aria-label={`Разгледайте ${category.title}`}>
          <div className="category-photo"><img src={category.image} alt={category.title} width={480} height={768} loading="lazy" /><span>{category.tag}</span></div>
          <div className="category-info"><h3>{category.title}</h3><p>{category.label}</p><span className="category-arrow"><ArrowUpRight size={18} /></span></div>
        </Button>)}</div>
      </section>
      <section id="about" className="about-section">
        <div className="page-width about-inner"><div className="about-mark"><Wheat size={60} strokeWidth={1} /><span>С внимание.<br />Със сърце.</span></div><div><div className="eyebrow">ПОВЕЧЕ ОТ КВАРТАЛЕН МАГАЗИН</div><h2>Хубавата храна събира хората.</h2><p>Вярваме, че добрата трапеза започва с добри продукти. Затова в АНЕЛ 007 подбираме с внимание вкусовете, които носите у дома — за ежедневието, за празниците и за моментите заедно.</p></div><span className="about-signature">Добре дошли<br />при нас.</span></div>
      </section>
      <section id="visit" className="visit-section page-width"><MapPin size={28} strokeWidth={1.4} /><div><div className="eyebrow">ЩЕ СЕ РАДВАМЕ ДА ВИ ВИДИМ</div><h2>Вашето следващо вкусно откритие.</h2><p>Заповядайте в АНЕЛ 007 и изберете нещо хубаво за дома.</p></div><Button variant="deli" onClick={() => scrollTo('products')}>Изберете своя вкус <ArrowRight /></Button></section>
    </main>
    <footer className="page-width"><a className="footer-brand" href="#">АНЕЛ 007</a><span>Добрият вкус. Близо до дома.</span><small>© 2026 АНЕЛ 007</small></footer>
    {selected !== null && <div className="catalog-overlay" onClick={() => setSelected(null)}><section ref={dialogRef} className="catalog-dialog" role="dialog" aria-modal="true" aria-labelledby="catalog-title" onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="dialog-close" aria-label="Затвори" onClick={() => setSelected(null)} autoFocus><X /></Button><img src={categories[selected].image} alt={categories[selected].title} width={480} height={768} /><div className="catalog-copy"><div className="eyebrow">НАШАТА СЕЛЕКЦИЯ</div><h2 id="catalog-title">{categories[selected].title}</h2><p>{categories[selected].label}</p><ul>{categories[selected].items.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><p className="catalog-note">Попитайте на място за текущия асортимент и наличности.</p><Button variant="deli" onClick={() => { setSelected(null); scrollTo('visit'); }}>Заповядайте при нас <ArrowUpRight /></Button></div></section></div>}
  </div>;
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useState } from "react";
import dynamic from "next/dynamic";

const Orb = dynamic(() => import("./components/Orb"), {
  ssr: false,
});

const sections = [
  { number: "01", name: "Inicio", href: "#inicio" },
  { number: "02", name: "Sobre mí", href: "#sobre-mi" },
  { number: "03", name: "Proyectos", href: "#proyectos" },
  { number: "04", name: "Habilidades", href: "#habilidades" },
  { number: "05", name: "Experiencia", href: "#experiencia" },
  { number: "06", name: "Contacto", href: "#contacto" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const orbProgressRef = useRef(0);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            orbProgressRef.current = self.progress;
          },
        },
      });

      titleAnimation.to(
        titleRef.current,
        {
          scale: 0.42,
          y: -190,
          rotationX: -12,
          opacity: 0.15,
          transformOrigin: "center center",
          ease: "none",
        },
        0
      );
    }, heroRef);

    return () => animation.revert();
  }, []);


  return (
    <main className="min-h-screen bg-[#F4F0FA] text-[#17151D]">
      <header className="relative z-20 flex items-center justify-between px-8 py-6 md:px-16">
        <a href="#inicio" className="text-xl font-bold tracking-tight">
          JV<span className="text-[#7655D9]">®</span>
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 text-sm font-medium tracking-widest"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "CERRAR" : "MENU"}
          <span className="text-[#7655D9]">
            {menuOpen ? "−" : "+"}
          </span>
        </button>
      </header>

      {menuOpen && (
        <nav className="absolute left-0 top-0 z-10 min-h-screen w-full bg-[#EAE3F6] px-8 pb-12 pt-28 md:px-16">
          <p className="mb-8 text-xs tracking-[0.3em] text-[#7655D9]">
            EXPLORA EL PORTAFOLIO
          </p>

          <div className="flex flex-col">
            {sections.map((section) => (
              <a
                key={section.number}
                href={section.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-5 border-b border-[#D7D2E5] py-5 transition-all hover:pl-4"
              >
                <span className="text-xs text-[#7655D9]">
                  {section.number}
                </span>

                <span className="text-3xl font-semibold tracking-tight md:text-5xl">
                  {section.name}
                </span>

                <span className="ml-auto text-xl text-[#7655D9] opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </nav>
      )}

      <section
      
        ref={heroRef}
        id="inicio"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-8 py-20 md:px-16"
      >
        
        <div className="pointer-events-none absolute right-[-5%] top-[48%] z-0 h-[440px] w-[440px] -translate-y-1/2 opacity-95 md:right-[30%] md:h-[620px] md:w-[620px]">

          <Orb progressRef={orbProgressRef} />
        </div>

        <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#7655D9]">
          
          Desarrolladora de software en formación
        </p>

        <h1
          ref={titleRef}
          className="relative z-10 text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.85] tracking-[-0.08em]"
        >
          JULIANA
          <br />
          <span className="text-[#7655D9]">VARGAS</span>
        </h1>
        

        <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-sm text-base leading-relaxed text-[#6B6575]">
            Transformando ideas en experiencias digitales.
            Explorando el desarrollo, el diseño y la tecnología.
          </p>

          <p className="text-xs uppercase tracking-[0.2em]">
            Bello, Colombia · 2026
          </p>
        </div>
      </section>

      <footer className="flex justify-between border-t border-[#D7D2E5] px-8 py-5 text-xs md:px-16">
        <span>PORTAFOLIO PERSONAL</span>
        <span>DESPLAZA PARA EXPLORAR ↓</span>

        <section
          id="sobre-mi"
          className="relative min-h-screen overflow-hidden bg-[#EAE3F6] px-8 py-28 md:px-16"
        >
          <div className="mb-20 flex items-center justify-between">
            <span className="text-xs tracking-[0.3em] text-[#7655D9]">
              02 / SOBRE MÍ
            </span>

            <span className="text-xs tracking-widest text-[#6B6575]">
              CONÓCEME
            </span>
          </div>

          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div className="relative flex min-h-[380px] items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-[#7655D9]/15 blur-3xl" />

              <span className="relative text-[clamp(9rem,20vw,18rem)] font-bold leading-none tracking-[-0.12em] text-[#7655D9]">
                JV
              </span>

              <span className="absolute bottom-8 left-0 text-xs tracking-[0.25em] text-[#6B6575]">
                JULIANA VARGAS AGUIAR
              </span>
            </div>

            <div className="max-w-xl">
              <p className="mb-8 text-sm leading-relaxed text-[#7655D9]">
                TECNOLOGÍA · DISEÑO · CREATIVIDAD
              </p>

              <h2 className="mb-10 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Me gusta crear, experimentar y convertir ideas en proyectos.
              </h2>

              <div className="space-y-5 text-base leading-relaxed text-[#6B6575]">
                <p>
                  Soy Juliana Vargas Aguiar, desarrolladora de software en
                  formación, apasionada por la tecnología, el diseño y la
                  creación de soluciones digitales.
                </p>

                <p>
                  Me considero una persona perseverante, creativa y
                  comprometida. Disfruto enfrentar desafíos, encontrar
                  soluciones y ver cómo el esfuerzo se convierte en resultados.
                </p>

                <p>
                  Me gusta cuidar los detalles, explorar nuevas ideas y buscar
                  formas diferentes de hacer las cosas. Mi objetivo es adquirir
                  experiencia, fortalecer mis habilidades y participar en
                  proyectos donde pueda aportar, aprender y crecer
                  profesionalmente.
                </p>
              </div>
            </div>
          </div>
        </section>

      </footer>

    </main>
  );
}

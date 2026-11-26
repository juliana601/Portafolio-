"use client";
import { useEffect, useState } from "react";
const sections = [["01","Inicio","inicio"],["02","Sobre mí","sobre-mi"],["03","Proyectos","proyectos"],["04","Habilidades","habilidades"],["05","Experiencia","experiencia"],["06","Contacto","contacto"]];
export default function Hero() {
  const [open,setOpen] = useState(false);
  useEffect(() => {
    const key = e => { if(e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown",key);
    return () => window.removeEventListener("keydown",key);
  },[]);
  return <>
    <header className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Ir al inicio">JV<sup>®</sup></a>
      <span className="header-edition">PORTAFOLIO <i/> 2026</span>
      <button className="menu-button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="site-menu">{open?"CERRAR":"MENÚ"} <span>{open?"−":"+"}</span></button>
      <div className="reading-progress" aria-hidden="true"/>
    </header>
    {open && <nav className="site-menu" id="site-menu" aria-label="Navegación principal">
      <p>ÍNDICE / EXPLORA MI UNIVERSO</p>
      {sections.map(([n,t,id])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)}><small>{n}</small><span>{t}</span><b>↗</b></a>)}
    </nav>}
    <section id="inicio" className="hero-scroll-track">
      <div className="hero-shell">
        <div className="hero-grain" aria-hidden="true"/>
        <div className="hero-orbit" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none"><circle cx="300" cy="300" r="255"/><circle cx="300" cy="300" r="210" strokeDasharray="2 9"/><ellipse cx="300" cy="300" rx="278" ry="115" transform="rotate(-30 300 300)"/><path d="M300 24V64 M280 44H320 M300 536V576 M280 556H320 M24 300H64 M44 280V320 M536 300H576 M556 280V320"/></svg></div>
        <span className="hero-coordinate" aria-hidden="true">FIG. 01 &nbsp; / &nbsp; NOX</span>
        <span className="hero-spark" aria-hidden="true">✳</span><span className="hero-spark two" aria-hidden="true">✦</span>
        <div className="hero-content">
          <p className="hero-kicker">01 / HOLA, SOY <span>✳</span></p>
          <h1 className="hero-title"><span className="hero-line hero-line-dark" data-hero-line-a>JULIANA</span><span className="hero-line hero-line-violet" data-hero-line-b>VARGAS<span className="hero-dot">.</span></span></h1>
          <div className="hero-intro"><p className="hero-role">DESARROLLADORA DE SOFTWARE EN FORMACIÓN</p><p className="hero-copy">Creo experiencias digitales a través del diseño y el código.</p><span className="hero-location"><i/> BELLO, COLOMBIA</span></div>
        </div>
        <div className="nox-caption"><span className="nox-caption-index">01 — COMPAÑERO DE VIAJE</span><strong>Conoce a Nox.</strong><span>Mueve el mouse o toca un espacio libre para que atrape una estrella.</span></div>
        <div className="hero-bottom"><span>DISEÑO <b>×</b> CÓDIGO <b>×</b> CURIOSIDAD</span><a href="#sobre-mi">EXPLORA <span>↓</span></a></div>
        <div className="hero-next" aria-hidden="true"><span>02 / EL COMIENZO</span><strong>Todo empieza<br/>con una idea.</strong><i>✳</i></div>
      </div>
    </section>
  </>;
}

"use client";

/* Se usa <img> (no next/image) para poder detectar con onError que la captura
   todavía no existe y mostrar el placeholder sin imágenes rotas. */
/* eslint-disable @next/next/no-img-element */

import { useState, useRef } from "react";


const contactLinks = {
  github: "https://github.com/juliana601",
  linkedin: "",
  email: "jv831145@gmail.com",
  phone: "+573007659782",
  phoneLabel: "+57 300 765 9782",
};

const qualities = [
  "Creatividad",
  "Perseverancia",
  "Compromiso",
  "Atención al detalle",
  "Aprendizaje constante",
];

const skillGroups = [
  {
    title: "Lenguajes de programación",
    items: [
      { name: "Python", level: "Intermedio" },
      { name: "JavaScript", level: "Intermedio" },
    ],
  },
  {
    title: "Frameworks y tecnologías",
    items: [
      { name: "Django", level: "Avanzado" },
      { name: "Node.js", level: "Básico" },
      { name: "Express", level: "Básico" },
      { name: "Flutter", level: "Básico" },
      { name: "Bootstrap", level: "Intermedio" },
    ],
  },
  {
    title: "Bases de datos",
    items: [
      { name: "Supabase", level: "Intermedio" },
      { name: "PostgreSQL", level: "Básico" },
      { name: "MySQL", level: "Básico" },
      { name: "SQLite", note: "Trabajado en proyectos académicos" },
    ],
  },
  {
    title: "Desarrollo web",
    items: [{ name: "HTML" }, { name: "CSS" }, { name: "Frontend" }, { name: "Backend" }],
  },
  {
    title: "Herramientas de desarrollo",
    items: [
      { name: "Visual Studio Code" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "DBeaver" },
      { name: "DevTools" },
    ],
  },
  {
    title: "Diseño y prototipado",
    items: [{ name: "Figma" }, { name: "Google Stitch" }],
  },
  {
    title: "Organización y gestión",
    items: [{ name: "Trello" }],
  },
];

function SectionHeading({ number, label, title, subtitle, dark = false, titleData }) {
  const headingAttributes = titleData ? { [titleData]: "" } : {};

  return (
    <header className="section-heading">
      <div className="section-heading-top">
        <span className="section-index">{number} / {label}</span>
        <span className={`section-rule${dark ? " section-rule-dark" : ""}`} />
      </div>
      <h2 className={`section-title${dark ? " section-title-dark" : ""}`} {...headingAttributes}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle${dark ? " section-subtitle-dark" : ""}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
}

function ImageFrame({ src, alt, label, number, featured = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`project-visual${featured ? " project-visual-featured" : ""}`}>
      <div className="project-visual-grid" aria-hidden="true" />
      {!loaded && (
        <div className="project-visual-placeholder" aria-hidden="true">
          <span className="project-visual-number">{number}</span>
          <span className="project-visual-name">{label}</span>
          <span className="project-visual-line" />
        </div>
      )}
      {src && <img
        src={src}
        alt={alt}
        className={`project-visual-img${loaded ? " is-loaded" : ""}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        loading="lazy"
      />}
    </div>
  );
}

function ProfileFrame({src}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="profile-frame" data-about-photo>
      <div className="profile-visual">
        <div className="profile-visual-grid" aria-hidden="true" />
        {!loaded && (
          <div className="profile-placeholder" aria-hidden="true">
            <span className="profile-initials">JV</span>
            <span className="profile-placeholder-name">JULIANA VARGAS AGUIAR</span>
          </div>
        )}
        {src && <img
          src={src}
          alt="Retrato de Juliana Vargas Aguiar"
          className={`profile-img${loaded ? " is-loaded" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          loading="lazy"
        />}
      </div>
      <figcaption className="profile-caption">
        BELLO, ANTIOQUIA / COLOMBIA
      </figcaption>
    </figure>
  );
}

function About({images}) {
  return (
    <section id="sobre-mi" className="portfolio-section portfolio-section--tint">
      <SectionHeading number="02" label="SOBRE MÍ" title="Sobre mí" />

      <div className="about-grid">
        <ProfileFrame src={images.profile} />

        <div className="about-copy" data-about-copy>
          <h3 className="about-title">
            Me gusta crear, experimentar y convertir ideas en{" "}
            <span className="text-violet">proyectos</span>.
          </h3>

          <div className="about-paragraphs">
            <p>
              Soy Juliana Vargas Aguiar, desarrolladora de software en formación,
              apasionada por la <span className="text-violet">tecnología</span>,
              el diseño y la creación de soluciones digitales.
            </p>
            <p>
              Desde pequeña he sentido curiosidad por crear, experimentar,
              equivocarme y volver a intentarlo. Con el tiempo, esa curiosidad se
              convirtió en una motivación por aprender y transformar ideas en
              proyectos.
            </p>
            <p>
              Me considero una persona perseverante, creativa y comprometida.
              Disfruto enfrentar desafíos, encontrar soluciones y ver cómo el
              esfuerzo se convierte en resultados. No pretendo saberlo todo; creo
              en el <span className="text-violet">aprendizaje constante</span> y
              en la oportunidad de mejorar con cada experiencia.
            </p>
            <p>
              Me gusta cuidar los detalles, explorar nuevas ideas y buscar formas
              diferentes de hacer las cosas. Mi objetivo es adquirir experiencia,
              fortalecer mis habilidades y participar en proyectos donde pueda
              aportar, aprender y crecer profesionalmente.
            </p>
            <p className="about-final">
              Me motiva poder mirar lo que he creado y decir: «Eso lo hice yo».
            </p>
          </div>

          <div className="qualities" aria-label="Cualidades destacadas">
            {qualities.map((quality) => (
              <span className="quality-chip" key={quality}>
                {quality}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {id:"effiadmi",title:"EFFIADMI",category:"Aplicación web de gestión empresarial",short:"Sistema de gestión para pymes: inventarios, clientes, proveedores, pedidos y facturación en una sola plataforma.",tech:"Python · Django · Bootstrap · Supabase",description:"EFFIADMI es un sistema de administración diseñado para pequeñas y medianas empresas, cuyo objetivo es facilitar la gestión de inventarios, productos, clientes, proveedores, pedidos y facturación mediante una plataforma centralizada. El proyecto busca ayudar a los negocios a organizar su información, agilizar procesos administrativos y mantener un mejor control de sus operaciones.",details:<>
<div className="project-block">
              <h4>Funcionalidades generales</h4>
              <div className="project-tags">
                <span>Gestión de usuarios</span>
                <span>Inicio de sesión</span>
                <span>Clientes</span>
                <span>Productos</span>
                <span>Inventarios</span>
                <span>Entradas y salidas</span>
                <span>Proveedores</span>
                <span>Pedidos</span>
                <span>Facturación</span>
                <span>Notificaciones</span>
                <span>Panel administrativo</span>
              </div>
            </div>

            <div className="project-block">
              <h4>Mis aportes individuales</h4>
              <p className="project-note">
                Proyecto colaborativo.
              </p>
              <ul className="project-list">
                <li>Diseño y desarrollo de la landing page.</li>
                <li>Implementación del inicio de sesión.</li>
                <li>Desarrollo de funcionalidades de inventario.</li>
                <li>Desarrollo de funcionalidades de facturación.</li>
                <li>Implementación de reportes durante una etapa del proyecto.</li>
                <li>Participación en el envío de correos electrónicos reales.</li>
                <li>Trabajo con bases de datos mediante Supabase.</li>
                <li>Apoyo en el desarrollo de otros módulos.</li>
                <li>Elaboración y organización de la documentación.</li>
              </ul>
            </div>

            <div className="project-block">
              <h4>Tecnologías</h4>
              <div className="project-tags">
                <span>Python</span>
                <span>Django</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>Bootstrap</span>
                <span>SQLite</span>
                <span>Supabase</span>
                <span>Git</span>
                <span>GitHub</span>
              </div>
            </div>

            <a
              className="project-link"
              href="https://github.com/AlexaFiallo07/EFFIADMI_1"
              target="_blank"
              rel="noreferrer"
            >
              Ver repositorio <span aria-hidden="true">↗</span>
            </a>
</>},
  {id:"alquipc",title:"ALQUIPC",category:"Aplicación web de cotización de alquiler de computadores",short:"Cotizador de alquiler de computadores con cálculo automático de tarifas, recargos y descuentos.",tech:"JavaScript · Node.js · Express · EJS",description:"ALQUIPC es una aplicación web desarrollada para automatizar el cálculo de cotizaciones relacionadas con el alquiler de equipos de cómputo. Permite ingresar información del cliente, seleccionar la cantidad de computadores y determinar los días de alquiler, calculando automáticamente el valor correspondiente según las condiciones establecidas.",details:<>
<div className="project-block">
              <h4>Funcionalidades desarrolladas</h4>
              <div className="project-tags">
                <span>Registro del cliente</span>
                <span>Cantidad de equipos</span>
                <span>Días de alquiler</span>
                <span>Cálculo automático</span>
                <span>Recargos por ubicación</span>
                <span>Descuentos</span>
                <span>Validaciones</span>
                <span>Generación de cotizaciones</span>
              </div>
              <p className="project-note">
                Durante el desarrollo también se trabajó en el envío de información por correo electrónico.
              </p>
            </div>

            <div className="project-block">
              <h4>Tecnologías</h4>
              <div className="project-tags">
                <span>JavaScript</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>EJS</span>
                <span>CSS</span>
              </div>
            </div>
</>},
  {id:"tienda",title:"TIENDA VIRTUAL",category:"Comercio electrónico",short:"Tienda académica con visualización de productos, imágenes y carrito de compras. Proyecto no finalizado.",tech:"JavaScript · EJS · CSS",description:"Proyecto de una tienda virtual básica desarrollado con el propósito de aplicar conocimientos de programación web, visualización de productos y gestión de un carrito de compras. La aplicación permite explorar productos mediante una interfaz visual e implementar funcionalidades básicas relacionadas con el proceso de compra.",details:<>
<div className="project-block">
              <h4>Funcionalidades trabajadas</h4>
              <div className="project-tags">
                <span>Visualización de productos</span>
                <span>Gestión de imágenes</span>
                <span>Carrito de compras</span>
                <span>Funciones básicas de compra</span>
                <span>Diseño de interfaz</span>
              </div>
            </div>

            <div className="project-block">
              <h4>Tecnologías</h4>
              <div className="project-tags">
                <span>JavaScript</span>
                <span>EJS</span>
                <span>CSS</span>
              </div>
              <p className="project-note">Estado: proyecto no finalizado.</p>
            </div>
</>},
];
function Projects({images}) {
  const [selected,setSelected]=useState(0);
  const dialog=useRef(null);
  const open=(i)=>{setSelected(i);dialog.current.showModal();};
  const current=PROJECTS[selected];
  return <section id="proyectos" className="portfolio-section projects-section">
    <div className="projects-scroll" data-projects-scroll>
      <div className="projects-stage" data-projects-stage>
        <div className="projects-stage-heading">
          <SectionHeading number="03" label="PROYECTOS" title="Trabajo seleccionado." subtitle="Ideas que se convierten en soluciones." />
          <div className="project-nav" aria-label="Navegar proyectos">{PROJECTS.map((p,i)=><button type="button" key={p.id} data-project-nav={i} aria-label={`Ir a ${p.title}`}>0{i+1}</button>)}</div>
        </div>
        <div className="projects-window"><div className="projects-track" data-projects-track>{PROJECTS.map((p,i)=><article className={`project-card project-${p.id}`} key={p.id}>
          <ImageFrame src={images[p.id]} alt={`Captura de ${p.title}`} label={p.title} number={`0${i+1}`} featured={i===0}/>
          <div className="project-copy"><div className="project-meta"><span>0{i+1} / 03</span><span>{i===0?'COLABORATIVO':i===2?'EN DESARROLLO':'ACADÉMICO'}</span></div><h3 className="project-name">{p.title}</h3><p className="project-category">{p.category}</p><p className="project-description">{p.short}</p><p className="project-tech">{p.tech}</p><button type="button" className="project-link" onClick={()=>open(i)}>Explorar proyecto <span>↗</span></button></div>
        </article>)}</div></div>
        <div className="projects-progress" aria-hidden="true"><span/></div>
      </div>
    </div>
    <dialog className="project-dialog" ref={dialog} aria-labelledby="project-dialog-title" onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}>
      <div className="dialog-inner"><div className="dialog-top"><span>FICHA / 0{selected+1}</span><button type="button" onClick={()=>dialog.current.close()} aria-label="Cerrar detalles">✕</button></div><h2 id="project-dialog-title">{current.title}</h2><p className="project-category">{current.category}</p><p>{current.description}</p>{current.details}</div>
    </dialog>
  </section>;
}

function Skills() {
  return (
    <section id="habilidades" className="portfolio-section portfolio-section--tint">
      <SectionHeading
        number="04"
        label="HABILIDADES"
        title="Mis habilidades"
        subtitle="Tecnologías y herramientas con las que construyo soluciones digitales."
      />



      <div className="skills-strip" aria-hidden="true">
        <div className="skills-strip-track" data-skill-strip-track>
          {[...skillGroups.flatMap((group) => group.items.map((item) => item.name)),
            ...skillGroups.flatMap((group) => group.items.map((item) => item.name))].map(
            (name, index) => (
              <span key={`${name}-${index}`}>{name}</span>
            )
          )}
        </div>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title} data-skill-group>
            <h3>{group.title}</h3>
            <div className="skill-list">
              {group.items.map((item) => (
                <span className="skill-chip" key={item.name}>
                  <span>{item.name}</span>
                  {item.level && <span className="skill-level">{item.level}</span>}
                  {item.note && <span className="skill-note">{item.note}</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experiencia" className="portfolio-section">
      <SectionHeading
        number="05"
        label="EXPERIENCIA"
        title="Mi experiencia"
        subtitle="Aprendizaje y crecimiento en entornos reales."
      />

      <div className="experience-grid">
        <div className="timeline">
          <span className="timeline-progress" data-timeline-line aria-hidden="true" />
          <article className="timeline-item" data-timeline-item>
            <span className="timeline-date">NOVIEMBRE DE 2026 — ACTUALIDAD</span>
            <h3>Tecnoparque — SENA</h3>
            <p className="timeline-role">Practicante en desarrollo de software</p>
            <p>
              Actualmente me encuentro realizando mis prácticas formativas en
              Tecnoparque, un espacio orientado al desarrollo de soluciones
              innovadoras y tecnológicas. Esta etapa representa una oportunidad
              para acercarme a proyectos reales, conocer las necesidades de
              diferentes usuarios y fortalecer mis habilidades profesionales. Me
              interesa continuar desarrollando mis conocimientos técnicos y
              creativos, especialmente en el desarrollo de soluciones digitales,
              diseño de interfaces y trabajo colaborativo.
            </p>
            <p className="timeline-note">
              Etapa de formación y crecimiento profesional.
            </p>
          </article>

          <article className="timeline-item" data-timeline-item>
            <span className="timeline-date">DICIEMBRE DE 2025</span>
            <h3>Boutique Elequia</h3>
            <p className="timeline-role">Atención al cliente</p>
            <p>
              Experiencia en atención al cliente dentro del sector comercial, que
              me permitió fortalecer habilidades relacionadas con la comunicación,
              la responsabilidad y el trato con diferentes personas.
            </p>
          </article>

          <article className="timeline-item" data-timeline-item>
            <span className="timeline-date">ACTUALMENTE</span>
            <h3>Análisis y Desarrollo de Software — SENA</h3>
            <p className="timeline-role">
              Formación tecnológica en curso · etapa práctica
            </p>
            <p>
              Servicio Nacional de Aprendizaje — SENA. Durante mi formación he
              adquirido conocimientos relacionados con programación, desarrollo
              de aplicaciones web, bases de datos, diseño de interfaces y
              herramientas de control de versiones.
            </p>
          </article>

          <article className="timeline-item" data-timeline-item>
            <span className="timeline-date">2024</span>
            <h3>Bachiller académico</h3>
            <p className="timeline-role">Finalizado</p>
          </article>
        </div>

        <aside className="education-panel">
          <span className="section-index">EN FOCO</span>
          <h3>Lo que me interesa explorar</h3>
          <p className="education-lead">
            Cada etapa de mi formación me ha acercado a estas áreas de trabajo.
          </p>
          <div className="education-areas">
            <h4>Áreas de interés</h4>
            <div className="project-tags">
              <span>Desarrollo frontend</span>
              <span>Desarrollo backend</span>
              <span>Diseño de interfaces</span>
              <span>Soluciones digitales</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="portfolio-section portfolio-section--dark">
      <span className="contact-watermark" aria-hidden="true">
        JV®
      </span>
      <SectionHeading
        number="06"
        label="CONTACTO"
        title="HABLEMOS."
        subtitle="Las buenas ideas comienzan con una conversación."
        dark
        titleData="data-contact-title"
      />

      <div className="contact-grid">
        <div className="contact-copy">
          <p>
            Soy una persona comprometida, perseverante y creativa. Me interesa
            aportar mis conocimientos, asumir nuevos desafíos y continuar
            aprendiendo.
          </p>
          <p>
            Busco una oportunidad para adquirir experiencia, contribuir a
            proyectos reales y seguir creciendo como desarrolladora de software.
          </p>
          <p>
            Estoy interesada en conectar con personas, equipos y empresas que
            compartan el interés por la tecnología y la creación de soluciones
            digitales.
          </p>
        </div>

        <div className="contact-links">
          <span className="section-index section-index-light">CANALES DE CONTACTO</span>

          {contactLinks.github && (
            <a
              className="contact-link"
              data-contact-link
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {contactLinks.linkedin && (
            <a
              className="contact-link"
              href={contactLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {contactLinks.email && (
            <a className="contact-link" href={`mailto:${contactLinks.email}`}>
              <span>{contactLinks.email}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {contactLinks.phone && (
            <a className="contact-link" href={`tel:${contactLinks.phone}`}>
              <span>{contactLinks.phoneLabel}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const goToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <footer className="portfolio-footer">
      <div className="footer-brand">
        <span className="footer-wordmark">JV® — Portafolio 2026</span>
        <span>Juliana Vargas Aguiar</span>
      </div>

      <div className="footer-details">
        <span>Desarrolladora de software en formación.</span>
        <span>Bello, Antioquia, Colombia.</span>
      </div>

      <button className="back-to-top" type="button" onClick={goToTop}>
        VOLVER AL INICIO <span aria-hidden="true">↑</span>
      </button>
    </footer>
  );
}

export default function PortfolioContent({images = {}}) {
  return (
    <>
      <About images={images} />
      <Projects images={images} />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

"use client";
import { useEffect } from "react";
import { clamp } from "./flight";

// Native sticky + scroll-linked values. No pin spacers, no scroll hijacking.
export default function ScrollStory(){
  useEffect(()=>{
    const media=window.matchMedia('(min-width: 960px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const hero=document.querySelector('#inicio'), shell=hero.querySelector('.hero-shell');
    const projects=document.querySelector('[data-projects-scroll]'), stage=document.querySelector('[data-projects-stage]'), track=document.querySelector('[data-projects-track]');
    const cards=[...track.querySelectorAll('.project-card')];
    const photo=document.querySelector('[data-about-photo]'), strip=document.querySelector('[data-skill-strip-track]'), line=document.querySelector('[data-timeline-line]');
    const header=document.querySelector('.site-header'), contact=document.querySelector('#contacto');
    const progressBar=document.querySelector('.reading-progress');
    let raf=0, travel=0, duration=0;
    const measure=()=>{
      const on=media.matches;
      projects.classList.toggle('horizontal-story',on);
      travel=on?Math.max(0,track.scrollWidth-track.clientWidth):0;
      duration=travel;
      projects.style.setProperty('--project-travel',`${duration}px`);
      if(!on)track.style.transform='';
      request();
    };
    function update(){
      raf=0;
      const h=window.innerHeight;
      const heroRect=hero.getBoundingClientRect();
      const hp=clamp(-heroRect.top/Math.max(1,hero.offsetHeight-shell.offsetHeight),0,1);
      shell.style.setProperty('--hero-p',reduced.matches?0:hp);
      shell.style.setProperty('--hero-title-p',reduced.matches?0:clamp(hp*1.6,0,1));
      shell.style.setProperty('--hero-next-p',reduced.matches?0:clamp((hp-.45)/.45,0,1));
      const pp=clamp(-projects.getBoundingClientRect().top/Math.max(1,duration),0,1);
      if(media.matches)track.style.transform=`translate3d(${-pp*travel}px,0,0)`;
      const active=media.matches?Math.min(cards.length-1,Math.round(pp*(cards.length-1))):0;
      stage.style.setProperty('--projects-p',pp);
      stage.querySelectorAll('[data-project-nav]').forEach((button,i)=>button.setAttribute('aria-current',i===active?'true':'false'));
      if(photo){const pr=photo.getBoundingClientRect();photo.style.setProperty('--photo-p',reduced.matches?1:clamp((h-pr.top)/(h*.68),0,1));}
      if(strip){const r=strip.getBoundingClientRect();strip.style.transform=reduced.matches?'':`translateX(${-clamp((h-r.top)/(h+r.height),0,1)*25}%)`;}
      if(line){const r=line.parentElement.getBoundingClientRect();line.style.setProperty('--line-p',reduced.matches?1:clamp((h*.7-r.top)/Math.max(1,r.height),0,1));}
      const c=contact.getBoundingClientRect();contact.style.setProperty('--contact-p',reduced.matches?1:clamp((h-c.top)/(h*.75),0,1));
      header.classList.toggle('header-dark',c.top<50&&c.bottom>50);
      progressBar.style.transform=`scaleX(${clamp(window.scrollY/Math.max(1,document.documentElement.scrollHeight-h),0,1)})`;
    }
    function request(){if(!raf)raf=requestAnimationFrame(update);}
    const jump=e=>{
      const button=e.target.closest('[data-project-nav]');if(!button)return;
      const i=Number(button.dataset.projectNav);if(media.matches){const top=projects.getBoundingClientRect().top+window.scrollY;window.scrollTo({top:top+duration*i/Math.max(1,cards.length-1),behavior:reduced.matches?'auto':'smooth'});}else cards[i]?.scrollIntoView({block:'start'});
    };
    const onFocus=e=>{
      if(!media.matches||e.target.closest('dialog'))return;
      const card=e.target.closest('.project-card');if(!card)return;
      const r=card.getBoundingClientRect();if(r.left<0||r.right>window.innerWidth+10){const i=cards.indexOf(card);window.scrollTo({top:projects.getBoundingClientRect().top+window.scrollY+duration*i/Math.max(1,cards.length-1)});}
    };
    const ro=new ResizeObserver(measure);ro.observe(stage);ro.observe(track);
    window.addEventListener('resize',measure);window.addEventListener('scroll',request,{passive:true});media.addEventListener('change',measure);reduced.addEventListener('change',measure);stage.addEventListener('click',jump);stage.addEventListener('focusin',onFocus);
    document.fonts?.ready.then(measure);measure();update();
    return()=>{cancelAnimationFrame(raf);ro.disconnect();window.removeEventListener('resize',measure);window.removeEventListener('scroll',request);media.removeEventListener('change',measure);reduced.removeEventListener('change',measure);stage.removeEventListener('click',jump);stage.removeEventListener('focusin',onFocus);};
  },[]);
  return null;
}

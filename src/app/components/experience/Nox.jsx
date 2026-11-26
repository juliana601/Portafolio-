"use client";
import { useEffect, useRef, useState } from "react";
import { clamp, steer } from "./flight";

// Criatura original: familiar nocturno con alas de polilla, orejas de hoja y cola de helecho.
function NoxArt() {
  return <svg viewBox="0 0 300 285" className="nox-art" aria-hidden="true">
    <defs>
      <radialGradient id="nox-body" cx="33%" cy="23%" r="82%"><stop stopColor="#70647d"/><stop offset=".43" stopColor="#383044"/><stop offset="1" stopColor="#191624"/></radialGradient>
      <radialGradient id="nox-face" cx="32%" cy="20%" r="89%"><stop stopColor="#80738a"/><stop offset=".48" stopColor="#41364c"/><stop offset="1" stopColor="#241e30"/></radialGradient>
      <linearGradient id="nox-wing" x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#ddd0fb"/><stop offset=".36" stopColor="#ad8cdb"/><stop offset="1" stopColor="#51406f"/></linearGradient>
      <linearGradient id="nox-ear" x2=".8" y2="1"><stop stopColor="#c7a2dc"/><stop offset="1" stopColor="#594267"/></linearGradient>
      <radialGradient id="nox-iris" cx="35%" cy="32%"><stop stopColor="#e2ecb7"/><stop offset=".62" stopColor="#9dba7c"/><stop offset="1" stopColor="#486d58"/></radialGradient>
      <radialGradient id="nox-chest"><stop stopColor="#a39aac"/><stop offset="1" stopColor="#55465e"/></radialGradient>
      <linearGradient id="nox-tail"><stop stopColor="#282333"/><stop offset="1" stopColor="#756382"/></linearGradient>
      <filter id="nox-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#171122" floodOpacity=".26"/></filter>
    </defs>
    <g className="nox-tail" fill="none" strokeLinecap="round"><path d="M186 210 C227 247 269 238 264 205 C261 183 235 188 242 203" stroke="#20192d" strokeWidth="15"/><path d="M186 208 C227 245 269 236 264 205 C261 183 235 188 242 203" stroke="url(#nox-tail)" strokeWidth="11"/><path d="M241 205 Q228 193 245 184 Q255 198 241 205" fill="#a88ac9"/></g>
    <g className="nox-wing-left" filter="url(#nox-shadow)">
      <path d="M128 150 C96 96 35 60 13 88 C1 103 27 149 64 165 C36 166 26 189 44 207 C65 229 103 204 136 172 Z" fill="url(#nox-wing)" stroke="#554069" strokeWidth="2"/>
      <path d="M128 159 Q77 120 25 93 M110 157 Q70 149 45 132 M115 171 Q71 177 49 198 M86 181 Q67 184 59 192" stroke="#f4e8ff" opacity=".49" fill="none" strokeWidth="1.5"/>
      <path d="M29 105 Q40 124 52 126 Q46 108 29 105 M58 185 Q77 184 79 194 Q66 205 58 185" fill="#f5eafa" opacity=".43"/>
    </g>
    <g className="nox-wing-right" filter="url(#nox-shadow)">
      <path d="M172 150 C204 96 265 60 287 88 C299 103 273 149 236 165 C264 166 274 189 256 207 C235 229 197 204 164 172 Z" fill="url(#nox-wing)" stroke="#554069" strokeWidth="2"/>
      <path d="M172 159 Q223 120 275 93 M190 157 Q230 149 255 132 M185 171 Q229 177 251 198 M214 181 Q233 184 241 192" stroke="#f4e8ff" opacity=".49" fill="none" strokeWidth="1.5"/>
      <path d="M271 105 Q260 124 248 126 Q254 108 271 105 M242 185 Q223 184 221 194 Q234 205 242 185" fill="#f5eafa" opacity=".43"/>
    </g>
    <g className="nox-body-group" filter="url(#nox-shadow)">
      <path d="M108 197 C94 213 88 243 110 249 C130 254 138 232 131 211 M173 211 C163 234 170 254 190 249 C212 243 206 213 192 197" fill="url(#nox-body)"/>
      <ellipse cx="150" cy="183" rx="49" ry="60" fill="url(#nox-body)"/>
      <path d="M128 153 Q150 139 172 153 C191 186 177 219 150 228 C123 219 109 186 128 153" fill="url(#nox-chest)" opacity=".92"/>
      <path d="M135 170 Q150 181 165 170 M132 186 Q150 197 168 186 M137 204 Q150 212 163 204" fill="none" stroke="#dfc8e6" strokeWidth="1.6" opacity=".35" strokeLinecap="round"/>
      <path d="M113 173 C89 169 83 191 94 210 C103 220 119 214 123 202 M187 173 C211 169 217 191 206 210 C197 220 181 214 177 202" fill="url(#nox-body)"/>
      <path d="M101 212 l5 -4 M109 215 l4 -5 M191 215 l-4 -5 M199 212 l-5 -4 M103 244 l4 -4 M111 247 l4 -5 M197 244 l-4 -4 M189 247 l-4 -5" fill="none" stroke="#ae96bc" opacity=".63" strokeWidth="2" strokeLinecap="round"/>
    </g>
    <g className="nox-head" filter="url(#nox-shadow)">
      <g className="nox-ear-left"><path d="M103 112 C77 85 64 22 85 18 C105 14 130 65 131 91 Z" fill="url(#nox-face)"/><path d="M101 91 Q78 44 87 29 Q104 40 120 88 Z" fill="url(#nox-ear)"/><path d="M88 35 Q99 55 109 84" stroke="#ecd9f5" opacity=".38" strokeWidth="2" fill="none"/></g>
      <g className="nox-ear-right"><path d="M197 112 C223 85 236 22 215 18 C195 14 170 65 169 91 Z" fill="url(#nox-face)"/><path d="M199 91 Q222 44 213 29 Q196 40 180 88 Z" fill="url(#nox-ear)"/><path d="M212 35 Q201 55 191 84" stroke="#ecd9f5" opacity=".38" strokeWidth="2" fill="none"/></g>
      <path d="M105 79 Q113 64 129 61 Q129 52 139 48 Q142 60 151 63 Q163 49 175 55 L171 64 Q191 67 199 80 C215 95 220 126 205 143 Q196 157 175 164 Q150 171 125 164 Q104 157 95 143 C80 126 85 95 105 79" fill="url(#nox-face)"/>
      <path d="M105 100 Q118 88 134 99 M166 99 Q182 88 195 100" stroke="#a095ad" opacity=".7" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <g className="nox-eyes">
        <ellipse cx="119" cy="120" rx="21" ry="24" fill="#211c2c"/><ellipse cx="181" cy="120" rx="21" ry="24" fill="#211c2c"/>
        <ellipse cx="119" cy="120" rx="17.5" ry="20" fill="url(#nox-iris)"/><ellipse cx="181" cy="120" rx="17.5" ry="20" fill="url(#nox-iris)"/>
        <g className="nox-pupils"><ellipse cx="120" cy="121" rx="9" ry="14" fill="#171b20"/><ellipse cx="180" cy="121" rx="9" ry="14" fill="#171b20"/><circle cx="115" cy="113" r="4.4" fill="#fff"/><circle cx="175" cy="113" r="4.4" fill="#fff"/><circle cx="124" cy="127" r="1.7" fill="#dfeecb"/><circle cx="184" cy="127" r="1.7" fill="#dfeecb"/></g>
      </g>
      <path d="M135 144 Q150 135 165 144 Q171 156 150 160 Q129 156 135 144" fill="#625367"/>
      <path d="M144 143 Q150 139 156 143 Q155 149 150 150 Q145 149 144 143" fill="#211c29"/>
      <path d="M150 150 Q150 154 145 155 M150 150 Q150 154 155 155" stroke="#241e2e" strokeWidth="1.7" strokeLinecap="round" fill="none"/>
      <g fill="#c1a4d8" opacity=".77"><circle cx="103" cy="144" r="2"/><circle cx="110" cy="147" r="1.5"/><circle cx="197" cy="144" r="2"/><circle cx="190" cy="147" r="1.5"/><path d="M150 76 L154 85 L150 94 L146 85 Z"/></g>
    </g>
  </svg>;
}

export default function Nox(){
  const el=useRef(null), star=useRef(null), fx=useRef(null), speech=useRef(null);
  const [enabled,setEnabled]=useState(true);
  useEffect(()=>{
    if(!enabled) return;
    const node=el.current, spark=star.current, particles=fx.current, bubble=speech.current;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer={x:0,y:0,last:-Infinity};
    const pos={x:window.innerWidth*.75,y:window.innerHeight*.47,vx:0,vy:0};
    let raf,last=0, scene='inicio', progress=0, starTarget=null, targetSize=0, size=0, burstUntil=0, messageUntil=0, message='', lastSection='', frameTime=0;
    const nodes=[...document.querySelectorAll('main section[id]')];
    const labels={inicio:'¡Hola! Soy Nox.', 'sobre-mi':'Curioseando por aquí…', proyectos:'¡Mira lo que creó!', habilidades:'Un poquito de magia.', experiencia:'Todo es aprendizaje.', contacto:'¡Hasta pronto!'};
    const readScroll=()=>{
      const h=window.innerHeight;
      const active=nodes.findLast(n=>n.getBoundingClientRect().top<=h*.42)||nodes[0];
      if(!active)return; scene=active.id;
      const rect=active.getBoundingClientRect(); progress=clamp(-rect.top/Math.max(1,rect.height-h*.65),0,1);
      if(scene!==lastSection){lastSection=scene;starTarget=null;spark.style.opacity='0';message=labels[scene]||'';messageUntil=performance.now()+2300;}
    };
    const onMove=e=>{if(e.pointerType==='touch')return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.last=performance.now();};
    const onLeave=()=>{pointer.last=-Infinity;};
    const burst=(x,y,now)=>{particles.style.left=`${x}px`;particles.style.top=`${y}px`;particles.classList.remove('burst');void particles.offsetWidth;particles.classList.add('burst');burstUntil=now+650;};
    const onClick=e=>{
      if(e.defaultPrevented||e.target.closest('a,button,input,textarea,select,summary,label,[role="dialog"],.site-menu')||window.getSelection()?.toString())return;
      if(reduced)return;
      starTarget={x:e.clientX,y:e.clientY,until:performance.now()+4500};spark.style.left=`${e.clientX}px`;spark.style.top=`${e.clientY}px`;spark.style.opacity='1';
      message='¡Una estrella!';messageUntil=performance.now()+1500;
    };
    const onHover=()=>{message='¡Hola! Tócame.';messageUntil=performance.now()+1600;};
    const onPet=()=>{const now=performance.now();burst(pos.x,pos.y,now);message=scene==='contacto'?'¡Hasta pronto!':'¡Je, je!';messageUntil=now+1700;};
    node.addEventListener('click',onPet);node.addEventListener('pointerenter',onHover);
    window.addEventListener('pointermove',onMove,{passive:true});window.addEventListener('pointerleave',onLeave);window.addEventListener('blur',onLeave);window.addEventListener('scroll',readScroll,{passive:true});window.addEventListener('resize',readScroll);window.addEventListener('click',onClick);readScroll();
    const tick=now=>{
      const dt=last?Math.min(.04,(now-last)/1000):.016;last=now;frameTime+=dt;
      const w=window.innerWidth,h=window.innerHeight,mobile=w<760,hero=scene==='inicio',contact=scene==='contacto';
      const menu=Boolean(document.querySelector('.site-menu, dialog[open]'));
      const visible=hero||contact||progress<.20||progress>.79||starTarget;
      targetSize=hero?(mobile?Math.min(185,w*.48):Math.min(330,w*.29,h*.44)):contact?(mobile?115:190):mobile?82:130;
      if(hero) targetSize*=1-.52*clamp((progress-.22)/.65,0,1);
      if(!visible||menu)targetSize=0;
      size+=(targetSize-size)*(reduced?1:1-Math.exp(-6*dt));
      const radius=Math.max(22,targetSize*.48), top=Math.min(h/2,86+radius*.6),bottom=Math.max(top,h-radius-22);
      const bounds={left:Math.min(w/2,radius+9),right:Math.max(w/2,w-radius-9),top,bottom};
      const t=frameTime;
      let tx=hero?(mobile?w*.60:w*.75):contact?w*.77:w-radius-18;
      let ty=hero?(mobile?h*.67:h*.47):contact?h*.72:h*(progress>.79?.73:.26);
      if(hero&&progress>.15){const p=clamp((progress-.15)/.78,0,1);tx+=Math.sin(p*Math.PI)*w*.13-p*w*.18;ty-=Math.sin(p*Math.PI)*h*.24;}
      if(!reduced){tx+=Math.sin(t*.66)*Math.min(hero?90:28,w*.065)+Math.sin(t*1.42)*10;ty+=Math.cos(t*.89)*(hero?44:20);}
      const tracking=now-pointer.last<1600&&!mobile&&!reduced;
      if(tracking&&!starTarget&&(hero||contact||visible)){
        const strength=hero?.72:.48;
        tx=tx*(1-strength)+(pointer.x+Math.cos(t*1.6)*36)*strength;
        ty=ty*(1-strength)+(pointer.y-48+Math.sin(t*1.6)*24)*strength;
      }
      if(starTarget){
        if(now>starTarget.until){starTarget=null;spark.style.opacity='0';}
        else{tx=starTarget.x;ty=starTarget.y;const near=Math.hypot(pos.x-clamp(tx,bounds.left,bounds.right),pos.y-clamp(ty,bounds.top,bounds.bottom));if(near<22){burst(starTarget.x,starTarget.y,now);spark.style.opacity='0';starTarget=null;message='¡La atrapé!';messageUntil=now+1500;}}
      }
      tx=clamp(tx,bounds.left,bounds.right);ty=clamp(ty,bounds.top,bounds.bottom);
      if(reduced){pos.x=tx;pos.y=ty;pos.vx=0;pos.vy=0;}else steer(pos,{x:tx,y:ty},dt,bounds);
      const tilt=clamp(pos.vx/32,-16,16),squash=now<burstUntil?1+.07*Math.sin((burstUntil-now)*.022):1;
      node.style.transform=`translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%) rotate(${tilt}deg) scale(${squash})`;
      node.classList.toggle('is-contact',contact);node.style.width=`${Math.max(size,1)}px`;node.style.opacity=String(clamp(size/55,0,1));node.style.visibility=size<3?'hidden':'visible';node.style.pointerEvents=size>55&&!menu?'auto':'none';node.tabIndex=size>55&&!menu?0:-1;
      node.style.setProperty('--eye-x',`${tracking?clamp((pointer.x-pos.x)/28,-4,4):clamp(pos.vx/80,-4,4)}px`);
      node.style.setProperty('--eye-y',`${tracking?clamp((pointer.y-pos.y)/36,-3,3):clamp(pos.vy/100,-3,3)}px`);
      bubble.textContent=message;bubble.style.opacity=now<messageUntil&&size>75&&!menu?'1':'0';
      bubble.style.transform=`translate(${clamp(pos.x-60,8,w-128)}px,${clamp(pos.y+size*.42,90,h-40)}px)`;
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(raf);node.removeEventListener('click',onPet);node.removeEventListener('pointerenter',onHover);window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerleave',onLeave);window.removeEventListener('blur',onLeave);window.removeEventListener('scroll',readScroll);window.removeEventListener('resize',readScroll);window.removeEventListener('click',onClick);};
  },[enabled]);
  return <>
    <div className="nox-layer" aria-label="Nox, mascota interactiva" hidden={!enabled}>
      <button ref={el} type="button" className="nox-character" aria-label="Saludar a Nox"><NoxArt/></button>
      <span ref={star} className="nox-star" aria-hidden="true">✦</span>
      <div ref={fx} className="nox-particles" aria-hidden="true">{Array.from({length:9},(_,i)=><span key={i} style={{'--angle':`${i*40}deg`,'--distance':`${40+(i%3)*19}px`}}>✦</span>)}</div>
      <span ref={speech} className="nox-speech" aria-hidden="true"/>
    </div>
    <button className="nox-toggle" type="button" aria-pressed={enabled} onClick={()=>setEnabled(v=>!v)}><span aria-hidden="true">✦</span> {enabled?'NOX ON':'NOX OFF'}</button>
  </>;
}

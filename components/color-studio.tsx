"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpLeft, Check, Palette } from "lucide-react";
import { whatsappUrl } from "@/data/site";

const scenes = [
  { title: "عمق هادئ", name: "PETROL & CORAL", image: "/hero-color-story.webp", description: "أزرق عميق مع لمسة مرجانية دافئة. تناغم يمنح التفاصيل حضورًا ويترك للمكان هدوءه.", colors: [{name:"أزرق عميق",english:"PETROL",color:"#235D71"},{name:"مرجاني دافئ",english:"CORAL",color:"#DB684E"},{name:"عاجي ناعم",english:"IVORY",color:"#E8DDC8"}], alt:"إلهام لوني بجدار أزرق عميق وكرسي مرجاني" },
  { title: "هدوء طبيعي", name: "SAGE & IVORY", image: "/inspiration-sage.webp", description: "أخضر هادئ وعاجي ناعم مع دفء الخشب. إلهام للمساحات التي تحب الضوء والخامات الطبيعية.", colors: [{name:"أخضر هادئ",english:"SAGE",color:"#8D9A80"},{name:"عاجي ناعم",english:"IVORY",color:"#E8DDC8"},{name:"دفء ترابي",english:"EARTH",color:"#A66F48"}], alt:"إلهام لوني بجدار أخضر هادئ وكرسي عاجي" },
] as const;

export function ColorStudio() {
  const [selected,setSelected]=useState(0);
  const scene=scenes[selected];
  return <section className="color-studio section-space" id="color-studio" aria-labelledby="studio-title"><div className="container-shell studio-layout">
    <div className="studio-visual">
      <div className="studio-frame">{scenes.map((item,index)=><div key={item.name} className={`studio-photo-layer ${selected===index?"is-active":""}`} aria-hidden={selected!==index}><Image src={item.image} alt={selected===index?item.alt:""} fill loading="lazy" sizes="(max-width:680px) 100vw, 52vw" className="object-cover"/></div>)}
        <span className="studio-image-label" dir="ltr">COLOUR STUDY / 0{selected+1}</span>
      </div>
      <div className="studio-swatch-fan" aria-hidden="true">{scene.colors.map((color,index)=><div className={`studio-swatch swatch-${index}`} key={index}><span className="studio-swatch-color" style={{backgroundColor:color.color}}/><div><small dir="ltr">{color.english}</small><span>{color.name}</span></div></div>)}</div>
    </div>
    <div className="studio-copy"><span className="eyebrow"><Palette size={16}/> استوديو الإلهام</span><h2 id="studio-title" className="section-title">غيّر اللون،<br/><span>واكتشف الإحساس.</span></h2><p>بعض الألوان تهدّئ المكان، وبعضها تمنحه حضورًا.<br/>جرّب التناغمين، واختر الإلهام الأقرب لذوقك.</p>
      <div className="studio-options" aria-label="اختر التناغم اللوني">{scenes.map((item,index)=><button key={item.name} type="button" aria-pressed={selected===index} onClick={()=>setSelected(index)}><span className="studio-option-colors" aria-hidden="true">{item.colors.map(color=><i key={color.color} style={{backgroundColor:color.color}}/>)}</span><span>{item.title}</span><Check size={15} className="studio-option-check" aria-hidden="true"/></button>)}</div>
      <div className="studio-description" aria-live="polite"><span dir="ltr">{scene.name}</span><h3>{scene.title}</h3><p>{scene.description}</p></div>
      <a className="text-link" href={whatsappUrl(`السلام عليكم، أعجبني تناغم «${scene.title}» في استوديو الإلهام، وأرغب في المساعدة لاختيار درجات تناسب مساحتي وإضاءتها.`)} target="_blank" rel="noreferrer">نساعدك تختار درجاتك <ArrowUpLeft size={19}/></a>
    </div>
  </div></section>;
}

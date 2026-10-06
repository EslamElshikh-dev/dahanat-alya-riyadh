"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/catalog-products";
import { products } from "@/data/products";
export function ProductBrowser() {
 const [filter,setFilter]=useState("all");const [search,setSearch]=useState("");
 const matching=products.filter(product=>(filter==="all"||product.collection===filter)&&`${product.title} ${product.name} ${product.use}`.toLowerCase().includes(search.trim().toLowerCase()));
 return <div className="container-shell product-browser"><div className="product-toolbar"><div className="product-filters" aria-label="تصفية المنتجات">{[["all","كل المنتجات"],["Alya Paints","الدهانات والتأسيس"],["Alya Thermal","الطلاءات والحماية"]].map(([value,label])=><button key={value} type="button" aria-pressed={filter===value} onClick={()=>setFilter(value)}>{label}</button>)}</div><label className="product-search"><Search size={18}/><span className="sr-only">ابحث باسم المنتج</span><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="ابحث باسم المنتج..." type="search"/></label></div>{[["Alya Paints","الدهانات والتأسيس","paints"],["Alya Thermal","الطلاءات والحماية","thermal"]].map(([collection,title,id])=>{const group=matching.filter(p=>p.collection===collection);return group.length>0&&<section className="product-collection" id={id} key={id}><div className="collection-heading"><h2>{title}</h2><span dir="ltr">{collection.toUpperCase()} / {group.length}</span></div><div className="product-grid">{group.map(product=><ProductCard key={product.name} product={product} index={products.indexOf(product)}/>)}</div></section>})}{matching.length===0&&<p className="no-products" role="status">لا توجد منتجات تطابق بحثك.<br/>جرّب الاسم العربي أو الإنجليزي للمنتج.</p>}</div>;
}

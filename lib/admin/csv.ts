export function parseCsv(text:string):Record<string,string>[] {
 if(text.length>1000000)throw new Error("ملف التقرير أكبر من ١ ميجابايت.");const rows:string[][]=[];let row:string[]=[];let field="";let quoted=false;
 const delimiter=text.split(/\r?\n/,1)[0].includes("\t")?"\t":text.split(/\r?\n/,1)[0].includes(";")?";":",";
 for(let i=0;i<text.length;i++){const ch=text[i];if(ch==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}else if(ch===delimiter&&!quoted){row.push(field);field="";}else if((ch==="\n"||ch==="\r")&&!quoted){if(ch==="\r"&&text[i+1]==="\n")i++;row.push(field);if(row.some(x=>x.trim()))rows.push(row);row=[];field="";}else field+=ch;}
 if(quoted)throw new Error("تنسيق الاقتباس في CSV غير صحيح.");row.push(field);if(row.some(x=>x.trim()))rows.push(row);if(rows.length<2)throw new Error("أضف عناوين الأعمدة وصفوف البيانات في التقرير.");
 const headers=rows.shift()!.map(x=>x.replace(/^\uFEFF/,"").trim());if(new Set(headers).size!==headers.length)throw new Error("عناوين أعمدة مكررة.");
 return rows.map((cells,i)=>{if(cells.length!==headers.length)throw new Error(`عدد الأعمدة في الصف ${i+2} غير صحيح.`);return Object.fromEntries(headers.map((h,j)=>[h,cells[j].trim()]));});
}
export function csvExport(rows:Record<string,unknown>[],headers:string[]){const quote=(v:unknown)=>'"'+String(v??"").replace(/^[=+@-]/," '$&").replace(/"/g,'""')+'"';return '\uFEFF'+[headers.map(quote).join(","),...rows.map(row=>headers.map(h=>quote(row[h])).join(","))].join("\r\n");}

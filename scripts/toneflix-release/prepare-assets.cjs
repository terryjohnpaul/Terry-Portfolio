// Run with NODE_PATH pointing to a directory containing sharp.
// No credentials required. Upload is deliberately a separate step.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),sharp=require('sharp');
const root=process.cwd(), out=path.join(root,'audit/toneflix-launch/assets');fs.mkdirSync(out,{recursive:true});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex').slice(0,16);
(async()=>{
 const deps=JSON.parse(fs.readFileSync('audit/toneflix-launch/dependencies.json'));
 const files=[...new Set(deps.filter(d=>d.tag==='img'&&d.source&&/\.(png|jpe?g|webp)$/i.test(d.source)).map(d=>d.source))];
 for(const extra of ['assets/sw/toneflix.webp','settle-club/images/hero/toneflix-casestudy.webp'])if(fs.existsSync(extra))files.push(extra);
 const manifest=[];
 for(const source of [...new Set(files)]){
  const src=fs.readFileSync(source), meta=await sharp(src).metadata(), variants=[];
  const widths=meta.width>1100?[640,1280,Math.min(2400,meta.width)]:[meta.width];
  for(const width of [...new Set(widths)].filter(w=>w<=meta.width)){
   const buf=await sharp(src).resize({width,withoutEnlargement:true}).webp({quality:92,effort:6}).toBuffer();
   const m=await sharp(buf).metadata(), key=`toneflix/20260925/${path.parse(source).name}-${width}-${hash(buf)}.webp`;
   const local=path.join(out,path.basename(key));fs.writeFileSync(local,buf);variants.push({key,file:path.relative(root,local),width:m.width,height:m.height,bytes:buf.length,type:'image/webp'});
  }
  manifest.push({source,sourceSha256:hash(src),width:meta.width,height:meta.height,sourceBytes:src.length,variants});
 }
 // Preserve the entire first main artwork, centred with white safe margins.
 const inset=await sharp('toneflix/hero-new.png').resize(1120,550,{fit:'inside'}).toBuffer();
 const social=await sharp({create:{width:1200,height:630,channels:3,background:'#ffffff'}}).composite([{input:inset,gravity:'centre'}]).jpeg({quality:94}).toBuffer();
 const key=`toneflix/20260925/social-${hash(social)}.jpg`, file=path.join(out,path.basename(key));fs.writeFileSync(file,social);
 manifest.push({source:'toneflix/hero-new.png',purpose:'social-preview',width:1200,height:630,variants:[{key,file:path.relative(root,file),width:1200,height:630,bytes:social.length,type:'image/jpeg'}]});
 fs.writeFileSync('audit/toneflix-launch/asset-manifest.json',JSON.stringify({status:'prepared-not-uploaded',bucket:'terry-portfolio-assets',assets:manifest},null,2));
 console.log({assets:manifest.length,sourceBytes:manifest.reduce((n,a)=>n+(a.sourceBytes||0),0),outputBytes:manifest.reduce((n,a)=>n+a.variants.reduce((t,v)=>t+v.bytes,0),0)});
})();

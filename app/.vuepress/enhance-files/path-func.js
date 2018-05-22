
const trimPath = (p)=>{
  p = p.replace(/^\.\//, '');
  p = p.charAt(0) === '/' ? p.slice(1) : p;
  p = p.charAt(p.length-1) === '/' ? p.slice(0, p.length-1) : p;
  return p;
}

const isDirectory = (p)=>{
  p = p.split('/')
  const f = p[p.length-1];
  return (f.split('.').length === 1)
}

const RelativeFilePath = function(path){
  path = trimPath(path);
  const toPath = trimPath(this.$site.base + path).split('/').filter(v => v !== "");
  const fromPath = trimPath(this.$page.path).split('/').filter(v => v !== "");
  const length = Math.min(fromPath.length, toPath.length);
  
  let samePartsLength = length;
  for (let i = 0; i < length; i++) {
    if (fromPath[i] !== toPath[i]) {
      samePartsLength = i;
      break;
    }
  }
  let outPath = [];
  for (let i = samePartsLength; i < fromPath.length; i++) {
    outPath.push('..');
  }
  const suffix = toPath.slice(samePartsLength).filter(v => v !== "");
  outPath = outPath.concat(suffix);
  outPath = outPath.join('/');


  if(isDirectory(path) == true){
    outPath += '/'
  }
  return outPath;

}


export default RelativeFilePath;
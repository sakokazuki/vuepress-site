import Vue from 'vue'

const checkTargetData = (components, paramName) =>{
  const { locales = {}} = components.$site
  let targetData;
  let defaultData;
  for(const path in locales){
    if(path === '/'){
      defaultData = locales[path][paramName];
    }else if (components.$page.path.indexOf(path) === 0) {
      targetData = locales[path][paramName];
    }
  }
  return targetData || defaultData || {}
}


export default {
  computed: {
    $common(){
      return checkTargetData(this, 'commonData')
    },
    $lang(){
      return checkTargetData(this, 'langData')
    }
  }
}

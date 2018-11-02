

/**
 * 从localStorage获取给定的值
 * @param {key} key 
 */
export function getLocalStorage(key){
      let value = localStorage.getItem(key)
      if((value != null) && (value != undefined) && (value.length > 1)){
		return value
	}else{
            return false
      }
}


/**
 * 从localStorage获取给定的值, 并消除双引号
 * @param {key} key 
 */
export function getLocalStorageEnhance(key){
      let value = localStorage.getItem(key)
      if((value != null) && (value != undefined) && (value.length > 1)){
		return value.replace("\"","").replace("\"","");
	}else{
            return false
      }
}
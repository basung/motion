/**
 * 判断对象是否可用JSON.parse
 * @param {*} str 字符串
 */
export function isJSON(str) {
	//console.info("str======",str);
	if (str && typeof str == 'string') {
		try {
			JSON.parse(str);
			return true;
		} catch (e) {
			// console.log(e);
			return false;
		}
	} else {
		return false;
	}
	// console.log('It is not a string!')
}


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


/**
 * 14位UUID,前两位为11
 */
export function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 10) % 10 | 0;
		d = Math.floor(d / 10);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(10);
	});
	return '11' + uuid;
};

/**
 * 12位UUID
 */
export function generateUUIDFor11() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 10) % 10 | 0;
		d = Math.floor(d / 10);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(10);
	});
	return uuid;
};

export function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

export function beforeUpload(file) {
	console.info('file ===', JSON.stringify(file.type))
	const isJPG = ((file.type === 'image/jpeg') || (file.type === 'image/png')) ;
	if (!isJPG) {
		message.error('图片上传只提供 JPG, JPEG, PNG 格式的文件!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('文件大小不能超过 2MB!');
	}
	return isJPG && isLt2M;
}

/**
 * 对象判断是否为空
 * @param   {mixed_var}     mixed_var    需要判断的对象
 * @return  {Bool}   如为空,返回‘1’,否则返回‘0’.
 */
export function isEmpty(mixed_var) {
	var key;

	if (mixed_var === "" || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
		return true;
	}

	if (typeof mixed_var == 'object') {
		for (key in mixed_var) {
			return false;
		}
		return true;
	}

	return false;
}

/**
 * 树状的算法
 * @params list     代转化数组
 * @params parentId 起始节点
 */
export function getTrees(list, parentId) {
	let items = {};
	// 获取每个节点的直属子节点，*记住是直属，不是所有子节点
	for (let i = 0; i < list.length; i++) {
		let key = list[i].parentId;
		if (items[key]) {
			items[key].push(list[i]);
		} else {
			items[key] = [];
			items[key].push(list[i]);
		}
	}
	return formatTree(items, parentId);
}

/**
 * 利用递归格式化每个节点
 */
function formatTree(items, parentId) {
	let result = [];
	if (!items[parentId]) {
		return result;
	}
	for (let t of items[parentId]) {
		t.children = formatTree(items, t.id)
		result.push(t);
	}
	return result;
}
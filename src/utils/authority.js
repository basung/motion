

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
	// return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
	const authorityString =
		typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
	// authorityString could be admin, "admin", ["admin"]
	let authority;
	try {
		authority = JSON.parse(authorityString);
	} catch (e) {
		authority = authorityString;
	}
	if (typeof authority === 'string') {
		return [authority];
	}
	return authority || ['admin'];
}

//设置权限，将用户权限存入localStorage
export function setAuthority(authority, token) {
	const proAuthority = typeof authority === 'string' ? [authority] : authority;
	// console.info('proAuthority ===', JSON.stringify(proAuthority))
	if(token){
		localStorage.setItem('Authorization', token);
	}
	return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

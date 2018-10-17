import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';
import Api_Config from '@/utils/api_evn';

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};

const checkStatus = response => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const errortext = codeMessage[response.status] || response.message;
	notification.error({
		message: `请求错误 ${response.status}: ${response.url}`,
		description: errortext,
	});
	const error = new Error(errortext);
	error.name = response.status;
	error.response = response;
	throw error;
};

const cachedSave = (response, hashcode) => {
	/**
	 * Clone a response data and store it in sessionStorage
	 * Does not support data other than json, Cache only json
	 */
	const contentType = response.headers.get('Content-Type');
	if (contentType && contentType.match(/application\/json/i)) {
		// All data is saved as text
		response
			.clone()
			.text()
			.then(content => {
				sessionStorage.setItem(hashcode, content);
				sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
			});
	}
	return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {string} NETENV  	The NETENV we want to request url
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = { expirys: isAntdPro(), }, NETENV) {

	console.info('NETENV ===',NETENV)
	//判断是服务端接口还是mock接口
	if (NETENV === true) {
		url = Api_Config.APIURL + url;
	}
	// console.info('url ===', url)

	//从lacalStorage中获取Authorization
	let Authorization = localStorage.getItem('Authorization')
	console.info('Authorization ===111===', Authorization )
	if((Authorization != null) && (Authorization != undefined) && (Authorization.length > 1)){
		Authorization = Authorization.replace("\"","").replace("\"","");
	}
	console.info('Authorization ===222===', Authorization )

	const defaultOptions = { credentials: 'include' };
	const newOptions = { ...defaultOptions, ...options };

	if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
		newOptions.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': Authorization,
			...newOptions.headers,
		};
		// newOptions.body = JSON.stringify(newOptions.body);
	} else {
		newOptions.headers = {
			'Authorization': Authorization,
			...newOptions.headers,
		};
		// newOptions.body = JSON.stringify(newOptions.body);
	}

	// console.info("url===========", url);
	// console.info("newOptions===========", newOptions);
	
	return fetch(url, newOptions)
		.then(checkStatus)
		.then(response => response.json())
		.catch(e => {
			const status = e.name;
			if (status === 401) {
				// @HACK
				/* eslint-disable no-underscore-dangle */
				window.g_app._store.dispatch({
					type: 'login/logout',
				});
				return;
			}
			// environment should not be used
			if (status === 403) {
				router.push('/exception/403');
				return;
			}
			if (status <= 504 && status >= 500) {
				router.push('/exception/500');
				return;
			}
			if (status >= 404 && status < 422) {
				router.push('/exception/404');
			}
		});
}
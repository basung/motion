import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, accountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { checkStatus } from '@/utils/api_url'

export default {
	namespace: 'login',

	state: {
		status: undefined,
	},

	effects: {
		*login({ payload }, { call, put }) {
			// const response = yield call(fakeAccountLogin, payload);  //原始接口
			const response = yield call(accountLogin, payload); //自己的服务端接口
			if (checkStatus(response)) {
				yield put({
					type: 'changeLoginStatus',
					payload: {
						currentAuthority: 'admin',
						token: response.data.token,
					}
				});
				reloadAuthorized();
				const urlParams = new URL(window.location.href);
				const params = getPageQuery();
				let { redirect } = params;
				if (redirect) {
					const redirectUrlParams = new URL(redirect);
					if (redirectUrlParams.origin === urlParams.origin) {
						redirect = redirect.substr(urlParams.origin.length);
						if (redirect.startsWith('/#')) {
							redirect = redirect.substr(2);
						}
					} else {
						window.location.href = redirect;
						return;
					}
				}
				yield put(routerRedux.replace(redirect || '/'));
			}
		},

		*getCaptcha({ payload }, { call }) {
			yield call(getFakeCaptcha, payload);
		},

		*logout(_, { put }) {
			yield put({
				type: 'changeLoginStatus',
				payload: {
					status: false,
					currentAuthority: 'guest',
					token: '',
				},
			});
			reloadAuthorized();
			yield put(
				routerRedux.push({
					pathname: '/user/login',
					search: stringify({
						redirect: window.location.href,
					}),
				})
			);
		},
	},

	reducers: {
		changeLoginStatus(state, { payload }) {
			setAuthority(payload.currentAuthority, payload.token);
			return {
				...state,
				status: payload.status,
				type: payload.type,
			};
		},
	},
};

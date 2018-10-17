import { notification } from 'antd';
import { stringify } from 'qs';
import request from '@/utils/request';
import { isEmpty } from '@/utils/utils'


export async function query(params) {
      // console.info('params ===', JSON.stringify(params))
      if (!isEmpty(params) && !isEmpty(params.url)) {
            let url = params.url
            let paramStr = '?'
            if (params.params && !isEmpty(params.params)) {
                  for (let key in params.params) {
                        if (!isEmpty(params.params[key])) {
                              paramStr += key + '=' + params.params[key] + '&'
                        }
                  }
            } else {
                  paramStr += 'pageSize=10&pageIndex=0'
            }
            //如果没有加分页参数，补加默认分页数据
            if (paramStr.indexOf('pageSize') < 0) {
                  paramStr += 'pageSize=10&pageIndex=0'
            }
            return request(url + paramStr, { method: 'get' }, true)
      } else {
            notification.error({
                  message: `请求参数错误`,
                  description: '请求URL为空',
            });
            setTimeout(function () {
                  // window.location.href = 'yql/admin/#/exception/500'
            }, 1000);
      }
}

export async function create(params) {
      let url = params.url
      let args = params.args
      return request(url, {
            method: 'post',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
      }, true)
}

export async function update(params) {
      let url = params.url
      let args = params.args
      return request(url, {
            method: 'put',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
      }, true)
}

export async function remove(params) {
      let url = params.url
      let id = params.id
      return request(url + '/' + id, { method: 'delete' }, true)
}

export async function getByIds(params) {
      let url = params.url
      let id = params.id
      return request(url + '/' + id, { method: 'get' }, true)
}

export async function postByParams(params) {
      let url = params.url + params.args;
      return request(url, {
            method: 'POST',
            body: params,
      }, true);
}
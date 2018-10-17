import { notification } from 'antd';
import router from 'umi/router';

const api_url = {
      /**
       * 系统配置模块接口
       */

      //权限管理接口
      api_permission_query: '/admin/permission/query',
      api_permission_create: '/admin/permission/create',
      api_permission_edit: '/admin/permission/edit',
      api_permission_get: '/admin/permission/get',
      api_permission_remove: '/admin/permission/del',

      //角色管理接口
      api_role_query: '/admin/role/query',
      api_role_create: '/admin/role/create',
      api_role_edit: '/admin/role/edit',
      api_role_get: '/admin/role/get',
      api_role_remove: '/admin/role/del',
      api_role_relation_permission: '/admin/rolePermission/getRolePermission',
      api_role_add_permissions: '/admin/rolePermission/createRolePermission',

      //平台管理员接口
      api_adminUser_query: '/admin/adminUser/query',
      api_adminUser_create: '/admin/adminUser/create',
      api_adminUser_edit: '/admin/adminUser/edit',
      api_adminUser_get: '/admin/adminUser/get',
      api_adminUser_remove: '/admin/adminUser/del',


}

export { api_url };

export function checkStatus(response) {

      // console.info("##############response in checkStatus=====", response);
      const status = response.status
      switch (status) {
            case 200:
                  return true;
            case 400:
                  notification.error({
                        message: "请求错误",
                        description: response.message
                  });
                  return false;
            case 401:
                  window.g_app._store.dispatch({
                        type: 'login/logout',
                  });
                  return false;
            case 403:
                  router.push('/exception/403');
                  return false;
            case 500:
                  router.push('/exception/500');
                  return false;
            default:
                  router.push('/exception/404');
                  return false;

      }
}
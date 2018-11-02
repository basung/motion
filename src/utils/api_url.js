import { notification } from 'antd';
import router from 'umi/router';

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



export const api_url = {


      /**
       * 商品管理接口
       */
      api_wares_goods_query: '/wares/goods/query',
      api_wares_goods_get: '/wares/goods/get',
      api_wares_goods_remove: '/wares/goods/del',
      api_wares_goods_update: '/wares/goods/update',
      api_wares_goods_create: '/wares/goods/create',

      /**
       * 商品配置接口
       */

      //商品品牌
      api_wares_brand_query: '/wares/brand/query',
      api_wares_brand_remove: '/wares/brand/del',
      api_wares_brand_get: '/wares/brand/get',
      api_wares_brand_create: '/wares/brand/create',
      api_wares_brand_update: '/wares/brand/update',

      //商品标签
      api_wares_tags_query: '/wares/tags/query',
      api_wares_tags_get: '/wares/tags/get',
      api_wares_tags_remove: '/wares/tags/del',
      api_wares_tags_create: '/wares/tags/create',
      api_wares_tags_update: '/wares/tags/update',

      //商品分类
      api_wares_category_query: '/wares/category/query',
      api_wares_category_get: '/wares/category/get',
      api_wares_category_remove: '/wares/category/del',
      api_wares_category_create: '/wares/category/create',
      api_wares_category_update: '/wares/category/update',

      //商品规格
      api_wares_spec_query: '/wares/spec/query',
      api_wares_spec_get: '/wares/spec/get',
      api_wares_spec_remove: '/wares/spec/del',
      api_wares_spec_create: '/wares/spec/create',
      api_wares_spec_update: '/wares/spec/update',


      /**
       * 文章模块接口
       */

      //文章分类接口
      api_article_category_query: '/article/category/query',
      api_article_category_create: '/article/category/create',
      api_article_category_get: '/article/category/get',
      api_article_category_update: '/article/category/update',
      api_article_category_remove: '/article/category/del',

      //文章接口
      api_article_news_query: '/article/news/query',
      api_article_news_create: '/article/news/create',
      api_article_news_get: '/article/news/get',
      api_article_news_update: '/article/news/update',
      api_article_news_remove: '/article/news/del',

      /**
       * 系统配置模块接口
       */

      //权限管理接口
      api_permission_query: '/admin/permission/query',
      api_permission_create: '/admin/permission/create',
      api_permission_edit: '/admin/permission/update',
      api_permission_get: '/admin/permission/get',
      api_permission_remove: '/admin/permission/del',

      //角色管理接口
      api_role_query: '/admin/role/query',
      api_role_create: '/admin/role/create',
      api_role_edit: '/admin/role/update',
      api_role_get: '/admin/role/get',
      api_role_remove: '/admin/role/del',
      api_role_relation_permission: '/admin/rolePermission/getRolePermission',
      api_role_add_permissions: '/admin/rolePermission/createRolePermission',

      //平台管理员接口
      api_adminUser_query: '/admin/adminUser/query',
      api_adminUser_create: '/admin/adminUser/create',
      api_adminUser_edit: '/admin/adminUser/update',
      api_adminUser_get: '/admin/adminUser/get',
      api_adminUser_remove: '/admin/adminUser/del',


}


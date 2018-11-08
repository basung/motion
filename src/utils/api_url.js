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
       * 订单管理接口
       */
      api_order_order_query: '/order/order/query',
      api_order_order_get: '/order/order/get',
      api_order_order_remove: '/order/order/del',
      api_order_order_update: '/order/order/update',
      api_order_order_create: '/order/order/create',


      /**
       * 商品管理接口
       */
      api_wares_goods_query: '/wares/goods/query',
      api_wares_goods_get: '/wares/goods/get',
      api_wares_goods_remove: '/wares/goods/del',
      api_wares_goods_update: '/wares/goods/update',
      api_wares_goods_create: '/wares/goods/create',

      /**
       * 商品SKU管理接口
       */
      api_wares_sku_query: '/wares/sku/query',
      api_wares_sku_get: '/wares/sku/get',
      api_wares_sku_remove: '/wares/sku/del',
      api_wares_sku_update: '/wares/sku/update',
      api_wares_sku_create: '/wares/sku/create',

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
       * 物流设置接口
       */

       //物流公司
       api_logistics_company_create: '/logistics/company/create',
       api_logistics_company_query: '/logistics/company/query',
       api_logistics_company_remove: '/logistics/company/del',
       api_logistics_company_get: '/logistics/company/get',
       api_logistics_company_update: '/logistics/company/update',

       //物流模版
       api_logistics_carriage_create: '/logistics/carriage/create',
       api_logistics_carriage_query: '/logistics/carriage/query',
       api_logistics_carriage_remove: '/logistics/carriage/del',
       api_logistics_carriage_get: '/logistics/carriage/get',
       api_logistics_carriage_update: '/logistics/carriage/update',


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
       * 会员模块接口
       */

      //会员信息
      api_member_memberInfo_query: '/member/memberInfo/query',
      api_member_memberInfo_get: '/member/memberInfo/get',
      api_member_memberInfo_create: '/member/memberInfo/create',
      api_member_memberInfo_update: '/member/memberInfo/update',
      api_member_memberInfo_remove: '/member/memberInfo/remove',
      api_member_memberInfo_editPassword: '/member/memberInfo/editPassword',

      //会员收获地址
      api_member_memberAddress_query: '/member/memberAddress/query',
      api_member_memberAddress_get: '/member/memberAddress/get',
      api_member_memberAddress_create: '/member/memberAddress/create',
      api_member_memberAddress_update: '/member/memberAddress/update',
      api_member_memberAddress_remove: '/member/memberAddress/remove',

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


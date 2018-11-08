import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/wangyang/github/Web/motion/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout/Index'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard/analysis",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": dynamic({ loader: () => import('../Dashboard/Analysis'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "name": "monitor",
            "component": dynamic({ loader: () => import('../Dashboard/Monitor'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/form",
        "icon": "form",
        "name": "form",
        "routes": [
          {
            "path": "/form/basic-form",
            "name": "basicform",
            "component": dynamic({ loader: () => import('../Forms/BasicForm'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/form/step-form",
            "name": "stepform",
            "component": dynamic({ loader: () => import('../Forms/StepForm'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/form/step-form",
                "name": "stepform",
                "redirect": "/form/step-form/info",
                "exact": true
              },
              {
                "path": "/form/step-form/info",
                "name": "info",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step1'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/form/step-form/confirm",
                "name": "confirm",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step2'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/form/step-form/result",
                "name": "result",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step3'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/form/advanced-form",
            "name": "advancedform",
            "authority": [
              "admin"
            ],
            "component": dynamic({ loader: () => import('../Forms/AdvancedForm'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
          {
            "path": "/list/table-list",
            "name": "searchtable",
            "component": dynamic({ loader: () => import('../List/TableList'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/basic-list",
            "name": "basiclist",
            "component": dynamic({ loader: () => import('../List/BasicList'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/card-list",
            "name": "cardlist",
            "component": dynamic({ loader: () => import('../List/CardList'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/search",
            "name": "searchlist",
            "component": dynamic({ loader: () => import('../List/List'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/list/search",
                "redirect": "/list/search/articles",
                "exact": true
              },
              {
                "path": "/list/search/articles",
                "name": "articles",
                "component": dynamic({ loader: () => import('../List/Articles'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/list/search/projects",
                "name": "projects",
                "component": dynamic({ loader: () => import('../List/Projects'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/list/search/applications",
                "name": "applications",
                "component": dynamic({ loader: () => import('../List/Applications'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [
          {
            "path": "/profile/basic",
            "name": "basic",
            "component": dynamic({ loader: () => import('../Profile/BasicProfile'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/profile/advanced",
            "name": "advanced",
            "authority": [
              "admin"
            ],
            "component": dynamic({ loader: () => import('../Profile/AdvancedProfile'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes": [
          {
            "path": "/result/success",
            "name": "success",
            "component": dynamic({ loader: () => import('../Result/Success'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/result/fail",
            "name": "fail",
            "component": dynamic({ loader: () => import('../Result/Error'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": dynamic({ loader: () => import('../Exception/403'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": dynamic({ loader: () => import('../Exception/404'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": dynamic({ loader: () => import('../Exception/500'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": dynamic({ loader: () => import('../Exception/TriggerException'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/center",
            "name": "center",
            "component": dynamic({ loader: () => import('../Account/Center/Center'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/account/center",
                "redirect": "/account/center/articles",
                "exact": true
              },
              {
                "path": "/account/center/articles",
                "component": dynamic({ loader: () => import('../Account/Center/Articles'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": dynamic({ loader: () => import('../Account/Center/Applications'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": dynamic({ loader: () => import('../Account/Center/Projects'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/settings",
            "name": "settings",
            "component": dynamic({ loader: () => import('../Account/Settings/Info'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/account/settings",
                "redirect": "/account/settings/base",
                "exact": true
              },
              {
                "path": "/account/settings/base",
                "component": dynamic({ loader: () => import('../Account/Settings/BaseView'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/security",
                "component": dynamic({ loader: () => import('../Account/Settings/SecurityView'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/binding",
                "component": dynamic({ loader: () => import('../Account/Settings/BindingView'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/notification",
                "component": dynamic({ loader: () => import('../Account/Settings/NotificationView'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "component",
        "icon": "deployment-unit",
        "path": "/component",
        "routes": [
          {
            "path": "/component/braftEditor",
            "name": "braftEditor",
            "component": dynamic({ loader: () => import('../Component/BraftEditor'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/component/sketchPicker",
            "name": "sketchPicker",
            "component": dynamic({ loader: () => import('../Component/SketchPicker'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/component/qrcode",
            "name": "qrcode",
            "component": dynamic({ loader: () => import('../Component/Qrcode'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/component/motion",
            "name": "motion",
            "component": dynamic({ loader: () => import('../Component/Motion/Index.js'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/component/motion2",
            "name": "motion",
            "component": dynamic({ loader: () => import('../Component/Motion2/Index.js'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "order",
        "icon": "ordered-list",
        "path": "/order",
        "routes": [
          {
            "path": "/order/orderManager",
            "name": "orderManager",
            "component": dynamic({ loader: () => import('../Order'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/order/orderManager",
                "name": "orderManager",
                "redirect": "/order/orderManager/list",
                "exact": true
              },
              {
                "path": "/order/orderManager/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../Order/Main'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/order/orderManager/create",
                "name": "create",
                "component": dynamic({ loader: () => import('../Order/Create'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "wares",
        "icon": "shopping",
        "path": "/wares",
        "routes": [
          {
            "path": "/wares/goods",
            "name": "goods",
            "component": dynamic({ loader: () => import('../Wares/Goods'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/wares/goods",
                "name": "goods",
                "redirect": "/wares/goods/list",
                "exact": true
              },
              {
                "path": "/wares/goods/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../Wares/Goods/Main'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/wares/goods/create",
                "name": "create",
                "component": dynamic({ loader: () => import('../Wares/Goods/Create'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/wares/goods/edit/:id",
                "name": "edit",
                "component": dynamic({ loader: () => import('../Wares/Goods/Edit'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "waresConfig",
        "icon": "deployment-unit",
        "path": "/waresConfig",
        "routes": [
          {
            "path": "/waresConfig/spec",
            "name": "spec",
            "component": dynamic({ loader: () => import('../WaresConfig/Spec'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/waresConfig/spec",
                "name": "spec",
                "redirect": "/waresConfig/spec/list",
                "exact": true
              },
              {
                "path": "/waresConfig/spec/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../WaresConfig/Spec/Main'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/waresConfig/spec/edit/:id",
                "name": "edit",
                "component": dynamic({ loader: () => import('../WaresConfig/Spec/Edit'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/waresConfig/category",
            "name": "category",
            "component": dynamic({ loader: () => import('../WaresConfig/Category'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/waresConfig/brand",
            "name": "brand",
            "component": dynamic({ loader: () => import('../WaresConfig/Brand'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/waresConfig/tags",
            "name": "tags",
            "component": dynamic({ loader: () => import('../WaresConfig/Tags'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "logistics",
        "icon": "car",
        "path": "/logistics",
        "routes": [
          {
            "path": "/logistics/company",
            "name": "company",
            "component": dynamic({ loader: () => import('../Logistics/Company'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/logistics/carriage",
            "name": "carriage",
            "component": dynamic({ loader: () => import('../Logistics/Carriage'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "news",
        "icon": "book",
        "path": "/news",
        "routes": [
          {
            "path": "/news/category",
            "name": "category",
            "component": dynamic({ loader: () => import('../News/Category'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/news/article",
            "name": "article",
            "component": dynamic({ loader: () => import('../News/Article'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/news/article",
                "name": "article",
                "redirect": "/news/article/list",
                "exact": true
              },
              {
                "path": "/news/article/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../News/Article/Main'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/news/article/edit/:id",
                "name": "edit",
                "component": dynamic({ loader: () => import('../News/Article/Edit'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "member",
        "icon": "user",
        "path": "/member",
        "routes": [
          {
            "path": "/member/memberInfo",
            "name": "memberInfo",
            "component": dynamic({ loader: () => import('../Member/MemberInfo'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/member/memberInfo",
                "name": "memberInfo",
                "redirect": "/member/memberInfo/list",
                "exact": true
              },
              {
                "path": "/member/memberInfo/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../Member/MemberInfo/Main'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/member/memberInfo/edit/:id",
                "name": "edit",
                "component": dynamic({ loader: () => import('../Member/MemberInfo/Edit/Index'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "system",
        "icon": "safety",
        "path": "/system",
        "routes": [
          {
            "path": "/system/adminUser",
            "name": "adminUser",
            "component": dynamic({ loader: () => import('../SystemConfig/AdminUser'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/system/adminUser",
                "name": "adminUser",
                "redirect": "/system/adminUser/adminUserList",
                "exact": true
              },
              {
                "path": "/system/adminUser/adminUserList",
                "name": "adminUserList",
                "component": dynamic({ loader: () => import('../SystemConfig/AdminUser/AdminUserList'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/system/adminUser/adminUserEdit/:id",
                "name": "adminUserEdit",
                "component": dynamic({ loader: () => import('../SystemConfig/AdminUser/Edit'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/system/role",
            "name": "role",
            "component": dynamic({ loader: () => import('../SystemConfig/Role'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/system/role",
                "name": "role",
                "redirect": "/system/role/roleList",
                "exact": true
              },
              {
                "path": "/system/role/roleList",
                "name": "roleList",
                "component": dynamic({ loader: () => import('../SystemConfig/Role/RoleList'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/system/role/relationPermission/:id",
                "name": "relationPermission",
                "component": dynamic({ loader: () => import('../SystemConfig/Role/RelationPermission'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/system/permission",
            "name": "permission",
            "component": dynamic({ loader: () => import('../SystemConfig/Permission'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/Users/wangyang/github/Web/motion/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/wangyang/github/Web/motion/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}

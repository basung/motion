import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('/Users/wangyang/github/Web/motion/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/wangyang/github/Web/motion/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/wangyang/github/Web/motion/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('/Users/wangyang/github/Web/motion/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/wangyang/github/Web/motion/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/wangyang/github/Web/motion/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('/Users/wangyang/github/Web/motion/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('/Users/wangyang/github/Web/motion/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('/Users/wangyang/github/Web/motion/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('/Users/wangyang/github/Web/motion/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'form', ...(require('/Users/wangyang/github/Web/motion/src/pages/Forms/models/form.js').default) });
app.model({ namespace: 'rule', ...(require('/Users/wangyang/github/Web/motion/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'profile', ...(require('/Users/wangyang/github/Web/motion/src/pages/Profile/models/profile.js').default) });
app.model({ namespace: 'error', ...(require('/Users/wangyang/github/Web/motion/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('/Users/wangyang/github/Web/motion/src/pages/Account/Settings/models/geographic.js').default) });
app.model({ namespace: 'goods', ...(require('/Users/wangyang/github/Web/motion/src/pages/Wares/Goods/models/goods.js').default) });
app.model({ namespace: 'spec', ...(require('/Users/wangyang/github/Web/motion/src/pages/WaresConfig/Spec/models/spec.js').default) });
app.model({ namespace: 'category', ...(require('/Users/wangyang/github/Web/motion/src/pages/WaresConfig/Category/models/category.js').default) });
app.model({ namespace: 'brand', ...(require('/Users/wangyang/github/Web/motion/src/pages/WaresConfig/Brand/models/brand.js').default) });
app.model({ namespace: 'tags', ...(require('/Users/wangyang/github/Web/motion/src/pages/WaresConfig/Tags/models/tags.js').default) });
app.model({ namespace: 'newsCategory', ...(require('/Users/wangyang/github/Web/motion/src/pages/News/Category/models/newsCategory.js').default) });
app.model({ namespace: 'article', ...(require('/Users/wangyang/github/Web/motion/src/pages/News/Article/models/article.js').default) });
app.model({ namespace: 'adminUser', ...(require('/Users/wangyang/github/Web/motion/src/pages/SystemConfig/AdminUser/models/adminUser.js').default) });
app.model({ namespace: 'role', ...(require('/Users/wangyang/github/Web/motion/src/pages/SystemConfig/Role/models/role.js').default) });
app.model({ namespace: 'permission', ...(require('/Users/wangyang/github/Web/motion/src/pages/SystemConfig/Permission/models/permission.js').default) });

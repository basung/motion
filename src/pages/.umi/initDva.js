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

app.model({ namespace: 'global', ...(require('/Users/wangyang/github/web/motion/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/wangyang/github/web/motion/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/wangyang/github/web/motion/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('/Users/wangyang/github/web/motion/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/wangyang/github/web/motion/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/wangyang/github/web/motion/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('/Users/wangyang/github/web/motion/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('/Users/wangyang/github/web/motion/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('/Users/wangyang/github/web/motion/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('/Users/wangyang/github/web/motion/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'form', ...(require('/Users/wangyang/github/web/motion/src/pages/Forms/models/form.js').default) });
app.model({ namespace: 'rule', ...(require('/Users/wangyang/github/web/motion/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'profile', ...(require('/Users/wangyang/github/web/motion/src/pages/Profile/models/profile.js').default) });
app.model({ namespace: 'error', ...(require('/Users/wangyang/github/web/motion/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('/Users/wangyang/github/web/motion/src/pages/Account/Settings/models/geographic.js').default) });
app.model({ namespace: 'adminUser', ...(require('/Users/wangyang/github/web/motion/src/pages/SystemConfig/AdminUser/models/adminUser.js').default) });
app.model({ namespace: 'role', ...(require('/Users/wangyang/github/web/motion/src/pages/SystemConfig/Role/models/role.js').default) });
app.model({ namespace: 'permission', ...(require('/Users/wangyang/github/web/motion/src/pages/SystemConfig/Permission/models/permission.js').default) });

import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import zhCN from "./locale/zhCN";
import enUS from "./locale/enUS";
import queryString from "query-string"; // 解析URL的库
import "./style/override/ant-table.less";
import {
  Button,
  Layout,
  Menu,
  Icon,
  Drawer,
  Radio,
  Form,
  Input,
  Tabs,
  Table,
  DatePicker,
  Switch,
  Select,
  LocaleProvider,
  Dropdown
} from "ant-design-vue";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Form);
Vue.use(Input);
Vue.component("Authorized", Authorized); // 权限组件
Vue.use(Auth); // 权限指令
Vue.use(Tabs);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: {
      message: zhCN
    },
    enUS: {
      message: enUS
    }
  }
});
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
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
  Switch
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

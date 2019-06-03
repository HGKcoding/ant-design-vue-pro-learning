<template>
  <div class="point-strategy">
    <div class="card-container">
      <a-tabs type="card">
        <a-tab-pane key="1">
          <span slot="tab">
            <ant-icon
              type="icon-jichupeizhi"
              :style="{ fontSize: '20px' }"
            ></ant-icon
            >基础配置
          </span>
          <a-table
            :columns="columns1"
            :dataSource="dataSource1"
            :pagination="false"
          >
            <span slot="period" slot-scope="period, record">
              <a-range-picker
                v-show="period"
                :defaultValue="period"
                @change="
                  (dates, dateStrings) =>
                    onDateChange(dates, dateStrings, record.key)
                "
              />
            </span>
            <span slot="params" slot-scope="params, record">
              <a-input
                v-if="params && !record.editable"
                :defaultValue="params"
                @change="e => onInputChange(e.target.value, record.key)"
              ></a-input>
              <span v-else @click="onEdit">
                {{ params }}
                <ant-icon
                  v-if="params"
                  type="icon-edit"
                  :style="{ fontSize: '16px' }"
                ></ant-icon>
              </span>
            </span>
            <span slot="ischecked" slot-scope="ischecked, record">
              <a-switch
                :defaultChecked="ischecked"
                @change="checked => onSwitchChange(checked, record.key)"
              />
            </span>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <ant-icon
              type="icon-jianglijifen"
              :style="{ fontSize: '20px' }"
            ></ant-icon
            >积分奖励
          </span>
          <a-table></a-table>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <ant-icon
              type="icon-koujianjifen"
              :style="{ fontSize: '20px' }"
            ></ant-icon
            >积分扣减
          </span>
          <a-table></a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
const now = new Date();
const OneYearLater = `${now.getFullYear() + 1}/${now.getMonth() +
  1}/${now.getDate()}`;
import AntIcon from "@/components/icon/icon";
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      editable: false,
      columns1: [
        {
          dataIndex: "config",
          key: "config",
          title: "配置项"
        },
        {
          dataIndex: "period",
          key: "period",
          title: "周期",
          slots: { title: "period" },
          scopedSlots: { customRender: "period" }
        },
        {
          dataIndex: "params",
          key: "params",
          title: "设置参数",
          slots: { title: "params" },
          scopedSlots: { customRender: "params" }
        },
        {
          dataIndex: "switch",
          key: "switch",
          title: "开关",
          slots: { title: "ischecked" },
          scopedSlots: { customRender: "ischecked" }
        }
      ],
      dataSource1: [
        {
          key: 0,
          config: "积分有效期",
          period: [
            moment(now, "YYYY/MM/DD"),
            moment(OneYearLater, "YYYY/MM/DD")
          ],
          params: "",
          switch: true
        },
        {
          key: 1,
          config: "个人积分封顶",
          period: null,
          params: "3000",
          switch: false
        }
      ]
    };
  },
  components: {
    AntIcon
  },
  methods: {
    onDateChange(dates, dateStrings, key) {
      console.log(dateStrings);
      this.changeDataSource(dates, key, "period");
    },
    onSwitchChange(checked, key) {
      this.changeDataSource(checked, key, "switch");
    },
    onInputChange(value, key) {
      this.changeDataSource(value, key, "params");
    },
    changeDataSource(value, key, col) {
      console.log(value, key);
      const newDataSource1 = [...this.dataSource1];
      // 找到是具体数值变换的元素
      const target = newDataSource1.filter(item => item.key === key)[0];
      if (target) {
        target[col] = value;
        this.dataSource1 = newDataSource1;
      }
    },
    onEdit() {}
  }
};
</script>

<style scoped lang="less">
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>

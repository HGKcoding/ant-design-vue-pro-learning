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
            :rowClassName="
              (record, index) => {
                return addRowClass(record, index);
              }
            "
          >
            <span slot="period" slot-scope="period, record">
              <a-range-picker
                v-show="period"
                :defaultValue="period"
                :disabled="record.disabled"
                @change="
                  (dates, dateStrings) =>
                    onDateChange(dates, dateStrings, record.key)
                "
              />
            </span>
            <span slot="params" slot-scope="params, record">
              <a-input
                v-if="params && record.editable"
                :disabled="record.disabled"
                :defaultValue="params"
                @change="e => onInputChange(e.target.value, record.key)"
                @pressEnter="e => onInputEnter(e.target.value, record.key)"
                @blur="e => onInputBlur(e.target.value, record.key)"
              ></a-input>
              <span v-else @click="e => onEdit(e.target.value, record)">
                {{ params }}{{ record.times ? "倍" : "" }}
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
      columns1: [
        {
          dataIndex: "config",
          key: "config",
          title: "配置项",
          width: "20%"
        },
        {
          dataIndex: "period",
          key: "period",
          title: "周期",
          slots: { title: "period" },
          scopedSlots: { customRender: "period" },
          width: "45%"
        },
        {
          dataIndex: "params",
          key: "params",
          title: "设置参数",
          slots: { title: "params" },
          scopedSlots: { customRender: "params" },
          width: "20%"
        },
        {
          dataIndex: "switch",
          key: "switch",
          title: "开关",
          slots: { title: "ischecked" },
          scopedSlots: { customRender: "ischecked" },
          width: "15%"
        }
      ],
      dataSource1: [
        // switch和disabled必须是相反的; disabled和background相同
        // times控制是否有倍数
        {
          key: 0,
          config: "积分有效期",
          period: [
            moment(now, "YYYY/MM/DD"),
            moment(OneYearLater, "YYYY/MM/DD")
          ],
          params: "",
          times: false,
          switch: true,
          disabled: false,
          editable: false
        },
        {
          key: 1,
          config: "个人积分封顶",
          period: null,
          params: "3000",
          times: false,
          switch: false,
          disabled: true,
          editable: false
        },
        {
          key: 2,
          config: "工作日晚间学习奖励（20点后）",
          period: null,
          params: "2",
          times: true,
          switch: true,
          disabled: false,
          editable: false
        },
        {
          key: 3,
          config: "周末学习奖励",
          period: null,
          params: "2",
          times: true,
          switch: false,
          disabled: true,
          editable: false
        },
        {
          key: 4,
          config: "法定假日学习奖励",
          period: null,
          params: "2",
          times: true,
          switch: false,
          disabled: true,
          editable: false
        },
        {
          key: 5,
          config: "等级提升奖励",
          period: null,
          params: "10",
          times: false,
          switch: false,
          disabled: true,
          editable: false
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
      if (value <= 0) return;
      this.changeDataSource(value, key, "params");
    },
    onInputEnter(value, key) {
      if (value <= 0) return;
      const newDataSource1 = [...this.dataSource1];
      const target = newDataSource1.filter(item => item.key === key)[0];
      if (target) {
        target.params = value;
        target.editable = false;
        this.dataSource1 = newDataSource1;
      }
    },
    onInputBlur(value, key) {
      console.log("blur:", value, key);
      const newDataSource1 = [...this.dataSource1];
      const target = newDataSource1.filter(item => item.key === key)[0];
      if (target) {
        target.editable = false;
        this.dataSource1 = newDataSource1;
      }
    },
    changeDataSource(value, key, col) {
      console.log(value, key);
      const newDataSource1 = [...this.dataSource1];
      // 找到是具体数值变换的元素
      const target = newDataSource1.filter(item => item.key === key)[0];
      if (target) {
        col === "switch" &&
          (target.disabled = !value) &&
          (target.background = !value);
        target[col] = value;
        this.dataSource1 = newDataSource1;
      }
    },
    onEdit(value, record) {
      if (!record.switch) return;
      const newDataSource1 = [...this.dataSource1];
      const target = newDataSource1.filter(item => item.key === record.key)[0];
      if (target) {
        target.editable = true;
        this.dataSource1 = newDataSource1;
      }
    },
    addRowClass(record, index) {
      console.log(record, index);
      if (!record.switch) {
        return "row-bg-gray";
      }
    }
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

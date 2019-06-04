<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">Horizontal</a-radio-button>
          <a-radio-button value="vertical">Vertical</a-radio-button>
          <a-radio-button value="inline">Inline</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="UserName"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'username',
            {
              initialValue: username,
              rules: [{ required: true, min: 3, message: '必须大于2个字符' }]
            }
          ]"
          placeholder="Please input your username"
        />
      </a-form-item>
      <a-form-item
        label="NickName"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'nickname',
            {
              initialValue: nickname,
              rules: [
                { required: checkNick, message: 'Please input your nickname' }
              ]
            }
          ]"
          placeholder="Please input your nickname"
        />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "BasicForm",
  data() {
    return {
      formLayout: "horizontal",
      checkNick: false,
      username: "Tom",
      nickname: "",
      form: this.$form.createForm(this)
    };
  },
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({ nickname: "Jerry" });
    }, 3000);
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validateFields((err, value) => {
        if (!err) {
          console.log(value);
          Object.assign(this, value);
        }
      });
    }
  }
};
</script>

<style scoped lang=""></style>

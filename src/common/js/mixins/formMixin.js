import axios from "../base/axios";
import { search } from "../base/search";
import Api from "../base/api";
import { getWXConfig } from "../base/getWxConfig";
export default {
  data() {
    return {
      code: "",
      phone: "",
      getCodeDisable: false,
      timer: null,
      count: "",
      codeText: "获取验证码",
      searchData: {},
      // 是否显示提交成功
      showSuccess: false,
      // 提示框信息
      msg: {
        show: false,
        text: "",
        timer: null
      },
      canSubmit: true,
      // 展示整个vue应用
      showLabel: true,
      // 落地页发布
      showMain: false,
      // 落地页失效
      showFail: false
    }
  },

  beforeDestroy() {
    clearInterval(this.timer)
    this.msg.timer && clearTimeout(this.msg.timer)
  },

  methods: {
    inputPhone() {
      if (this.phone.length > 11) {
        this.phone = this.phone.substring(0, 11);
      }
    },
    checkPhone() {
      if (!/^[1]\d{10}$/.test(this.phone)) {
        this.phone = "";
        return false;
      } else return true;
    },
    getCode() {
      const Time_count = 60;
      if (!this.checkPhone()) {
        this.showMsg("请输入正确的手机号")
        return;
      }
      if (!this.timer) {
        axios
          .post(Api.user.getCode, {
            Mobile: this.phone
          })
          .then(res => {
            if (res.status === 200 || res.status === 201) {
              this.count = Time_count;
              this.getCodeDisable = true;
              this.codeText = "重新发送";
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= Time_count) {
                  this.count--;
                } else {
                  this.getCodeDisable = false;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          });
      }
    },
    submit() {
      if (!this.checkPhone()) {
        this.showMsg("请输入正确的手机号")
        return;
      }
      if (!this.code) {
        this.showMsg("请输入验证码")
        return;
      }
      if (this.canSubmit) {
        this.canSubmit = false
        let data = {
          Mobile: this.phone,
          Code: this.code,
          SourceCode: "web",
          RegisteredSource: 7
        }
        let arr = ["campaignSource", "reference", "medium", "adGroup", "campaign"]
        arr.forEach(item => {
          if (this.searchData[item]) {
            data[item] = this.searchData[item]
          }
        });
        axios
          .post(Api.user.register, {
            ...data
          })
          .then(res => {
            this.canSubmit = true
            let { status, data } = res;
            if (status === 200 || status === 201) {
              if (data.data.Regist) {
                this.showSuccess = true
              } else {
                this.showMsg("您已经领取过了")
              }
            }
          }).catch(err => {
            this.canSubmit = true
            if (err && err.response && err.response.status) {
              this.showMsg(err.response.data.message)
            }
          });
      }
    },
    // 显示提示语
    showMsg(text) {
      if (this.msg.timer) {
        clearTimeout(this.msg.timer)
      }
      this.msg.show = true
      this.msg.text = text
      this.msgTimer()
    },
    // 提示语定时器
    msgTimer() {
      this.msg.timer = setTimeout(() => {
        this.msg.show = false
      }, 2000)
    }
  },
  created() {
    this.searchData = search()
    const { id } = this.searchData
    if (id) {
      axios.get(`${Api.user.available}${id}`).then(res => {
        if (res.status === 200 && res.data.data) {
          if (res.data.data.available) {
            this.showMain = true
          } else {
            this.showFail = true
          }
        }
      })
    }
    getWXConfig()
  }
}

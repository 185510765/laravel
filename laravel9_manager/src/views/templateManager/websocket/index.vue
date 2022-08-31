<template>
  <div class="webSocket-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-alert type="success" :closable="false">
          我的 webSocket连接 {{ status }}！
        </el-alert>
        <br />
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="地址">
            <el-input v-model="url" disabled></el-input>
          </el-form-item>
          <el-form-item label="消息" prop="message">
            <el-input v-model="form.message"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group style="margin-left: 10px">
              <el-button type="primary" disabled @click="submit()">
                发送消息
              </el-button>
              <el-button type="primary" @click="viewOre">
                查看当前仓库矿石数量
              </el-button>
              <!-- <el-button type="primary">发送消息2</el-button> -->
            </el-button-group>

            <el-button-group style="margin-left: 10px">
              <el-button type="primary" @click="sendUserIdInfo()">
                广播指定用户消息
              </el-button>
              <el-input
                v-model="user_id"
                style="width: 160px"
                placeholder="不填则广播所有用户"
              ></el-input>
            </el-button-group>
          </el-form-item>
          <el-form-item label="返回信息汇总">
            {{ data }}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as sysConfig from '@/api/sysConfig.js';

  export default {
    name: 'WebSocket',
    components: {},
    data() {
      return {
        url: 'ws://127.0.0.1:6161',
        // url: 'ws://60.205.164.223:6161',
        webSocket: null,
        data: [],
        status: '',
        form: { message: null },
        rules: {
          message: [{ required: true, message: '请输入消息', trigger: 'blur' }],
        },

        user_id: this.$store.state.user.user_id,
      };
    },
    created() {
      this.init();
    },
    destroyed() {
      this.webSocket.close();
    },
    mounted() {},
    methods: {
      //生成从minNum到maxNum的随机数
      randomNum(minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
          default:
            return 0;
            break;
        }
      },

      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.send(this.form.message);
          } else {
            return false;
          }
        });
      },
      init() {
        const wsuri = this.url;
        this.webSocket = new WebSocket(wsuri);
        this.webSocket.onmessage = this.onmessage;
        this.webSocket.onopen = this.onopen;
        this.webSocket.onerror = this.onerror;
        this.webSocket.onclose = this.onclose;
      },
      onopen() {
        this.status = '成功';

        this.bindUserId();
      },
      onerror() {
        this.status = '失败';

        this.init();
      },
      // 数据接收
      onmessage({ data }) {
        console.log(data);

        this.data.push(data);

        //截掉测试webSocket地址广告
        // this.data.push(data.substring(0, data.length - 66));
      },
      // 数据发送
      send(Data) {
        this.webSocket.send(Data);
      },
      onclose(e) {
        this.status = '断开';
      },

      // ****************************** function ************************************************

      // 绑定用户id
      bindUserId() {
        this.sendScoket('bindUserIdReq');
      },

      // 查看当前仓库矿石数量
      viewOre() {
        this.sendScoket('getOreListReq');
      },

      // 发送消息函数
      sendScoket(msg) {
        let user_id = this.$store.state.user.user_id;
        console.log(msg);
        console.log(user_id);

        let params = {
          msg: msg,
          data: {
            user_id: user_id,
          },
        };
        this.send(JSON.stringify(params));
      },

      async sendUserIdInfo() {
        const params = {
          user_id: this.user_id,
        };
        const { data } = await sysConfig.sendUserIdInfo(params);
        if (data) {
          // console.log(data);
        }
      },
    },
  };
</script>

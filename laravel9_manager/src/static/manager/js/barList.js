import * as barList from '@/api/barList.js';
import { isEmpty } from '@/utils/common.js';
// import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      index: {
        queryForm: {
          payway: '',
          is_print_game_log: '',
          is_plug_debug: '',
          plug_config_type: '',
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        total: 0,
        list: [],
        listLoading: false,

        dialog: {
          title: 0,
          visible: false,
        },

        form: {
          name: '',
          img: '',
          price: 0,
          is_limit: 0,
          stock: 0,
        },
        formRules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入标价', trigger: 'blur' },
            // { validator: rule.checkNum, trigger: 'blur' },
          ],
        },

        multipleSelection: [],
      },

      // 重启插件服务
      restartPlug: {
        queryForm: {
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        total: 0,
        list: [],
        listLoading: false,

        form: {
          serviceName: 'lwPlugService',
          operate: 'restart',
          barString: '',
        },
        formRules: {
          barString: [
            { required: true, message: '请输入网吧id', trigger: 'blur' },
          ],
        },

        dialog: {
          title: 0,
          visible: false,
        },

        serviceNameList: [
          { label: '插件服务', value: 'lwPlugService' },
          { label: '资源服务', value: 'lwResService' },
          { label: '数据库', value: 'lwMySqlService' },
        ],

        operateList: [
          { label: '重启', value: 'restart' },
          { label: '停止', value: 'stop' },
          { label: '开启', value: 'start' },
        ],
      },

      plugConfigTypeList: [
        { label: '全部', value: '' },
        { label: '按区域', value: 0 },
        { label: '按网吧', value: 1 },
        // { label: '按用户', value: 2 },
      ],

      table_plugConfigTypeList: [
        { label: '按区域', value: 0 },
        { label: '按网吧', value: 1 },
        // { label: '按用户', value: 2 },
      ],

      plugDebugList: [
        { label: '全部', value: '' },
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
      ],

      paywayList: [
        { label: '全部', value: '' },
        { label: '默认', value: 'normal' },
        { label: '收钱吧', value: 'sqb' },
      ],

      ganeLogList: [
        { label: '全部', value: '' },
        { label: '开启', value: 1 },
        { label: '关闭', value: 0 },
      ],

      plugConfigList: [],

      // 数据库密码dialog
      barSql: {
        queryForm: {
          id: 0,
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        total: 0,
        list: [],
        listLoading: false,

        dialog: {
          title: 0,
          visible: false,
        },
      },

      // 支付配置
      payTypeList: [
        { label: '小微商户', value: 0 },
        { label: '特约商户', value: 1 },
        { label: '普通商户', value: 2 },
      ],

      // 收款方式
      payWayList: [
        { label: '默认（微信支付宝）', value: 'normal' },
        { label: '收钱吧', value: 'sqb' },
      ],

      payConfig: {
        dialog: {
          visible: false,
        },

        form: {
          id: 0,
          pay_type: 1,
          app_id: '',
          mch_no: '',
          app_secret: '',
          wx_fee_rate: '',
          alipay_fee_rate: '',
          sqb_fee_rate: '',
          payway: '',
        },
        formRules: {
          app_id: [
            { required: true, message: '请输入应用Appid', trigger: 'blur' },
          ],
          mch_no: [
            { required: true, message: '请输入商户号', trigger: 'blur' },
          ],
          app_secret: [
            { required: true, message: '请输入私钥', trigger: 'blur' },
          ],
          wx_fee_rate: [
            { required: true, message: '请输入微信费率', trigger: 'blur' },
          ],
          alipay_fee_rate: [
            { required: true, message: '请输入支付宝费率', trigger: 'blur' },
          ],
          sqb_fee_rate: [
            { required: true, message: '请输入收钱吧费率', trigger: 'blur' },
          ],
        },
      },

      // 设备管理
      device: {
        queryForm: {},

        dialog: {
          title: 0,
          visible: false,
        },

        table: {
          total: 0,
          list: [],
          loading: false,
        },

        form: {
          house: {},
          // item: {},
          client_device_id: '',
        },
        formRules: {},
      },

      deviceList: [],
      clientArray: [],

      // 单机调试
      debug: {
        dialog: {
          visible: false,
        },

        form: {
          is_plug_debug: 0,
          plug_debug_ip_addr: '',
        },
        formRules: {},
      },
    };
  },
  mounted() {
    this.getPlugBarList();
    this.getBarList();
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#FAFAFA;';
    },

    // 表格样式设置
    rowClass() {},

    // table 一行样式
    tableRowStyle({ row, rowIndex }) {
      const styleObj = {};
      if (row.is_shelf == 0) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取网吧列表
    async getBarList() {
      this.index.listLoading = true;
      const { data } = await barList.getBarList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getBarList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getBarList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getBarList();
    },

    // 重启插件服务 dialog
    showRestartPlugDialog() {
      this.restartPlug.dialog.visible = true;
    },

    // 重启插件服务btn
    restartPlugBtn() {
      this.$refs['restartPlug.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await barList.restartPlug(this.restartPlug.form);
          if (data) {
            this.restartPlug.dialog.visible = false;
            this.$baseMessage('重启插件服务成功', 'success');
            // this.getBarList();
          }
        } else {
          return false;
        }
      });
    },

    // 关闭dialog
    closeRestartPlugDialog() {
      this.$refs['restartPlug.form'].clearValidate('barString');
    },

    // 表格checkbox选中
    index_handleSelectionChange(val) {
      this.index.multipleSelection = val;
    },

    // 打印游戏日志
    async switchPrintGameLog(id, is_print_game_log) {
      const params = {
        id: id,
        is_print_game_log: is_print_game_log,
      };
      const { data } = await barList.switchPrintGameLog(params);
      if (data) {
        this.$baseMessage('打印游戏日志切换成功！', 'success');
      }
    },

    // 调试模式
    async switchPlugDebug(row) {
      const params = {
        id: row.id,
        is_plug_debug: row.is_plug_debug,
      };
      const { data } = await barList.switchToggle(params);
      if (data) {
        this.$baseMessage('调试模式切换成功！', 'success');
      }
    },

    // 获取插件启用配置
    async getPlugBarList() {
      const { data } = await barList.getPlugBarList();
      if (data) {
        this.plugConfigList = data.plugConfigList;
      }
    },

    // table表格 插件启用类型切换
    async plugConfigTypeChange(row) {
      const params = {
        id: row.id,
        plug_config_type: row.plug_config_type,
      };
      const { data } = await barList.plugConfigTypeChange(params);
      if (data) {
        // 如果插件启用类型是 按网吧 选中默认配置
        if (row.plug_config_type == 1 && row.plug_bar_id == 0) {
          // console.log(this.plugConfigList[1][0]);

          row.plug_bar_id = this.plugConfigList[1][0]['id'];
        }

        this.$baseMessage('插件启用类型切换成功!', 'success');
        // this.getBarList();
      }
    },

    // select 插件启用配置切换
    async plugBarIdChange(row) {
      const params = {
        id: row.id,
        plug_bar_id: row.plug_bar_id,
      };
      const { data } = await barList.plugBarIdChange(params);
      if (data) {
        this.$baseMessage('插件启用配置切换成功!', 'success');
        // this.getBarList();
      }
    },

    // 查看数据库密码dialog
    showSqlPwdDialog(id) {
      this.barSql.dialog.visible = true;

      this.barSql.queryForm.id = id;

      this.getBarSqlPwd();
    },

    // 获取网吧软件数据库密码
    async getBarSqlPwd() {
      const { data } = await barList.getBarSqlPwd(this.barSql.queryForm);
      if (data) {
        this.barSql.list = data.list;
        this.barSql.total = data.total;
      }
    },

    // 页码切换
    barSql_currentChange(val) {
      this.barSql.queryForm.currentPage = val;
      this.getBarSqlPwd();
    },

    // 每页数量改变
    barSql_sizeChange(val) {
      this.barSql.queryForm.pageSize = val;
      this.getBarSqlPwd();
    },

    // 支付配置dialog
    showPayConfigDialog(row) {
      this.payConfig.form = Object.assign({}, row);
      this.payConfig.form.payway = !isEmpty(this.payConfig.form.payway)
        ? this.payConfig.form.payway
        : 'normal';

      this.payConfig.dialog.visible = true;
    },

    // 支付配置保存
    EditPayConfig() {
      this.$refs['payConfig.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await barList.EditPayConfig(this.payConfig.form);
          if (data) {
            this.payConfig.dialog.visible = false;
            this.$baseMessage('支付配置保存成功！', 'success');
            this.getBarList();
          }
        } else {
          return false;
        }
      });
    },

    // 单机调试dialog
    showDebugModeDialogBtn(row) {
      this.debug.form = Object.assign({}, row);

      this.debug.dialog.visible = true;
    },

    // 保存单机调试配置
    async editDebugBtn() {
      const { data } = await barList.editDebug(this.debug.form);
      if (data) {
        this.debug.dialog.visible = false;
        this.$baseMessage('单机调试配置保存成功！', 'success');
        this.getBarList();
      }
    },

    // 设备管理dialog
    async showDeviceDialog() {
      this.device.form = this.$options.data().device.form;

      await this.getBarHouseList(this.payConfig.form.id);

      this.device.dialog.visible = true;
    },

    // 获取网吧吧台列表
    async getBarHouseList(id) {
      const params = {
        id: id,
      };
      const { data } = await barList.getBarHouseList(params);
      if (data) {
        this.device.form.house = data.list;

        // this.deviceList = data.list;

        // this.deviceList.forEach((element) => {
        //   this.device.form.house[element.house_id.toString()] =
        //     element.device_id;
        // });

        // console.log(this.device.form);

        this.clientArray = data.clientArray;
        if (!isEmpty(data.clientArray)) {
          this.device.form.client_device_id = data.clientArray.device_id;
        } else {
          this.device.form.client_device_id = '';
        }
      }
    },

    // 保存设备
    async barDeviceSave() {
      this.device.form.bar_id = this.payConfig.form.id;

      const { data } = await barList.barDeviceSave(this.device.form);
      if (data) {
        this.$baseMessage('保存成功，同步成功', 'success');
        this.device.dialog.visible = false;
      }
    },
  },
};

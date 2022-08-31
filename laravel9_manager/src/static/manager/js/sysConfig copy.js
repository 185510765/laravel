import * as sysConfig from '@/api/sysConfig.js';
import * as rule from '@/utils/rule.js';
import { isNumber, isEmpty, isNum } from '@/utils/validate.js';

export default {
  data() {
    return {
      // 矿工设置
      miner: {
        btnLoading: false,

        form: {
          each_miner_integral: 2000, // 招募矿工
          miner_surrender_need_integral: 1000, // 劝降矿工
        },
        formRules: {
          each_miner_integral: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          miner_surrender_need_integral: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },
      },

      // 看门狗设置
      dog: {
        btnLoading: false,

        form: {
          buy_dog_integral: 10000, // 买看门狗
          dog_first_times_rate: 30, // 看门狗第一次抓人几率
          dog_many_times_rate: 80, // 看门狗第二次抓人几率
        },
        formRules: {
          buy_dog_integral: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          dog_first_times_rate: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          dog_many_times_rate: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },
      },

      // 花样币
      huayangbi: {
        btnLoading: false,

        form: {
          every_day_flowers_coin_num: 5, // 每天挖取花样币限额 最多能挖多少个
          orange_miner_dig_rate: 5, // 橙色矿工偷到花样币概率
        },
        formRules: {
          every_day_flowers_coin_num: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          orange_miner_dig_rate: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },
      },

      // 摸金设置
      touchGold: {
        btnLoading: false,

        form: {
          search_user_integral: 100, // 消耗多少花币可以搜索矿场
          search_display_user_count: 1, // 一次搜索显示多少个用户
          search_max_day_times: 10, // 每天最多搜索多少次
          miner_expire_time: 8, // 抓住矿工未操作时间
          ransom_integral_range: { min: 100, max: 500 }, // 抓住矿工x小时未做操作 ，则系统从x-y值中随机一数值 索要赎金
          miner_ransom_expire_time: 4, // 用户待提交赎金时间
        },
        formRules: {
          search_user_integral: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          search_display_user_count: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          search_max_day_times: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          miner_expire_time: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
          miner_ransom_expire_time: [
            { required: true, message: '请输入有效的值', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },
      },

      // 招募矿工概率
      miner_config: {
        btnLoading: false,

        list: [],
      },

      // 矿工属性范围
      miner_attribute: {
        btnLoading: false,

        list: [],
        transList: [],
      },

      attrMap: {
        0: '力量',
        1: '速度',
        2: '潜行',
        3: '幸运',
      },
    };
  },
  watch: {
    // 'acceptInfo.form.emailStatus'(val) {
    //   if (val == 0) {
    //     this.$refs['acceptInfo.form'].clearValidate('email');
    //     this.acceptInfo.formRules.email = [];
    //   } else {
    //     this.acceptInfo.formRules.email = [
    //       { required: true, message: '请输邮箱地址', trigger: 'blur' },
    //       { validator: rule.checkEmail, trigger: 'blur' },
    //     ];
    //   }
    // },
  },
  mounted() {
    this.getSysConfig();
  },
  methods: {
    // 获取配置数据
    async getSysConfig() {
      const { data } = await sysConfig.getSysConfig();
      if (data) {
        // 矿工设置
        this.miner.form = {
          each_miner_integral: data.each_miner_integral,
          miner_surrender_need_integral: data.miner_surrender_need_integral,
        };

        // 看门设置
        this.dog.form = {
          buy_dog_integral: data.buy_dog_integral,
          dog_first_times_rate: data.dog_first_times_rate,
          dog_many_times_rate: data.dog_many_times_rate,
        };

        // 花样币设置
        this.huayangbi.form = {
          every_day_flowers_coin_num: data.every_day_flowers_coin_num,
          orange_miner_dig_rate: data.orange_miner_dig_rate,
        };

        // 摸金设置
        this.touchGold.form = {
          search_user_integral: data.search_user_integral,
          search_display_user_count: data.search_display_user_count,
          search_max_day_times: data.search_max_day_times,
          miner_expire_time: data.miner_expire_time,
          ransom_integral_range: JSON.parse(data.ransom_integral_range),
          miner_ransom_expire_time: data.miner_ransom_expire_time,
        };

        // 矿工招募概率
        this.miner_config.list = JSON.parse(data.miner_config);

        // 矿工属性范围 转换数据结构
        this.miner_attribute.list = JSON.parse(data.miner_attribute);
        this.miner_attribute.list.forEach((element, index) => {
          let pushArray = {
            attr_name: this.attrMap[index],
            list: element,
          };
          this.miner_attribute.transList.push(pushArray);
        });

        // console.log(this.miner_attribute.transList);
      }
    },

    // 矿工设置保存
    async minerSave() {
      this.$refs['miner.form'].validate(async (valid) => {
        if (valid) {
          this.miner.btnLoading = true;
          const { data } = await sysConfig.minerSave(this.miner.form);
          this.miner.btnLoading = false;
          if (data) {
            this.$baseMessage('矿工设置保存成功', 'success');
            this.getSysConfig();
          }
        } else {
          return false;
        }
      });
    },

    // 看门狗设置保存
    async dogSave() {
      this.$refs['dog.form'].validate(async (valid) => {
        if (valid) {
          this.dog.btnLoading = true;
          const { data } = await sysConfig.dogSave(this.dog.form);
          this.dog.btnLoading = false;
          if (data) {
            this.$baseMessage('看门狗设置保存成功', 'success');
            this.getSysConfig();
          }
        } else {
          return false;
        }
      });
    },

    // 花样币设置保存
    async huayangbiSave() {
      this.$refs['huayangbi.form'].validate(async (valid) => {
        if (valid) {
          this.huayangbi.btnLoading = true;
          const { data } = await sysConfig.huayangbiSave(this.huayangbi.form);
          this.huayangbi.btnLoading = false;
          if (data) {
            this.$baseMessage('花样币设置保存成功', 'success');
            this.getSysConfig();
          }
        } else {
          return false;
        }
      });
    },

    // 摸金设置保存
    async touchGoldSave() {
      this.$refs['touchGold.form'].validate(async (valid) => {
        if (valid) {
          if (
            isEmpty(this.touchGold.form.ransom_integral_range.min) ||
            isEmpty(this.touchGold.form.ransom_integral_range.max)
          ) {
            this.$baseMessage('请输入赎金范围', 'error');
            return;
          }
          if (
            !isNumber(this.touchGold.form.ransom_integral_range.min) ||
            !isNumber(this.touchGold.form.ransom_integral_range.max)
          ) {
            this.$baseMessage('请输入正确的赎金范围', 'error');
            return;
          }

          this.touchGold.form.ransom_integral_range = JSON.stringify(
            this.touchGold.form.ransom_integral_range
          );

          this.touchGold.btnLoading = true;
          const { data } = await sysConfig.touchGoldSave(this.touchGold.form);
          this.touchGold.btnLoading = false;
          if (data) {
            this.$baseMessage('摸金设置保存成功', 'success');
            this.getSysConfig();
          }
        } else {
          return false;
        }
      });
    },

    // 招募矿工概率保存
    async minerConfigSave() {
      const { code, msg } = this.validateMinerConfig(this.miner_config.list);
      if (code == 500) {
        this.$baseMessage(msg, 'error');
        return;
      }

      this.miner_config.btnLoading = true;
      const { data } = await sysConfig.minerConfigSave(this.miner_config.list);
      this.miner_config.btnLoading = false;
      if (data) {
        this.$baseMessage('招募矿工概率保存成功', 'success');
        this.getSysConfig();
      }
    },

    // 验证数据 是否是数字
    validateMinerConfig(list) {
      let code = 200;
      let msg = '';

      list.forEach((element) => {
        if (
          isEmpty(element.rate) ||
          isEmpty(element.min) ||
          isEmpty(element.max)
        ) {
          code = 500;
          msg = '请输入值';
        }

        if (
          !isNumber(element.rate) ||
          !isNumber(element.min) ||
          !isNumber(element.max)
        ) {
          code = 500;
          msg = '只能输入数字';
        }
      });

      return {
        code: code,
        msg: msg,
      };
    },
  },
};

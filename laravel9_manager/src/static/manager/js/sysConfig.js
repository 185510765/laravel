import * as sysConfig from '@/api/sysConfig.js';
import * as rule from '@/utils/rule.js';
import { isNumber, isEmpty, isNum } from '@/utils/validate.js';
import { indexOf } from 'lodash';

export default {
  data() {
    return {
      // 矿工设置
      miner: {
        btnLoading: false,

        form: {
          each_miner_integral: 2000, // 招募矿工
          miner_integral_range: { min: 6000, max: 9999 }, // 矿工每天随机变化范围
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

      // 猎犬设置
      dog: {
        btnLoading: false,

        form: {
          buy_dog_integral: 10000, // 买猎犬
          dog_first_times_rate: 30, // 猎犬第一次抓人几率
          dog_many_times_rate: 80, // 猎犬第二次抓人几率
          dog_status_expire_time: { min: 6, max: 8 }, // 猎犬警觉状态保持时间 小时
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
          max_num_flowers_coin: 10000, // 花样币发行总数量
          has_been_dig_flowers_coin_num: 0, // 已挖取到的花样币数量
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
          max_num_flowers_coin: [
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
      },

      // 矿石定价范围、挖出概率
      ore: {
        btnLoading: false,

        list: [],
      },

      // 当前矿石卖价
      nowOrePrice: {
        btnLoading: false,

        list: [],
      },

      // 修改矿石卖价时间点
      oreSaleTime: {
        btnLoading: false,

        array: [],
      },

      // 花样币挖取概率
      huayangbiDigRate: {
        btnLoading: false,

        noDigRate: 0,

        list: [],
      },

      // 矿工回收价格设置
      miner_recycle_config: {
        btnLoading: false,

        list: [],
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
          miner_integral_range: JSON.parse(data.miner_integral_range),
          miner_surrender_need_integral: data.miner_surrender_need_integral,
        };

        // 猎犬设置
        this.dog.form = {
          buy_dog_integral: data.buy_dog_integral,
          dog_first_times_rate: data.dog_first_times_rate,
          dog_many_times_rate: data.dog_many_times_rate,
          dog_status_expire_time: JSON.parse(data.dog_status_expire_time),
        };

        // 花样币设置
        this.huayangbi.form = {
          every_day_flowers_coin_num: data.every_day_flowers_coin_num,
          orange_miner_dig_rate: data.orange_miner_dig_rate,
          max_num_flowers_coin: data.max_num_flowers_coin,
          has_been_dig_flowers_coin_num: data.has_been_dig_flowers_coin_num,
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

        // 矿工属性范围
        this.miner_attribute.list = JSON.parse(data.miner_attribute);

        // 矿石定价范围、挖出概率
        this.ore.list = JSON.parse(data.ore_config);

        // 当前矿石卖价
        this.nowOrePrice.list = JSON.parse(data.ore_now_price);

        // 修改矿石卖价时间点
        this.oreSaleTime.array = JSON.parse(data.ore_sale_time_config);

        // 花样币挖取概率
        this.huayangbiDigRate.list = JSON.parse(data.flowers_coin_config);
        this.huayangbiDigRate.list.forEach((element) => {
          if (element.level == 0) {
            this.huayangbiDigRate.noDigRate = element.rate;
          }
        });

        // 矿工回收价格设置
        this.miner_recycle_config.list = JSON.parse(data.miner_recycle_config);
      }
    },

    // 矿工设置保存
    async minerSave() {
      this.$refs['miner.form'].validate(async (valid) => {
        if (valid) {
          if (
            isEmpty(this.miner.form.miner_integral_range.min) ||
            isEmpty(this.miner.form.miner_integral_range.max)
          ) {
            this.$baseMessage('请输入赎金范围', 'error');
            return;
          }
          if (
            !isNumber(this.miner.form.miner_integral_range.min) ||
            !isNumber(this.miner.form.miner_integral_range.max)
          ) {
            this.$baseMessage('请输入正确的赎金范围', 'error');
            return;
          }

          this.miner.form.miner_integral_range = JSON.stringify(
            this.miner.form.miner_integral_range
          );

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

    // 猎犬设置保存
    async dogSave() {
      this.$refs['dog.form'].validate(async (valid) => {
        if (valid) {
          if (
            isEmpty(this.dog.form.dog_status_expire_time.min) ||
            isEmpty(this.dog.form.dog_status_expire_time.max)
          ) {
            this.$baseMessage('请输入赎金范围', 'error');
            return;
          }
          if (
            !isNumber(this.dog.form.dog_status_expire_time.min) ||
            !isNumber(this.dog.form.dog_status_expire_time.max)
          ) {
            this.$baseMessage('请输入正确的赎金范围', 'error');
            return;
          }

          this.dog.form.dog_status_expire_time = JSON.stringify(
            this.dog.form.dog_status_expire_time
          );

          this.dog.btnLoading = true;
          const { data } = await sysConfig.dogSave(this.dog.form);
          this.dog.btnLoading = false;
          if (data) {
            this.$baseMessage('猎犬设置保存成功', 'success');
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

    // 矿工属性范围保存
    async minerAttrSave() {
      const { code, msg } = this.validateMinerAttr(this.miner_attribute.list);
      if (code == 500) {
        this.$baseMessage(msg, 'error');
        return;
      }

      this.miner_attribute.btnLoading = true;
      const { data } = await sysConfig.minerAttrSave(this.miner_attribute.list);
      this.miner_attribute.btnLoading = false;
      if (data) {
        this.$baseMessage('招募矿工概率保存成功', 'success');
        this.getSysConfig();
      }
    },

    // 矿石定价范围、挖出概率保存
    async oreSave() {
      const { code, msg } = this.validateOre(this.ore.list);
      if (code == 500) {
        this.$baseMessage(msg, 'error');
        return;
      }

      this.ore.btnLoading = true;
      const { data } = await sysConfig.oreSave(this.ore.list);
      this.ore.btnLoading = false;
      if (data) {
        this.$baseMessage('矿石定价范围保存成功', 'success');
        this.getSysConfig();
      }
    },

    // 新增时间
    addTime() {
      this.oreSaleTime.array.push(
        new Date(new Date().setHours(0, 0, 0, 0)).getTime() // 当天0点
      );
    },

    // 删除时间
    delTime(index) {
      this.oreSaleTime.array.splice(index, 1);
    },

    // 修改矿石卖价时间点保存
    async oreSaleTimeSave() {
      this.oreSaleTime.btnLoading = true;
      const { data } = await sysConfig.oreSaleTimeSave(this.oreSaleTime.array);
      this.oreSaleTime.btnLoading = false;
      if (data) {
        this.$baseMessage('矿石卖价时间保存成功', 'success');
        this.getSysConfig();
      }
    },

    // 计算花样币没挖到的概率
    calcRateRes() {
      const totalRate = 1000000;

      let sumRate = 0;
      this.huayangbiDigRate.list.forEach((element) => {
        if (element.level != 0) {
          sumRate += parseFloat(element.rate);
        }
      });

      sumRate = (sumRate.toFixed(3) * 1000) / 1000;

      let res = totalRate - sumRate;
      this.huayangbiDigRate.noDigRate = res;
    },

    // 花样币挖取概率保存
    async huayangbiDigRateSave() {
      const { code, msg } = this.validateHuayangbi(this.huayangbiDigRate.list);
      if (code == 500) {
        this.$baseMessage(msg, 'error');
        return;
      }

      this.huayangbiDigRate.list.forEach((element) => {
        if (element.level == 0) {
          element.rate = this.huayangbiDigRate.noDigRate;
        }
      });

      this.huayangbiDigRate.btnLoading = true;
      const { data } = await sysConfig.huayangbiDigRateSave(
        this.huayangbiDigRate.list
      );
      this.huayangbiDigRate.btnLoading = false;
      if (data) {
        this.$baseMessage('花样币挖取概率保存成功', 'success');
        this.getSysConfig();
      }
    },

    // 矿工回收价格设置
    async minerRecycleSave() {
      const { code, msg } = this.validateMinerRecycleConfig(
        this.miner_recycle_config.list
      );
      if (code == 500) {
        this.$baseMessage(msg, 'error');
        return;
      }

      this.miner_recycle_config.btnLoading = true;
      const { data } = await sysConfig.minerRecycleSave(
        this.miner_recycle_config.list
      );
      this.miner_recycle_config.btnLoading = false;
      if (data) {
        this.$baseMessage('矿工回收价格设置保存成功', 'success');
        this.getSysConfig();
      }
    },

    // *************************************** function ************************************************

    // 验证花样币概率 可以输入小数
    validateHuayangbi(list) {
      let code = 200;
      let msg = '';

      list.forEach((element) => {
        if (isEmpty(element.rate)) {
          code = 500;
          msg = '请输入值';
        }

        // if (!isNumber(element.rate)) {
        //   code = 500;
        //   msg = '只能输入数字';
        // }
      });

      if (this.huayangbiDigRate.noDigRate < 0) {
        code = 500;
        msg = '未挖到概率不能小于0';
      }

      return {
        code: code,
        msg: msg,
      };
    },

    // 验证数据 是否是数字
    validateOre(list) {
      let code = 200;
      let msg = '';

      list.forEach((element) => {
        if (
          isEmpty(element.sale_price_min) ||
          isEmpty(element.sale_price_max) ||
          isEmpty(element.mining_rate)
        ) {
          code = 500;
          msg = '请输入值';
        }

        if (
          !isNumber(element.sale_price_min) ||
          !isNumber(element.sale_price_max) ||
          !isNumber(element.mining_rate)
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

    // 矿工价格范围设置验证
    validateMinerRecycleConfig(list) {
      let code = 200;
      let msg = '';

      list.forEach((element) => {
        if (isEmpty(element.min) || isEmpty(element.max)) {
          code = 500;
          msg = '请输入值';
        }

        if (!isNumber(element.min) || !isNumber(element.max)) {
          code = 500;
          msg = '只能输入数字';
        }
      });

      return {
        code: code,
        msg: msg,
      };
    },

    // 验证数据 是否是数字
    validateMinerAttr(list) {
      let code = 200;
      let msg = '';

      list.forEach((element) => {
        element.forEach((item) => {
          if (
            (typeof item.minutes !== 'undefined' && isEmpty(item.minutes)) ||
            (typeof item.min !== 'undefined' && isEmpty(item.min)) ||
            (typeof item.max !== 'undefined' && isEmpty(item.max))
          ) {
            code = 500;
            msg = '请输入值';
          }

          if (
            (typeof item.minutes !== 'undefined' && !isNumber(item.minutes)) ||
            (typeof item.min !== 'undefined' && !isNumber(item.min)) ||
            (typeof item.max !== 'undefined' && !isNumber(item.max))
          ) {
            code = 500;
            msg = '只能输入数字';
          }
        });
      });

      return {
        code: code,
        msg: msg,
      };
    },
  },
};

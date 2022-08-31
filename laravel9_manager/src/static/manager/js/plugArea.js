import * as plugArea from '@/api/plugArea.js';
import { isEmpty } from '@/utils/common.js';
// import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      // 列表
      area_searchText: '',
      plugAreaTableDataLoading: false,
      plugAreaTableData: [],
      plugAreaPage: {
        current: 1,
        size: 10,
        total: 0,
      },

      // 新增 编辑 区域
      plugClass: [],
      plugAreaDialog: {
        visible: false,
        title: 0,
      },
      areaForm: {
        ip: '',
        name: '',
        plugClass: [],
      },
      plugAreaForm: {
        // id: 0,
        ip: '',
        name: '',
        // plugClass: [],
        plug_bar_id: 0,
      },
      plugAreaFormRules: {
        ip: [
          // { required: true, message: '请输入ip', trigger: 'blur' },
          // { validator: isIP, trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
      },
      // options: options, //存放城市数据 引入的城市js文件 二级联动

      updateWayList: [
        { label: '强制', value: 0 },
        { label: '升级', value: 1 },
        { label: '降级', value: 2 },
        { label: '不更新', value: 3 },
      ],

      plugBarList: [],
    };
  },
  mounted() {
    this.getPlugAreaList();
    this.getPlugBarList();
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

    // 获取插件区域列表
    async getPlugAreaList() {
      const params = {
        currentPage: this.plugAreaPage.current,
        pageSize: this.plugAreaPage.size,
        searchText: this.area_searchText,
      };

      this.plugAreaTableDataLoading = true;
      const { data } = await plugArea.getPlugAreaList(params);
      this.plugAreaTableDataLoading = false;
      if (data) {
        this.plugAreaTableData = data.plugAreaList;
        this.plugAreaPage.total = data.total;
      }
    },

    // 搜索
    area_search() {
      this.plugAreaPage.current = 1;
      this.getPlugAreaList();
    },

    // 页码改变
    plugAreaCurrentChange(val) {
      this.plugAreaPage.current = val;
      this.getPlugAreaList();
    },

    // 显示数量改变
    plugAreaSizeChange(val) {
      this.plugAreaPage.size = val;
      this.getPlugAreaList();
    },

    // 获取插件种类和对应的版本
    async getPlugClassAndVersion() {
      const { data } = await plugArea.getPlugClassAndVersion();
      if (data) {
        this.plugClass = data.plugClass;
        this.plugAreaForm['plugClass'] = this.plugClass;
      }
    },

    // 获取插件配置列表
    async getPlugBarList() {
      const { data } = await plugArea.getPlugBarList();
      if (data) {
        this.plugBarList = data.list;
        this.plugBarList.unshift({ id: 0, name: '无' });
      }
    },

    // table 插件配置名称 select 改变
    async plugBarIdChange(row) {
      const params = {
        id: row.id,
        plug_bar_id: row.plug_bar_id,
      };
      const { data } = await plugArea.plugBarIdChange(params);
      if (data) {
        this.$baseMessage('插件配置更换成功', 'success');
        this.getPlugAreaList();
      }
    },

    // 根据ip查找地址
    async findAreaName() {
      const params = {
        ip: this.plugAreaForm.ip,
      };
      const { data } = await plugArea.findAreaName(params);
      if (data) {
        this.plugAreaForm.name = data.areaStr;
      }
    },

    // 新增区域dialog
    showAddPlugAreaDialog() {
      this.plugAreaDialog = {
        visible: true,
        title: 0,
      };
      // this.getPlugClassAndVersion(); // 获取插件种类和对应的版本
    },

    //省市二级联动
    handleChange(value) {
      // console.log(value);
    },

    // 新增区域 保存
    addPlugArea() {
      this.$refs['plugAreaForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await plugArea.addPlugArea(this.plugAreaForm);
          if (data) {
            this.$baseMessage('区域添加成功', 'success');
            this.plugAreaDialog.visible = false;
            this.getPlugAreaList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除
    delPlugArea(row) {
      this.$baseConfirm('确定要删除当前商品吗？', '删除提示', async () => {
        const params = {
          id: row.id,
        };
        const { data } = await plugArea.delPlugArea(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getPlugAreaList();
        }
      });
    },

    // 编辑区域dialog
    async showEidtPlugAreaDialog(row) {
      this.plugAreaForm = {
        id: row.id,
        name: row.area_name,
        plug_bar_id: row.plug_bar_id,
      };

      this.plugAreaDialog = {
        visible: true,
        title: 1,
      };

      // await this.getPlugClassAndVersion(); // 获取插件种类和对应的版本

      // this.plugAreaForm.id = row.id;

      // this.plugAreaForm.name = !isEmpty(row.area_value) ? row.area_name : '';

      // // 选中的select model值
      // var arr = [];
      // for (let i in row.config_value) {
      //   arr.push(row.config_value[i]); //属性
      // }

      // arr.forEach((element, index) => {
      //   this.plugAreaForm.plugClass[element.class_id].selectid =
      //     element.version_id;
      //   this.plugAreaForm.plugClass[element.class_id].update_way =
      //     element.update_way;
      // });
    },

    // 编辑区域 保存
    editPlugArea() {
      this.$refs['plugAreaForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await plugArea.editPlugArea(this.plugAreaForm);
          if (data) {
            this.$baseMessage('编辑成功', 'success');
            this.plugAreaDialog.visible = false;
            this.getPlugAreaList();
          }
        } else {
          return false;
        }
      });
    },

    // // 关闭插件版本 dialog
    // closePlugAreaDialog() {
    //   this.plugAreaForm = {};
    // },

    // // 重置表单
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
  },
};

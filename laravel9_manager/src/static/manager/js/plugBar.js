import * as plugBar from '@/api/plugBar.js';
// import { isEmpty } from '@/utils/common.js';
// import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      index: {
        queryForm: {
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
        },
        formRules: {
          name: [
            { required: true, message: '请输入插件配置名称', trigger: 'blur' },
          ],
          // price: [
          //   { required: true, message: '请输入标价', trigger: 'blur' },
          //   // { validator: rule.checkNum, trigger: 'blur' },
          // ],
        },

        multipleSelection: [],
      },

      plugClass: [],
      plugBarForm: {
        id: 0,
        name: '',
        plugClass: [],
      },

      updateWayList: [
        { label: '强制', value: 0 },
        { label: '升级', value: 1 },
        { label: '降级', value: 2 },
        { label: '不更新', value: 3 },
      ],
    };
  },
  mounted() {
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

    // 获取插件插件配置列表
    async getPlugBarList() {
      this.index.listLoading = true;
      const { data } = await plugBar.getPlugBarList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getPlugBarList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getPlugBarList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getPlugBarList();
    },

    // 表格checkbox选中
    index_handleSelectionChange(val) {
      this.index.multipleSelection = val;
    },

    // 新增插件插件配置配置dialog
    async showAddPlugBarDialog() {
      this.index.form = this.$options.data().index.form;

      await this.getPlugClassAndVersion();

      this.index.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 获取插件种类和对应的版本
    async getPlugClassAndVersion() {
      const { data } = await plugBar.getPlugClassAndVersion();
      if (data) {
        this.plugClass = data.plugClass;
        this.plugBarForm['plugClass'] = this.plugClass;
      }
    },

    // 新增
    addPlugBar() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          this.plugBarForm.name = this.index.form.name;

          const { data } = await plugBar.addPlugBar(this.plugBarForm);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('插件配置添加成功！', 'success');
            this.getPlugBarList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除
    delPlugBar(id) {
      this.$baseConfirm('确定要删除当前插件配置吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await plugBar.delPlugBar(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getPlugBarList();
        }
      });
    },

    // 复制配置
    copyPlugConfig(id) {
      this.$baseConfirm('确定要复制当前插件配置吗？', '复制提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await plugBar.copyPlugConfig(params);
        if (data) {
          this.$baseMessage('复制成功！', 'success');
          this.getPlugBarList();
        }
      });
    },

    // 编辑dialog
    async showEditPlugBarDialog(row) {
      this.index.form = Object.assign({}, row);

      await this.getPlugClassAndVersion();

      this.index.dialog = {
        title: 1,
        visible: true,
      };

      this.plugBarForm.id = row.id;

      // 选中的select model值
      var arr = [];
      for (let i in row.config_value) {
        arr.push(row.config_value[i]); //属性
      }

      arr.forEach((element, index) => {
        this.plugBarForm.plugClass[element.class_id].selectid =
          element.version_id;
        this.plugBarForm.plugClass[element.class_id].update_way =
          element.update_way;
        this.plugBarForm.plugClass[element.class_id].is_debug =
          element.is_debug;
      });
    },

    // 编辑保存
    editPlugBar() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          this.plugBarForm.name = this.index.form.name;

          const { data } = await plugBar.editPlugBar(this.plugBarForm);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('插件配置编辑成功！', 'success');
            this.getPlugBarList();
          }
        } else {
          return false;
        }
      });
    },

    // 关闭新增编辑窗口
    closePlugBarDialog() {
      this.plugBarForm = {};
    },
  },
};

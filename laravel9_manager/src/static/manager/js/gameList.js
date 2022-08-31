import * as gameList from '@/api/gameList.js';
import * as advertising from '@/api/advertising.js';
import { isEmpty } from '@/utils/common.js';
import * as goodsList from '@/api/goodsList.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      tabIndex: 0,
      ori_tabList: [],
      tabList: [],

      queryForm: {
        game_type_id: 0,
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },

      gameList: [],
      total: 0,
      gameListLoading: false,

      // 游戏类型
      gameDialog: {
        title: 0,
        visible: false,
      },

      gameForm: {
        type_name: '',
        sort: 0,
      },
      gameFormRules: {
        type_name: [
          { required: true, message: '请输入游戏类型名称', trigger: 'blur' },
        ],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
      },

      startList: [],

      // 游戏
      dialog: {
        title: 0,
        visible: false,
      },
      form: {
        game_name: '',
        img: '',
        background_img: '',
        game_type_id: '',
        signature_json: '',
        signature_md5: '',
        game_start_id: 0,
        sort: 0,
        bat_string: '',
        reg_string: '',
        is_platform: 0,
        relative_layer: 0,
        is_run_exe: 1,
        steam_id: 0,
      },
      formRules: {
        game_name: [
          { required: true, message: '请输入游戏类型名称', trigger: 'blur' },
        ],
      },
      uploadPayImgApi: '',
      tableImageList: [],
      imageList: [],
      imageList_background: [],
      dialogVisible: false,
      dialogImageUrl: '',

      // 启动项
      startDialog: {
        title: 0,
        visible: false,
      },
      startForm: {
        bat_string: '',
        reg_string: '',
        game_exe: '',
      },
      startFormRules: {},

      synchronous: {
        queryForm: {
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
          bar_id_string: '',
        },
        formRules: {
          bar_id_string: [
            { required: true, message: '请输入网吧id', trigger: 'blur' },
          ],
          // price: [
          //   { required: true, message: '请输入标价', trigger: 'blur' },
          //   // { validator: rule.checkNum, trigger: 'blur' },
          // ],
        },
      },

      synchronousAll: {
        queryForm: {
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
          time: 5,
        },
        formRules: {
          time: [
            { required: true, message: '请输入时间间隔', trigger: 'blur' },
            { validator: rule.checkNumber, trigger: 'blur' },
          ],
        },
      },

      detail: {
        queryForm: {
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
          value: '',
        },
        formRules: {},
      },

      activiTab: 0,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      await this.getTabList();
      await this.tabClick();
    });
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
      if (row.is_show == 0) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取tab 游戏类型
    async getTabList() {
      const { data } = await gameList.getTabList();
      if (data) {
        this.ori_tabList = Object.assign({}, data.tabList);
        this.tabList = data.tabList;
        this.tabList.unshift({ id: 0, type_name: '全部', sort: 0, is_show: 1 });
        // this.tabIndex = this.tabList[0].id.toString();
      }
    },

    // tab 点击
    tabClick() {
      this.queryForm.currentPage = 1;
      this.getGameList();
    },

    // tab 新增dialog
    showTabAddDialog() {
      this.gameForm = this.$options.data().gameForm;

      this.gameDialog = {
        title: 0,
        visible: true,
      };
    },

    // tab 新增
    tabAdd() {
      this.$refs['gameForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await gameList.tabAdd(this.gameForm);
          if (data) {
            this.gameDialog.visible = false;
            this.$baseMessage('新增游戏类型成功！', 'success');
            await this.getTabList();

            this.tabIndex = data.id.toString();
            await this.getGameList();
          }
        } else {
          return false;
        }
      });
    },

    // tab 删除
    tabDel() {
      this.$baseConfirm('确定要删除当前游戏类型吗？', '删除提示', async () => {
        const params = {
          id: this.tabIndex,
        };
        const { data } = await gameList.tabDel(params);
        if (data) {
          this.$baseMessage('游戏类型删除成功！', 'success');
          await this.getTabList();

          this.tabIndex = '0';
          await this.getGameList();
        }
      });
    },

    // tab 编辑dialog
    showTabEditDialog() {
      let row = {};
      this.tabList.forEach((element) => {
        if (this.tabIndex == element.id) {
          row = element;
          return;
        }
      });

      this.gameForm = Object.assign({}, row);

      this.gameDialog = {
        title: 1,
        visible: true,
      };
    },

    // tab 编辑
    tabEdit() {
      this.$refs['gameForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await gameList.tabEdit(this.gameForm);
          if (data) {
            this.gameDialog.visible = false;
            this.$baseMessage('游戏类型编辑成功！', 'success');
            this.getTabList();
          }
        } else {
          return false;
        }
      });
    },

    // 获取游戏列表
    async getGameList() {
      this.queryForm.game_type_id = this.tabIndex;

      this.gameListLoading = true;
      const { data } = await gameList.getGameList(this.queryForm);
      this.gameListLoading = false;
      if (data) {
        this.gameList = data.list;
        this.total = data.total;

        // 图片大图预览 tableImageList
        this.gameList.forEach((element) => {
          if (!isEmpty(element.game_img)) {
            this.tableImageList.push(element.game_img);
          }

          if (!isEmpty(element.game_background_img)) {
            this.tableImageList.push(element.game_background_img);
          }
        });
      }
    },

    // 搜索
    handleQuery() {
      this.queryForm.currentPage = 1;
      this.getGameList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getGameList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getGameList();
    },

    // 排序
    async gameSort(id, sort) {
      const params = {
        id: id,
        sort: sort,
      };
      const { data } = await gameList.gameSort(params);
      if (data) {
        this.$baseMessage('排序成功！', 'success');
        this.getGameList();
      }
    },

    // 表格 备注 input
    async tableRemark(id, remark) {
      const params = {
        id: id,
        remark: remark,
      };
      const { data } = await gameList.gameSort(params);
      if (data) {
        this.$baseMessage('备注修改成功！', 'success');
        // this.getGameList();
      }
    },

    // 是否显示
    async switchToggle(row) {
      const params = {
        id: row.id,
        is_show: row.is_show,
      };
      const { data } = await gameList.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 是否检测
    async switchCheckBtn(row) {
      const params = {
        id: row.id,
        open_check: row.open_check,
      };
      const { data } = await gameList.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 文件检测
    async fileCheckBtn(row) {
      const params = {
        id: row.id,
        is_check: row.is_check,
      };
      const { data } = await gameList.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 独立统计
    async isCountBtn(row) {
      const params = {
        id: row.id,
        is_use_count: row.is_use_count,
      };
      const { data } = await gameList.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 游戏图片 上传图片
    async uploadPayImg(params) {
      const file = params.file;
      // 校验
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/x-icon'
      ) {
        this.$message.error('图片只能是 JPG,PNG,JPEG,ICO 格式!');
        return;
      }
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 5MB!');
        return;
      }
      // 数据格式  文件对象
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await advertising.uploadImg(formData);
      if (data) {
        this.$baseMessage('游戏图片上传成功', 'success');

        if (params.data.type == 0) {
          this.form.img = data.imgName;
        } else {
          this.form.background_img = data.imgName;
        }
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      this.form.img = '';
    },
    handleRemove_background(file, fileList) {
      this.form.background_img = '';
    },

    // 新增游戏dialog
    showAddGameDialog() {
      this.form = this.$options.data().form;

      this.form.game_type_id =
        this.tabIndex != 0 ? parseInt(this.tabIndex) : this.ori_tabList[0].id;

      this.dialog = {
        title: 0,
        visible: true,
      };

      this.getStartList(0);
    },

    // 获取启动项
    async getStartList(type = 0) {
      const { data } = await gameList.getStartList();
      if (data) {
        if (type == 0) {
          data.list.unshift({ id: 0, game_name: '自己' });
        }

        this.startList = data.list;
      }
    },

    // 新增游戏
    addGame() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await gameList.addGame(this.form);
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('游戏添加成功！', 'success');
            this.getGameList();
          }
        } else {
          return false;
        }
      });
    },

    // 批处理 注册表字符串 详情  type 0:批处理  1:注册表字符串
    showDetailDialog(type, value) {
      this.detail.dialog = {
        title: type,
        visible: true,
      };

      switch (parseInt(type)) {
        case 0: // 批处理
          this.detail.form.value = this.form.bat_string;
          break;
        case 1: // 注册表字符串
          this.detail.form.value = this.form.reg_string;
          break;
      }
    },

    // 赋值
    assignValue(type) {
      switch (parseInt(type)) {
        case 0: // 批处理
          this.form.bat_string = this.detail.form.value;
          break;
        case 1: // 注册表字符串
          this.form.reg_string = this.detail.form.value;
          break;
      }

      this.detail.dialog.visible = false;
    },

    closeDialog() {
      this.imageList = [];
      this.imageList_background = [];
    },

    // 删除游戏
    delGame(id) {
      this.$baseConfirm('确定要删除当前游戏吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await gameList.delGame(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getGameList();
        }
      });
    },

    // 编辑游戏dialog
    showEditGameDialog(row) {
      this.form = Object.assign({}, row);

      if (!isEmpty(row.game_img)) {
        this.imageList.push({
          name: row.game_img,
          url: row.game_img,
        });
      }

      if (!isEmpty(row.game_background_img)) {
        this.imageList_background.push({
          name: row.game_background_img,
          url: row.game_background_img,
        });
      }

      this.dialog = {
        title: 1,
        visible: true,
      };

      this.getStartList(1);
    },

    // 编辑游戏
    editGame() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await gameList.editGame(this.form);
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getGameList();
          }
        } else {
          return false;
        }
      });
    },

    // 同步dialog
    showSynchronousDialog() {
      this.synchronous.dialog.visible = true;
    },

    // 同步
    async synchronousBtn() {
      this.$refs['synchronous.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await gameList.synchronousBtn(this.synchronous.form);
          if (data) {
            this.synchronous.dialog.visible = false;
            this.$baseMessage('同步成功！', 'success');
            // this.getGameList();
          }
        } else {
          return false;
        }
      });
    },

    // 同步所有网吧dialog
    showAllSynchronousDialog() {
      this.synchronousAll.dialog.visible = true;
    },

    // 同步所有网吧
    async allSynchronous() {
      const { data } = await gameList.allSynchronous(this.synchronousAll.form);
      if (data) {
        this.synchronousAll.dialog.visible = false;
        this.$baseMessage('同步成功！', 'success');
        // this.getGameList();
      }
    },

    // 添加拼音
    async addSpell() {
      const { data } = await gameList.addSpell();
      if (data) {
        this.$baseMessage('添加拼音成功', 'success');
      }
    },

    // ****************************************************************************************

    // 启动项dialog
    showStartDialog(row) {
      console.log(row);

      this.startForm = Object.assign({}, row);

      this.startDialog = {
        title: 0,
        visible: true,
      };
    },

    // 编辑启动项
    editStart() {
      this.$refs['startForm'].validate(async (valid) => {
        if (valid) {
          const params = {
            id: this.startForm.id,
            game_resources_id: this.startForm.game_resources_id,
            bat_string: this.startForm.bat_string,
            reg_string: this.startForm.reg_string,
            game_exe: this.startForm.game_exe,
          };
          const { data } = await gameList.editStart(params);
          if (data) {
            this.startDialog.visible = false;
            this.$baseMessage('编辑启动项成功！', 'success');
            this.getGameList();
          }
        } else {
          return false;
        }
      });
    },
  },
};

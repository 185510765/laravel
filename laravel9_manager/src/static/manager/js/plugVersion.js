import * as plugVersion from '@/api/plugVersion.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

import { baseURL } from '@/config';
import store from '@/store';

export default {
  data() {
    return {
      plugClassTabList: [],

      plugVersionTabList: [],

      menuParams: {},

      // 同步
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
          type: 0,
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
          type: 0,
        },
        formRules: {
          time: [
            { required: true, message: '请输入时间间隔', trigger: 'blur' },
          ],
        },
      },

      plugClass: {
        queryForm: {},
        table: {
          total: 0,
          list: [],
          loading: false,
        },
        dialog: {
          visible: false,
          title: 0,
        },
        form: {
          name: '',
          is_show: 1,
          guid: '',
          load_level: 0,
          use_num: '',
          version_history: '',
          explain: '',
        },
        formRules: {
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          guid: [{ required: true, message: '请输入guid', trigger: 'blur' }],
          load_level: [
            { required: true, message: '请输入加载优先级', trigger: 'blur' },
            { validator: rule.checkNum, trigger: 'blur' },
          ],
        },
      },

      showList: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],

      statusList: [
        { label: '手动开启，用户自己控制', value: 0 },
        { label: '强制开启', value: 1 },
        { label: '停用', value: 2 },
      ],

      plugVersion: {
        queryForm: {},
        table: {
          total: 0,
          list: [],
          loading: false,
        },
        dialog: {
          visible: false,
          title: 0,
        },
        form: {
          class_id: 0,
          status: 0,
          is_show: 1,
          version_main: '',
          guid: '',
          version_name: '',
          server_root_path: '',
          client_root_path: '',
          version_history: '',
          use_num: 0,
          update_count: 1,
          server_config: '',
          client_config: '',
        },
        formRules: {
          version_name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          guid: [{ required: true, message: '请输入guid', trigger: 'blur' }],
          update_count: [{ validator: rule.checkNum, trigger: 'blur' }],
        },
      },

      plugFile: {
        queryForm: {
          load_type: 0,
          class_id: 0,
          version_id: 0,
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        table: {
          total: 0,
          list: [],
          loading: false,
        },

        dialog: {
          title: 0,
          visible: false,
        },

        form: {
          class_id: 0,
          version_id: 0,
          name: '',
          update_mark: '',
          save_path: '',
          load_type: 0,
          run_type: 0,
          pe_type: 0,
          is_un_zip: 0,
          auto_run: 0,
          update_count: 0,
          is_enable: 0,
          explain: '',
          version: '',
          url: '',
          pebit: 0,
          md5: '',
        },
        formRules: {
          name: [
            { required: true, message: '请输入插件名称', trigger: 'blur' },
          ],
          update_count: [{ validator: rule.checkNum, trigger: 'blur' }],
        },
      },

      peTypeList: [
        { value: 0, label: '动态库' },
        { value: 1, label: 'exe' },
        { value: 2, label: 'zip' },
      ],

      plugFileList: [],

      // 插件上传
      uploadApi: baseURL + '/manager/PlugVersion/uploadPlugFile',
      upload_header: {
        Authorization: store.getters['user/accessToken'],
      },

      plug_type: 0,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      await this.checkPage();

      await this.init();
    });
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#FAFAFA;';
    },

    // table 一行样式
    tableRowStyle({ row, rowIndex }) {
      const styleObj = {};
      if (row.is_shelf == 0) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    async init() {
      await this.getPlugClassTabList();
      await this.chooseFirstPlug();
      await this.getPlugVersionTabList();
      await this.chooseFirstVersion();
      await this.getPlugFileList();
    },

    // 判断对应的页面 是插件管理还是升级包管理
    checkPage() {
      const url = window.location.href;
      this.plug_type = url.indexOf('plugVersion') != -1 ? 0 : 1;

      // const urlArray = urlString.split('/');
      // const urlPage = urlArray[urlArray.length - 1];
    },

    // 按钮菜单 *********************************************
    // 同步dialog
    showSynchronousDialog() {
      this.synchronous.dialog.visible = true;
    },

    // 多网吧同步
    synchronousBtn(type) {
      this.$refs['synchronous.form'].validate(async (valid) => {
        if (valid) {
          this.synchronous.form.type = type;

          const { data } = await plugVersion.synchronousBtn(
            this.synchronous.form
          );
          if (data) {
            this.synchronous.dialog.visible = false;
            this.$baseMessage('多网吧同步成功', 'success');
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

    // 同步所有网吧 type 0:插件  1:升级包
    allSynchronous(type) {
      this.$refs['synchronousAll.form'].validate(async (valid) => {
        if (valid) {
          this.synchronousAll.form.type = type;

          const { data } = await plugVersion.allSynchronous(
            this.synchronousAll.form
          );
          if (data) {
            this.synchronousAll.dialog.visible = false;
            this.$baseMessage('所有网吧同步成功！', 'success');
          }
        } else {
          return false;
        }
      });
    },

    // *********************************** plugClass *************************************************

    // 获取左侧tab插件种类
    async getPlugClassTabList() {
      const params = {
        plug_type: this.plug_type, // 0:插件 1:升级包
      };
      const { data } = await plugVersion.getPlugClassTabList(params);
      if (data) {
        this.plugClassTabList = data.plugClassTabList;

        // if (data.plugClassTabList.length > 0) {
        //   this.plugFile.queryForm.class_id =
        //     data.plugClassTabList[0].id.toString();
        // }
      }
    },

    // 选中第一个插件
    chooseFirstPlug() {
      if (this.plugClassTabList.length > 0) {
        this.plugFile.queryForm.class_id =
          this.plugClassTabList[0].id.toString();
      }
    },

    // 左侧tab点击
    async plugClass_handleClick(val) {
      this.plugFile.queryForm.class_id = val.toString();

      await this.getPlugVersionTabList();
      await this.chooseFirstVersion();
      // this.plugFile.queryForm.load_type = '0';
      await this.getPlugFileList();
    },

    // 右键菜单点击弹出后 传递参数
    passParams(vm) {
      this.menuParams = vm.data.attrs.params; // 传递的参数 { type: 0, id: item.id }
    },

    // 菜单编辑按钮
    menuEditBtn() {
      switch (parseInt(this.menuParams.type)) {
        case 0:
          this.showEditPlugClassDialog();
          break;
        case 1:
          this.showEditPlugVersionDialog();
          break;
      }
    },

    // 菜单复制按钮
    menuCopyBtn() {
      switch (parseInt(this.menuParams.type)) {
        case 0:
          this.copyPlugClass();
          break;
        case 1:
          this.copyPlugVersion();
          break;
      }
    },

    // 菜单新增按钮
    menuAddBtn() {
      switch (parseInt(this.menuParams.type)) {
        case 0:
          this.showAddPlugClassDialog();
          break;
        case 1:
          this.showAddPlugVersionDialog();
          break;
      }
    },

    // 菜单删除按钮
    menuDelBtn() {
      switch (parseInt(this.menuParams.type)) {
        case 0:
          this.delPlugClass();
          break;
        case 1:
          this.delPlugVersion();
          break;
      }
    },

    // 新增插件种类dialog
    showAddPlugClassDialog() {
      this.plugClass.form = this.$options.data().plugClass.form;

      this.plugClass.dialog = {
        visible: true,
        title: 0,
      };
    },

    // 新增插件种类
    addPlugClass() {
      this.$refs['plugClass.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await plugVersion.addPlugClass(this.plugClass.form);
          if (data) {
            this.plugClass.dialog.visible = false;
            this.$baseMessage('新增插件种类成功！', 'success');
            // this.init();
            this.getPlugClassTabList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除
    delPlugClass() {
      const plugClassObject = this.plugClassTabList[this.menuParams.index];

      this.$baseConfirm(
        '确定要删除 ' + plugClassObject.name + ' 插件吗？',
        '删除提示',
        async () => {
          const params = {
            id: plugClassObject.id,
          };
          const { data } = await plugVersion.delPlugClass(params);
          if (data) {
            this.$baseMessage(
              plugClassObject.name + ' 插件删除成功！',
              'success'
            );
            this.init();
          }
        }
      );
    },

    // 编辑dialog
    showEditPlugClassDialog() {
      // console.log(this.menuParams.id);
      // console.log(this.menuParams.index);

      const row = this.plugClassTabList[this.menuParams.index];

      this.plugClass.form = Object.assign({}, row);

      this.plugClass.dialog = {
        visible: true,
        title: 1,
      };
    },

    // 编辑
    editPlugClass() {
      this.$refs['plugClass.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await plugVersion.editPlugClass(this.plugClass.form);
          if (data) {
            this.plugClass.dialog.visible = false;
            this.$baseMessage('编辑插件种类成功！', 'success');
            // this.init();
            this.getPlugClassTabList();
          }
        } else {
          return false;
        }
      });
    },

    // 复制插件种类
    copyPlugClass() {
      const plugClassObject = this.plugClassTabList[this.menuParams.index];

      this.$baseConfirm(
        '确定要复制 ' + plugClassObject.name + ' 插件吗？',
        '删除提示',
        async () => {
          const params = {
            class_id: this.menuParams.id,
          };
          const { data } = await plugVersion.copyPlugClass(params);
          if (data) {
            this.$baseMessage(plugClassObject.name + '复制成功', 'success');
            // this.init();
            this.getPlugClassTabList();
          }
        }
      );
    },

    // ************************************** plugVersion **********************************************

    // 获取插件版本列表
    async getPlugVersionTabList() {
      if (
        isEmpty(this.plugFile.queryForm.class_id) ||
        this.plugFile.queryForm.class_id == 0
      ) {
        return;
      }

      const params = {
        class_id: this.plugFile.queryForm.class_id,
      };
      const { data } = await plugVersion.getPlugVersionTabList(params);
      if (data) {
        this.plugVersionTabList = data.plugVersionTabList;

        // if (data.plugVersionTabList.length > 0) {
        //   this.plugFile.queryForm.version_id =
        //     data.plugVersionTabList[0].id.toString();
        // }
      }
    },

    // tab li 是否默认选中第一个下标
    chooseFirstVersion() {
      if (this.plugVersionTabList.length > 0) {
        this.plugFile.queryForm.version_id =
          this.plugVersionTabList[0].id.toString();
      }
    },

    // 插件版本tab点击
    plugVersion_handleClick(val) {
      this.plugFile.queryForm.version_id = val.toString();

      // this.plugFile.queryForm.load_type = '0';
      this.getPlugFileList();
    },

    // 新增插件版本 dialog
    showAddPlugVersionDialog() {
      this.plugVersion.form = this.$options.data().plugVersion.form;

      this.plugVersion.dialog = {
        visible: true,
        title: 0,
      };
    },

    // 新增
    addPlugVersion() {
      this.$refs['plugVersion.form'].validate(async (valid) => {
        if (valid) {
          this.plugVersion.form.class_id = this.plugFile.queryForm.class_id;

          const { data } = await plugVersion.addPlugVersion(
            this.plugVersion.form
          );
          if (data) {
            this.plugVersion.dialog.visible = false;
            this.$baseMessage('新增插件版本成功！', 'success');
            // this.init();
            this.getPlugVersionTabList();
            // this.getPlugFileList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除
    delPlugVersion() {
      const plugVersionObject = this.plugVersionTabList[this.menuParams.index];

      this.$baseConfirm(
        '确定要删除 ' + plugVersionObject.version_name + ' 插件版本吗？',
        '删除提示',
        async () => {
          const params = {
            id: plugVersionObject.id,
          };
          const { data } = await plugVersion.delPlugVersion(params);
          if (data) {
            this.$baseMessage(
              plugVersionObject.version_name + ' 插件版本删除成功！',
              'success'
            );
            // this.init();
            this.getPlugVersionTabList();
            this.chooseFirstVersion();
            this.getPlugFileList();
          }
        }
      );
    },

    // 修改dialog
    showEditPlugVersionDialog() {
      const row = this.plugVersionTabList[this.menuParams.index];

      this.plugVersion.form = Object.assign({}, row);

      this.plugVersion.dialog = {
        visible: true,
        title: 1,
      };
    },

    // 修改
    editPlugVersion() {
      this.$refs['plugVersion.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await plugVersion.editPlugVersion(
            this.plugVersion.form
          );
          if (data) {
            this.plugVersion.dialog.visible = false;
            this.$baseMessage('编辑插件版本成功！', 'success');
            this.getPlugVersionTabList();
            // this.getPlugFileList();
          }
        } else {
          return false;
        }
      });
    },

    // 复制插件版本
    copyPlugVersion() {
      const plugVersionObject = this.plugVersionTabList[this.menuParams.index];

      this.$baseConfirm(
        '确定要复制 ' + plugVersionObject.version_name + ' 插件版本吗？',
        '删除提示',
        async () => {
          const params = {
            class_id: plugVersionObject.class_id,
            version_id: plugVersionObject.id,
          };
          const { data } = await plugVersion.copyPlugVersion(params);
          if (data) {
            this.$baseMessage(
              plugVersionObject.version_name + '复制成功',
              'success'
            );
            // this.init();
            this.getPlugVersionTabList();
            // this.getPlugFileList();
          }
        }
      );
    },

    // ************************************** plugFile **********************************************

    // 获取插件文件列表
    async getPlugFileList() {
      if (
        isEmpty(this.plugFile.queryForm.version_id) ||
        this.plugFile.queryForm.version_id == 0
      ) {
        return;
      }

      this.plugFile.table.loading = true;
      const { data } = await plugVersion.getPlugFileList(
        this.plugFile.queryForm
      );
      this.plugFile.table.loading = false;
      if (data) {
        this.plugFile.table.list = data.list;
        this.plugFile.table.total = data.total;
      }
    },

    // 搜索
    plugFile_handleQuery() {
      this.plugFile.queryForm.currentPage = 1;
      this.getPlugFileList();
    },

    // 页码切换
    plugFile_currentChange(val) {
      this.plugFile.queryForm.currentPage = val;
      this.getPlugFileList();
    },

    // 每页数量改变
    plugFile_sizeChange(val) {
      this.plugFile.queryForm.pageSize = val;
      this.getPlugFileList();
    },

    // 插件文件tab点击
    plugFile_handleClick(val) {
      this.getPlugFileList();
    },

    // table 插件 switch 切换
    async switchToggle(row) {
      const params = {
        id: row.id,
        is_enable: row.is_enable,
      };
      const { data } = await plugVersion.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功', 'success');
      }
    },

    // 新增插件dialog
    showAddPlugFileDialog() {
      this.plugFile.form = this.$options.data().plugFile.form;

      this.plugFile.dialog = {
        visible: true,
        title: 0,
      };
    },

    // 新增
    addPlugFile() {
      this.$refs['plugFile.form'].validate(async (valid) => {
        if (valid) {
          this.plugFile.form.class_id = this.plugFile.queryForm.class_id;
          this.plugFile.form.version_id = this.plugFile.queryForm.version_id;

          const { data } = await plugVersion.addPlugFile(this.plugFile.form);
          if (data) {
            this.plugFile.dialog.visible = false;
            this.$baseMessage('新增插件成功！', 'success');
            this.getPlugFileList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除
    delPlugFile(row) {
      this.$baseConfirm('确定要删除此插件版本吗？', '删除提示', async () => {
        const params = {
          id: row.id,
          version_id: this.plugFile.queryForm.version_id,
        };
        const { data } = await plugVersion.delPlugFile(params);
        if (data) {
          this.$baseMessage('插件删除成功！', 'success');
          this.getPlugFileList();
        }
      });
    },

    // 编辑dialog
    showEditPlugFileDialog(row) {
      this.plugFile.form = Object.assign({}, row);

      this.plugFile.dialog = {
        visible: true,
        title: 1,
      };
    },

    // 编辑
    editPlugFile() {
      this.$refs['plugFile.form'].validate(async (valid) => {
        if (valid) {
          this.plugFile.form.class_id = this.plugFile.queryForm.class_id;
          this.plugFile.form.version_id = this.plugFile.queryForm.version_id;

          const { data } = await plugVersion.editPlugFile(this.plugFile.form);
          if (data) {
            this.plugFile.dialog.visible = false;
            this.$baseMessage('编辑插件成功！', 'success');
            this.getPlugFileList();
          }
        } else {
          return false;
        }
      });
    },

    // 插件上传 ***********************************
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    // 上传进度条
    onProgress(event, file, fileList) {
      // console.log(event.percent);
      // this.videoFlag = true;
      // this.videoUploadPercent = file.percentage.toFixed(0);
    },

    // 上传文件 前
    beforeAvatarUpload(file) {
      const isLt8M = file.size / 1024 / 1024 < 50;
      if (!isLt8M) {
        this.$baseMessage('上传文件大小不能超过 50 MB!', 'error');
      }
      return file.type && isLt8M;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      const { code, data, message } = res;
      if (code == 200) {
        this.$baseMessage('上传成功', 'success');
        this.plugFile.form.pe_type = data.pe_type;
        this.plugFile.form.url = data.url;
        this.plugFile.form.version = data.version;
        this.plugFile.form.pebit = data.pebit;
        this.plugFile.form.md5 = data.md5;

        this.$refs['upload'].clearFiles();
      } else {
        this.$baseMessage(message, 'error');
      }
    },
    // 上传失败
    handleAvatarError(err, file, fileList) {
      this.$baseMessage(err, 'error');
    },
  },
};

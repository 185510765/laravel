import * as songList from '@/api/songList.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';
import * as goodsList from '@/api/goodsList.js';

export default {
  data() {
    return {
      tabIndex: 0,
      ori_tabList: [],
      tabList: [],
      ori_tabList: [],

      // 歌单分类
      dialog: {
        title: 0,
        visible: false,
      },

      form: {
        sz_name: '',
        pop: 0,
      },
      formRules: {
        sz_name: [
          { required: true, message: '请输入歌单分类名称', trigger: 'blur' },
        ],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
      },

      queryForm: {
        sz_classid: 0,
        searchText: '',
        currentPage: 1,
        pageSize: 30,
      },

      sheetList: [],
      sheetTotal: 0,
      sheetListLoading: false,

      sheetImageList: [],

      // 歌单
      sheetDialog: {
        title: 0,
        visible: false,
      },
      sheetForm: {
        // sz_classid: 0,
        class_id_arr: [],
        sz_name: '',
        sz_pic: '',
        sz_source: '163',
        sz_introduce: '',
      },
      sheetFormRules: {
        sz_name: [
          { required: true, message: '请输入歌单名称', trigger: 'blur' },
        ],
        // sz_pic: [
        //   { required: true, message: '请上传歌单图片', trigger: 'blur' },
        // ],
      },

      uploadPayImgApi: '',
      tableImageList: [],
      imageList: [],
      dialogVisible: false,
      dialogImageUrl: '',

      sheet_multipleSelection: [],

      // 歌曲列表
      music: {
        queryForm: {
          sheet_id: 0,
          searchText: '',
          currentPage: 1,
          pageSize: 10,
        },

        list: [],
        total: 0,
        listLoading: false,
        dialog: {
          title: 0,
          visible: false,
        },
        form: {},
        formRules: {},
      },

      // 网易采集
      wangyi: {
        dialog: {
          title: 0,
          visible: false,
        },
        form: {
          collect: '',
        },
        formRules: {
          collect: [
            { required: true, message: '请复制网易云数据', trigger: 'blur' },
            { validator: rule.checkJson, trigger: 'blur' },
          ],
        },
      },
      multipleSelection: [],
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
      if (row.status == -1) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取tab 歌单类型
    async getTabList() {
      const { data } = await songList.getTabList();
      if (data) {
        this.ori_tabList = Object.assign({}, data.tabList);
        this.tabList = data.tabList;
        this.tabList.unshift({
          class_id: 0,
          sz_name: '全部',
          pop: 0,
          sort: 0,
        });

        // tab拖拽
        // this.tabDrag(this.ori_tabList);
      }
    },

    // // tab 拖拽
    // tabDrag(ori_tabList) {
    //   // 允许拖拽的项
    //   var dragItems = this.allowDragItems(ori_tabList);

    //   var el = document.querySelector('.tab .el-tabs__nav');
    //   var sortable = Sortable.create(el, {
    //     handle: dragItems,
    //     onEnd: (evt) => {
    //       this.tabDragEnd(evt.newIndex - 1, evt.oldIndex - 1);
    //     },
    //   });
    // },

    // // 允许拖拽的tab项 自己添加的全部项不允许拖拽
    // allowDragItems(ori_tabList) {
    //   var dragItems = '';
    //   Object.values(ori_tabList).forEach((element, index) => {
    //     dragItems += '#tab-' + (index + 1) + ',';
    //   });

    //   return dragItems.substr(0, dragItems.length - 1);
    // },

    // // tab 拖拽完成
    // async tabDragEnd(newIndex, oldIndex) {
    //   const params = {
    //     new_class_id: this.tabList[newIndex].class_id,
    //     old_class_id: this.tabList[oldIndex].class_id,
    //   };
    //   const { data } = await songList.tabDragEnd(params);
    //   if (data) {
    //     this.$baseMessage('歌单分类排序成功！', 'success');
    //     this.getTabList();
    //   }
    // },

    // tab 点击
    tabClick() {
      this.getSheetList();
    },

    // tab 新增dialog
    showTabAddDialog() {
      this.form = this.$options.data().form;

      this.dialog = {
        title: 0,
        visible: true,
      };
    },

    // tab 新增
    tabAdd() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await songList.tabAdd(this.form);
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('新增歌单类型成功！', 'success');
            await this.getTabList();

            this.tabIndex = data.id.toString();
            await this.getSheetList();
          }
        } else {
          return false;
        }
      });
    },

    // tab 删除
    tabDel() {
      this.$baseConfirm('确定要删除当前歌单类型吗？', '删除提示', async () => {
        const params = {
          class_id: this.tabIndex,
        };
        const { data } = await songList.tabDel(params);
        if (data) {
          this.$baseMessage('歌单类型删除成功！', 'success');
          await this.getTabList();

          this.tabIndex = '0';
          await this.getSheetList();
        }
      });
    },

    // tab 编辑dialog
    showTabEditDialog() {
      let row = {};
      this.tabList.forEach((element) => {
        if (this.tabIndex == element.class_id) {
          row = element;
          return;
        }
      });

      this.form = Object.assign({}, row);

      this.dialog = {
        title: 1,
        visible: true,
      };
    },

    // tab 编辑
    tabEdit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await songList.tabEdit(this.form);
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('歌单类型编辑成功！', 'success');
            this.getTabList();
          }
        } else {
          return false;
        }
      });
    },

    // 获取歌单列表
    async getSheetList() {
      this.queryForm.sz_classid = this.tabIndex;

      this.sheetListLoading = true;
      const { data } = await songList.getSheetList(this.queryForm);
      this.sheetListLoading = false;
      if (data) {
        this.sheetList = data.list;
        this.sheetTotal = data.total;

        // 图片大图预览 sheetImageList
        this.sheetList.forEach((element) => {
          if (!isEmpty(element.sheet_img)) {
            this.sheetImageList.push(element.sheet_img);
          }
        });
      }
    },

    // 搜索
    handleQuery() {
      this.queryForm.currentPage = 1;
      this.getSheetList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getSheetList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getSheetList();
    },

    // banner排序
    async bannerSheetSort(sheet_id, index_banner_leavel) {
      const params = {
        sheet_id: sheet_id,
        index_banner_leavel: index_banner_leavel,
      };
      const { data } = await songList.bannerSheetSort(params);
      if (data) {
        this.$baseMessage('banner歌单排序成功！', 'success');
        this.getSheetList();
      }
    },

    // 推荐歌单排序
    async recommendSheetSort(sheet_id, index_show_level) {
      const params = {
        sheet_id: sheet_id,
        index_show_level: index_show_level,
      };
      const { data } = await songList.recommendSheetSort(params);
      if (data) {
        this.$baseMessage('推荐歌单排序成功！', 'success');
        this.getSheetList();
      }
    },

    // 歌单排序
    async sheetSort(sheet_id, pop) {
      const params = {
        sheet_id: sheet_id,
        pop: pop,
      };
      const { data } = await songList.sheetSort(params);
      if (data) {
        this.$baseMessage('歌单排序成功！', 'success');
        this.getSheetList();
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
        file.type !== 'image/png'
      ) {
        this.$message.error('图片只能是 JPG,PNG,JPEG 格式!');
        return;
      }
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 5MB!');
        return;
      }
      // 数据格式  文件对象
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await goodsList.uploadImg(formData);
      if (data) {
        this.$baseMessage('游戏图片上传成功', 'success');
        this.sheetForm.sz_pic = data.imgName;
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    // 新增歌单dialog
    showAddSheetDialog() {
      this.sheetForm = this.$options.data().sheetForm;

      this.sheetForm.sz_classid =
        this.tabIndex != 0
          ? parseInt(this.tabIndex)
          : this.ori_tabList[0].class_id;

      this.sheetDialog = {
        title: 0,
        visible: true,
      };
    },

    // 新增歌单
    addSheet() {
      this.$refs['sheetForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await songList.addSheet(this.sheetForm);
          if (data) {
            this.sheetDialog.visible = false;
            this.$baseMessage('歌单添加成功！', 'success');
            this.getSheetList();
          }
        } else {
          return false;
        }
      });
    },

    closeDialog() {
      this.imageList = [];
    },

    sheet_handleSelectionChange(val) {
      this.sheet_multipleSelection = val;
    },

    // 删除（多删）
    delSheets() {
      let sheet_id = '';
      this.sheet_multipleSelection.forEach((element) => {
        sheet_id += element.sheet_id + ',';
      });
      sheet_id = sheet_id.substr(0, sheet_id.length - 1);

      this.delSheet(sheet_id, this.sheet_multipleSelection.length);
    },

    // 删除歌单 （单删）
    delSheet(sheet_id, num = 1) {
      this.$baseConfirm(
        '确定要删除这 ' + num + ' 个歌单吗？',
        '删除提示',
        async () => {
          const params = {
            sheet_id: sheet_id,
          };
          const { data } = await songList.delSheet(params);
          if (data) {
            this.$baseMessage('删除成功！', 'success');
            this.getSheetList();

            this.$refs.sheetList[this.tabIndex].clearSelection();
            this.sheet_multipleSelection = [];
          }
        }
      );
    },

    // 编辑歌单sheetDialog
    showEditSheetDialog(row) {
      this.sheetForm = Object.assign({}, row);

      if (!isEmpty(row.sheet_img)) {
        this.imageList.push({
          name: row.sheet_img,
          url: row.sheet_img,
        });
      }

      this.sheetDialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑歌单
    editSheet() {
      this.$refs['sheetForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await songList.editSheet(this.sheetForm);
          if (data) {
            this.sheetDialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getSheetList();
          }
        } else {
          return false;
        }
      });
    },

    // 歌单歌曲列表dialog
    showMusicDialog(row) {
      this.form.sz_name = row.sz_name;

      this.music.dialog.visible = true;
      this.music.queryForm.sheet_id = row.sheet_id;

      this.getSheetMusicList();
    },

    // 获取歌单歌曲列表
    async getSheetMusicList() {
      this.music.listLoading = true;
      const { data } = await songList.getSheetMusicList(this.music.queryForm);
      this.music.listLoading = false;
      if (data) {
        this.music.list = data.list;
        this.music.total = data.total;
      }
    },

    // 搜索
    music_handleQuery() {
      this.music.queryForm.currentPage = 1;
      this.getSheetMusicList();
    },

    // 页码切换
    music_currentChange(val) {
      this.music.queryForm.currentPage = val;
      this.getSheetMusicList();
    },

    // 每页数量改变
    music_sizeChange(val) {
      this.music.queryForm.pageSize = val;
      this.getSheetMusicList();
    },

    // 歌单歌曲排序
    async musicSort(id, pop) {
      const params = {
        id: id,
        pop: pop,
      };
      const { data } = await songList.musicSort(params);
      if (data) {
        this.$baseMessage('排序成功！', 'success');
        this.getSheetMusicList();
      }
    },

    // 网易采集dialog
    showWangyiMusicDialog() {
      this.wangyi.dialog.visible = true;
    },

    // 数据采集
    async collectMusic() {
      this.$refs['wangyi.form'].validate(async (valid) => {
        if (valid) {
          const params = {
            sheet_id: this.music.queryForm.sheet_id,
            collect: JSON.parse(this.wangyi.form.collect),
          };
          const { data } = await songList.collectMusic(params);
          if (data) {
            this.$baseMessage('采集成功', 'success');
            this.wangyi.dialog.visible = false;
            this.getSheetMusicList();
          }
        } else {
          return false;
        }
      });
    },

    // 表格checkbox选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 删除（多删）
    delMusics() {
      let id = '';
      this.multipleSelection.forEach((element) => {
        id += element.id + ',';
      });
      id = id.substr(0, id.length - 1);

      this.delMusic(id, this.multipleSelection.length);
    },

    // 删除（单删）
    async delMusic(id, num = 1) {
      this.$baseConfirm(
        '确定要从歌单中删除 ' + num + ' 首歌曲吗？',
        '删除提示',
        async () => {
          const params = {
            id: id,
          };
          const { data } = await songList.delMusic(params);
          if (data) {
            this.$baseMessage('删除成功！', 'success');
            this.getSheetMusicList();

            this.$refs.list.clearSelection();
            this.multipleSelection = [];

            await this.getSheetList();
          }
        }
      );
    },
  },
};

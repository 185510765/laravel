import * as singer from '@/api/singer.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';
import * as PayOrderRecordList from '@/api/PayOrderRecordList.js';
import * as musicList from '@/api/musicList.js';
import * as goodsList from '@/api/goodsList.js';

export default {
  data() {
    return {
      // 歌手
      singer: {
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
          sz_name: '',
          sz_cat: 1,
          sz_pic: '',
          sz_introduce: '',
          sz_region: '华语',
          sz_source: '163',
        },
        formRules: {
          sz_name: [
            { required: true, message: '请输入歌手名称', trigger: 'blur' },
          ],
          sz_region: [
            { required: true, message: '请选择歌手区域', trigger: 'blur' },
          ],
        },
      },

      multipleSelection: [],
      multipleSelection_music: [],

      regionList: ['华语', '欧美', '日本', '韩国', '其他'],

      singerImageList: [],

      uploadPayImgApi:
        process.env.VUE_APP_BASE_API +
        '/manager/PayOrderRecordList/uploadPayImg', // 游戏图片上传路径
      tableImageList: [],
      imageList: [],
      dialogVisible: false,
      dialogImageUrl: '',

      // 歌曲列表
      music: {
        queryForm: {
          artist_id: 0,
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
    };
  },
  mounted() {
    this.getSingerList();
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

    // 获取歌单列表
    async getSingerList() {
      this.singer.listLoading = true;
      const { data } = await singer.getSingerList(this.singer.queryForm);
      this.singer.listLoading = false;
      if (data) {
        this.singer.list = data.list;
        this.singer.total = data.total;

        // 图片大图预览 singerImageList
        this.singer.list.forEach((element) => {
          if (!isEmpty(element.singer_img)) {
            this.singerImageList.push(element.singer_img);
          }
        });
      }
    },

    // 搜索
    handleQuery() {
      this.singer.queryForm.currentPage = 1;
      this.getSingerList();
    },

    // 页码切换
    currentChange(val) {
      this.singer.queryForm.currentPage = val;
      this.getSingerList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.singer.queryForm.pageSize = val;
      this.getSingerList();
    },

    // 歌手图片 上传图片
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
        this.singer.form.sz_pic = data.imgName;
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    closeSingerDialog() {
      this.imageList = [];
    },

    // 新增歌手dialog
    showAddSingerDialog() {
      this.singer.form = this.$options.data().singer.form;

      this.singer.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 新增歌手
    addSinger() {
      this.$refs['singer.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await singer.addSinger(this.singer.form);
          if (data) {
            this.$baseMessage('歌手添加成功！', 'success');
            this.singer.dialog.visible = false;
            this.getSingerList();
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
    delSingers() {
      let artist_id = '';
      this.multipleSelection.forEach((element) => {
        artist_id += element.artist_id + ',';
      });
      artist_id = artist_id.substr(0, artist_id.length - 1);

      this.delSinger(artist_id, this.multipleSelection.length);
    },

    // 删除（单删）
    delSinger(artist_id, num = 1) {
      this.$baseConfirm(
        '确定要删除 ' + num + ' 位歌手吗？',
        '删除提示',
        async () => {
          const params = {
            artist_id: artist_id,
          };
          const { data } = await singer.delSinger(params);
          if (data) {
            this.$baseMessage('删除成功！', 'success');
            this.getSingerList();

            this.$refs['singer.list'].clearSelection();
            this.multipleSelection = [];
          }
        }
      );
    },

    // 编辑歌手sheetDialog
    showEditSingerDialog(row) {
      this.singer.form = Object.assign({}, row);

      if (!isEmpty(row.singer_img)) {
        this.imageList.push({
          name: row.singer_img,
          url: row.singer_img,
        });
      }

      this.singer.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑歌手
    editSinger() {
      this.$refs['singer.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await singer.editSinger(this.singer.form);
          if (data) {
            this.singer.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getSingerList();
          }
        } else {
          return false;
        }
      });
    },

    // 排序
    async sort(artist_id, pop) {
      const params = {
        artist_id: artist_id,
        pop: pop,
      };
      const { data } = await singer.sort(params);
      if (data) {
        this.$baseMessage('排序成功！', 'success');
        this.getSingerList();
      }
    },

    // 歌手歌曲列表dialog
    showMusicDialog(row) {
      this.music.dialog.visible = true;
      this.music.queryForm.artist_id = row.artist_id;

      this.singer.form.sz_name = row.sz_name;

      this.getSingerMusicList();
    },

    // 获取歌手歌曲列表
    async getSingerMusicList() {
      this.music.listLoading = true;
      const { data } = await singer.getSingerMusicList(this.music.queryForm);
      this.music.listLoading = false;
      if (data) {
        this.music.list = data.list;
        this.music.total = data.total;
      }
    },

    // 搜索
    music_handleQuery() {
      this.music.queryForm.currentPage = 1;
      this.getSingerMusicList();
    },

    // 页码切换
    music_currentChange(val) {
      this.music.queryForm.currentPage = val;
      this.getSingerMusicList();
    },

    // 每页数量改变
    music_sizeChange(val) {
      this.music.queryForm.pageSize = val;
      this.getSingerMusicList();
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
        this.getSingerMusicList();
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
            collect: JSON.parse(this.wangyi.form.collect),
          };
          const { data } = await musicList.collectMusic(params);
          if (data) {
            this.$baseMessage('采集成功', 'success');
            this.wangyi.dialog.visible = false;
            this.getSingerMusicList();
          }
        } else {
          return false;
        }
      });
    },

    // 表格checkbox选中
    handleSelectionChange_music(val) {
      this.multipleSelection_music = val;
    },

    // 删除（多删）
    delMusics() {
      let music_id = '';
      this.multipleSelection_music.forEach((element) => {
        music_id += element.music_id + ',';
      });
      music_id = music_id.substr(0, music_id.length - 1);

      this.delMusic(music_id, this.multipleSelection_music.length);
    },

    // 删除（单删）
    async delMusic(music_id, num = 1) {
      this.$baseConfirm(
        '确定要从歌手中删除 ' + num + ' 首歌曲吗？',
        '删除提示',
        async () => {
          const params = {
            music_id: music_id,
          };
          const { data } = await musicList.delMusic(params);
          if (data) {
            this.$baseMessage('删除成功！', 'success');
            this.getSingerMusicList();

            this.$refs.list.clearSelection();
            this.multipleSelection_music = [];

            await this.getSingerList();
          }
        }
      );
    },
  },
};

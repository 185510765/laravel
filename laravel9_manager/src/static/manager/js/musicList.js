import * as musicList from '@/api/musicList.js';
import * as MusicArtistList from '@/api/MusicArtistList.js';
import * as MusicAlbumList from '@/api/MusicAlbumList.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';
import * as PayOrderRecordList from '@/api/PayOrderRecordList.js';

export default {
  data() {
    return {
      queryForm: {
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },

      collectLoading: false,

      list: [],
      total: 0,
      listLoading: false,
      dialog: {
        title: 0,
        visible: false,
      },
      form: {
        sz_name: '',
        sz_album: '',
        artist_id: '',
        album_id: '',
        datetime: 0,
        sz_source: '163',
        sz_source_music_id: 0,
        artistName: '',
      },
      formRules: {
        sz_name: [{ required: true, message: '请选择歌曲', trigger: 'blur' }],
        // artist_id: [
        //   { required: true, message: '请选择歌手', trigger: 'change' },
        // ],
        // album_id: [
        //   { required: true, message: '请选择专辑', trigger: 'change' },
        // ],
      },

      artistList: [],
      albumList: [],

      // 选择歌曲
      music: {
        queryForm: {
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

      musicSrc: '',
      musicLastIndex: '',

      // 新增歌手
      artist: {
        queryForm: {
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
        },
      },

      regionList: ['华语', '欧美', '日本', '韩国', '其他'],

      uploadPayImgApi:
        process.env.VUE_APP_BASE_API +
        '/manager/PayOrderRecordList/uploadPayImg', // 游戏图片上传路径
      tableImageList: [],
      imageList: [],
      dialogVisible: false,
      dialogImageUrl: '',

      // 新增专辑
      album: {
        queryForm: {
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
        form: {
          sz_name: '',
          sz_pic: '',
          sz_description: '',
          artist_id: '',
          sz_source: '163',
        },
        formRules: {
          sz_name: [
            { required: true, message: '请输入歌曲名称', trigger: 'blur' },
          ],
        },
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
    this.getMusicList();

    // this.getArtistList();
    // this.getAlbumList();
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

    // 获取歌曲列表
    async getMusicList() {
      this.listLoading = true;
      const { data } = await musicList.getMusicList(this.queryForm);
      this.listLoading = false;
      if (data) {
        this.list = data.list;
        this.total = data.total;
      }
    },

    // 搜索
    handleQuery() {
      this.queryForm.currentPage = 1;
      this.getMusicList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getMusicList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getMusicList();
    },

    // 选择歌曲dialog
    showChooseMusicDialog() {
      this.music.dialog.visible = true;
    },

    // 获取歌曲播放地址
    async getMusicUrl(row, index) {
      if (this.musicLastIndex === '' || index != this.musicLastIndex) {
        if (!isEmpty(row.sz_source) && !isEmpty(row.sz_source_music_id)) {
          const params = {
            sz_source: row.sz_source,
            sz_source_music_id: row.sz_source_music_id,
          };
          const { data } = await musicList.getMusicUrl(params);
          if (data) {
            this.musicSrc = data.musicSrc;
          }

          // // 延迟解决video没加载
          // setTimeout(() => {
          //   this.audition(row, index);
          // }, 100);
        } else {
          this.$baseMessage('暂无歌曲资源，请选择其他歌曲！', 'error');
        }
      }

      // 延迟解决video没加载
      setTimeout(() => {
        this.audition(row, index);
      }, 100);
    },

    // 试听 播放 停止
    audition(row, index) {
      const audio = this.$refs.musicSrc;

      if (!isEmpty(this.musicSrc)) {
        // 操作同一首歌
        if (this.musicLastIndex === index) {
          if (audio.paused) {
            audio.play();
            row.audio_img = row.audio_pause;
          } else {
            audio.pause();
            row.audio_img = row.audio_play;
          }
        } else {
          audio.play();

          if (!isEmpty(this.musicLastIndex)) {
            this.list[this.musicLastIndex].audio_img = row.audio_play;
          }
          row.audio_img = row.audio_pause;
        }

        this.musicLastIndex = index;

        // 监听是否播放完毕
        const _this = this;
        audio.addEventListener('ended', function () {
          _this.list[_this.musicLastIndex].audio_img = row.audio_play;
        });
      } else {
        this.$baseMessage('暂无歌曲资源', 'error');

        this.musicNoResources(row.music_id);
      }
    },

    // 标记歌曲无资源
    async musicNoResources(music_id) {
      const params = {
        music_id: music_id,
      };
      const { data } = await musicList.musicNoResources(params);
      if (data) {
        this.getMusicList();
      }
    },

    // 选择歌曲
    async chooseMusic(row) {
      this.form.sz_name = row.sz_name;
      this.form.sz_album = row.sz_album;
      this.form.datetime = row.duration;
      this.form.sz_source_music_id = row.sz_source_music_id;
      this.form.artistName = row.artistName;

      this.$baseMessage('歌曲选择成功!', 'success');
      this.music.dialog.visible = false;
    },

    // 关闭弹窗
    closeMusicDialog() {
      this.musicSrc = '';

      if (!isEmpty(this.musicLastIndex)) {
        this.music.list[this.musicLastIndex].audio_img =
          this.music.list[this.musicLastIndex].audio_play;
      }

      this.musicLastIndex = '';

      this.music.queryForm = this.$options.data().music.queryForm;
      this.music.total = 0;
      this.music.list = [];
    },

    // 获取音乐接口搜索的歌曲列表
    async getApiMusicList() {
      this.music.listLoading = true;
      const { data } = await musicList.getApiMusicList(this.music.queryForm);
      this.music.listLoading = false;
      if (data) {
        this.music.total = data.total;
        this.music.list = data.list;
      }
    },

    // 搜索
    musicHandleQuery() {
      if (!isEmpty(this.music.queryForm.searchText)) {
        this.music.queryForm.currentPage = 1;
        this.getApiMusicList();
      }
    },

    // 页码切换
    musicCurrentChange(val) {
      this.music.queryForm.currentPage = val;
      this.getApiMusicList();
    },

    // 每页数量改变
    musicSizeChange(val) {
      this.music.queryForm.pageSize = val;
      this.getApiMusicList();
    },

    // 获取歌手列表
    async getArtistList() {
      const { data } = await musicList.getArtistList();
      if (data) {
        this.artistList = data.artistList;
      }
    },

    // 获取专辑列表
    async getAlbumList() {
      const { data } = await musicList.getAlbumList();
      if (data) {
        this.albumList = data.albumList;
      }
    },

    // 新增歌手dialog
    showAddArtistDialog() {
      this.artist.form = this.$options.data().artist.form;
      this.artist.dialog.visible = true;
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
      const { data } = await PayOrderRecordList.uploadPayImg(formData);
      if (data) {
        this.$baseMessage('游戏图片上传成功', 'success');
        this.artist.form.sz_pic = data.imgName;
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    // 新增歌手
    addArtist() {
      this.$refs['artist.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await MusicArtistList.addArtist(this.artist.form);
          if (data) {
            this.$baseMessage('歌手添加成功！', 'success');
            this.artist.dialog.visible = false;

            this.artistList.unshift({
              artist_id: data.artist_id,
              sz_name: this.artist.form.sz_name,
            });

            // await this.getArtistList();
            this.form.artist_id = data.artist_id;
          }
        } else {
          return false;
        }
      });
    },

    artistSelect(val) {
      // console.log(val);
    },

    albumSelect(val) {
      let row = this.albumList.find((item) => item.album_id == val);
      this.form.sz_album = row.sz_name;
    },

    closeArtistDialog() {
      this.imageList = [];
    },

    // 新增专辑dialog
    showAddAlbumDialog() {
      this.album.form = this.$options.data().album.form;
      this.album.dialog.visible = true;
    },

    // 新增专辑
    addAlbum() {
      this.$refs['album.form'].validate(async (valid) => {
        if (valid) {
          this.album.form.artist_id = this.form.artist_id;

          const { data } = await MusicAlbumList.addAlbum(this.album.form);
          if (data) {
            this.$baseMessage('专辑添加成功！', 'success');
            this.album.dialog.visible = false;
            this.albumList.unshift({
              album_id: data.album_id,
              sz_name: this.album.form.sz_name,
            });
            // await this.getArtistList();
            this.form.album_id = data.album_id;
            this.form.sz_album = this.album.form.sz_name;
          }
        } else {
          return false;
        }
      });
    },

    // 新增dialog
    showAddMusicDialog() {
      this.form = this.$options.data().form;

      this.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 新增歌曲
    addMusic() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await musicList.addMusic(this.form);
          if (data) {
            this.$baseMessage('歌曲添加成功！', 'success');
            this.dialog.visible = false;
            this.getMusicList();
          }
        } else {
          return false;
        }
      });
    },

    // // 删除歌曲
    // delMusic(music_id) {
    //   this.$baseConfirm('确定要删除当前歌曲吗？', '删除提示', async () => {
    //     const params = {
    //       music_id: music_id,
    //     };
    //     const { data } = await musicList.delMusic(params);
    //     if (data) {
    //       this.$baseMessage('删除成功！', 'success');
    //       this.getMusicList();
    //     }
    //   });
    // },

    // 修改歌曲dialog
    showEditMusicDialog(row) {
      this.form = Object.assign({}, row);

      this.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑歌曲
    async editMusic() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const { data } = await musicList.editMusic(this.form);
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getMusicList();
          }
        } else {
          return false;
        }
      });
    },

    // 排序
    async musicSort(music_id, pop) {
      const params = {
        music_id: music_id,
        pop: pop,
      };
      const { data } = await musicList.musicSort(params);
      if (data) {
        this.$baseMessage('排序成功！', 'success');
        this.getMusicList();
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
          // const params = {
          //   collect: JSON.parse(this.wangyi.form.collect),
          // };

          this.collectLoading = true;
          const { data } = await musicList.collectMusic(
            JSON.parse(this.wangyi.form.collect)
          );
          this.collectLoading = false;
          if (data) {
            this.$baseMessage('采集成功', 'success');
            this.wangyi.dialog.visible = false;
            this.getMusicList();
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
      let music_id = '';
      this.multipleSelection.forEach((element) => {
        music_id += element.music_id + ',';
      });
      music_id = music_id.substr(0, music_id.length - 1);

      this.delMusic(music_id, this.multipleSelection.length);
    },

    // 删除（单删）
    delMusic(music_id, num = 1) {
      this.$baseConfirm(
        '确定要删除 ' + num + ' 首歌曲吗？',
        '删除提示',
        async () => {
          const params = {
            music_id: music_id,
          };
          const { data } = await musicList.delMusic(params);
          if (data) {
            this.$baseMessage('删除成功！', 'success');
            this.getMusicList();

            this.$refs.list.clearSelection();
            this.multipleSelection = [];
          }
        }
      );
    },

    // 删除无资源歌曲
    async delNoResourcesMusics() {
      const { data } = await musicList.delNoResourcesMusics();
      if (data) {
        this.$baseMessage('删除成功！', 'success');
        this.getMusicList();
      }
    },
  },
};

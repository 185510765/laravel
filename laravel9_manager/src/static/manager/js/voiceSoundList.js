import * as voiceSoundList from '@/api/voiceSoundList.js';
import { baseURL } from '@/config';
import store from '@/store';

export default {
  data() {
    return {
      queryForm: {
        voice_type: '',
        searchText: '',
        currentPage: 1,
        pageSize: 10,
      },

      voiceList: [
        { label: '全部', value: '' },
        { label: '提示音', value: 1 },
        { label: '前置音', value: 2 },
        { label: '后置音', value: 3 },
        { label: '背景音', value: 4 },
        { label: '节日祝福', value: 5 },
        { label: '定时语音', value: 6 },
        { label: '基础库语音', value: 7 },
      ],

      list: [],
      total: 0,
      listLoading: false,
      dialog: {
        title: 0,
        visible: false,
      },
      voiceForm: {
        name: '',
        type: 0,
        voice_type: 1,
        file_name: '',
        url: '',
        root_url: '',
        status: 0,
      },
      voiceFormRules: {
        name: [{ required: true, message: '请输入语音名称', trigger: 'blur' }],
      },

      uploadApi: baseURL + '/manager/VoiceSoundList/uploadVoice',
      upload_header: {
        Authorization: store.getters['user/accessToken'],
      },
      fileList: [],

      voiceTypeList: [
        { label: '提示音', value: 1 },
        { label: '前置音', value: 2 },
        { label: '后置音', value: 3 },
        { label: '背景音', value: 4 },
        { label: '节日祝福', value: 5 },
        { label: '定时语音', value: 6 },
        { label: '基础库语音', value: 7 },
      ],
    };
  },
  mounted() {
    this.getVoiceSoundList();
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
      if (row.status == 2) {
        styleObj.color = 'rgba(2, 2, 2, 0.4)';
        return styleObj;
      }
      return '';
    },

    // 获取语音列表
    async getVoiceSoundList() {
      this.listLoading = true;
      const { data } = await voiceSoundList.getVoiceSoundList(this.queryForm);
      this.listLoading = false;
      if (data) {
        this.list = data.list;
        this.total = data.total;
        this.voiceSelectList = data.voiceSelectList;
      }
    },

    // 搜索
    handleQuery() {
      this.queryForm.currentPage = 1;
      this.getVoiceSoundList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getVoiceSoundList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getVoiceSoundList();
    },

    // 状态切换
    async switchToggle(row) {
      const params = {
        id: row.id,
        status: row.status,
      };
      const { data } = await voiceSoundList.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 新增dialog
    showAddVoiceDialog() {
      this.voiceForm = this.$options.data().voiceForm;

      this.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 更换头像 上传前
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (
        file.type !== 'audio/mp3' &&
        file.type !== 'audio/wav' &&
        file.type !== 'audio/wave' &&
        file.type !== 'audio/x-wav' &&
        file.type !== 'audio/mpeg'
      ) {
        this.$message.error('上传语音只能是 MP3,WAV 格式!');
        return;
      }
      if (!isLt2M) {
        this.$message.error('上传语音大小不能超过 3MB!');
        return;
      }
      return file.type && isLt2M;
    },
    // 上传成功
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.$baseMessage('语音上传成功', 'success');
        this.voiceForm.file_name = file.name;
        this.voiceForm.url = res.data.url;
        this.voiceForm.root_url = res.data.root_url;
      } else {
        this.$baseMessage(res.message, 'error');
      }
    },

    // 新增语音
    addVoice() {
      this.$refs['voiceForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await voiceSoundList.addVoice(this.voiceForm);
          if (data) {
            this.$baseMessage('语音添加成功！', 'success');
            this.dialog.visible = false;
            this.getVoiceSoundList();
          }
        } else {
          return false;
        }
      });
    },

    // 删除语音
    delVoice(id) {
      this.$baseConfirm('确定要删除当前语音吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await voiceSoundList.delVoice(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getVoiceSoundList();
        }
      });
    },

    // 修改语音dialog
    showEditVoiceDialog(row) {
      this.voiceForm = Object.assign({}, row);

      this.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 修改
    async editVoice() {
      this.$refs['voiceForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await voiceSoundList.editVoice(this.voiceForm);
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getVoiceSoundList();
          }
        } else {
          return false;
        }
      });
    },
  },
};

import * as voiceSysConfig from '@/api/voiceSysConfig.js';

export default {
  data() {
    return {
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
      voiceForm: {
        voice_name: '',
        voice_describe: '',
        voice_tip: '',
        first_voice: '',
        second_voice: '',
        bg_voice: '',
      },
      voiceFormRules: {
        voice_name: [
          { required: true, message: '请输入语音名称', trigger: 'blur' },
        ],
        voice_describe: [
          { required: true, message: '请输入语音描述', trigger: 'blur' },
        ],
      },

      voiceSelectList: {},
    };
  },
  mounted() {
    this.getVoiceList();
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
    async getVoiceList() {
      this.listLoading = true;
      const { data } = await voiceSysConfig.getVoiceList(this.queryForm);
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
      this.getVoiceList();
    },

    // 页码切换
    currentChange(val) {
      this.queryForm.currentPage = val;
      this.getVoiceList();
    },

    // 每页数量改变
    sizeChange(val) {
      this.queryForm.pageSize = val;
      this.getVoiceList();
    },

    // 新增语音dialog
    showAddDialog() {
      this.voiceForm = this.$options.data().voiceForm;

      this.dialog = {
        title: 0,
        visible: true,
      };

      this.voiceForm.voice_tip = this.voiceSelectList.voice_tip[0].id;
      this.voiceForm.first_voice = this.voiceSelectList.first_voice[0].id;
      this.voiceForm.second_voice = this.voiceSelectList.second_voice[0].id;
      this.voiceForm.bg_voice = this.voiceSelectList.bg_voice[0].id;
    },

    // 新增语音
    async addVoiceSysConfigSubmit() {
      this.$refs['voiceForm'].validate(async (valid) => {
        if (valid) {
          const { data } = await voiceSysConfig.addVoiceSysConfigSubmit(
            this.voiceForm
          );
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('语音添加成功！', 'success');
            this.getVoiceList();
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
        const { data } = await voiceSysConfig.delVoice(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getVoiceList();
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
          const { data } = await voiceSysConfig.editVoice(this.voiceForm);
          if (data) {
            this.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getVoiceList();
          }
        } else {
          return false;
        }
      });
    },
  },
};

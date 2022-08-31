import * as goodsList from '@/api/goodsList.js';
import { isEmpty } from '@/utils/common.js';
import * as rule from '@/utils/rule.js';

export default {
  data() {
    return {
      index: {
        queryForm: {
          searchText: '',
          currentPage: 1,
          pageSize: 10,
          field: '',
          order: '',
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
          img: '',
          price: 0,
          is_limit: 0,
          stock: 0,
        },
        formRules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入标价', trigger: 'blur' },
            // { validator: rule.checkNum, trigger: 'blur' },
          ],
        },

        imageGoodsList: [],
      },

      imageList: [],
      dialogVisible: false,
      dialogImageUrl: '',
    };
  },
  mounted() {
    this.getGoodsList();
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

    // 获取商品列表
    async getGoodsList() {
      this.index.listLoading = true;
      const { data } = await goodsList.getGoodsList(this.index.queryForm);
      this.index.listLoading = false;
      if (data) {
        this.index.list = data.list;
        this.index.total = data.total;

        // 图片大图预览 imageGoodsList
        this.index.list.forEach((element) => {
          if (!isEmpty(element.goods_img)) {
            this.index.imageGoodsList.push(element.goods_img);
          }
        });
      }
    },

    // 搜索
    index_handleQuery() {
      this.index.queryForm.currentPage = 1;
      this.getGoodsList();
    },

    // 页码切换
    index_currentChange(val) {
      this.index.queryForm.currentPage = val;
      this.getGoodsList();
    },

    // 每页数量改变
    index_sizeChange(val) {
      this.index.queryForm.pageSize = val;
      this.getGoodsList();
    },

    // 表格字段后端排序
    tableSortChange(res) {
      // console.log(res);

      const { column, order, prop } = res;

      this.index.queryForm.field = prop;
      this.index.queryForm.order = order;

      this.getGoodsList();
    },

    // 排序
    async sort(id, sort) {
      const params = {
        id: id,
        sort: sort,
      };
      const { data } = await goodsList.sort(params);
      if (data) {
        this.$baseMessage('排序成功！', 'success');
        this.getGoodsList();
      }
    },

    // 虚拟商品
    async switchToggleVirtualGoods(row) {
      const params = {
        id: row.id,
        is_virtual_goods: row.is_virtual_goods,
      };
      const { data } = await goodsList.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
    },

    // 上下架
    async switchToggle(row) {
      const params = {
        id: row.id,
        is_shelf: row.is_shelf,
      };
      const { data } = await goodsList.switchToggle(params);
      if (data) {
        this.$baseMessage('切换成功！', 'success');
      }
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
        this.$baseMessage('图片上传成功', 'success');
        this.index.form.img = data.imgName;
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      this.index.form.img = '';
    },

    // 新增商品dialog
    showAddGoodsDialog() {
      this.index.form = this.$options.data().index.form;

      this.index.dialog = {
        title: 0,
        visible: true,
      };
    },

    // 新增
    addGoods() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await goodsList.addGoods(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('商品添加成功！', 'success');
            this.getGoodsList();
          }
        } else {
          return false;
        }
      });
    },

    closeDialog() {
      this.imageList = [];
    },

    // 删除
    delGoods(id) {
      this.$baseConfirm('确定要删除当前商品吗？', '删除提示', async () => {
        const params = {
          id: id,
        };
        const { data } = await goodsList.delGoods(params);
        if (data) {
          this.$baseMessage('删除成功！', 'success');
          this.getGoodsList();
        }
      });
    },

    // 编辑dialog
    showEditGoodsDialog(row) {
      this.index.form = Object.assign({}, row);

      if (!isEmpty(row.goods_img)) {
        this.imageList.push({
          name: row.goods_img,
          url: row.goods_img,
        });
      }

      this.index.dialog = {
        title: 1,
        visible: true,
      };
    },

    // 编辑
    editGoods() {
      this.$refs['index.form'].validate(async (valid) => {
        if (valid) {
          const { data } = await goodsList.editGoods(this.index.form);
          if (data) {
            this.index.dialog.visible = false;
            this.$baseMessage('编辑成功！', 'success');
            this.getGoodsList();
          }
        } else {
          return false;
        }
      });
    },
  },
};

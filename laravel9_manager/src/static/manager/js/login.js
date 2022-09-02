import { isPassword } from '@/utils/validate';
import * as rule from '@/utils/rule.js';

import axios from 'axios';
import { baseURL } from '@/config';
import * as login from '@/api/login.js';

export default {
  name: 'Login',
  directives: {
    focus: {
      inserted(el) {
        el.querySelector('input').focus();
      },
    },
  },
  data() {
    return {
      nodeEnv: process.env.NODE_ENV,
      title: this.$baseTitle,
      form: {
        username: '',
        password: '',
        code: '',
        uuid: '',
        key: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: rule.checkUserName, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: rule.checkPwd, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: rule.checkCodeLength, trigger: 'blur' },
        ],
      },
      captcha: '',
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || '/';
      },
      immediate: true,
    },
  },
  created() {
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    document.body.style.overflow = 'auto';
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    handlePassword() {
      this.passwordType === 'password'
        ? (this.passwordType = '')
        : (this.passwordType = 'password');
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    // 获取验证码
    async getCaptcha() {
      const { data } = await login.getCaptcha();
      if (data) {
        this.form.key = data.key;
        this.captcha = data.img;
      }

      // axios
      //   .get(baseURL + '/manager/SysUser/getCaptcha', {
      //     responseType: 'arraybuffer',
      //   })
      //   .then((res) => {
      //     this.form.uuid = res.headers.uuid; // 验证码uuid

      //     // 把二进制流转为base64
      //     return (
      //       'data:image/jpeg;base64,' +
      //       btoa(
      //         new Uint8Array(res.data).reduce(
      //           (data, byte) => data + String.fromCharCode(byte),
      //           ''
      //         )
      //       )
      //     );
      //   })
      //   .then((data) => {
      //     this.captcha = data;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },

    // 登录
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.form)
            .then(() => {
              const routerPath =
                this.redirect === '/404' || this.redirect === '/401'
                  ? '/'
                  : this.redirect;
              this.$router.push(routerPath).catch(() => {});
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
              this.getCaptcha(); // 刷新验证码
            });
        } else {
          return false;
        }
      });
    },
  },
};

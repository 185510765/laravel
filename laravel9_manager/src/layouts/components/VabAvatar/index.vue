<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <el-avatar class="userinfo_avatar">
        {{ username | substrNameFirst }}
      </el-avatar>
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { recordRoute } from '@/config';
  import { isEmpty } from '@/utils/common.js';

  export default {
    name: 'VabAvatar',
    filters: {
      // 截取字符串第一个字符 用户名称显示
      substrNameFirst(username) {
        return !isEmpty(username) ? username.substr(0, 1) : '';
      },
    },
    data() {
      return {
        // username: this.$store.state.user.username,
      };
    },
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    mounted() {},
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.logout();
            break;
          case 'personalCenter':
            this.personalCenter();
            break;
          case 'github':
            window.open('https://github.com/chuzhixin/vue-admin-beautiful');
            break;
          case 'gitee':
            window.open('https://gitee.com/chu1204505056/vue-admin-beautiful');
            break;
          case 'pro':
            window.open(
              'https://chu1204505056.gitee.io/admin-pro/?hmsr=homeAd&hmpl=&hmcu=&hmkw=&hmci='
            );
            break;
          case 'plus':
            window.open(
              'https://chu1204505056.gitee.io/admin-plus/?hmsr=homeAd&hmpl=&hmcu=&hmkw=&hmci='
            );
        }
      },
      personalCenter() {
        this.$router.push('/personalCenter/personalCenter');
      },
      logout() {
        this.$baseConfirm(
          '您确定要退出' + this.$baseTitle + '吗?',
          null,
          async () => {
            await this.$store.dispatch('user/logout');
            if (recordRoute) {
              const fullPath = this.$route.fullPath;
              // this.$router.push(`/login?redirect=${fullPath}`);
            } else {
              this.$router.push('/login');
            }
          }
        );
      },
    },
  };
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 50px;
    padding: 0;

    .user-avatar {
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      margin-left: 5px;
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .userinfo_avatar {
    display: block;
    float: left;
    width: 36px;
    height: 36px;
    font-size: 16px;
    line-height: 36px;
    background: #8666cd;
    margin-right: 5px;
  }
</style>

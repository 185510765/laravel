<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert v-if="noticeList[0]" :closable="noticeList[0].closable">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <a
              target="_blank"
              href="https://github.com/chuzhixin/vue-admin-beautiful"
            >
              <img
                style="margin-right: 10px"
                src="https://img.shields.io/github/stars/chuzhixin/vue-admin-beautiful?style=flat-square&label=Stars&logo=github"
              />
            </a>
            <p v-html="noticeList[0].title"></p>
          </div>
        </el-alert>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span style="font-size: 16px; font-weight: bold">用户新增数</span>
          </div>
          <vab-chart autoresize theme="vab-echarts-theme" :option="sqs" />
          <div class="bottom">
            <span style="float: left" class="botton-span">
              本周新增：{{ thisWeekCount }}
            </span>
            <span style="float: right" class="botton-span">
              累积新增：{{ thisMonthCount }}
            </span>
          </div>
        </el-card>
      </el-col>

      <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :xs="3"
        :sm="3"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <el-card class="icon-panel" shadow="never">
          <p
            style="
              font-size: 46px;
              font-weight: bold;
              margin-top: 0 !important;
              color: #409eff;
            "
          >
            {{ item.num }}
          </p>
          <p style="font-size: 16px; font-weight: bold">{{ item.title }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts';
  import { dependencies, devDependencies } from '../../../package.json';
  import { getList } from '@/api/changeLog';
  import { getNoticeList } from '@/api/notice';
  // import { getRepos, getStargazers } from '@/api/github';
  // import Plan from './components/Plan';
  // import VersionInformation from './components/VersionInformation';

  import * as index from '@/api/index';

  export default {
    name: 'Index',
    components: {
      VabChart,
      // Plan,
      // VersionInformation,
    },
    data() {
      return {
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        config1: {
          startVal: 0,
          endVal: this.$baseLodash.random(20000, 60000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config2: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config3: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },

        //访问量
        fwl: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '访问量',
              type: 'line',
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },

        thisWeekCount: 0,
        thisMonthCount: 0,

        //授权数
        sqs: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              /*boundaryGap: false,*/
              // data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '新增数',
              type: 'bar',
              barWidth: '60%',
              // data: [10, 52, 20, 33, 39, 33, 22],
              data: [],
              // label: {
              // normal: {
              label: {
                show: true, //开启显示
                position: 'insideTop', //在上方显示
                formatter: function (params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return '';
                  }
                },
                // textStyle: {
                //   //数值样式
                //   // color: 'black',
                //   fontSize: 12,
                // },
              },
              // },
              // },
            },
          ],
        },

        // //授权数
        // sqs: {
        //   grid: {
        //     top: '4%',
        //     left: '2%',
        //     right: '4%',
        //     bottom: '0%',
        //     containLabel: true,
        //   },
        //   xAxis: [
        //     {
        //       type: 'category',
        //       /*boundaryGap: false,*/
        //       data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
        //       axisTick: {
        //         alignWithLabel: true,
        //       },
        //     },
        //   ],
        //   yAxis: [
        //     {
        //       type: 'value',
        //     },
        //   ],
        //   series: [
        //     {
        //       name: '授权数',
        //       type: 'bar',
        //       barWidth: '60%',
        //       data: [10, 52, 20, 33, 39, 33, 22],
        //     },
        //   ],
        // },

        //词云
        cy: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
          },
          series: [
            {
              type: 'wordCloud',
              gridSize: 15,
              sizeRange: [12, 40],
              rotationRange: [0, 0],
              width: '100%',
              height: '100%',
              textStyle: {
                normal: {
                  color() {
                    const arr = [
                      '#5470c6',
                      '#91cc75',
                      '#fac858',
                      '#ee6666',
                      '#73c0de',
                      '#975FE5',
                    ];
                    let index = Math.floor(Math.random() * arr.length);
                    return arr[index];
                  },
                },
              },
              data: [
                {
                  name: 'vue-admin-beautiful',
                  value: 15000,
                },
                {
                  name: 'element',
                  value: 10081,
                },
                {
                  name: 'beautiful',
                  value: 9386,
                },

                {
                  name: 'vue',
                  value: 6500,
                },
                {
                  name: 'chuzhixin',
                  value: 6000,
                },
                {
                  name: 'good',
                  value: 4500,
                },
                {
                  name: 'success',
                  value: 3800,
                },
                {
                  name: 'never',
                  value: 3000,
                },
                {
                  name: 'boy',
                  value: 2500,
                },
                {
                  name: 'girl',
                  value: 2300,
                },
                {
                  name: 'github',
                  value: 2000,
                },
                {
                  name: 'hbuilder',
                  value: 1900,
                },
                {
                  name: 'dcloud',
                  value: 1800,
                },
                {
                  name: 'china',
                  value: 1700,
                },
                {
                  name: '1204505056',
                  value: 1600,
                },
                {
                  name: '972435319',
                  value: 1500,
                },
                {
                  name: 'young',
                  value: 1200,
                },
                {
                  name: 'old',
                  value: 1100,
                },
                {
                  name: 'vuex',
                  value: 900,
                },
                {
                  name: 'router',
                  value: 800,
                },
                {
                  name: 'money',
                  value: 700,
                },
                {
                  name: 'qingdao',
                  value: 800,
                },
                {
                  name: 'yantai',
                  value: 9000,
                },
                {
                  name: 'author is very cool',
                  value: 9200,
                },
              ],
            },
          ],
        },

        //更新日志
        reverse: true,
        activities: [],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,
        //卡片图标
        iconList: [
          // {
          //   icon: 'video',
          //   title: '视频播放器',
          //   link: '/vab/player',
          //   color: '#ffc069',
          // },
          // {
          //   icon: 'table',
          //   title: '表格',
          //   link: '/vab/table/comprehensiveTable',
          //   color: '#5cdbd3',
          // },
          // {
          //   icon: 'laptop-code',
          //   title: '源码',
          //   link: 'https://github.com/chuzhixin/vue-admin-beautiful',
          //   color: '#b37feb',
          // },
          // {
          //   icon: 'book',
          //   title: '书籍',
          //   link: '',
          //   color: '#69c0ff',
          // },
          // {
          //   icon: 'bullhorn',
          //   title: '公告',
          //   link: '',
          //   color: '#ff85c0',
          // },
          // {
          //   icon: 'gift',
          //   title: '礼物',
          //   link: '',
          //   color: '#ffd666',
          // },
          // {
          //   icon: 'balance-scale-left',
          //   title: '公平的世界',
          //   link: '',
          //   color: '#ff9c6e',
          // },
          // {
          //   icon: 'coffee',
          //   title: '休息一下',
          //   link: '',
          //   color: '#95de64',
          // },
        ],
      };
    },
    created() {
      // this.fetchData();
    },
    beforeDestroy() {
      // clearInterval(this.timer);
    },
    mounted() {
      this.getInitData();
      // this.timer = setInterval(() => {
      //   this.getInitData();
      // }, 30000);

      let base = +new Date(2020, 1, 1);
      let oneDay = 24 * 3600 * 1000;
      let date = [];

      let data = [Math.random() * 1500];
      let now = new Date(base);

      const addData = (shift) => {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
        date.push(now);
        data.push(this.$baseLodash.random(20000, 60000));

        if (shift) {
          date.shift();
          data.shift();
        }

        now = new Date(+new Date(now) + oneDay);
      };

      for (let i = 1; i < 6; i++) {
        addData();
      }
      addData(true);
      this.fwl.xAxis[0].data = date;
      this.fwl.series[0].data = data;
      this.timer = setInterval(() => {
        addData(true);
        this.fwl.xAxis[0].data = date;
        this.fwl.series[0].data = data;
      }, 3000);
    },
    methods: {
      // 获取初始数据
      async getInitData() {
        const { data } = await index.getInitData();
        if (data) {
          this.sqs.xAxis[0].data = data.thisWeekDateAry;
          this.sqs.series[0].data = data.thisWeekDataAry;
          this.thisWeekCount = data.thisWeekCount;
          this.thisMonthCount = data.thisMonthCount;

          this.iconList = data.dataList;
        }
      },

      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`);
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme');
      },
      async fetchData() {
        const { data } = await getList();
        data.map((item, index) => {
          if (index === data.length - 1) {
            item.color = '#0bbd87';
          }
        });
        this.activities = data;
        const res = await getNoticeList();
        this.noticeList = res.data;
        /* getRepos({
        token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
      }).then((res) => {
        const per_page = Math.ceil(res.data.stargazers_count / 100);
        alert(per_page);
        getStargazers({
          token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
          page: 1,
          per_page: res.per_page,
        }).then((res) => {
          alert(JSON.stringify(res));
        });
      }); */
      },
    },
  };
</script>

<style scoped>
  .botton-span {
    display: inline-block;
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: bold;
    /* height: 36px;
    line-height: 36px; */
  }
</style>

<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }

      .el-card__body {
        .echarts {
          width: 100%;
          height: 115px;
        }
      }
    }

    .card {
      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 305px;
          }
        }
      }
    }

    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }

    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        min-height: 20px;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }

    .icon-panel {
      height: 117px;
      text-align: center;
      cursor: pointer;

      svg {
        font-size: 40px;
      }

      p {
        margin-top: 10px;
      }
    }

    .bottom-btn {
      button {
        margin: 5px 10px 15px 0;
      }
    }
  }
</style>

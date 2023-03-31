<template>
  <div class="table-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">矿工设置</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="miner.btnLoading"
              @click="minerSave()"
            >
              保存
            </el-button>
          </div>
          <el-form
            ref="miner.form"
            :model="miner.form"
            :rules="miner.formRules"
            label-width="180px"
          >
            <el-form-item
              label="招募1个矿工(每天变化)"
              prop="each_miner_integral"
            >
              <el-input
                v-model="miner.form.each_miner_integral"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">花币</span>
            </el-form-item>
            <el-form-item label="矿工招募价格范围(花币)">
              <el-input
                v-model="miner.form.miner_integral_range.min"
                style="width: 42%"
              ></el-input>
              <span style="margin: 0 8px">~</span>
              <el-input
                v-model="miner.form.miner_integral_range.max"
                style="width: 42%"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="劝降1个矿工"
              prop="miner_surrender_need_integral"
            >
              <el-input
                v-model="miner.form.miner_surrender_need_integral"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">花币</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">招募矿工概率、矿工属性</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="miner_config.btnLoading"
              @click="minerConfigSave()"
            >
              保存
            </el-button>
          </div>
          <el-table :data="miner_config.list" style="width: 100%">
            <el-table-column
              prop="color"
              label="颜色"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              prop="rate"
              label="概率(千分之)"
              align="center"
              min-width="16%"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.rate"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="color"
              label="属性得分之和"
              align="center"
              min-width="30%"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.min"
                  placeholder="最小值"
                  style="width: 30%"
                ></el-input>
                <span style="margin: 0 8px">~</span>
                <el-input
                  v-model="scope.row.max"
                  placeholder="最大值"
                  style="width: 30%"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">矿工属性范围</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="miner_attribute.btnLoading"
              @click="minerAttrSave()"
            >
              保存
            </el-button>
          </div>
          <el-row class="row-style" style="border-bottom: solid 1px #eee">
            <el-col :span="4" style="text-align: left">类型</el-col>
            <el-col :span="4">1</el-col>
            <el-col :span="4">2</el-col>
            <el-col :span="4">3</el-col>
            <el-col :span="4">4</el-col>
            <el-col :span="4">5</el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="4" style="text-align: left">力量</el-col>
            <el-col
              v-for="(item, index) in miner_attribute.list[0]"
              :key="index"
              :span="4"
            >
              <el-input v-model="item.min" style="width: 40%"></el-input>
              <span>~</span>
              <el-input v-model="item.max" style="width: 40%"></el-input>
            </el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="4" style="text-align: left">速度(min)</el-col>
            <el-col
              v-for="(item, index) in miner_attribute.list[1]"
              :key="index"
              :span="4"
            >
              <el-input v-model="item.minutes" style="width: 88%"></el-input>
            </el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="4" style="text-align: left">潜行(%)</el-col>
            <el-col
              v-for="(item, index) in miner_attribute.list[2]"
              :key="index"
              :span="4"
            >
              <el-input v-model="item.min" style="width: 40%"></el-input>
              <span>~</span>
              <el-input v-model="item.max" style="width: 40%"></el-input>
            </el-col>
          </el-row>
          <el-row class="row-style">
            <el-col :span="4" style="text-align: left">幸运(%)</el-col>
            <el-col
              v-for="(item, index) in miner_attribute.list[3]"
              :key="index"
              :span="4"
            >
              <el-input v-model="item.min" style="width: 40%"></el-input>
              <span>~</span>
              <el-input v-model="item.max" style="width: 40%"></el-input>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">猎犬设置</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="dog.btnLoading"
              @click="dogSave()"
            >
              保存
            </el-button>
          </div>
          <el-form
            ref="dog.form"
            :model="dog.form"
            :rules="dog.formRules"
            label-width="180px"
          >
            <el-form-item label="买1只猎犬" prop="buy_dog_integral">
              <el-input
                v-model="dog.form.buy_dog_integral"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">花币</span>
            </el-form-item>
            <el-form-item label="猎犬第1次抓人" prop="dog_first_times_rate">
              <el-input
                v-model="dog.form.dog_first_times_rate"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">百分之</span>
            </el-form-item>
            <el-form-item label="猎犬第2次抓人" prop="dog_many_times_rate">
              <el-input
                v-model="dog.form.dog_many_times_rate"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">百分之</span>
            </el-form-item>
            <el-form-item label="猎犬警觉状态时间(小时)">
              <el-input
                v-model="dog.form.dog_status_expire_time.min"
                style="width: 42%"
              ></el-input>
              <span style="margin: 0 8px">~</span>
              <el-input
                v-model="dog.form.dog_status_expire_time.max"
                style="width: 42%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">矿石定价范围、挖出概率</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="ore.btnLoading"
              @click="oreSave()"
            >
              保存
            </el-button>
          </div>
          <el-table :data="ore.list" style="width: 100%">
            <el-table-column
              prop="name"
              label="名称"
              min-width="10%"
            ></el-table-column>
            <el-table-column
              prop="range"
              label="定价范围(花币)"
              align="center"
              min-width="30%"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.sale_price_min"
                  placeholder="最小值"
                  style="width: 40%"
                ></el-input>
                <span style="margin: 0 8px">~</span>
                <el-input
                  v-model="scope.row.sale_price_max"
                  placeholder="最大值"
                  style="width: 40%"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="mining_rate"
              label="挖出概率(%)"
              align="center"
              min-width="14%"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.mining_rate"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">当前矿石卖价</span>
            <!-- <el-button
              class="card-header-button"
              type="primary"
              :loading="nowOrePrice.btnLoading"
              @click="nowOrePriceSave()"
            >
              保存
            </el-button> -->
          </div>
          <el-table :data="nowOrePrice.list" style="width: 100%">
            <el-table-column
              prop="name"
              label="名称"
              min-width="10%"
            ></el-table-column>
            <el-table-column
              prop="sale_price"
              label="价格(花币)"
              align="center"
              min-width="14%"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.sale_price" disabled></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">修改矿石卖价时间点</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="oreSaleTime.btnLoading"
              @click="oreSaleTimeSave()"
            >
              保存
            </el-button>
          </div>
          <div
            v-for="(item, index) in oreSaleTime.array"
            :key="index"
            style="margin: 10px 0"
          >
            <el-time-picker
              v-model="oreSaleTime.array[index]"
              value-format="timestamp"
              format="HH:mm"
            ></el-time-picker>
            <i
              v-if="index == 0"
              class="el-icon-circle-plus iconfon-style"
              style="color: #67c23a"
              @click="addTime()"
            ></i>
            <i
              v-else
              class="el-icon-remove iconfon-style"
              style="color: #f56c6c"
              @click="delTime(index)"
            ></i>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">花样币设置</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="huayangbi.btnLoading"
              @click="huayangbiSave()"
            >
              保存
            </el-button>
          </div>
          <el-form
            ref="huayangbi.form"
            :model="huayangbi.form"
            :rules="huayangbi.formRules"
            label-width="180px"
          >
            <el-form-item
              label="每天挖取花样币限额"
              prop="every_day_flowers_coin_num"
            >
              <el-input
                v-model="huayangbi.form.every_day_flowers_coin_num"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">个</span>
            </el-form-item>
            <el-form-item
              label="橙色矿工偷到花样币概率"
              prop="orange_miner_dig_rate"
            >
              <el-input
                v-model="huayangbi.form.orange_miner_dig_rate"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">千分之</span>
            </el-form-item>
            <el-form-item label="花样币发行总数量" prop="max_num_flowers_coin">
              <el-input
                v-model="huayangbi.form.max_num_flowers_coin"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">个</span>
            </el-form-item>
            <el-form-item
              label="已挖取到的花样币数量"
              prop="has_been_dig_flowers_coin_num"
            >
              <el-input
                v-model="huayangbi.form.has_been_dig_flowers_coin_num"
                style="width: 60%"
                disabled
              ></el-input>
              <span style="margin-left: 8px">个</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">花样币挖取概率</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="huayangbiDigRate.btnLoading"
              @click="huayangbiDigRateSave()"
            >
              保存
            </el-button>
          </div>
          <el-table :data="huayangbiDigRate.list" style="width: 100%">
            <el-table-column prop="color" label="矿工等级">
              <template slot-scope="scope">
                <span v-if="scope.row.level == 0">未挖到</span>
                <span v-else>{{ scope.row.color }}矿工</span>
              </template>
            </el-table-column>
            <el-table-column prop="rate" label="概率(万分之)" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.level == 0">
                  {{ huayangbiDigRate.noDigRate }}
                </span>
                <el-input
                  v-else
                  v-model="scope.row.rate"
                  @change="calcRateRes()"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">摸金设置</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="touchGold.btnLoading"
              @click="touchGoldSave()"
            >
              保存
            </el-button>
          </div>
          <el-form
            ref="touchGold.form"
            :model="touchGold.form"
            :rules="touchGold.formRules"
            label-width="180px"
          >
            <el-form-item label="搜索可偷取的矿场" prop="search_user_integral">
              <el-input
                v-model="touchGold.form.search_user_integral"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">花币</span>
            </el-form-item>
            <el-form-item
              label="一次搜索显示多少个用户"
              prop="search_display_user_count"
            >
              <el-input
                v-model="touchGold.form.search_display_user_count"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">个</span>
            </el-form-item>
            <el-form-item
              label="每天最多搜索多少次"
              prop="search_max_day_times"
            >
              <el-input
                v-model="touchGold.form.search_max_day_times"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">次</span>
            </el-form-item>
            <el-form-item label="抓住矿工未操作时间" prop="miner_expire_time">
              <el-input
                v-model="touchGold.form.miner_expire_time"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">小时</span>
            </el-form-item>
            <el-form-item label="系统随机赎金范围(花币)">
              <el-input
                v-model="touchGold.form.ransom_integral_range.min"
                style="width: 40%"
              ></el-input>
              <span style="margin: 0 8px">~</span>
              <el-input
                v-model="touchGold.form.ransom_integral_range.max"
                style="width: 40%"
              ></el-input>
              <!-- <span style="margin-left: 8px">花币</span> -->
            </el-form-item>
            <el-form-item
              label="用户待提交赎金时间"
              prop="miner_ransom_expire_time"
            >
              <el-input
                v-model="touchGold.form.miner_ransom_expire_time"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">小时</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">矿工回收价格设置</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="miner_recycle_config.btnLoading"
              @click="minerRecycleSave()"
            >
              保存
            </el-button>
          </div>
          <el-table :data="miner_recycle_config.list" style="width: 100%">
            <el-table-column
              prop="color"
              label="颜色"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              prop="color"
              label="回收价格范围"
              align="center"
              min-width="30%"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.min"
                  placeholder="最小值"
                  style="width: 30%"
                ></el-input>
                <span style="margin: 0 8px">~</span>
                <el-input
                  v-model="scope.row.max"
                  placeholder="最大值"
                  style="width: 30%"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <!-- <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">通用设置</span>
            <el-button
              class="card-header-button"
              type="primary"
              :loading="general.btnLoading"
              @click="generalSave()"
            >
              保存
            </el-button>
          </div>
          <el-form
            ref="general.form"
            :model="general.form"
            :rules="general.formRules"
            label-width="180px"
          ></el-form>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script src="@/static/manager/js/sysConfig.js"></script>

<style scoped>
  .card-header-button {
    float: right;
    position: relative;
    top: -7px;
  }

  .header-text {
    font-size: 16px;
    font-weight: bold;
  }

  .row-style {
    text-align: center;
    height: 49px;
    line-height: 49px;
  }

  .iconfon-style {
    font-size: 24px;
    cursor: pointer;
    margin-left: 8px;
    position: relative;
    top: 4px;
  }
</style>

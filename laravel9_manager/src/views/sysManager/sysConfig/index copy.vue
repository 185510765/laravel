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
            <el-form-item label="招募1个矿工" prop="each_miner_integral">
              <el-input
                v-model="miner.form.each_miner_integral"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">花币</span>
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

      <el-col :span="9">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">招募矿工概率</span>
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
              align="center"
              min-width="10%"
            ></el-table-column>
            <el-table-column
              prop="rate"
              label="概率(千分之)"
              align="center"
              min-width="10%"
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

      <el-col :span="9">
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
          <el-table :data="miner_attribute.transList" style="width: 100%">
            <el-table-column
              prop="attr_name"
              label="属性"
              align="center"
            ></el-table-column>
            <el-table-column prop="" label="1" align="center"></el-table-column>
            <el-table-column prop="" label="2" align="center"></el-table-column>
            <el-table-column prop="" label="3" align="center"></el-table-column>
            <el-table-column prop="" label="4" align="center"></el-table-column>
            <el-table-column prop="" label="5" align="center"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="header-text">看门狗设置</span>
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
            <el-form-item label="买1只看门狗" prop="buy_dog_integral">
              <el-input
                v-model="dog.form.buy_dog_integral"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">花币</span>
            </el-form-item>
            <el-form-item label="看门狗第1次抓人" prop="dog_first_times_rate">
              <el-input
                v-model="dog.form.dog_first_times_rate"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">百分之</span>
            </el-form-item>
            <el-form-item label="看门狗第2次抓人" prop="dog_many_times_rate">
              <el-input
                v-model="dog.form.dog_many_times_rate"
                style="width: 60%"
              ></el-input>
              <span style="margin-left: 8px">百分之</span>
            </el-form-item>
          </el-form>
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
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
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
</style>

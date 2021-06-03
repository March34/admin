<template>
  <div class="count-to">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数字原地滚动</span>
          </div>
          <!-- 数字原地滚动 -->
          <count-to :start-val="setStartVal" :end-val="setEndVal" :duration="setDuration" :decimals="setDecimals" :separator="setSeparator" :prefix="setPrefix" :suffix="setSuffix" :autoplay="true" class="example" />
          <aside>&lt;count-to :start-val=&#x27;{{ setStartVal }}&#x27; :end-val=&#x27;{{ setEndVal }}&#x27; :duration=&#x27;{{ setDuration }}&#x27; :decimals=&#x27;{{ setDecimals }}&#x27; :separator=&#x27;{{ setSeparator }}&#x27; :prefix=&#x27;{{ setPrefix }}&#x27; :suffix=&#x27;{{ setSuffix }}&#x27; :autoplay=true&gt;/count-to&gt;</aside>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数字向上滚动</span>
          </div>
          <!-- 数字向上滚动 -->
          <div class="scroll-div">
            <scroll-num value="641,62" />
            <aside>&lt;scroll-num :value=&#x27;641,62&#x27;&gt;&lt;/scroll-num&gt;</aside>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>充电式</span>
          </div>
          <!-- 充电式 -->
          <div class="mis-charge">
            <mis-charge :start-val="startVal" :end-val="endVal" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'CountToDemo',
  components: { countTo },
  data() {
    return {
      setStartVal: 0, // 起始值
      setEndVal: 2020, // 结束值
      setDuration: 2000, // 时长
      setDecimals: 0, // 保留小数
      setSeparator: ',', // 数字分隔符
      setSuffix: ' rmb', // 后置
      setPrefix: '¥ ', // 前置

      startVal: 0,
      endVal: 20
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.example {
	color: $baseColor;
	display: block;
	margin: 100px 0;
	text-align: center;
	font-size: 60px;
}
.scroll-div {
	margin: 80px auto;
	text-align: center;
	aside {
		margin-top: 80px;
	}
}
.mis-charge {
	.content {
		background-color: transparent;
	}
}
</style>

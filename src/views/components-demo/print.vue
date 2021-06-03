<template>
  <div class="printHtml">
    <el-button type="primary" @click="printFun">打印</el-button>
    <div id="printContent" ref="printContent" class="printContent print">
      <table>
        <template v-for="(item, index) in tableData">
          <tr v-if="index < 40" :key="index">
            <td>{{ item.id }}</td>
            <td width="120">{{ item.date }}</td>
            <td width="80">{{ item.name }}</td>
            <td>{{ item.address }}</td>
          </tr>
        </template>
      </table>
      <div id="myChart" class="details-chart" @resize="onResize" />
    </div>
  </div>
</template>

<script>
import Print from '@/utils/printarea'

export default {
  name: 'Print',
  data() {
    return {
      chartBase64: null,
      tableData: [{
        id: '1',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路 1518 '
      }, {
        id: '2',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '3',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '4',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '5',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '6',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '7',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '8',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '9',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '10',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '11',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '12',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '13',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '14',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '15',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '16',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '17',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '18',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '19',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '20',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '21',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '22',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '23',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '24',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '25',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '26',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '27',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '28',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '29',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '30',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '31',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '32',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }, {
        id: '33',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 '
      }, {
        id: '34',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 '
      }, {
        id: '35',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 '
      }, {
        id: '36',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 '
      }]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    printFun() {
      new Print({
        ids: '#printContent', // * 局部打印必传入id
        endCallback() { // 调用打印之后的回调事件

        }
      })
    },
    onResize() {
      this.initChart('myChart') // 自适应
    },
    initChart() {
      const myChartEle = this.$echarts.init(document.getElementById('myChart'))
      const option = {
        calculable: true,
        grid: {
          left: '0',
          right: '0',
          bottom: '30',
          top: '30',
          containLabel: true
        },
        textStyle: {
          fontFamily: ['FangSong', 'SimSun', 'STFangsong', 'NSimSun']
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              textStyle: {
                fontSize: 16
              }
            },
            data: ['石家庄', '廊坊', '邯郸', '保定', '沧州']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: 16
              }
            }
          }
        ],
        series: [
          {
            name: '检测发布数',
            type: 'bar',
            barWidth: 35,
            data: [50, 60, 90, 230, 250]

          },
          {
            name: '有害文章',
            type: 'bar',
            barWidth: 35,
            data: [20, 50, 60, 210, 230]
          }
        ]
      }
      myChartEle.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.print {
	table {
		border-spacing: 0;
		border-collapse: collapse;
		td {
			border: 1px solid #888;
			padding: 10px 14px;
			color: #000;
			text-align: center;
			font-size: 16px;
		}
	}
	.details-chart {
		height: 400px;
		width: 100%;
	}
}
</style>

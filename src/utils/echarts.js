// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core"
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from "echarts/charts"
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { TooltipComponent, DataZoomComponent, GridComponent, TitleComponent } from "echarts/components"
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers"

echarts.use([LineChart, TitleComponent, TooltipComponent, DataZoomComponent, GridComponent, CanvasRenderer])

export default echarts

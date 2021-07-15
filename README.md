# teethb
这里是生医小学期生产实习的项目。

### pages/cal/cal
日历页，包含日历和条形图组件
日历：components/calendar/index
每月刷牙分数标注所需数据为page.data.toSet，在`afterCalendarRender`（日历初次渲染完成）和`whenChangeMonth`（划动或点击改变当前展示年月）时应触发获取数据（后端的锅，俺还没写）
条形图：components/ec-canvas/ec-canvas
已选日期所在周的早晚刷牙时间amData和pmData，因为不会传参就设为了全局，后续可以优化。在`afterCalendarRender`（日历初次渲染完成）和`afterTapDate`（点击某日期）时应触发获取数据（后端的锅，俺还没写）

import 'package:bezier_chart/bezier_chart.dart';
import 'package:dataset_web/objects/facility.dart';
import 'package:flutter/material.dart';

class DisneyShanghaiCard extends StatelessWidget {
  final Facility facility;

  DisneyShanghaiCard({@required this.facility});

  @override
  Widget build(BuildContext context) {
    final int len = facility.history.lastWeek.length;
    final fromDate = DateTime.now().subtract(Duration(days: len - 1));
    final toDate = DateTime.now();

    List<DataPoint> data = [];
    var i = 0;

    for (var d in facility.history.lastWeek) {
      data.add(
        DataPoint<DateTime>(
          value: d?.roundToDouble() ?? 0,
          xAxis: fromDate.add(
            Duration(days: i),
          ),
        ),
      );
      i++;
    }

    return Card(
      clipBehavior: Clip.antiAliasWithSaveLayer,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Stack(
        children: [
          BezierChart(
              bezierChartScale: BezierChartScale.WEEKLY,
              config: BezierChartConfig(
                displayYAxis: true,
                verticalIndicatorStrokeWidth: 3.0,
                verticalIndicatorColor: Colors.black26,
                showVerticalIndicator: true,
                backgroundColor: Colors.blue,
                snap: false,
                startYAxisFromNonZeroValue: true,
              ),
              fromDate: fromDate,
              toDate: toDate,
              series: [
                BezierLine(
                  data: data,
                )
              ]),
          Align(
            alignment: Alignment.topCenter,
            child: Text(
              facility.name,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
              ),
            ),
          )
        ],
      ),
    );
  }
}

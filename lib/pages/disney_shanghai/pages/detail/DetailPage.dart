import 'package:bezier_chart/bezier_chart.dart';
import 'package:dataset_web/model/ShanghaiDisneyModel.dart';
import 'package:dataset_web/objects/facility.dart';
import 'package:dataset_web/objects/facilityDetail.dart';
import 'package:dataset_web/pages/disney_shanghai/pages/detail/components/WaitTimeInfoCard.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import 'package:provider/provider.dart';

class DetailPage extends StatefulWidget {
  final Facility facility;

  DetailPage({@required this.facility});

  @override
  _DetailPageState createState() => _DetailPageState();
}

class _DetailPageState extends State<DetailPage> {
  FacilityDetail facilityDetail;
  String error;

  @override
  void initState() {
    super.initState();
    Future.delayed(
      Duration(milliseconds: 200),
    ).then((value) async {
      ShanghaiDisneyModel shanghaiDisneyModel =
          Provider.of(context, listen: false);
      var result = await shanghaiDisneyModel.fetchDetail(widget.facility.url);
      setState(() {
        facilityDetail = result;
      });
    }).catchError((e) {
      error = e;
    });
  }

  Widget buildBody() {
    ShanghaiDisneyModel shanghaiDisneyModel = Provider.of(context);

    if (error != null) {
      return Center(child: Text(error));
    }

    if (facilityDetail == null) {
      return CupertinoActivityIndicator();
    }
    final first = facilityDetail.allHistory.length > 0
        ? facilityDetail.allHistory.first
        : null;
    DateTime fromDate;
    DateTime toDate = DateTime.now();
    if (first != null) {
      fromDate = DateTime(first.year, first.month);
    }

    return SingleChildScrollView(
      child: Column(children: [
        Wrap(
          children: [
            WaitTimeInfoCard(
              waitTime: facilityDetail.currentWaitTime,
              title: "Current Wait Time",
            ),
            WaitTimeInfoCard(
              waitTime: facilityDetail.maxWaitTime,
              title: "Maximum Wait Time",
            ),
            WaitTimeInfoCard(
              waitTime: facilityDetail.minWaitTime,
              title: "Minimum Wait Time",
            ),
          ],
        ),
        Stack(
          children: [
            Container(
              height: 500,
              width: MediaQuery.of(context).size.width,
              child: BezierChart(
                  bezierChartScale: BezierChartScale.MONTHLY,
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
                      data: facilityDetail.allHistory
                          .map<DataPoint<DateTime>>(
                            (e) => DataPoint(
                              value: e.avgWaitTime,
                              xAxis: DateTime(e.year, e.month),
                            ),
                          )
                          .toList(),
                    )
                  ]),
            ),
            Align(
              alignment: Alignment.topCenter,
              child: Text(
                "History",
                style: TextStyle(color: Colors.white, fontSize: 30),
              ),
            )
          ],
        ),
      ]),
    );
  }

  @override
  Widget build(BuildContext context) {
    ShanghaiDisneyModel shanghaiDisneyModel = Provider.of(context);
    return AlertDialog(
      title: Text(widget.facility.name),
      content: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: buildBody(),
      ),
      actions: [
        FlatButton(
          onPressed: () => Navigator.pop(context),
          child: Text("ok"),
        )
      ],
    );
  }
}

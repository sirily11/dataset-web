import 'package:dataset_web/model/ShanghaiDisneyModel.dart';
import 'package:dataset_web/pages/dialog/AlertDialog.dart';
import 'package:dataset_web/pages/disney_shanghai/components/DisneyShanghaiCard.dart';
import 'package:dataset_web/pages/home/components/DatasetSelector.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import 'package:provider/provider.dart';

class DisneyShanghaiPage extends StatefulWidget {
  @override
  _DisneyShanghaiPageState createState() => _DisneyShanghaiPageState();
}

class _DisneyShanghaiPageState extends State<DisneyShanghaiPage> {
  int get count {
    var width = MediaQuery.of(context).size.width;
    if (width > 768) {
      return 4;
    } else {
      return 1;
    }
  }

  @override
  Widget build(BuildContext context) {
    ShanghaiDisneyModel shanghaiDisneyModel = Provider.of(context);
    var width = MediaQuery.of(context).size.width;
    return LayoutBuilder(builder: (context, cons) {
      if (cons.maxWidth > 768) {
        return Scaffold(
          body: Row(
            children: [
              DatasetSelector(),
              Expanded(
                flex: 8,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      height: 20,
                    ),
                    Text(
                      "Wait time",
                      style: TextStyle(fontSize: 30),
                    ),
                    Divider(),
                    Expanded(
                      flex: 8,
                      child: buildScrollbar(shanghaiDisneyModel),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      } else {
        return Scaffold(
          appBar: AppBar(),
          drawer: Column(
            children: [
              DatasetSelector(),
            ],
          ),
          body: buildScrollbar(shanghaiDisneyModel),
        );
      }
    });
  }

  Scrollbar buildScrollbar(ShanghaiDisneyModel shanghaiDisneyModel) {
    return Scrollbar(
      child: EasyRefresh(
        firstRefresh: true,
        onRefresh: () async {
          try {
            await shanghaiDisneyModel.fetchData();
          } catch (err) {
            showDialog(
              context: context,
              builder: (c) => AlertPopUpDialog(
                title: "Cannot fetch disney data",
                content: "$err",
              ),
            );
          }
        },
        child: GridView.builder(
          itemCount: shanghaiDisneyModel.facilities.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: count,
          ),
          itemBuilder: (c, index) {
            var item = shanghaiDisneyModel.facilities[index];
            return DisneyShanghaiCard(facility: item);
          },
        ),
      ),
    );
  }
}

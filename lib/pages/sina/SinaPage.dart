import 'package:dataset_web/model/SinaKeywordModel.dart';
import 'package:dataset_web/pages/dialog/AlertDialog.dart';
import 'package:dataset_web/pages/home/components/DatasetSelector.dart';
import 'package:dataset_web/pages/sina/components/KeywordDetail.dart';
import 'package:dataset_web/pages/sina/components/KeywordDisplay.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SinaPage extends StatefulWidget {
  @override
  _SinaPageState createState() => _SinaPageState();
}

class _SinaPageState extends State<SinaPage> {
  @override
  void initState() {
    SinaKeywordModel sinaKeywordProvider =
        Provider.of(context, listen: false);
    Future.delayed(Duration(milliseconds: 200)).then((value) {
      sinaKeywordProvider.fetchKeywords().catchError((err) {
        showDialog(
          context: context,
          builder: (c) => AlertPopUpDialog(
            title: "Cannot fetch keywords",
            content: "$err",
          ),
        );
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    SinaKeywordModel sinaKeywordProvider = Provider.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 768) {
          return Scaffold(
            body: Row(
              children: [
                DatasetSelector(),
                KeywordDisplay(),
                if (sinaKeywordProvider.keywordDetail != null) KeywordDetail(),
                if (sinaKeywordProvider.keywordDetail == null)
                  Expanded(
                    flex: 5,
                    child: Container(),
                  ),
              ],
            ),
          );
        } else {
          return Scaffold(
            appBar: AppBar(),
            drawer: Row(
              children: [
                DatasetSelector(),
                KeywordDisplay(),
              ],
            ),
            body: sinaKeywordProvider.keywordDetail != null
                ? Row(
                    children: [
                      KeywordDetail(),
                    ],
                  )
                : Container(),
          );
        }
      },
    );
  }
}

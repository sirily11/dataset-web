import 'package:dataset_web/model/SinaKeywordModel.dart';
import 'package:dataset_web/pages/dialog/AlertDialog.dart';
import 'package:dataset_web/pages/sina/components/TextSearchField.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import 'package:provider/provider.dart';

class KeywordDisplay extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SinaKeywordModel sinaKeywordProvider = Provider.of(context);
    String toDateString(DateTime date) {
      if (date == null) {
        return "";
      } else {
        return "${date.year}-${date.month}-${date.day}";
      }
    }

    return Expanded(
      flex: 2,
      child: Card(
        elevation: 0,
        child: Column(
          children: [
            Row(
              children: [
                if (sinaKeywordProvider.selectedDate != null)
                  Text(
                    "${toDateString(sinaKeywordProvider.selectedDate?.start)}- ${toDateString(sinaKeywordProvider.selectedDate?.end)}",
                  ),
                if (sinaKeywordProvider.selectedDate != null)
                  IconButton(
                    onPressed: () {
                      sinaKeywordProvider.selectedDate = null;
                    },
                    icon: Icon(Icons.clear),
                  ),
                Spacer(),
                if (MediaQuery.of(context).size.width <= 768)
                  IconButton(
                    icon: Icon(Icons.close),
                    onPressed: () => Navigator.pop(context),
                  ),
                IconButton(
                  onPressed: () async {
                    var date = await showDateRangePicker(
                      context: context,
                      firstDate: DateTime(2000),
                      lastDate: DateTime(2099),
                    );
                    if (date != null) {
                      sinaKeywordProvider.selectedDate = date;
                    }
                  },
                  icon: Icon(Icons.calendar_today),
                )
              ],
            ),
            TextSearchField(
              onSearch: (keyword) async {
                await sinaKeywordProvider.search(keyword);
              },
              onClear: () async {
                await sinaKeywordProvider.fetchKeywords();
              },
            ),
            if (sinaKeywordProvider.isLoadingKeywords)
              CupertinoActivityIndicator(),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text("Number of results: ${sinaKeywordProvider.count}"),
            ),
            Divider(),
            Expanded(
              child: Scrollbar(
                child: EasyRefresh(
                  firstRefresh: false,
                  onRefresh: () async {
                    try {
                      await sinaKeywordProvider.fetchKeywords();
                    } catch (err) {
                      showDialog(
                        context: context,
                        builder: (c) => AlertPopUpDialog(
                            title: "Cannot fetch keywords", content: "$err"),
                      );
                    }
                  },
                  onLoad: () async {
                    try {
                      await sinaKeywordProvider.fetchMore();
                    } catch (err) {
                      showDialog(
                        context: context,
                        builder: (c) => AlertPopUpDialog(
                            title: "Cannot fetch keywords", content: "$err"),
                      );
                    }
                  },
                  child: ListView.builder(
                    controller: sinaKeywordProvider.scrollController,
                    itemCount: sinaKeywordProvider.keywords.length,
                    itemBuilder: (context, index) {
                      var keyword = sinaKeywordProvider.keywords[index];
                      return ListTile(
                        selected:
                            sinaKeywordProvider.selectedKeyword == keyword,
                        onTap: () async {
                          sinaKeywordProvider.selectedKeyword = keyword;
                          try {
                            await sinaKeywordProvider
                                .fetchKeywordDetail(keyword.url);
                          } catch (err) {
                            showDialog(
                              context: context,
                              builder: (c) => AlertPopUpDialog(
                                  title: "Cannot fetch posts", content: "$err"),
                            );
                          }
                        },
                        title: Text(
                          "${keyword.keyword}",
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

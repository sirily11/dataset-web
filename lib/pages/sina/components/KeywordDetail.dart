import 'package:dataset_web/model/SinaKeywordModel.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class KeywordDetail extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SinaKeywordProvider sinaKeywordProvider = Provider.of(context);
    return Expanded(
      flex: 5,
      child: Scrollbar(
        child: Column(
          children: [
            if (sinaKeywordProvider.isLoadingDetail)
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Center(
                  child: CupertinoActivityIndicator(),
                ),
              ),
            buildTitle(context),
            Expanded(
              child: ListView.builder(
                itemCount: sinaKeywordProvider.keywordDetail.posts.length,
                itemBuilder: (c, index) {
                  var post = sinaKeywordProvider.keywordDetail.posts[index];
                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Text(post.content),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildTitle(BuildContext context) {
    SinaKeywordProvider sinaKeywordProvider = Provider.of(context);
    var detail = sinaKeywordProvider.keywordDetail;
    return Container(
      width: MediaQuery.of(context).size.width,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Text(
              "${detail.keyword}",
              style: TextStyle(fontSize: 30),
            ),
            Divider(),
            Text(
              "${detail.time}",
              style: TextStyle(color: Colors.grey),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Spacer(
                  flex: 3,
                ),
                Text("Rank: ${detail.rank}"),
                Spacer(),
                Text("#Posts: ${detail.numbers}"),
                Spacer(
                  flex: 3,
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}

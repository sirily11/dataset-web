import 'package:dataset_web/objects/Keyword.dart';
import 'package:dataset_web/utils/urls.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class SinaKeywordModel with ChangeNotifier {
  String nextURL;
  List<Keyword> keywords = [];
  Keyword _selectedKeyword;
  Keyword keywordDetail;
  bool isLoadingKeywords = false;
  bool isLoadingDetail = false;
  final ScrollController scrollController = ScrollController();
  final dio = Dio();
  num count = 0;
  DateTimeRange _selectedDate;

  SinaKeywordModel() {}

  set selectedDate(DateTimeRange dateTime) {
    _selectedDate = dateTime;

    fetchKeywords(dateTimeRange: dateTime);

    notifyListeners();
  }

  DateTimeRange get selectedDate => _selectedDate;

  set selectedKeyword(Keyword keyword) {
    _selectedKeyword = keyword;

    notifyListeners();
  }

  Keyword get selectedKeyword => _selectedKeyword;

  Future<void> search(String keyword) async {
    isLoadingKeywords = true;
    nextURL = null;
    notifyListeners();
    try {
      String url = "$kBaseURL$kSinaURL/?search=$keyword";

      var response = await dio.get(url);
      nextURL = response.data['next'];
      count = response.data['count'];
      keywords = (response.data['results'] as List)
          .map((e) => Keyword.fromJson(e))
          .toList();
      isLoadingKeywords = false;
      notifyListeners();
    } catch (err) {
      isLoadingKeywords = false;
      notifyListeners();
      rethrow;
    }
  }

  Future<void> fetchKeywords({DateTimeRange dateTimeRange}) async {
    isLoadingKeywords = true;
    nextURL = null;
    notifyListeners();
    try {
      String url = "$kBaseURL$kSinaURL/";
      if (dateTimeRange != null) {
        url +=
            "?start_time=${dateTimeRange.start.toIso8601String()}&end_time=${dateTimeRange.end.toIso8601String()}";
      }

      var response = await dio.get(url);
      nextURL = response.data['next'];
      count = response.data['count'];
      keywords = (response.data['results'] as List)
          .map((e) => Keyword.fromJson(e))
          .toList();
      isLoadingKeywords = false;
      notifyListeners();
    } catch (err) {
      isLoadingKeywords = false;
      notifyListeners();
      rethrow;
    }
  }

  Future<void> fetchKeywordDetail(String url) async {
    try {
      isLoadingDetail = true;
      notifyListeners();
      var resp = await dio.get(url);
      nextURL = resp.data['next'];
      var s = Keyword.fromJson(resp.data);
      keywordDetail = s;
      isLoadingDetail = false;
      notifyListeners();
    } catch (err) {
      isLoadingDetail = false;
      notifyListeners();
      rethrow;
    }
  }

  Future<void> fetchMore() async {
    var response = await dio.get(nextURL);
    nextURL = response.data['next'];
    var newWords = (response.data['results'] as List)
        .map((e) => Keyword.fromJson(e))
        .toList();
    keywords.addAll(newWords);
    notifyListeners();
  }
}

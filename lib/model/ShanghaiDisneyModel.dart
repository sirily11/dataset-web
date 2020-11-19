import 'package:dataset_web/objects/facility.dart';
import 'package:dataset_web/utils/urls.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ShanghaiDisneyModel with ChangeNotifier {
  List<Facility> facilities = [];
  bool isFetchingList = false;
  bool isFetchingDetail = false;
  Dio dio = Dio();

  Future<void> fetchData() async {
    try {
      isFetchingDetail = true;
      notifyListeners();

      var response = await dio.get("$kBaseURL$kDisneyShanghaiURL");
      facilities =
          (response.data as List).map((e) => Facility.fromJson(e)).toList();
      notifyListeners();
    } catch (err) {
      isFetchingList = false;
      notifyListeners();
      rethrow;
    }
  }
}
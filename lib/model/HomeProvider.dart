import 'package:dataset_web/utils/avaliableDataset.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeProvider with ChangeNotifier {
  AvaliableDataset _selectedDataset;
  set selectedDataset(AvaliableDataset avaliableDataset) {
    _selectedDataset = avaliableDataset;
    notifyListeners();
  }

  AvaliableDataset get selectedDataset => _selectedDataset;
}

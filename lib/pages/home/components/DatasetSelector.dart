import 'package:dataset_web/model/HomeProvider.dart';
import 'package:dataset_web/utils/avaliableDataset.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class DatasetSelector extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    HomeProvider homeProvider = Provider.of(context);
    return Expanded(
      flex: 2,
      child: Card(
        elevation: 0,
        child: ListView.builder(
          itemCount: avaliableDatasets.length,
          itemBuilder: (context, index) {
            var dataset = avaliableDatasets[index];
            return ListTile(
              selected: dataset == homeProvider.selectedDataset,
              onTap: () {
                homeProvider.selectedDataset = dataset;
                Navigator.pushReplacementNamed(context, dataset.path);
              },
              title: Text(dataset.name),
            );
          },
        ),
      ),
    );
  }
}

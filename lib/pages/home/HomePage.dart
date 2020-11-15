import 'package:dataset_web/pages/home/components/DatasetSelector.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DatasetSelector(),
          Expanded(
            flex: MediaQuery.of(context).size.width > 768 ? 8 : 1,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                "Pick a Dataset",
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: 30,
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}

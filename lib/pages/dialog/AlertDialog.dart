import 'package:flutter/material.dart';

class AlertPopUpDialog extends StatelessWidget {
  final String title;
  final String content;

  AlertPopUpDialog({this.title, this.content});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(title),
      content: Text(content),
      actions: [
        FlatButton(
          onPressed: () => Navigator.pop(context),
          child: Text(
            "ok",
            style: TextStyle(color: Colors.blue),
          ),
        )
      ],
    );
  }
}

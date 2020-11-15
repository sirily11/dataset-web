import 'package:flutter/material.dart';

class ConfirmDialog extends StatelessWidget {
  final String title;
  final String content;

  ConfirmDialog({@required this.title, @required this.content});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(title),
      content: Text(content),
      actions: [
        FlatButton(
          onPressed: () => Navigator.pop(context, false),
          child: Text("Cancel"),
        ),
        FlatButton(
          onPressed: () => Navigator.pop(context, true),
          child: Text("OK"),
        )
      ],
    );
  }
}

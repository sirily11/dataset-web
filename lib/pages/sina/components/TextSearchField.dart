import 'package:dataset_web/pages/dialog/AlertDialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

typedef OnSearch(String keyword);

class TextSearchField extends StatefulWidget {
  final OnSearch onSearch;
  final Function onClear;

  TextSearchField({
    this.onSearch,
    this.onClear,
  });

  @override
  _TextSearchFieldState createState() => _TextSearchFieldState();
}

class _TextSearchFieldState extends State<TextSearchField> {
  final TextEditingController textEditingController = TextEditingController();
  bool focus = false;
  bool isLoading = false;

  Widget _renderAction() {
    if (isLoading) {
      return CupertinoActivityIndicator();
    }
    if (focus) {
      return IconButton(
        iconSize: 20,
        onPressed: () {
          widget.onClear();
          FocusScope.of(context).requestFocus(new FocusNode());
          textEditingController.clear();
          setState(() {
            focus = false;
          });
        },
        icon: Icon(Icons.clear),
      );
    }

    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: CupertinoTextField(
            onTap: () {
              setState(() {
                focus = true;
              });
            },
            placeholder: "Search...",
            controller: textEditingController,
            onEditingComplete: () async {
              FocusScope.of(context).requestFocus(new FocusNode());
              setState(() {
                isLoading = true;
              });
              try {
                if (widget.onSearch != null) {
                  await widget.onSearch(textEditingController.text);
                }
              } catch (err) {
                showDialog(
                  context: context,
                  builder: (c) => AlertPopUpDialog(
                    title: "Cannot search",
                    content: err.toString(),
                  ),
                );
              } finally {
                setState(() {
                  focus = false;
                  isLoading = false;
                });
              }
            },
          ),
        ),
        AnimatedSwitcher(
          duration: Duration(milliseconds: 200),
          child: _renderAction(),
        ),
      ],
    );
  }
}

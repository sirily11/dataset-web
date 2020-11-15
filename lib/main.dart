import 'package:dataset_web/model/HomeProvider.dart';
import 'package:dataset_web/model/SinaKeywordModel.dart';
import 'package:dataset_web/pages/home/HomePage.dart';
import 'package:dataset_web/pages/sina/SinaPage.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class ScreenArguments {
  final String title;

  ScreenArguments(this.title);
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (c) => SinaKeywordProvider(),
        ),
        ChangeNotifierProvider(
          create: (c) => HomeProvider(),
        ),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/':
              return PageRouteBuilder(
                pageBuilder: (context, animation, secondaryAnimation) =>
                    HomePage(),
              );
            case "/sina-hot-keyword":
              return PageRouteBuilder(
                pageBuilder: (context, animation, secondaryAnimation) =>
                    SinaPage(),
              );
          }
        },
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        // routes: {
        //   "/": (c) => HomePage(),
        //   '/sina-hot-keyword': (c) => SinaPage(),
        // },
      ),
    );
  }
}

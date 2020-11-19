import 'package:dataset_web/model/HomeProvider.dart';
import 'package:dataset_web/model/ShanghaiDisneyModel.dart';
import 'package:dataset_web/model/SinaKeywordModel.dart';
import 'package:dataset_web/pages/disney_shanghai/DisneyShanghaiPage.dart';
import 'package:dataset_web/pages/disney_shanghai/components/DisneyShanghaiCard.dart';
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
          create: (c) => SinaKeywordModel(),
        ),
        ChangeNotifierProvider(
          create: (c) => HomeProvider(),
        ),
        ChangeNotifierProvider(
          create: (c) => ShanghaiDisneyModel(),
        )
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        routes: {
          "/": (c) => HomePage(),
          "/disney-shanghai": (c) => DisneyShanghaiPage(),
          "/sina-hot-keyword": (c) => SinaPage()
        },
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
      ),
    );
  }
}

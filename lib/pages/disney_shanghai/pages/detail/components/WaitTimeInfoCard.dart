import 'package:dataset_web/objects/facilityDetail.dart';
import 'package:flutter/material.dart';

class WaitTimeInfoCard extends StatelessWidget {
  final WaitTime waitTime;
  final String title;
  WaitTimeInfoCard({@required this.waitTime, @required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(15),
          child: Column(
            children: [
              Text("$title"),
              Text(
                waitTime.waitTime.toString(),
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text("${waitTime.weather.time}"),
              Divider(),
              ListTile(
                leading: Icon(Icons.nights_stay),
                title: Text("Temperature"),
                subtitle: Text("${waitTime.weather.temperature}°C"),
              ),
              ListTile(
                leading: Icon(Icons.nights_stay),
                title: Text("Humidity"),
                subtitle: Text("${waitTime.weather.humidity}%"),
              ),
              ListTile(
                leading: Icon(Icons.nights_stay),
                title: Text("Weather"),
                subtitle: Text("${waitTime.weather.weatherDescription}"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

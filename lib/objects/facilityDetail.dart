// To parse this JSON data, do
//
//     final facilityDetail = facilityDetailFromJson(jsonString);

import 'dart:convert';

FacilityDetail facilityDetailFromJson(String str) =>
    FacilityDetail.fromJson(json.decode(str));

String facilityDetailToJson(FacilityDetail data) => json.encode(data.toJson());

class FacilityDetail {
  FacilityDetail({
    this.id,
    this.allHistory,
    this.maxWaitTime,
    this.minWaitTime,
    this.currentWaitTime,
    this.name,
    this.rideType,
  });

  String id;
  List<AllHistory> allHistory;
  WaitTime maxWaitTime;
  WaitTime minWaitTime;
  WaitTime currentWaitTime;
  String name;
  String rideType;

  FacilityDetail copyWith({
    String id,
    List<AllHistory> allHistory,
    WaitTime maxWaitTime,
    WaitTime minWaitTime,
    WaitTime currentWaitTime,
    String name,
    String rideType,
  }) =>
      FacilityDetail(
        id: id ?? this.id,
        allHistory: allHistory ?? this.allHistory,
        maxWaitTime: maxWaitTime ?? this.maxWaitTime,
        minWaitTime: minWaitTime ?? this.minWaitTime,
        currentWaitTime: currentWaitTime ?? this.currentWaitTime,
        name: name ?? this.name,
        rideType: rideType ?? this.rideType,
      );

  factory FacilityDetail.fromJson(Map<String, dynamic> json) => FacilityDetail(
        id: json["id"] == null ? null : json["id"],
        allHistory: json["all_history"] == null
            ? null
            : List<AllHistory>.from(
                json["all_history"].map((x) => AllHistory.fromJson(x))),
        maxWaitTime: json["max_wait_time"] == null
            ? null
            : WaitTime.fromJson(json["max_wait_time"]),
        minWaitTime: json["min_wait_time"] == null
            ? null
            : WaitTime.fromJson(json["min_wait_time"]),
        currentWaitTime: json["current_wait_time"] == null
            ? null
            : WaitTime.fromJson(json["current_wait_time"]),
        name: json["name"] == null ? null : json["name"],
        rideType: json["ride_type"] == null ? null : json["ride_type"],
      );

  Map<String, dynamic> toJson() => {
        "id": id == null ? null : id,
        "all_history": allHistory == null
            ? null
            : List<dynamic>.from(allHistory.map((x) => x.toJson())),
        "max_wait_time": maxWaitTime == null ? null : maxWaitTime.toJson(),
        "min_wait_time": minWaitTime == null ? null : minWaitTime.toJson(),
        "current_wait_time":
            currentWaitTime == null ? null : currentWaitTime.toJson(),
        "name": name == null ? null : name,
        "ride_type": rideType == null ? null : rideType,
      };
}

class AllHistory {
  AllHistory({
    this.month,
    this.year,
    this.avgWaitTime,
  });

  num month;
  num year;
  double avgWaitTime;

  AllHistory copyWith({
    num week,
    num year,
    double avgWaitTime,
  }) =>
      AllHistory(
        month: week ?? this.month,
        year: year ?? this.year,
        avgWaitTime: avgWaitTime ?? this.avgWaitTime,
      );

  factory AllHistory.fromJson(Map<String, dynamic> json) => AllHistory(
        month: json["month"] == null ? null : json["month"],
        year: json["year"] == null ? null : json["year"],
        avgWaitTime: json["avg_wait_time"] == null
            ? null
            : json["avg_wait_time"].toDouble(),
      );

  Map<String, dynamic> toJson() => {
        "month": month == null ? null : month,
        "year": year == null ? null : year,
        "avg_wait_time": avgWaitTime == null ? null : avgWaitTime,
      };
}

class WaitTime {
  WaitTime({
    this.id,
    this.weather,
    this.waitTime,
    this.status,
    this.fastpass,
    this.facility,
  });

  num id;
  Weather weather;
  num waitTime;
  String status;
  bool fastpass;
  String facility;

  WaitTime copyWith({
    num id,
    Weather weather,
    num waitTime,
    String status,
    bool fastpass,
    String facility,
  }) =>
      WaitTime(
        id: id ?? this.id,
        weather: weather ?? this.weather,
        waitTime: waitTime ?? this.waitTime,
        status: status ?? this.status,
        fastpass: fastpass ?? this.fastpass,
        facility: facility ?? this.facility,
      );

  factory WaitTime.fromJson(Map<String, dynamic> json) => WaitTime(
        id: json["id"] == null ? null : json["id"],
        weather:
            json["weather"] == null ? null : Weather.fromJson(json["weather"]),
        waitTime: json["wait_time"] == null ? null : json["wait_time"],
        status: json["status"] == null ? null : json["status"],
        fastpass: json["fastpass"] == null ? null : json["fastpass"],
        facility: json["facility"] == null ? null : json["facility"],
      );

  Map<String, dynamic> toJson() => {
        "id": id == null ? null : id,
        "weather": weather == null ? null : weather.toJson(),
        "wait_time": waitTime == null ? null : waitTime,
        "status": status == null ? null : status,
        "fastpass": fastpass == null ? null : fastpass,
        "facility": facility == null ? null : facility,
      };
}

class Weather {
  Weather({
    this.id,
    this.time,
    this.weatherDescription,
    this.maxTemperature,
    this.mnumemperature,
    this.pressure,
    this.windDegree,
    this.windSpeed,
    this.cloud,
    this.visibility,
    this.weather,
    this.temperature,
    this.humidity,
    this.location,
  });

  num id;
  DateTime time;
  String weatherDescription;
  double maxTemperature;
  double mnumemperature;
  num pressure;
  num windDegree;
  num windSpeed;
  num cloud;
  num visibility;
  String weather;
  num temperature;
  num humidity;
  String location;

  Weather copyWith({
    num id,
    DateTime time,
    String weatherDescription,
    double maxTemperature,
    double mnumemperature,
    num pressure,
    num windDegree,
    num windSpeed,
    num cloud,
    num visibility,
    String weather,
    num temperature,
    num humidity,
    String location,
  }) =>
      Weather(
        id: id ?? this.id,
        time: time ?? this.time,
        weatherDescription: weatherDescription ?? this.weatherDescription,
        maxTemperature: maxTemperature ?? this.maxTemperature,
        mnumemperature: mnumemperature ?? this.mnumemperature,
        pressure: pressure ?? this.pressure,
        windDegree: windDegree ?? this.windDegree,
        windSpeed: windSpeed ?? this.windSpeed,
        cloud: cloud ?? this.cloud,
        visibility: visibility ?? this.visibility,
        weather: weather ?? this.weather,
        temperature: temperature ?? this.temperature,
        humidity: humidity ?? this.humidity,
        location: location ?? this.location,
      );

  factory Weather.fromJson(Map<String, dynamic> json) => Weather(
        id: json["id"] == null ? null : json["id"],
        time: json["time"] == null ? null : DateTime.parse(json["time"]),
        weatherDescription: json["weather_description"] == null
            ? null
            : json["weather_description"],
        maxTemperature: json["max_temperature"] == null
            ? null
            : json["max_temperature"].toDouble(),
        mnumemperature: json["min_temperature"] == null
            ? null
            : json["min_temperature"].toDouble(),
        pressure: json["pressure"] == null ? null : json["pressure"],
        windDegree: json["wind_degree"] == null ? null : json["wind_degree"],
        windSpeed: json["wind_speed"] == null ? null : json["wind_speed"],
        cloud: json["cloud"] == null ? null : json["cloud"],
        visibility: json["visibility"] == null ? null : json["visibility"],
        weather: json["weather"] == null ? null : json["weather"],
        temperature: json["temperature"] == null ? null : json["temperature"],
        humidity: json["humidity"] == null ? null : json["humidity"],
        location: json["location"] == null ? null : json["location"],
      );

  Map<String, dynamic> toJson() => {
        "id": id == null ? null : id,
        "time": time == null ? null : time.toIso8601String(),
        "weather_description":
            weatherDescription == null ? null : weatherDescription,
        "max_temperature": maxTemperature == null ? null : maxTemperature,
        "min_temperature": mnumemperature == null ? null : mnumemperature,
        "pressure": pressure == null ? null : pressure,
        "wind_degree": windDegree == null ? null : windDegree,
        "wind_speed": windSpeed == null ? null : windSpeed,
        "cloud": cloud == null ? null : cloud,
        "visibility": visibility == null ? null : visibility,
        "weather": weather == null ? null : weather,
        "temperature": temperature == null ? null : temperature,
        "humidity": humidity == null ? null : humidity,
        "location": location == null ? null : location,
      };
}

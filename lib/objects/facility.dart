class Facility {
  Facility({
    this.url,
    this.history,
    this.name,
    this.rideType,
  });

  String url;
  History history;
  String name;
  String rideType;

  Facility copyWith({
    String url,
    History history,
    String name,
    String rideType,
  }) =>
      Facility(
        url: url ?? this.url,
        history: history ?? this.history,
        name: name ?? this.name,
        rideType: rideType ?? this.rideType,
      );

  factory Facility.fromJson(Map<String, dynamic> json) => Facility(
        url: json["url"] == null ? null : json["url"],
        history:
            json["history"] == null ? null : History.fromJson(json["history"]),
        name: json["name"] == null ? null : json["name"],
        rideType: json["ride_type"] == null ? null : json["ride_type"],
      );

  Map<String, dynamic> toJson() => {
        "url": url == null ? null : url,
        "history": history == null ? null : history.toJson(),
        "name": name == null ? null : name,
        "ride_type": rideType == null ? null : rideType,
      };
}

class History {
  History({
    this.lastWeek,
    this.lastMonth,
    this.lastThreeMonths,
  });

  List<num> lastWeek;
  List<num> lastMonth;
  List<num> lastThreeMonths;

  History copyWith({
    List<num> lastWeek,
    List<num> lastMonth,
    List<num> lastThreeMonths,
  }) =>
      History(
        lastWeek: lastWeek ?? this.lastWeek,
        lastMonth: lastMonth ?? this.lastMonth,
        lastThreeMonths: lastThreeMonths ?? this.lastThreeMonths,
      );

  factory History.fromJson(Map<String, dynamic> json) => History(
        lastWeek: json["last_week"] == null
            ? null
            : List<num>.from(
                json["last_week"].map((x) => x == null ? null : x)),
        lastMonth: json["last_month"] == null
            ? null
            : List<num>.from(
                json["last_month"].map((x) => x == null ? null : x)),
        lastThreeMonths: json["last_three_months"] == null
            ? null
            : List<num>.from(
                json["last_three_months"].map((x) => x == null ? null : x)),
      );

  Map<String, dynamic> toJson() => {
        "last_week": lastWeek == null
            ? null
            : List<dynamic>.from(lastWeek.map((x) => x == null ? null : x)),
        "last_month": lastMonth == null
            ? null
            : List<dynamic>.from(lastMonth.map((x) => x == null ? null : x)),
        "last_three_months": lastThreeMonths == null
            ? null
            : List<dynamic>.from(
                lastThreeMonths.map((x) => x == null ? null : x)),
      };
}

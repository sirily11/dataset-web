class Post {
  Post({
    this.id,
    this.keyword,
    this.content,
  });

  int id;
  Keyword keyword;
  String content;

  Post copyWith({
    int id,
    Keyword keyword,
    String content,
  }) =>
      Post(
        id: id ?? this.id,
        keyword: keyword ?? this.keyword,
        content: content ?? this.content,
      );

  factory Post.fromJson(Map<String, dynamic> json) => Post(
        id: json["id"] == null ? null : json["id"],
        content: json["content"] == null ? null : json["content"],
      );

  Map<String, dynamic> toJson() => {
        "id": id == null ? null : id,
        "keyword": keyword == null ? null : keyword.toJson(),
        "content": content == null ? null : content,
      };
}

class Keyword {
  Keyword({
    this.url,
    this.time,
    this.keyword,
    this.numbers,
    this.rank,
    this.posts,
  });

  String url;
  DateTime time;
  String keyword;
  num numbers;
  num rank;
  List<Post> posts;

  Keyword copyWith({
    String url,
    DateTime time,
    String keyword,
    int numbers,
    int rank,
    List<Post> posts,
  }) =>
      Keyword(
        url: url ?? this.url,
        time: time ?? this.time,
        keyword: keyword ?? this.keyword,
        numbers: numbers ?? this.numbers,
        rank: rank ?? this.rank,
        posts: posts ?? this.posts,
      );

  factory Keyword.fromJson(Map<String, dynamic> json) => Keyword(
        url: json["url"] == null ? null : json["url"],
        time: json["time"] == null ? null : DateTime.parse(json["time"]),
        keyword: json["keyword"] == null ? null : json["keyword"],
        numbers: json["numbers"] == null ? null : json["numbers"],
        rank: json["rank"] == null ? null : json["rank"],
        posts: json["posts"] == null
            ? null
            : List<Post>.from(json["posts"].map((x) => Post.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "url": url == null ? null : url,
        "time": time == null ? null : time.toIso8601String(),
        "keyword": keyword == null ? null : keyword,
        "numbers": numbers == null ? null : numbers,
        "rank": rank == null ? null : rank,
        "posts": posts == null
            ? null
            : List<dynamic>.from(posts.map((x) => x.toJson())),
      };
}

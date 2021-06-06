import axios from "axios";
import React from "react";
import {
  DatasetApp,
  DatasetAppContext,
  DatasetAppDetailProps,
  DatasetAppListProps,
} from "./base_dataset_app";
import TwitterIcon from "@material-ui/icons/Twitter";
import SinaList from "../sina/SinaList";

export interface Post {
  id: number;
  keyword: Keyword;
  content: string;
}

export interface Keyword {
  id: string;
  time: Date | any;
  keyword: string;
  numbers: number;
  rank: number;
  posts?: Post[];
}

export interface SinaDatasetListProps
  extends DatasetAppListProps<Keyword, Keyword, SinaDatasetAppContext> {}

export interface SinaDatasetDetailProps
  extends DatasetAppDetailProps<Keyword> {}

export interface SinaDatasetAppContext extends DatasetAppContext {
  keywords: Keyword[];
  setKeywords(keywords: Keyword[]): void;
  selectedIndex?: string;
  setSelectedIndex(index?: string): void;
  detail?: Keyword;
  setSelectedDetail(detail?: Keyword): void;
}

const SinaDatasetProvider = ({
  children,
  context,
}: {
  children: any;
  context: any;
}): JSX.Element => {
  const [keywords, setKeywords] = React.useState<Keyword[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<string>();
  const [detail, setSelectedDetail] = React.useState<Keyword>();

  const value: SinaDatasetAppContext = {
    keywords,
    setKeywords,
    selectedIndex,
    setSelectedDetail,
    detail,
    setSelectedIndex,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export class SinaDatasetApp extends DatasetApp<Keyword, Keyword> {
  constructor() {
    super();
    //@ts-ignore
    this.appContext = React.createContext<SinaDatasetAppContext>();
  }

  getAppProvider = ({ children }: { children: any }): JSX.Element => {
    return (
      <SinaDatasetProvider context={this.appContext}>
        {children}
      </SinaDatasetProvider>
    );
  };
  getIcon(): JSX.Element {
    return <TwitterIcon />;
  }
  isMatchPath(currentPath: string): boolean {
    throw new Error("Method not implemented.");
  }
  getPath(): string {
    return "/sina";
  }
  getDetailPath(): string {
    return "/sina/:id?";
  }
  getFetchListURL(params?: { [keyword: string]: string }): string {
    return "https://z6msxm2nwd.execute-api.ap-southeast-1.amazonaws.com/dev/api/sina/keyword/";
  }
  getFetchDetailURL(id: any, params?: { [keyword: string]: string }): string {
    return this.getFetchListURL() + id + "/";
  }
  getTitle(): string {
    return "Sina Keyword";
  }
  renderLists(): JSX.Element {
    return (
      <SinaList
        fetchList={this.fetchList}
        fetchNext={this.fetchNext}
        hasNext={this.hasNext}
        fetchDetail={this.fetchDetail}
        //@ts-ignore
        appContext={this.appContext!}
      />
    );
  }
  renderDetail(): JSX.Element {
    throw new Error("Method not implemented.");
  }
  search<T>(keyword: string): T[] | undefined {
    throw new Error("Method not implemented.");
  }
}

import axios from "axios";
import React from "react";
import {
  DatasetApp,
  DatasetAppContext,
  DatasetAppDetailProps,
  DatasetAppListProps,
  DatasetAppMobileDetailProps,
  ResponsivePath,
} from "./base_dataset_app";
import TwitterIcon from "@material-ui/icons/Twitter";
import SinaListDesktop from "../sina/SinaListDesktop";
import qs from "qs";
import SearchItem from "../sina/SearchItem";
import SinaListMobile from "../sina/SinaListMobile";
import SinaDetailsMobile from "../sina/SinaDetailsMobile";
import { SinaDatePickerAction } from "./actions/SinaDetaPickerAction";
import { DatasetAppAction } from "./base_app_action";

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

export interface SinaDatasetMobileDetailProps
  extends DatasetAppMobileDetailProps<Keyword> {}

export interface SinaDatasetAppContext extends DatasetAppContext<Keyword> {
  selectedIndex?: string;
  setSelectedIndex(index?: string): void;
  detail?: Keyword;
  setSelectedDetail(detail?: Keyword): void;
  setOpenDatePicker(b: boolean): void;
  openDatePicker: boolean;
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
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const value: SinaDatasetAppContext = {
    items: keywords,
    setItems: setKeywords,
    selectedIndex,
    setSelectedDetail,
    detail,
    setSelectedIndex,
    openDatePicker,
    setOpenDatePicker,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export class SinaDatasetApp extends DatasetApp<
  Keyword,
  Keyword,
  SinaDatasetAppContext
> {
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
  getDetailPath(): ResponsivePath {
    return {
      desktop: "/sina/:id?",
      mobile: "/sina/:id",
    };
  }
  getFetchListURL(params?: { [keyword: string]: string }): string {
    let baseURL =
      "https://z6msxm2nwd.execute-api.ap-southeast-1.amazonaws.com/dev/api/sina/keyword";
    if (params) {
      let qss = qs.stringify(params);
      return `${baseURL}?${qss}`;
    }

    return baseURL;
  }
  getFetchDetailURL(id: any, params?: { [keyword: string]: string }): string {
    return this.getFetchListURL() + "/" + id + "/";
  }
  getTitle(): string {
    return "Sina Keyword";
  }
  renderLists(): JSX.Element {
    return (
      <SinaListDesktop
        fetchList={this.fetchList}
        fetchNext={this.fetchNext}
        hasNext={this.hasNext}
        fetchDetail={this.fetchDetail}
        //@ts-ignore
        appContext={this.appContext!}
      />
    );
  }

  renderMobileLists = (): JSX.Element => {
    return (
      <SinaListMobile
        fetchList={this.fetchList}
        fetchNext={this.fetchNext}
        hasNext={this.hasNext}
        fetchDetail={this.fetchDetail}
        //@ts-ignore
        appContext={this.appContext!}
      />
    );
  };

  renderMobileDetail = (): JSX.Element => {
    return <SinaDetailsMobile fetchDetail={this.fetchDetail} />;
  };

  search = async (keyword: string): Promise<Keyword[] | undefined> => {
    let q = qs.stringify({ search: keyword });
    let url = `${this.getFetchListURL()}?${q}`;
    try {
      let data = await axios.get(url);
      return data.data.results;
    } catch (err) {
      window.alert(err);
    }
    return [];
  };

  renderSearchItem = (item: Keyword) => {
    return <SearchItem keyword={item} />;
  };

  createActions = () => {
    const datePicker = new SinaDatePickerAction();
    return [datePicker];
  };

  renderActions = () => {
    let actions = this.createActions();
    let context = this.appContext!;

    return (
      <div>
        <context.Consumer>
          {(context) => (
            <div>
              {actions.map((a) =>
                a.render(
                  {
                    fetchList: this.fetchList,
                    fetchDetail: this.fetchDetail,
                    fetchNext: this.fetchNext,
                    //@ts-ignore
                    appContext: this.appContext!,
                  },
                  context
                )
              )}
            </div>
          )}
        </context.Consumer>
      </div>
    );
  };
}

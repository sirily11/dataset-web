import axios from "axios";
import React from "react";
import { DatasetAppAction } from "./base_app_action";

export interface DatasetAppListProps<T, D, C> {
  fetchList(params?: { [keyword: string]: string }): Promise<T[] | undefined>;
  fetchNext(): Promise<T[] | undefined>;
  hasNext(): boolean;
  fetchDetail(identifier: any): Promise<D | undefined>;
  appContext: React.Context<C>;
}

export interface DatasetAppDetailProps<D> {
  data: D;
}

export interface DatasetAppMobileDetailProps<D> {
  fetchDetail(identifier: any): Promise<D | undefined>;
}

export interface DatasetAppContext<T> {
  items: T[];
  setItems(keywords: T[]): void;
}

export interface ResponsivePath {
  mobile: string;
  desktop: string;
}

export abstract class DatasetApp<T, D, C extends DatasetAppContext<T>> {
  abstract isMatchPath(currentPath: string): boolean;

  nextURL?: string;
  appContext?: React.Context<DatasetAppContext<T>>;

  abstract getAppProvider({ children }: { children: any }): JSX.Element;

  /**
   * Get list's path
   */
  abstract getPath(): string;
  /**
   * Get detail's path
   */
  abstract getDetailPath(): ResponsivePath;
  /**
   * Get app's title
   */

  abstract getFetchListURL(params?: { [keyword: string]: string }): string;

  abstract getFetchDetailURL(
    id: any,
    params?: { [keyword: string]: string }
  ): string;

  /**
   * Get App Title
   */
  abstract getTitle(): string;

  /**
   * Get App Icon
   */
  abstract getIcon(): JSX.Element;

  /**
   * Render desktop list's page
   */
  abstract renderLists(): JSX.Element;

  /**
   * Render mobile list page
   */
  abstract renderMobileLists(): JSX.Element;

  /**
   * Render Mobile Version Details
   */
  abstract renderMobileDetail(): JSX.Element;

  /**
   * Create list of actions
   */
  abstract createActions(): DatasetAppAction<T, D, C>[];

  /**
   * Render Actions
   */
  abstract renderActions(): JSX.Element;

  /**
   * Fetch list's info
   */
  fetchList = async (params?: {
    [keyword: string]: string;
  }): Promise<T[] | undefined> => {
    let url = this.getFetchListURL(params);
    if (url === undefined) {
      return undefined;
    }
    try {
      console.log(url);
      let result = await axios.get(url);
      this.nextURL = result.data.next;
      return result.data.results;
    } catch (err) {}
  };

  /**
   * Fetch more info
   */
  fetchNext = async (): Promise<T[] | undefined> => {
    if (this.nextURL === undefined) {
      return undefined;
    }

    try {
      let result = await axios.get(this.nextURL);
      this.nextURL = result.data.next;
      return result.data.results as T[];
    } catch (err) {
      //   window.alert(err);
    }
  };

  /**
   * Fetch detail
   */
  fetchDetail = async (identifier: any): Promise<D | undefined> => {
    let url = this.getFetchDetailURL(identifier);
    if (url === undefined) {
      return undefined;
    }

    try {
      let result = await axios.get(url);

      return result.data as D;
    } catch (err) {
      //   window.alert(err);
    }
  };

  hasNext = (): boolean => {
    return this.nextURL !== undefined;
  };

  abstract search(keyword: string): Promise<T[] | undefined>;

  abstract renderSearchItem(item: T): JSX.Element;
}

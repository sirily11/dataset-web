import axios from "axios";
import React from "react";

export interface DatasetAppListProps<T, D, C> {
  fetchList(): Promise<T[] | undefined>;
  fetchNext(): Promise<T[] | undefined>;
  hasNext(): boolean;
  fetchDetail(identifier: any): Promise<D | undefined>;
  appContext: React.Context<C>;
}

export interface DatasetAppDetailProps<D> {
  data: D;
}

export interface DatasetAppContext<T> {
  items: T[];
  setItems(keywords: T[]): void;
}

export abstract class DatasetApp<T, D> {
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
  abstract getDetailPath(): string;
  /**
   * Get app's title
   */

  abstract getFetchListURL(params?: { [keyword: string]: string }): string;

  abstract getFetchDetailURL(
    id: any,
    params?: { [keyword: string]: string }
  ): string;

  abstract getTitle(): string;

  abstract getIcon(): JSX.Element;

  /**
   * Render list's page
   */
  abstract renderLists(): JSX.Element;
  /**
   * Render detail's page
   */
  abstract renderDetail(): JSX.Element;

  /**
   * Fetch list's info
   */
  fetchList = async (): Promise<T[] | undefined> => {
    let url = this.getFetchListURL();
    if (url === undefined) {
      return undefined;
    }
    try {
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

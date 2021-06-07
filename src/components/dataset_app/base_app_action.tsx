import {
  ClickAwayListener,
  IconButton,
  Menu,
  MenuItem,
  Popper,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { ContextMenuContext } from "../context_menu/ContextMenuContext";
import { DatasetAppContext, DatasetAppListProps } from "./base_dataset_app";

export interface FetchDataProps<T, D, C> extends DatasetAppListProps<T, D, C> {}

export interface UpdateDataProps<T, D> extends DatasetAppContext<T> {}

export interface ContextMenuProps<T, D, C> {
  title: string;
  onClick(): Promise<void>;
  onClose(): Promise<void>;
}

export abstract class DatasetAppAction<T, D, C> {
  abstract getTitle(): string;

  abstract renderActionIcon(): JSX.Element;

  // abstract onClick(
  //   fetchData: FetchDataProps<T, D, C>,
  //   updateData: UpdateDataProps<T, D>
  // ): void;

  abstract renderExtraComponent(
    fetchData: FetchDataProps<T, D, C>,
    updateData: UpdateDataProps<T, D>
  ): JSX.Element | undefined;

  abstract renderMenuItems(
    fetchData: FetchDataProps<T, D, C>,
    updateData: UpdateDataProps<T, D>
  ): ContextMenuProps<T, D, C>[];

  render = (
    fetchData: FetchDataProps<T, D, C>,
    updateData: UpdateDataProps<T, D>
  ): JSX.Element => {
    return (
      <div key={`action-${this.getTitle()}`}>
        <ContextMenuContext.Consumer>
          {({ openMenu, closeMenu, menuAnchor }) => (
            <div>
              <Tooltip title={this.getTitle()}>
                <IconButton
                  onClick={(e) => {
                    openMenu(e.currentTarget);
                  }}
                >
                  {this.renderActionIcon()}
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={menuAnchor}
                open={menuAnchor !== undefined}
                onClose={() => closeMenu()}
              >
                {this.renderMenuItems(fetchData, updateData).map((m, i) => (
                  <MenuItem
                    key={`${this.getTitle()}-${i}`}
                    onClick={async () => {
                      await m.onClick();
                      closeMenu();
                    }}
                  >
                    {m.title}
                  </MenuItem>
                ))}
              </Menu>
              {this.renderExtraComponent(fetchData, updateData) !== undefined &&
                this.renderExtraComponent(fetchData, updateData)}
            </div>
          )}
        </ContextMenuContext.Consumer>
      </div>
    );
  };
}

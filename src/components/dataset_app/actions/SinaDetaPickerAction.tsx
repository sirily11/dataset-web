import {
  ContextMenuProps,
  DatasetAppAction,
  FetchDataProps,
  UpdateDataProps,
} from "../base_app_action";
import { Keyword, SinaDatasetAppContext } from "../SinaDataset";
import DateRangeIcon from "@material-ui/icons/DateRange";
import React from "react";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import moment from "moment";
import { ClickAwayListener } from "@material-ui/core";
import { DatasetAppContext } from "../../home/SelectedAppContext";

export class SinaDatePickerAction extends DatasetAppAction<
  Keyword,
  Keyword,
  SinaDatasetAppContext
> {
  renderExtraComponent(
    fetchData: FetchDataProps<Keyword, Keyword, SinaDatasetAppContext>,
    updateData: UpdateDataProps<Keyword, Keyword>
  ): JSX.Element | undefined {
    return <DatePickerAction {...fetchData} {...updateData} />;
  }

  renderActionIcon(): JSX.Element {
    return <DateRangeIcon />;
  }

  renderMenuItems(
    fetchData: FetchDataProps<Keyword, Keyword, SinaDatasetAppContext>,
    updateData: UpdateDataProps<Keyword, Keyword>
  ): ContextMenuProps<Keyword, Keyword, SinaDatasetAppContext>[] {
    return [
      {
        title: "Show Date Picker",
        onClick: async () => {
          //@ts-ignore
          updateData.setOpenDatePicker(true);
        },
        onClose: async () => {},
      },
      {
        title: "Reset",
        onClick: async () => {
          const result = await fetchData.fetchList();
          if (result) {
            updateData.setItems(result);
          }
        },
        onClose: async () => {},
      },
    ];
  }
  getTitle(): string {
    return "Date Picker";
  }
}

function DatePickerAction(props: any) {
  const { fetchList, setItems, openDatePicker, setOpenDatePicker } = props;
  const [dateRange, setDateRange] = React.useState<DateRange>({});
  const { setIsLoading } = React.useContext(DatasetAppContext);

  const fetchDateInRange = async () => {
    setOpenDatePicker(false);
    setIsLoading(true);
    if (dateRange.startDate && dateRange.endDate) {
      let result = await fetchList({
        start_time: moment(dateRange.startDate).format("YYYY-MM-DD"),
        end_time: moment(dateRange.endDate).format("YYYY-MM-DD"),
      });
      if (result) {
        setItems(result);
      }
    }
    setIsLoading(false);
  };

  return (
    <div style={{ position: "absolute", right: 20 }}>
      <DateRangePicker
        open={openDatePicker}
        closeOnClickOutside={true}
        toggle={() => fetchDateInRange()}
        onChange={(d) => setDateRange(d)}
      />
    </div>
  );
}

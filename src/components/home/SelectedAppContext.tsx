import React from "react";
import { DatasetApp } from "../dataset_app/base_dataset_app";
import { useLocation } from "react-router-dom";

interface App {
  selectedApp?: DatasetApp<any, any>;
  isLoading: boolean;
  setIsLoading(v: boolean): void;
}

//@ts-ignore
export const DatasetAppContext = React.createContext<App>({});

export function DatasetAppProvider({
  children,
  apps,
}: {
  children: any;
  apps: DatasetApp<any, any>[];
}) {
  const location = useLocation();

  const [selectedApp, setSelectedApp] =
    React.useState<DatasetApp<any, any> | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let foundApp = apps.find((a) => location.pathname.includes(a.getPath()));
    setSelectedApp(foundApp);
  }, [location]);

  return (
    <DatasetAppContext.Provider
      value={{ selectedApp: selectedApp, isLoading, setIsLoading }}
    >
      {children}
    </DatasetAppContext.Provider>
  );
}

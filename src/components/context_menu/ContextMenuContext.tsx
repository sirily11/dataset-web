import React from "react";

interface ContextMenu {
  menuAnchor?: HTMLElement;
  openMenu(a: HTMLElement): void;
  closeMenu(): void;
}

//@ts-ignore
export const ContextMenuContext = React.createContext<ContextMenu>({});

export default function ContextMenuProvider({ children }: { children: any }) {
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement>();
  const openMenu = (anchor: HTMLElement) => {
    setMenuAnchor(anchor);
  };

  const closeMenu = () => {
    setMenuAnchor(undefined);
  };

  const value: ContextMenu = {
    menuAnchor,
    openMenu,
    closeMenu,
  };

  return (
    <ContextMenuContext.Provider value={value}>
      {children}
    </ContextMenuContext.Provider>
  );
}

import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeBuyWindow: () => {},
  refreshHoldings: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [holdingsRefreshTrigger, setHoldingsRefreshTrigger] = useState(0);

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false);
    setSelectedStockUID(uid);
  };

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleRefreshHoldings = () => {
    setHoldingsRefreshTrigger((prev) => prev + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseBuyWindow,
        refreshHoldings: handleRefreshHoldings,
        holdingsRefreshTrigger,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

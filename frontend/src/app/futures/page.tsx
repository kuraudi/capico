"use client";
import { useEffect, useState } from "react";

const TradingViewWidget = (symbol) => {
  const [widgetUrl, setWidgetUrl] = useState("");

  useEffect(() => {
    setWidgetUrl(
      `https://s.tradingview.com/widgetembed/?symbol=${"BTC"}USDT&interval=60&theme=dark&style=1&locale=en&toolbarbg=f1f3f6&hide_side_toolbar=1&allow_symbol_change=1`
    );
  }, [symbol]);

  return (
    <div className="tradingview-widget-container w-full h-[500px]">
      {widgetUrl && (
        <iframe
          src={widgetUrl}
          width="100%"
          height="100%"
          allowTransparency={true}
          frameBorder="0"
          className="rounded-lg shadow-lg"
        ></iframe>
      )}
    </div>
  );
};

export default TradingViewWidget;

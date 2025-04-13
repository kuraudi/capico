const TradingViewWidget = ({ symbol }: { symbol: string }) => {
  return (
    <div className="w-full h-full p-[10px]">
      <iframe
        src={`https://s.tradingview.com/widgetembed/?symbol=${symbol}USDT&interval=60&theme=dark&style=1&locale=en&toolbarbg=f1f3f6&hide_side_toolbar=1&allow_symbol_change=0`}
        width="100%"
        height="100%"
        // allowTransparency={true}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default TradingViewWidget;

// YahooKline.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function YahooKline() {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYahooKline = async () => {
      setLoading(true);
      setError(null);

      const symbol = '2330.TW';
      const interval = '1m';

      // 這裡先示範抓最近 5 天
      const nowSec = Math.floor(Date.now() / 1000);
      const fiveDaysSec = 5 * 24 * 60 * 60;
      const period2 = nowSec;
      const period1 = nowSec - fiveDaysSec;

      try {
        const res = await axios.get(
          `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}`,
          {
            params: {
              interval,
              period1,
              period2,
              includePrePost: true,
              events: 'div,split,earn',
              lang: 'en-US',
              region: 'US',
            },
          }
        );

        const result = res.data.chart.result?.[0];
        if (!result) {
          throw new Error('No result from Yahoo');
        }

        const timestamps = result.timestamp;
        const quote = result.indicators?.quote?.[0];

        const mappedBars = timestamps.map((ts, i) => ({
          time: ts * 1000, // 轉成 ms，之後可直接給 chart 用
          open: quote.open[i],
          high: quote.high[i],
          low: quote.low[i],
          close: quote.close[i],
          volume: quote.volume[i],
        }));

        setBars(mappedBars);
      } catch (err) {
        console.error(err);
        setError(err.message || 'fetch error');
      } finally {
        setLoading(false);
      }
    };

    fetchYahooKline();
  }, []);

  if (loading) return <p>載入中...</p>;
  if (error) return <p>發生錯誤：{error}</p>;

  return (
    <div>
      <h2>2330.TW 最近 5 天 1 分 K（前 10 筆示意）</h2>
      <ul>
        {bars.slice(0, 10).map((bar, idx) => (
          <li key={idx}>
            {new Date(bar.time).toLocaleString()}｜O:{bar.open} H:{bar.high} L:{bar.low} C:{bar.close} V:{bar.volume}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YahooKline;

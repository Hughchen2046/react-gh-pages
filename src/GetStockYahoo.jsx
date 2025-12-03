import React, {useEffect, useState} from "react";
function GetStock(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =  'https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&stockNo=2330&date=20251120';
        async function fetchData() {
      try {
        const res = await fetch(url, { mode: 'cors' });
        const json = await res.json();
        console.log(json);
        setData(json);
      } catch (err) {
        console.error('API 錯誤：', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
   if (loading) return <div>載入中...</div>;
  if (!data) return <div>沒有資料</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>台積電日 K 資料（從 TWSE API 擷取）</h2>

      <pre style={{ background: '#f7f7f7', padding: '15px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>

      <hr />

      {/* 顯示前 5 天的資料 */}
      <h3>前 5 筆資料：</h3>
      <ul>
        {data.data.slice(0, 5).map((item, idx) => (
          <li key={idx}>
            日期：{item[0]}  
            開：{item[3]}  
            高：{item[4]}  
            低：{item[5]}  
            收：{item[6]}  
            量：{item[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetStock;
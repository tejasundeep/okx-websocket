import { useEffect, useState } from "react";

const OKXSocket = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.okx.com:8443/ws/v5/business");
    ws.onopen = () => ws.send(JSON.stringify({ op: "subscribe", args: [{ channel: "candle1D", instId: "LTC-USDT-SWAP" }] }));
    ws.onmessage = ({data: msg}) => setData(JSON.parse(msg)?.data);

    return () => ws.close();
  }, []);

  return data && <h2>Data from WebSocket:</h2>{JSON.stringify(data, null, 2)};
};

export default OKXSocket;

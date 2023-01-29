import { useCallback, useEffect, useRef } from 'react';

export const CONNECTING: 'CONNECTING' = 'CONNECTING';
export const OPEN: 'OPEN' = 'OPEN';
export const CLOSING: 'CLOSING' = 'CLOSING';
export const CLOSED: 'CLOSED' = 'CLOSED';

export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED
};

interface IWSOptions {
  onMessage: (event: Event) => void;
  onConnect?: (event: Event) => void;
  onError?: (event: Event) => void;
  onDisconnect?: (event: Event) => void;
}


export const useSocket = (url: string, options: IWSOptions) => {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(
    (token: string) => {
      ws.current = new WebSocket(url);

      ws.current.onopen = (event: Event) => {
        if (typeof options.onConnect === 'function') {
          options.onConnect(event);
        }
      }

      ws.current.onclose = (event: Event) => {
        if (typeof options.onDisconnect === 'function') {
          options.onDisconnect(event);
        }
      }

    }, [url, options]
  );

  useEffect(() => {
    return () => {
      if (ws.current && typeof ws.current.close === 'function') {
        ws.current.close();
      }
    }
  }, [])

  const sendData = useCallback((data: { message: string; token: string }) => {}, [ws]);

  return { connect, sendData };


}
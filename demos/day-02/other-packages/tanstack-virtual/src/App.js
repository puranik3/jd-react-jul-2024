import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import './App.css';

function App() {
  const parentRef = useRef();
  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35
  });

  return (
    <div>
      <h1>TanStack Virtual</h1>

      <div ref={parentRef} className="parent">
        <div className="items" style={{
          height: `${rowVirtualizer.getTotalSize()}px`
        }}>
          {
            rowVirtualizer.getVirtualItems().map(
              virtualItem => (
                <div
                  key={virtualItem.key}
                  className="item"
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`
                  }}
                >
                  Row {virtualItem.index}
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;

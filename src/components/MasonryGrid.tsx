
import React, { useEffect, useRef, useState } from 'react';

interface MasonryGridProps {
  children: React.ReactNode[];
  columnCount?: number;
  columnGap?: number;
  rowGap?: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ 
  children, 
  columnCount = 3, 
  columnGap = 16,
  rowGap = 16
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<React.ReactNode[][]>([]);
  
  useEffect(() => {
    const updateColumns = () => {
      const gridWidth = gridRef.current?.clientWidth || 0;
      
      // Responsive column count based on screen width
      let responsiveColumnCount = columnCount;
      if (gridWidth < 640) responsiveColumnCount = 1;
      else if (gridWidth < 768) responsiveColumnCount = 2;
      else if (gridWidth < 1024) responsiveColumnCount = columnCount > 2 ? 3 : 2;
      
      // Initialize columns
      const cols: React.ReactNode[][] = Array.from({ length: responsiveColumnCount }, () => []);
      
      // Distribute children to columns
      React.Children.forEach(children, (child, index) => {
        if (React.isValidElement(child)) {
          const columnIndex = index % responsiveColumnCount;
          cols[columnIndex].push(child);
        }
      });
      
      setColumns(cols);
    };
    
    updateColumns();
    
    const resizeObserver = new ResizeObserver(updateColumns);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [children, columnCount]);
  
  return (
    <div 
      ref={gridRef}
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        columnGap: `${columnGap}px`,
      }}
    >
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col" style={{ rowGap: `${rowGap}px` }}>
          {column}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;

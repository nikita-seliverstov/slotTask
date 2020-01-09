function findSymbolNeighbors(position) {
    if (position.symbolIndex === 4) {
      return {
        ...(position.line === 'Center'
          ? { topIndex: 0, bottomIndex: 3, centerIndex: position.symbolIndex }
          : { topIndex: position.symbolIndex, bottomIndex: 3, centerIndex: false })
      };
    }
    if (position.symbolIndex === 0) {
      return {
        ...(position.line === 'Center'
          ? { topIndex: 1, bottomIndex: 4, centerIndex: position.symbolIndex }
          : { topIndex: position.symbolIndex, bottomIndex: 4, centerIndex: false })
      };
    } else {
      return {
        ...(position.line === 'Center'
          ? {
              topIndex: position.symbolIndex + 1,
              bottomIndex: position.symbolIndex - 1,
              centerIndex: position.symbolIndex
            }
          : {
              topIndex: position.symbolIndex,
              bottomIndex: position.symbolIndex - 1,
              centerIndex: false
            })
      };
    }
  }

  export default findSymbolNeighbors
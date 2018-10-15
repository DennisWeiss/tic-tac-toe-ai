const deepCopyTiles = tiles => {
    const copy = []
    for (let i = 0; i < tiles.length; i++) {
        const row = []
        for (let j = 0; j < tiles[i].length; j++) {
            row.push(tiles[i][j])
        }
        copy.push(row)
    }
    return copy
}

export {deepCopyTiles}
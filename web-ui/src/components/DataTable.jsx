import './DataTable.css'

function DataTable({ title, columns = [], data = [], maxRows = 5 }) {
    const displayData = data.slice(0, maxRows)

    return (
        <div className="data-table">
            {title && <h3 className="table-title">{title}</h3>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} style={{ width: col.width }}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="no-data">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            displayData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {data.length > maxRows && (
                <div className="table-footer">
                    <span className="showing-text">
                        Showing {maxRows} of {data.length}
                    </span>
                    <button className="view-more-btn">View All →</button>
                </div>
            )}
        </div>
    )
}

export default DataTable

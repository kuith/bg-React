import React from "react";
import CompEntityTable from "../comp-tables/comp-entity-table";

const CompMatchesTable = ({ data, onClick, tableColumns, entityName, label  }) => {
    return <CompEntityTable 
        data={data} 
        onClick={onClick} 
        tableColumns={tableColumns} 
        entityName={entityName} 
        label={label}
        
    />;
};

export default CompMatchesTable;
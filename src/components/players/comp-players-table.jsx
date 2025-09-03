import CompEntityTable from "../comp-tables/comp-entity-table";

const PlayersTable = ({ data, onClick, tableColumns, entityName, label }) => {
    return <CompEntityTable 
        data={data} 
        onClick={onClick} 
        tableColumns={tableColumns} 
        entityName={entityName} 
        label={label}
        
    />;
};

export default PlayersTable;

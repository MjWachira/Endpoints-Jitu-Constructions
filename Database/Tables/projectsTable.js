const mssql = require('mssql')
const { sqlConfig } = require('../../Config/config')

const createProjectsTable = async (res,req)=>{
    try{
        const table = `BEGIN
        TRY 
            CREATE TABLE projectsTable(
                id VARCHAR(200) PRIMARY KEY,
                project_name VARCHAR(500) NOT NULL,
                description VARCHAR(1000) NOT NULL,
                project_location VARCHAR(200) NOT NULL,
                startdate DATE NOT NULL,
                enddate Date NOT NULL
            )
        END TRY
    BEGIN 
        CATCH 
            THROW 50001,'Table already exists!',1;
        END CATCH`;

        const pool = await mssql.connect(sqlConfig)

        await pool.query(table, (err)=>{
            if(err instanceof mssql.RequestError){
                console.log({Error:err.message});

            }else{
                console.log('Table created successfully');
            }
        })
    }catch(error){
        return res({error})
    }
}
//createProjectsTable()

module.exports={
    createProjectsTable
}
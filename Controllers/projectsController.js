const {v4} = require('uuid');
const { createProjectsTable } = require('../Database/Tables/projectsTable');
const mssql = require('mssql');
const { sqlConfig } = require('../Config/config');
//const projects = [];

class Project{
    constructor(id,project_name,description, project_location, startdate, enddate){
        this.project_name=project_name,
        this.description=description, 
        this.project_location=project_location,
        this.startdate= startdate, 
        this.enddate=enddate
    }
}

const createProject = async (req, res)=>{
    try {
        const id = v4()

        const {project_name, description, project_location, startdate, enddate} = req.body

        const pool = await mssql.connect(sqlConfig)

        // if(pool.connected){
        const result = await pool.request()
        .input('id', mssql.VarChar, id)
        .input('project_name', mssql.VarChar, project_name)
        .input('description', mssql.VarChar, description)
        .input('project_location', mssql.VarChar, project_location)
        .input('startdate', mssql.Date, startdate)
        .input('enddate', mssql.Date, enddate)
        .execute('createProjectPROC')
        console.log(result)

        if(result.rowsAffected[0] == 1){
        return res.json({
            message: "project created Successfully",
        
        })  
        }else{
            return res.json({message: "creation failed"})
        }   
    // }
    } catch(error){
        return res.json({error})
    }
}

const getProjects = async(req, res)=>{
    try{
        // res.json({projects:projects})
        const pool = await (mssql.connect(sqlConfig))
        const allproject = (await pool.request().execute('getAllProjects')).recordset
        res.json({projects: allproject})

    }catch(error){
        return res.json({error})
    }
}

const getOneProject = async(req, res)=>{
    try{
        const id = req.params.id
        // const project= projects.filter(el =>el.id == id)
        // console.log(project);
        const pool = await mssql.connect(sqlConfig)
        const project = (await pool.request().input('id', id).execute('getOneProject')).recordset
        res.json({
            project:project
        })
    }catch(error){
        return res.json({error})
    }
}
const updateProject = async(req, res)=>{
    try {
        const {id} = req.params
        const {project_name, description, project_location, startdate, enddate} = req.body
        const pool = await mssql.connect(sqlConfig)
        const result = (await pool.request()
        .input('id',id)
        .input('project_name',mssql.VarChar,project_name)
        .input('description',mssql.VarChar,description)
        .input('project_location',mssql.VarChar,project_location)
        .input('startdate',mssql.Date,startdate)
        .input('enddate',mssql.Date,enddate)

        .execute('updateProject'));

        console.log(result);

        if(result.rowsAffected == 1){
            res.json({
                message: 'project updated successfully'
            })
        }else{
            res.json({
                message: 'project not found'
            })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

const deleteProject =async(req, res)=>{
    try{

        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('id', id)
        .execute('deleteProject')
        if(result.rowsAffected == 1){
            res.json({
                    message: 'Project deleted successfully'
            })
        }else{
            res.json({
                message: 'Project not found'
        })
        }
        
    }catch(error){
        return res.json({Error:error})
    }
}

module.exports={
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject
}
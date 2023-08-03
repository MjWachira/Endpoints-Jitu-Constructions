import mssql from 'mssql'
import { createProject, deleteProject, getOneProject, getProjects, updateProject } from './projectsController'

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()


}

describe("Projects Controller", ()=>{

    describe("creating a new project", ()=>{
        it("should create a project successfully", async()=> {
            const projectId="etd62737366363"
            const newProject={
                project_name: "Build a House",
                description: "build hOUSE 100 cars at once ",
                project_location:"Meru",
                startdate: "2023/7/25",
                enddate: "2024/7/25"
        }
        const req = {
            params:{id:projectId},
            body:newProject
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected:[1] 
            })

        })
        await createProject(req,res)
        expect(res.json).toHaveBeenCalledWith({
                message: "project created Successfully"
            })
    
        })
    })
        it("should reteurn error when project not created", async()=> {
            const projectId="etd62737366363"
            const newProject={
                project_name: "Build a House",
                description: "build hOUSE 100 cars at once ",
                project_location:"Meru",
                startdate: "2023/7/25",
                enddate: "2024/7/25"
        }
        const req = {
            params:{id:projectId},
            body:newProject
        }
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
               rowsAffected: [0]
            })

        })
        await createProject(req,res)
        expect(res.json).toHaveBeenCalledWith({
            message: "creation failed"
         })
    
    })
    
    describe("Gets all Projects", ()=>{
        it("should return all projects" , async()=>{
            const mockProjects = [
                {
                  id: '1464dda6-5651-4d3c-8c1c-527d977e15d8',
                  project_name: 'Build A bridge',
                  description: 'Build the nithi bridge',
                  project_location: 'Tharaka Nithi',
                  startdate: '2023-07-24',
                  enddate: '2023-08-24'
                },
                {
                 id: "17b69921-b058-4097-921a-93c7f7b6b93c",
                 project_name: "Build a House",
                 description: "build hOUSE 100 cars at once ",
                 project_location: "Meru",
                 startdate: "2023-07-24T00:00:00.000Z",
                 enddate: "2024-07-24T00:00:00.000Z"
                }
            ]
            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockProjects
                })
            })

            await getProjects(req, res)

            //expect(jest.fn(res.status)).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({projects: mockProjects})
        })
    })

    describe("Getting Project By ID", ()=>{
        it ("should return the specified project", async()=>{
            const projectID = 'sryiuaraw1234'
            const mockProject = {
                id: "1464dda6-5651-4d3c-8c1c-527d977e15d8",
                project_name: "Build A bridge",
                description: "Build the nithi bridge",
                project_location: "Tharaka Nithi",
                startdate: "2023-07-24",
                enddate: "2023-08-24"
              }

            const req = {
                params: {
                    id: projectID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [mockProject]
                })
            })

            await getOneProject(req, res)

            expect(res.json).toHaveBeenCalledWith({project: [mockProject]})
        })

    })

    describe("Updating a Project", ()=>{
        it("should update a project successfully", async()=>{
            const projectID = 'asd56879809'
            const updatedProject = {
                project_name: "Build a House",
                description: "build hOUSE 100 cars at once ",
                project_location:"Meru",
                startdate: "2023/7/25",
                enddate: "2024/7/25"
            }
            const req = {
                params:{
                    id:projectID
                },
                body: updatedProject
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await updateProject(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: "project updated successfully"
            })
        })

        it("should return error when project ID does not exist", async ()=>{
            const projectID = 'asd56879809'
            const updatedProject = {
                project_name: "Build a House",
                description: "build hOUSE 100 cars at once ",
                project_location:"Meru",
                startdate: "2023/7/25",
                enddate: "2024/7/25"
            }
            const req = {
                params:{
                    id:projectID
                },
                body: updatedProject
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await updateProject(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'project not found'
            })
        }) 
    })


    describe("Deleting a project", ()=>{
        it("should delete the project successfully", async()=>{
            const projectID = 'sryiuaraw1234'
            const req = {
                params:{
                    id: projectID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await deleteProject(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Project deleted successfully'
            })
        })

        it("should return an error 'project not found'", async()=>{
            const projectID = 'sryiuaraw1234'
            const req = {
                params:{
                    id: projectID
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await deleteProject(req, res)


            expect(res.json).toHaveBeenCalledWith({
                message: 'Project not found'
            })
        })
    })
 })
    
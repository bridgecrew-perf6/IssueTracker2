import React from 'react'

function ProjectItem({ index, project, history, setProjectId, setEdit, small, setShow }) {
    const dateString = new Date(project.createdAt).toDateString()
    const newTargetDate = new Date(project.targetEndDate).toDateString()
    const handleClick = (e) => {
        switch (e.target.name) {
            case "view":
                history.push(`/projects/${project._id}`)
                break
            case "edit":
                setEdit(true)
                setProjectId(project._id)
                setShow(prev => ({...prev, createModal: true}))
                break
            case "remove": 
                setProjectId(project._id)
                setShow(prev => ({...prev, removeModal: true}))    
                break
            default:
                return
        }   
    }
    if (small) {
        return (
            <tr>
                <th scope="row">{index}</th>
                <td>{project.projectName}</td>
                <td>{newTargetDate}</td>
            </tr>
        )
    } else {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{project.projectName}</td>
            <td>{dateString}</td>
            <td>
                {
                    <>
                        <button name="view" onClick={handleClick}>View</button>
                        <button data-bs-toggle="modal" data-bs-target="#projectModal" name="edit" onClick={handleClick}>edit</button>
                        <button data-bs-toggle="modal" data-bs-target="#removeModal" name="remove" onClick={handleClick}>remove</button>
                    </>
                }
            </td>
        </tr>
    )
}}

export default ProjectItem
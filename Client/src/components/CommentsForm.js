import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postComment } from '../store/actions/issueActions'

export default function CommentsForm( { closeModal, id, initialComment}) {
  const [comment, setComment] = useState(initialComment)
  const dispatch = useDispatch()
  const handleChange = e => {
    setComment(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postComment(id, comment))
    closeModal()
  }
  return (
    <div>
      <form>
        <div className="mb-3" >
          <label htmlFor="comments" className="form-label">Comment</label>
          <input value={comment ? comment : ""} onChange={handleChange} type="text" className="form-control" name="comment" />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Add Comment</button>
      </form>
    </div>
  )
}
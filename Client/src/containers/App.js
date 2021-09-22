import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Main from '../components/Main'
import AuthForm from '../components/AuthForm'
import Test from '../components/Test'
import ProjectPage from '../containers/ProjectPage'
import AllProjects from '../containers/AllProjects'
import MyProfile from '../components/MyProfile'
import AllIssues from './AllIssues'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin } from '../store/actions/authActions'
import "../App.css"
import IssuePage from '../components/IssuePage'
//auth and removeeror

function App() {
  const { currentUser, projects, issues } = useSelector(state => state)
  const isLoggedIn = currentUser.isAuthenticated

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(autoLogin())
  }, [])


  const findProject = (projectId) => {
    return projects.find(project => project._id === projectId)
  }

  const findIssue = (issueId) => {
    return issues.find(issue => issue._id === issueId)
  }
  const filterMyProjects = (userId) => {
    return projects.filter(project => project.createdBy._id === userId)
  }
  const filterMyIssues = (userId) => {
    return issues.filter(issue => issue.createdBy._id === userId)
  }
  // <Redirect to='/login' />
  return (
    <div className="container">
      <Switch>
        <Route exact path="/"
          render={routeProps =>
            <Main {...routeProps} currentUser={currentUser} />
          } />
        <Route exact path="/login"
          render={routeProps => !isLoggedIn
            ? <AuthForm {...routeProps} />
            : <Redirect to='/projects' />
          } />
        <Route exact path="/signup"
          render={routeProps => !isLoggedIn
            ? <AuthForm signup {...routeProps} />
            : <Redirect to='/projects' />
          } />
        <Route exact path="/test" render={() => <Test />} />
        <Route exact path="/projects/:projectId"
          render={(routeProps) => isLoggedIn
            ? <ProjectPage
              project={findProject(routeProps.match.params.projectId)}
              user={currentUser.user}
              issues={issues}
              {...routeProps}
            />
            : <Redirect to='/' />
          } />
        <Route exact path="/projects"
          render={(routeProps) => isLoggedIn
            ? <AllProjects
              currentUser={currentUser}
              {...routeProps}
            />
            : <Redirect to='/' />
          } />
        <Route exact path={`/:userId/profile`}
          render={(routeProps) => isLoggedIn
            ? <MyProfile
              currentUser={currentUser}
              projects={filterMyProjects(currentUser.user.id)}
              issues={filterMyIssues(currentUser.user.id)}
              {...routeProps}
            />
            : <Redirect to='/' />
          } />
        <Route exact path="/issues/:issueId"
          render={(routeProps) => isLoggedIn
            ? <IssuePage
              issues={issues}
              issue={findIssue(routeProps.match.params.issueId)}
              {...routeProps}
            />
            : <Redirect to='/' />
          } />
        <Route exact path={`/issues`}
          render={(routeProps) => isLoggedIn
            ? <AllIssues
              projects={projects}
              currentUser={currentUser}
              {...routeProps}
            />
            : <Redirect to='/' />
          } />
      </Switch>
    </div>
  )
}


export default App

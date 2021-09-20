import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from '../components/Main'
import AuthForm from '../components/AuthForm'
import Test from '../components/Test'
import ProjectPage from '../containers/ProjectPage'
import AllProjects from '../containers/AllProjects'
import MyProfile from '../components/MyProfile'
import AllIssues from './AllIssues'
import { connect } from 'react-redux'
import { authUser } from '../store/actions/authActions'
import { getProjects } from '../store/actions/projectActions'
import { getIssues } from '../store/actions/issueActions'
import { getUsers } from '../store/actions/userActions'
import { removeError } from '../store/actions/errorActions'
import "../App.css"
import IssuePage from '../components/IssuePage'

function App(props) {
  const { getUsers, currentUser, errors, removeError, authUser, getProjects, projects, getIssues, issues, users } = props

  useEffect(() => {
      getProjects()
      getUsers()
      getIssues()
  }, [getProjects, getUsers, getIssues])
  
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

  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={routeProps => <Main {...routeProps} currentUser={currentUser} />} />
        <Route exact path="/login"
          render={routeProps =>
            <AuthForm
              errors={errors}
              authUser={authUser}
              removeError={removeError}
              {...routeProps}
            />
          }
        />
        <Route exact path="/signup"
          render={routeProps =>
            <AuthForm
              authUser={authUser}
              errors={errors}
              removeError={removeError}
              signup
              {...routeProps}
            />
          }
        />
        <Route exact path="/test" render={() => <Test />} />
        <Route exact path="/projects/:projectId"
          render={(routeProps) =>
            <ProjectPage
              projects={projects}
              users={users}
              project={findProject(routeProps.match.params.projectId)}
              issues={issues}
              {...routeProps}
            />
          } />
        <Route exact path="/projects"
          render={(routeProps) =>
            <AllProjects
              currentUser={currentUser}
              {...routeProps}
            />
          } />
        <Route exact path={`/:userId/profile`}
          render={(routeProps) =>
            <MyProfile
              currentUser={currentUser}
              projects={filterMyProjects(currentUser.user.id)}
              issues={filterMyIssues(currentUser.user.id)}
              {...routeProps}
            />
          } />
        <Route exact path="/issues/:issueId"
          render={(routeProps) =>
            <IssuePage
              issues={issues}
              issue={findIssue(routeProps.match.params.issueId)}
              {...routeProps}
            />
          } />
        <Route exact path={`/issues`}
          render={(routeProps) =>
            <AllIssues
              projects={projects}
              currentUser={currentUser}
              {...routeProps}
            />
          } />
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    projects: state.projects,
    issues: state.issues,
    users: state.users,
  }
}

export default connect(mapStateToProps, { authUser, getProjects, getIssues, getUsers, removeError })(App)

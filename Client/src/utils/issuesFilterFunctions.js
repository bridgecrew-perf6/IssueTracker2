function firstFunction(filterValue, issues) {
  const filVal = "blah"
  const filterIssues = i => {
    switch (filterValue) {
      case "open": return i.status === "open"
      case "closed": return i.status === "closed"
      default: return true
    }
  }
  issues.filter(
    issue =>
      issue.title.toLowerCase().includes(filVal.toLocaleLowerCase()) &&
      filterIssues(issue)
  )
}
import React from "react"
import { graphql } from "react-apollo"
import { withRouter } from "react-router-dom"
import AuthForm from "./AuthForm"
import query from "../../queries/currentUser"
import LoginMutation from "../../mutations/Login"

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      this.props.history.push(`/dashboard/${nextProps.data.currentUser.id}`)
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message)
        this.setState({ errors })
      })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default withRouter(graphql(query)(graphql(LoginMutation)(LoginForm)))

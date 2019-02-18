import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandling = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      request: null,
      respone: null
    };

    constructor() {
      super();
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({
            error: error
          });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.state.requestInterceptor);
      axios.interceptors.response.eject(this.state.responseInterceptor);
    }
    
    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            onModalClose={() => {
              this.setState({ error: null });
            }}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};
export default withErrorHandling;

import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        };
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.respInterceptor = axios.interceptors.response.use(resp => resp, err => {
                this.setState({error: err});
            });
        }
        componentWillUnmount(){
            //console.log('Will Unmount', this.reqInterceptor, this.respInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }
        errorConfirmedHandler = () =>{
            this.setState({error: null});
        }
        render(){
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error} 
                        modalClosed={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    };
};

export default withErrorHandler;
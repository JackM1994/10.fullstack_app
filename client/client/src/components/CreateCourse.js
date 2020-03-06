import React, {Component} from 'react';
import Form from './Form';

class CreateCourse extends Component{
    constructor(props){
        super(props);
        this.state= {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: null,
            errors:[]
        }
    }

    render(){
        const{
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

      
     
        return (
            <React.Fragment>
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Create Course"
                  elements={() => (
                    <React.Fragment>
                      <input 
                        id="title" 
                        name="title" 
                        type="text"
                        value={title} 
                        onChange={this.change} 
                        placeholder="Course title" />
                      <input 
                        id="description" 
                        name="description" 
                        type="textarea"
                        value={description} 
                        onChange={this.change} 
                        placeholder="Course description" />
                      <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text"
                        className="course--time-input"
                        value={estimatedTime} 
                        onChange={this.change} 
                        placeholder="Estimated Time" />
                      <input 
                        id="materialsNeeded" 
                        name="materialsNeeded"
                        type="text"
                        className="materials"
                        value={materialsNeeded} 
                        onChange={this.change} 
                        placeholder="Materials" />
                    </React.Fragment>
                  )} />
              </div>
            </React.Fragment>
          );
        } 
        change =(event) => {
            const name = event.target.name;
            const value = event.target.value;

            this.setState(() =>{
                return {
                    [name]: value
                };
            });
        }
        submit = () => {
            const { context } = this.props;
        
            const {
              title,
              description,
              estimatedTime,
              materialsNeeded,
            } = this.state;
        
            //New course payload
            const newCourse ={
              title,
              description,
              estimatedTime,
              materialsNeeded,
              userId: context.authenticatedUser.id
            }
            const emailAddress = context.authenticatedUser.emailAddress;
            const password = context.authenticatedUser.password;

            context.data.createCourse(newCourse, emailAddress, password)
              .then(errors => {
                if(errors.length){
                  this.setState( { errors } );
                }else{
                    console.log(`User ${context.authenticatedUser.emailAddress} successfully created: ${newCourse}`);
                    this.props.history.push('/');
                
                }
              })
              .catch( err => {
                console.log(err);
                this.props.history.push('/error') // push to history stack
              })
          }
        
          cancel = () => {
            this.props.history.push('/');
        
          }
}
export default CreateCourse;


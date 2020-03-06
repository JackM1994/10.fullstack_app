import React, { Component } from 'react';
import Form from './Form';

class UpdateCourse extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: null,
            errors: []
        }
    }

    componentDidMount() {
        //getting the existing course data
        const { context } = this.props;
        const courseId = this.props.match.params.id;
        const authUserId = context.authenticatedUser.id;

        context.data.getCourse(courseId)
        .then(course => {
            const courseOwnerId = course.userId
            if (course) {
                if (courseOwnerId === authUserId) {
                    this.setState({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                        userId: course.userId
                    });
                } else {
                    this.props.history.push('/forbidden');
                }
            } else {
                this.props.history.push('/notfound');
            }
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error'); 
        });
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
                        type="text"
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
            
          );
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
            const updateCourse ={
              title,
              description,
              estimatedTime,
              materialsNeeded,
              userId: context.authenticatedUser.id
            }
            const emailAddress = context.authenticatedUser.emailAddress;
            const password = context.authenticatedUser.password;

            context.data.updateCourse(updateCourse, emailAddress, password)
              .then(errors => {
                if(errors.length){
                  this.setState( { errors } );
                }else{
                    console.log(`Course : ${updateCourse.id} has being successfully updated`);
                    this.props.history.push(`/courses/${updateCourse.id}`);
                
                }
              })
              .catch( err => {
                console.log(err);
                this.props.history.push('/error') // push to history stack
              })
          }
        
          cancel = () => {
            this.props.history.push(`/courses/${this.state.id}`);
        
          }
}
export default UpdateCourse;

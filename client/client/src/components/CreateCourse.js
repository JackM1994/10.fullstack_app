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
            errors,
        } = this.state;
        const {authenticatedUser} = this.props.context;
        const name = `${authenticatedUser.firstName} ${authenticatedUser.lastName}`;
      
     
        return (
            <React.Fragment>
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                    <div>
                      <h2 className="validation--errors--label">Validation Errors</h2>
                      <div className="validation-errors">
                        <ul>
                          <li>Please provide a value for Title</li>
                          <li>Please provide a value for Description</li>
                        </ul>
                    </div>
                    </div>
                <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Create Course"
                  elements={() => (
                    <React.Fragment>
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <div>
                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.change} />
                          </div>
                        </div>
                      </div>
                      <p> By {name} </p>
                      <div className="course--description">
                        <div><textarea id="description" name="description" className="" placeholder="Course Description..." value={description} onChange={this.change} /> </div>
                      </div>
                      <div className="grid-25 grid-right">
                        <div className="course-stats">
                          <ul className="course-stats--list">
                            <li className="course--stats-list--item">
                              <h4>Estimated Time</h4>
                              <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={this.change}  /></div>
                            </li>
                            <li className="course--stats-list-item">
                              <h4>Materials Needed</h4>
                              <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List of Materials" value={materialsNeeded} onChange={this.change} /></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
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

            //create the new Course
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


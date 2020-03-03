import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Public from './components/Public';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Course from './components/Course';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import withContext from './Context';
// import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
// const AuthWithContext = withContext(Authenticated);
const SignUpWithContext = withContext(SignUp);
const SignInWithContext = withContext(SignIn);
const SignOutWithContext = withContext(SignOut);
const CourseWithContext = withContext(Course);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Public} />
        {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signup" component={SignUpWithContext} />
        <Route path ="/signout" component={SignOutWithContext} />
        <Route path="/courses" component={CourseWithContext} />
        <Route path="/courses/create" component ={CreateCourseWithContext}/>
        <Route path="/courses/:id/update" component={UpdateCourseWithContext}/>
        <Route path="courses/:id-CourseDetail" component={CourseDetail} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
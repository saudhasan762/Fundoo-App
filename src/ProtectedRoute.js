import React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom";
let authenticated = false;

const  isAuthenticated = () => {
    if(localStorage.getItem("Token") === null){
      authenticated = false;
    }
    else{
      authenticated = true;
    }
    console.log(authenticated);
  return authenticated;
}

export default function ProtectedRoute({component: Component, ...rest}){
    return(
        <Route {...rest} render = {(props) => {
            if(isAuthenticated()){
                return <Component {...props}/>
            }
            else{
                return <Redirect to={
                    {
                        pathname: "/",
                        state : {
                            from: props.location
                        }
                    }
                }/>
            }
        }}/>
    )
}
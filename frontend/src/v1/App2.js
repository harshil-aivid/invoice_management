import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ReportPage from "./ReportPage";
import UploadPage from "./UploadPage";
import LoginPage from "./LoginPage";
import { EuiPage, EuiPageContent, EuiPageBody } from "@elastic/eui";

import Header from "../components/Header";

export default function App() {
  return (
    <>
      <Router>
        <Header />

        <EuiPage paddingSize="none" className="container">
          <EuiPageBody paddingSize="l">
            <EuiPageContent
              verticalPosition="center"
              horizontalPosition="center"
              className="w-full"
              // paddingSize="none"
            >
              <Switch>
                <Route path="/report" component={ReportPage} />
                <Route path="/upload" component={UploadPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to="/login" />
              </Switch>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </Router>
    </>
  );
}

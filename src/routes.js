import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./pages/Layout";
import Alunos from "./pages/Alunos";
import Disciplinas from "./pages/Disciplinas";
import Matricula from "./pages/Matricula";

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/alunos" component={Alunos} />
        <Route path="/disciplinas" component={Disciplinas} />
        <Route path="/matricula" component={Matricula} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;

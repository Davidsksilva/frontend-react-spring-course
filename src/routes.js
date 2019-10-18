import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./pages/Layout";
import Alunos from "./pages/Alunos";
import FormAluno from "./pages/Alunos/form";

import Disciplinas from "./pages/Disciplinas";
import Matricula from "./pages/Matricula";

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/alunos" exact component={Alunos} />
        <Route path="/alunos/novo" exact component={FormAluno} />
        <Route path="/alunos/editar/:id" exact component={FormAluno} />

        <Route path="/disciplinas" exact component={Disciplinas} />

        <Route path="/matricula" exact component={Matricula} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;

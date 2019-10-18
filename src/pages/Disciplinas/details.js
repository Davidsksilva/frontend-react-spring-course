import React, { Component } from "react";
import api from "../../services/api";

import { Link } from "react-router-dom";
import { Table, Row, Col, Button } from "antd";

export default class DetalhesDisciplina extends Component {
  state = {
    alunos: []
  };

  columns = [
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula"
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.nome.localeCompare(b.nome)
    },
    {
      title: "Curso",
      dataIndex: "curso",
      key: "curso"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Idade",
      dataIndex: "idade",
      key: "idade",
      sorter: (a, b) => a.idade - b.idade
    }
  ];

  fetchAlunos = async () => {
    const response = api.get("/matriculas");

    const matriculas = response.data;

    if (matriculas) {
      const { codigo } = this.state;
      const alunos = matriculas.filter(m => m.codigoDisciplina === codigo);

      this.setState({
        alunos
      });
    }
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/disciplinas/${id}`);

    const disciplina = response.data;

    if (disciplina) {
      this.setState({
        ...disciplina
      });
    }
  }

  render() {
    const { nome, codigo, professor, qtdevagas, alunos } = this.state;
    return (
      <>
        <div style={{ backgroundColor: "#fff", padding: 24 }}>
          <h1>Detalhes</h1>
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <span>Nome: {nome}</span>
            <br />
            <span>Código: {codigo}</span>
            <br />
            <span>Professor: {professor}</span>
            <br />
            <span>Quantidade de Vagas: {qtdevagas}</span>
          </div>
          <h1>Alunos Matriculados</h1>
          <Table
            dataSource={alunos}
            columns={this.columns}
            style={{ marginTop: 24 }}
          />

          <Row style={{ marginTop: 24 }} type="flex" justify="end" gutter={16}>
            <Col>
              <Link to="/disciplinas">
                <Button type="default">Voltar</Button>
              </Link>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

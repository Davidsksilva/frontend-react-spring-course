import React from "react";

import { Col, Row, InputNumber, Button, Table, Icon } from "antd";

import api from "../../services/api";
export default class Matricula extends React.Component {
  state = {
    codigoDisciplina: null,
    matriculaAluno: null,
    matriculas: []
  };

  fetchMatriculas = async () => {
    const response = await api.get("/matriculas");

    const matriculas = response.data;

    this.setState({
      matriculas
    });
  };

  handleDelete = async id => {
    await api.delete(`matriculas/${id}`);
    await this.fetchMatriculas();
  };

  columns = [
    {
      title: "Código Disciplina",
      dataIndex: "codigoDisciplina",
      key: "codigoDisciplina"
    },
    {
      title: "Matrícula do Aluno",
      dataIndex: "matriculaAluno",
      key: "matriculaAluno"
    },
    {
      title: "",
      key: "buttons",
      width: 150,
      render: (text, record) => {
        return (
          <Row>
            <Col span={12}>
              <Button
                type="danger"
                onClick={() => this.handleDelete(record.id)}
              >
                <Icon type="delete" />
              </Button>
            </Col>
          </Row>
        );
      }
    }
  ];

  componentDidMount() {
    this.fetchMatriculas();
  }

  handleConfirm = async () => {
    await api.post("/matriculas", this.state);

    this.setState({
      codigoDisciplina: null,
      matriculaAluno: null
    });

    await this.fetchMatriculas();
  };

  render() {
    const { matriculas } = this.state;
    return (
      <div style={{ backgroundColor: "#fff", padding: 24 }}>
        <Row type="flex" gutter={16} justify="center">
          <Col span={6}>
            <span>Matrícula do Aluno</span>
            <InputNumber
              style={{ width: "100%" }}
              onChange={value => this.setState({ matriculaAluno: value })}
              value={this.state.matriculaAluno}
            />
          </Col>
          <Col span={6}>
            <span>Código da Disciplina</span>
            <InputNumber
              style={{ width: "100%" }}
              onChange={value => this.setState({ codigoDisciplina: value })}
              value={this.state.codigoDisciplina}
            />
          </Col>
          <Col span={4} style={{ alignItems: "flex-end", display: "flex" }}>
            <Button type="primary" onClick={() => this.handleConfirm()}>
              Confirmar
            </Button>
          </Col>
        </Row>
        <Table
          dataSource={matriculas}
          columns={this.columns}
          style={{ marginTop: 24 }}
        />
      </div>
    );
  }
}

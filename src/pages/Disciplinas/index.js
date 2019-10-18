import React from "react";

import { Table, Row, Col, Button, Icon } from "antd";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "antd/dist/antd.css";

class Disciplinas extends React.Component {
  state = {
    disciplinas: []
  };

  fetchDisciplinas = async () => {
    const response = await api.get("/disciplinas");
    this.setState({
      disciplinas: response.data
    });
  };

  handleDelete = async id => {
    await api.delete(`disciplinas/${id}`);
    await this.fetchDisciplinas();
  };

  columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo"
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.nome.localeCompare(b.nome)
    },
    {
      title: "Professor",
      dataIndex: "professor",
      key: "professor"
    },
    {
      title: "Qtde. Vagas",
      dataIndex: "qtdevagas",
      key: "qndevagas"
    },
    {
      title: "",
      key: "buttons",
      width: 200,
      render: (text, record) => {
        return (
          <Row>
            <Col span={8}>
              <Button
                type="danger"
                onClick={() => this.handleDelete(record.id)}
              >
                <Icon type="delete" />
              </Button>
            </Col>
            <Col span={8}>
              <Link to={`/disciplinas/${record.id}/editar/`}>
                <Button type="primary">
                  <Icon type="edit" />
                </Button>
              </Link>
            </Col>
            <Col span={8}>
              <Link to={`/disciplinas/${record.id}/detalhes/`}>
                <Button type="default">
                  <Icon type="eye" />
                </Button>
              </Link>
            </Col>
          </Row>
        );
      }
    }
  ];

  componentDidMount() {
    this.fetchDisciplinas();
  }

  render() {
    const { disciplinas } = this.state;

    return (
      <div style={{ backgroundColor: "#fff", padding: 24 }}>
        <Row style={{ marginBottom: 24 }}>
          <Link to="/disciplinas/novo">
            <Button type="primary">Cadastrar</Button>
          </Link>
        </Row>
        <Row style={{ marginBottom: 24 }}>
          <Table dataSource={disciplinas} columns={this.columns} rowKey="id" />
        </Row>
      </div>
    );
  }
}

export default Disciplinas;

import React from "react";

import { Table, Row, Col, Button, Icon } from "antd";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "antd/dist/antd.css";

class Alunos extends React.Component {
  state = {
    alunos: []
  };

  fetchAlunos = async () => {
    const response = await api.get("/alunos");
    this.setState({
      alunos: response.data
    });
  };

  handleDelete = async id => {
    await api.delete(`alunos/${id}`);
    await this.fetchAlunos();
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
            <Col span={12}>
              <Link to={`/alunos/${record.id}/editar/`}>
                <Button type="primary">
                  <Icon type="edit" />
                </Button>
              </Link>
            </Col>
          </Row>
        );
      }
    }
  ];

  componentDidMount() {
    this.fetchAlunos();
  }

  render() {
    const { alunos } = this.state;

    return (
      <div style={{ backgroundColor: "#fff", padding: 24 }}>
        <Row style={{ marginBottom: 24 }}>
          <Link to="/alunos/novo">
            <Button type="primary">Cadastrar</Button>
          </Link>
        </Row>
        <Row style={{ marginBottom: 24 }}>
          <Table dataSource={alunos} columns={this.columns} rowKey="id" />
        </Row>
      </div>
    );
  }
}

export default Alunos;

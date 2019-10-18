import React from "react";

import { Row, Col, Input, InputNumber, Button } from "antd";

import { Link } from "react-router-dom";

import api from "../../services/api";

export default class FormDisciplina extends React.Component {
  state = {
    nome: "",
    qtdevagas: null,
    codigo: null,
    professor: ""
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      const response = await api.get(`/disciplinas/${id}`);

      const { nome, qtdevagas, codigo, professor } = response.data;
      console.log(response.data);
      this.setState({
        nome,
        qtdevagas,
        codigo,
        professor
      });
    }
  }

  checkDisabled = () => {
    const { nome, qtdevagas, codigo, professor } = this.state;

    return nome === "" || !qtdevagas || !codigo || professor === "";
  };

  handleConfirm = async () => {
    const { id } = this.props.match.params;

    if (id) {
      await api.put(`/disciplinas/${id}`, this.state);
    } else {
      await api.post("/disciplinas", this.state);
    }

    this.props.history.push("/disciplinas");
  };

  render() {
    return (
      <div style={{ backgroundColor: "#fff", padding: 24 }}>
        <h1>Cadastro</h1>
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <span>Nome</span>
            <Input
              onChange={e => this.setState({ nome: e.target.value })}
              value={this.state.nome}
            />
          </Col>
          <Col span={6}>
            <span>Código</span>
            <InputNumber
              style={{ display: "block", width: "100%" }}
              onChange={value => this.setState({ codigo: value })}
              value={this.state.codigo}
            />
          </Col>
          <Col span={6}>
            <span>Quantidade de Vagas</span>
            <InputNumber
              style={{ display: "block", width: "100%" }}
              onChange={value => this.setState({ qtdevagas: value })}
              value={this.state.qtdevagas}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <span>Professor</span>
            <Input
              onChange={e => this.setState({ professor: e.target.value })}
              value={this.state.professor}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }} type="flex" justify="end" gutter={16}>
          <Col>
            <Link to="/disciplinas">
              <Button type="default">Cancelar</Button>
            </Link>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={this.checkDisabled()}
              onClick={() => this.handleConfirm()}
            >
              Confirmar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

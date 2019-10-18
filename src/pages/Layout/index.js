import React from "react";

import { Link } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";

import "antd/dist/antd.css";

const { Header, Sider } = Layout;

class LayoutTemplate extends React.Component {
  state = {
    collapsed: false,
    selectedKey: "Alunos"
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleItemClick = item => {
    this.setState({
      selectedKey: item.key
    });
  };

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["Alunos"]}
            onClick={item => this.handleItemClick(item)}
          >
            <Menu.Item key="Alunos">
              <Link to="/alunos">
                <Icon type="user" />
                <span>Alunos</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Disciplinas">
              <Link to="/disciplinas">
                <Icon type="book" />
                <span>Disciplinas</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="Matricula">
              <Link to="/matricula">
                <Icon type="form" />
                <span>Matricula</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", paddingLeft: 24 }}>
            <Icon
              style={{ fontSize: 18, paddingRight: 24 }}
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <span style={{ fontSize: 20, fontWeight: "bold" }}>
              {this.state.selectedKey}
            </span>
          </Header>
          <div style={{ padding: 24 }}> {this.props.children}</div>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutTemplate;

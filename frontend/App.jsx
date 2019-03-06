import React, { Component } from "react";
//import Logo from './logo_pdp.png';

class App extends Component {
  constructor(){
    super();
    this.state = {
      Nombre: '',
      Direccion: '',
      Telefono: '',
      Email: '',
      Ciudad: 'Cali',
      Intereses: 'Futbol',
      Users: [],
      _id: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this)
  }

  getUsers(){
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        this.setState({
          Users: data
        });
      });
  }

  componentDidMount(){
    this.getUsers();
  }

  handleChange(e){
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  addUser(e){
    if(this.state._id){
      fetch(`/api/users/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json)
        .then(data => {
          this.setState({
            Nombre: '',
            Direccion: '',
            Telefono: '',
            Email: '',
            Ciudad: 'Default',
            Intereses: 'Default',
            _id: ''
          });
          this.getUsers();
        })
    }
    else{
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          $('#alerta').toast('show');
          this.setState({
            Nombre: '',
            Direccion: '',
            Telefono: '',
            Email: '',
            Ciudad: 'Default',
            Intereses: 'Default'
          });
          this.getUsers();
        })
        .catch(err => console.error(err));
    }

    e.preventDefault();
  }

  deleteUser(id){
    console.log(id);
    if(confirm('¿Desea eliminar usuario?')){
      fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json)
        .then(data => {
          /*Toast */
          this.getUsers()
        })
    }
  }

  editUsers(id){
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          Nombre: data.Nombre,
          Direccion: data.Direccion,
          Telefono: data.Telefono,
          Email: data.Email,
          Ciudad: data.Ciudad,
          Intereses: data.Intereses,
          _id: data._id
        })
      })
  }
  render() {
    const users = this.state.Users.map((user, i) =>{
      return(
        <div className="card mb-3" key={i}>
          <div className="card-header">
            <h3 key={user._id} >{user.Nombre}</h3>
            <div className="float-right">
              <button onClick={() => this.editUsers(user._id)} className="btn btn-warning mr-1"><i class="fas fa-edit"></i></button>
              <button onClick={() => this.deleteUser(user._id)} className="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
          <div className="card-body">
            <h6>Direccion: {user.Direccion} </h6>
            <h6>Telefono: {user.Telefono} </h6>
            <h6>Email: {user.Email} </h6>
            <h6>Ciudad: {user.Ciudad} </h6>
            <h6>Intereses: {user.Intereses} </h6>
          </div>
        </div>
      )
    })
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
          <p className="navbar-brand">PDPARTNER</p>
        </nav>
        <div className="container-fluid">
          <div className="form-row">
            <div className="col-md-4">
              <form className="card mr-3 mb-5" onSubmit={this.addUser}>
                <div className="card-header">
                  <h2>Registrar nuevo usuario</h2>
                </div>
                <div className="card-body">
                  <input id="Nombre" onChange={this.handleChange} type="text" placeholder="Nombre" className="form-control mb-2" value={this.state.Nombre} />
                  <input id="Direccion" onChange={this.handleChange} type="text" placeholder="Direccion" className="form-control mb-2" value={this.state.Direccion} />
                  <input id="Telefono" onChange={this.handleChange} type="text" placeholder="Telefono" className="form-control mb-2" value={this.state.Telefono} />
                  <input id="Email" onChange={this.handleChange} type="Email" placeholder="Email" className="form-control mb-2" value={this.state.Email} />
                  <select id="Ciudad" onChange={this.handleChange} className="form-control mb-2" value={this.state.Ciudad}>
                    <option>Default</option>
                    <option>Cali</option>
                    <option>Bogota</option>
                    <option>Pasto</option>
                  </select>
                  <select id="Intereses" onClick={this.handleChange} className="form-control mb-2" value={this.state.Intereses} >
                    <option>Default</option>
                    <option>Futbol</option>
                    <option>Tecnologia</option>
                    <option>Carros</option>
                  </select>
                  
                  <button type="submit" className="btn btn-primary btn-block mb-4 mt-4">Registrar</button>
                </div>
              </form>
            </div>
            <div className="col-md-8">
              <div className="alert alert-dark mb-5" role="alert">
                <h2>Usuarios Registrados: <span className="badge badge-pill badge-light"> {this.state.Users.length} </span></h2>
              </div>
              {users}
            </div>
          </div>
        </div>
        <div id="alerta" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <p class="rounded mr-2"></p>
            <strong class="mr-auto">PdPartner</strong>
            <small class="text-muted">Justo ahora</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">
            Usuario registrado
          </div>
        </div>
      </div>
    );
  }
}

export default App;
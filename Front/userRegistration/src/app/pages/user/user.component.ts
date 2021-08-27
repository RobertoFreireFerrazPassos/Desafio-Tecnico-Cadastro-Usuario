import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm : FormGroup;
  genders : string[] = ['Masculino','Feminino'];
  // Cadastro de Usuários
  // O cadastro de usuários deverá ser uma tela com os seguintes campos:
  // 	Nome
  // 	Data de Nascimento
  // 	E-mail
  // 	Senha
  // 	Sexo (combo)
  // 	Salvar (botão)
  // Regra de negócio
  // 	O cadastro deverá ser salvo no banco de dados como “Ativo”;
  // 	Os campos Nome, Data de Nascimento, E-mail e Sexo, deverão ser obrigatórios;
  // 	O campo Nome deverá ter um limite mínimo de 3 caracteres;
  // 	Deverá ser exibido uma mensagem informando ao usuário que o cadastro foi feito com sucesso.


  constructor() { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'name' : new FormControl(null, null),
      'birthDate' : new FormControl(null, null),
      'email' : new FormControl(null, null),
      'password' : new FormControl(null, null),
      'gender' : new FormControl(null, null)
    });
  }

  saveUserForm() : void {

  }
}

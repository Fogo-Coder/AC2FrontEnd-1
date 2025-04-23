import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports:[CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formulario!: FormGroup;
  eventos = ["TechConf 2025", "Summit de Inovação", "Angular Worlda", "Conexão Dev"];
  modalidades = ["Presencial", "Online"];
  ingressos = ["Padrão", "VIP", "Estudante"];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      evento: ['', Validators.required],
      modalidade: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataTermino: ['', Validators.required],
      participantes: this.fb.array([])
    });

    this.carregarDados();
    this.formulario.valueChanges.subscribe(val => localStorage.setItem('formulario', JSON.stringify(val)));
  }

  get participantes(): FormArray {
    return this.formulario.get('participantes') as FormArray;
  }

  adicionarParticipante(): void {
    const participante = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/)]],
      ingresso: ['', Validators.required]
    });
    this.participantes.push(participante);
  }

  removerParticipante(index: number): void {
    this.participantes.removeAt(index);
  }

  carregarDados(): void {
    const dadosSalvos = localStorage.getItem('formulario');
    if (dadosSalvos) {
      this.formulario.setValue(JSON.parse(dadosSalvos));
    }
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      localStorage.removeItem('formulario');
    }
  }
}
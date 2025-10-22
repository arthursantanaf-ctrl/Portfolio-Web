// --- Seleção dos Elementos ---
const botoesNumero = document.querySelectorAll('[data-numero]');
const botoesOperador = document.querySelectorAll('[data-operador]');
const botaoIgual = document.querySelector('[data-igual]');
const botaoApagar = document.querySelector('[data-apagar]');
const botaoLimparTudo = document.querySelector('[data-limpar-tudo]');
const elementoTextoOperandoAnterior = document.querySelector('#operando-anterior');
const elementoTextoOperandoAtual = document.querySelector('#operando-atual');

// --- Classe Principal da Calculadora ---
class Calculadora {
    constructor(elementoTextoOperandoAnterior, elementoTextoOperandoAtual) {
        this.elementoTextoOperandoAnterior = elementoTextoOperandoAnterior;
        this.elementoTextoOperandoAtual = elementoTextoOperandoAtual;
        this.limpar(); 
    }

    limpar() {
        this.operandoAtual = '0';
        this.operandoAnterior = '';
        this.operacao = undefined;
        this.atualizarVisor();
    }

    apagar() {
        if (this.operandoAtual === '0' || this.operandoAtual.length === 1) {
            this.operandoAtual = '0';
        } else {
            this.operandoAtual = this.operandoAtual.toString().slice(0, -1);
        }
        this.atualizarVisor();
    }

    adicionarNumero(numero) {
        if (numero === '.' && this.operandoAtual.includes('.')) return;
        if (this.operandoAtual === '0' && numero !== '.') {
            this.operandoAtual = numero;
        } else {
            this.operandoAtual = this.operandoAtual.toString() + numero.toString();
        }
        this.atualizarVisor();
    }

    escolherOperacao(operacao) {
        if (this.operandoAtual === '0' && this.operandoAnterior === '') return;
        if (this.operandoAnterior !== '') {
            this.calcular(); 
        }
        this.operacao = operacao;
        this.operandoAnterior = this.operandoAtual;
        this.operandoAtual = '0';
        this.atualizarVisor();
    }

    calcular() {
        let calculo;
        const anterior = parseFloat(this.operandoAnterior);
        const atual = parseFloat(this.operandoAtual);
        if (isNaN(anterior) || isNaN(atual)) return; 
        
        switch (this.operacao) {
            case '+':
                calculo = anterior + atual;
                break;
            case '-':
                calculo = anterior - atual;
                break;
            case '×':
                calculo = anterior * atual;
                break;
            case '÷':
                if (atual === 0) {
                    alert("Não é possível dividir por zero!");
                    this.limpar();
                    return;
                }
                calculo = anterior / atual;
                break;
            default:
                return;
        }
        this.operandoAtual = calculo;
        this.operacao = undefined;
        this.operandoAnterior = '';
        this.atualizarVisor();
    }

    formatarNumeroVisor(numero) {
        const numeroString = numero.toString();
        const digitosInteiros = parseFloat(numeroString.split('.')[0]);
        const digitosDecimais = numeroString.split('.')[1];
        let visorInteiros;
        if (isNaN(digitosInteiros)) {
            visorInteiros = '';
        } else {
            // Formata para o padrão brasileiro (ex: 1.000)
            visorInteiros = digitosInteiros.toLocaleString('pt-br', { maximumFractionDigits: 0 });
        }
        if (digitosDecimais != null) {
            // Usa vírgula para decimal no Brasil
            return `${visorInteiros},${digitosDecimais}`;
        } else {
            return visorInteiros;
        }
    }

    atualizarVisor() {
        this.elementoTextoOperandoAtual.innerText = this.formatarNumeroVisor(this.operandoAtual);
        if (this.operacao != null) {
            this.elementoTextoOperandoAnterior.innerText = 
                `${this.formatarNumeroVisor(this.operandoAnterior)} ${this.operacao}`;
        } else {
            this.elementoTextoOperandoAnterior.innerText = '';
        }
    }
}


// --- Instancia a Calculadora e Liga os Eventos ---
const calculadora = new Calculadora(elementoTextoOperandoAnterior, elementoTextoOperandoAtual);

botoesNumero.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.adicionarNumero(botao.innerText);
    });
});

botoesOperador.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.escolherOperacao(botao.innerText);
    });
});

botaoIgual.addEventListener('click', botao => {
    calculadora.calcular();
});

botaoLimparTudo.addEventListener('click', botao => {
    calculadora.limpar();
});

botaoApagar.addEventListener('click', botao => {
    calculadora.apagar();
});

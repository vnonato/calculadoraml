
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', calcularVenda);
});

function formatarNumero(numero) {
    return numero.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function calcularVenda() {
    const valorCompra = parseFloat(document.getElementById('valorCompra').value) || 0;
    const lucroDesejado = parseFloat(document.getElementById('lucroDesejado').value) || 0;
    const tarifaMLPercent = parseFloat(document.getElementById('tarifaML').value) / 100 || 0;
    const impostoPercent = parseFloat(document.getElementById('imposto').value) / 100 || 0;
    const custoOperacional = parseFloat(document.getElementById('custoOperacional').value) || 0;
    const calcularEmbalagem = parseFloat(document.getElementById('calcularEmbalagem').value) || 0;

    const feedbackElement = document.getElementById('feedback');
    if (isNaN(valorCompra) || isNaN(lucroDesejado) || isNaN(tarifaMLPercent) || isNaN(impostoPercent) || isNaN(custoOperacional) || isNaN(calcularEmbalagem)) {
        feedbackElement.innerText = "Por favor, insira valores válidos.";
        return;
    }

    feedbackElement.innerText = "";

    // Calcular o lucro desejado sobre o custo
    const lucro = (valorCompra + custoOperacional + calcularEmbalagem + 6.00) * (lucroDesejado / 100);

    // Calcular o preço de venda bruto inicial
    let precoVendaBruto = (valorCompra + custoOperacional + calcularEmbalagem + 6.00 + lucro) / (1 - (tarifaMLPercent + impostoPercent));

    // Aplicar a nova regra de cobrança adicional
    let cobrancaAdicional = (precoVendaBruto > 79.00) ? 14.45 : 0;

    // Recalcular o preço de venda final incluindo a cobrança adicional
    let precoVendaFinal = (valorCompra + custoOperacional + calcularEmbalagem + 6.00 + lucro + cobrancaAdicional) / (1 - (tarifaMLPercent + impostoPercent));

    // Calcular valores informativos
    const tarifaFixa = 6.00 + cobrancaAdicional;
    const tarifaML = precoVendaFinal * tarifaMLPercent;
    const impostoPago = precoVendaFinal * impostoPercent;
    const lucroVenda = (lucro / precoVendaFinal) * 100;
    const lucroCompra = (lucro / (valorCompra + custoOperacional + calcularEmbalagem + 6.00)) * 100;

    document.getElementById('precoVenda').innerText = formatarNumero(precoVendaFinal);

    document.getElementById('custoProduto').innerText = formatarNumero(valorCompra);
    document.getElementById('tarifaFixaML').innerText = formatarNumero(tarifaFixa);
    document.getElementById('tarifaML').innerText = formatarNumero(tarifaML) + " (" + (tarifaMLPercent * 100) + "%)";
    document.getElementById('impostoPago').innerText = formatarNumero(impostoPago) + " (" + (impostoPercent * 100) + "%)";
    document.getElementById('lucro').innerText = formatarNumero(lucro) + " (" + lucroDesejado + "%)";
    document.getElementById('lucroVenda').innerText = formatarNumero(lucroVenda) + "%";
    document.getElementById('lucroCompra').innerText = formatarNumero(lucroCompra) + "%";
}

// Calcular inicialmente com os valores padrão
calcularVenda();

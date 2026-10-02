function calcularDesconto(preco, desconto) {
    const valorDesconto = preco * (desconto / 100);
    const precoFinal = preco - valorDesconto;

    return precoFinal;
}

export default calcularDesconto;
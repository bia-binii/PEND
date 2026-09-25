function tickClock() {
    const el = document.getElementById('clock');
    const now = new Date();
    el.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
tickClock();
setInterval(tickClock, 1000 * 30);


async function loadWeather() {
    const wEl = document.getElementById('w-weather');
    const vEl = document.getElementById('weather-value');
    wEl.classList.add('loading');
    try {
        const pos = await new Promise((res, rej) =>
            navigator.geolocation
                ? navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 })
                : rej(new Error('sem geolocalização'))
        );
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await res.json();
        const cw = data.current_weather;
        const codeMap = {
            0: 'Céu limpo', 1: 'Poucas nuvens', 2: 'Parc. nublado', 3: 'Nublado', 45: 'Neblina', 48: 'Neblina',
            51: 'Garoa', 61: 'Chuva', 63: 'Chuva', 65: 'Chuva forte', 71: 'Neve', 80: 'Pancadas', 95: 'Tempestade'
        };
        const desc = codeMap[cw.weathercode] || 'Condições variadas';
        vEl.innerHTML = `${Math.round(cw.temperature)}°C <span class="sub">${desc}</span>`;
    } catch (e) {
        vEl.textContent = 'indisponível';
    } finally {
        wEl.classList.remove('loading');
    }
}

// cambio
async function loadExchange() {
    const usdEl = document.getElementById('usd-value');
    const eurEl = document.getElementById('eur-value');
    document.getElementById('w-usd').classList.add('loading');
    document.getElementById('w-eur').classList.add('loading');
    try {
        const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
        const data = await res.json();
        const usd = parseFloat(data.USDBRL.bid);
        const eur = parseFloat(data.EURBRL.bid);
        usdEl.textContent = `R$ ${usd.toFixed(2)}`;
        eurEl.textContent = `R$ ${eur.toFixed(2)}`;
    } catch (e) {
        usdEl.textContent = 'indisponível';
        eurEl.textContent = 'indisponível';
    } finally {
        document.getElementById('w-usd').classList.remove('loading');
        document.getElementById('w-eur').classList.remove('loading');
    }
}

// biticoin
async function loadBitcoin() {
    const el = document.getElementById('btc-value');
    const wrap = document.getElementById('w-btc');
    wrap.classList.add('loading');
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true');
        const data = await res.json();
        const price = data.bitcoin.brl;
        const change = data.bitcoin.brl_24h_change;
        const dir = change >= 0 ? 'up' : 'down';
        const arrow = change >= 0 ? '▲' : '▼';
        el.innerHTML = `R$ ${price.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} <span class="sub ${dir}">${arrow} ${Math.abs(change).toFixed(2)}%</span>`;
    } catch (e) {
        el.textContent = 'indisponível';
    } finally {
        wrap.classList.remove('loading');
    }
}

async function loadAll() {
    loadWeather();
    loadExchange();
    loadBitcoin();
}

document.getElementById('refresh-btn').addEventListener('click', (e) => {
    e.currentTarget.classList.add('spinning');
    loadAll();
    setTimeout(() => e.currentTarget.classList.remove('spinning'), 500);
});

loadAll();
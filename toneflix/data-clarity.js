(() => {
  const root = document.querySelector('#cs-data-clarity');
  if (!root) return;
  const initial = [80, 79.9, null, 79.8, 79.9, 79.7, 79.6];
  let values = [...initial], selected = 6;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const get = id => root.querySelector('#' + id);
  const buttons = days.map((day, i) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = day.slice(0, 3);
    button.addEventListener('click', () => { selected = i; get('data-feedback').textContent = ''; render(); });
    get('data-days').append(button); return button;
  });
  function render() {
    const recorded = values.filter(v => v !== null);
    const avg = recorded.reduce((a, b) => a + b, 0) / recorded.length;
    get('data-latest').innerHTML = values[6].toFixed(1) + ' <small>kg</small>';
    get('data-average').innerHTML = avg.toFixed(1) + ' <small>kg</small>';
    get('data-count').textContent = recorded.length + ' readings this week';
    const lo = Math.floor((Math.min(...recorded) - .15) * 10) / 10;
    const hi = Math.ceil((Math.max(...recorded) + .15) * 10) / 10;
    const y = v => 155 - (v - lo) / (hi - lo) * 125;
    const x = i => 46 + i * 43;
    let chart = `<svg viewBox="0 0 330 190" role="img" aria-label="Weight readings from 14 to 20 September, kilograms. Average ${avg.toFixed(1)}. Individual readings are available using the day buttons below.">`;
    [lo, (lo + hi) / 2, hi].forEach(v => {chart += `<path d="M40 ${y(v)}H316" stroke="#393939"/><text x="2" y="${y(v)+4}" fill="#bcbcbc" font-size="10">${v.toFixed(1)}</text>`;});
    chart += `<path d="M40 ${y(avg)}H316" stroke="#ddd" stroke-dasharray="4 5"/>`;
    values.forEach((v,i) => { chart += `<text x="${x(i)}" y="180" text-anchor="middle" fill="#bcbcbc" font-size="10">${14+i}</text>`;if(v!==null) chart += `<circle cx="${x(i)}" cy="${y(v)}" r="${selected===i?6:4}" fill="#ed8736" stroke="${selected===i?'white':'#ed8736'}" stroke-width="2"/>`; });
    get('data-chart').innerHTML = chart + '</svg>';
    buttons.forEach((b,i) => {b.setAttribute('aria-pressed',String(i===selected));b.setAttribute('aria-label',`${days[i]}, ${14+i} September: ${values[i]===null?'no reading':values[i].toFixed(1)+' kilograms'}`);});
    get('data-selected').textContent = `${days[selected]}, ${14+selected} September`;
    get('data-source').textContent = values[selected]===null ? 'No reading recorded. Add one if you have it.' : 'Manually entered · Fictional reading';
    get('data-weight').value = values[selected] ?? '';
  }
  get('data-edit').addEventListener('submit', e => {
    e.preventDefault();
    if(!get('data-edit').reportValidity()) return;
    values[selected] = Number(get('data-weight').value);
    render(); get('data-feedback').textContent = 'Sample reading saved. Chart and average updated.';
  });
  get('data-reset').addEventListener('click', () => {values=[...initial];selected=6;render();get('data-feedback').textContent='Original sample restored.';});
  render();
})();

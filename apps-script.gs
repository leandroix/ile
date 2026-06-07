// ═══════════════════════════════════════════════════════════════
//  Apps Script — Asé Ogun dá lè ko
//
//  COMO USAR:
//  1. Acesse script.google.com
//  2. Crie um novo projeto
//  3. Apague o código existente e cole todo este arquivo
//  4. Clique em Implantar → Nova implantação
//  5. Tipo: "App da Web"
//  6. Executar como: "Minha conta"
//  7. Quem tem acesso: "Qualquer pessoa"
//  8. Clique em Implantar e copie a URL gerada
//  9. Cole essa URL no app → Config → Configurar Google
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'save') return saveData(data.payload);
    if (data.action === 'load') return loadData();
    return jsonResponse({ok:false, error:'Ação desconhecida'});
  } catch(err) {
    return jsonResponse({ok:false, error:err.message});
  }
}

function doGet(e) {
  if (e.parameter.action === 'load') return loadData();
  return jsonResponse({ok:true, msg:'Asé Ogun API online ✓'});
}

// ── SALVAR ───────────────────────────────────────
function saveData(payload) {
  const ss = getOrCreateSpreadsheet();

  saveSheet(ss, 'Membros', payload.members,
    ['id','name','role','orixa','phone','email','initDate','obs']);

  saveSheet(ss, 'Eventos', payload.events,
    ['id','name','date','time','place','notes']);

  saveSheet(ss, 'Mensalidades', payload.payments,
    ['id','memberId','memberName','month','value','status']);

  saveSheet(ss, 'Despesas', payload.expenses,
    ['id','desc','cat','value','date']);

  saveConfig(ss, payload);

  const url = 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/edit';
  return jsonResponse({ok:true, sheetId:ss.getId(), sheetUrl:url});
}

// ── CARREGAR ─────────────────────────────────────
function loadData() {
  const ss = getOrCreateSpreadsheet();
  return jsonResponse({
    ok: true,
    members:  readSheet(ss, 'Membros'),
    events:   readSheet(ss, 'Eventos'),
    payments: readSheet(ss, 'Mensalidades'),
    expenses: readSheet(ss, 'Despesas'),
    config:   readConfig(ss)
  });
}

// ── PLANILHA ─────────────────────────────────────
function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SHEET_ID');
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch(e) {}
  }
  const ss = SpreadsheetApp.create('Asé Ogun — Dados do barracão');
  props.setProperty('SHEET_ID', ss.getId());
  ['Membros','Eventos','Mensalidades','Despesas','Config'].forEach(name => {
    if (!ss.getSheetByName(name)) ss.insertSheet(name);
  });
  ['Sheet1','Planilha1'].forEach(n => {
    const s = ss.getSheetByName(n);
    if (s) try { ss.deleteSheet(s); } catch(e) {}
  });
  return ss;
}

function saveSheet(ss, name, rows, cols) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  sh.clearContents();
  sh.appendRow(cols);
  sh.getRange(1,1,1,cols.length).setFontWeight('bold').setBackground('#f3e6e6');
  if (rows && rows.length) {
    rows.forEach(r => sh.appendRow(cols.map(c => r[c] !== undefined ? r[c] : '')));
  }
}

function readSheet(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh) return [];
  const data = sh.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function saveConfig(ss, payload) {
  let sh = ss.getSheetByName('Config');
  if (!sh) sh = ss.insertSheet('Config');
  sh.clearContents();
  sh.appendRow(['Chave', 'Valor']);
  [
    ['name',    payload.name    || ''],
    ['address', payload.address || ''],
    ['fee',     payload.fee     || 100],
    ['color',   payload.color   || '#5c1a1a']
  ].forEach(r => sh.appendRow(r));
}

function readConfig(ss) {
  const sh = ss.getSheetByName('Config');
  if (!sh) return {};
  const data = sh.getDataRange().getValues().slice(1);
  const cfg = {};
  data.forEach(r => { if (r[0]) cfg[r[0]] = r[1]; });
  return cfg;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

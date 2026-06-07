# App da Casa Religiosa — PWA

App completo para gerenciamento de casa religiosa que funciona como aplicativo
instalável no celular (PWA), sem precisar publicar na App Store ou Google Play.

## Arquivos

- `index.html` — App principal (toda a interface e lógica)
- `manifest.json` — Configuração do PWA (nome, ícone, cores)
- `sw.js` — Service worker (funciona offline)
- `icons/` — Ícones do app (você precisa adicionar, veja abaixo)

---

## Como hospedar (gratuito)

### Opção 1 — GitHub Pages (recomendado)

1. Crie uma conta em https://github.com
2. Crie um repositório novo (ex: `comunidade-app`)
3. Faça upload de todos os arquivos para o repositório
4. Vá em **Settings → Pages → Branch: main → Save**
5. Seu app estará em: `https://seu-usuario.github.io/comunidade-app`

### Opção 2 — Netlify (arrastar e soltar)

1. Acesse https://netlify.com e crie uma conta gratuita
2. Na página principal, arraste a pasta `pwa-casa-religiosa` para a área de upload
3. Pronto! O app ganha um link automático (ex: `https://nome-aleatorio.netlify.app`)
4. Você pode personalizar o domínio nas configurações

### Opção 3 — Vercel

1. Acesse https://vercel.com
2. Importe o repositório GitHub ou faça upload da pasta
3. Deploy automático

---

## Como instalar no celular

### Android (Chrome)
1. Abra o link do app no Chrome
2. Toque no menu (⋮) no canto superior direito
3. Toque em **"Adicionar à tela inicial"**
4. Confirme → o app aparece como ícone na tela inicial

### iPhone/iPad (Safari)
1. Abra o link do app no Safari (obrigatório — Chrome não funciona no iOS)
2. Toque no botão de compartilhar (⬆ na barra inferior)
3. Role e toque em **"Adicionar à tela de início"**
4. Confirme → o app aparece como ícone na tela inicial

---

## Ícones necessários

Adicione dois arquivos na pasta `icons/`:
- `icon-192.png` — 192×192 pixels
- `icon-512.png` — 512×512 pixels

Você pode criar os ícones gratuitamente em:
- https://www.canva.com (template "ícone de app")
- https://favicon.io (gerador rápido)
- https://maskable.app (para ícones maskable do Android)

---

## Dados e Google Drive

Os dados ficam salvos no dispositivo (localStorage) por padrão.

Para sincronizar via Google Sheets:
1. Crie uma planilha no Google Sheets
2. Copie o ID da URL (a parte entre `/d/` e `/edit`)
3. No app, vá em **Config → Configurar armazenamento** e cole o ID
4. Para integração completa com a API do Google, será necessário um
   desenvolvedor configurar as credenciais OAuth — esta é uma extensão futura.

---

## Funcionalidades

- ✅ Cadastro e edição de membros
- ✅ Controle de mensalidades (em dia / pendente / atrasado)
- ✅ Agenda de eventos com anotações
- ✅ Dashboard com resumo financeiro
- ✅ Configuração do nome da casa religiosa
- ✅ Exportação de backup em JSON
- ✅ Funciona offline após instalação
- ✅ Tela cheia no celular (sem barra do navegador)
- ✅ Dados salvos localmente no dispositivo

// Configuração de login
const LOGIN_CREDENTIALS = {
    username: "funcionario",
    password: "sterileno"
};

// Configuração EmailJS (você precisa substituir pelas suas chaves)
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',        // Substitua pela sua Service ID
    templateId: 'YOUR_TEMPLATE_ID',       // Substitua pela sua Template ID
    publicKey: 'YOUR_PUBLIC_KEY'          // Substitua pela sua Public Key
};

// Inicializar EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Função para verificar login
function checkLogin() {
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    
    const username = usernameInput.value.toLowerCase().trim();
    const password = passwordInput.value;
    
    if (username === LOGIN_CREDENTIALS.username && password === LOGIN_CREDENTIALS.password) {
        // Login correto - mostrar conteúdo
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        // Login incorreto - mostrar erro
        errorMessage.style.display = 'flex';
        errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i>Usuário ou senha incorretos! Tente novamente.';
        usernameInput.value = '';
        passwordInput.value = '';
        usernameInput.focus();
        
        // Esconder erro após 3 segundos
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

// Verificar se já está autenticado
function checkAuthentication() {
    // Sempre mostrar tela de login (removido localStorage)
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    
    loginScreen.style.display = 'flex';
    mainContent.style.display = 'none';
}

// Permitir login com Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkLogin();
    }
}

// Sistema de Solicitação de Acesso
function showRequestForm() {
    document.getElementById('request-form').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideRequestForm() {
    document.getElementById('request-form').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Gerar credenciais temporárias
function generateTemporaryCredentials() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5);
    return {
        username: `temp_${timestamp}`,
        password: `access_${random}`
    };
}

// Processar solicitação de acesso
function processAccessRequest(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('request-name').value,
        email: document.getElementById('request-email').value,
        department: document.getElementById('request-department').value,
        reason: document.getElementById('request-reason').value,
        notes: document.getElementById('request-notes').value,
        timestamp: new Date().toLocaleString('pt-BR'),
        credentials: generateTemporaryCredentials()
    };
    
    // Mostrar loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Dados para o template do EmailJS
    const templateParams = {
        to_name: formData.name,
        to_email: formData.email,
        from_name: 'Equipe de TI - STERILENO',
        subject: 'Acesso Temporário - Manual de Segurança',
        username: formData.credentials.username,
        password: formData.credentials.password,
        access_link: 'https://vitorfaustin0.github.io/manual-seguranca-sterileno',
        department: formData.department,
        reason: formData.reason,
        timestamp: formData.timestamp
    };
    
    // Enviar email via EmailJS
    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(function(response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
            
            // Mostrar sucesso
            alert(`✅ Solicitação processada com sucesso!\n\n📧 Email enviado automaticamente para: ${formData.email}\n\n🔐 Credenciais geradas:\nUsuário: ${formData.credentials.username}\nSenha: ${formData.credentials.password}\n\n⚠️ IMPORTANTE: Estas credenciais são temporárias e expiram em 24 horas!`);
            
            // Limpar formulário
            document.getElementById('access-request-form').reset();
            hideRequestForm();
        })
        .catch(function(error) {
            console.error('Erro ao enviar email:', error);
            
            // Mostrar erro
            alert(`❌ Erro ao enviar email automaticamente.\n\n🔐 Credenciais geradas:\nUsuário: ${formData.credentials.username}\nSenha: ${formData.credentials.password}\n\n📧 Por favor, entre em contato com a TI para receber as credenciais.\n\nContato: helpdesk@sterileno.com.br`);
            
            // Limpar formulário
            document.getElementById('access-request-form').reset();
            hideRequestForm();
        })
        .finally(function() {
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// Dados das ITOs resumidos em linguagem simples
const itosData = {
    'backup': {
        title: 'Backup e Recuperação de Dados',
        content: `
            <div class="ito-content">
                <h3>🎯 Por que é importante?</h3>
                <p>O backup é como um "seguro" para seus arquivos. Se algo der errado com seu computador, você não perde seus trabalhos importantes.</p>
                
                <h3>📋 O que você precisa saber:</h3>
                <ul>
                    <li><strong>Backup automático:</strong> Seus arquivos são salvos automaticamente todos os dias</li>
                    <li><strong>Pasta pessoal:</strong> Você tem uma pasta com seu nome na rede (USERS) para salvar arquivos importantes</li>
                    <li><strong>Recuperação:</strong> Se precisar recuperar um arquivo, abra um chamado no TI</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Dica Importante:</h4>
                    <p>Sempre salve seus arquivos importantes na pasta USERS da rede. Assim, mesmo se seu computador quebrar, seus arquivos estarão seguros!</p>
                </div>
                
                <h3>⚠️ O que fazer:</h3>
                <ul>
                    <li>Salve arquivos importantes na pasta USERS</li>
                    <li>Se não tiver uma pasta, peça para o TI criar</li>
                    <li>Não deixe arquivos importantes apenas no seu computador</li>
                </ul>
                
                <div class="warning">
                    <h4>🚨 Atenção:</h4>
                    <p>Se você não salvar seus arquivos na rede e seu computador quebrar, pode ser que não consiga recuperar seus trabalhos!</p>
                </div>
            </div>
        `
    },
    'mesa-limpa': {
        title: 'Política de Mesa e Tela Limpas',
        content: `
            <div class="ito-content">
                <h3>🎯 Por que manter mesa e tela limpas?</h3>
                <p>Documentos e informações sensíveis não devem ficar expostos. É como trancar a porta de casa - você protege o que é importante!</p>
                
                <h3>📋 Regras importantes:</h3>
                <ul>
                    <li><strong>Documentos:</strong> Guarde em gavetas trancadas quando não estiver usando</li>
                    <li><strong>Informações sensíveis:</strong> Mantenha em local seguro e separado</li>
                    <li><strong>Anotações:</strong> Não deixe lembretes ou anotações visíveis</li>
                    <li><strong>Senhas:</strong> Nunca escreva senhas em papéis ou lembretes</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Dicas de Organização:</h4>
                    <ul>
                        <li>Limpe sua mesa ao final do expediente</li>
                        <li>Guarde agendas e cadernos em gavetas trancadas</li>
                        <li>Não deixe crachás ou chaves em qualquer lugar</li>
                        <li>Use protetor de tela com senha no computador</li>
                    </ul>
                </div>
                
                <h3>🚫 O que NÃO fazer:</h3>
                <ul>
                    <li>Deixar documentos sensíveis sobre a mesa</li>
                    <li>Anotar informações importantes em quadros brancos</li>
                    <li>Deixar computador "logado" quando sair</li>
                    <li>Guardar pastas importantes em prateleiras de fácil acesso</li>
                </ul>
                
                <div class="info">
                    <h4>🔒 Lembre-se:</h4>
                    <p>A segurança é responsabilidade de todos. Cada um deve fazer sua parte para proteger as informações da empresa!</p>
                </div>
            </div>
        `
    },
    'classificacao': {
        title: 'Classificação da Informação',
        content: `
            <div class="ito-content">
                <h3>🎯 O que é classificação da informação?</h3>
                <p>É como "etiquetar" as informações para saber quem pode ver e como devem ser tratadas. É como classificar documentos por importância.</p>
                
                <h3>📋 Níveis de classificação:</h3>
                
                <h4>🟢 Pública</h4>
                <ul>
                    <li>Qualquer pessoa pode ver</li>
                    <li>Informações que podem ser divulgadas</li>
                    <li>Exemplo: informações do site da empresa</li>
                </ul>
                
                <h4>🟡 Interna</h4>
                <ul>
                    <li>Apenas funcionários da empresa</li>
                    <li>Informações internas do trabalho</li>
                    <li>Exemplo: procedimentos internos</li>
                </ul>
                
                <h4>🟠 Confidencial</h4>
                <ul>
                    <li>Apenas pessoas autorizadas</li>
                    <li>Informações importantes para o negócio</li>
                    <li>Exemplo: dados de clientes, estratégias</li>
                </ul>
                
                <h4>🔴 Restrita</h4>
                <ul>
                    <li>Apenas pessoas específicas</li>
                    <li>Informações muito sensíveis</li>
                    <li>Exemplo: informações da diretoria</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Como identificar:</h4>
                    <p>Procure por etiquetas ou indicações no rodapé dos documentos que mostram o nível de classificação!</p>
                </div>
                
                <div class="warning">
                    <h4>🚨 Importante:</h4>
                    <p>Respeite sempre a classificação das informações. Não compartilhe informações confidenciais com pessoas não autorizadas!</p>
                </div>
            </div>
        `
    },
    'seguranca': {
        title: 'Segurança e Proteção da Informação',
        content: `
            <div class="ito-content">
                <h3>🎯 Por que proteger as informações?</h3>
                <p>As informações da empresa são valiosas e precisam ser protegidas. É como cuidar de um tesouro - você não quer que pessoas não autorizadas tenham acesso!</p>
                
                <h3>📋 Princípios fundamentais:</h3>
                
                <h4>🔐 Confidencialidade</h4>
                <ul>
                    <li>Apenas pessoas autorizadas podem ver</li>
                    <li>Não compartilhe informações com quem não deve saber</li>
                    <li>Mantenha senhas em segredo</li>
                </ul>
                
                <h4>✅ Integridade</h4>
                <ul>
                    <li>As informações devem estar corretas e completas</li>
                    <li>Não altere dados sem autorização</li>
                    <li>Reporte erros quando encontrar</li>
                </ul>
                
                <h4>🔄 Disponibilidade</h4>
                <ul>
                    <li>As informações devem estar disponíveis quando necessário</li>
                    <li>Faça backup dos arquivos importantes</li>
                    <li>Use apenas recursos autorizados</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Suas responsabilidades:</h4>
                    <ul>
                        <li>Use apenas informações que precisa para seu trabalho</li>
                        <li>Não tente acessar sistemas não autorizados</li>
                        <li>Mantenha suas senhas seguras</li>
                        <li>Reporte problemas de segurança</li>
                    </ul>
                </div>
                
                <h3>🚫 O que NÃO fazer:</h3>
                <ul>
                    <li>Compartilhar senhas com colegas</li>
                    <li>Acessar informações que não precisa</li>
                    <li>Usar equipamentos pessoais para acessar sistemas da empresa</li>
                    <li>Ignorar avisos de segurança</li>
                </ul>
                
                <div class="warning">
                    <h4>🚨 Lembre-se:</h4>
                    <p>O não cumprimento das regras de segurança pode resultar em penalidades, incluindo demissão!</p>
                </div>
            </div>
        `
    },
    'email': {
        title: 'Uso do Correio Eletrônico',
        content: `
            <div class="ito-content">
                <h3>🎯 Como usar o email de forma segura?</h3>
                <p>O email é uma ferramenta importante de comunicação, mas precisa ser usada com cuidado e profissionalismo.</p>
                
                <h3>📋 Regras importantes:</h3>
                
                <h4>✅ O que fazer:</h4>
                <ul>
                    <li>Use linguagem profissional</li>
                    <li>Seja claro e objetivo</li>
                    <li>Verifique o destinatário antes de enviar</li>
                    <li>Use assunto descritivo</li>
                    <li>Limpe sua caixa de entrada regularmente</li>
                </ul>
                
                <h4>❌ O que NÃO fazer:</h4>
                <ul>
                    <li>Enviar mensagens ofensivas ou inadequadas</li>
                    <li>Compartilhar informações confidenciais sem autorização</li>
                    <li>Responder emails de remetentes desconhecidos</li>
                    <li>Abrir anexos suspeitos</li>
                    <li>Usar email para assuntos pessoais excessivos</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Dicas para emails eficazes:</h4>
                    <ul>
                        <li><strong>Assunto:</strong> Seja específico sobre o que está falando</li>
                        <li><strong>Texto:</strong> Seja direto e claro</li>
                        <li><strong>Anexos:</strong> Só envie quando necessário</li>
                        <li><strong>Cópia:</strong> Só inclua pessoas que realmente precisam saber</li>
                    </ul>
                </div>
                
                <h3>🔒 Segurança no email:</h3>
                <ul>
                    <li>Não compartilhe sua senha</li>
                    <li>Use mensagem de ausência quando estiver fora</li>
                    <li>Delete emails suspeitos sem abrir</li>
                    <li>Não clique em links suspeitos</li>
                </ul>
                
                <div class="warning">
                    <h4>🚨 Atenção:</h4>
                    <p>Lembre-se: o email da empresa pode ser monitorado. Use apenas para assuntos profissionais!</p>
                </div>
            </div>
        `
    },
    'internet': {
        title: 'Uso da Internet',
        content: `
            <div class="ito-content">
                <h3>🎯 Como usar a internet de forma segura?</h3>
                <p>A internet é uma ferramenta poderosa, mas precisa ser usada com responsabilidade e segurança.</p>
                
                <h3>📋 Regras de uso:</h3>
                
                <h4>✅ O que é permitido:</h4>
                <ul>
                    <li>Pesquisas relacionadas ao trabalho</li>
                    <li>Acesso a sites profissionais</li>
                    <li>Uso educacional e de capacitação</li>
                    <li>Comunicação profissional</li>
                </ul>
                
                <h4>❌ O que é proibido:</h4>
                <ul>
                    <li>Sites de conteúdo inadequado</li>
                    <li>Redes sociais excessivas</li>
                    <li>Downloads de arquivos não autorizados</li>
                    <li>Jogos e entretenimento durante o trabalho</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Dicas de segurança:</h4>
                    <ul>
                        <li>Não baixe arquivos de sites suspeitos</li>
                        <li>Mantenha o antivírus atualizado</li>
                        <li>Não compartilhe informações confidenciais</li>
                        <li>Use apenas navegadores autorizados</li>
                    </ul>
                </div>
                
                <h3>🔍 Monitoramento:</h3>
                <p>Seus acessos na internet são monitorados pela empresa para garantir o cumprimento das regras e a segurança dos dados.</p>
                
                <h3>📱 Uso pessoal:</h3>
                <p>É permitido um uso mínimo e responsável para assuntos pessoais, desde que não interfira no trabalho e não viole as políticas da empresa.</p>
                
                <div class="warning">
                    <h4>🚨 Lembre-se:</h4>
                    <p>O uso inadequado da internet pode resultar em penalidades. Use com responsabilidade!</p>
                </div>
            </div>
        `
    },
    'treinamento': {
        title: 'Treinamento e Conscientização',
        content: `
            <div class="ito-content">
                <h3>🎯 Por que o treinamento é importante?</h3>
                <p>O treinamento em segurança da informação é fundamental para que todos saibam como proteger as informações da empresa. É como aprender as regras de trânsito - todos precisam saber para manter a segurança!</p>
                
                <h3>📋 O que você precisa saber:</h3>
                
                <h4>🎓 Treinamento obrigatório:</h4>
                <ul>
                    <li>Todos os funcionários devem receber treinamento</li>
                    <li>O treinamento acontece antes de começar a trabalhar</li>
                    <li>É contínuo - sempre há novidades para aprender</li>
                    <li>Inclui estagiários, terceirizados e prestadores de serviço</li>
                </ul>
                
                <h4>📝 Documentos importantes:</h4>
                <ul>
                    <li><strong>Termo de responsabilidade:</strong> Documento que você assina confirmando que conhece as regras</li>
                    <li><strong>Políticas de segurança:</strong> Regras que todos devem seguir</li>
                    <li><strong>Procedimentos:</strong> Como fazer as coisas de forma segura</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Responsabilidades:</h4>
                    <ul>
                        <li><strong>Você:</strong> Participar dos treinamentos e seguir as regras</li>
                        <li><strong>Seu chefe:</strong> Garantir que você receba o treinamento</li>
                        <li><strong>RH:</strong> Coordenar as atividades de treinamento</li>
                        <li><strong>TI:</strong> Fornecer o conteúdo técnico</li>
                    </ul>
                </div>
                
                <h3>🔄 Treinamento contínuo:</h3>
                <p>O treinamento não é só uma vez. É um processo contínuo que acontece enquanto a empresa existir, sempre com novidades e atualizações.</p>
                
                <div class="info">
                    <h4>📚 O que você aprende:</h4>
                    <ul>
                        <li>Como proteger informações</li>
                        <li>Como usar sistemas de forma segura</li>
                        <li>Como identificar riscos</li>
                        <li>Como reportar problemas</li>
                    </ul>
                </div>
                
                <div class="warning">
                    <h4>🚨 Importante:</h4>
                    <p>O não cumprimento das regras de segurança constitui falta grave e pode resultar em penalidades!</p>
                </div>
            </div>
        `
    },
    'rede': {
        title: 'Utilização de Rede',
        content: `
            <div class="ito-content">
                <h3>🎯 Como usar a rede corporativa?</h3>
                <p>A rede da empresa é como uma "estrada" que conecta todos os computadores. Precisa ser usada com cuidado para manter a segurança!</p>
                
                <h3>📋 Regras de acesso:</h3>
                
                <h4>🔑 Acesso à rede:</h4>
                <ul>
                    <li>Cada pessoa tem seu próprio login</li>
                    <li>O acesso deve ser solicitado ao TI</li>
                    <li>Computadores têm nomes únicos na rede</li>
                    <li>O cancelamento também deve ser solicitado</li>
                </ul>
                
                <h4>💻 Equipamentos pessoais:</h4>
                <ul>
                    <li>Podem ser autorizados em casos específicos</li>
                    <li>Devem ser cadastrados pelo TI</li>
                    <li>A empresa não fornece suporte técnico</li>
                    <li>Não são considerados estações de trabalho oficiais</li>
                </ul>
                
                <div class="highlight">
                    <h4>💡 Backup pessoal:</h4>
                    <p>Se você salvar arquivos no seu computador (não na rede), é sua responsabilidade fazer backup. Use a pasta USERS da rede para arquivos importantes!</p>
                </div>
                
                <h3>🚫 O que NÃO é permitido:</h3>
                <ul>
                    <li>Instalar equipamentos de rede sem autorização</li>
                    <li>Usar programas que sobrecarreguem a rede</li>
                    <li>Instalar software não autorizado</li>
                    <li>Acessar conteúdo inadequado</li>
                    <li>Instalar jogos ou programas pessoais</li>
                    <li>Abrir computadores para reparos</li>
                </ul>
                
                <h3>🛠️ Suporte técnico:</h3>
                <p>Para qualquer problema técnico, abra um chamado:</p>
                <ul>
                    <li><strong>Email:</strong> helpdesk@sterileno.com.br</li>
                    <li><strong>Ramal:</strong> 3313</li>
                    <li><strong>WhatsApp:</strong> (15) 99707-4818</li>
                </ul>
                
                <div class="warning">
                    <h4>🚨 Monitoramento:</h4>
                    <p>A TI pode auditar seu computador a qualquer momento para verificar o uso adequado dos recursos e a segurança das informações!</p>
                </div>
                
                <div class="info">
                    <h4>📞 Precisa de ajuda?</h4>
                    <p>Sempre que tiver dúvidas sobre o uso da rede, entre em contato com a equipe de TI. Eles estão aqui para ajudar!</p>
                </div>
            </div>
        `
    },
    'chamados': {
        title: 'Abertura de Chamados - Suporte TI',
        content: `
            <div class="ito-content">
                <div class="warning">
                    <h4>🚨 Atenção Colaboradores 🚨</h4>
                    <p>Para garantir o correto acompanhamento e resolução de todos os problemas relacionados à Tecnologia da Informação (TI), solicitamos que todos os chamados sejam abertos enviando um e-mail para <strong>helpdesk@sterileno.com.br</strong>.</p>
                </div>
                
                <h3>📋 Como abrir um chamado corretamente:</h3>
                
                <h4>✏️ Assunto do E-mail:</h4>
                <p>Coloque um resumo do problema no campo de assunto.</p>
                
                <h4>📝 Corpo do E-mail:</h4>
                <p>Detalhe o ocorrido de forma clara e completa.</p>
                
                <div class="highlight">
                    <h4>⚠️ Importante:</h4>
                    <p>Não inclua pessoas em cópia! O chamado somente é aberto para um único e-mail. Caso contrário, o chamado será automaticamente deletado.</p>
                </div>
                
                <h4>📎 Anexos:</h4>
                <p>Anexe imagens ou arquivos que possam ajudar no melhor entendimento e resolução do problema.</p>
                
                <h3>📋 Exemplo Prático:</h3>
                
                <div class="info">
                    <h4>📧 Exemplo de Assunto:</h4>
                    <p><strong>"Problema com a Impressora da Sala de Reunião"</strong></p>
                </div>
                
                <div class="info">
                    <h4>📝 Exemplo de Corpo do E-mail:</h4>
                    <p><strong>Estou enfrentando um problema com a impressora da sala de reunião. A impressora não está respondendo aos comandos de impressão enviados do meu computador.</strong></p>
                    
                    <p><strong>Descrição do Problema:</strong></p>
                    <ul>
                        <li><strong>Modelo da Impressora:</strong> HP LaserJet Pro M402</li>
                        <li><strong>Descrição:</strong> Ao tentar imprimir um documento, a impressora não responde e permanece offline</li>
                        <li><strong>Ação Realizada:</strong> Reiniciei a impressora e o computador, sem sucesso</li>
                    </ul>
                    
                    <p><strong>Anexos:</strong></p>
                    <ul>
                        <li>📸 Foto da mensagem de erro exibida no painel da impressora</li>
                        <li>💻 Captura de tela do status da impressora no meu computador</li>
                    </ul>
                </div>
                
                <div class="highlight">
                    <h4>🙏 Sua colaboração é essencial!</h4>
                    <p>Para garantirmos um atendimento eficiente e ágil, siga essas orientações ao abrir chamados. Agradecemos a compreensão e o apoio de todos.</p>
                </div>
                
                <h3>📞 Contatos de Suporte:</h3>
                <ul>
                    <li><strong>Email:</strong> helpdesk@sterileno.com.br</li>
                    <li><strong>Ramal:</strong> 3313</li>
                    <li><strong>WhatsApp:</strong> (15) 99707-4818</li>
                </ul>
            </div>
        `
    }
};

// Dados do quiz
const quizData = [
    {
        question: "Qual é a frequência recomendada para backup dos arquivos importantes?",
        options: ["A) Semanalmente", "B) Diariamente", "C) Mensalmente", "D) Anualmente"],
        correct: "b",
        explanation: "O backup é feito diariamente para garantir que os arquivos estejam sempre atualizados e seguros."
    },
    {
        question: "O que você deve fazer com documentos sensíveis quando não estiver usando?",
        options: ["A) Deixar sobre a mesa", "B) Guardar em gaveta trancada", "C) Colocar na prateleira", "D) Deixar no computador"],
        correct: "b",
        explanation: "Documentos sensíveis devem ser guardados em gavetas trancadas para proteger as informações."
    },
    {
        question: "Qual nível de classificação permite acesso a qualquer pessoa?",
        options: ["A) Confidencial", "B) Interna", "C) Pública", "D) Restrita"],
        correct: "c",
        explanation: "Informações públicas podem ser acessadas por qualquer pessoa, incluindo o público em geral."
    },
    {
        question: "O que você NÃO deve fazer com suas senhas?",
        options: ["A) Memorizá-las", "B) Escrevê-las em papéis", "C) Usá-las regularmente", "D) Alterá-las periodicamente"],
        correct: "b",
        explanation: "Nunca escreva senhas em papéis ou lembretes, pois isso compromete a segurança."
    },
    {
        question: "Para que serve o treinamento em segurança da informação?",
        options: ["A) Apenas para funcionários novos", "B) Para ensinar como proteger as informações", "C) Só para a área de TI", "D) Apenas uma vez por ano"],
        correct: "b",
        explanation: "O treinamento ensina todos os funcionários sobre como proteger as informações da empresa de forma adequada."
    }
];

// Variáveis globais
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Função para abrir modal da ITO
function openITO(itoId) {
    const modal = document.getElementById('ito-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (itosData[itoId]) {
        modalTitle.textContent = itosData[itoId].title;
        modalBody.innerHTML = itosData[itoId].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Função para fechar modal
function closeITO() {
    const modal = document.getElementById('ito-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função para selecionar resposta do quiz
function selectAnswer(answer) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    
    event.target.classList.add('selected');
    userAnswers[currentQuestion] = answer;
    
    // Auto avançar para próxima pergunta após 1 segundo
    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showQuizResult();
        }
    }, 1000);
}

// Função para mostrar pergunta do quiz
function showQuestion() {
    const questionDiv = document.getElementById('quiz-question');
    const question = quizData[currentQuestion];
    
    questionDiv.innerHTML = `
        <h3>Pergunta ${currentQuestion + 1} de ${quizData.length}</h3>
        <p>${question.question}</p>
        <div class="quiz-options">
            <button class="quiz-option" onclick="selectAnswer('a')">${question.options[0]}</button>
            <button class="quiz-option" onclick="selectAnswer('b')">${question.options[1]}</button>
            <button class="quiz-option" onclick="selectAnswer('c')">${question.options[2]}</button>
            <button class="quiz-option" onclick="selectAnswer('d')">${question.options[3]}</button>
        </div>
    `;
}

// Função para mostrar resultado do quiz
function showQuizResult() {
    score = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct) {
            score++;
        }
    }
    
    const questionDiv = document.getElementById('quiz-question');
    const resultDiv = document.getElementById('quiz-result');
    
    questionDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    document.getElementById('quiz-score-text').textContent = `${score}/${quizData.length}`;
    
    let feedback = '';
    if (score === quizData.length) {
        feedback = 'Parabéns! Você acertou todas as perguntas! 🎉';
    } else if (score >= quizData.length * 0.8) {
        feedback = 'Muito bem! Você tem um bom conhecimento sobre segurança da informação! 👍';
    } else if (score >= quizData.length * 0.6) {
        feedback = 'Bom trabalho! Continue estudando para melhorar ainda mais! 📚';
    } else {
        feedback = 'Que tal revisar as ITOs para melhorar seu conhecimento? 📖';
    }
    
    document.getElementById('quiz-feedback').textContent = feedback;
}

// Função para reiniciar quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    const questionDiv = document.getElementById('quiz-question');
    const resultDiv = document.getElementById('quiz-result');
    
    questionDiv.style.display = 'block';
    resultDiv.style.display = 'none';
    
    showQuestion();
}

// Navegação suave
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação ao carregar a página
    checkAuthentication();
    
    // Adicionar evento de Enter nos campos de login
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    
    if (usernameInput) {
        usernameInput.addEventListener('keypress', handleKeyPress);
    }
    if (passwordInput) {
        passwordInput.addEventListener('keypress', handleKeyPress);
    }
    
    // Adicionar evento do formulário de solicitação
    const requestForm = document.getElementById('access-request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', processAccessRequest);
    }
    // Navegação do menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Atualizar link ativo
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Fechar modal ao clicar fora
    const modal = document.getElementById('ito-modal');
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeITO();
        }
    });
    
    // Inicializar quiz
    showQuestion();
    
    // Animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.ito-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Adicionar efeitos visuais aos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.ito-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

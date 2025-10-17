// Sistema de login apenas com credenciais temporárias

// Configuração EmailJS - STERILENO
const EMAILJS_CONFIG = {
    serviceId: 'service_jrw7o5l',        // Service ID do STERILENO
    templateId: 'template_n7m6c49',     // Template ID do STERILENO
    publicKey: 'xv1eljA7l7HgOGzm1'       // Public Key do STERILENO
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
    
    // Verificar apenas credenciais temporárias (formato: temp_xxxxxx / access_xxx)
    if (username.startsWith('temp_') && password.startsWith('access_')) {
        // Credenciais temporárias válidas
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
        return;
    }
    
    // Login incorreto - mostrar erro
    errorMessage.style.display = 'flex';
    errorMessage.innerHTML = '<i class="fas fa-exclamation-triangle"></i>Credenciais temporárias inválidas! Use as credenciais do email ou solicite acesso.';
    usernameInput.value = '';
    passwordInput.value = '';
    usernameInput.focus();
    
    // Esconder erro após 3 segundos
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
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
        from_email: 'sgi@sterileno.com.br',
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
            
            // Mostrar sucesso e fazer login automático
            alert(`✅ Solicitação processada com sucesso!\n\n📧 Email enviado automaticamente para: ${formData.email}\n\n🔐 Credenciais geradas:\nUsuário: ${formData.credentials.username}\nSenha: ${formData.credentials.password}\n\n🚀 Fazendo login automático...`);
            
            // Fazer login automático
            setTimeout(() => {
                // Preencher campos de login
                document.getElementById('username-input').value = formData.credentials.username;
                document.getElementById('password-input').value = formData.credentials.password;
                
                // Fazer login automaticamente
                checkLogin();
                
                // Limpar formulário
                document.getElementById('access-request-form').reset();
                hideRequestForm();
            }, 2000);
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

// Sistema de Quiz com Fases
const quizPhases = {
    phase1: {
        title: "Fase 1 - Conceitos Básicos",
        questions: [
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
        ]
    },
    phase2: {
        title: "Fase 2 - Práticas Intermediárias",
        questions: [
            {
                question: "Como classificar uma informação confidencial?",
                options: ["A) Qualquer informação da empresa", "B) Informações que podem causar danos se divulgadas", "C) Apenas documentos com carimbo de confidencial", "D) Informações que todos podem ver"],
                correct: "b",
                explanation: "Informações confidenciais são aquelas que podem causar danos à empresa se divulgadas indevidamente."
            },
            {
                question: "Qual é a política correta para uso do email corporativo?",
                options: ["A) Usar para assuntos pessoais", "B) Apenas para comunicação interna", "C) Usar apenas para comunicação oficial da empresa", "D) Compartilhar com qualquer pessoa"],
                correct: "c",
                explanation: "Email corporativo deve ser usado apenas para comunicação oficial da empresa."
            },
            {
                question: "O que fazer ao encontrar um documento confidencial na impressora?",
                options: ["A) Deixar para o dono pegar", "B) Jogar no lixo", "C) Entregar ao responsável ou destruir adequadamente", "D) Levar para casa"],
                correct: "c",
                explanation: "Documentos confidenciais devem ser entregues ao responsável ou destruídos adequadamente."
            },
            {
                question: "Qual é a prática correta para navegação na internet?",
                options: ["A) Acessar qualquer site", "B) Usar apenas sites aprovados pela empresa", "C) Baixar programas livremente", "D) Compartilhar senhas de acesso"],
                correct: "b",
                explanation: "Deve-se usar apenas sites aprovados pela empresa para navegação segura."
            },
            {
                question: "Como proteger informações em reuniões?",
                options: ["A) Falar alto para todos ouvirem", "B) Discutir em locais públicos", "C) Garantir que apenas pessoas autorizadas estejam presentes", "D) Gravar todas as conversas"],
                correct: "c",
                explanation: "Reuniões com informações sensíveis devem ter apenas pessoas autorizadas presentes."
            }
        ]
    },
    phase3: {
        title: "Fase 3 - Práticas Avançadas",
        questions: [
            {
                question: "Qual é a importância da conscientização em segurança?",
                options: ["A) Apenas para cumprir normas", "B) Reduzir riscos de segurança através do conhecimento", "C) Aumentar custos da empresa", "D) Complicar o trabalho dos funcionários"],
                correct: "b",
                explanation: "A conscientização reduz riscos de segurança através do conhecimento adequado dos funcionários."
            },
            {
                question: "Como proceder ao detectar uma violação de segurança?",
                options: ["A) Esconder o problema", "B) Tentar resolver sozinho", "C) Reportar imediatamente à TI", "D) Ignorar o problema"],
                correct: "c",
                explanation: "Violações de segurança devem ser reportadas imediatamente à equipe de TI."
            },
            {
                question: "Qual é a forma correta de abrir um chamado de TI?",
                options: ["A) Ligar diretamente para o técnico", "B) Enviar email para helpdesk@sterileno.com.br", "C) Falar com qualquer pessoa da TI", "D) Esperar o problema se resolver"],
                correct: "b",
                explanation: "Chamados devem ser abertos enviando email para helpdesk@sterileno.com.br."
            },
            {
                question: "Como garantir a segurança da rede corporativa?",
                options: ["A) Usar redes públicas", "B) Conectar dispositivos pessoais livremente", "C) Seguir as políticas de rede da empresa", "D) Compartilhar credenciais de acesso"],
                correct: "c",
                explanation: "A segurança da rede corporativa depende do seguimento das políticas estabelecidas pela empresa."
            },
            {
                question: "Qual é o objetivo final das políticas de segurança?",
                options: ["A) Complicar o trabalho", "B) Proteger as informações e garantir a continuidade dos negócios", "C) Aumentar custos", "D) Reduzir produtividade"],
                correct: "b",
                explanation: "As políticas de segurança visam proteger as informações e garantir a continuidade dos negócios da empresa."
            }
        ]
    }
};

// Variáveis globais
let currentQuestion = 0;
let currentPhase = 1;
let score = 0;
let userAnswers = [];
let userName = '';
let startTime = 0;
let phaseScores = [0, 0, 0]; // Pontuação de cada fase
let totalQuestions = 15; // 5 perguntas por fase, 3 fases

// Função para abrir modal da ITO
function openITO(itoId) {
    const modal = document.getElementById('ito-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (itosData[itoId]) {
        modalTitle.textContent = itosData[itoId].title;
        modalBody.innerHTML = itosData[itoId].content;
        modal.style.display = 'block';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Prevenir fechamento com botão voltar e gestos do mobile
        window.history.pushState(null, null, window.location.href);
        
        // Função para lidar com o botão voltar
        function handleBackButton(event) {
            if (modal.style.display === 'block') {
                event.preventDefault();
                window.history.pushState(null, null, window.location.href);
                return false;
            }
        }
        
        // Função para lidar com gestos de swipe (apenas na área do modal)
        function handleSwipeGesture(event) {
            if (modal.style.display === 'block') {
                // Apenas prevenir se for um gesto de swipe da esquerda para direita
                if (event.type === 'touchstart') {
                    modal._startX = event.touches[0].clientX;
                } else if (event.type === 'touchmove') {
                    if (modal._startX && event.touches[0].clientX > modal._startX + 50) {
                        // Swipe da esquerda para direita - prevenir
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }
                }
            }
        }
        
        // Adicionar listeners (apenas os necessários)
        window.addEventListener('popstate', handleBackButton);
        window.addEventListener('beforeunload', handleBackButton);
        document.addEventListener('touchstart', handleSwipeGesture, { passive: true });
        document.addEventListener('touchmove', handleSwipeGesture, { passive: false });
        
        // Armazenar referências para remover depois
        modal._backButtonHandler = handleBackButton;
        modal._swipeHandler = handleSwipeGesture;
        
        // Mostrar botão flutuante apenas em mobile
        const floatingBtn = document.getElementById('floating-back-btn');
        if (window.innerWidth <= 768) {
            floatingBtn.style.display = 'flex';
        }
    }
}

// Função para fechar modal
function closeITO() {
    const modal = document.getElementById('ito-modal');
    modal.style.display = 'none';
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remover todos os listeners
    if (modal._backButtonHandler) {
        window.removeEventListener('popstate', modal._backButtonHandler);
        window.removeEventListener('beforeunload', modal._backButtonHandler);
        modal._backButtonHandler = null;
    }
    
    if (modal._swipeHandler) {
        document.removeEventListener('touchstart', modal._swipeHandler);
        document.removeEventListener('touchmove', modal._swipeHandler);
        modal._swipeHandler = null;
    }
    
    // Esconder botão flutuante
    const floatingBtn = document.getElementById('floating-back-btn');
    floatingBtn.style.display = 'none';
}

// Função para selecionar resposta do quiz
// Função para iniciar o quiz
function startQuiz() {
    currentQuestion = 0;
    currentPhase = 1;
    score = 0;
    userAnswers = [];
    phaseScores = [0, 0, 0];
    startTime = Date.now();
    
    showQuizPhase();
}

// Função para mostrar a fase atual do quiz
function showQuizPhase() {
    const phaseKey = `phase${currentPhase}`;
    const phase = quizPhases[phaseKey];
    
    if (!phase) {
        // Quiz completo - mostrar resultado
        showQuizResult();
        return;
    }
    
    // Atualizar interface da fase
    updateQuizInterface(phase);
}

// Função para atualizar interface do quiz
function updateQuizInterface(phase) {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    const question = phase.questions[currentQuestion];
    const questionNumber = currentQuestion + 1;
    const totalQuestions = phase.questions.length;
    
    quizContainer.innerHTML = `
        <div class="quiz-header">
            <h3>${phase.title}</h3>
            <div class="quiz-progress">
                <span>Pergunta ${questionNumber} de ${totalQuestions}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(questionNumber / totalQuestions) * 100}%"></div>
                </div>
            </div>
        </div>
        
        <div class="quiz-question">
            <h4>${question.question}</h4>
        </div>
        
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <div class="quiz-option" onclick="selectAnswer('${option.charAt(0).toLowerCase()}')">
                    ${option}
                </div>
            `).join('')}
        </div>
        
        <div class="quiz-actions">
            <button class="btn btn-primary" onclick="nextQuestion()" id="next-btn" disabled>
                ${currentQuestion === phase.questions.length - 1 ? 'Finalizar Fase' : 'Próxima Pergunta'}
            </button>
        </div>
    `;
}

// Função para selecionar resposta do quiz
function selectAnswer(answer) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    
    event.target.classList.add('selected');
    userAnswers[currentQuestion] = answer;
    
    // Habilitar botão próximo
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

// Função para próxima pergunta
function nextQuestion() {
    const phaseKey = `phase${currentPhase}`;
    const phase = quizPhases[phaseKey];
    
    if (!phase || !phase.questions[currentQuestion]) {
        console.error('Erro: Fase ou pergunta não encontrada');
        return;
    }
    
    const question = phase.questions[currentQuestion];
    
    // Verificar resposta
    if (userAnswers[currentQuestion] === question.correct) {
        score++;
        phaseScores[currentPhase - 1]++;
    }
    
    currentQuestion++;
    
    // Verificar se terminou a fase
    if (currentQuestion >= phase.questions.length) {
        // Fase terminada
        showPhaseResult();
    } else {
        // Próxima pergunta
        showQuizPhase();
    }
}

// Função para mostrar resultado da fase
function showPhaseResult() {
    const phaseKey = `phase${currentPhase}`;
    const phase = quizPhases[phaseKey];
    const phaseScore = phaseScores[currentPhase - 1];
    const totalQuestions = phase.questions.length;
    
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <div class="phase-result">
            <div class="result-header">
                <h3>🎉 ${phase.title} Concluída! 🎉</h3>
                <div class="score-display">
                    <h4>Pontuação: ${phaseScore}/${totalQuestions}</h4>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${(phaseScore / totalQuestions) * 100}%"></div>
                    </div>
                </div>
            </div>
            
            <div class="result-actions">
                ${currentPhase < 3 ? `
                    <button class="btn btn-primary" onclick="nextPhase()">
                        Continuar para Fase ${currentPhase + 1}
                    </button>
                ` : `
                    <button class="btn btn-success" onclick="finishQuiz()">
                        Finalizar Quiz
                    </button>
                `}
            </div>
        </div>
    `;
}

// Função para próxima fase
function nextPhase() {
    currentPhase++;
    currentQuestion = 0;
    showQuizPhase();
}

// Função para finalizar quiz
function finishQuiz() {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    
    // Solicitar nome do usuário
    const userName = prompt('🎉 Parabéns! Quiz concluído!\n\nDigite seu nome para entrar no placar:');
    
    if (userName && userName.trim()) {
        // Salvar resultado
        saveQuizResult(userName.trim(), score, phaseScores, totalTime);
        
        // Mostrar resultado final
        showFinalResult(userName.trim(), score, phaseScores, totalTime);
    } else {
        alert('Nome é obrigatório para entrar no placar!');
        finishQuiz();
    }
}

// Função para salvar resultado do quiz
async function saveQuizResult(name, totalScore, phaseScores, time) {
    try {
        // Aqui você implementaria a lógica para salvar no GitHub
        // Por enquanto, vamos simular
        console.log('Salvando resultado:', { name, totalScore, phaseScores, time });
        
        // Em uma implementação real, você faria uma requisição para uma API
        // que atualizaria o arquivo leaderboard.json no GitHub
    } catch (error) {
        console.error('Erro ao salvar resultado:', error);
    }
}

// Função para mostrar resultado final
function showFinalResult(name, totalScore, phaseScores, time) {
    const quizContainer = document.querySelector('.quiz-container');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    quizContainer.innerHTML = `
        <div class="final-result">
            <div class="result-header">
                <h2>🏆 Quiz Concluído! 🏆</h2>
                <h3>Parabéns, ${name}!</h3>
            </div>
            
            <div class="result-stats">
                <div class="stat-item">
                    <h4>Pontuação Total</h4>
                    <p class="stat-value">${totalScore}/15</p>
                </div>
                
                <div class="stat-item">
                    <h4>Fases</h4>
                    <p class="stat-value">${phaseScores.join('/')}</p>
                </div>
                
                <div class="stat-item">
                    <h4>Tempo</h4>
                    <p class="stat-value">${minutes}:${seconds.toString().padStart(2, '0')}</p>
                </div>
            </div>
            
            <div class="result-actions">
                <button class="btn btn-primary" onclick="showLeaderboard()">
                    Ver Placar
                </button>
                <button class="btn btn-secondary" onclick="startQuiz()">
                    Fazer Novamente
                </button>
            </div>
        </div>
    `;
}

// Função para mostrar resultado do quiz (compatibilidade)
function showQuizResult() {
    showFinalResult(userName, score, phaseScores, Math.floor((Date.now() - startTime) / 1000));
}

// Função para iniciar quiz automaticamente
function startQuizAutomatically() {
    // Verificar se já existe um quiz em andamento
    if (currentQuestion > 0 || currentPhase > 1) {
        return; // Já em andamento
    }
    
    // Iniciar novo quiz
    startQuiz();
}

// Função removida - usando sistema de fases

// Função removida - usando sistema de fases

// Função removida - usando sistema de fases

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
    
    // Quiz inicializado pelo sistema de fases
    
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

// Sistema de Placar Global
const LEADERBOARD_URL = 'https://raw.githubusercontent.com/vitorfaustin0/manual-seguranca-sterileno/main/leaderboard.json';

// Carregar placar ao inicializar
async function loadLeaderboard() {
    try {
        const response = await fetch(LEADERBOARD_URL);
        const data = await response.json();
        updateLeaderBanner(data.leaderboard[0]);
        return data;
    } catch (error) {
        console.log('Placar não disponível ainda');
        document.getElementById('leader-info').textContent = 'Nenhum participante ainda';
        return { leaderboard: [] };
    }
}

// Atualizar banner do líder
function updateLeaderBanner(leader) {
    if (leader) {
        document.getElementById('leader-info').innerHTML = 
            `<strong>${leader.name}</strong> - ${leader.score} pontos (${leader.phaseScores.join('/')})`;
    }
}

// Mostrar placar completo
function showLeaderboard() {
    const modal = document.getElementById('leaderboard-modal');
    modal.style.display = 'block';
    loadFullLeaderboard();
}

// Carregar placar completo
async function loadFullLeaderboard() {
    try {
        const data = await loadLeaderboard();
        const leaderboardBody = document.getElementById('leaderboard-body');
        
        if (data.leaderboard.length === 0) {
            leaderboardBody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum participante ainda</td></tr>';
            return;
        }
        
        leaderboardBody.innerHTML = data.leaderboard.map((player, index) => `
            <tr class="${index < 3 ? 'top-player' : ''}">
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
                <td>${player.phaseScores.join('/')}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar placar:', error);
    }
}

// Fechar modal do placar
function closeLeaderboard() {
    document.getElementById('leaderboard-modal').style.display = 'none';
}

document.getElementById('publish-button').addEventListener('click', async () => {
  const alias = prompt("Digite um título curto para a nota (alias):").trim();
  const content = document.getElementById('note-content').value.trim();
  const token = document.getElementById('writeas-token').value.trim();

  if (!alias) {
    alert("Por favor, forneça um alias para a nota.");
    return;
  }

  if (!content) {
    alert("Por favor, preencha o conteúdo da nota.");
    return;
  }

  if (!token) {
    alert("Por favor, insira o token da API.");
    return;
  }

  try {
    const response = await fetch("https://k4i0d.eu.org/api/posts", {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        alias: alias,
        body: content
      })
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Nota publicada com sucesso! Link: ${data.url}`);
    } else {
      const error = await response.json();
      console.error("Erro ao publicar:", error);
      alert(`Erro ao publicar: ${error.message || "Desconhecido"}`);
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    alert("Erro de conexão com o servidor. Verifique o console para mais detalhes.");
  }
});

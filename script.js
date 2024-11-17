document.getElementById('publish-button').addEventListener('click', async () => {
  const content = document.getElementById('note-content').value;
  const token = document.getElementById('writeas-token').value;

  if (!content || !token) {
    alert("Por favor, preencha o conteúdo da nota e o token da API.");
    return;
  }

  try {
    const response = await fetch("https://k4i0d.eu.org/api/posts", {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ body: content })
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Nota publicada com sucesso! Link: ${data.url}`);
    } else {
      const error = await response.json();
      alert(`Erro ao publicar: ${error.message || "Desconhecido"}`);
    }
  } catch (err) {
    console.error(err);
    alert("Ocorreu um erro ao tentar publicar sua nota.");
  }
});


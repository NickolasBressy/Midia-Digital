document.addEventListener('DOMContentLoaded', () => {
    const feedDiv = document.getElementById('feed');
    const apiUrl = 'https://script.google.com/macros/s/AKfycbzjAg1R023Oxvrk3p2GNgO7TtMi1EcxRfUg1kk5DXevMHGh2sHW-8xU6d9F0ixvyU-3/exec';

    async function loadFeed() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const posts = await response.json();
            feedDiv.innerHTML = '';
            posts.forEach(post => {
                let postElement = `<div class="list-group-item list-group-item-action">
                    <p class="timestamp">${new Date(post.timestamp).toLocaleString()}</p>`;

                const fileName = `file_${post.id}`; // Nome padrão do arquivo, ajuste conforme necessário

                if (post.type === 'text') {
                    postElement += `<p>${post.content}</p>`;
                } else if (post.type === 'image') {
                    postElement += `<a href="${post.content}" download="${fileName}.jpg">
                        <img src="${post.content}" alt="Imagem" class="img-fluid" />
                        <p class="mt-2">Download</p>
                    </a>`;
                } else if (post.type === 'video') {
                    postElement += `<a href="${post.content}" download="${fileName}.mp4">
                        <video controls src="${post.content}" class="img-fluid" alt="Vídeo"></video>
                        <p class="mt-2">Download</p>
                    </a>`;
                } else if (post.type === 'audio') {
                    postElement += `<a href="${post.content}" download="${fileName}.mp3">
                        <audio controls src="${post.content}" class="img-fluid" alt="Áudio"></audio>
                        <p class="mt-2">Download</p>
                    </a>`;
                }

                postElement += `</div>`;

                feedDiv.innerHTML += postElement;
            });
        } catch (error) {
            console.error('Error loading feed:', error);
            feedDiv.innerHTML = '<p>Failed to load feed.</p>';
        }
    }

    loadFeed();
});

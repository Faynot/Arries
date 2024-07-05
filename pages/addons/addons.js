document.title = 'Add-ons | Arries';
console.log("Add-ons");

// Sample data (replace this with your actual array of objects)
const addons = [
  { id: 1, name: '7TV', description: 'Adds display of custom emoticons on twitch.tv', href: '#' },
  { id: 2, name: 'Addon 2', description: 'Description for Addon 2', href: '#' },
  { id: 3, name: 'Addon 3', description: 'Description for Addon 3', href: '#' },
  { id: 4, name: 'Addon 4', description: 'Description for Addon 4', href: '#' },
  { id: 5, name: 'Addon 5', description: 'Description for Addon 5', href: '#' },
  { id: 6, name: 'Addon 6', description: 'Description for Addon 6', href: '#' },
  { id: 7, name: 'Addon 7', description: 'Description for Addon 7', href: '#' },
  { id: 8, name: 'Addon 8', description: 'Description for Addon 8', href: '#' },
  { id: 9, name: 'Addon 9', description: 'Description for Addon 9', href: '#' },
  { id: 10, name: 'Addon 10', description: 'Description for Addon 10', href: '#' },
];

// Function to render addons
function renderAddons() {
  const container = document.getElementById('addons-container');
  container.innerHTML = ''; // Clear existing content

  addons.forEach(addon => {
    const addonElement = document.createElement('div');
    addonElement.classList.add('addon-item');
    addonElement.innerHTML = `
      <h2>${addon.name}</h2>
      <p>${addon.description}</p>
      <div>
        <button class="download-button" data-href="${addon.href}">Download</button>
      </div>
    `;
    container.appendChild(addonElement);
  });
}

// Render addons when the script loads
renderAddons();

// Обработчик клика на кнопку "Скачать расширение"
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('download-button')) {
    const href = event.target.dataset.href;
    window.api.send('download-extension', href); // Отправляем событие в основной процесс
  }
});

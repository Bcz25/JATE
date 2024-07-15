const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('DOMContentLoaded', (event) => {
    const isAppInstalled = localStorage.getItem('isAppInstalled');
    if (isAppInstalled) {
        butInstall.classList.toggle('hidden', true);
    }
});

window.addEventListener('beforeinstallprompt', (event) => {
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Toggles the 'hidden' class to off for the install button container
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }
  // Show the install prompt
  promptEvent.prompt();
  
  window.deferredPrompt = null;
  // Toggles the 'hidden' class on for the install button container
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('Jate was installed.', event);
    // Toggles the 'hidden' class on for the install button container
    butInstall.classList.toggle('hidden', true);
    window.deferredPrompt = null;
});

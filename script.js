document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const appUrl = 'https://english.nextopologix.com';
  const isKakao = /KAKAOTALK/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const startLinks = document.querySelectorAll(`a[href="${appUrl}"]`);

  const showExternalBrowserGuide = () => {
    let guide = document.querySelector('.external-browser-guide');
    if (!guide) {
      guide = document.createElement('div');
      guide.className = 'external-browser-guide';
      guide.innerHTML = `
        <div class="external-browser-guide-card" role="dialog" aria-modal="true" aria-labelledby="external-browser-title">
          <button class="external-browser-guide-close" type="button" aria-label="안내 닫기">&times;</button>
          <p class="external-browser-guide-label">카카오톡에서 접속하셨나요?</p>
          <h2 id="external-browser-title">기본 브라우저에서 열어주세요</h2>
          <p>말하기와 마이크 기능을 온전히 사용하려면 카카오톡 메뉴에서 <strong>다른 브라우저로 열기</strong>를 선택해 주세요.</p>
          <ol>
            <li>화면의 공유 또는 더보기 메뉴를 누릅니다.</li>
            <li><strong>Safari로 열기</strong> 또는 <strong>기본 브라우저로 열기</strong>를 선택합니다.</li>
          </ol>
          <button class="external-browser-copy button" type="button">앱 주소 복사하기</button>
          <a class="external-browser-continue" href="${appUrl}">카카오톡에서 계속 열기</a>
        </div>`;
      document.body.appendChild(guide);

      const closeGuide = () => guide.classList.remove('show');
      guide.querySelector('.external-browser-guide-close').addEventListener('click', closeGuide);
      guide.addEventListener('click', (event) => {
        if (event.target === guide) closeGuide();
      });
      guide.querySelector('.external-browser-copy').addEventListener('click', async (event) => {
        try {
          await navigator.clipboard.writeText(appUrl);
          event.currentTarget.textContent = '주소를 복사했습니다';
        } catch {
          window.prompt('아래 주소를 복사해 브라우저에서 열어주세요.', appUrl);
        }
      });
    }
    guide.classList.add('show');
  };

  if (isKakao) {
    startLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (isAndroid) {
          const destination = appUrl.replace(/^https?:\/\//, '');
          window.location.href = `intent://${destination}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(appUrl)};end`;
          return;
        }
        showExternalBrowserGuide();
      });
    });
  }

  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
});

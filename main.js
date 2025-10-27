document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    const content = document.getElementById('content');

    // Cập nhật trạng thái active
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Nếu là trang chủ, hiển thị nội dung mặc định
    if (page === 'home') {
      content.innerHTML = `
        <h2 class="text-center mb-3">Chủ tịch Hồ Chí Minh</h2>
        <p class="text-center lead">Anh hùng giải phóng dân tộc, Danh nhân văn hoá thế giới.</p>
        <div class="text-center">
          <img src="images/hero.jpg" class="img-fluid rounded shadow-sm" style="max-width:600px;">
        </div>`;
      return;
    }

    // Tải nội dung trang khác
    content.classList.add('fade-out');
    setTimeout(() => {
      fetch(page)
        .then(res => {
          if (!res.ok) throw new Error('Lỗi tải trang');
          return res.text();
        })
        .then(html => {
          content.innerHTML = html;
          content.classList.remove('fade-out');
        })
        .catch(err => {
          content.innerHTML = `<p class="text-danger text-center mt-4">Không thể tải trang.</p>`;
          content.classList.remove('fade-out');
          console.error(err);
        });
    }, 200);
  });
});
// Hàm tải nội dung vào <main id="content">
function loadPage(pagePath) {
  const content = document.getElementById("content");
  content.classList.add("fade-out");

  fetch(pagePath)
    .then(res => {
      if (!res.ok) throw new Error("Không tìm thấy trang: " + pagePath);
      return res.text();
    })
    .then(html => {
      setTimeout(() => {
        content.innerHTML = html;
        content.classList.remove("fade-out");
      }, 200);
    })
    .catch(err => {
      content.innerHTML = `<p class="text-danger text-center mt-3">Lỗi khi tải nội dung!</p>`;
      console.error(err);
    });
}

// Khi click vào menu
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const page = link.getAttribute("data-page");
    if (page) {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      loadPage(page);
    }
  });
});

// Khi tải trang lần đầu → load trang chủ
window.addEventListener("DOMContentLoaded", () => {
  loadPage("pages/trangchu.html");
});


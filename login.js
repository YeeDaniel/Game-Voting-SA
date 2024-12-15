// 初始化檢查login狀態
window.addEventListener('load', function () {
    const storedUserId = getCookie('userId');
    if (storedUserId) {
        updateButtonToLogout();
    }
});

// 登入邏輯
document.getElementById('loginForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username')?.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (!username) {
        errorMessage.textContent = '該欄位不可為空！';
        return;
    }

    try {
        const apiUrl = `https://8080-idx-gamevote2-1732977972872.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/api/user?name=${encodeURIComponent(username)}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
            const data = await response.json();
            if (data?.id) {
                setCookie('userId', data.id, 1); // 存储用户 ID
                //document.cookie = 
                alert(`登入成功！\n使用者 ID: ${data.id}\n使用者名稱: ${data.name}`);
                updateButtonToLogout();
                window.location.href = 'hotGames.html'; // 跳转
            } else {
                errorMessage.textContent = '該使用者不存在，請重新輸入！';
            }
        } else {
            errorMessage.textContent = '該使用者不存在，請重新輸入！';
        }
    } catch (error) {
        console.error('Fetch API 發生錯誤:', error);
        errorMessage.textContent = '無法連接到伺服器，請稍後再試！';
    }
});

// 按鈕內容變登出
function updateButtonToLogout() {
    const loginButton = document.getElementById('loginButton'); // 使用更精确的选择器
    if (loginButton) {
        loginButton.textContent = '登出';
        loginButton.onclick = function () {
            deleteCookie('userId');
            alert('已登出！');
            location.reload();
        };
    }
}

// 取消按鈕绑定
document.getElementById('cancelButton')?.addEventListener('click', function () {
    window.location.href = 'hotGames.html';
});

// Cookie 操作函数
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    console.log(name,value,days)
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}





/*document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 阻止表單的默認提交行為
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim(); // 獲取並去除多餘空白
    const errorMessage = document.getElementById('error-message');

    // 檢查 username 是否為空
    if (!username) {
        errorMessage.textContent = '該欄位不可為空！';
        return;
    }
    //const username = document.getElementById('username').value; // 獲取輸入的名稱
    const apiUrl = `https://8080-idx-gamevote2-1732977972872.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/api/user?name=${username}`;

    try {
        // 使用 Fetch API 發送 GET 請求
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json(); // 獲取後端返回的數據
            if (data && data.id && data.name) {
                // 如果找到匹配的使用者，跳轉到 hotgames.html
                window.location.href = 'hotGames.html';
                alert(`登入成功！\n使用者 ID: ${data.id}\n使用者名稱: ${data.name}`);
            } 
        } else {
            // 處理後端返回非 200 狀態碼的情況
            errorMessage.textContent = '該使用者不存在，請重新輸入！';
        }
    } catch (error) {
        console.error('發生錯誤:', error);
        errorMessage.textContent = '無法連接到伺服器，請稍後再試！';
    }
});*/

// 綁定取消按鈕點擊事件
/*document.getElementById('cancelButton').addEventListener('click', function () {
    // 跳轉到 hotgames.html
    window.location.href = 'hotGames.html';

});

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 阻止表單的默認提交行為

    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim(); // 獲取並去除多餘空白
    const errorMessage = document.getElementById('error-message');

    // 檢查 username 是否為空
    if (!username) {
        errorMessage.textContent = '該欄位不可為空！';
        return;
    }

    const apiUrl = `https://8080-idx-gamevote2-1732977972872.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/api/user?name=${username}`;

    try {
        // 使用 Fetch API 發送 GET 請求
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json(); // 獲取後端返回的數據
            if (data && data.id) {
                // 如果找到匹配的使用者，存儲 ID 到 Cookie
                setCookie('userId', data.id, 1); // 存儲 1 天
                alert(`登入成功！\n使用者 ID: ${data.id}\n使用者名稱: ${data.name}`);

                // 更新按钮为登出
                updateButtonToLogout();

                // 跳轉到 hotgames.html
                window.location.href = 'hotGames.html';
            } else {
                // 如果沒有找到匹配的用戶
                errorMessage.textContent = '該使用者不存在，請重新輸入！';
            }
        } else {
            // 處理後端返回非 200 狀態碼的情況
            errorMessage.textContent = '該使用者不存在，請重新輸入！';
        }
    } catch (error) {
        console.error('發生錯誤:', error);
        errorMessage.textContent = '無法連接到伺服器，請稍後再試！';
    }
});

// 綁定取消按鈕點擊事件
document.getElementById('cancelButton').addEventListener('click', function () {
    // 跳轉到 hotgames.html
    window.location.href = 'hotGames.html';
});

// 初始化检查是否登录
window.addEventListener('load', function () {
    const storedUserId = getCookie('userId');

    if (storedUserId) {
        // 如果已登录，更新按钮为登出
        updateButtonToLogout();
    }
});

// 更新按钮为登出
function updateButtonToLogout() {
    const loginButton = document.querySelector('button[type="submit"]');
    loginButton.textContent = '登出';
    loginButton.onclick = function () {
        // 点击登出时，清除 Cookie 并刷新页面
        deleteCookie('userId');
        alert('已登出！');
        location.reload();
    };
}

// 设置 Cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 设置过期时间
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// 获取 Cookie
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

// 删除 Cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
*/
// 初始化检查登录状态
window.addEventListener('load', function () {
    const storedUserId = getCookie('userId');
    if (storedUserId) {
        updateButtonToLogout();
    }
});

// 登录逻辑
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

// 更新按钮为登出
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

// 取消按钮绑定
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





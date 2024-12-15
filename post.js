let teamData = []; // 用來存從API獲取的資訊
const idToNameMapping = {
    0: "塞爾蒂克",
    1: "尼克",
    2: "籃網",
    3: "76人",
    4: "暴龍",
    5: "勇士",
    6: "快艇",
    7: "湖人",
    8: "太陽",
    9: "國王",
    10: "騎士",
    11: "公鹿",
    12: "溜馬",
    13: "公牛",
    14: "活塞",
    15: "魔術",
    16: "熱火",
    17: "老鷹",
    18: "黃蜂",
    19: "巫師",
    20: "雷霆",
    21: "金塊",
    22: "灰狼",
    23: "拓荒者",
    24: "爵士",
    25: "火箭",
    26: "灰熊",
    27: "獨行俠",
    28: "馬刺",
    29: "鵜鶘"

};

let selectedHomeTeamId = null; // 存主隊ID
let selectedAwayTeamId = null; // 存客隊ID

// 從API拿數據
async function fetchTeamData() {
    try {
        const response = await fetch("https://8080-idx-gamevote2-1732977972872.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/api/teams");
        if (!response.ok) {
            throw new Error("Failed to fetch team data");
        }
        teamData = await response.json(); // 將隊伍數據存進全局變量
        loadHomeTeams(); // 初始化主隊list
        loadAwayTeams(); // 初始化客隊list
    } catch (error) {
        console.error("Failed to fetch team data:", error);
        alert("無法加載數據");
    }
}

// 主隊下拉式選單
function loadHomeTeams() {
    const dropdown = document.getElementById("homeTeamDropdown");
    dropdown.innerHTML = ""; // 清空之前的内容

    teamData.forEach(team => {
        const name = idToNameMapping[team.id];
        if (name) {
            const isDisabled = selectedAwayTeamId === team.id; // 如果在客隊被選了就禁用
            const listItem = document.createElement("li");
            listItem.innerHTML = `
        <a class="dropdown-item ${isDisabled ? "disabled" : ""}" href="#" 
          onclick="selectHomeTeam(${team.id})">${name}</a>
      `;
            dropdown.appendChild(listItem);
        }
    });
}

// 客隊下拉式選單
function loadAwayTeams() {
    const dropdown = document.getElementById("awayTeamDropdown");
    dropdown.innerHTML = ""; // 清空之前的内容

    teamData.forEach(team => {
        const name = idToNameMapping[team.id];
        if (name) {
            const isDisabled = selectedHomeTeamId === team.id; // 如果在主隊被選了就禁用
            const listItem = document.createElement("li");
            listItem.innerHTML = `
        <a class="dropdown-item ${isDisabled ? "disabled" : ""}" href="#" 
          onclick="selectAwayTeam(${team.id})">${name}</a>
      `;
            dropdown.appendChild(listItem);
        }
    });
}

// 選擇主隊
function selectHomeTeam(teamId) {
    selectedHomeTeamId = teamId; // 更新主隊ID

    const team = teamData.find(t => t.id === teamId);
    const name = idToNameMapping[teamId];
    if (team && name) {
        // 更新主隊按鈕的文字
        const button = document.getElementById("homeTeamDropdownButton");
        button.textContent = name;

        // 更新隊伍訊息、顯示
        updateTeamInfo();

        // 重新加載客隊選單，禁用已選主隊的選項
        loadAwayTeams();
    }
}

// 選擇客隊
function selectAwayTeam(teamId) {
    selectedAwayTeamId = teamId; // 更新客隊 ID

    const team = teamData.find(t => t.id === teamId);
    const name = idToNameMapping[teamId];
    if (team && name) {
        // 更新客隊按鈕的文字
        const button = document.getElementById("awayTeamDropdownButton");
        button.textContent = name;

        // 更新隊伍訊息、顯示
        updateTeamInfo();

        // 重新加載主隊選單，禁用已選客隊的選項
        loadHomeTeams();
    }
}

// 更新隊伍訊息
function updateTeamInfo() {
    const awayTeamDiv = document.getElementById("awayTeamInfo");
    const homeTeamDiv = document.getElementById("homeTeamInfo");


    // 清空容器内容
    homeTeamDiv.innerHTML = "";
    awayTeamDiv.innerHTML = "";

    if (selectedHomeTeamId !== null) {
        const homeTeam = teamData.find(t => t.id === selectedHomeTeamId);
        const homeName = idToNameMapping[selectedHomeTeamId];
        homeTeamDiv.innerHTML = `
      <div class="card p-3 mt-3 text-center">
        <h5>主隊: ${homeName}</h5>
        <img class="mb-3 mx-auto d-block" src="${homeTeam.logoUrl}" alt="${homeName}" style="width: 60px;">
        <p>敗場: ${homeTeam.lose}</p>
        <p>勝場: ${homeTeam.win}</p>
      </div>
    `;
    }

    if (selectedAwayTeamId !== null) {
        const awayTeam = teamData.find(t => t.id === selectedAwayTeamId);
        const awayName = idToNameMapping[selectedAwayTeamId];
        awayTeamDiv.innerHTML = `
      <div class="card p-3 mt-3 text-center">
        <h5>客隊: ${awayName}</h5>
        <img class="mb-3 mx-auto d-block" src="${awayTeam.logoUrl}" alt="${awayName}" style="width: 60px;">
        <p>敗場: ${awayTeam.lose}</p>
        <p>勝場: ${awayTeam.win}</p>
      </div>
    `;
    }
}

// 頁面加載初始化
document.addEventListener("DOMContentLoaded", () => {
    fetchTeamData();
});

document.addEventListener('DOMContentLoaded', function () {
    const now = new Date();

    // （UTC+8）
    const taiwanOffset = 8 * 60; // 台灣時區是 UTC+8
    const taiwanTime = new Date(now.getTime() + taiwanOffset * 60000);

    // 格式化
    const formattedNow = taiwanTime.toISOString().slice(0, 16);

    // 获取日期时间输入框
    const dateTimeInput = document.getElementById('meeting-time');

    // 最小值跟台灣時間一樣
    dateTimeInput.setAttribute('min', formattedNow); // 限制只能選未來時間
    dateTimeInput.value = formattedNow; // 預設為目前時間
});



document.getElementById("voteForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    // 檢查是否選了主隊和客隊
    if (selectedHomeTeamId === null || selectedAwayTeamId === null) {
        Swal.fire('請先選擇主隊及客隊', '', 'warning');
        return;
    }

    // 彈出sweetAlert框
    Swal.fire({
        title: '確定要新增?',
        text: '確認後將送出比賽資料',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消'
    }).then((result) => {
        if (result.isConfirmed) {
            // 如果點確認，提交
            submitFormData();
        }
    });
});

// 提交数据的逻辑
async function submitFormData() {
    try {
        // 拿主隊、客隊、時間訊息
        const homeTeam = teamData.find(t => t.id === selectedHomeTeamId);
        const awayTeam = teamData.find(t => t.id === selectedAwayTeamId);
        const dateTimeInput = document.getElementById("meeting-time");
        const selectedDateTime = new Date(dateTimeInput.value).toISOString().replace("T", " ").slice(0, 19);

        if (!selectedDateTime) {
            Swal.fire('錯誤', '請選擇日期和時間！', 'error');
            return;
        }

        // POST 數據
        const params = new URLSearchParams({
            awayTeam: idToNameMapping[selectedAwayTeamId],
            homeTeam: idToNameMapping[selectedHomeTeamId],
            awayTeamLogoUrl: awayTeam.logoUrl,
            homeTeamLogoUrl: homeTeam.logoUrl,
            awayTeamLose: awayTeam.lose,
            awayTeamWin: awayTeam.win,
            homeTeamWin: homeTeam.win,
            homeTeamLose: homeTeam.lose,
            comments: 0,
            date: selectedDateTime,
            status: "onGoing"
        }).toString();

        // POST請求
        const response = await fetch(
            `https://8080-idx-gamevote2-1732977972872.cluster-3g4scxt2njdd6uovkqyfcabgo6.cloudworkstations.dev/api/matches?${params}`,
            { method: "POST" }
        );

        if (response.ok) {
            const data = await response.text(); // 獲取回應文本
            console.log("Success:", data);

            // 顯示成功，跳出視窗
            Swal.fire({
                title: '建立成功',
                text: '比賽資料已建立。',
                icon: 'success',
                confirmButtonText: '確定'
            }).then(() => {
                window.location.href = 'create&delete.html'; // 跳回新增刪除頁面
            });
        } else {
            const error = await response.json();
            console.error("提交失敗，錯誤代碼：", response.status, error);
            Swal.fire('建立失敗', `提交失敗，錯誤代碼：${response.status}`, 'error');
        }
    } catch (error) {
        console.error("發生錯誤:", error);
        Swal.fire('建立失敗', '無法建立該比賽資料。', 'error');
    }
}

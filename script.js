var level = 1; // 初始化等级为1
var score = 0; // 初始化分数为0

function startGame() {
  alert('choose your level!\nyou have 4s to memory the position of all gems!')
  document.getElementById("levelSelect").addEventListener("change", function() {
    level = parseInt(this.value, 10); // 当用户选择等级后，解析并更新等级变量
    // 更新等级显示
    document.getElementById("level").innerHTML = "Level: " + level + '<br>';
    start(); // 用户选择完毕后开始游戏
  });
}

function start() {
    document.getElementById("game").style.display = "grid";
    document.getElementById("level").innerHTML = "Level: " + level + '<br>'; // 修正拼写错误
    document.getElementById("score").innerHTML = '<br>';

    // 清空游戏区域
    var gameContainer = document.getElementById("game");
    gameContainer.innerHTML = '';

    // 创建4x4网格
    for (var i = 0; i < 16; i++) {
        var gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        // 创建img元素
        var img = document.createElement("img");
        // 设置img的src属性
        img.src = "board.png";
        // 将img元素添加到gridItem中
        gridItem.appendChild(img);
        // 将gridItem添加到游戏容器中
        gameContainer.appendChild(gridItem);
    }
    reveal()
}
var revealed = false

    function reveal() {
      var gemsRevealed = []; // Store revealed gems to avoid duplicates
      for (let i = 0; i < level; i++) {
        let gem;
        do {
          gem = Math.floor(Math.random() * 16);
        } while (gemsRevealed.includes(gem)); // Ensure unique gem positions
        gemsRevealed.push(gem);
    
        let gridItems = document.getElementsByClassName("grid-item");
        if (gridItems[gem] && gridItems[gem].firstChild) {
          gridItems[gem].firstChild.src = "gem.png";
          gridItems[gem].classList.add('gem'); // Corrected case sensitivity issue
          setTimeout(function () {
            if (gridItems[gem] && gridItems[gem].firstChild) {
              gridItems[gem].firstChild.src = "board.png";
            }
          }, 4000);
        }
      }
      judge()
      revealed = true
    }

    function judge() {
      // 获取所有类名为'grid-item'的元素
      var gridItems = document.querySelectorAll('.grid-item');
  
      // 为每个元素添加点击事件监听器
      gridItems.forEach(function(gridItem) {
          gridItem.addEventListener('click', function() {
              // 修正: 使用classList.contains检查类名，而不是includes，并且不需要点前缀
              if(this.classList.contains('gem')){
                  alert('gem!');
                  this.firstChild.src='gem.png'
                  this.classList.remove('gem');
              }
              
              // 在这里编写点击事件发生时要执行的代码
              console.log('Grid item clicked!');
          });
      });
      checkAllGemsFound()

  }


  

  function checkAllGemsFound() {
    var gridItems = document.querySelectorAll('.grid-item');
    var allGemsFound = true; // 假设所有gem都被发掘了
  
    gridItems.forEach(function(gridItem) {
        if(gridItem.classList.contains('gem')) {
            allGemsFound = false; // 找到一个未被发掘的gem，更改假设
        }
    });
  
    if(allGemsFound && revealed == true) {
        reset(); // 如果所有gem都被发掘了，调用reset函数
    }
  }

  function reset() {
    document.querySelector('#score').innerText = 'You win!';
    // Set a timeout before reloading the page to allow the user to see the win message
    setTimeout(function() {
        window.location.reload();
    }, 2000); // 2000 milliseconds delay (2 seconds)
}




    window.onload = function() {
      startGame();
  

      // Fixed: Wrapped checkAllGemsFound in an anonymous function to ensure it's called repeatedly
      setInterval(function() { checkAllGemsFound(); }, 100);
  };



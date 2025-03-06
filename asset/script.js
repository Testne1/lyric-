(function () {
  var canvas = $("#canvas");

  if (!canvas[0].getContext) {
    $("#error").show();
    return false;
  }

  // Biến toàn cục để lưu trữ tỷ lệ
  var scaleRatio = 1;
  
  // Cập nhật kích thước canvas
  function updateCanvasSize() {
    var width = canvas.parent().width();
    var height = canvas.parent().height();
    
    // Tính toán tỷ lệ so với kích thước gốc
    scaleRatio = Math.min(width / 1100, height / 680);
    
    // Cập nhật kích thước thực tế
    canvas.attr("width", width);
    canvas.attr("height", height);
    
    return {
      width: width,
      height: height
    };
  }
  
  // Khởi tạo kích thước
  var dimensions = updateCanvasSize();
  var width = dimensions.width;
  var height = dimensions.height;
  
  // Hàm được gọi từ bên ngoài khi cần điều chỉnh kích thước
  window.canvasResized = function(newWidth, newHeight) {
    width = newWidth;
    height = newHeight;
    scaleRatio = Math.min(width / 1100, height / 680);
    
    // Vẽ lại cây và các yếu tố khác nếu cần
    if (tree) {
      tree.resize(width, height, scaleRatio);
    }
  };
  
  var opts = {
    seed: {
      x: width / 2 - 20,
      color: "rgb(190, 26, 37)",
      scale: 2,
    },
    branch: [
      [ 535, 680, 570, 250, 500, 200, 30, 100,
        [
          [ 540,500,455,417,340, 400, 13, 100,
            [[450, 435, 434, 430, 394, 395, 2, 40]],
          ],
          [ 550, 445, 600, 356, 680, 345, 12, 100,
            [[578, 400, 648, 409, 661, 426, 3, 80]],
          ],
          [539, 281, 537, 248, 534, 217, 3, 40],
          [ 546, 397, 413, 247, 328, 244, 9, 80,
            [
              [427, 286, 383, 253, 371, 205, 2, 40],
              [498, 345, 435, 315, 395, 330, 4, 60],
            ],
          ],
          [ 546, 357, 608, 252, 678, 221, 6, 100,
            [[590, 293, 646, 277, 648, 271, 2, 80]],
          ],
        ],
      ],
    ],
    bloom: {
      num: 700,
      width: width,
      height: height,
    },
    footer: {
      width: width,
      height: 5,
      speed: 10,
    },
  };

  // Sửa lại lớp Tree để hỗ trợ responsive
  function Tree(canvas, width, height, opts) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.opts = opts;
    this.scaleRatio = scaleRatio;
    
    this.seed = new Seed(this.opts.seed);
    this.footer = new Footer(this.opts.footer);
    
    this.branches

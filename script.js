document.addEventListener('DOMContentLoaded', function() {
    const upload = document.getElementById('upload');
    const image = document.getElementById('image');
    const sizeSelect = document.getElementById('size');
    const cropBtn = document.getElementById('crop-btn');
    const downloadBtn = document.getElementById('download-btn');
    const preview = document.querySelector('.preview');
    
    let cropper;

    // 上传图片并初始化Cropper
    upload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                image.src = event.target.result;
                
                // 销毁旧的Cropper实例（如果存在）
                if (cropper) {
                    cropper.destroy();
                }
                
                // 初始化Cropper
                cropper = new Cropper(image, {
                    aspectRatio: 1, // 默认1:1比例
                    viewMode: 1,
                    autoCropArea: 0.8,
                    responsive: true,
                    preview: preview,
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // 选择规格时调整裁剪比例
    sizeSelect.addEventListener('change', function() {
        const size = this.value.split('x');
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        
        // 设置裁剪比例
        cropper.setAspectRatio(width / height);
    });

    // 裁剪按钮
    cropBtn.addEventListener('click', function() {
        const size = sizeSelect.value.split('x');
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        
        // 获取裁剪后的Canvas
        const canvas = cropper.getCroppedCanvas({
            width: width,
            height: height,
            minWidth: 64,
            minHeight: 64,
            maxWidth: 4096,
            maxHeight: 4096,
            fillColor: '#fff',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });
        
        // 更新预览
        preview.innerHTML = '';
        const previewImg = document.createElement('img');
        previewImg.src = canvas.toDataURL('image/png');
        preview.appendChild(previewImg);
        
        // 更新主图像（可选）
        image.src = canvas.toDataURL('image/png');
        cropper.replace(image.src);
    });

    // 下载按钮
    downloadBtn.addEventListener('click', function() {
        const canvas = cropper.getCroppedCanvas();
        if (canvas) {
            const link = document.createElement('a');
            link.download = `cropped-${sizeSelect.value}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    });
});
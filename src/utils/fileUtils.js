import { message } from 'antd'

export function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

export function beforeUpload(file) {
	console.info('file ===', JSON.stringify(file.type))
	const isJPG = ((file.type === 'image/jpeg') || (file.type === 'image/png')) ;
	if (!isJPG) {
		message.error('图片上传只提供 JPG, JPEG, PNG 格式的文件!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('文件大小不能超过 2MB!');
	}
	return isJPG && isLt2M;
}
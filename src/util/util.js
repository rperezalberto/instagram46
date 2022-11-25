import { AntDesign } from '@expo/vector-icons';

export const IconAvatar = ({ name, size, color }) => {
    return <AntDesign name={name} size={size} color={color} />
}

export const LoadImg = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    return blob;
}